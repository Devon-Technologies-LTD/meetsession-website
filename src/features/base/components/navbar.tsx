import { cn } from "@/lib/utils";
import { TNavItem } from "../lib/types";
import { Logo } from "@/components/icons/logo";
import { NavbarItems } from "./navbar-items";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <header
      className={cn(
        "w-full h-fit min-h-8 bg-white sticky top-0",
        "flex items-center justify-between",
        "px-12 py-4 z-50",
      )}
    >
      <div className="w-fit">
        {navItems.filter(item => item.type === "logo").map(item => (
          <Link href={item.link} key={item.id}>
            {item.render}
          </Link>
        ))}
      </div>

      <main>
        <NavbarItems navItems={navItems} />
      </main>

      <div className="buttons">
        {navItems.filter(item => item.type === "buttons").map(item => (
          <div className="w-fit" key={item.id}>{item.render}</div>
        ))}
      </div>
    </header>
  );
}

const navItems: TNavItem[] = [
  {
    id: 1, label: "MeetSession", render: (
      <div className="flex items-center gap-3 w-fit">
        <Logo className="w-10 h-10" />
        <p className="font-bold text-lg capitalize">MeetSession</p>
      </div>
    ), type: "logo", link: "/",
  },
  { id: 2, label: "Home", render: "Home", type: "links", link: "/", },
  { id: 3, label: "Features", render: "Features", type: "links", link: "/#features", },
  { id: 4, label: "howItWorks", render: "How it Works", type: "links", link: "/#how-it-works", },
  { id: 5, label: "Testimonials", render: "Testimonials", type: "links", link: "/#testimonials", },
  { id: 6, label: "Support", render: "Support", type: "links", link: "/#support", },
  {
    id: 7, label: "Download", render: (
      <Button
        variant="default"
        className="font-semibold"
      >
        Download App
      </Button>
    ), type: "buttons",
    link: "/#download",
  },
];
