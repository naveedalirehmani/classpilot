"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const client_1 = require("@prisma/client");
const stripe_config_1 = require("../config/stripe.config");
const prisma = new client_1.PrismaClient();
const stripe = new stripe_1.default(stripe_config_1.config.stripe.secretKey, {
    apiVersion: '2025-03-31.basil',
});
class StripeService {
    static createCheckoutSession(userId, priceId, planType) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Get or create Stripe customer
                const user = yield prisma.users.findUnique({
                    where: { id: userId },
                    include: { subscription: true }
                });
                if (!user)
                    throw new Error('User not found');
                let customerId = (_a = user.subscription) === null || _a === void 0 ? void 0 : _a.stripeCustomerId;
                if (!customerId) {
                    const customer = yield stripe.customers.create({
                        email: user.email,
                        name: user.name,
                        metadata: {
                            userId: user.id,
                        },
                    });
                    customerId = customer.id;
                }
                // Create checkout session
                const session = yield stripe.checkout.sessions.create({
                    customer: customerId,
                    line_items: [{
                            price: priceId,
                            quantity: 1,
                        }],
                    mode: 'subscription',
                    success_url: `${stripe_config_1.config.clientUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${stripe_config_1.config.clientUrl}/subscription/cancel`,
                    metadata: {
                        userId,
                        planType,
                    },
                });
                return session;
            }
            catch (error) {
                console.error('Error creating checkout session:', error);
                throw error;
            }
        });
    }
    static handleWebhook(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                switch (event.type) {
                    case 'checkout.session.completed': {
                        const session = event.data.object;
                        yield this.handleSuccessfulSubscription((_a = session.metadata) === null || _a === void 0 ? void 0 : _a.userId, session.customer, session.subscription, (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.planType);
                        break;
                    }
                    case 'customer.subscription.deleted': {
                        const subscription = event.data.object;
                        yield this.handleCancelledSubscription(subscription.metadata.userId);
                        break;
                    }
                }
            }
            catch (error) {
                console.error('Error handling webhook:', error);
                throw error;
            }
        });
    }
    static handleSuccessfulSubscription(userId, customerId, subscriptionId, planType) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = yield stripe.subscriptions.retrieve(subscriptionId);
            const priceId = subscription.items.data[0].price.id;
            // Calculate subscription end date (30 days from now)
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 30);
            // Update or create subscription in database
            yield prisma.subscription.upsert({
                where: { userId },
                update: {
                    type: planType,
                    stripeCustomerId: customerId,
                    stripePriceId: priceId,
                    stripeSubscriptionId: subscriptionId,
                    isActive: true,
                    endDate,
                    dailyLimit: this.getDailyLimitByPlan(planType),
                },
                create: {
                    userId,
                    type: planType,
                    stripeCustomerId: customerId,
                    stripePriceId: priceId,
                    stripeSubscriptionId: subscriptionId,
                    isActive: true,
                    endDate,
                    dailyLimit: this.getDailyLimitByPlan(planType),
                },
            });
        });
    }
    static handleCancelledSubscription(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.subscription.update({
                where: { userId },
                data: {
                    isActive: false,
                    type: 'FREE',
                    dailyLimit: this.getDailyLimitByPlan('FREE'),
                },
            });
        });
    }
    static getDailyLimitByPlan(planType) {
        switch (planType) {
            case 'FREE':
                return 5;
            case 'BASIC':
                return 50;
            case 'PREMIUM':
                return 100;
            default:
                return 5;
        }
    }
}
exports.StripeService = StripeService;
