"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpByEmailSchema = exports.sendOtpwithUserSchema = exports.sendOtpSchema = exports.verifyOtpSchema = void 0;
const zod_1 = require("zod");
exports.verifyOtpSchema = zod_1.z.object({
    otp: zod_1.z
        .string({ required_error: "Otp is required" })
});
exports.sendOtpSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
});
exports.sendOtpwithUserSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" }),
    userId: zod_1.z
        .string({ required_error: "User Id is required" })
});
exports.verifyOtpByEmailSchema = zod_1.z.object({
    otp: zod_1.z
        .string({ required_error: "Otp is required" }),
    email: zod_1.z
        .string({ required_error: "Email is required" })
});
