"use client";

import { useClerk } from "@clerk/nextjs";
import { Button, type ButtonProps } from "./shadcn-ui/button";
import { useRouter } from "next/navigation";

export default function SignOutButton({
  className,
  variant,
  size,
}: ButtonProps) {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      onClick={() => signOut(() => router.push("/"))}
    >
      Sign out
    </Button>
  );
}
