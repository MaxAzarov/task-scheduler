import { NextFunction, Request, Response } from "express";
import { Integration, User } from "../../../db/sequelize";

export const getUsersAvailableIntegrations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as User;

  const integrations = await Integration.findAll({
    where: {
      user_id: id,
    },
    attributes: ["type"],
  });

  res.json(integrations);
};
