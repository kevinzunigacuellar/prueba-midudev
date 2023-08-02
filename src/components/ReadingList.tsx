import { store, removeFromReadingList } from "../scripts/store";
import { For } from "solid-js";

export function ReadingList() {
  return (
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-2">
      <For
        each={store.readingList}
        fallback={<li class="text-zinc-400 py-1">No hay libros 😭</li>}
      >
        {(book) => (
          <li>
            <img
              src={book.cover}
              alt={book.title}
              class="w-full aspect-[2/3] rounded-md"
              loading="lazy"
              decoding="async"
            />
            <div class="pt-3 flex gap-2 justify-between items-center">
              <p class="text-sm">
                <a
                  href={`/book/${book.ISBN}/`}
                  class="inline-block text-zinc-900 font-semibold underline hover:text-blue-600"
                >
                  {book.title}
                </a>
                <span class="block text-zinc-500">
                  {book.author.name} &middot; {book.year}
                </span>
              </p>
              <button
                class="p-1 bg-red-100 rounded-md border border-red-300 text-red-500 hover:border-red-400 hover:text-red-600 transition-colors"
                onclick={() => removeFromReadingList(book.ISBN)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
}
