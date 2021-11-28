import { expect } from "chai";
import normalizeMicrosoftEvents from "../../microsoft/lib/normalizeEvents";

describe("normalizeMicrosoftEvents", () => {
  it("should properly normalize micrsoft events: ", () => {
    expect(
      normalizeMicrosoftEvents({
        "@odata.context":
          "https://graph.microsoft.com/v1.0/$metadata#users('outlook_71587A5E13E6D727%40outlook.com')/calendarView(subject,organizer,start,end)",
        value: [
          {
            "@odata.etag": 'W/"atlyxFpghUOabkKuwWMQlQADosigrA=="',
            id: "AQMkADAwATNiZmYAZC0wY2VjLTRjYwA3LTAwAi0wMAoARgAAA-gqP5-QQnRCroqL2oeluDIHAGrZcsRaYIVDmm5CrsFjEJUAAAIBDQAAAGrZcsRaYIVDmm5CrsFjEJUAA6LPIqIAAAA=",
            subject: "test",
            start: {
              dateTime: "2021-11-24T19:00:00.0000000",
              timeZone: "UTC",
            },
            end: {
              dateTime: "2021-11-24T19:30:00.0000000",
              timeZone: "UTC",
            },
            organizer: {
              emailAddress: {
                name: "Максим Азаров",
                address: "outlook_71587A5E13E6D727@outlook.com",
              },
            },
          },
          {
            "@odata.etag": 'W/"atlyxFpghUOabkKuwWMQlQADosigsg=="',
            id: "AQMkADAwATNiZmYAZC0wY2VjLTRjYwA3LTAwAi0wMAoARgAAA-gqP5-QQnRCroqL2oeluDIHAGrZcsRaYIVDmm5CrsFjEJUAAAIBDQAAAGrZcsRaYIVDmm5CrsFjEJUAA6LPIqMAAAA=",
            subject: "test2",
            start: {
              dateTime: "2021-11-24T19:30:00.0000000",
              timeZone: "UTC",
            },
            end: {
              dateTime: "2021-11-24T20:00:00.0000000",
              timeZone: "UTC",
            },
            organizer: {
              emailAddress: {
                name: "Максим Азаров",
                address: "outlook_71587A5E13E6D727@outlook.com",
              },
            },
          },
        ],
      })
    ).deep.equals([
      {
        id: "AQMkADAwATNiZmYAZC0wY2VjLTRjYwA3LTAwAi0wMAoARgAAA-gqP5-QQnRCroqL2oeluDIHAGrZcsRaYIVDmm5CrsFjEJUAAAIBDQAAAGrZcsRaYIVDmm5CrsFjEJUAA6LPIqIAAAA=",
        subject: "test",
        start: { dateTime: "2021-11-24T19:00:00.0000000", timeZone: "UTC" },
        end: { dateTime: "2021-11-24T19:30:00.0000000", timeZone: "UTC" },
      },
      {
        id: "AQMkADAwATNiZmYAZC0wY2VjLTRjYwA3LTAwAi0wMAoARgAAA-gqP5-QQnRCroqL2oeluDIHAGrZcsRaYIVDmm5CrsFjEJUAAAIBDQAAAGrZcsRaYIVDmm5CrsFjEJUAA6LPIqMAAAA=",
        subject: "test2",
        start: { dateTime: "2021-11-24T19:30:00.0000000", timeZone: "UTC" },
        end: { dateTime: "2021-11-24T20:00:00.0000000", timeZone: "UTC" },
      },
    ]);
  });
});
