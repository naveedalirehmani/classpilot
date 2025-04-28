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
exports.deleteMyAccount = exports.isAuthenticated = exports.resetPasswordHandler = exports.refreshAccessToken = exports.passwordRecoveryHandler = exports.signinHandler = exports.signupHandler = void 0;
exports.logoutHandler = logoutHandler;
const authModel = __importStar(require("../../model/v1/auth.model"));
const response_enums_1 = require("../../types/response.enums");
const bcryptHelper = __importStar(require("../../utils"));
const auth_validation_1 = require("../../schema/v1/auth.validation");
const auth_utils_1 = require("../../utils/auth.utils");
const jwt_utils_1 = require("../../utils/jwt.utils");
// import * as userModel from "../../model/v1/user.model";
const email_service_1 = __importDefault(require("../../services/email.service"));
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const LOGOUT_COOKIE_OPTIONS = Object.assign({ httpOnly: true, secure: IS_PRODUCTION, sameSite: IS_PRODUCTION ? "none" : "lax" }, (IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT }));
const signupHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = auth_validation_1.signUpSchema.parse(request.body);
        const existingUser = yield authModel.findUserByEmail(email);
        if (existingUser) {
            return response
                .status(response_enums_1.ResponseStatus.BadRequest)
                .json({ message: response_enums_1.ResponseMessages.UserAlreadyExists });
        }
        const newUser = yield authModel.createUser({
            email,
            password,
            name,
        });
        const isMobileClient = request.headers["x-client"] === "mobile";
        const { accessToken, refreshToken } = (0, auth_utils_1.setUserCookies)(response, newUser, isMobileClient);
        if (isMobileClient) {
            return response.status(response_enums_1.ResponseStatus.Created).json({
                message: response_enums_1.ResponseMessages.Success,
                accessToken,
                refreshToken,
                role: newUser.role,
                userId: newUser.id,
                firstTimeLogin: newUser.firstTimeLogin,
                restrictions: newUser.restrictions.map((restriction) => restriction.restrictionType),
                isVerified: newUser.isVerified,
                name: newUser.name,
            });
        }
        return response.status(response_enums_1.ResponseStatus.Created).json({
            message: response_enums_1.ResponseMessages.Success,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signupHandler = signupHandler;
const signinHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = auth_validation_1.loginSchema.parse(request.body);
        const user = yield authModel.findUserByEmail(email);
        if (!user || !bcryptHelper.comparePassword(password, user.password)) {
            return response
                .status(response_enums_1.ResponseStatus.Unauthorized)
                .send({ message: "Invalid Credentials" });
        }
        if (user.isDeleted) {
            return response.status(response_enums_1.ResponseStatus.Unauthorized).send({
                message: "Your Account has been deleted.",
            });
        }
        if (user.isSuspended) {
            return response.status(response_enums_1.ResponseStatus.Unauthorized).send({
                message: "Your Account is Temporarily Suspended, Contact Customer support for further assistance.",
            });
        }
        if (!user.isTemporaryPasswordReset &&
            (user.role == "ADMIN" || user.role == "DEVELOPER")) {
            return response.status(response_enums_1.ResponseStatus.Unauthorized).send({
                message: "Please reset your temporary password.",
                data: user,
            });
        }
        const isMobileClient = request.headers["x-client"] === "mobile";
        const { accessToken, refreshToken } = (0, auth_utils_1.setUserCookies)(response, user, isMobileClient);
        if (isMobileClient) {
            return response.status(response_enums_1.ResponseStatus.OK).json({
                userId: user.id,
                message: response_enums_1.ResponseMessages.Success,
                accessToken,
                refreshToken,
                isVerified: user ? user.isVerified : false,
                role: user.role,
                isTemporaryPasswordReset: user.isTemporaryPasswordReset,
                firstTimeLogin: user.firstTimeLogin,
                restrictions: user.restrictions.map((restriction) => restriction.restrictionType),
                name: user.name,
            });
        }
        return response.status(response_enums_1.ResponseStatus.OK).json({
            message: response_enums_1.ResponseMessages.Success,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.signinHandler = signinHandler;
const passwordRecoveryHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = auth_validation_1.loginSchema.parse(request.body);
        const user = yield authModel.findUserByEmail(email);
        if (!user) {
            return response
                .status(response_enums_1.ResponseStatus.NotFound)
                .json({ message: response_enums_1.ResponseMessages.UserNotFound });
        }
        const isPasswordCorrect = bcryptHelper.comparePassword(password, user.password);
        if (isPasswordCorrect) {
            return response.status(response_enums_1.ResponseStatus.BadRequest).json({
                message: "New password cannot be the same as the old password",
            });
        }
        yield authModel.updatePassword(user.id, password);
        return response
            .status(response_enums_1.ResponseStatus.OK)
            .json({ message: response_enums_1.ResponseMessages.Success });
    }
    catch (error) {
        next(error);
    }
});
exports.passwordRecoveryHandler = passwordRecoveryHandler;
function logoutHandler(_, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("logoutHandler");
            response.clearCookie("access_token", LOGOUT_COOKIE_OPTIONS);
            response.clearCookie("refresh_token", LOGOUT_COOKIE_OPTIONS);
            console.log("logoutHandler 2");
            // log cookies
            console.log("cookies", response.getHeaders());
            return response
                .status(response_enums_1.ResponseStatus.OK)
                .json({ message: response_enums_1.ResponseMessages.Success });
        }
        catch (error) {
            next(error);
        }
    });
}
const refreshAccessToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = request.headers["x-refresh-token"];
        if (!refreshToken) {
            return response
                .status(response_enums_1.ResponseStatus.Unauthorized)
                .json({ message: response_enums_1.ResponseMessages.Unauthorized });
        }
        const { payload } = (0, jwt_utils_1.verifyJWT)(refreshToken);
        if (!payload) {
            return response
                .status(response_enums_1.ResponseStatus.Unauthorized)
                .json({ message: "Invalid refresh token" });
        }
        const newAccessToken = (0, jwt_utils_1.signJWT)({
            email: payload.email,
            userId: payload.userId,
            oAuthAccessToken: payload.oAuthAccessToken,
            role: payload.role,
        }, "12h" // expires in 12 hour
        );
        console.log("return access toekn");
        return response.status(response_enums_1.ResponseStatus.OK).json({
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.refreshAccessToken = refreshAccessToken;
const resetPasswordHandler = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp, email, password } = auth_validation_1.resetPasswordSchema.parse(request.body);
        const user = yield authModel.findUserByEmail(email);
        if (!user) {
            return response
                .status(response_enums_1.ResponseStatus.NotFound)
                .json({ message: response_enums_1.ResponseMessages.UserNotFound });
        }
        const isValidOtp = yield email_service_1.default.verifyOtpHandler(user.id, parseInt(otp));
        if (!isValidOtp) {
            return response
                .status(response_enums_1.ResponseStatus.BadRequest)
                .json({ message: "Invalid or expired OTP" });
        }
        yield authModel.updatePassword(user.id, password);
        return response
            .status(response_enums_1.ResponseStatus.OK)
            .json({ message: response_enums_1.ResponseMessages.Success });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPasswordHandler = resetPasswordHandler;
const isAuthenticated = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!request.user) {
            return response.status(response_enums_1.ResponseStatus.NotAcceptable).json({
                message: "logout request",
            });
        }
        const user = yield authModel.fetchUserVerifiedStatus(request.user.userId);
        const userStatus = {
            isVerified: user ? user.isVerified : false,
            user,
        };
        response.status(response_enums_1.ResponseStatus.OK).json(userStatus);
    }
    catch (error) {
        next(error);
    }
});
exports.isAuthenticated = isAuthenticated;
const deleteMyAccount = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, email } = request.user;
        const userData = yield authModel.findUserByEmail(email);
        if (!userData) {
            return response
                .status(response_enums_1.ResponseStatus.NotFound)
                .json({ message: response_enums_1.ResponseMessages.UserNotFound });
        }
        const deleteUser = yield authModel.deleteUser(userId);
        return response
            .status(response_enums_1.ResponseStatus.OK)
            .json({ message: response_enums_1.ResponseMessages.Success, data: deleteUser });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteMyAccount = deleteMyAccount;
