import { WaitlistPattern } from "@/components/icons/waitlist-pattern";
import { cn } from "@/lib/utils";

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-full h-[calc(100dvh-70px)] overflow-hidden">
      {/* blur effect */}
      <>
        <div
          className={cn(
            "hidden md:block absolute -top-62 -left-62",
            "bg-brand-green/50 z-0",
            "w-162 h-228 rounded-full blur-3xl",
          )}
        />
        <div
          className={cn(
            "absolute -top-62 -right-62",
            "bg-brand-green/50 z-0",
            "w-162 h-228 rounded-full blur-3xl",
          )}
        />
      </>

      {/* grid effect */}
      <>
        {/* top grids */}
        <>
          <div
            className={cn(
              "bg-[size:24px_24px] opacity-25",
              "absolute bottom-0 left-0 right-0 top-0 z-0",
              "[mask-image:radial-gradient(ellipse_10%_50%_at_10%_10%,#000_40%,transparent_110%)]",
              "bg-[linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px)]",
            )}
          ></div>
          <div
            className={cn(
              "bg-[size:24px_24px] opacity-25",
              "absolute bottom-0 left-0 right-0 top-0 z-0",
              "[mask-image:radial-gradient(ellipse_20%_20%_at_10%_10%,#000_40%,transparent_110%)]",
              "bg-[linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px)]",
            )}
          ></div>
          <div
            className={cn(
              "bg-[size:24px_24px] opacity-25",
              "absolute bottom-0 left-0 right-0 top-0 z-0",
              "[mask-image:radial-gradient(ellipse_10%_50%_at_90%_10%,#000_40%,transparent_110%)]",
              "bg-[linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px)]",
            )}
          ></div>
          <div
            className={cn(
              "bg-[size:24px_24px] opacity-25",
              "absolute bottom-0 left-0 right-0 top-0 z-0",
              "[mask-image:radial-gradient(ellipse_20%_20%_at_90%_10%,#000_40%,transparent_110%)]",
              "bg-[linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px)]",
            )}
          ></div>
        </>

        {/* bottom grids */}
        <>
          <div
            className={cn(
              "bg-[size:24px_24px] opacity-25",
              "absolute bottom-0 left-0 right-0 top-0 z-0",
              "[mask-image:radial-gradient(ellipse_10%_50%_at_10%_90%,#000_40%,transparent_110%)]",
              "bg-[linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px)]",
            )}
          ></div>
          <div
            className={cn(
              "bg-[size:24px_24px] opacity-25",
              "absolute bottom-0 left-0 right-0 top-0 z-0",
              "[mask-image:radial-gradient(ellipse_20%_20%_at_10%_90%,#000_40%,transparent_110%)]",
              "bg-[linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px)]",
            )}
          ></div>
          <div
            className={cn(
              "bg-[size:24px_24px] opacity-25",
              "absolute bottom-0 left-0 right-0 top-0 z-0",
              "[mask-image:radial-gradient(ellipse_10%_50%_at_90%_90%,#000_40%,transparent_110%)]",
              "bg-[linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_right,var(--brand-green-color-default)_1px,transparent_1px)]",
            )}
          ></div>
          <div
            className={cn(
              "bg-[size:24px_24px] opacity-25",
              "absolute bottom-0 left-0 right-0 top-0 z-0",
              "[mask-image:radial-gradient(ellipse_20%_20%_at_90%_90%,#000_40%,transparent_110%)]",
              "bg-[linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-green-color-default)_1px,transparent_1px)]",
            )}
          ></div>
        </>
      </>

      {/* pattern */}
      <>
        <WaitlistPattern className="hidden md:block w-96 rotate-180 absolute right-0 -top-128 text-brand-green" />
        <WaitlistPattern className="hidden md:block w-96 rotate-180 absolute right-12 -top-128 text-brand-green/40" />
        <WaitlistPattern className="hidden md:block w-96 rotate-180 absolute right-24 -top-128 text-brand-green/20" />

        <WaitlistPattern className="hidden md:block w-96 rotate-180 absolute -scale-x-100 left-0 -top-128 text-brand-green" />
        <WaitlistPattern className="hidden md:block w-96 rotate-180 absolute -scale-x-100 left-12 -top-128 text-brand-green/40" />
        <WaitlistPattern className="hidden md:block w-96 rotate-180 absolute -scale-x-100 left-24 -top-128 text-brand-green/20" />

        <WaitlistPattern className="hidden md:block w-96 absolute left-0 -bottom-96 text-brand-green" />
        <WaitlistPattern className="hidden md:block w-96 absolute left-12 -bottom-96 text-brand-green/40" />
        <WaitlistPattern className="hidden md:block w-96 absolute left-24 -bottom-96 text-brand-green/20" />

        <WaitlistPattern className="hidden md:block w-96 absolute -scale-x-100 right-0 -bottom-96 text-brand-green/20" />
        <WaitlistPattern className="hidden md:block w-96 absolute -scale-x-100 right-12 -bottom-96 text-brand-green/30" />
        <WaitlistPattern className="hidden md:block w-96 absolute -scale-x-100 right-24 -bottom-96 text-brand-green/40" />
      </>

      <div className="z-10 h-full w-full">{children}</div>
    </section>
  );
}
