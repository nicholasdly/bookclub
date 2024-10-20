import { redirect } from "next/navigation";

import Page from "@/components/page";
import { Navbar, Sidebar } from "@/components/sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    redirect("/auth/login");
  }

  return (
    <Page>
      <Navbar />
      <main>Home Page</main>
      <Sidebar side="right">Right Sidebar</Sidebar>
    </Page>
  );
}
