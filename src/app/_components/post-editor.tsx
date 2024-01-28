"use client";

import { api } from "~/trpc/react";
import { Avatar, AvatarImage } from "./shadcn-ui/avatar";
import { Button } from "./shadcn-ui/button";
import { Separator } from "./shadcn-ui/separator";
import { useState, type ChangeEvent } from "react";
import { useToast } from "./shadcn-ui/use-toast";
import { useRouter } from "next/navigation";

interface Properties {
  avatar: string;
  username: string;
}

export default function PostEditor(props: Properties) {
  const router = useRouter();
  const { toast } = useToast();
  const [input, setInput] = useState("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const element = event.target;

    // Automatically resizes textarea height to fit text
    element.style.height = "0px";
    element.style.height = element.scrollHeight + "px";

    setInput(element.value);
  };

  const createPost = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      router.refresh();
    },
    onError: (error) => {
      const content = error.data?.zodError?.fieldErrors.content;
      const description = content?.[0]
        ? content[0]
        : "Failed to create post, please try again later.";
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description,
      });
    },
  });

  return (
    <div className="rounded-md border border-stone-400 bg-stone-100">
      <div className="m-4 flex gap-3">
        <Avatar className="h-12 w-auto">
          <AvatarImage src={props.avatar} alt={`${props.username}'s avatar`} />
        </Avatar>
        <div className="flex w-full flex-col gap-1">
          <textarea
            className="resize-none rounded-md bg-stone-200 px-4 py-3 text-lg"
            value={input}
            onChange={onChange}
            placeholder="How's the book?"
            spellCheck
            rows={1}
          />
          <Separator className="my-2 bg-stone-400" />
          <div className="flex items-center justify-end gap-4">
            <span
              className={`text-sm ${input.trim().length > 280 ? "text-red-500" : ""}`}
            >
              {input.trim().length}/280
            </span>
            <Button
              className="rounded-full text-base"
              onClick={() => createPost.mutate({ content: input })}
              disabled={input.trim().length < 1 || input.trim().length > 280}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
