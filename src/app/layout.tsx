import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

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
      <SessionProvider>
        <body
          className={cn(
            inter.variable,
            "overscroll-none font-sans antialiased selection:bg-core selection:text-white",
          )}
        >
          {children}
          <Toaster theme="light" richColors />
          <Script
            async
            src="https://cloud.umami.is/script.js"
            data-website-id="6d425863-738b-440a-bcd2-f48f0db37a9b"
          />
        </body>
      </SessionProvider>
    </html>
  );
}
