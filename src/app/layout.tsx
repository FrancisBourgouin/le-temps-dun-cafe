import type { Metadata } from "next";
import { Merriweather, Sometype_Mono } from "next/font/google";
import "./globals.scss";
import { videos } from "@/data/videoData";
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700", "900"] });

const sometypeMono = Sometype_Mono({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "Le temps d'un café",
  description: "View & Customize a break video, useful during lectures!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={merriweather.className}>{children}</body>
    </html>
  );
}
