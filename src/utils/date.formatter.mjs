import { DateTime } from "luxon";

/**
 * @param {string | Date | null} value
 * @returns {string}
 */
const dateFormatter = (value) => {
  if (!value) {
    return "-";
  }

  let formattedDate;
  if (typeof value === "string") {
    formattedDate = DateTime.fromISO(value).toISODate();
  } else {
    formattedDate = DateTime.fromJSDate(value).toISODate();
  }

  return formattedDate ?? "-";
};

export default dateFormatter;
