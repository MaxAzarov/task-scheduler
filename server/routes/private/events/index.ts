import { Router } from "express";
import {
  synchronizeCalendar,
  getAllEvents,
  CreateEvents,
  deleteEvent
} from "./controller";

const router: Router = Router();

router.post("/create", CreateEvents);
router.get("/synchronize", synchronizeCalendar);
router.get("/", getAllEvents);
router.delete("/:eventId", deleteEvent);

export default router;
