import HomeFeed from "~/app/_components/feeds/home-feed";
import PostEditor from "../../_components/posts/post-editor";

export const metadata = {
  title: "Home - Bookclub",
};

export default function Home() {
  return (
    <main>
      <div className="mx-auto my-6 flex max-w-2xl flex-col gap-2 px-4">
        <PostEditor />
        <HomeFeed />
      </div>
    </main>
  );
}
