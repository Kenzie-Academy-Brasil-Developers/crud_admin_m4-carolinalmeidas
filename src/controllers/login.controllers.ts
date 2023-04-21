import { Request, Response } from "express";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interface";
import createSessionService from "../services/login/createSession.service";

const createSessionUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TLoginRequest = req.body;
  const token: TLoginResponse = await createSessionService(userData);
  return res.status(200).json(token);
};
export { createSessionUsersController };
