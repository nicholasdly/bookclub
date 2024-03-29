"use client";

import { api } from "~/trpc/react";
import { Avatar, AvatarImage } from "../shadcn-ui/avatar";
import { Button } from "../shadcn-ui/button";
import { Separator } from "../shadcn-ui/separator";
import { useState, useEffect } from "react";
import { useToast } from "../shadcn-ui/use-toast";
import { LoadingSpinner } from "../loading";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface ReplyEditorProps {
  postId: string;
}

export default function ReplyEditor({ postId }: ReplyEditorProps) {
  const [input, setInput] = useState("");

  const utils = api.useUtils();
  const { toast } = useToast();
  const { user } = useUser();

  const { mutate: createReply, isLoading } = api.posts.reply.useMutation({
    onSuccess: () => {
      setInput("");
      void utils.invalidate();
    },
    onError: (error) => {
      let message: string;

      if (error.data?.code === "TOO_MANY_REQUESTS") {
        message = error.message;
      } else {
        const zodMessage = error.data?.zodError?.fieldErrors.content?.[0];
        message =
          zodMessage ?? "Failed to create post, please try again later.";
      }

      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: message,
      });
    },
  });

  // Automatically resizes text area input
  useEffect(() => {
    const textarea = document.getElementById(
      "reply-editor",
    ) as HTMLTextAreaElement;
    textarea.style.height = "0px";
    textarea.style.height = textarea.scrollHeight + "px";
  }, [input]);

  return (
    <div className="rounded-md border border-stone-400 bg-stone-100">
      <div className="m-4 flex gap-3">
        <Link href={`/${user?.username}`} className="h-fit rounded-full">
          <Avatar className="h-12 w-12 hover:outline">
            <AvatarImage
              src={user?.imageUrl}
              alt={`${user?.username}'s avatar`}
            />
          </Avatar>
        </Link>
        <div className="flex w-full flex-col gap-1">
          <textarea
            className="resize-none rounded-md bg-stone-200 px-4 py-3 text-lg"
            id="reply-editor"
            value={input}
            placeholder="Post your reply"
            spellCheck
            rows={1}
            disabled={isLoading}
            onChange={(event) => setInput(event.target.value)}
          />
          <Separator className="my-2 bg-stone-400" />
          <div className="flex items-center justify-end gap-4">
            <span
              className={`text-sm ${input.trim().length > 280 ? "text-red-500" : ""}`}
            >
              {input.trim().length}/280
            </span>
            <Button
              className="w-20 rounded-full text-base"
              onClick={() => createReply({ content: input, parentId: postId })}
              disabled={
                isLoading ||
                input.trim().length < 1 ||
                input.trim().length > 280
              }
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size={4} />
                </div>
              ) : (
                "Reply"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
