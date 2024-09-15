"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/form";
import { Input } from "../shadcn/input";
import { Button } from "../shadcn/button";
import { loginFormSchema } from "@/lib/zod";
import { login } from "@/server/actions/login";
import { useState, useTransition } from "react";
import FormError from "./form-error";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (form: z.infer<typeof loginFormSchema>) => {
    setError(undefined);

    startTransition(() => {
      login(form).then((response) => {
        setError(response?.error);
      });
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
          name="identifier"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Username or email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="identifier"
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
          name="password"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="password"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} className="mb-2" />}
        <Button type="submit" disabled={isPending}>
          Sign in
        </Button>
      </form>
    </Form>
  );
}
