import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";
const ensureUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token = req.headers.authorization;
  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }
  token = token.split(" ")[1];
  const tokenCompare = jwt.verify(
    token,
    process.env.SECRET_KEY!,
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401);
      }
      res.locals.token = {
        admin: decoded.admin,
        id: decoded.sub,
      };
    }
  );

  return next();
};
export default ensureUserToken;
