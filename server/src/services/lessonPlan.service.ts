import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { defaultModel, Models } from "../types/ai";
import { generateLessonPlanSchema } from "../schema/v1/lessonPlan.schema";

class LessonPlanService {
  async createLessonPlan(
    topic: string,
    additionalInstructions: string,
    standards: string,
    outputLanguage: string,
    instructorName: string,
    userId: string
  ) {
    let attempts = 0;
    const maxAttempts = 2;

    while (attempts < maxAttempts) {
      try {
        const lessonPlan = await generateObject({
          // model: openai(defaultModel),
          model: openai(Models.GPT_41),
          schema: generateLessonPlanSchema,
          prompt: `Generate a lesson plan for the topic: ${topic} with the following additional instructions: ${additionalInstructions} and standards: ${standards} and output language: ${outputLanguage} and user id: ${userId} Instructor Name is ${instructorName}`,
        });
        console.log(JSON.stringify(lessonPlan.object),"LESSON PLAN");
        return lessonPlan.object;
      } catch (error) {
        attempts++;
        console.error(`Error creating lesson plan (attempt ${attempts}):`, error);
        
        if (attempts === maxAttempts) {
          throw new Error("Failed to create lesson plan after multiple attempts");
        }
      }
    }
  }
}

export default new LessonPlanService();
