import { Readable } from "stream";

const getArrayFromStream = (stream: Readable) => {
  return new Promise((resolve, reject) => {
    const array: unknown[] = [];
    stream.on("data", (data) => {
      array.push(data);
    });
    stream.on("error", reject);
    stream.on("end", () => resolve(array));
  });
};

export default getArrayFromStream;
