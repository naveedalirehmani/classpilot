"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.deleteAccountsSchema = exports.createAccountsSchema = exports.loginSchema = exports.updateUserDetailsSchema = exports.signUpSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required." })
        .email({ message: "Invalid email format." }),
    password: zod_1.z
        .string({ required_error: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters long." }),
    name: zod_1.z
        .string({ required_error: "Name is required." })
        .min(1, { message: "Name must be at least 1 character long." }),
});
exports.updateUserDetailsSchema = zod_1.z.object({
    organization: zod_1.z.string().optional(),
    profession: zod_1.z.string().optional(),
    howDidYouHearAboutUs: zod_1.z.string().optional(),
    schoolName: zod_1.z.string().optional(),
    yearsOfExperience: zod_1.z.number().optional(),
    subjectsTaught: zod_1.z.string().optional(),
    gradeLevel: zod_1.z.string().optional(),
    educationalQualification: zod_1.z.string().optional(),
    teacherLicenseNumber: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required." })
        .email({ message: "Invalid email format." }),
    password: zod_1.z
        .string({ required_error: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters long." }),
});
exports.createAccountsSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required." })
        .email({ message: "Invalid email format." }),
    password: zod_1.z
        .string({ required_error: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters long." }),
    type: zod_1.z
        .enum([client_1.Roles.ADMIN, client_1.Roles.DEVELOPER], {
        required_error: "Type is required.",
    })
        .describe('The type of account: "admin" or "developer"'),
    age: zod_1.z.number().optional(),
    expoPushToken: zod_1.z.string().optional(),
});
exports.deleteAccountsSchema = zod_1.z.object({
    userId: zod_1.z
        .string({ required_error: "User ID is required." })
        .uuid({ message: "Invalid user ID format." }), // Assuming UUID format for user ID
    expoPushToken: zod_1.z.string().optional(),
});
exports.resetPasswordSchema = zod_1.z.object({
    otp: zod_1.z.string({ required_error: "OTP is required." }),
    email: zod_1.z
        .string({ required_error: "Email is required." })
        .email({ message: "Invalid email format." }),
    password: zod_1.z
        .string({ required_error: "Password is required." })
        .min(8, { message: "Password must be at least 8 characters long." }),
});
