"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRestriction = exports.getUserRestrictions = exports.getAllRestrictions = exports.addRestriction = void 0;
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
const response_enums_1 = require("../../types/response.enums");
const errors_1 = require("../../utils/errors");
const addRestriction = (userId, restrictionType) => __awaiter(void 0, void 0, void 0, function* () {
    const existingRestriction = yield prisma_config_1.default.userRestrictions.findFirst({
        where: {
            userId,
            restrictionType,
        },
    });
    if (existingRestriction) {
        throw new errors_1.ValidationError(`Restriction of type '${restrictionType}' already exists for this user.`, response_enums_1.ResponseStatus.Conflict);
    }
    const restriction = yield prisma_config_1.default.userRestrictions.create({
        data: {
            userId,
            restrictionType,
        },
    });
    return restriction;
});
exports.addRestriction = addRestriction;
const getAllRestrictions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restrictions = yield prisma_config_1.default.userRestrictions.findMany();
        return restrictions;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.getAllRestrictions = getAllRestrictions;
const getUserRestrictions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restrictions = yield prisma_config_1.default.userRestrictions.findMany({
            where: {
                userId,
            },
        });
        return restrictions;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.getUserRestrictions = getUserRestrictions;
const removeRestriction = (userId, restrictionType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restriction = yield prisma_config_1.default.userRestrictions.deleteMany({
            where: {
                userId,
                restrictionType,
            },
        });
        return restriction;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.removeRestriction = removeRestriction;
