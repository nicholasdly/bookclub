"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageIcon, SmileIcon, VoteIcon } from "lucide-react";
import { Session } from "next-auth";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "./shadcn/button";

export default function Editor({ user }: { user: Session["user"] }) {
  const [input, setInput] = useState("");
  const utils = api.useUtils();

  const { mutate, isPending } = api.post.create.useMutation({
    onMutate: () => {
      const loadingToast = toast.loading("Creating post...");
      return { loadingToast };
    },
    onSuccess: (data, variables, context) => {
      setInput("");
      utils.invalidate();
      toast.dismiss(context.loadingToast);
      toast.success("Successfully created post!");
    },
    onError: (error, variables, context) => {
      toast.dismiss(context?.loadingToast);
      toast.error(
        error.data?.code === "TOO_MANY_REQUESTS"
          ? "You've reached your daily post creation limit! Come back tomorrow."
          : "Failed to create post! Please try again later.",
      );
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
      className="flex gap-3 border-y px-4 pb-3 pt-3"
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
          <Button
            className="self-end"
            type="submit"
            size="rounded"
            disabled={input.trim().length === 0 || isPending}
          >
            Post
          </Button>
        </div>
      </div>
    </form>
  );
}
