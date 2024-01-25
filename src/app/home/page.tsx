import SignOutButton from "../_components/sign-out-button";

export default function Home() {
  return (
    <main className="mt-32 flex flex-col items-center gap-8">
      <h1 className="text-3xl">Home Page</h1>
      <SignOutButton variant="outline" />
    </main>
  );
}
