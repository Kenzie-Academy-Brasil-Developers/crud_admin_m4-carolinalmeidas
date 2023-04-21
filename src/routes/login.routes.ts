import { Router } from "express";
import { createSessionUsersController } from "../controllers/login.controllers";
import { requestLoginSchema } from "../schemas/login.schemas";
import ensureBodyExists from "../middlewares/ensureBody";

const loginRouter: Router = Router()

loginRouter.post("", ensureBodyExists(requestLoginSchema), createSessionUsersController);

export default loginRouter