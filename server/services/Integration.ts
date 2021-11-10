import { Model } from "sequelize/types";
import { Integration } from "../db/sequelize";

class IntegrationService {
  constructor() {}

  async checkIfIntegrationExists(
    userId: string,
    integrationType: "google-calendar" | "microsoft-calendar"
  ): Promise<Integration> {
    const integration = await Integration.findOne({
      where: {
        user_id: userId,
        type: integrationType,
      },
    });

    if (integration) {
      return integration;
    } else {
      throw new Error(
        `Integration ${integrationType} for user ${userId} does not exist!`
      );
    }
  }

  async createNewIntegration(
    type: "google-calendar" | "microsoft-calendar",
    user_id: string,
    access_token: string,
    refresh_token: string,
    timezone?: string
  ): Promise<Integration> {
    const newIntegration = new Integration({
      type,
      user_id,
      access_token,
      refresh_token,
      timezone,
    } as any);
    if (newIntegration) {
      return newIntegration;
    } else {
      throw new Error(`Can not create integration!`);
    }
  }
}

export default new IntegrationService();
