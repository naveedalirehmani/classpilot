"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY || "secret_key_here";
const signJWT = (payload, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn });
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        return { payload, expired: false };
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return { payload: null, expired: true };
        }
        else {
            return { payload: null, expired: false };
        }
    }
};
exports.verifyJWT = verifyJWT;
