import {
  Inter,
  Geist,
  Geist_Mono,
  DM_Sans,
  Quicksand,
  Poppins,
  Raleway,
  Montserrat,
  Jersey_25,
} from "next/font/google";
import localFont from 'next/font/local'
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const calcioDemo = localFont({
  src: "./calcio-demo-400.ttf",
  variable: "--font-calcio-demo",
})
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const jersey25 = Jersey_25({
  variable: "--font-jersey-25",
  subsets: ["latin"],
  weight: ["400"],
});

export const fontsConfig = cn(
  geistSans.variable,
  geistMono.variable,

  dmSans.variable,
  quicksand.variable,
  poppins.variable,
  raleway.variable,
  calcioDemo.variable,

  montserrat.variable,
  jersey25.variable,
  inter.variable,
);
