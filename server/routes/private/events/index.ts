import { Router } from "express";
import {
  SynchronizeCalendar,
  getAllEvents,
  CreateEvents,
  DeleteEvent
} from "./controller";

const router = Router();

router.post("/create", CreateEvents);
router.get("/synchronize", SynchronizeCalendar);
router.get("/", getAllEvents);
router.delete("/:eventId", DeleteEvent);

export default router;
