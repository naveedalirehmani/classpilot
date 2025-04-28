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
exports.validateRoleHierarchy = exports.hashPassword = exports.generateUserName = void 0;
exports.comparePassword = comparePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const user_model_1 = require("../model/v1/user.model");
const roleHierarchy = {
    [client_1.Roles.SUPER_ADMIN]: 5,
    [client_1.Roles.ADMIN]: 4,
    [client_1.Roles.DEVELOPER]: 4,
    [client_1.Roles.ANALYST]: 3,
    [client_1.Roles.MODERATOR]: 3,
    [client_1.Roles.USER]: 2,
    [client_1.Roles.GUEST]: 1,
};
const generateUserName = () => {
    const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
    return `user${randomFourDigitNumber}`;
};
exports.generateUserName = generateUserName;
const hashPassword = (password) => {
    const saltRounds = parseInt(process.env.SALT);
    return bcrypt_1.default.hashSync(password, saltRounds);
};
exports.hashPassword = hashPassword;
function comparePassword(password, hashedPassword) {
    try {
        const result = bcrypt_1.default.compareSync(password, hashedPassword);
        return result;
    }
    catch (error) {
        console.error(error);
        throw new Error("Comparison failed");
    }
}
const validateRoleHierarchy = (requesterRole, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetUser = yield (0, user_model_1.getUserRole)(targetUserId);
        if (!requesterRole || !targetUser) {
            return false;
        }
        if (!(requesterRole in roleHierarchy) || !(targetUser.role in roleHierarchy)) {
            return false;
        }
        return roleHierarchy[requesterRole] >= roleHierarchy[targetUser.role];
    }
    catch (error) {
        throw new Error("Error checking user roles");
    }
});
exports.validateRoleHierarchy = validateRoleHierarchy;
