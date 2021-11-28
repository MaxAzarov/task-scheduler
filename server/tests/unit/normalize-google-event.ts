import { expect } from "chai";
import normalizeGoogleEvent from "../../google/lib/normalizeEvent";

describe("normalizeGoogleEvent", () => {
  it("should properly normalize google event ", () => {
    expect(
      normalizeGoogleEvent({
        kind: "calendar#event",
        etag: '"3161399292725000"',
        id: "_68o3aghj68rkab9p8go4cb9k8kqj8ba284q4cb9j6koj6di665144c1g6s",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=XzY4bzNhZ2hqNjhya2FiOXA4Z280Y2I5azhrcWo4YmEyODRxNGNiOWo2a29qNmRpNjY1MTQ0YzFnNnNfMjAyMDAyMDJUMjAwMDAwWiB2b2xvZG9yMDU0MTJAbQ",
        created: "2020-02-02T09:04:26.000Z",
        updated: "2020-02-02T09:04:26.431Z",
        summary: "Слова",
        creator: { email: "volodor05412@gmail.com", self: true },
        organizer: { email: "volodor05412@gmail.com", self: true },
        start: {
          dateTime: "2020-02-02T22:00:00+02:00",
          timeZone: "Europe/Kiev",
        },
        end: {
          dateTime: "2020-02-02T22:30:00+02:00",
          timeZone: "Europe/Kiev",
        },
        recurrence: ["RRULE:FREQ=DAILY"],
        iCalUID: "205B327E-9D0F-4E54-BA4F-35136F1BB007",
        sequence: 0,
        reminders: {
          useDefault: false,
          overrides: [{ method: "popup", minutes: 15 }],
        },
        eventType: "default",
      })
    ).deep.equals({
      id: "_68o3aghj68rkab9p8go4cb9k8kqj8ba284q4cb9j6koj6di665144c1g6s",
      subject: "Слова",
      start: { dateTime: "2020-02-02T22:00:00+02:00", timeZone: "Europe/Kiev" },
      end: { dateTime: "2020-02-02T22:30:00+02:00", timeZone: "Europe/Kiev" },
      link: "https://www.google.com/calendar/event?eid=XzY4bzNhZ2hqNjhya2FiOXA4Z280Y2I5azhrcWo4YmEyODRxNGNiOWo2a29qNmRpNjY1MTQ0YzFnNnNfMjAyMDAyMDJUMjAwMDAwWiB2b2xvZG9yMDU0MTJAbQ",
    });
  });
});
