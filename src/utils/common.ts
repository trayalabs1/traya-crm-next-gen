import { Roles } from "user";
import {
  get,
  isArray,
  isEmpty,
  replace,
  startCase,
  map,
  isObject,
} from "lodash";
import { cmsStatusFilter } from "cms";
import axios from "axios";
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

export interface CustomOptionType {
  label: string;
  value: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}
export const statusList: CustomOptionType[] = [
  { label: "Draft", value: "draft" },
  { label: "Submitted", value: "submitted" },
  { label: "Approved By Checker", value: "approved_by_checker" },
  // { label: "Approved By Publisher", value: "approved_by_publisher" },
  { label: "Published", value: "published" },
];

export function formatWithSpaces(str: string) {
  return startCase(replace(str, /_/g, " "));
}

export const formStatus: CustomOptionType[] = [
  { label: "Not Started", value: "NotStarted" },
  { label: "Started", value: "Started" },
  { label: "Completed", value: "Completed" },
];

export const genderList: CustomOptionType[] = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
  { label: "Both", value: "All" },
];

export const customerTypeList: CustomOptionType[] = [
  // { label: "All", value: "All" },
  { label: "Draft", value: "Draft" },
  { label: "Lead", value: "Lead" },
  { label: "Customer", value: "Customer" },
];

export const stages: CustomOptionType[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "4" },
];

export const streaks: CustomOptionType[] = [
  { label: "3 Days", value: "3" },
  { label: "7 Days", value: "7" },
  { label: "21 Days", value: "21" },
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

export const languageList = [
  // { label: "All", value: "All" },
  { label: "ENGLISH", value: "ENGLISH" },
  { label: "HINDI", value: "HINDI" },
];

export const componentTypeList: CustomOptionType[] = [
  { label: "Static", value: "Static" },
  { label: "Dynamic", value: "Dynamic", isDisabled: true },
];

export const contentTypeList: CustomOptionType[] = [
  { label: "Banner", value: "banner" },
  { label: "Cta", value: "cta" },
  { label: "Name", value: "name" },
  { label: "Cta button", value: "cta_button" },
  { label: "Custom", value: "custom" },
  { label: "Full image", value: "full_image" },
  { label: "Carousel item", value: "carousel_item" },
  { label: "Image", value: "image" },
  { label: "Video", value: "video" },
  { label: "Community card", value: "community_card" },
  { label: "Playlist", value: "playlist" },
  { label: "Hair solution", value: "hair_solution" },
  { label: "Step", value: "step" },
  { label: "Retake hair test", value: "retake_hair_test" },
  { label: "Holistic plan", value: "holistic_plan" },
  { label: "Support card", value: "support_card" },
  { label: "Full width image", value: "full_width_image" },
  { label: "Lottie", value: "lottie" },
  { label: "Video card", value: "video_card" },
  { label: "Chat male", value: "chat_male" },
  { label: "Chat female", value: "chat_female" },
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

export function doubleQuotesRemover(str: string) {
  if (str) return str.replace(/"/g, "");
}

type SelectOption = {
  label: string;
  value: string;
};

export function mapToSelectOptions<T>(
  items: T[],
  valueKey?: keyof T,
  labelKey?: keyof T,
): SelectOption[] {
  return map(items, (item) => {
    if (isObject(item) && valueKey && labelKey) {
      return {
        label: String(get(item, labelKey) ?? "NA"),
        value: String(get(item, valueKey) ?? "NA"),
      };
    } else {
      return {
        label: String(item ?? "NA"),
        value: String(item ?? "NA"),
      };
    }
  });
}

export const getCMSFilterStatusByRole = (role?: Roles) => {
  let status: cmsStatusFilter = "draft";

  switch (role) {
    case "checker":
      status = "submitted";
      break;
    case "publisher":
      status = "approved_by_checker";
      break;
    default:
      break;
  }

  return status;
};

export const getCMSActionButtonColor = (action: string) => {
  switch (action) {
    case "edit":
      return "bg-blue-500 hover:bg-blue-600 text-white";
    case "checker":
      return "bg-yellow-500 hover:bg-yellow-600 text-white";
    case "publisher":
      return "bg-orange-500 hover:bg-orange-600 text-white";
    case "submit":
      return "bg-indigo-500 hover:bg-indigo-600 text-white";
    case "publish":
      return "bg-green-500 hover:bg-green-600 text-white";
    case "compare":
      return "bg-purple-500 hover:bg-purple-600 text-white";
    default:
      return "bg-gray-100 hover:bg-gray-200 text-gray-800";
  }
};

export function getErrorMessage(error: unknown): string {
  const DEFAULT_MESSAGE = "Something went wrong";
  let errorMessage: string = DEFAULT_MESSAGE;

  if (axios.isAxiosError(error)) {
    const contentType = get(error, ["response", "headers", "content-type"], "");

    if (error.response) {
      if (["text/plain", "text/html"].includes(contentType.split(";")[0])) {
        errorMessage = get(error, ["response", "data"], DEFAULT_MESSAGE);
      } else {
        errorMessage = get(
          error,
          ["response", "data", "message"],
          get(
            error,
            ["response", "data", "error"],
            get(error, ["response", "message"], DEFAULT_MESSAGE),
          ),
        );
      }
    } else if (error.request) {
      errorMessage = "No response received from the server.";
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return isEmpty(errorMessage) ? DEFAULT_MESSAGE : errorMessage;
}

export function getSuccessMessage(data: unknown): string {
  const DEFAULT_MESSAGE = "Sucess";
  const successMessage: string = data ? DEFAULT_MESSAGE : DEFAULT_MESSAGE;
  return successMessage;
}

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const ROLES_NAME = {
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
  MAKER: "maker",
  CHECKER: "checker",
  PUBLISHER: "publisher",
};

export const ROLES_IDS: { [key: string]: string } = {
  // "00000000-0000-0000-0000-000000000001": ROLES_NAME.ADMIN,
  // "00000000-0000-0000-0000-000000000026": ROLES_NAME.SUPER_ADMIN,
  "00000000-0000-0000-0000-000000000039": ROLES_NAME.MAKER,
  "00000000-0000-0000-0000-000000000040": ROLES_NAME.CHECKER,
  "00000000-0000-0000-0000-000000000041": ROLES_NAME.PUBLISHER,
};

export const visualisationComponentsList = [
  "name_draft",
  "take_hair_test",
  "complete_hair_test",
  "why_trust_traya",
  "what_causes_hair_loss",
  "lead_book_a_call",
  "why_this_plan_work_for_me",
  "hair_growth_journey",
  "your_first_month_kit",
  "chat_with_us",
  "traya_plan_includes",
  "whatgoesinsidemykit",
  "act_now_stage_1",
  "act_now_stage_2",
  "lead_category_responses",
  "understand_your_concern",
  "how_traya_works",
  "traya_heroes",
  "meet_our_team_doctors",
  "meet_our_team_of_doctors",
  "what_happen_after_order_placed",
  "user_review",
  "retake_hair_test",
  "customer_category_responses",
  "customer_book_a_call",
  "how_to_use_kit",
  "diet_plan",
  "top_section_text",
  "coach_tips",
  "stay_consistent_order_O1",
  "prescription",
  "reorder_kit",
  "reorder_kit_1",
  "reorder_kit_2",
  "reorder_kit_3",
  "reorder_kit_4",
  "build_a_habbit",
];
