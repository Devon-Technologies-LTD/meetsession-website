import { cn } from "@/lib/utils";

export function TwitterIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      className={cn("size-6", className)}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9671 7.6797L16.8686 0H14.2346L9.73029 5.8653L5.73429 0H0L6.69086 9.819L0.402857 18H3.03771L7.92771 11.637L12.2657 18H18L10.9671 7.6797ZM8.92714 10.3347L7.68857 8.5176L2.88 1.4643H4.86L8.74114 7.1496L9.978 8.9676L15.1363 16.5357H13.1563L8.92714 10.3347Z"
        fill="currentColor"
      />
    </svg>
  );
}
