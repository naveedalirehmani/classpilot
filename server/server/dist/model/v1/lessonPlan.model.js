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
exports.removeFavorite = exports.addFavorite = exports.getAllFavorites = exports.getAllUserLessonPlans = exports.getLessonPlan = exports.updateLessonPlan = exports.createLessonPlan = void 0;
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
const errors_1 = require("../../utils/errors");
const createLessonPlan = (promptlessonPlan, lessonPlan, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonPlanResponse = yield prisma_config_1.default.lessonPlan.create({
            data: {
                title: lessonPlan.lessonOverview.title,
                aiPrompt: JSON.stringify(promptlessonPlan),
                aiResponse: JSON.stringify(lessonPlan),
                userId: userId,
            },
        });
        return lessonPlanResponse;
    }
    catch (error) {
        throw new errors_1.DatabaseError("Failed to create lesson plan");
    }
});
exports.createLessonPlan = createLessonPlan;
const updateLessonPlan = (lessonPlanId, promptlessonPlan, lessonPlan, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonPlanResponse = yield prisma_config_1.default.lessonPlan.update({
            where: { id: lessonPlanId },
            data: {
                title: lessonPlan.lessonOverview.title,
                aiPrompt: JSON.stringify(promptlessonPlan),
                aiResponse: JSON.stringify(lessonPlan),
                userId: userId,
            },
        });
        return lessonPlanResponse;
    }
    catch (error) {
        throw new errors_1.DatabaseError("Failed to update lesson plan");
    }
});
exports.updateLessonPlan = updateLessonPlan;
const getLessonPlan = (lessonPlanId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonPlan = yield prisma_config_1.default.lessonPlan.findUnique({
            where: { id: lessonPlanId },
        });
        return lessonPlan;
    }
    catch (error) {
        throw new errors_1.DatabaseError("Failed to get lesson plan");
    }
});
exports.getLessonPlan = getLessonPlan;
const getAllUserLessonPlans = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lessonPlans = yield prisma_config_1.default.lessonPlan.findMany({
            where: { userId },
            include: {
                favorites: {
                    where: { userId },
                },
            },
        });
        return lessonPlans.map(plan => (Object.assign(Object.assign({}, plan), { isFavorite: plan.favorites.length > 0 })));
    }
    catch (error) {
        throw new errors_1.DatabaseError("Failed to get all user lesson plans");
    }
});
exports.getAllUserLessonPlans = getAllUserLessonPlans;
const getAllFavorites = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find all lesson plans that this user has favorited
        const favorites = yield prisma_config_1.default.lessonPlan.findMany({
            where: {
                favorites: {
                    some: { userId },
                },
            },
        });
        return favorites;
    }
    catch (error) {
        throw new errors_1.DatabaseError("Failed to get all favorites");
    }
});
exports.getAllFavorites = getAllFavorites;
const addFavorite = (lessonPlanId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favorite = yield prisma_config_1.default.favoriteLessonPlan.create({
            data: {
                userId,
                lessonPlanId,
            },
        });
        return favorite;
    }
    catch (error) {
        throw new errors_1.DatabaseError("Failed to add favorite");
    }
});
exports.addFavorite = addFavorite;
const removeFavorite = (lessonPlanId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favorite = yield prisma_config_1.default.favoriteLessonPlan.delete({
            where: {
                userId_lessonPlanId: {
                    userId,
                    lessonPlanId,
                },
            },
        });
        return favorite;
    }
    catch (error) {
        throw new errors_1.DatabaseError("Failed to remove favorite");
    }
});
exports.removeFavorite = removeFavorite;
