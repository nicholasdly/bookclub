import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { type InferSelectModel } from "drizzle-orm";
import { type posts } from "~/server/db/schema";
import { TextCensor, RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';

type Post = InferSelectModel<typeof posts>;

/**
 * Given an array of `Post` entities, retrieve the data on the `User`s who made those posts, appending said data to
 * their respective `Post`, and return the results.
 * @param posts An array of `Post` entities to be sourced.
 * @returns 
 */
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

const profanityMatcher = new RegExpMatcher({ ...englishDataset.build(), ...englishRecommendedTransformers });
const censor = new TextCensor().setStrategy((ctx) => "*".repeat(ctx.matchLength));

/**
 * Censors profanity from a given string `text` by replacing all profanity with astericks of the same lenth.
 * @param text The text in which profanity will be censored.
 * @returns The same text, except all profanity has been replaced with asterisks.
 */
export function censorProfanity(text: string) {
  const profanity = profanityMatcher.getAllMatches(text);
  return censor.applyTo(text, profanity);
}
