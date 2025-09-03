import type { Metadata } from "next";
import "./globals.css";
import { fontsConfig } from "@/fonts";
import { Toaster } from "@/components/ui/sonner";
import { NoiseFilterSVG } from "@/components/noise-filter-svg";

export const metadata: Metadata = {
  title: "MeetSession",
  description:
    "MeetSession helps lawyers and organizations record meetings or cross-examinations and stores them neatly in folders for instant access.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontsConfig} font-quicksand antialiased min-h-fit h-dvh w-full`}
      >
        <NoiseFilterSVG />
        {children}
        <Toaster richColors position="top-right" />

        {/* Global noise filter */}
        <svg className="hidden">
          <defs>
            <filter
              id="grainyNoise"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              filterUnits="objectBoundingBox"
            >
              <feTurbulence
                // type="fractalNoise"
                type="turbulence"
                baseFrequency="0.8"
                numOctaves="3"
                result="noise"
              />
              <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
