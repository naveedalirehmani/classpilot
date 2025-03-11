import { Router } from "express";
import * as userController from "../../controllers/v1/user.controller";
import isAuthorized from "../../middleware/isAuthorized";
import { Roles } from "@prisma/client";

const userRouter = Router();

userRouter.get(
  "/current-user",
  isAuthorized(),
  userController.getCurrentUserDetails
);

userRouter.put(
  "/toggle-first-time-login",
  isAuthorized([
    Roles.SUPER_ADMIN,
    Roles.ADMIN,
    Roles.DEVELOPER,
    Roles.MODERATOR,
    Roles.USER,
    Roles.GUEST
  ]),
  userController.toggleFirstTimeLogin
);

userRouter.delete(
  "/delete-account",
  isAuthorized(),
  userController.deleteUserAccount
);

userRouter.post("/forgot-password", userController.forgotPasswordHandler);

userRouter.post("/verify-otp", userController.verifyOtpHandler);

userRouter.post("/reset-password", userController.resetPasswordHandler);

export default userRouter;