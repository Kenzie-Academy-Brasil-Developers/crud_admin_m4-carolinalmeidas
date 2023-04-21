import { Router } from "express";
import { createSessionUsersController } from "../controllers/login.controllers";

const loginRouter: Router = Router()

loginRouter.post("", createSessionUsersController);

export default loginRouter