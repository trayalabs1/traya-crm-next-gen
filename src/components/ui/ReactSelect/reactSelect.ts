import { StylesConfig } from "react-select";

type OptionType = { label: string; value: string };

export const reactSelectStyles: StylesConfig<OptionType, true> = {
  control: (styles, { isDisabled }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? "hsl(var(--muted))"
      : "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
    "&:hover": {
      borderColor: isDisabled
        ? "hsl(var(--border))"
        : "hsl(var(--border-hover))",
    },
    boxShadow: "none",
    opacity: isDisabled ? 0.5 : 1,
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "hsl(var(--background))",
    borderColor: "hsl(var(--border))",
  }),
  option: (styles, { isFocused, isSelected, isDisabled }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "hsl(var(--primary))"
      : isFocused
        ? "hsl(var(--accent))"
        : "hsl(var(--background))",
    color: isSelected
      ? "hsl(var(--primary-foreground))"
      : "hsl(var(--foreground))",
    cursor: isDisabled ? "not-allowed" : "default",
    opacity: isDisabled ? 0.5 : 1,
    ":active": {
      backgroundColor: isDisabled
        ? "hsl(var(--background))"
        : "hsl(var(--accent))",
    },
  }),
  multiValue: (styles, { isDisabled }) => ({
    ...styles,
    backgroundColor: isDisabled ? "hsl(var(--muted))" : "hsl(var(--accent))",
  }),
  multiValueLabel: (styles, { isDisabled }) => ({
    ...styles,
    color: isDisabled
      ? "hsl(var(--muted-foreground))"
      : "hsl(var(--accent-foreground))",
  }),
  multiValueRemove: (styles, { isDisabled }) => ({
    ...styles,
    color: isDisabled
      ? "hsl(var(--muted-foreground))"
      : "hsl(var(--accent-foreground))",
    ":hover": {
      backgroundColor: isDisabled
        ? "hsl(var(--muted))"
        : "hsl(var(--destructive))",
      color: isDisabled
        ? "hsl(var(--muted-foreground))"
        : "hsl(var(--destructive-foreground))",
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
