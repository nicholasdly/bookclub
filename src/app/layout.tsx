import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "./_components/shadcn-ui/toaster";
import { env } from "~/env";
import { TooltipProvider } from "./_components/shadcn-ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Bookclub - The social platform for bookworms.",
  description:
    "Your place to read, review, and talk about books with the internet. Keep track of the books you've read, interact with other readers, and build your bookworm community—all in one place.",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        afterSignInUrl="/home"
        afterSignUpUrl="/home"
      >
        <body className={`font-sans ${inter.variable}`}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </TRPCReactProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
