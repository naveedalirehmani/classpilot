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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRestriction = exports.getUserRestrictions = exports.getAllRestrictions = exports.addRestriction = void 0;
const restrictionModel = __importStar(require("../../model/v1/restrictions.model"));
const response_enums_1 = require("../../types/response.enums");
const restriction_validation_1 = require("../../schema/v1/restriction.validation");
const utils_1 = require("../../utils");
const errors_1 = require("../../utils/errors");
const addRestriction = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, restrictionType } = restriction_validation_1.createRestrictionSchema.parse(request.body);
        const requesterRole = request.user.role;
        // TODO : need to handle error handling globally.
        const canModify = yield (0, utils_1.validateRoleHierarchy)(requesterRole, userId);
        if (!canModify) {
            throw new errors_1.ValidationError("You do not have permission to modify this user", 403);
        }
        const restriction = yield restrictionModel.addRestriction(userId, restrictionType);
        response
            .status(response_enums_1.ResponseStatus.Created)
            .json({ message: "Restriction added successfully", restriction });
    }
    catch (error) {
        return next(error);
    }
});
exports.addRestriction = addRestriction;
const getAllRestrictions = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restrictions = yield restrictionModel.getAllRestrictions();
        response
            .status(response_enums_1.ResponseStatus.OK)
            .json({ message: "Restrictions fetched successfully", restrictions });
    }
    catch (error) {
        return next(error);
    }
});
exports.getAllRestrictions = getAllRestrictions;
const getUserRestrictions = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = restriction_validation_1.getRestrictionSchema.parse(request.params);
        const restrictions = yield restrictionModel.getUserRestrictions(userId);
        response.status(response_enums_1.ResponseStatus.OK).json({
            message: "User restrictions fetched successfully",
            restrictions,
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.getUserRestrictions = getUserRestrictions;
const removeRestriction = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, restrictionType } = restriction_validation_1.removeRestrictionSchema.parse(request.body);
        const requesterRole = request.user.role;
        const canModify = yield (0, utils_1.validateRoleHierarchy)(requesterRole, userId);
        if (!canModify) {
            throw new errors_1.ValidationError("You do not have permission to modify this user", 403);
        }
        const restriction = yield restrictionModel.removeRestriction(userId, restrictionType);
        response
            .status(response_enums_1.ResponseStatus.Created)
            .json({ message: "Restriction removed successfully", restriction });
    }
    catch (error) {
        return next(error);
    }
});
exports.removeRestriction = removeRestriction;
