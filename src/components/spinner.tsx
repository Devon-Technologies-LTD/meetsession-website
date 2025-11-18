import { Loader2Icon } from "lucide-react";

export function Spinner() {
  return (
    <span className="absolute top-0 left-0 pointer-events-none bg-inherit h-full w-full flex items-center justify-center">
      <Loader2Icon className="animate-spin h-5 w-5" />
    </span>
  );
}
