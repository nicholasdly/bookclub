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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import loginFormSchema from "@/lib/zod/login-form-schema";
import { login } from "@/server/actions/login";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (form: z.infer<typeof loginFormSchema>) => {
    startTransition(() => {
      const id = toast.loading("Logging in...");

      login(form).then((response) => {
        if (response?.error) {
          toast.error(response.error, { id });
        } else {
          toast.dismiss(id);
        }
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
                  autoFocus
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
            <FormItem className="mb-2">
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
        <Button type="submit" variant="core" disabled={isPending}>
          Sign in
        </Button>
      </form>
    </Form>
  );
}
