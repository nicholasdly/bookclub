# Bookclub - The social platform for bookworms.

> Bookclub is a place to read, review, and talk about books with the internet. Keep track of the books you've read, interact with other readers, and build your bookworm community—all in one place.

Inspired by the best parts of other flashcard programs like [Anki](https://apps.ankiweb.net/) and [Quizlet](https://quizlet.com/), **minicards** is designed and built to bring simplicity back into flashcard software, while still being an incredibly effective method of study and memorization.

Inspired by the best parts of other social platforms such as [Goodreads](https://www.goodreads.com/) and [X](https://twitter.com/), **Bookclub** is built to be a community for readers on the internet—designed with readers in mind.

## Development

At its core, **minicards** is built with the [T3 stack](https://create.t3.gg/) with these tools:

- **Web Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [tRPC](https://trpc.io/) and [Upstash](https://upstash.com/)
- **Database**: [Planetscale](https://planetscale.com/) and [Meilisearch](https://www.meilisearch.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Deployment**: [Vercel](https://vercel.com/)

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

### Contributing

1. Create a new branch from the `develop` branch.
```zsh
# New feature branch
git checkout -b feature/<issue_id>-<description>

# New bug fix branch
git checkout -b bugfix/<issue_id>-<description>
```

2. Stage, commit, and push your changes.
```zsh
git commit -m <message>
git push origin <branch_name>
```

3. Open a new pull request to merge your branch into the `develop` branch.

## License

Licensed under the GNU General Public License v3.0, Copyright © 2024
