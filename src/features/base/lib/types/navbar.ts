export type TNavItemType = "logo" | "links" | "buttons";
export type TNavItem = {
  id: number;
  label: string;
  type: TNavItemType;
  link: string;
  external?: boolean;
  render?: React.ReactNode;
};
