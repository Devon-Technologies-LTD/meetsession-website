import { TTierTheme } from "./types";

export function generateTierColor(theme?: TTierTheme) {
  switch (theme) {
    case "black":
      return "bg-brand-black-dark";
    case "blue":
      return "bg-brand-blue";
    case "green":
      return "bg-brand-green";
    case "midnight-blue":
      return "bg-brand-blue-midnight";
    default:
      return "bg-brand-black-dark";
  }
}
