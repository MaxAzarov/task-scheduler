import { Router } from "express";
import checkJWT from "../../../middlewares/checkJWT";
import {
  SynchronizeCalendar,
  getAllEvents,
  CreateEvents,
  DeleteEvent,
} from "./controller";

const router = Router();

router.post("/create", checkJWT, CreateEvents);

router.get("/synchronize", checkJWT, SynchronizeCalendar);

router.get("/", checkJWT, getAllEvents);

router.delete("/:eventId", checkJWT, DeleteEvent);

export default router;
