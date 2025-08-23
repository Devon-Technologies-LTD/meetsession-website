import type { Metadata } from "next";
import "./globals.css";
import { fontsConfig } from "@/fonts"
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "MeetSession",
  description: "MeetSession helps lawyers and organizations record meetings or cross-examinations and stores them neatly in folders for instant access.",
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
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
