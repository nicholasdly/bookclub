# Bookclub - The social platform for bookworms.

> Bookclub is your place to discuss, track, and review books with the internet.

Inspired by other social platforms such as [Goodreads](https://www.goodreads.com/) and [Strava](https://strava.com/), **Bookclub** is built to be a community for bookworms on the internet.

- Check it out here: [bookclub.social](https://bookclub.social/)

## Development

**Bookclub** is built with the following tools:

- **Web Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Server Actions](https://react.dev/reference/rsc/server-actions) and [Upstash](https://upstash.com/)
- **Database**: [Supabase](https://supabase.com/) and [Drizzle ORM](https://orm.drizzle.team/)
- **Deployment**: [Vercel](https://vercel.com/)

### Prerequisites

To begin development, you will need the following prerequisites installed on your machine:

- [Node.js and npm](https://nodejs.org/)
- [Docker](https://docs.docker.com/desktop/)

### Getting Started

1. Fork and clone this repository using `git clone`.

2. Install npm packages.

```zsh
npm install
```

3. Run Supabase locally, and take note of the output URLs and keys—you will need them to connect to your locally running services. See [Supabase Docs](https://supabase.com/docs/guides/local-development) for more information.

```zsh
# Starts the Supabase stack. Takes some time on your first run.
npx supabase start

# Stops the Supabase stack.
npx supabase stop
```

4. Create and populate a `.env.local` file based off of [`.env.example`](.env.example).

5. Run the following command to apply all database migrations, in order, to your database.

```zsh
npm run db:migrate
```

6. Run the seed script to populate your database with some initial data.

```zsh
npm run db:seed
```

7. Run the following command to start a local development server.

```zsh
npm run dev
```

8. You can view the Supabase dashboard for your local Supabase instance at [http://127.0.0.1:54323](http://127.0.0.1:54323).

### Generating migrations

**Bookclub** uses migrations powered by [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) to make changes to the database schema. When a pull request is merged, the database migrations are automatically applies to the production database.

1. After making and saving your changes to [`schema.ts`](src/server/db/schema.ts), generate your migration file with the following command.

```zsh
npm run db:generate
```

2. If at anytime you want to remove a migration file, that can be done with the following command. This deletes the migration file, but it does **not** revert the changes made to the database. Migration rollbacks are not supported by Drizzle Kit yet, so if you have already run the migration, you will need to manually revert the changes made to the database.

```zsh
npm run db:drop
```

3. Run all migrations with the following command to update your database schema.

```zsh
npm run db:migrate
```

### Contributing

1. Make your changes on a new branch based off of the `staging` branch. Feel free to prefix your branch name with `feature` or `fix`, but it's not the end of the world if you don't.

2. Run the following command to format the codebase using [Prettier](https://prettier.io/). Try to do this before every commit. You can also download the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to format your code automatically on save.

```zsh
npm run format
```

3. Commit your changes and push your branch. Open a pull request against the `staging` branch on GitHub.
