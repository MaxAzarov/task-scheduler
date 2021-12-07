import { Router } from "express";

import { getUsersAvailableIntegrations } from "./controller";

const router = Router();

router.get("/integrations", getUsersAvailableIntegrations);

export default router;
