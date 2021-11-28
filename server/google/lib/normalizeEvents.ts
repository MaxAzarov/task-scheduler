import { map, path } from "ramda";
import { Event } from "../../integrations/types";
import { IGoogleEvent } from "../types";

const normalizeGoogleEvents = (data: IGoogleEvent): Event[] => {
  const items = path(["items"], data);

  return map((item) => {
    const { id, summary, start, end, htmlLink } = item;
    return {
      id,
      subject: summary,
      start,
      end,
      link: htmlLink,
    };
  }, items);
};

export default normalizeGoogleEvents;
