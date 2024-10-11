import _ from "lodash";

export const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);

  const initials = _.join(
    _.map(words, (word) => _.toUpper(word.charAt(0))),
    "",
  );

  return initials;
};
