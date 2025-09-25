"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "./input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PasswordField({
  id,
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <div className="w-full h-fit relative">
      <Input
        id={id}
        type={isPassword ? "password" : "text"}
        className={cn(
          "pill py-6 text-sm md:text-base placeholder:text-gray-300 focus-visible:ring-0",
          className,
        )}
        {...props}
      />

      <span
        onClick={() => setIsPassword((prev) => !prev)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        {isPassword ? (
          <EyeOffIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </span>
    </div>
  );
}
