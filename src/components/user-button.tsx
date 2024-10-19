"use client";

import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

import { logout } from "@/server/actions/logout";
import { User } from "@supabase/supabase-js";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserButton({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      const id = toast.loading("Logging out...");

      logout().then((response) => {
        if (response?.error) {
          toast.error(response.error, { id });
        } else {
          toast.dismiss(id);
        }
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative size-8 overflow-hidden rounded-full ring-primary hover:ring-1"
        >
          <Image
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.username}
            fill
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.user_metadata.display_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isPending} onClick={onClick}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
