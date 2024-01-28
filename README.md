# Bookclub - The social platform for bookworms

> Bookclub is a place to read, review, and talk about books with the internet. Keep track of the books you've read, interact with other readers, and build your bookworm community—all in one place.

Inspired by the best parts of other social platforms such as [Goodreads](https://www.goodreads.com/) and [X](https://twitter.com/), **Bookclub** is built to be a community for readers on the internet—designed with readers in mind.

- Check out the current release here: [bookclub.social](https://bookclub.social/)
- Check out the development release here: [dev.bookclub.social](https://dev.bookclub.social/)

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

```zsh
DATABASE_URL='mysql://YOUR_MYSQL_URL_HERE?ssl={"rejectUnauthorized":true}'

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_KEY_HERE
CLERK_SECRET_KEY=YOUR_KEY_HERE
```

4. Run the following command to start a local development server.

```zsh
npm run dev
```

5. Run the following command to open the Drizzle database studio.

```zsh
npm run db:studio
```

6. Run the following command to push changes to the Planetscale database schema(s).

```zsh
npm run db:push
```

### Contributing

1. Create a new branch from the `develop` branch, preferably based off of an item under the "Ready" column of the [Bookclub Roadmap](https://github.com/users/nicholasdly/projects/7) Github project.

```zsh
# New feature branch
git checkout -b feature/<project_item_id>-<description>

# New bug fix branch
git checkout -b bugfix/<project_item_id>-<description>
```

2. Stage, commit, and push your changes.

```zsh
git commit -m <message>
git push origin <branch_name>
```

3. Open a new pull request to merge your branch into the `develop` branch.

## License

Licensed under the GNU General Public License v3.0, Copyright © 2024
