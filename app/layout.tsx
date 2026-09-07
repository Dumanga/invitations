import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Playfair_Display,
} from "next/font/google";
import { wedding } from "@/lib/config";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Naduni & Sisira | Wedding Invitation",
  description:
    "You are invited to the wedding of Naduni & Sisira — Friday, 13th November 2026 at Hotel Divine Light, Monaragala, Sri Lanka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body className="antialiased">
        {/* Preload everything the cover and main screen need (React hoists these into <head>) */}
        <link rel="preload" href={wedding.assets.backdrop} as="image" />
        <link rel="preload" href={wedding.assets.mandala} as="image" />
        <link rel="preload" href={wedding.assets.peraharaLeft} as="image" />
        <link rel="preload" href={wedding.assets.peraharaRight} as="image" />
        <link rel="preload" href={wedding.assets.heroCouple} as="image" />
        <link rel="preload" href={wedding.assets.loveStory} as="image" />
        <link
          rel="preload"
          href={wedding.assets.introVideo}
          as="video"
          type="video/mp4"
        />
        <link
          rel="preload"
          href={wedding.assets.music}
          as="audio"
          type="audio/mpeg"
        />
        {children}
      </body>
    </html>
  );
}
