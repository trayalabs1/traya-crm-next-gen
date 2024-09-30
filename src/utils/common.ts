import { get, isArray, isEmpty, replace, startCase } from "lodash";
/**
 * Safely retrieves a value from an object using a path of keys.
 * @param content - The object to retrieve the value from.
 * @param keys - A string representing the path of keys (e.g., 'key1.key2').
 * @param fallback - The value to return if the retrieved value is undefined.
 * @returns The retrieved value or the fallback value.
 */
export function getValue<T>(
  content: object,
  keys: string[] | string,
  fallback: T = "-" as unknown as T,
): T {
  return get(content, keys, fallback) || fallback;
}

/**
 * Safely maps over an array.
 * @param data - The data to check and map.
 * @param mapFn - The mapping function to apply to each element.
 * @param fallback - The value to return if data is not a valid array.
 * @returns The mapped array or fallback value.
 */
export function safeMap<T, R>(
  data: T[] | unknown,
  mapFn: (item: T, index: number) => R,
  fallback: R[] = [],
): R[] {
  if (isArray(data)) {
    return data.map(mapFn);
  }
  return fallback; // Return fallback if not a valid array
}

interface PAGINATION_CONFIG_TYPE {
  DEFAULT_PAGE: number;
  DEFAULT_LIMIT: number;
}
export const PAGINATION_CONFIG: PAGINATION_CONFIG_TYPE = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};

type QueryParam = string | string[] | number | undefined;

export function generateQueryString(
  params: Record<string, QueryParam>,
): string {
  if (isEmpty(params)) return "";

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (!isEmpty(value)) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(`${key}[]`, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString() ? `?${searchParams.toString()}` : "";
}

interface CustomOptionType {
  label: string;
  value: string;
}
export const statusList: CustomOptionType[] = [
  { label: "Draft", value: "draft" },
  { label: "Submitted", value: "submitted" },
  { label: "Approved By Checker", value: "approved_by_checker" },
  { label: "Approved By Publisher", value: "approved_by_publisher" },
  { label: "Published", value: "published" },
];

export function formatWithSpaces(str: string) {
  return startCase(replace(str, /_/g, " "));
}

export const formStatus: CustomOptionType[] = [
  { label: "Not Started", value: "not_started" },
  { label: "Started but Not Completed", value: "started_but_not_completed" },
  { label: "Completed", value: "completed" },
];

export const genderList: CustomOptionType[] = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
];

export const stages: CustomOptionType[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "4" },
];

export const streaks: CustomOptionType[] = [
  { label: "3 Days", value: "3_days" },
  { label: "7 Days", value: "7_days" },
  { label: "21 Days", value: "21_days" },
];

export const coins: CustomOptionType[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const phases: CustomOptionType[] = [
  { label: "O2D", value: "O2D" },
  { label: "Week 1 (D0-D7)", value: "Week 1 (D0-D7)" },
  { label: "Week 2 (D8-D14)", value: "Week 2 (D8-D14)" },
  { label: "W3", value: "W3" },
  { label: "W4", value: "W4" },
  { label: "W5", value: "W5" },
  { label: "W6", value: "W6" },
  { label: "W7", value: "W7" },
  { label: "W8", value: "W8" },
  { label: "W9", value: "W9" },
  { label: "W9+", value: "W9+" },
];

export const daysSinceLatestFormFilled: CustomOptionType[] = [
  { label: "D0", value: "D0" },
  { label: "D1-D7", value: "D1-D7" },
  { label: "D8-D15", value: "D8-D15" },
  { label: "D16-D30", value: "D16-D30" },
  { label: "D31-D45", value: "D31-D45" },
  { label: "D45+", value: "D45+" },
];

export const getJsonFromStorage = <T>(
  key: string,
  storageType: "local" | "session" = "local",
): T | null => {
  const storage = storageType === "local" ? localStorage : sessionStorage;
  const jsonString = storage.getItem(key);

  if (jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON from storage:", error);
      return null;
    }
  }

  return null;
};
