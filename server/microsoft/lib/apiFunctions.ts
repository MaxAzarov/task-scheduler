import axios from "axios";

export const getCalendarsList = async (accessToken: string) => {
  // &$top=25&startDateTime=2021-05-29T21:00:00Z&endDateTime=2021-06-05T21:00:00Z
  return axios.get(
    `https://graph.microsoft.com/v1.0/me/calendarview?$select=subject,organizer,start,end&$orderby=start/dateTime`,
    {
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

export const createMicrosoftEvent = async (accessToken: string, event: any) => {
  return axios({
    method: "POST",
    url: `https://graph.microsoft.com/v1.0/me/events`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
    data: event,
  });
};

// example body:
// {
//   "subject": "Let\'s go for lunch",
//   "body": {
//     "contentType": "HTML",
//     "content": "Does mid month work for you?"
//   },
//   "start": {
//       "dateTime": "2021-06-01T16:13",
//       "timeZone": "FLE Standard Time"
//   },
//   "end": {
//       "dateTime": "2021-06-01T16:13",
//       "timeZone": "FLE Standard Time"
//   },
//   "attendees": [
//     {
//       "emailAddress": {
//         "address": "emailsendler@gmail.com",
//         "name": "Adele Vance"
//       },
//       "type": "required"
//     }
//   ]
// }

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

export const cancelMicrosoftEvent = async (
  accessToken: string,
  eventID: string
) => {
  return axios({
    method: "POST",
    url: `https://graph.microsoft.com/v1.0/me/events/${eventID}/cancel`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
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

export const getNewMicrosoftAccessToken = async (refresh_token: string) => {
  const params = new URLSearchParams();
  params.append("redirect_uri", "http://localhost:3000/");
  params.append("refresh_token", refresh_token);
  params.append("grant_type", "refresh_token");
  params.append("client_id", "64202838-d1b1-4cb4-b88e-0a49999f224d");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "http://localhost:3000/",
    },
  };
  const response = axios.post(
    "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    params,
    config
  );

  return response;
};

export const verifyAccessToken = () => {};
