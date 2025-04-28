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

export const getLessonPlan = async (request: Request, response: Response) => {
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
    response
      .status(ResponseStatus.InternalServerError)
      .json({ error: "Failed to get lesson plan" });
  }
};

export const getAllUserLessonPlans = async (
  request: Request,
  response: Response
) => {
  const { userId } = request.user;
  console.log("userId", userId);
  try {
    const lessonPlans = await LessonPlanModel.getAllUserLessonPlans(userId);
    response.status(ResponseStatus.OK).json(lessonPlans);
  } catch (error) {
    response
      .status(ResponseStatus.InternalServerError)
      .json({ error: "Failed to get all user lesson plans" });
  }
};

export const getAllFavorites = async (request: Request, response: Response) => {
  const { userId } = request.user;
  try {
    const favorites = await LessonPlanModel.getAllFavorites(userId);
    response.status(ResponseStatus.OK).json(favorites);
  } catch (error) {
    response
      .status(ResponseStatus.InternalServerError)
      .json({ error: "Failed to get all favorites" });
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
