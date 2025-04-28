"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOtp = exports.forgotPassword = void 0;
const zod_1 = require("zod");
exports.forgotPassword = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
});
exports.verifyOtp = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    otp: zod_1.z.string({ required_error: "OTP is required" }),
});
exports.resetPassword = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    newPassword: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(64, "Password must be at most 64 characters long"),
});
