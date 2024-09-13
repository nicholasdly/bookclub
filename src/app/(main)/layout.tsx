import Footer from "@/components/footer";
import Header from "@/components/header";
import Leftbar from "@/components/leftbar";
import Rightbar from "@/components/rightbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex max-w-6xl">
      <Leftbar />
      <div className="w-full">
        <Header />
        <main className="mb-16 md:mb-0">{children}</main>
        <Footer />
      </div>
      <Rightbar />
    </div>
  );
}
