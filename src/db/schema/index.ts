/**
 * This "barrel file" acts as the database schema, and allows us to break up
 * the schema into multiple files.
 *
 * When generating migrations, be sure this file includes all necessary files!
 *
 * The generated SQL scripts can also be modified to define row level security
 * policies, triggers, and other PostgreSQL features that Drizzle ORM does not
 * support (yet).
 */

export * from "./users";
export * from "./profiles";
