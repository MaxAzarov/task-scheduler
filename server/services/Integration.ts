import { Services } from "../constants/services";
import { Integration } from "../db/sequelize";

class IntegrationService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async checkIfIntegrationExists(
    userId: string,
    integrationType: Services
  ): Promise<Integration | null> {
    const integration = await Integration.findOne({
      where: {
        user_id: userId,
        type: integrationType
      }
    });

    return integration;
  }

  async createNewIntegration(
    type: Services,
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
      timezone
    } as any);

    await newIntegration.save();

    return newIntegration;
  }
}

export default new IntegrationService();
