import { User } from "src/types/auth";
import instance from "../api";
import { API_ROUTES } from "src/constants/api";

class UserService {
  static async updateUser(data: Partial<User>): Promise<User> {
    try {
      const response = await instance.patch(API_ROUTES.USERS.UPDATE_USER, data);
      return response.data;
    } catch (error) {
      console.error("Error during updating user:", error);
      throw error;
    }
  }

  static async getUser(): Promise<User> {
    try {
      const response = await instance.get(API_ROUTES.USERS.GET_USER);
      return response.data;
    } catch (error) {
      console.error("Error during getting user:", error);
      throw error;
    }
  }
}

export default UserService;