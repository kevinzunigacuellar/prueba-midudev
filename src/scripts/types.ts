interface Author {
  name: string;
  otherBooks: string[];
}

export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: Author;
}

export interface Store {
  showcaseBooks: Book[];
  readingList: Book[];
  filters: {
    genre: string;
    pages: number;
    search: string;
    sortByYear: "asc" | "desc";
  };
}
