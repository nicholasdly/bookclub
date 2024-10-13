import { sql, SQL } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core";

/**
 * Generates a random user avatar image.
 * @returns `string`
 */
export function randomAvatar() {
  const token = Math.floor(Math.random() * 100);
  return `https://deno-avatar.deno.dev/avatar/${token}.svg`;
}

/**
 * Helper function for creating a lower case SQL expression.
 * @param column A table column.
 * @returns `SQL`
 */
export function lower(column: AnyPgColumn): SQL {
  return sql`lower(${column})`;
}
