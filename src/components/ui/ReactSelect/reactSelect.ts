import { StylesConfig } from "react-select";

type OptionType = { label: string; value: string };

export const reactSelectStyles: StylesConfig<OptionType, true> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
    "&:hover": {
      borderColor: "hsl(var(--border-hover))",
    },
    boxShadow: "none",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "hsl(var(--primary))"
      : isFocused
        ? "hsl(var(--accent))"
        : "hsl(var(--background))",
    color: isSelected
      ? "hsl(var(--primary-foreground))"
      : "hsl(var(--foreground))",
    ":active": {
      backgroundColor: "hsl(var(--accent))",
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--accent))",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "hsl(var(--accent-foreground))",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "hsl(var(--accent-foreground))",
    ":hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
};

export const reactSelectSingleStyles: StylesConfig<OptionType, false> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
    "&:hover": {
      borderColor: "hsl(var(--border-hover))",
    },
    boxShadow: "none",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "hsl(var(--primary))"
      : isFocused
        ? "hsl(var(--accent))"
        : "hsl(var(--background))",
    color: isSelected
      ? "hsl(var(--primary-foreground))"
      : "hsl(var(--foreground))",
    ":active": {
      backgroundColor: "hsl(var(--accent))",
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--accent))",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "hsl(var(--accent-foreground))",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "hsl(var(--accent-foreground))",
    ":hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
};
