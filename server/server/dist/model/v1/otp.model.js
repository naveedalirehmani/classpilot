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
exports.findValidOtpByEmail = exports.expireOtpById = exports.findValidOtp = exports.createOtp = exports.expireExistingOtps = void 0;
const uuid_1 = require("uuid");
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
const errors_1 = require("../../utils/errors");
const expireExistingOtps = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_config_1.default.otp.updateMany({
            where: { userId, isExpired: false },
            data: { isExpired: true },
        });
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.expireExistingOtps = expireExistingOtps;
const createOtp = (otp, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_config_1.default.otp.create({
            data: {
                id: (0, uuid_1.v4)(),
                otp,
                userId,
            },
        });
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.createOtp = createOtp;
const findValidOtp = (userId, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return prisma_config_1.default.otp.findFirst({
            where: {
                userId,
                otp,
                isExpired: false,
                created_at: {
                    gte: new Date(Date.now() - 10 * 60 * 1000),
                },
            },
        });
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.findValidOtp = findValidOtp;
const expireOtpById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_config_1.default.otp.update({
            where: { id },
            data: { isExpired: true },
        });
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.expireOtpById = expireOtpById;
const findValidOtpByEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_config_1.default.users.findUnique({ where: { email } });
        if (!user)
            return null;
        return yield prisma_config_1.default.otp.findFirst({
            where: { userId: user.id, otp, isExpired: false },
        });
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.findValidOtpByEmail = findValidOtpByEmail;
