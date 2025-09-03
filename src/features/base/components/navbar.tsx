import { cn } from "@/lib/utils";
import { TNavItem } from "../lib/types";
import { Logo } from "@/components/icons/logo";
import { NavbarItems, NavbarItemsMobile } from "./navbar-items";
import {
  // Button,
  buttonVariants,
} from "@/components/ui/button";
import Link from "next/link";
import { Fragment } from "react";

export function Navbar() {
  function renderItem(item: TNavItem) {
    return (
      <Fragment key={item.id}>
        {typeof item.render === "string" ? (
          <Link href={item.link}>{item.render}</Link>
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

const navItems: TNavItem[] = [
  {
    id: 1,
    label: "MeetSession",
    render: (
      <Link href="/" className="flex items-center gap-3 w-fit">
        <Logo className="w-8 md:w-10 h-8 md:h-10" />
        <p className="font-bold font-jersey text-lg md:text-xl capitalize">
          MeetSession
        </p>
      </Link>
    ),
    type: "logo",
    link: "/",
  },
  { id: 2, label: "Home", render: "Home", type: "links", link: "/" },
  {
    id: 3,
    label: "Features",
    render: "Features",
    type: "links",
    link: "/#features",
  },
  {
    id: 4,
    label: "howItWorks",
    render: "How it Works",
    type: "links",
    link: "/#how-it-works",
  },
  {
    id: 5,
    label: "Testimonials",
    render: "Testimonials",
    type: "links",
    link: "/#testimonials",
  },
  {
    id: 6,
    label: "Support",
    render: "Support",
    type: "links",
    link: "/#support",
  },
  {
    id: 7,
    label: "Join Waitlist",
    render: (
      <Link
        href="/waitlist"
        className={cn(buttonVariants({ variant: "default" }))}
      >
        Join Waitlist
      </Link>
    ),
    type: "buttons",
    link: "/waitlist",
  },
];
/*
      <Button
        variant="default"
        className="font-semibold"
      >
        Download App
      </Button>
      */
