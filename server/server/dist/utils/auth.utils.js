"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserCookies = setUserCookies;
const jwt_utils_1 = require("./jwt.utils");
const global_1 = require("../types/global");
const ACCESS_TOKEN_MAX_AGE = 3600000 * 24; // 24 hours in milliseconds
const REFRESH_TOKEN_MAX_AGE = 3.154e10; // 1 year in milliseconds
const IS_PRODUCTION = process.env.NODE_ENV === global_1.environment.PRODUCTION;
function setUserCookies(response, user, isMobileClient) {
    const accessToken = (0, jwt_utils_1.signJWT)({
        email: user.email,
        userId: `${user.id}`,
        role: user.role,
        name: user.name,
    }, "12h");
    const refreshToken = (0, jwt_utils_1.signJWT)({
        email: user.email,
        userId: `${user.id}`,
        role: user.role,
        name: user.name,
    }, "1y");
    if (!isMobileClient) {
        response.cookie("access_token", accessToken, Object.assign({ maxAge: ACCESS_TOKEN_MAX_AGE, httpOnly: true, secure: IS_PRODUCTION, sameSite: IS_PRODUCTION ? "none" : "lax" }, (IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT })));
        response.cookie("refresh_token", refreshToken, Object.assign({ maxAge: REFRESH_TOKEN_MAX_AGE, httpOnly: true, secure: IS_PRODUCTION, sameSite: IS_PRODUCTION ? "none" : "lax" }, (IS_PRODUCTION && { domain: process.env.COOKIE_CLIENT })));
    }
    return { accessToken, refreshToken };
}
