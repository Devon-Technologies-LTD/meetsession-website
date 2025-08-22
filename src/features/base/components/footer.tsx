import { LogoDynamic } from "@/components/icons/logo-dynamic";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-white w-full flex items-start gap-32 bg-brand-blue p-20">
      <div className="h-full flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <LogoDynamic className="h-8 w-8" />
          <span className="font-semibold text-sm">MeetSession</span>
        </div>

        <p className="text-sm font-semibold font-inter">Copyright 2025 Devon Technologies LTD. All rights reserved.</p>

        <div className="h-6 w-auto">
          socials
        </div>
      </div>

      <div className="h-full flex flex-col gap-4 font-montserrat">
        <p className="font-semibold text-base">Company</p>
        <ul className="flex flex-col gap-2">
          <li>About Us</li>
          <li>FAQs</li>
          <li>Book a demo</li>
        </ul>
      </div>

      <div className="h-full flex flex-col gap-4 font-montserrat">
        <p className="font-semibold text-base">Legal</p>
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="#">Term and conditions</Link>
          </li>
          <li>
            <Link href="/policy">Privacy policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
