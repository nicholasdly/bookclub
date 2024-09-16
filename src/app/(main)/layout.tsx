import Footer from "@/components/footer";
import Leftbar from "@/components/leftbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto mb-16 flex max-w-6xl sm:mb-0">
      <Leftbar />
      {children}
      <Footer />
    </div>
  );
}
