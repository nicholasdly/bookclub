import Header from "@/components/header";
import MyBooksRightbar from "@/components/rightbars/my-books-rightbar";
import MyBooksList from "@/components/my-books/my-books-list";
import MyBooksYear from "@/components/my-books/my-books-year";

export default function MyBooksPage() {
  return (
    <>
      <div className="w-full">
        <Header heading="My Books" />
        <main>
          <MyBooksYear />
          <MyBooksList />
        </main>
      </div>
      <MyBooksRightbar />
    </>
  );
}
