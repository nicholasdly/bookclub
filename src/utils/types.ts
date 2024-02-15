import { type InferSelectModel } from "drizzle-orm";
import {
  type users,
  type posts,
  type reposts,
  type likes,
  type follows
} from "~/server/db/schema";
import { type RouterOutputs } from "~/trpc/shared";
import { type getPreview } from "./data";

export type NotUndefined<T> = T extends undefined ? never : T;
export type NotNull<T> = T extends null ? never : T;
export type NotNullish<T> = T extends (null | undefined) ? never : T;

export type User = InferSelectModel<typeof users>;
export type Post = InferSelectModel<typeof posts>;
export type Repost = InferSelectModel<typeof reposts>;
export type Like = InferSelectModel<typeof likes>;
export type Follow = InferSelectModel<typeof follows>;

export type PostItem = RouterOutputs["posts"]["get"];
