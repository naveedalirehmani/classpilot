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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetailsHandler = exports.resetPasswordHandler = exports.verifyOtpHandler = exports.forgotPasswordHandler = exports.deleteUserAccount = exports.toggleFirstTimeLogin = exports.getCurrentUserDetails = void 0;
const userModel = __importStar(require("../../model/v1/user.model"));
const response_enums_1 = require("../../types/response.enums");
const errors_1 = require("../../utils/errors");
const email_service_1 = __importDefault(require("../../services/email.service"));
const forgetPasswordSchema = __importStar(require("../../schema/v1/user.valdiation"));
const auth_validation_1 = require("../../schema/v1/auth.validation");
const getCurrentUserDetails = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = request === null || request === void 0 ? void 0 : request.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            throw new errors_1.NotFoundError("User not authenticated");
        }
        const currentUser = yield userModel.getCurrentUserDetails(userId);
        if (!currentUser) {
            throw new errors_1.NotFoundError("User not found");
        }
        response
            .status(response_enums_1.ResponseStatus.OK)
            .json(Object.assign({}, currentUser));
    }
    catch (error) {
        return next(error);
    }
});
exports.getCurrentUserDetails = getCurrentUserDetails;
const toggleFirstTimeLogin = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("called");
        const { userId } = request.user;
        const updatedUser = yield userModel.toggleFirstTimeLogin(userId);
        if (!updatedUser) {
            throw new errors_1.NotFoundError("User not found");
        }
        response
            .status(response_enums_1.ResponseStatus.OK)
            .json({ message: response_enums_1.ResponseMessages.Success, user: updatedUser });
    }
    catch (error) {
        return next(error);
    }
});
exports.toggleFirstTimeLogin = toggleFirstTimeLogin;
const deleteUserAccount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.user;
        const updatedUser = yield userModel.markUserAsDeleted(userId);
        if (!updatedUser) {
            throw new errors_1.NotFoundError("User not found");
        }
        response.status(response_enums_1.ResponseStatus.OK).json({
            message: response_enums_1.ResponseMessages.Success,
            user: updatedUser,
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.deleteUserAccount = deleteUserAccount;
// PASSWORD RECOVERY.
const forgotPasswordHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = forgetPasswordSchema.forgotPassword.parse(request.body);
        const user = yield userModel.findUserByEmail(email);
        if (!user) {
            throw new errors_1.ValidationError("User with this email does not exist");
        }
        yield email_service_1.default.sendOtpHandler(user.id, email);
        response.status(response_enums_1.ResponseStatus.OK).json({
            message: response_enums_1.ResponseMessages.Success,
            data: {
                email: user.email,
            },
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.forgotPasswordHandler = forgotPasswordHandler;
const verifyOtpHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = forgetPasswordSchema.verifyOtp.parse(request.body);
        console.log(email, otp);
        const user = yield userModel.findUserByEmail(email);
        if (!user) {
            throw new errors_1.NotFoundError("User with this email does not exist");
        }
        const isValidOtp = yield email_service_1.default.verifyOtpByEmailHandler(email, parseInt(otp));
        if (isValidOtp) {
            response.status(response_enums_1.ResponseStatus.OK).json({
                message: response_enums_1.ResponseMessages.Success,
            });
        }
        else {
            throw new errors_1.ValidationError("Invalid or expired OTP");
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.verifyOtpHandler = verifyOtpHandler;
const resetPasswordHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(request.body);
        const { email, newPassword } = forgetPasswordSchema.resetPassword.parse(request.body);
        const user = yield userModel.findUserByEmail(email);
        if (!user) {
            throw new errors_1.NotFoundError("User with this email does not exist");
        }
        const updatedUser = yield userModel.resetPassword(user.id, newPassword);
        response.status(response_enums_1.ResponseStatus.OK).json({
            message: response_enums_1.ResponseMessages.Success,
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
const updateUserDetailsHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.user;
        const { organization, profession, howDidYouHearAboutUs, schoolName, yearsOfExperience, subjectsTaught, gradeLevel, educationalQualification, teacherLicenseNumber, } = auth_validation_1.updateUserDetailsSchema.parse(request.body);
        const updatedUser = yield userModel.updateUserDetails(userId, {
            organization,
            profession,
            howDidYouHearAboutUs,
            schoolName,
            yearsOfExperience,
            subjectsTaught,
            gradeLevel,
            educationalQualification,
            teacherLicenseNumber,
        });
        return response.status(response_enums_1.ResponseStatus.OK).json(Object.assign({}, updatedUser));
    }
    catch (error) {
        return response.status(response_enums_1.ResponseStatus.InternalServerError).json({
            message: error.message,
        });
    }
});
exports.updateUserDetailsHandler = updateUserDetailsHandler;
