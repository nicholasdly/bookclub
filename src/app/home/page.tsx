import { redirect } from "next/navigation";

import UserButton from "@/components/user-button";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    redirect("/auth/login");
  }

  return <UserButton user={data.user} />;
}
