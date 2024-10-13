/* eslint-disable react/no-unescaped-entities */

export function WelcomeEmailTemplate({ username }: { username: string }) {
  return (
    <div>
      <p>
        Hey{" "}
        <b>
          <i>{username}</i>
        </b>
        ! 👋
      </p>
      <p>My name is Nicholas Ly—I'm the developer behind Bookclub.</p>
      <p>
        First off, <b>thank you</b> for joining us—every user means the world to
        us.
      </p>
      <p>
        Since you joined us, you probably are a fan of books—that's{" "}
        <i>exactly</i> who we made Bookclub for.
      </p>
      <p>
        Let's face it. <b>Goodreads ain't cutting it these days.</b> 🤷‍♂️
      </p>
      <p>It's slow, it's clunky, and it's not even nice to look at.</p>
      <p>
        That's why I'm building Bookclub. I'm taking the best parts of
        Goodreads, combining it with my favorite social features from platforms
        like Twitter (or X if you're weird), and putting it all together through
        a modern interface you'll actually enjoy using.
      </p>
      <p>
        There are a bunch of core features I'd really like to focus on, with
        many more to come:
        <ul>
          <li>track and organize your books with ease 📚</li>
          <li>
            rate and write reviews of books—yes, even by the <i>half</i> star
            ⭐️
          </li>
          <li>
            private bookclubs for your friends, and public bookclubs for making
            new friends 👥
          </li>
          <li>reading streaks and seasonal challenges 🔥</li>
        </ul>
      </p>
      <p>
        Bookclub is a passion project at heart—<b>by readers, for readers</b>.
        The platform will be <b>free forever</b>, and I will never litter the
        site with ads or try to shove a product in your face.
      </p>
      <p>
        We're also <b>privacy focused</b>. We won't ever sell or give away your
        personal information, <b>period</b>. 🔒
      </p>
      <p>
        If that all sounds like something you'd like to be a part of, then stay
        tuned for more.
      </p>
      <p>Again, we're happy to have you on board. And welcome to the club.</p>
      <p>Nicholas Ly</p>
    </div>
  );
}
