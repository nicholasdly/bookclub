"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../shadcn/form";
import { Input } from "../shadcn/input";
import { Button } from "../shadcn/button";
import { registerFormSchema } from "@/lib/zod";
import { register } from "@/server/actions/register";
import { useState, useTransition } from "react";
import FormError from "./form-error";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: username ?? "",
      password: "",
      confirmation: "",
      email: "",
      name: "",
    },
  });

  const onSubmit = (form: z.infer<typeof registerFormSchema>) => {
    setError(undefined);

    startTransition(() => {
      toast.promise(
        register(form).then((response) => setError(response?.error)),
        {
          loading: "Creating account...",
          error: "Something went wrong! Please try again later.",
        },
      );
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-96 flex-col rounded-lg"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormControl>
                <Input placeholder="Name" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormControl>
                <Input placeholder="Username" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmation"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormControl>
                <Input
                  placeholder="Confirm password"
                  type="password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormControl>
                <Input
                  placeholder="Email address"
                  type="email"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} className="mb-2" />}
        <Button type="submit" variant="core" disabled={isPending}>
          Sign up
        </Button>
      </form>
    </Form>
  );
}
