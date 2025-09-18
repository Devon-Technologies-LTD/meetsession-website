import { cn } from "@/lib/utils";

export function BasicPlanIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 h-6", className)}
      {...props}
    >
      <path
        d="M0.603136 17.3961C2.83013 19.6231 5.85058 20.8742 9.00003 20.8742C12.1495 20.8742 15.1699 19.6231 17.3969 17.3961C19.6239 15.1691 20.875 12.1486 20.875 8.99919C20.875 5.84974 19.6239 2.82929 17.3969 0.602291L9.00003 8.99918L0.603136 17.3961Z"
        fill="currentColor"
      />
    </svg>
  );
}
