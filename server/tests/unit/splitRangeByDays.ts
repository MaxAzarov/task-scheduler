import Moment from "moment";
import { expect } from "chai";
import splitRangeByDays from "../../utils/splitRangeByDays";

describe("splitRangeByDays", () => {
  const startTime = "2021-12-10";
  const endTime = "2021-12-25";
  expect(splitRangeByDays(3, Moment(startTime), Moment(endTime))).deep.equals([
    { startDate: "2021-12-10", endDate: "2021-12-12" },
    { startDate: "2021-12-13", endDate: "2021-12-15" },
    { startDate: "2021-12-16", endDate: "2021-12-18" },
    { startDate: "2021-12-19", endDate: "2021-12-21" },
    { startDate: "2021-12-22", endDate: "2021-12-24" },
    { startDate: "2021-12-25", endDate: "2021-12-25" }
  ]);
});
