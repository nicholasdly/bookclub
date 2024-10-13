"use client";

import { Button } from "@/components/ui/button";
import resendVerificationCode from "@/server/actions/resend-verification-code";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function ResendButton({ userId }: { userId: string }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!timeLeft) return;

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const onClick = () => {
    startTransition(() => {
      toast.promise(resendVerificationCode({ userId }), {
        loading: "Sending verification code...",
        success: "Verification code sent! Check your email.",
        error: (error) => error.message ?? "Something went wrong!",
      });

      setTimeLeft(30);
    });
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-0.5 sm:flex-row sm:gap-1.5">
      <span className="text-nowrap text-sm text-muted-foreground">
        Didn&apos;t receive a verification code?
      </span>
      <Button
        variant="link"
        className="m-0 h-fit p-0"
        onClick={onClick}
        disabled={isPending || timeLeft > 0}
      >
        Resend email {timeLeft > 0 && `(${timeLeft}s)`}
      </Button>
    </div>
  );
}
