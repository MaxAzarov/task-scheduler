import axios, { AxiosResponse } from "axios";
import Moment from "moment";
import { compose } from "ramda";
import dotenv from "dotenv";
import normalizeGoogleEvents from "./normalizeEvents";
import paginateOverRanges from "./../../utils/paginateOverRange";
import splitRangeByDays from "../../utils/splitRangeByDays";
import { IGoogleEvent } from "../types";

const getGoogleCalendarsList = (accessToken: string) => {
  return axios.get(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
};

export async function* getGoogleEvents(
  accessToken: string,
  startTime: string,
  endTime: string
): AsyncGenerator<any, void, unknown> {
  const ranges = splitRangeByDays(3, Moment(startTime), Moment(endTime));

  yield* compose<any, any>(
    paginateOverRanges(ranges, accessToken, normalizeGoogleEvents)
  )(getGoogleCalendarEvents);
}

const getGoogleCalendarEvents = (
  accessToken: string,
  startTime: string,
  endTime: string,
  calendarId = "primary"
): Promise<AxiosResponse<IGoogleEvent, any>> => {
  return axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      params: {
        // timeMin: "2021-11-23T10:00:00-07:00",
        // timeMax: "2021-11-29T10:00:00-07:00",
        timeMin: Moment(startTime)
          // .add(1, "d")
          // .format("YYYY-MM-DD[T]00:00:00-23:00"),
          .format("YYYY-MM-DD[T]10:00:00[Z]"),
        timeMax: Moment(endTime)
          .add(1, "d")
          .format("YYYY-MM-DD[T]00:00:00-12:00")
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
};

export interface Options {
  subject: string;
  description: string;
  startTime: string;
  endTime: string;
  calendarId?: string;
}

const createGoogleEvent = (accessToken: string, options: Options) => {
  const {
    calendarId = "primary",
    description,
    // attendees,
    subject,
    startTime,
    endTime
    // timeZone,
  } = options;
  return axios({
    method: "POST",
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?sendUpdates=all`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      guestsCanModify: true,
      // attendees,
      // attendees: [{ email: '' }],
      sendNotifications: true,
      summary: subject,
      description,
      start: {
        dateTime: new Date(startTime).toISOString(),
        timeZone: "Europe/Kiev"
      },
      end: {
        dateTime: new Date(endTime).toISOString(),
        timeZone: "Europe/Kiev"
      },
      visibility: "public"
    }
  });
};

const cancelGoogleEvent = ({
  accessToken,
  eventId,
  calendarId
}: {
  accessToken: string;
  eventId: string;
  calendarId?: string;
}) => {
  return axios({
    method: "PATCH",
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?sendUpdates=all`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      status: "cancelled"
    }
  });
};

export const deleteGoogleEvent = ({
  accessToken,
  eventId,
  calendarId = "primary"
}: {
  accessToken: string;
  eventId: string;
  calendarId?: string;
}) => {
  return axios({
    method: "DELETE",
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

const updateTimeAndApprove = (settings: any) => {
  const {
    accessToken,
    calendarId,
    eventId,
    start_time,
    end_time,
    guestEmail,
    organizerEmail,
    timeZone
  } = settings;

  return axios({
    method: "PATCH",
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?sendUpdates=all`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      attendees: [
        { email: organizerEmail, responseStatus: "accepted" },
        { email: guestEmail, responseStatus: "accepted" }
      ],
      start: {
        dateTime: new Date(start_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev"
      },
      end: {
        dateTime: new Date(end_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev"
      }
    }
  });
};

const updateGoogleEvent = (
  accessToken: string,
  calendarId: string,
  eventId: string,
  start_time: string,
  end_time: string,
  description: string,
  summary: string,
  timeZone: string
) => {
  return axios({
    method: "PATCH",
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?sendUpdates=all`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      // attendees: [{ email: 'vitadrapaliuk@gmail.com', responseStatus: 'declined' }],
      // attendees: [{ email: 'vitadrapaliuk@gmail.com', responseStatus: 'declined' }],
      // attendees: [{ email: 'vitadrapaliuk@gmail.com', responseStatus: 'needsAction' }],
      start: {
        dateTime: new Date(start_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev"
      },
      end: {
        dateTime: new Date(end_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev"
      },
      description,
      summary
    }
  });
};

const getNewAccessToken = (
  refreshToken: string
): Promise<AxiosResponse<any, any>> => {
  const CLIENT_ID = process.env.GOODLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const REDIRECT_URI = process.env.GOOGLE_CALLBACK_URL;

  return axios.post(
    `https://www.googleapis.com/oauth2/v4/token?refresh_token=${refreshToken}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=refresh_token`
  );
};

export {
  getNewAccessToken,
  getGoogleCalendarsList,
  updateGoogleEvent,
  updateTimeAndApprove,
  cancelGoogleEvent,
  createGoogleEvent,
  getGoogleCalendarEvents
};
