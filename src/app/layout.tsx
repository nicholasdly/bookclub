import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bookclub - The social platform for bookworms.",
  description:
    "Bookclub is your place to discuss, track, and review books with the internet. Join the club for free today.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.variable, "overscroll-none font-sans antialiased")}
      >
        {children}
        <Toaster theme="light" richColors />
      </body>
    </html>
  );
}
