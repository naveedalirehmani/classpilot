import { Router } from "express";
import * as LessonPlanController from "../../controllers/v1/lessonPlan.controller";
import isAuthorized from "../../middleware/isAuthorized";
import { Roles } from "@prisma/client";
const lessonPlanRouter = Router();

lessonPlanRouter.post(
  "/create",
  isAuthorized([Roles.ADMIN, Roles.USER, Roles.SUPER_ADMIN]),
  LessonPlanController.createLessonPlan
);

lessonPlanRouter.put(
  "/update/:id",
  isAuthorized([Roles.ADMIN, Roles.USER, Roles.SUPER_ADMIN]),
  LessonPlanController.updateLessonPlan
);

lessonPlanRouter.get(
  "/all-user-lesson-plans",
  isAuthorized([Roles.ADMIN, Roles.USER, Roles.SUPER_ADMIN]),
  LessonPlanController.getAllUserLessonPlans
);

lessonPlanRouter.get(
  "/favorites",
  isAuthorized([Roles.ADMIN, Roles.USER, Roles.SUPER_ADMIN]),
  LessonPlanController.getAllFavorites
);

lessonPlanRouter.post(
  "/add-favorite/:id",
  isAuthorized([Roles.ADMIN, Roles.USER, Roles.SUPER_ADMIN]),
  LessonPlanController.addFavorite
);

lessonPlanRouter.delete(
  "/remove-favorite/:id",
  isAuthorized([Roles.ADMIN, Roles.USER, Roles.SUPER_ADMIN]),
  LessonPlanController.removeFavorite
);

lessonPlanRouter.get(
  "/:id",
  isAuthorized([Roles.ADMIN, Roles.USER, Roles.SUPER_ADMIN]),
  LessonPlanController.getLessonPlan
);

export default lessonPlanRouter;
