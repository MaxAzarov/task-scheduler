export interface IGoogleEvent {
  kind: string;
  etag: string;
  summary: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: { method: string; minutes: number }[];
  nextSyncToken: string;
  items: {
    kind: string;
    etag: string;
    id: string;
    status: string;
    htmlLink: string;
    created: string;
    updated: string;
    summary: string;
    creator: { email: string; self: boolean };
    organizer: { email: string; self: boolean };
    start: {
      dateTime: string;
      timeZone: string;
    };
    end: {
      dateTime: string;
      timeZone: string;
    };
    recurrence: string[]; // "RRULE:FREQ=DAILY"
    iCalUID: string;
    sequence: number;
    reminders: {
      useDefault: boolean;
      overrides: { method: string; minutes: number }[];
    };
    eventType: string;
  }[];
}
