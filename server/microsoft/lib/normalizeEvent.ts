import { IMicrosoftEvent } from "../types";
import { Event } from "../../integrations/types";

const normalizeMicrosoftEvent = (data: IMicrosoftEvent["value"][0]): Event => {
  const { id, subject, start, end } = data;
  return {
    id,
    subject,
    start,
    end,
  };
};

export default normalizeMicrosoftEvent;
