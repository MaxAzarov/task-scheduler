import { Readable } from "stream";
import { getGoogleEvents } from "../../google/lib/apiFunctions";
import getArrayFromStream from "../../utils/getArrayFromStream";
const util = require("util");

describe.skip("google getGoogleCalendarsList", () => {
  it("should work properly", async () => {
    const token =
      "ya29.a0ARrdaM-wDS9xWcIzOtbQZYNCKoOhXDv4Rowu1CCkwvDCxP3v3jzxs0CN97tiead_fRu_Nw62tbsafapwSwjTocs55oFGLEPoQBegUor0pf-X7ub3NL-pBvBKW3iq0zYLfFxsbCkRiljQQ6I4SKBoYABei6Um";

    const stream = Readable.from(
      getGoogleEvents(token, "2021-11-28", "2021-11-29")
    );

    return getArrayFromStream(stream).then((data) => {
      console.log(util.inspect(data, false, null, true /* enable colors */));
    });
  });
});
