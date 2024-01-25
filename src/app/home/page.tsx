import SignOutButton from "../_components/sign-out-button";

export default function Home() {
  return (
    <main className="flex flex-col items-center mt-32 gap-8">
      <h1 className="text-3xl">Home Page</h1>
      <SignOutButton variant="outline" />
    </main>
  );
}
