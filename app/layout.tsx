import React from "react";
import type { Metadata } from "next";
import { Inter, Lexend, Poppins } from "next/font/google";
import Provider from "./provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Mechaku",
  description:
    "Discover rare and exclusive action figures that will make your collection stand out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${lexend.variable} ${poppins.variable}`}
      >
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
