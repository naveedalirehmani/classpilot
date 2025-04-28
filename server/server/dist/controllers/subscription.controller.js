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
exports.SubscriptionController = void 0;
const stripe_service_1 = require("../services/stripe.service");
const client_1 = require("@prisma/client");
const stripe_1 = __importDefault(require("stripe"));
const stripe_config_1 = require("../config/stripe.config");
const prisma = new client_1.PrismaClient();
const stripe = new stripe_1.default(stripe_config_1.config.stripe.secretKey, {
    apiVersion: '2025-03-31.basil',
});
class SubscriptionController {
    static createCheckoutSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { priceId, planType } = req.body;
                const { userId } = req === null || req === void 0 ? void 0 : req.user;
                if (!userId) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const session = yield stripe_service_1.StripeService.createCheckoutSession(userId, priceId, planType);
                res.json({ url: session.url });
            }
            catch (error) {
                console.error('Error creating checkout session:', error);
                res.status(500).json({ message: 'Error creating checkout session' });
            }
        });
    }
    static handleWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sig = req.headers['stripe-signature'];
            try {
                const event = stripe.webhooks.constructEvent(req.body, sig, stripe_config_1.config.stripe.webhookSecret);
                yield stripe_service_1.StripeService.handleWebhook(event);
                res.json({ received: true });
            }
            catch (error) {
                console.error('Webhook error:', error);
                res.status(400).json({ message: 'Webhook error' });
            }
        });
    }
    static getCurrentSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                if (!userId) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const subscription = yield prisma.subscription.findUnique({
                    where: { userId },
                });
                res.json(subscription);
            }
            catch (error) {
                console.error('Error fetching subscription:', error);
                res.status(500).json({ message: 'Error fetching subscription' });
            }
        });
    }
    static cancelSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                if (!userId) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                const subscription = yield prisma.subscription.findUnique({
                    where: { userId },
                });
                if (!(subscription === null || subscription === void 0 ? void 0 : subscription.stripeSubscriptionId)) {
                    return res.status(404).json({ message: 'No active subscription found' });
                }
                yield stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
                yield prisma.subscription.update({
                    where: { userId },
                    data: {
                        isActive: false,
                        type: 'FREE',
                    },
                });
                res.json({ message: 'Subscription cancelled successfully' });
            }
            catch (error) {
                console.error('Error cancelling subscription:', error);
                res.status(500).json({ message: 'Error cancelling subscription' });
            }
        });
    }
}
exports.SubscriptionController = SubscriptionController;
