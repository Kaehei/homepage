import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/sonner"

import { Silkscreen } from "next/font/google";

const geist = localFont({
  src: [
    {
      path: "../../public/fonts/Geist[wght].woff2",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: [
    {
      path: "../../public/fonts/GeistMono[wght].woff2",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

const silkscreen = Silkscreen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "Yang's Space",
  description: "Yang's Space",
  keywords: ["Next.js", "React", "TypeScript", "个人主页", "博客"],
  authors: [{ name: "yang" }],
  openGraph: {
    title: "Yang's Space",
    description: "Yang's Space",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} ${silkscreen.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          {children}
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
