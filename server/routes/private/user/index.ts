import { Router } from "express";
import checkJWT from "../../../middlewares/checkJWT";

import { getUsersAvailableIntegrations } from "./controller";

const router = Router();

router.get("/integrations", checkJWT, getUsersAvailableIntegrations);

export default router;
