import { IMicrosoftEvent } from "../types";
import { Event } from "../../integrations/types";

const normalizeMicrosoftEvent = (event: IMicrosoftEvent["value"][0]): Event => {
  const { id, subject, start, end } = event;
  return {
    id,
    subject,
    start,
    end
  };
};

export default normalizeMicrosoftEvent;
