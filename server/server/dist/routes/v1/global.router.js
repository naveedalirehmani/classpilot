"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./auth.router"));
const opt_router_1 = __importDefault(require("./opt.router"));
const role_router_1 = __importDefault(require("./role.router"));
const restrictions_router_1 = __importDefault(require("./restrictions.router"));
const user_router_1 = __importDefault(require("./user.router"));
const health_router_1 = __importDefault(require("./health.router"));
const lessonPlan_router_1 = __importDefault(require("./lessonPlan.router"));
const subscription_router_1 = __importDefault(require("./subscription.router"));
const Api2 = (0, express_1.Router)();
// authentication. 
//TODO : unit test.
Api2.use("/auth", auth_router_1.default);
// otp routes
//TODO : unit test.
Api2.use("/otp", opt_router_1.default);
// roles routes
Api2.use("/roles", role_router_1.default);
// Notification router for sending and saving notifications
Api2.use("/restrictions", restrictions_router_1.default);
Api2.use("/user", user_router_1.default);
// health route for server status
//TODO : unit test.
Api2.use("/health", health_router_1.default);
Api2.use("/lesson-plan", lessonPlan_router_1.default);
// subscription routes
Api2.use("/subscription", subscription_router_1.default);
exports.default = Api2;
