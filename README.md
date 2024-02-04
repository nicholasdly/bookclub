# Bookclub - The social platform for bookworms

> Bookclub is a place to read, review, and talk about books with the internet. Keep track of the books you've read, interact with other readers, and build your bookworm community—all in one place.

Inspired by the best parts of other social platforms such as [Goodreads](https://www.goodreads.com/) and [X](https://twitter.com/), **Bookclub** is built to be a community for readers on the internet.

- Check out the current release here: [bookclub.social](https://bookclub.social/)

## Development

At its core, **Bookclub** is built with the [T3 stack](https://create.t3.gg/) with these tools:

- **Web Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [tRPC](https://trpc.io/) and [Upstash](https://upstash.com/)
- **Database**: [Planetscale](https://planetscale.com/) and [Meilisearch](https://www.meilisearch.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Deployment**: [Vercel](https://vercel.com/)

You can view the development history via the [Bookclub Roadmap](https://github.com/users/nicholasdly/projects/7) GitHub project.

### Prerequisites

To get started contributing to **Bookclub**, it is assumed you have Node.js installed along with necessary keys and secrets as listed in the [`.env.example`](.env.example) file.

### Installation

1. Fork and clone this repository using `git clone`.

2. Install npm packages:

```zsh
npm install
```

3. Create a `.env` file based off of [`.env.example`](.env.example), and provide the necessary keys.

4. Run the following command to push changes to your Planetscale database.

```zsh
npm run db:push
```

5. Run the following command to start a local development server.

```zsh
npm run dev
```

6. Run the following command to open the Drizzle database studio to easy view and modify data in your database:

```zsh
npm run db:studio
```

### Contributing

1. Create a new branch from the `develop` branch, preferably based off of an item under the "Ready" column of the [Bookclub Roadmap](https://github.com/users/nicholasdly/projects/7) Github project.

```zsh
# New feature branch
git checkout -b feature/<project_item_id>-<description>

# New bug fix branch
git checkout -b bugfix/<project_item_id>-<description>

# New bug hotfix branch
git checkout -b hotfix/<description>
```

2. Stage and commit your changes.

```zsh
git add .
git commit -m <message>
git push origin <branch_name>
```

3. Run the Prettier formatting script, and resolve any major issues caught by the linter. Commit those changes as well.

```zsh
npm run lint  # Alerts you of issues, but does not fix them for you!
npm run format  # Applies Prettier formatting to the entire repo.
git commit -m "Prettier formatting + lint fixes"
```

4. Push your changes, and make your pull request on GitHub to merge your branch into the `develop` branch (or `main` if it is a hotfix).

```zsh
git push origin <branch_name>
```

### Database Migrations

During local development and prototyping, it is perfectly fine to use the `npm run db:push` command to apply schema changes to your database immediately.

For more precise schema updates with increased safety, you should use migrations instead:

1. Generate your migration file, which is a SQL file containing statements that can be applied to your database:

```zsh
npm run migrations:generate
```

2. You should see the migration file in the `migrations` directory. If at anytime you want to undo or remove a migration file, that can be done with the following command:

```zsh
npm run migrations:drop
```

3. To apply the changes from the migration file(s) to your database, use the following command:

```zsh
npm run migrations:push
```

## License

Licensed under the GNU General Public License v3.0, Copyright © 2024
