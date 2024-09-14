import "@/styles/globals.css";
import type { Metadata } from "next";
import { Instrument_Serif, Inter, Lora } from "next/font/google";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";

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
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          lora.variable,
          instrument.variable,
          "overscroll-none font-sans antialiased",
        )}
      >
        <TRPCReactProvider>
          <SessionProvider>{children}</SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
