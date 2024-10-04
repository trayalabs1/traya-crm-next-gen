import { User } from "user";
import _ from "lodash";
export const SAMPLE_USERS: User[] = [
  {
    user_id: "cd8d5dbc-e09a-4370-a3d7-206d1c0409bf",
    name: "Maker",
    email: "maker@traya.health",
    role: "maker",
  },
  {
    user_id: "cd8d5dbc-e09a-4370-a3d7-206d1c0409bf",
    name: "Checker",
    email: "checker@traya.health",
    role: "checker",
  },
  {
    user_id: "cd8d5dbc-e09a-4370-a3d7-206d1c0409bf",
    name: "Publisher",
    email: "publisher@traya.health",
    role: "publisher",
  },
];

export const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);

  const initials = _.join(
    _.map(words, (word) => _.toUpper(word.charAt(0))),
    "",
  );

  return initials;
};

export const ROLES = {
  maker: "maker",
  checker: "checker",
  publisher: "publisher",
};
