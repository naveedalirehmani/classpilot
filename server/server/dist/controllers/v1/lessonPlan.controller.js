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
exports.removeFavorite = exports.addFavorite = exports.getAllFavorites = exports.getAllUserLessonPlans = exports.getLessonPlan = exports.updateLessonPlan = exports.createLessonPlan = void 0;
const lessonPlan_service_1 = __importDefault(require("../../services/lessonPlan.service"));
const LessonPlanModel = __importStar(require("../../model/v1/lessonPlan.model"));
const response_enums_1 = require("../../types/response.enums");
const LessonPlanSchema = __importStar(require("../../schema/v1/lessonPlan.schema"));
const createLessonPlan = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, name: instructorName } = request.user;
    try {
        const { topic, additionalInstructions, standards, outputLanguage } = LessonPlanSchema.LessonPlanSchema.parse(request.body);
        const lessonPlan = yield lessonPlan_service_1.default.createLessonPlan(topic, additionalInstructions, standards, outputLanguage, instructorName, userId);
        const dataResponse = yield LessonPlanModel.createLessonPlan({ topic, additionalInstructions, standards, outputLanguage }, lessonPlan, userId);
        response.status(response_enums_1.ResponseStatus.Created).json(dataResponse);
    }
    catch (error) {
        next(error);
    }
});
exports.createLessonPlan = createLessonPlan;
const updateLessonPlan = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, name: instructorName } = request.user;
        const { id } = request.params;
        const { topic, additionalInstructions, standards, outputLanguage } = LessonPlanSchema.LessonPlanSchema.parse(request.body);
        const lessonPlan = yield lessonPlan_service_1.default.createLessonPlan(topic, additionalInstructions, standards, outputLanguage, instructorName, userId);
        const lessonPlanResponse = yield LessonPlanModel.updateLessonPlan(id, { topic, additionalInstructions, standards, outputLanguage }, lessonPlan, userId);
        response.status(response_enums_1.ResponseStatus.OK).json(lessonPlanResponse);
    }
    catch (error) {
        next(error);
    }
});
exports.updateLessonPlan = updateLessonPlan;
const getLessonPlan = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { userId } = request.user;
    try {
        // check if the lesson plan is owned by the user
        const lessonPlan = yield LessonPlanModel.getLessonPlan(id);
        if ((lessonPlan === null || lessonPlan === void 0 ? void 0 : lessonPlan.userId) !== userId) {
            return response
                .status(response_enums_1.ResponseStatus.Forbidden)
                .json({ error: "You are not authorized to access this lesson plan" });
        }
        response.status(response_enums_1.ResponseStatus.OK).json(lessonPlan);
    }
    catch (error) {
        response
            .status(response_enums_1.ResponseStatus.InternalServerError)
            .json({ error: "Failed to get lesson plan" });
    }
});
exports.getLessonPlan = getLessonPlan;
const getAllUserLessonPlans = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.user;
    console.log("userId", userId);
    try {
        const lessonPlans = yield LessonPlanModel.getAllUserLessonPlans(userId);
        response.status(response_enums_1.ResponseStatus.OK).json(lessonPlans);
    }
    catch (error) {
        response
            .status(response_enums_1.ResponseStatus.InternalServerError)
            .json({ error: "Failed to get all user lesson plans" });
    }
});
exports.getAllUserLessonPlans = getAllUserLessonPlans;
const getAllFavorites = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.user;
    try {
        const favorites = yield LessonPlanModel.getAllFavorites(userId);
        response.status(response_enums_1.ResponseStatus.OK).json(favorites);
    }
    catch (error) {
        response
            .status(response_enums_1.ResponseStatus.InternalServerError)
            .json({ error: "Failed to get all favorites" });
    }
});
exports.getAllFavorites = getAllFavorites;
const addFavorite = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.user;
        const { id } = request.params;
        const lessonPlanId = LessonPlanSchema.addFavoriteSchema.parse(id);
        const favorite = yield LessonPlanModel.addFavorite(lessonPlanId, userId);
        response.status(response_enums_1.ResponseStatus.OK).json(favorite);
    }
    catch (error) {
        next(error);
    }
});
exports.addFavorite = addFavorite;
const removeFavorite = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.user;
        const { id } = request.params;
        const lessonPlanId = LessonPlanSchema.addFavoriteSchema.parse(id);
        const favorite = yield LessonPlanModel.removeFavorite(lessonPlanId, userId);
        response.status(response_enums_1.ResponseStatus.OK).json(favorite);
    }
    catch (error) {
        console.log("here", error);
        next(error);
    }
});
exports.removeFavorite = removeFavorite;
