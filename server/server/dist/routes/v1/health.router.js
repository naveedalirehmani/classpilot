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
const express_1 = require("express");
const healthRouter = (0, express_1.Router)();
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
healthRouter.get("/", (_, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_config_1.default.$queryRaw `SELECT 1`;
        response.status(200).json({
            server: "healthy",
            database: "connected",
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            server: "healthy",
            database: "disconnected",
            message: "Database connection failed",
        });
    }
}));
exports.default = healthRouter;
