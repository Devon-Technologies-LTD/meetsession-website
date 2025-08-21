export type TNavItemType = "logo" | "links" | "buttons";
export type TNavItem = {
  id: number;
  label: string;
  render: React.ReactNode;
  type: TNavItemType;
  link: string;
};
