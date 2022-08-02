import { DateRange, extendMoment } from "moment-range";
import Moment from "moment";
import { head, last, curry, map } from "ramda";
import { DATE_FORMAT } from "../constants/services";

const moment = extendMoment(Moment as any);

const formatRange = (range: Moment.Moment[]) => ({
  startDate: head(range)?.format(DATE_FORMAT),
  endDate: last(range)?.format(DATE_FORMAT)
});

const splitEvery = curry((sliceLengh: number, list: unknown[]) => {
  const result: unknown[] = [];

  for (let i = 0; i < list.length; i += sliceLengh) {
    result.push(list.slice(i, i + sliceLengh));
  }

  return result;
});

function splitRangeByDays(
  limit: number,
  stardDate: Moment.Moment,
  endDate: Moment.Moment
) {
  const range: DateRange = moment.range(stardDate, endDate);
  const byDays: Moment.Moment[] = Array.from(range.by("days"));
  const splitted: Moment.Moment[][] = splitEvery(limit, byDays);
  return map(formatRange, splitted);
}

export default splitRangeByDays;
