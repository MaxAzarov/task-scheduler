import {
  cancelGoogleEvent,
  createGoogleEvent,
  deleteGoogleEvent,
  getGoogleEvents,
  getNewAccessToken,
  updateGoogleEvent,
} from "../google/lib/apiFunctions";
import normalizeGoogleEvent from "../google/lib/normalizeEvent";
import normalizeGoogleEvents from "../google/lib/normalizeEvents";

import {
  cancelMicrosoftEvent,
  createMicrosoftEvent,
  deleteMicrosoftEvent,
  getMicrosoftEvents,
  getNewMicrosoftAccessToken,
  updateMicrosoftEvent,
} from "../microsoft/lib/apiFunctions";
import normalizeMicrosoftEvent from "../microsoft/lib/normalizeEvent";
import normalizeMicrosoftEvents from "../microsoft/lib/normalizeEvents";

const connectionSchema = {
  microsoftCalendar: {
    createEvent: createMicrosoftEvent,
    updateEvent: updateMicrosoftEvent,
    getEvents: getMicrosoftEvents,
    exchangeToken: getNewMicrosoftAccessToken,
    cancelEvent: cancelMicrosoftEvent,
    normalizeEvents: normalizeMicrosoftEvents,
    normalize: normalizeMicrosoftEvent,
    deleteEvent: deleteMicrosoftEvent,
  },
  googleCalendar: {
    createEvent: createGoogleEvent,
    updateEvent: updateGoogleEvent,
    getEvents: getGoogleEvents,
    exchangeToken: getNewAccessToken,
    cancelEvent: cancelGoogleEvent,
    normalizeEvents: normalizeGoogleEvents,
    normalize: normalizeGoogleEvent,
    deleteEvent: deleteGoogleEvent,
  },
};

export default connectionSchema;
