import { cn } from "@/lib/utils";

export function WaitlistPattern({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      width="467"
      height="858"
      viewBox="0 0 467 858"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-48", className)}
      {...props}
    >
      <g
        style={{
          mixBlendMode: "color-dodge",
        }}
        opacity="0.2"
      >
        <path
          d="M466.5 248.5L0 0V857.5H191.5L466.5 248.5Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
