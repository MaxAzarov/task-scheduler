import { Login, Register } from "./controller";
import { Router } from "express";
import ApiError from "../../../error/apiError";

const router = Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const status = await Login(email, password);
    res.json({ status });
  } catch (e) {
    return next(ApiError.badRequest("User does not exist!"));
  }
});

router.post("/register", async (req, res, next) => {
  const { email, firstName, secondName, password } = req.body;

  try {
    const token = await Register(email, firstName, secondName, password);
    res.json({ token });
  } catch (e: any) {
    return next(ApiError.badRequest("User exists"));
  }
});

export default router;
