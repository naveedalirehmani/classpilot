"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.updateUserRoleSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    role: zod_1.z.nativeEnum(client_1.Roles),
});
