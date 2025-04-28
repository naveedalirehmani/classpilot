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
exports.verifyOtpByEmailHandler = exports.sendOtpByEmailHandler = exports.sendOtpHandler = exports.verifyOtpHandler = void 0;
const email_service_1 = __importDefault(require("../../services/email.service"));
const userModel = __importStar(require("../../model/v1/user.model"));
const authModel = __importStar(require("../../model/v1/auth.model"));
const response_enums_1 = require("../../types/response.enums");
const otp_validation_1 = require("../../schema/v1/otp.validation");
const errors_1 = require("../../utils/errors");
const verifyOtpHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.user;
        const { otp } = otp_validation_1.verifyOtpSchema.parse(request.body);
        const isValidOtp = yield email_service_1.default.verifyOtpHandler(userId, parseInt(otp));
        if (isValidOtp) {
            yield userModel.updateUserVerificationStatus(userId, true);
            return response
                .status(response_enums_1.ResponseStatus.OK)
                .json({ message: response_enums_1.ResponseMessages.Success });
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
const sendOtpHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, email } = otp_validation_1.sendOtpwithUserSchema.parse(request.body);
        yield email_service_1.default.sendOtpHandler(userId, email);
        return response
            .status(response_enums_1.ResponseStatus.OK)
            .json({ message: response_enums_1.ResponseMessages.Success });
    }
    catch (error) {
        return next(error);
    }
});
exports.sendOtpHandler = sendOtpHandler;
const sendOtpByEmailHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = otp_validation_1.sendOtpSchema.parse(request.body);
        const user = yield authModel.findUserByEmail(email);
        if (!user) {
            return response
                .status(response_enums_1.ResponseStatus.NotFound)
                .json({ message: "User not found." });
        }
        const userId = user.id;
        yield email_service_1.default.sendOtpHandler(userId, email);
        return response
            .status(response_enums_1.ResponseStatus.OK)
            .json({ message: response_enums_1.ResponseMessages.Success });
    }
    catch (error) {
        return response
            .status(response_enums_1.ResponseStatus.InternalServerError)
            .json({ message: error.message });
    }
});
exports.sendOtpByEmailHandler = sendOtpByEmailHandler;
const verifyOtpByEmailHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = otp_validation_1.verifyOtpByEmailSchema.parse(request.body);
        const user = yield authModel.findUserByEmail(email);
        if (!user) {
            return response
                .status(response_enums_1.ResponseStatus.NotFound)
                .json({ message: "User not found." });
        }
        const userId = user.id;
        const isValidOtp = yield email_service_1.default.verifyOtpHandler(userId, parseInt(otp));
        if (isValidOtp) {
            return response
                .status(response_enums_1.ResponseStatus.OK)
                .json({ message: response_enums_1.ResponseMessages.Success });
        }
        else {
            throw new errors_1.ValidationError("Invalid or expired OTP");
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.verifyOtpByEmailHandler = verifyOtpByEmailHandler;
