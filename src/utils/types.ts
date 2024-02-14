import { type InferSelectModel } from "drizzle-orm";
import {
  type users,
  type posts,
  type replies,
  type reposts,
  type likes,
  type follows
} from "~/server/db/schema";
import { type RouterOutputs } from "~/trpc/shared";

//
// Utility Types
//

export type NotUndefined<T> = T extends undefined ? never : T;
export type NotNull<T> = T extends null ? never : T;
export type NotNullish<T> = T extends (null | undefined) ? never : T;

//
// Database Entity Types
//

export type User = InferSelectModel<typeof users>;
export type Post = InferSelectModel<typeof posts>;
export type Reply = InferSelectModel<typeof replies>;
export type Repost = InferSelectModel<typeof reposts>;
export type Like = InferSelectModel<typeof likes>;
export type Follow = InferSelectModel<typeof follows>;

//
// tRPC Router Output Types
//

export type PostItem = RouterOutputs["posts"]["get"];
