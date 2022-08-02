import { Event } from "../../integrations/types";
import { IGoogleEvent } from "../types";

const normalizeGoogleEvent = (event: IGoogleEvent["items"][0]): Event => {
  const { id, summary, start, end, htmlLink } = event;
  return {
    id,
    subject: summary,
    start,
    end,
    link: htmlLink
  };
};

export default normalizeGoogleEvent;
