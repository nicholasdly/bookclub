import "@/styles/globals.css";
import type { Metadata } from "next";
import { Instrument_Serif, Inter, Lora } from "next/font/google";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/shadcn/sonner";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lora",
});

const instrument = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Bookclub - The social network for bookworms.",
  description:
    "Your place to talk about books with the internet. Keep track of the books you've read, interact with other readers, and build your bookworm community—all in one place.",
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
        <TRPCReactProvider>
          <body
            className={cn(
              inter.variable,
              lora.variable,
              instrument.variable,
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
        </TRPCReactProvider>
      </SessionProvider>
    </html>
  );
}
