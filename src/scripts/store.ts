import { createStore, produce } from "solid-js/store";
import booksJson from "../data/books.json";
import { createEffect } from "solid-js";
import type { Book, Store } from "./types";

const initialBooks = booksJson.library.map((bookData) => {
  return {
    ...bookData.book,
  };
});

const LOCAL_STORAGE_KEY = "store";

const localStoreData = localStorage.getItem(LOCAL_STORAGE_KEY);

export const [store, setStore] = createStore<Store>(
  localStoreData
    ? JSON.parse(localStoreData)
    : {
        showcaseBooks: initialBooks,
        readingList: [],
        filters: {
          genre: "todos",
          pages: getMaxPages(),
          search: "",
          sortByYear: "asc",
        },
      },
);

function onStorageUpdate() {
  setStore(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!));
}

// this effect updates the localStorage when the store changes
createEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
  window.addEventListener("storage", onStorageUpdate);

  return () => {
    window.removeEventListener("storage", onStorageUpdate);
  };
});

// this effect updates the showcase when the filters change
createEffect(() => {
  const { pages, genre, search, sortByYear } = store.filters;
  const readingListIsbn = store.readingList.map((book) => book.ISBN);
  const filterbooks = initialBooks.filter((book) => {
    const title = book.title.toLowerCase();
    const author = book.author.name.toLowerCase();
    const searchKeyword = search.toLowerCase();

    // filter pages
    if (book.pages > pages) return false;
    // filter genre
    if (genre !== "todos" && book.genre !== genre) return false;
    // filter reading list
    if (readingListIsbn.includes(book.ISBN)) return false;
    // filter search
    if (!title.includes(searchKeyword) && !author.includes(searchKeyword))
      return false;

    return true;
  });

  // sort by year
  const orderedBooks = filterbooks.sort((a, b) => {
    if (sortByYear === "asc") return a.year - b.year;
    if (sortByYear === "desc") return b.year - a.year;
    return 0;
  });
  setStore("showcaseBooks", orderedBooks);
});

const ISBNLookUp = new Map<string, Book>(
  initialBooks.map((book) => [book.ISBN, book]),
);

export function addToReadingList(isbn: Book["ISBN"]) {
  const book = ISBNLookUp.get(isbn)!;
  setStore(
    "readingList",
    produce((readingList) => {
      readingList.push(book);
    }),
  );
}

export function removeFromReadingList(isbn: Book["ISBN"]) {
  const filteredReadingList = store.readingList.filter(
    (book) => book.ISBN !== isbn,
  );
  setStore("readingList", filteredReadingList);
}

export function getMaxPages() {
  return Math.max(...initialBooks.map((book) => book.pages));
}

export function getMinPages() {
  return Math.min(...initialBooks.map((book) => book.pages));
}

export function getAllGenres() {
  return Array.from(new Set(initialBooks.map((book) => book.genre)));
}

export function filterByGenre(genre: Book["genre"]) {
  setStore("filters", "genre", genre);
}

export function filterByPages(pages: Book["pages"]) {
  setStore("filters", "pages", pages);
}

export function getRemainingBookCount() {
  return initialBooks.length - store.readingList.length;
}

export function filterBySearch(search: string) {
  setStore("filters", "search", search);
}

export function sortByYear(order: "asc" | "desc") {
  setStore("filters", "sortByYear", order);
}
