import { CreateLessonPlanData, LessonPlanResponse, PaginatedResponse } from "src/types/lessonPlan/lessonPlan";
import instance from "../api";
import { API_ROUTES } from "src/constants/api";

class LessonPlanService {
  static async createLessonPlan(data: CreateLessonPlanData): Promise<LessonPlanResponse> {
    try {
      const response = await instance.post(API_ROUTES.LESSON_PLAN.CREATE_LESSON_PLAN, data);
      return response.data;
    } catch (error) {
      console.error("Error during creating lesson plan:", error);
      throw error;
    }
  }

  static async getLessonPlan(id: string): Promise<LessonPlanResponse> {
    try {
      const response = await instance.get(API_ROUTES.LESSON_PLAN.GET_LESSON_PLAN(id));
      return response.data;
    } catch (error) {
      console.error("Error during getting lesson plan:", error);
      throw error;
    }
  }

  static async getAllUserLessonPlans(page: number = 1, limit: number = 10): Promise<PaginatedResponse<LessonPlanResponse>> {
    try {
      const response = await instance.get(API_ROUTES.LESSON_PLAN.GET_ALL_USER_LESSON_PLANS, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error("Error during getting all user lesson plans:", error);
      throw error;
    }
  }

  static async getAllFavorites(page: number = 1, limit: number = 10): Promise<PaginatedResponse<LessonPlanResponse>> {
    try {
      const response = await instance.get(API_ROUTES.LESSON_PLAN.GET_ALL_FAVORITES, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error("Error during getting all favorites:", error);
      throw error;
    }
  }

  static async addFavorite(lessonPlanId: string) {
    try {
      const response = await instance.post(
        API_ROUTES.LESSON_PLAN.ADD_FAVORITE(lessonPlanId)
      );
      return response.data;
    } catch (error) {
      console.error("Error during adding favorite:", error);
      throw error;
    }
  }
  static async removeFavorite(lessonPlanId: string) {
    try {
      const response = await instance.delete(
        API_ROUTES.LESSON_PLAN.REMOVE_FAVORITE(lessonPlanId)
      );
      return response.data;
    } catch (error) {
      console.error("Error during removing favorite:", error);
      throw error;
    }
  }
  static async updateLessonPlan(id: string, data: CreateLessonPlanData) {
    try {
      const response = await instance.put(API_ROUTES.LESSON_PLAN.UPDATE_LESSON_PLAN(id), data);
      return response.data;
    } catch (error) {
      console.error("Error during updating lesson plan:", error);
      throw error;
    }
  }
}

export default LessonPlanService;