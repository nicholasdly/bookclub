import Editor from "@/components/editor";
import Feed from "@/components/feed";
import { auth } from "@/server/auth";

export default async function FeedPage() {
  const session = await auth();

  return (
    <>
      <section>
        {session?.user && <Editor user={session.user} />}
        <Feed />
      </section>
    </>
  );
}
