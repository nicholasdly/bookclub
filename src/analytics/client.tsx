"use client";

import { env } from "@/env";
import { useSession } from "next-auth/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode, useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}
export function CSPostHogProvider({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogAuthWrapper>{children}</PostHogAuthWrapper>
    </PostHogProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        username: user.username,
        email: user.email,
        name: user.name,
      });
    } else {
      posthog.reset();
    }
  }, [user]);

  return children;
}
