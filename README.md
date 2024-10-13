# Bookclub - The social platform for bookworms

> Bookclub is your place to discuss, track, and review books with the internet.

Inspired by other social platforms such as [Goodreads](https://www.goodreads.com/) and [X](https://twitter.com/), **Bookclub** is built to be a community for bookworms on the internet.

- Check it out here: [bookclub.social](https://bookclub.social/)

## Development

**Bookclub** is built with the following tools:

- **Web Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [tRPC](https://trpc.io/)and [Upstash](https://upstash.com/)
- **Database**: [Neon](https://neon.tech/home) and [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Auth.js](https://authjs.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

### Prerequisites

To get started contributing to **Bookclub**, it is assumed you have Node.js and npm installed along with necessary environment variables as listed in the [`.env.example`](.env.example) file.

### Installation

1. Fork and clone this repository using `git clone`.

2. Install npm packages.

```zsh
npm install
```

3. Create and populate a `.env` file based off of [`.env.example`](.env.example).

4. Run the following command to apply all database migrations to your database branch.

```zsh
npm run db:migrate
```

5. Run the seed script to populate your database branch with some initial data.

```zsh
npm run db:seed
```

6. Run the following command to start a local development server.

```zsh
npm run dev
```

7. Run the following command to open the Drizzle database studio to easy view and modify data in your database branch.

```zsh
npm run db:studio
```

8. Run the following command to format the codebase using [Prettier](https://prettier.io/). Try to do this before every commit. You can also download the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to format your code automatically on save.

```zsh
npm run format
```

### Database Migrations

**Bookclub** uses migrations powered by [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) to make changes to the database schema. When a pull request is merged, the database migrations are automatically applies to the production database.

1. After making and saving your changes to [`schema.ts`](src/server/db/schema.ts), generate your migration file with the following command.

```zsh
npm run db:generate
```

2. If at anytime you want to remove a migration file, that can be done with the following command. This deletes the migration file, but it does **not** revert the changes made to the database branch. Migration rollbacks are not supported by Drizzle Kit yet, so if you have already run the migration, you will need to manually revert the changes made to the database branch.

```zsh
npm run db:drop
```

3. Run all migrations with the following command to update your database branch schema.

```zsh
npm run db:migrate
```
