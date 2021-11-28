import { expect } from "chai";
import normalizeMicrosoftEvent from "../../microsoft/lib/normalizeEvent";

describe("normalizeMicrosoftEvent", () => {
  it("should properly normalize microsoft event ", () => {
    expect(
      normalizeMicrosoftEvent({
        "@odata.etag": "test",
        id: "id",
        subject: "tille",
        start: { dateTime: "start", timeZone: "" },
        end: { dateTime: "end", timeZone: "" },
        organizer: {
          emailAddress: {
            name: "name",
            address: "address",
          },
        },
      })
    ).deep.equals({
      id: "id",
      subject: "tille",
      start: { dateTime: "start", timeZone: "" },
      end: { dateTime: "end", timeZone: "" },
    });
  });
});
