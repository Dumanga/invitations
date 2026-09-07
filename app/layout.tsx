import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Playfair_Display,
} from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
