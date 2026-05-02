import type { Metadata } from "next";
import { Playfair_Display, Poppins, Amiri } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const amiri = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Learn with Taha | Online Quran Tutor",
  description:
    "Learn Quran Online with Hafiz Taha - Personalized Tajweed & Memorization Classes for All Ages",
  keywords: [
    "Quran",
    "Online Quran Classes",
    "Tajweed",
    "Hifz",
    "Memorization",
    "Hafiz Taha",
    "Learn Quran",
  ],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${poppins.variable} ${amiri.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
