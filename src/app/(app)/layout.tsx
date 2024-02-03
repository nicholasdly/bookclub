import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { LoadingPage } from "../_components/loading";
import Header from "../_components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkLoading>
        <LoadingPage />
      </ClerkLoading>
      <ClerkLoaded>
        <Header />
        {children}
      </ClerkLoaded>
    </>
  );
}
