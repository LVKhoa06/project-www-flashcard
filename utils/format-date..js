const CONST_LOCALES = {
    "en-US": {
      weekDays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ], // Starts from 'Sunday'
      weekDaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthNamesShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    }, // en-US
    "vi-VN": {
      weekDays: [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy",
      ], // Starts from 'Chủ nhật'
      weekDaysShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      monthNames: [
        "Tháng một",
        "Tháng hai",
        "Tháng ba",
        "Tháng tư",
        "Tháng năm",
        "Tháng sáu",
        "Tháng bảy",
        "Tháng tám",
        "Tháng chín",
        "Tháng mười",
        "Tháng mười một",
        "Tháng mười hai",
      ],
      monthNamesShort: [
        "Thg 1",
        "Thg 2",
        "Thg 3",
        "Thg 4",
        "Thg 5",
        "Thg 6",
        "Thg 7",
        "Thg 8",
        "Thg 9",
        "Thg 10",
        "Thg 11",
        "Thg 12",
      ],
      datePartDecorators: ["ngày", "tháng", "năm"],
    }, // vi-VN
  }; // CONST_LOCALES
  const CONST_DATE_PARTS_MAX = 4;
  const CONST_DATE_PART_COMBINATIONS_YEAR = ["YYYY", "YY"];
  const CONST_DATE_PART_COMBINATIONS_MONTH = ["MMMM", "MMM", "MM", "M"];
  const CONST_DATE_PART_COMBINATIONS_DAY = ["DDDD", "DDD", "DD", "D"];
  
  /**
   * **USAGE**:
   * - `formatDateWithLocale()`
   * - `formatDateWithLocale({ format: 'foo bar' })` // Invalid date part(s)
   * - `formatDateWithLocale({ format: 'DDD D MMMM, YYYY', input: new Date(2022, 1, 1) })` // Tue 1 February, 2022
   * - `formatDateWithLocale({ format: 'DDDD ngày DD tháng MM năm YYYY', input: new Date('2022-12-02'), locale: 'vi-VN' })` // Thứ sáu ngày 02 tháng 12 năm 2022
   * @param {{format?: string, input?: Date, locale?: string}} options Options passed as an object { format, input, locale }:
   *
   * 👉 Default format is `'YYYY-MM-DD'`
   *
   * 👉 Default input is current date
   *
   * 👉 Default locale is `'en-US'`
   * @returns {string} Date string in the given format and locale
   */
  export default function formatDateWithLocale({
    format = "YYYY-MM-DD",
    input = new Date(),
    locale = "en-US",
  } = {}) {
    // Default values for object parameter
    const localeSettings = CONST_LOCALES[locale];
    if (!localeSettings) return `Invalid locale`;
  
    const {
      weekDays,
      weekDaysShort,
      monthNames,
      monthNamesShort,
      datePartDecorators,
    } = localeSettings;
    const datePartDECORATORS =
      datePartDecorators?.map((item) => item.toUpperCase()) || []; // ?. is optional chaining operator
    const day = input.getDate();
    const dayOfWeek = input.getDay(); // Counts from 0
    const month = input.getMonth(); // Counts from 0
    const year = input.getFullYear();
  
    //#region Tellers
    const getTeller = (pattern) =>
      CONST_DATE_PART_COMBINATIONS_YEAR.includes(pattern)
        ? yearTeller(pattern)
        : CONST_DATE_PART_COMBINATIONS_MONTH.includes(pattern)
        ? monthTeller(pattern)
        : CONST_DATE_PART_COMBINATIONS_DAY.includes(pattern)
        ? dayTeller(pattern)
        : false; // getTeller
  
    const yearTeller = (yearPattern) =>
      yearPattern === "YYYY" ? year : `${year}`.substring(2); // yearTeller
  
    const monthTeller = (monthPattern) =>
      monthPattern === "MMMM"
        ? monthNames[month]
        : monthPattern === "MMM"
        ? monthNamesShort[month]
        : monthPattern === "MM"
        ? `${month + 1}`.padStart(2, "0")
        : month + 1; // monthTeller
  
    const dayTeller = (dayPattern) =>
      dayPattern === "DDDD"
        ? weekDays[dayOfWeek]
        : dayPattern === "DDD"
        ? weekDaysShort[dayOfWeek]
        : dayPattern === "DD"
        ? `${day}`.padStart(2, "0")
        : day; // dayTeller
    //#endregion Tellers
  
    const dateParts = format
      .split(/[.,-\/\s]/)
      .filter((part) => part && !datePartDECORATORS.includes(part.toUpperCase())); // Remove empties and dateDecorators
    if (dateParts.length < 2 || dateParts.length > CONST_DATE_PARTS_MAX)
      return `Invalid length of parts`;
  
    const datePartsParsed = dateParts.map((part) => getTeller(part));
    if (datePartsParsed.some((part) => !part)) return ``;
  
    return format
      .replace(dateParts[0], datePartsParsed[0])
      .replace(dateParts[1], datePartsParsed[1])
      .replace(dateParts[2], datePartsParsed[2]) // do NOTHING if dateParts < 3
      .replace(dateParts[3], datePartsParsed[3]); // do NOTHING if dateParts < 4
  } // formatDateWithLocale