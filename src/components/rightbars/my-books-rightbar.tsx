import { CirclePlusIcon, SettingsIcon } from "lucide-react";
import { Button } from "../shadcn/button";
import LogOutButton from "../auth/logout-button";
import Rightbar from "./rightbar";
import MyBooksFilter from "../my-books/my-books-filter";

export default function MyBooksRightbar() {
  return (
    <Rightbar>
      <div className="flex h-12 items-center justify-end border-b px-3 py-2">
        <LogOutButton />
      </div>
      <div className="space-y-8 p-6">
        <MyBooksFilter />
        <div className="space-y-2">
          <Button variant="core" size="sm" className="w-full space-x-2">
            <CirclePlusIcon className="size-4" />
            <span>Add book</span>
          </Button>
          <Button variant="outline" size="sm" className="w-full space-x-2">
            <SettingsIcon className="size-4" />
            <span>Edit bookshelves</span>
          </Button>
        </div>
      </div>
    </Rightbar>
  );
}
