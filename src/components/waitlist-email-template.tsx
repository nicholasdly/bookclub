/* eslint-disable react/no-unescaped-entities */
export default function WaitlistEmailTemplate({
  firstName,
}: {
  firstName: string;
}) {
  return (
    <div>
      <p>Hey {firstName}! 👋</p>
      <p>My name's Nicholas Ly—I'm the founder of Bookclub.</p>
      <p>
        First off, <b>thank you</b> for joining the waitlist. It really does
        mean the world to me.
      </p>
      <p>
        Since you joined the waitlist, you probably are a fan of books—that's{" "}
        <i>exactly</i> who I want to help.
      </p>
      <p>
        Let's face it. <b>Goodreads ain't cutting it these days.</b> 🤷‍♂️
      </p>
      <p>It's slow, it's clunky, and it's not even nice to look at.</p>
      <p>
        That's why I'm building Bookclub. I'm taking the best parts of
        Goodreads, and combining it with the social features of Twitter (or X if
        you're weird).
      </p>
      <p>
        I'm talking the whole shebang here:
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
          <li>and so much more to come, on a faster and modern platform 🚀</li>
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
      <p>Again, thanks for joining the waitlist. And welcome to the club.</p>
      <p>Nicholas Ly</p>
    </div>
  );
}
