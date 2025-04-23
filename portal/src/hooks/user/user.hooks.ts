import { currentUserData } from "@/types/user/user.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "src/providers/query.provider";
import { QueryKeys } from "src/querykey";
import UserService from "src/services/user/user.service";
import { User } from "src/types/auth";

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_USER],
    mutationFn: (data: Partial<User>) => UserService.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
    },
    onError: (error: unknown) => {
      console.error("Error during updating user:", error);
      throw error;
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: UserService.getUser,
  });
};

export const useGetCurrentUser = () => {
  return useQuery<currentUserData>({
    queryKey: [QueryKeys.USER],
    queryFn: UserService.getCurrentUser,
  });
};