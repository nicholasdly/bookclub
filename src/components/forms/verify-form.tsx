"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import verifyFormSchema from "@/lib/zod/verify-form-schema";
import { verify } from "@/server/actions/verify";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem } from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

export default function ConfirmForm({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof verifyFormSchema>>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      email,
      token: "",
    },
  });

  const onSubmit = (form: z.infer<typeof verifyFormSchema>) => {
    startTransition(() => {
      const id = toast.loading("Verifiying account...");

      verify(form)
        .then((response) => {
          if (response?.error) {
            toast.error(response.error, { id });
          } else {
            toast.success("Successfully created account!", { id });
          }
        })
        .catch(() => toast.error("Something went wrong!", { id }));
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-80 flex-col items-center rounded-lg"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormControl className="w-fit">
                <InputOTP
                  maxLength={6}
                  disabled={isPending}
                  autoFocus
                  onComplete={form.handleSubmit(onSubmit)}
                  {...field}
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      className="h-12 font-medium sm:h-16 sm:w-12 sm:text-xl"
                      index={0}
                    />
                    <InputOTPSlot
                      className="h-12 font-medium sm:h-16 sm:w-12 sm:text-xl"
                      index={1}
                    />
                    <InputOTPSlot
                      className="h-12 font-medium sm:h-16 sm:w-12 sm:text-xl"
                      index={2}
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot
                      className="h-12 font-medium sm:h-16 sm:w-12 sm:text-xl"
                      index={3}
                    />
                    <InputOTPSlot
                      className="h-12 font-medium sm:h-16 sm:w-12 sm:text-xl"
                      index={4}
                    />
                    <InputOTPSlot
                      className="h-12 font-medium sm:h-16 sm:w-12 sm:text-xl"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
