export default function MarketingHero() {
  return (
    <section className="flex flex-col items-center gap-10 border-b py-20 md:py-32">
      <p className="flex flex-col items-center justify-center font-instrument text-5xl md:text-8xl lg:text-9xl">
        <span className="italic">The social network</span>
        <span className="text-muted-foreground">for bookworms!</span>
      </p>
      <form className="flex flex-col items-center gap-2">
        <div className="flex w-full max-w-lg items-center justify-between rounded-full border py-3 pl-5 pr-3">
          <div className="flex items-center gap-2">
            <div className="flex text-2xl">
              <span>bookclub.social/</span>
              <input
                className="w-full lowercase"
                placeholder="username"
                maxLength={15}
              />
            </div>
            <button
              className="size-10 shrink-0 rounded-full bg-black text-white"
              disabled
            >
              {`->`}
            </button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Claim your username before it&apos;s too late!
        </p>
      </form>
    </section>
  );
}
