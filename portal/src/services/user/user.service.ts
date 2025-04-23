import { User } from "src/types/auth";
import instance from "../api";
import { API_ROUTES } from "src/constants/api";
import { currentUserData } from "@/types/user/user.types";

class UserService {
  static async updateUser(data: Partial<User>): Promise<User> {
    try {
      const response = await instance.patch(API_ROUTES.USER.UPDATE_USER, data);
      return response.data;
    } catch (error) {
      console.error("Error during updating user:", error);
      throw error;
    }
  }

  static async getUser(): Promise<User> {
    try {
      const response = await instance.get(API_ROUTES.USER.GET_USER);
      return response.data;
    } catch (error) {
      console.error("Error during getting user:", error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<currentUserData> {
    try {
      return instance.get(API_ROUTES.USER.GET_CURRENT_USER);
    } catch (error) {
      console.error("Error during getting current user:", error);
      throw error;
    }
  }
}

export default UserService;