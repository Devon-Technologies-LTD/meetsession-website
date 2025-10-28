"use client";

import { cn } from "@/lib/utils";
import { TNavItem } from "../lib/types";
import { AnimatePresence, motion as m, Variants } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";

type NavbarItemsProps = {
  navItems: TNavItem[];
};
export function NavbarItems({ navItems }: NavbarItemsProps) {
  const [selectedId, setSelectedId] = useState<number | undefined>(
    navItems.filter((item) => item.type === "links")[0].id,
  );

  return (
    <ul className={cn("w-full h-full", "flex items-center gap-1")}>
      {navItems
        .filter((item) => item.type === "links")
        .map((item) => {
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
                    style={{ borderRadius: "8px" }}
                    className={cn(
                      "rounded-xl",
                      "absolute inset-0",
                      "bg-brand-green-dark",
                    )}
                    transition={{ duration: 0.3 }}
                  ></m.div>
                )}
                <span
                  className={cn("relative z-10 mix-blend-exclusion", {
                    "text-white mix-blend-color-dodge": item.id === selectedId,
                  })}
                >
                  {item.render}
                </span>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}

export function NavbarItemsMobile({ navItems }: NavbarItemsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const overlayVariant: Variants = {
    open: { opacity: 1, transition: { duration: 0.1 } },
    close: { opacity: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };
  const navbarVariant: Variants = {
    open: { x: "0%", transition: { duration: 0.3, type: "tween" } },
    close: { x: "100%", transition: { duration: 0.2, type: "tween" } },
    exit: { x: "100%", transition: { duration: 0.2, type: "tween" } },
  };

  return (
    <>
      <Button
        className="toggle"
        variant="outline"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MenuIcon />
      </Button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <m.div
              variants={overlayVariant}
              initial="close"
              animate="open"
              exit="exit"
              className={cn(
                "h-full w-full bg-brand-black-light/50",
                "fixed top-0 left-0 right-0 bottom-0",
                "overscroll-contain backdrop-blur-xs",
                "flex justify-end",
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <m.ul
                className={cn(
                  // "absolute right-0",
                  "min-h-fit h-full w-2/3 bg-white",
                  "flex flex-col items-start gap-2",
                )}
                variants={navbarVariant}
                initial="close"
                animate="open"
                exit="exit"
                layoutId="nav"
              >
                {navItems
                  .filter(
                    (item) => item.type === "links" || item.type === "buttons",
                  )
                  .map((item) => {
                    return (
                      <li
                        key={item.id}
                        className={cn(
                          "px-4 py-2",
                          "text-black text-sm font-medium",
                          "cursor-pointer relative rounded-xl",
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link href={item.link}>
                          <div className={cn("relative z-10")}>
                            {item.render ? item.render : item.label}
                          </div>
                        </Link>
                      </li>
                    );
                  })}

                <Button
                  className="absolute top-4 right-4"
                  variant="outline"
                  size="icon"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <XIcon />
                </Button>
              </m.ul>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
