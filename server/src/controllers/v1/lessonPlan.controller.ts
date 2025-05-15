import { NextFunction, Request, Response } from "express";
import LessonPlanService from "../../services/lessonPlan.service";
import * as LessonPlanModel from "../../model/v1/lessonPlan.model";
import { ResponseStatus } from "../../types/response.enums";
import * as LessonPlanSchema from "../../schema/v1/lessonPlan.schema";

export const createLessonPlan = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId, name: instructorName } = request.user;
  try {
    const { topic, additionalInstructions, standards, outputLanguage } =
      LessonPlanSchema.LessonPlanSchema.parse(request.body);
    const lessonPlan = await LessonPlanService.createLessonPlan(
      topic,
      additionalInstructions,
      standards,
      outputLanguage,
      instructorName,
      userId
    );

    const dataResponse = await LessonPlanModel.createLessonPlan(
      { topic, additionalInstructions, standards, outputLanguage },
      lessonPlan,
      userId
    );
    response.status(ResponseStatus.Created).json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export const updateLessonPlan = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { userId, name: instructorName } = request.user;
    const { id } = request.params;
    const { topic, additionalInstructions, standards, outputLanguage } =
      LessonPlanSchema.LessonPlanSchema.parse(request.body);
    const lessonPlan = await LessonPlanService.createLessonPlan(
      topic,
      additionalInstructions,
      standards,
      outputLanguage,
      instructorName,
      userId
    );
    const lessonPlanResponse = await LessonPlanModel.updateLessonPlan(
      id,
      { topic, additionalInstructions, standards, outputLanguage },
      lessonPlan,
      userId
    );
    response.status(ResponseStatus.OK).json(lessonPlanResponse);
  } catch (error) {
    next(error);
  }
};

export const getLessonPlan = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;
  const { userId } = request.user;
  try {
    // check if the lesson plan is owned by the user
    const lessonPlan = await LessonPlanModel.getLessonPlan(id);

    if (lessonPlan?.userId !== userId) {
      return response
        .status(ResponseStatus.Forbidden)
        .json({ error: "You are not authorized to access this lesson plan" });
    }

    response.status(ResponseStatus.OK).json(lessonPlan);
  } catch (error) {
    next(error);
  }
};

export const getAllUserLessonPlans = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = request.user;
  try {
    const page = parseInt(request.query.page as string, 10) || 1;
    const limit = parseInt(request.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const { lessonPlans, totalCount } =
      await LessonPlanModel.getAllUserLessonPlans(userId, skip, limit);

    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages;

    response.status(ResponseStatus.OK).json({
      data: lessonPlans,
      totalCount,
      totalPages,
      currentPage: page,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllLessonPlansNoPagination = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = request.user;
  try {
    const lessonPlans = await LessonPlanModel.getAllLessonPlansNoPagination(userId);
    response.status(ResponseStatus.OK).json(lessonPlans);
  } catch (error) {
    next(error);
  }
};

export const getAllFavorites = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = request.user;
  try {
    const page = parseInt(request.query.page as string, 10) || 1;
    const limit = parseInt(request.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const { favorites, totalCount } = await LessonPlanModel.getAllFavorites(
      userId,
      skip,
      limit
    );

    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages;

    response.status(ResponseStatus.OK).json({
      data: favorites,
      totalCount,
      totalPages,
      currentPage: page,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { userId } = request.user;
    const { id } = request.params;
    const lessonPlanId = LessonPlanSchema.addFavoriteSchema.parse(id);
    const favorite = await LessonPlanModel.addFavorite(lessonPlanId, userId);
    response.status(ResponseStatus.OK).json(favorite);
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { userId } = request.user;
    const { id } = request.params;
    const lessonPlanId = LessonPlanSchema.addFavoriteSchema.parse(id);
    const favorite = await LessonPlanModel.removeFavorite(lessonPlanId, userId);
    response.status(ResponseStatus.OK).json(favorite);
  } catch (error) {
    console.log("here", error);
    next(error);
  }
};

export const updateLessonPlanStatus = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { userId } = request.user;
    const { id } = request.params;
    const { status } = request.body;
    const lessonPlanId = LessonPlanSchema.addFavoriteSchema.parse(id);
    
    // check if the lesson plan is owned by the user
    const lessonPlan = await LessonPlanModel.getLessonPlan(lessonPlanId);
 
    if (lessonPlan?.userId !== userId) {
      return response
        .status(ResponseStatus.Forbidden)
        .json({ error: "You are not authorized to access this lesson plan" });
    }

    const updateLessonPlan = await LessonPlanModel.updateLessonPlanStatus(
      lessonPlanId,
      status,
    );
    
    response.status(ResponseStatus.OK).json(updateLessonPlan);
  } catch (error) {
    next(error);
  }
};
