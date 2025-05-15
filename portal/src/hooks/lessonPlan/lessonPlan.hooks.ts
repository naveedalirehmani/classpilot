import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "src/lib/routes";
import { queryClient } from "src/providers/query.provider";
import { QueryKeys } from "src/querykey";
import LessonPlanService from "src/services/lessonPlan/lessonPlan.service";
import {
  CreateLessonPlanData,
  LessonPlanResponse,
  LessonPlanStatus,
  PaginatedResponse,
} from "src/types/lessonPlan/lessonPlan";

export const useCreateLessonPlan = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_LESSON_PLAN],
    mutationFn: (data: CreateLessonPlanData) =>
      LessonPlanService.createLessonPlan(data),
    onSuccess: (data: LessonPlanResponse) => {
      if (!data.id) {
        toast.error("Failed to create lesson plan");
        return;
      }
      toast.success("Lesson plan created successfully");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LESSON_PLAN] });
      router.push(`${ROUTES.DASHBOARD}/${ROUTES.LESSON_PLAN}/${data.id}`);
    },
    onError: (error: unknown) => {
      console.error("Error during creating lesson plan:", error);
      throw error;
    },
  });
};

export const useGetLessonPlan = (id: string) => {
  return useQuery<LessonPlanResponse, Error>({
    queryKey: [QueryKeys.LESSON_PLAN, id],
    queryFn: () => LessonPlanService.getLessonPlan(id),
    enabled: !!id,
  });
};

export const useGetAllUserLessonPlans = (
  page: number = 1,
  limit: number = 10
) => {
  return useQuery<PaginatedResponse<LessonPlanResponse>, Error>({
    queryKey: [QueryKeys.LESSON_PLAN, page, limit],
    queryFn: () => LessonPlanService.getAllUserLessonPlans(page, limit),
  });
};

export const useGetAllFavorites = (page: number = 1, limit: number = 10) => {
  return useQuery<PaginatedResponse<LessonPlanResponse>, Error>({
    queryKey: [QueryKeys.FAVORITES, page, limit],
    queryFn: () => LessonPlanService.getAllFavorites(page, limit),
  });
};

export const useAddFavorite = () => {
  return useMutation({
    mutationKey: [QueryKeys.ADD_FAVORITE],
    mutationFn: (data: { lessonPlanId: string }) =>
      LessonPlanService.addFavorite(data.lessonPlanId),
    onSuccess: () => {
      toast.success("Lesson plan added to favorites");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FAVORITES] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LESSON_PLAN] });
    },
    onError: (error: unknown) => {
      console.error("Error during adding favorite:", error);
      throw error;
    },
  });
};

export const useRemoveFavorite = () => {
  return useMutation({
    mutationKey: [QueryKeys.REMOVE_FAVORITE],
    mutationFn: (data: { lessonPlanId: string }) =>
      LessonPlanService.removeFavorite(data.lessonPlanId),
    onSuccess: () => {
      toast.success("Lesson plan removed from favorites");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.FAVORITES] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LESSON_PLAN] });
    },
    onError: (error: unknown) => {
      console.error("Error during removing favorite:", error);
      throw error;
    },
  });
};

export const useUpdateLessonPlan = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_LESSON_PLAN],
    mutationFn: (data: CreateLessonPlanData & { id: string }) =>
      LessonPlanService.updateLessonPlan(data.id, data),
    onSuccess: (data: LessonPlanResponse) => {
      toast.success("Lesson plan updated successfully");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LESSON_PLAN, data.id],
      });
    },
    onError: (error: unknown) => {
      console.error("Error during updating lesson plan:", error);
      throw error;
    },
  });
};

export const useUpdateLessonPlanStatus = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_LESSON_PLAN_STATUS],
    mutationFn: (data: { id: string; status: LessonPlanStatus }) =>
      LessonPlanService.updateLessonPlanStatus(data.id, data.status),
    onSuccess: () => {
      toast.success("Lesson plan status updated successfully");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.LESSON_PLAN] });
    },
    onError: (error: unknown) => {
      console.error("Error during updating lesson plan status:", error);
      throw error;
    },
  });
};

export const useGetAllLessonPlansNoPagination = () => {
  return useQuery<LessonPlanResponse[], Error>({
    queryKey: [QueryKeys.ALL_LESSON_PLANS_NO_PAGINATION],
    queryFn: () => LessonPlanService.getAllLessonPlansNoPagination(),
  });
};
