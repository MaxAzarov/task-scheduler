import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../error/apiError";
import log from "../logger";

export default async function checkJWT(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { token } = req.headers;

  const secretKey = process.env.JWT_SECRET as string;

  let jwtPayload;
  try {
    jwtPayload = jwt.verify((token as string).split(" ")[1], secretKey);
  } catch (err) {
    log.error("Invalid token");
    return next(ApiError.forbidden("Invalid token"));
  }

  req.user = jwtPayload;

  return next();
}
