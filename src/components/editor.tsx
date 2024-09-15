"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageIcon, SmileIcon, VoteIcon } from "lucide-react";
import { Session } from "next-auth";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export default function Editor({ user }: { user: Session["user"] }) {
  const [input, setInput] = useState("");
  const utils = api.useUtils();

  const { mutate, isPending } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      toast.success("Successfully created post!");
      utils.post.getAll.invalidate();
    },
    onError: () => {
      toast.error("Something went wrong! Please try again later.");
    },
  });

  // Automatically resizes text area input
  useEffect(() => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [input]);

  return (
    <form
      className="flex gap-3 border-b px-4 pb-3 pt-3"
      onSubmit={(event) => {
        event.preventDefault();
        mutate({ content: input });
      }}
    >
      <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
        <Image
          src={user.image}
          alt={`Profile picture of ${user.username}`}
          fill
        />
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex gap-2">
          <textarea
            id="editor"
            className="min-h-[50px] w-full resize-none rounded-3xl border px-4 py-3 outline-none"
            placeholder="How's the book?"
            disabled={isPending}
            rows={1}
            maxLength={280}
            spellCheck
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="relative flex size-8 items-center justify-center overflow-hidden rounded-full border transition-colors hover:bg-muted"
              type="button"
            >
              <ImageIcon className="size-4" />
            </button>
            <button
              className="relative flex size-8 items-center justify-center overflow-hidden rounded-full border transition-colors hover:bg-muted"
              type="button"
            >
              <VoteIcon className="size-4" />
            </button>
            <button
              className="relative flex size-8 items-center justify-center overflow-hidden rounded-full border transition-colors hover:bg-muted"
              type="button"
            >
              <SmileIcon className="size-4" />
            </button>
          </div>
          <button
            className="self-end rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
            type="submit"
            disabled={isPending}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
