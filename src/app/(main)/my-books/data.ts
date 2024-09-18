export type Book = {
  title: string;
  author: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  shelf: string;
  startedDate?: Date;
  readDate?: Date;
  addedDate: Date;
};

export const books: Book[] = [
  {
    title: "Dune",
    author: "Frank Herbert",
    rating: undefined,
    shelf: "want-to-read",
    startedDate: undefined,
    readDate: undefined,
    addedDate: new Date("2024-09-16"),
  },
  {
    title: "Five Decembers",
    author: "James Kestrel",
    rating: undefined,
    shelf: "currently-reading",
    startedDate: new Date("2024-09-08"),
    readDate: undefined,
    addedDate: new Date("2024-09-06"),
  },
  {
    title: "Stories of Your Life and Others",
    author: "Ted Chiang",
    rating: 4,
    shelf: "read",
    startedDate: new Date("2024-08-28"),
    readDate: new Date("2024-09-07"),
    addedDate: new Date("2024-01-22"),
  },
  {
    title: "Before the Coffee Gets Cold",
    author: "Toshikazu Kawaguchi",
    rating: 4,
    shelf: "read",
    startedDate: new Date("2024-08-24"),
    readDate: new Date("2024-08-28"),
    addedDate: new Date("2024-08-24"),
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 5,
    shelf: "read",
    startedDate: new Date("2024-08-19"),
    readDate: new Date("2024-08-24"),
    addedDate: new Date("2024-08-06"),
  },
  {
    title: "Artemis",
    author: "Andy Weir",
    rating: 4,
    shelf: "read",
    startedDate: new Date("2024-08-09"),
    readDate: new Date("2024-08-19"),
    addedDate: new Date("2024-08-06"),
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    rating: 5,
    shelf: "read",
    startedDate: new Date("2024-08-02"),
    readDate: new Date("2024-08-09"),
    addedDate: new Date("2024-08-02"),
  },
  {
    title: "The Invisible Man",
    author: "H.G. Wells",
    rating: 3,
    shelf: "read",
    startedDate: new Date("2024-03-12"),
    readDate: new Date("2024-04-07"),
    addedDate: new Date("2024-03-12"),
  },
  {
    title: "The Song of Achilles",
    author: "Madeline Miller",
    rating: 4,
    shelf: "read",
    startedDate: new Date("2024-01-11"),
    readDate: new Date("2024-02-01"),
    addedDate: new Date("2024-01-22"),
  },
  {
    title: "Flowers for Algernon",
    author: "Daniel Keyes",
    rating: 5,
    shelf: "read",
    startedDate: new Date("2023-07-08"),
    readDate: new Date("2023-07-09"),
    addedDate: new Date("2023-08-23"),
  },
];
