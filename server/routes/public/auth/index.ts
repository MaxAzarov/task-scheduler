import { Login, Register } from "./controller";
import { Router } from "express";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, name } = req.body;

  try {
    const status = await Login(email, name);
    res.json({ status });
  } catch (e) {
    res.send(e);
  }
});

router.post("/register", async (req, res) => {
  const { email, name, secondName, password } = req.body;

  try {
    const token = await Register(email, name, secondName, password);
    res.json({ token });
  } catch (e) {
    res.send(e);
  }
});

export default router;
