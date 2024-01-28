import { currentUser } from "@clerk/nextjs";
import Header from "../_components/header";
import Post from "../_components/post";
import PostEditor from "../_components/post-editor";
import { api } from "~/trpc/server";

export default async function Home() {
  const user = (await currentUser())!;

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-2xl border px-4 mt-6 flex flex-col gap-2">
          <PostEditor avatar={user.imageUrl} username={user.username!} />
          <Feed />
        </div>
      </main>
    </>
  );
}

async function Feed() {
  const posts = await api.posts.getAll.query();

  return (
    <>
      {posts.map((post) => <Post {...post} key={post.id} />)}
    </>
  );
}