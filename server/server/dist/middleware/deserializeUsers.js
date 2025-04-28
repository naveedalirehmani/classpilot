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
Object.defineProperty(exports, "__esModule", { value: true });
require("express");
const jwt_utils_1 = require("../utils/jwt.utils");
const global_1 = require("../types/global");
const response_enums_1 = require("../types/response.enums");
const ACCESS_TOKEN_MAX_AGE = 3600000 * 12; // 12 hours in milliseconds
const IS_PRODUCTION = process.env.NODE_ENV === global_1.environment.PRODUCTION;
function deserializeUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("DESERIALIZE-USER");
        let accessToken = null;
        let refreshToken = null;
        const isMobileClient = request.headers["x-client"] === "mobile";
        if (isMobileClient) {
            accessToken = request.headers["x-client-access"];
            refreshToken = request.headers["x-client-refresh"];
        }
        else {
            accessToken = request.cookies["access_token"];
            refreshToken = request.cookies["refresh_token"];
        }
        console.log({ accessToken, refreshToken });
        if (!accessToken) {
            return next();
        }
        const { payload, expired } = (0, jwt_utils_1.verifyJWT)(accessToken);
        console.log({ payload, expired });
        // If the access token is valid, set the user and proceed
        if (payload) {
            request.user = payload;
            return next();
        }
        // If no refresh token is provided, handle based on the platform
        if (!refreshToken) {
            if (isMobileClient && expired) {
                console.log('here');
                return response.status(response_enums_1.ResponseStatus.Unauthorized).json({
                    message: "Access token expired",
                });
            }
            return next();
        }
        // If the access token is expired
        if (expired) {
            if (isMobileClient) {
                // Mobile clients should receive a 401 Unauthorized response
                console.log("// Mobile clients should receive a 401 Unauthorized response");
                return response.status(response_enums_1.ResponseStatus.Unauthorized).json({
                    message: "Access token expired",
                });
            }
            else {
                // Web clients should automatically reset the access token
                const refreshResult = (0, jwt_utils_1.verifyJWT)(refreshToken);
                const refreshPayload = refreshResult.payload;
                if (!refreshPayload) {
                    return next();
                }
                request.user = refreshPayload;
                const newAccessToken = yield revalidatedAccessToken(refreshPayload.userId, request, response);
                if (newAccessToken) {
                    request.user = newAccessToken;
                }
                return next();
            }
        }
        return next();
    });
}
function revalidatedAccessToken(userId, request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("REVALIDATEING-SESSION");
        const newAccessToken = (0, jwt_utils_1.signJWT)({
            email: request.user.email,
            userId: request.user.userId,
            oAuthAccessToken: request.user.oAuthAccessToken,
            role: request.user.role,
        }, "12h");
        response.cookie("access_token", newAccessToken, Object.assign({ maxAge: ACCESS_TOKEN_MAX_AGE, httpOnly: true, secure: IS_PRODUCTION, sameSite: IS_PRODUCTION ? "none" : "lax" }, (IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT })));
        const newPayload = (0, jwt_utils_1.verifyJWT)(newAccessToken).payload;
        return newPayload;
    });
}
exports.default = deserializeUser;
