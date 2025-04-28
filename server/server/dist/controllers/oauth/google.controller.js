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
const axios_1 = __importDefault(require("axios"));
const response_enums_1 = require("../../types/response.enums");
const oauth_model_1 = require("../../model/v1/oauth/oauth.model");
const auth_utils_1 = require("../../utils/auth.utils");
const apiEndpoints_1 = require("../../constants/apiEndpoints");
const client_1 = require("@prisma/client");
class GoogleAuthController {
    static redirectToGoogleAuth(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUrl = apiEndpoints_1.API_ENDPOINTS.GOOGLE.AUTH_URL(GoogleAuthController.clientId, GoogleAuthController.redirectUri);
            response.status(response_enums_1.ResponseStatus.Redirect).redirect(authUrl);
        });
    }
    static handleGoogleCallback(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizationCode = request.query.code;
            try {
                const tokenResponse = yield axios_1.default.post(apiEndpoints_1.API_ENDPOINTS.GOOGLE.TOKEN_URL, {
                    code: authorizationCode,
                    client_id: GoogleAuthController.clientId,
                    client_secret: GoogleAuthController.clientSecret,
                    redirect_uri: GoogleAuthController.redirectUri,
                    grant_type: "authorization_code",
                });
                const tokens = tokenResponse.data;
                const ticketResponse = yield axios_1.default.get(apiEndpoints_1.API_ENDPOINTS.GOOGLE.TOKEN_INFO_URL(tokens.id_token));
                const payload = ticketResponse.data;
                if (!payload) {
                    throw new Error("Unable to retrieve user info from Google.");
                }
                const user = yield (0, oauth_model_1.findOrCreateUser)(payload.email, client_1.OAuthProvider.GOOGLE, payload.name);
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
                response
                    .status(response_enums_1.ResponseStatus.OK)
                    .json({ message: response_enums_1.ResponseMessages.Success });
            }
            catch (error) {
                console.error(error, "auth-google");
                response
                    .status(response_enums_1.ResponseStatus.InternalServerError)
                    .json({ message: response_enums_1.ResponseMessages.InternalServerError });
            }
        });
    }
}
GoogleAuthController.clientId = process.env.GOOGLE_CLIENT_ID;
GoogleAuthController.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
GoogleAuthController.redirectUri = `${process.env.REDIRECT_URI}/google/callback`;
exports.default = GoogleAuthController;
