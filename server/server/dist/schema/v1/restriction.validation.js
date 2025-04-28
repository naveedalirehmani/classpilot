"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRestrictionSchema = exports.getRestrictionSchema = exports.createRestrictionSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.createRestrictionSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    restrictionType: zod_1.z.enum([
        client_1.Restrictions.CREATE_POST,
        client_1.Restrictions.EDIT_POST,
        client_1.Restrictions.DELETE_POST,
        client_1.Restrictions.VIEW_POST,
        client_1.Restrictions.CREATE_COMMENT,
        client_1.Restrictions.VIEW_COMMENT,
        client_1.Restrictions.ANALYTICS,
        client_1.Restrictions.REPORT,
        client_1.Restrictions.ACCOUNT,
        client_1.Restrictions.CONTENT,
    ]),
});
exports.getRestrictionSchema = zod_1.z.object({
    userId: zod_1.z.string(),
});
exports.removeRestrictionSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    restrictionType: zod_1.z.enum([
        client_1.Restrictions.CREATE_POST,
        client_1.Restrictions.EDIT_POST,
        client_1.Restrictions.DELETE_POST,
        client_1.Restrictions.VIEW_POST,
        client_1.Restrictions.CREATE_COMMENT,
        client_1.Restrictions.VIEW_COMMENT,
        client_1.Restrictions.ANALYTICS,
        client_1.Restrictions.REPORT,
        client_1.Restrictions.ACCOUNT,
        client_1.Restrictions.CONTENT,
    ]),
});
