import { Router } from "express";
import {activeUserController, createUsersController, deleteUserController, listUserController, retrieveUserController, updateUserController} from "../controllers/users.controllers";
import ensureEmailExist from "../middlewares/ensureEmailExists";
import ensureBodyExists from "../middlewares/ensureBody";
import { requestUserSchema, updateUserSchema} from "../schemas/users.schemas";
import ensureUserToken from "../middlewares/ensureToken";
import {ensureUserAdmin, ensureUserAdmin2} from "../middlewares/ensureUserAdmin";
import ensureUserId from "../middlewares/ensureUserId";
import ensureActiveUser from "../middlewares/ensureActiveUser";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureBodyExists(requestUserSchema),
  ensureEmailExist, createUsersController);

userRoutes.get("", ensureUserToken, ensureUserAdmin, listUserController);

userRoutes.get("/profile", ensureUserToken, retrieveUserController);

userRoutes.patch(
  "/:id",
  ensureUserId,
  ensureBodyExists(updateUserSchema),
  ensureUserToken,
  ensureUserAdmin2,
  updateUserController
);

userRoutes.delete("/:id", ensureUserId, ensureUserToken, ensureUserAdmin2, deleteUserController)

userRoutes.put("/:id/recover", ensureUserToken, ensureUserAdmin, ensureActiveUser, ensureUserId, activeUserController)

export default userRoutes;
