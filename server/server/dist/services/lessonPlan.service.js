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
const openai_1 = require("@ai-sdk/openai");
const ai_1 = require("ai");
const ai_2 = require("../types/ai");
const lessonPlan_schema_1 = require("../schema/v1/lessonPlan.schema");
class LessonPlanService {
    createLessonPlan(topic, additionalInstructions, standards, outputLanguage, instructorName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lessonPlan = yield (0, ai_1.generateObject)({
                    // model: openai(defaultModel),
                    model: (0, openai_1.openai)(ai_2.Models.GPT_41),
                    schema: lessonPlan_schema_1.generateLessonPlanSchema,
                    prompt: `Generate a lesson plan for the topic: ${topic} with the following additional instructions: ${additionalInstructions} and standards: ${standards} and output language: ${outputLanguage} and user id: ${userId} Instructor Name is ${instructorName}`,
                });
                console.log(JSON.stringify(lessonPlan.object), "LESSON PLAN");
                return lessonPlan.object;
            }
            catch (error) {
                console.error("Error creating lesson plan:", error);
                throw new Error("Failed to create lesson plan");
            }
        });
    }
}
exports.default = new LessonPlanService();
