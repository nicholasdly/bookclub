"use client";

import { logout } from "@/server/actions/logout";
import { toast } from "sonner";
import { Button } from "../shadcn/button";

export default function LogOutButton() {
  return (
    <Button
      variant="outline"
      size="rounded"
      onClick={() =>
        toast.promise(logout(), {
          loading: "Signing out...",
          error: "Something went wrong! Please try again later.",
        })
      }
    >
      Sign out
    </Button>
  );
}
