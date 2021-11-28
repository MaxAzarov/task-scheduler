import { curry, path } from "ramda";

const getData = path(["data"]);

async function* paginateOverRanges(
  ranges: {
    startDate: string | undefined;
    endDate: string | undefined;
  }[],
  accessToken: string,
  normalizeFunction: Function,
  fetchMethod: Function
) {
  for (let i = 0; i < ranges.length; i++) {
    const response = await fetchMethod(
      accessToken,
      ranges[i].startDate,
      ranges[i].endDate
    );

    yield normalizeFunction(getData(response));
  }
}

export default curry(paginateOverRanges);
