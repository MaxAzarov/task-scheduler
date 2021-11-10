import axios from "axios";

const createEvent = (param: any) => {
  const {
    accessToken,
    calendarId,
    description,
    attendees,
    title,
    start_time,
    end_time,
    timeZone,
  } = param;
  return axios({
    method: "POST",
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?sendUpdates=all`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      guestsCanModify: true,
      attendees,
      // attendees: [{ email: '' }],
      sendNotifications: true,
      summary: title,
      description,
      start: {
        dateTime: new Date(start_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev",
      },
      end: {
        dateTime: new Date(end_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev",
      },
      visibility: "public",
    },
  });
};

const cancelEvent = (
  accessToken: string,
  calendarId: string,
  eventId: string
) => {
  return axios({
    method: "PATCH",
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?sendUpdates=all`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      status: "cancelled",
    },
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
    timeZone,
  } = settings;

  return axios({
    method: "PATCH",
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?sendUpdates=all`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      attendees: [
        { email: organizerEmail, responseStatus: "accepted" },
        { email: guestEmail, responseStatus: "accepted" },
      ],
      start: {
        dateTime: new Date(start_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev",
      },
      end: {
        dateTime: new Date(end_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev",
      },
    },
  });
};

const updateEvent = (
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
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      // attendees: [{ email: 'vitadrapaliuk@gmail.com', responseStatus: 'declined' }],
      // attendees: [{ email: 'vitadrapaliuk@gmail.com', responseStatus: 'declined' }],
      // attendees: [{ email: 'vitadrapaliuk@gmail.com', responseStatus: 'needsAction' }],
      start: {
        dateTime: new Date(start_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev",
      },
      end: {
        dateTime: new Date(end_time).toISOString(),
        timeZone: timeZone || "Europe/Kiev",
      },
      description,
      summary,
    },
  });
};

const getCalendarsList = (accessToken: string) => {
  return axios.get(
    `https://www.googleapis.com/calendar/v3/users/me/calendarList`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const googleAuthAPI = {
  getNewAccessToken: (refreshToken: string) => {
    const CLIENT_ID = process.env.GOOGLE_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_APP_CLIENT_SECRET;
    const REDIRECT_URI = process.env.GOOGLE_APP_REDIRECT_URI;

    return axios.post(
      `https://www.googleapis.com/oauth2/v4/token?refresh_token=${refreshToken}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=refresh_token`
    );
  },
};

export {
  googleAuthAPI,
  getCalendarsList,
  updateEvent,
  updateTimeAndApprove,
  cancelEvent,
  createEvent,
};
