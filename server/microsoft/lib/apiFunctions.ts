import axios, { AxiosResponse } from "axios";
import { IMicrosoftEvent } from "../types";
import Moment from "moment";
import { compose } from "ramda";
import splitRangeByDays from "../../utils/splitRangeByDays";
import normalizeMicrosoftEvents from "./normalizeEvents";
import paginateOverRanges from "./../../utils/paginateOverRange";
import { DATE_FORMAT_API } from "../../constants/services";

export async function* getMicrosoftEvents(
  accessToken: string,
  startTime: string,
  endTime: string
) {
  const ranges = splitRangeByDays(3, Moment(startTime), Moment(endTime));

  yield* compose<any, any>(
    paginateOverRanges(ranges, accessToken, normalizeMicrosoftEvents)
  )(getMicrosoftCalendarEvents);
}

export const getMicrosoftCalendarEvents = async (
  accessToken: string,
  startTime: string,
  endTime: string
): Promise<AxiosResponse<IMicrosoftEvent, any>> => {
  // &$top=25&startDateTime=2021-05-29T21:00:00Z&endDateTime=2021-06-05T21:00:00Z
  // `https://graph.microsoft.com/v1.0/me/calendarview?$select=subject,organizer,start,end&$orderby=start/dateTime&startDateTime=2021-11-23T21:00:00Z&endDateTime=2021-11-29T21:00:00Z`,
  return axios.get(
    `https://graph.microsoft.com/v1.0/me/calendarview?$select=subject,organizer,start,end&$orderby=start/dateTime`,
    {
      params: {
        // startDateTime: "2021-11-23T21:00:00Z",
        // endDateTime: "2021-11-29T21:00:00Z",
        startDateTime: Moment(startTime).format("YYYY-MM-DD[T]12:mm:ss[Z]"),
        endDateTime: Moment(endTime)
          .add(1, "d")
          .format("YYYY-MM-DD[T]12:mm:ss[Z]"),
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getMe = async (accessToken: string) => {
  return axios.get(
    "https://graph.microsoft.com/v1.0/me?$select=displayName,mail,mailboxSettings,userPrincipalName",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export interface Options {
  subject: string;
  description: string;
  startTime: string;
  endTime: string;
}

export const createMicrosoftEvent = async (
  accessToken: string,
  event: Options
) => {
  const { subject, description, startTime, endTime } = event;
  const data = {
    subject,
    body: {
      contentType: "HTML",
      content: description,
    },
    start: {
      dateTime: Moment(startTime, DATE_FORMAT_API).format("YYYY-MM-DD[T]HH:mm"),
      timeZone: "FLE Standard Time",
    },
    end: {
      dateTime: Moment(endTime, DATE_FORMAT_API).format("YYYY-MM-DD[T]HH:mm"),
      timeZone: "FLE Standard Time",
    },
  };
  return axios({
    method: "POST",
    url: `https://graph.microsoft.com/v1.0/me/events`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    data,
  });
};

export const updateMicrosoftEvent = async (
  accessToken: string,
  eventID: string,
  updatedEvent: any
) => {
  return axios({
    method: "PATCH",
    url: `https://graph.microsoft.com/v1.0/me/events/${eventID}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    data: updatedEvent,
  });
};

export const cancelMicrosoftEvent = async ({
  accessToken,
  eventId,
  calendarId,
}: {
  accessToken: string;
  eventId: string;
  calendarId?: string;
}) => {
  return axios({
    method: "POST",
    url: `https://graph.microsoft.com/v1.0/me/events/${eventId}/cancel`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });
};

export const deleteMicrosoftEvent = async ({
  accessToken,
  eventId,
}: {
  accessToken: string;
  eventId: string;
  calendarId?: string;
}) => {
  return axios({
    method: "DELETE",
    url: `https://graph.microsoft.com/v1.0/me/events/${eventId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const acceptEvent = async (
  accessToken: string,
  eventID: string,
  body: any
) => {
  return axios({
    method: "POST",
    url: `https://graph.microsoft.com/v1.0/me/events/${eventID}/accept`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  });
};

export const rejectEvent = async (
  accessToken: string,
  eventID: string,
  body: any
) => {
  return axios({
    method: "POST",
    url: `https://graph.microsoft.com/v1.0/me/events/${eventID}/decline`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  });
};

export const getNewMicrosoftAccessToken = async (
  refresh_token: string
): Promise<AxiosResponse<any, any>> => {
  const params = new URLSearchParams();
  console.log(
    "🚀 ~ file: apiFunctions.ts ~ line 168 ~ refresh_token",
    refresh_token
  );

  console.log("OAUTH_REDIRECT_URIP: ", process.env.OAUTH_REDIRECT_URI);
  console.log(
    "process.env.OAUTH_APP_ID as string",
    process.env.OAUTH_APP_ID as string
  );
  params.append("redirect_uri", process.env.OAUTH_REDIRECT_URI as string);
  params.append("refresh_token", refresh_token);
  params.append("grant_type", "refresh_token");
  params.append("scope", process.env.OAUTH_SCOPES as string);
  params.append("client_secret", process.env.OAUTH_APP_PASSWORD as string);
  params.append("client_id", process.env.OAUTH_APP_ID as string);

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Origin: "http://localhost:5000/",
    },
  };
  const response = axios.post(
    "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    params,
    config
  );

  return response;
};

export const verifyAccessToken = (): Promise<boolean> => {
  return Promise.resolve(false);
};
