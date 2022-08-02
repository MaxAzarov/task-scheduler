import { map, path } from "ramda";
import normalizeGoogleEvent from "./normalizeEvent";
import { Event } from "../../integrations/types";
import { IGoogleEvent } from "../types";

const normalizeGoogleEvents = (events: IGoogleEvent): Event[] => {
  const items = path(["items"], events);

  return map(normalizeGoogleEvent, items);
};

export default normalizeGoogleEvents;
