import { cn } from "@/lib/utils";

export function FailIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <rect
        y="0.412109"
        width="83.1758"
        height="83.1758"
        rx="41.5879"
        fill="#EA4335"
      />
      <path
        d="M27.4629 27.6797L56.1036 56.3204"
        stroke="white"
        strokeWidth="7.47149"
        strokeLinecap="round"
      />
      <path
        d="M56.1035 27.6797L27.4628 56.3204"
        stroke="white"
        strokeWidth="7.47149"
        strokeLinecap="round"
      />
    </svg>
  );
}
