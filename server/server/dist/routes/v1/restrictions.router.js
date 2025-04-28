"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restrictionController = __importStar(require("../../controllers/v1/restrictions.controller"));
const isAuthorized_1 = __importDefault(require("../../middleware/isAuthorized"));
const client_1 = require("@prisma/client");
const restrictionsRouter = (0, express_1.Router)();
// Add a new restriction
restrictionsRouter.post("/", (0, isAuthorized_1.default)([client_1.Roles.SUPER_ADMIN, client_1.Roles.ADMIN, client_1.Roles.DEVELOPER]), restrictionController.addRestriction);
// Get all restrictions
restrictionsRouter.get("/", (0, isAuthorized_1.default)([client_1.Roles.SUPER_ADMIN, client_1.Roles.ADMIN]), restrictionController.getAllRestrictions);
// Get restrictions for a specific user by userId
restrictionsRouter.get("/:userId", (0, isAuthorized_1.default)([client_1.Roles.SUPER_ADMIN, client_1.Roles.ADMIN]), restrictionController.getUserRestrictions);
// Remove a restriction
restrictionsRouter.delete("/", (0, isAuthorized_1.default)([client_1.Roles.SUPER_ADMIN, client_1.Roles.ADMIN, client_1.Roles.DEVELOPER]), restrictionController.removeRestriction);
exports.default = restrictionsRouter;
