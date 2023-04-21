import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = res.locals.token;

  if (!admin) {
    throw new AppError("Insufficient Permission", 403);
  }
  return next();
};

const ensureUserAdmin2 = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { admin } = res.locals.token;
  const id: number = parseInt(res.locals.token.id);
  const userId: number = parseInt(req.params.id);
  if (!admin && userId !== id) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

export { ensureUserAdmin, ensureUserAdmin2 };
