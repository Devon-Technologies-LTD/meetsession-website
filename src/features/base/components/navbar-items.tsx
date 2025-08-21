"use client";

import { cn } from "@/lib/utils";
import { TNavItem } from "../lib/types";
import { motion as m } from "motion/react";
import { useState } from "react";
import Link from "next/link";

type NavbarItemsProps = {
  navItems: TNavItem[];
};
export function NavbarItems({ navItems }: NavbarItemsProps) {
  const [selectedId, setSelectedId] = useState<number | undefined>(navItems[0].id);

  return (
    <ul className={cn(
      "w-full h-full",
      "flex items-center gap-1",
    )}>
      {navItems.filter(item => item.type === "links").map(item => {
        return (
          <li
            key={item.id}
            className="cursor-pointer relative rounded-xl text-white text-sm font-medium px-4 py-2"
            onClick={() => setSelectedId(item.id)}
          >
            <Link href={item.link}>
              {item.id === selectedId && (
                <m.div
                  layoutId="active-item"
                  style={{ borderRadius: "8px", }}
                  className={cn(
                    "rounded-xl",
                    "absolute inset-0",
                    "bg-brand-green-dark",
                  )}
                  transition={{ duration: 0.3 }}
                ></m.div>
              )}
              <span
                className={cn(
                  "relative z-10 mix-blend-exclusion",
                  { "text-white mix-blend-color-dodge": item.id === selectedId }
                )}
              >{item.render}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  );
}
