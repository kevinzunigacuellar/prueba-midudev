import { Show } from "solid-js";
import {
  addToReadingList,
  removeFromReadingList,
  store,
} from "../scripts/store";
import type { Book } from "../scripts/types";

export function FavoriteButton({ isbn }: { isbn: Book["ISBN"] }) {
  const handleClick = () => {
    if (!store.readingList.some((bookInList) => bookInList.ISBN === isbn)) {
      addToReadingList(isbn);
    } else {
      removeFromReadingList(isbn);
    }
  };

  return (
    <button
      onclick={handleClick}
      class="block w-full sm:w-fit py-2 px-6 mt-4 font-semibold bg-red-100 rounded-md border border-red-300 text-red-600 hover:border-red-400 hover:text-red-600 transition-colors"
    >
      <Show
        when={store.readingList.some((bookInList) => bookInList.ISBN === isbn)}
        fallback={"Agregar a la lista de lectura 💜"}
      >
        Quitar de la lista de lectura ❌
      </Show>
    </button>
  );
}
