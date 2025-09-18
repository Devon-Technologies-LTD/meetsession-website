import { JSX } from "react";

export type TTierTheme = "black" | "blue" | "green" | "midnight-blue";
export type TTier = {
  id: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  link: string;
  isDefault?: boolean;
  isRecommended?: boolean;
  themeColor: TTierTheme;
  icon: React.ReactNode | JSX.Element;
};
