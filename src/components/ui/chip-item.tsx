import { cn } from "@/lib/utils";

type ChipItemProps = {
  children: React.ReactNode;
};
export function ChipItem({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ChipItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-white",
        "font-dm-sans text-base w-fit bg-white/10",
        "rounded-full px-6 py-3 border border-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
