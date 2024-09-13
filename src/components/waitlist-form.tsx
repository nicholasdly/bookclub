"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { useState, useTransition } from "react";
import { CircleCheckIcon, TriangleAlertIcon } from "lucide-react";
import { addToWaitlist } from "@/lib/email";

export const waitlistFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().min(1, "Please enter a valid first name."),
  lastName: z.string().min(1, "Please enter a valid last name."),
});

export function WaitlistForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();

  const form = useForm<z.infer<typeof waitlistFormSchema>>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  function onSubmit(values: z.infer<typeof waitlistFormSchema>) {
    setSuccess("");
    setError("");

    startTransition(() => {
      addToWaitlist(values).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-3"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="First name"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Last name"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email address"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        {success && (
          <div className="col-span-2 flex items-center gap-2 rounded-md border border-green-500/15 bg-green-500/5 p-3 text-sm text-green-500">
            <CircleCheckIcon className="size-4" />
            <p>{success}</p>
          </div>
        )}
        {error && (
          <div className="col-span-2 flex w-full items-center gap-2 rounded-md border border-destructive/15 bg-destructive/5 p-3 text-sm text-destructive">
            <TriangleAlertIcon className="size-4" />
            <p>{error}</p>
          </div>
        )}
        <Button
          variant="core"
          className="col-span-2"
          type="submit"
          disabled={isPending}
        >
          Join the waitlist
        </Button>
      </form>
    </Form>
  );
}
