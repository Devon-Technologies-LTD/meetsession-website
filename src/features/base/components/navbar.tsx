"use client";

import { cn } from "@/lib/utils";
import { TNavItem } from "../lib/types";
import { NavbarItems, NavbarItemsMobile } from "./navbar-items";
import Link from "next/link";
import { Fragment } from "react";
import { useNavItems } from "../hooks/use-nav-items";

export function Navbar() {
  const { navItems } = useNavItems();

  function renderItem(item: TNavItem) {
    return (
      <Fragment key={item.id}>
        {typeof item.render === "string" ? (
          <Link target={item.external ? "_blank" : undefined} href={item.link}>
            {item.render ? item.render : item.label}
          </Link>
        ) : (
          item.render
        )}
      </Fragment>
    );
  }

  return (
    <header
      className={cn(
        "with-noise",
        "w-full h-fit min-h-8 bg-white sticky top-0",
        "flex items-center justify-between",
        "px-7 md:px-12 py-4 z-50",
      )}
    >
      <div className="w-fit">
        {navItems
          .filter((item) => item.type === "logo")
          .map((item) => renderItem(item))}
      </div>

      <main className="hidden md:block">
        <NavbarItems navItems={navItems} />
      </main>

      <div className="buttons hidden md:block">
        {navItems
          .filter((item) => item.type === "buttons")
          .map((item) => renderItem(item))}
      </div>

      <div className="md:hidden">
        <NavbarItemsMobile navItems={navItems} />
      </div>
    </header>
  );
}
