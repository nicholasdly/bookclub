import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { type InferSelectModel } from "drizzle-orm";
import { type posts } from "~/server/db/schema";

type Post = InferSelectModel<typeof posts>;

export async function attachAuthors(posts: Post[]) {
  const users = await clerkClient.users.getUserList({
    userId: posts.map((post) => post.userId),
    limit: 25,
  });

  const results = posts.map((post) => {
    const author = users.find((user) => user.id === post.userId);

    if (!author)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Invalid post discovered due to nonexistent author.",
      });

    return {
      ...post,
      author: {
        username: author.username!,
        imageUrl: author.imageUrl,
        name: `${author.firstName} ${author.lastName}`,
      },
    };
  });

  return results;
}
