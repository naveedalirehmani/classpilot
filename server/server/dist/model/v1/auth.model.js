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
exports.deleteUser = exports.fetchUserVerifiedStatus = exports.updatePassword = exports.createUser = exports.findUserByEmail = void 0;
const client_1 = require("@prisma/client");
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
const utils_1 = require("../../utils");
const errors_1 = require("../../utils/errors");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_config_1.default.users.findFirst({
            where: {
                email,
            },
            include: {
                restrictions: {
                    select: {
                        restrictionType: true,
                    }
                }
            }
        });
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.findUserByEmail = findUserByEmail;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = data;
        const newUser = yield prisma_config_1.default.users.create({
            data: {
                email,
                name,
                password: (0, utils_1.hashPassword)(password),
                provider: client_1.OAuthProvider.EMAIL_PASSWORD,
                isSuspended: false,
                role: client_1.Roles.USER
            },
            include: {
                restrictions: true,
            },
        });
        return newUser;
    }
    catch (err) {
        throw err;
    }
});
exports.createUser = createUser;
const updatePassword = (userId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_config_1.default.users.update({
            where: {
                id: userId,
            },
            data: {
                password: (0, utils_1.hashPassword)(newPassword),
                isTemporaryPasswordReset: true,
            },
        });
    }
    catch (err) {
        throw err;
    }
});
exports.updatePassword = updatePassword;
const fetchUserVerifiedStatus = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_config_1.default.users.findUnique({
            where: {
                id: userId,
            },
            select: {
                isVerified: true,
                name: true,
            },
        });
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.fetchUserVerifiedStatus = fetchUserVerifiedStatus;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_config_1.default.users.findUnique({
            where: { id: userId, isDeleted: false },
        });
        if (!user) {
            throw new errors_1.ValidationError("User Does Not Exist");
        }
        const updatedUser = yield prisma_config_1.default.users.update({
            where: { id: userId },
            data: { isDeleted: true },
        });
        if (!updatedUser) {
            throw new errors_1.DatabaseError("Failed to delete account!");
        }
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUser = deleteUser;
