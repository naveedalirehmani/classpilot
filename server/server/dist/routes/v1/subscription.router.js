"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_controller_1 = require("../../controllers/subscription.controller");
const router = (0, express_1.Router)();
// Create checkout session for subscription
router.post('/create-checkout-session', subscription_controller_1.SubscriptionController.createCheckoutSession);
// Handle Stripe webhook
router.post('/webhook', subscription_controller_1.SubscriptionController.handleWebhook);
// Get current user's subscription
router.get('/current', subscription_controller_1.SubscriptionController.getCurrentSubscription);
// Cancel subscription
router.post('/cancel', subscription_controller_1.SubscriptionController.cancelSubscription);
exports.default = router;
