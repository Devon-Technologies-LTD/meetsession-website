"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function BackButton({
  href,
  className,
  ...props
}: React.ComponentProps<"button"> & { href?: string }) {
  const router = useRouter();

  return (
    <Button
      size="pill"
      variant="secondary"
      className={cn("flex gap-2.5", className)}
      onClick={() => (href ? router.push(href) : router.back())}
      {...props}
    >
      <ChevronLeftIcon className="h-6 w-6" />
      <span className="font-semibold font-dm-sans">Back</span>
    </Button>
  );
}
