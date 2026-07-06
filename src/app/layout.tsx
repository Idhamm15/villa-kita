import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),

  title: "Villa Kita",
  description: "Liburan Menyenangkan bersama Villa Kita",

  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION,
  },

  openGraph: {
    title: "Villa Kita",
    description: "Liburan Menyenangkan bersama Villa Kita",
    url: "https://villa-kita.vercel.app",
    siteName: "Villa Kita",
    images: [
      {
        url: "https://villa-kita.vercel.app/thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Villa Kita",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_TRACKING_ID =
    process.env.GOOGLE_TAGS_MANAGER_ID || "-";

  return (
    <html
      lang="id"
      className={`${inter.variable} antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>

      {/* <GoogleAnalytics gaId={GA_TRACKING_ID} /> */}
    </html>
  );
}