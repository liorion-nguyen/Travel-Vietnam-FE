import type { Locale } from 'date-fns';
import locale from 'date-fns/locale/en-US';

const formatDistanceLocale: Record<string, string> = {
  lessThanXSeconds: '{{count}}s',
  xSeconds: '{{count}}s',
  halfAMinute: '30s',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
};

export const customLocale: Locale = {
  ...locale,
  formatDistance: (token, count, options) => {
    options = options || {};

    const result = formatDistanceLocale[token].replace('{{count}}', count);

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result;
      } else {
        return result + ' ago';
      }
    }

    return result;
  },
};

export const convertLocateTimezone = (value: Date) => {
  // Input date in local time zone
  const localDate = new Date(value);

  // Extract date components
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Adding 1 since January is 0
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');
  const seconds = String(localDate.getSeconds()).padStart(2, '0');

  // Create ISO string in the desired format
  const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  return isoString;
};

export const convertStringToDateWithTimezone = (datetime: string) => {
  let indochinaTime = datetime;
  if (datetime) {
    // Convert the given ISO string to a Date object
    const utcDate = new Date(datetime);

    // Add 7 hours to convert from GMT to Indochina Time
    utcDate.setHours(utcDate.getHours() - 7);

    // Convert the date back to ISO string
    indochinaTime = utcDate.toISOString();
  }

  return indochinaTime;
};
