"use client";

import { useEffect, useState } from "react";
import { Button } from "../shadcn/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@uidotdev/usehooks";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

type UsernameAlertType = {
  type: "default" | "success" | "error";
  message: string;
};

export default function MarketingHero() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);
  const [alert, setAlert] = useState<UsernameAlertType>({
    type: "default",
    message: "Claim your username before it's too late!",
  });

  const { mutate } = api.user.checkUsername.useMutation({
    onMutate: () => {
      setAlert({
        type: "default",
        message: "Checking username... ⏳",
      });
    },
    onSuccess: (data) => {
      const type = data ? "success" : "error";
      const message = data
        ? "This username is available! ✅"
        : "This username is already taken! ❌";

      setAlert({ type, message });
    },
    onError: (error) => {
      let message = "Something went wrong! 😳";

      if (error.data?.zodError) {
        message = "You can only use letters, numbers, and underscores! 👀";
      }

      if (error.data?.code === "TOO_MANY_REQUESTS") {
        message = "Too many requests! Come back tomorrow. 😡";
      }

      setAlert({ type: "error", message });
    },
  });

  useEffect(() => {
    if (debouncedInput.length >= 4) {
      mutate({ username: debouncedInput });
    } else {
      setAlert({
        type: "default",
        message: "Claim your username before it's too late!",
      });
    }
  }, [debouncedInput, mutate]);

  return (
    <section className="flex flex-col items-center gap-10 border-b py-20 md:py-32">
      <p className="flex flex-col items-center justify-center font-instrument text-5xl md:text-8xl lg:text-9xl">
        <span className="italic">The social network</span>
        <span className="text-muted-foreground">for bookworms!</span>
      </p>
      <form className="flex flex-col items-center gap-2">
        <div className="flex w-full max-w-lg items-center justify-between rounded-full border py-3 pl-5 pr-3 ring-black/5 transition-all duration-100 focus-within:border-black focus-within:ring-4 hover:ring-4">
          <div className="flex items-center gap-2">
            <div className="flex text-2xl">
              <span>bookclub.social/</span>
              <input
                className="w-full lowercase outline-none"
                placeholder="username"
                spellCheck={false}
                maxLength={15}
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </div>
            <Button
              className="shrink-0 rounded-full"
              variant="core"
              size="icon"
              disabled={alert.type !== "success"}
              onClick={(event) => {
                event.preventDefault();
                router.push(`/auth/register?username=${input}`);
              }}
            >
              <ArrowRightIcon className="size-6" />
            </Button>
          </div>
        </div>
        <p
          className={cn(
            "text-sm text-muted-foreground",
            alert.type === "success" && "text-green-600",
            alert.type === "error" && "text-red-500",
          )}
        >
          {alert.message}
        </p>
      </form>
    </section>
  );
}
