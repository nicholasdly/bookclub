import PostEditor from "../../_components/posts/post-editor";
import Feed from "../../_components/posts/feed";

export const metadata = {
  title: "Home - Bookclub",
};

export default function Home() {
  return (
    <main>
      <div className="mx-auto my-6 flex max-w-2xl flex-col gap-2 px-4">
        <PostEditor />
        <Feed type="all" />
      </div>
    </main>
  );
}
