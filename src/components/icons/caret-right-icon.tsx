import { cn } from "@/lib/utils";

export function CaretRightIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      width="5"
      height="11"
      viewBox="0 0 5 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 h-6", className)}
      {...props}
    >
      <path
        d="M5 5.45215L0 10.4521L1.19249e-07 0.452148L5 5.45215Z"
        fill="currentColor"
      />
    </svg>
  );
}
