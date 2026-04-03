import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Villanueva | Hidden Beauty Awaits",
  description:
    "Discover Villanueva's waterfalls, heritage landmarks, mountain villages, and culinary treasures through a cinematic tourism journey.",
  keywords: [
    "Villanueva tourism",
    "travel destination",
    "local culture",
    "nature attractions",
    "food trip",
  ],
  openGraph: {
    title: "Visit Villanueva - Hidden Beauty Awaits",
    description:
      "Explore natural wonders, local culture, and unforgettable flavors in Villanueva.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0e11] text-zinc-100">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
