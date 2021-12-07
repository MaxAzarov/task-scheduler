import { Router } from "express";
import { userLogin, userRegister } from "./controller";

const router = Router();

router.post("/login", userLogin);
router.post("/register", userRegister);

export default router;
