"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.getSchema = exports.createSchema = void 0;
const zod_1 = require("zod");
exports.createSchema = zod_1.z.object({
    userId: zod_1.z
        .string({ required_error: "User Id is required" }),
    permissions: zod_1.z
        .array(zod_1.z.string(), { required_error: "Permissions is required" })
});
exports.getSchema = zod_1.z.object({
    userId: zod_1.z
        .string({ required_error: "User Id is required" })
});
exports.updateSchema = zod_1.z.object({
    permissions: zod_1.z
        .array(zod_1.z.string(), { required_error: "Permissions is required" })
});
