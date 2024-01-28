import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { LoadingPage } from "../_components/loading";

export default function LoadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkLoading>
        <LoadingPage />
      </ClerkLoading>
      <ClerkLoaded>{children}</ClerkLoaded>
    </>
  );
}
