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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { register } from "@/server/actions/register";
import registerFormSchema from "@/lib/zod/register-form-schema";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmation: "",
    },
  });

  const onSubmit = (form: z.infer<typeof registerFormSchema>) => {
    startTransition(() => {
      toast.promise(register(form), {
        loading: "Creating account...",
        error: (error) => error.message ?? "Something went wrong!",
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
          name="name"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormControl>
                <Input
                  placeholder="Name"
                  disabled={isPending}
                  autoFocus
                  {...field}
                />
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
            <FormItem className="mb-2">
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
        <Button type="submit" variant="core" disabled={isPending}>
          Sign up
        </Button>
      </form>
    </Form>
  );
}
