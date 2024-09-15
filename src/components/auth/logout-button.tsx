"use client";

import { logout } from "@/server/actions/logout";
import { toast } from "sonner";

export default function LogOutButton() {
  return (
    <button
      className="whitespace-nowrap rounded-full border bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
      onClick={() =>
        toast.promise(logout(), {
          loading: "Signing out...",
          error: "Something went wrong! Please try again later.",
        })
      }
    >
      Sign out
    </button>
  );
}
