"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = void 0;
const zod_1 = require("zod");
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .regex(/^\d+$/, "Page must be a positive integer")
        .transform(Number)
        .optional(),
    limit: zod_1.z
        .string()
        .regex(/^\d+$/, "Limit must be a positive integer")
        .transform(Number)
        .optional(),
});
