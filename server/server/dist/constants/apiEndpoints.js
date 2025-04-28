"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ENDPOINTS = void 0;
exports.API_ENDPOINTS = {
    GOOGLE: {
        AUTH_URL: (clientId, redirectUri) => `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20profile&access_type=offline`,
        TOKEN_URL: "https://oauth2.googleapis.com/token",
        TOKEN_INFO_URL: (idToken) => `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`,
    },
};
