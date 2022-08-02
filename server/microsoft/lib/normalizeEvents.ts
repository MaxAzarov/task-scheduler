import { map, path } from "ramda";
import normalizeMicrosoftEvent from "./normalizeEvent";
import { Event } from "../../integrations/types";
import { IMicrosoftEvent } from "../types";

const normalizeMicrosoftEvents = (data: IMicrosoftEvent): Event[] => {
  const items = path(["value"], data);

  return map(normalizeMicrosoftEvent, items);
};

export default normalizeMicrosoftEvents;
