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
        "flex items-center gap-1 md:gap-2 text-white",
        "rounded-full px-3 md:px-6 py-1.5 md:py-3 border border-border",
        "font-dm-sans text-sm md:text-base w-fit bg-white/10 tracking-tighter",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
