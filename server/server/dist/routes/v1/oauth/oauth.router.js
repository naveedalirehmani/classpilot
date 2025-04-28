"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const google_controller_1 = __importDefault(require("../../../controllers/oauth/google.controller"));
const oAuthRouter = (0, express_1.Router)();
// // oAuth google
oAuthRouter.get("/google", (request, response) => google_controller_1.default.redirectToGoogleAuth(request, response));
//callback
oAuthRouter.get("/google/callback", (request, response) => google_controller_1.default.handleGoogleCallback(request, response));
exports.default = oAuthRouter;
