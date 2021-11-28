export interface Event {
  id: string;
  subject: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  link?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  link?: string;
}

export interface DbEvent {
  body: string;
  createdAt: string;
  end_time: string;
  event_id: string;
  id: string;
  integration_id: string;
  start_time: string;
  status: unknown;
  subject: string;
  updatedAt: string;
  user_id: string;
}

export enum Services {
  googleCalendar = "google-calendar",
  microsoftCalendar = "microsoft-calendar",
}
