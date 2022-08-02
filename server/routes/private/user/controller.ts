import { NextFunction, Request, Response } from "express";
import { Integration, User } from "../../../db/sequelize";
import ApiError from "../../../error/apiError";
import log from "../../../logger";

export const getUsersAvailableIntegrations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as User;

  try {
    const integrations: Integration[] = await Integration.findAll({
      where: { user_id: id },
      attributes: ["type"]
    });

    return res.json(integrations);
  } catch (e) {
    log.error("Can not get all integrations for user: " + id);
    return next(ApiError.badRequest("Internal error"));
  }
};
