"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import registerFormSchema from "@/lib/zod/register-form-schema";
import { register } from "@/server/actions/register";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

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
      const id = toast.loading("Creating account...");

      register(form)
        .then((response) => {
          if (response?.error) {
            toast.error(response.error, { id });
          } else {
            toast.dismiss(id);
          }
        })
        .catch(() => toast.error("Something went wrong!", { id }));
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
        <Button type="submit" disabled={isPending}>
          Sign up
        </Button>
      </form>
    </Form>
  );
}
