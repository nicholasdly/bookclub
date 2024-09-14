# Bookclub - The social platform for bookworms

> Bookclub is a place to read, review, and talk about books with the internet. Keep track of the books you've read, interact with other readers, and build your bookworm community—all in one place.

Inspired by other social platforms such as [Goodreads](https://www.goodreads.com/) and [X](https://twitter.com/), **Bookclub** is built to be a community for readers on the internet.

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

To get started contributing to **Bookclub**, it is assumed you have Node.js installed along with necessary environment variables as listed in the [`.env.example`](.env.example) file.

### Installation

1. Fork and clone this repository using `git clone`.

2. Install npm packages.

```zsh
npm install
```

3. Create and populate a `.env.local` file based off of [`.env.example`](.env.example).

4. Run the following command to run all database migrations.

```zsh
npm run db:migrate
```

5. Run the seed script to populate your database.

```zsh
npm run db:seed
```

6. Run the following command to start a local development server.

```zsh
npm run dev
```

7. Run the following command to open the Drizzle database studio to easy view and modify data in your database:

```zsh
npm run db:studio
```

8. Run the following command to format the codebase using [Prettier](https://prettier.io/).

```zsh
npm run format
```

### Database Migrations

**Bookclub** uses migrations powered by [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) to make changes to the database.

1. Generate your migration file.

```zsh
npm run db:generate
```

2. Run all migrations.

```zsh
npm run db:migrate
```

3. If at anytime you want to remove a migration, that can be done with the following command.

```zsh
npm run db:drop
```

## License

Licensed under the GNU General Public License v3.0, Copyright © 2024
