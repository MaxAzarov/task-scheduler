import { expect } from "chai";
import { getKeyByValue } from "../../utils/getKeyByValue";

describe("getKeyByValue", () => {
  it("should get key by value properly", () => {
    expect(getKeyByValue("google-calendar")).equals("googleCalendar");
    expect(getKeyByValue("microsoft-calendar")).equals("microsoftCalendar");
  });
});
