import { currentUser } from "@clerk/nextjs";
import PostEditor from "../../_components/posts/post-editor";
import PostFeed from "../../_components/posts/post-feed";

export const metadata = {
  title: "Home - Bookclub",
};

export default async function Home() {
  // this page is protected, so it can be safely assumed user is defined
  const user = ( await currentUser() )!;

  return (
    <main>
      <div className="mx-auto my-6 flex max-w-2xl flex-col gap-2 px-4">
        <PostEditor avatar={user.imageUrl} username={user.username!} />
        <PostFeed />
      </div>
    </main>
  );
}
