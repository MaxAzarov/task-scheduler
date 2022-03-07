import { map, path } from "ramda";
import { Event } from "../../integrations/types";
import { IMicrosoftEvent } from "../types";

const normalizeMicrosoftEvents = (data: IMicrosoftEvent): Event[] => {
  const items = path(["value"], data);

  return map((item) => {
    const { id, subject, start, end } = item;

    return {
      id,
      subject,
      start,
      end
    };
  }, items);
};

export default normalizeMicrosoftEvents;
