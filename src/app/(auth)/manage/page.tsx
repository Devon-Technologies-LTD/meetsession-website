import { Logo } from "@/components/icons/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section
      className={cn(
        "h-full w-full",
        "z-10 py-20 px-7 md:px-10",
        "flex flex-col gap-12",
      )}
    >
      <Link href="/" className="z-10 flex items-center gap-3 w-fit">
        <Logo className="w-12 md:w-10 h-12 md:h-10 z-20" />
        <p className="font-normal font-jersey text-2xl md:text-xl capitalize z-20">
          MeetSession
        </p>
      </Link>

      <div
        className={cn(
          "w-full h-52",
          "relative after:absolute after:-bottom-4 after:left-1/2 after:-translate-x-1/2 ",
          "after:rounded-full after:bg-neutral-700 after:blur-md",
          "after:h-2 after:w-[80%]",
        )}
      >
        <Image
          src="/illustrations/handshake.svg"
          alt="handshake"
          height={200}
          width={200}
          className="h-full w-full object-center object-cover"
        />
      </div>

      <p className="w-full text-3xl text-center max-w-96 mx-auto font-black font-dm-sans">
        What would you like to accomplish today?
      </p>

      <div className="w-full flex flex-col gap-2">
        <Link
          href="/signup"
          className={cn(buttonVariants({ size: "pill" }), "w-full h-14")}
        >
          Create a MeetSession Account
        </Link>

        <Link
          href="signin"
          className={cn(
            buttonVariants({ size: "pill", variant: "brand-green" }),
            "w-full h-14",
          )}
        >
          Manage Account
        </Link>
      </div>
    </section>
  );
}
