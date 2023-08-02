import { For, Show } from "solid-js";
import { store, addToReadingList } from "../scripts/store";

export function BookShowcase() {
  return (
    <section class="flex-1 pb-6 rounded-lg">
      <Show
        when={store.showcaseBooks.length > 0}
        fallback={<ShowcaseFallback />}
      >
        <ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          <For each={store.showcaseBooks}>
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
                      class="block text-zinc-900 font-semibold"
                    >
                      {book.title}
                    </a>
                    <span class="block text-zinc-500">
                      {book.author.name} &middot; {book.year}
                    </span>
                  </p>
                  <button
                    class="p-1 bg-red-100 rounded-md border border-red-300 text-red-500 hover:border-red-400 hover:text-red-600 transition-all"
                    onclick={() => addToReadingList(book)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </section>
  );
}

function ShowcaseFallback() {
  return (
    <p class="flex items-center justify-center h-60 text-center font-semibold rounded-md text-blue-800 border border-blue-400 bg-blue-100">
      No se encontró ningun libro, prueba cambiando los filtros
    </p>
  );
}
