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
exports.updateUserDetails = exports.resetPassword = exports.findUserByEmail = exports.getCurrentUserDetails = exports.markUserAsDeleted = exports.toggleFirstTimeLogin = exports.getUserRole = exports.getUser = exports.updateUserVerificationStatus = void 0;
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
const utils_1 = require("../../utils");
const errors_1 = require("../../utils/errors");
const updateUserVerificationStatus = (userId, isVerified) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_config_1.default.users.update({
        where: { id: userId },
        data: { isVerified },
    });
});
exports.updateUserVerificationStatus = updateUserVerificationStatus;
const getUser = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_config_1.default.users.findUnique({
            where: { id: userID }, // replace with user id
            select: {
                email: true,
                name: true,
            },
        });
        return users;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.getUser = getUser;
const getUserRole = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_config_1.default.users.findUnique({
            where: { id: userID },
            select: {
                role: true,
            },
        });
        return users;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.getUserRole = getUserRole;
const toggleFirstTimeLogin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_config_1.default.users.findUnique({
            where: { id },
        });
        if (!user)
            return null;
        const updatedUser = yield prisma_config_1.default.users.update({
            where: { id },
            data: { firstTimeLogin: !user.firstTimeLogin },
        });
        return updatedUser;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.toggleFirstTimeLogin = toggleFirstTimeLogin;
const markUserAsDeleted = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_config_1.default.users.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return null;
        }
        const updatedUser = yield prisma_config_1.default.users.update({
            where: { id: userId },
            data: { isDeleted: true },
        });
        return updatedUser;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.markUserAsDeleted = markUserAsDeleted;
const getCurrentUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_config_1.default.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                isSuspended: true,
                isVerified: true,
                role: true,
                isTemporaryPasswordReset: true,
                isDeleted: true,
                restrictions: true,
                created_at: true,
                onboardingCompleted: true,
                organization: true,
                profession: true,
                howDidYouHearAboutUs: true,
                schoolName: true,
                yearsOfExperience: true,
                subjectsTaught: true,
                gradeLevel: true,
                educationalQualification: true,
                teacherLicenseNumber: true,
            },
        });
        return user;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.getCurrentUserDetails = getCurrentUserDetails;
// PASSWORD RECOVERY.
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_config_1.default.users.findUnique({
            where: { email },
        });
        return user;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.findUserByEmail = findUserByEmail;
const resetPassword = (userId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = (0, utils_1.hashPassword)(newPassword);
        const updatedUser = yield prisma_config_1.default.users.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        return updatedUser;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.resetPassword = resetPassword;
const updateUserDetails = (userId, userDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma_config_1.default.users.update({
            where: { id: userId },
            data: Object.assign(Object.assign({}, userDetails), { onboardingCompleted: true }),
        });
        return updatedUser;
    }
    catch (error) {
        throw new errors_1.DatabaseError(error.message);
    }
});
exports.updateUserDetails = updateUserDetails;
