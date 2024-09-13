"use client";

import { logout } from "@/server/logout";

export default function LogOutButton() {
  return (
    <button
      className="whitespace-nowrap rounded-full border bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
      onClick={() => logout()}
    >
      Sign out
    </button>
  );
}
