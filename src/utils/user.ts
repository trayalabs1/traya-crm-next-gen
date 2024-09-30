import { User } from "user";
import _ from "lodash";
export const SAMPLE_USERS: User[] = [
  {
    user_id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Maker",
    email: "maker@traya.health",
    role: "maker",
  },
  {
    user_id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Checker",
    email: "checker@traya.health",
    role: "checker",
  },
  {
    user_id: "550e8400-e29b-41d4-a716-446655440002",
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
