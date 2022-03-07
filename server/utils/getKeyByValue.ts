/* eslint-disable import/no-unresolved */
import { Services } from "../constants/services";

export function getKeyByValue(value: string) {
  return Object.keys(Services).find(
    (key) => Services[key as "googleCalendar" | "microsoftCalendar"] === value
  );
}
