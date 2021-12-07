import { NextFunction, Request, Response } from "express";
import { Integration, User } from "../../../db/sequelize";
import ApiError from "../../../error/apiError";

export const getUsersAvailableIntegrations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as User;

  try {
    const integrations = await Integration.findAll({
      where: {
        user_id: id,
      },
      attributes: ["type"],
    });

    return res.json(integrations);
  } catch (e) {
    return next(ApiError.badRequest("Internal error"));
  }
};
