import { NextFunction, Request, Response } from "express";
import UserService from "./../../../services/User";
import ApiError from "../../../error/apiError";

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const token = await UserService.Login(email, password);
    res.json({ token });
  } catch (e) {
    return next(ApiError.badRequest("User does not exist!"));
  }
};

const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, firstName, secondName, password } = req.body;
  try {
    const status = await UserService.Register(
      email,
      firstName,
      secondName,
      password
    );
    return res.send(201).json({ status });
  } catch (e) {
    return next(ApiError.badRequest("User exists"));
  }
};

export { userLogin, userRegister };
