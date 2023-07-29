import { For, Show } from "solid-js";
import {
  store,
  addToReadingList,
  getRemainingBookCount,
} from "../scripts/store";

export function BookShowcase() {
  return (
    <section class="flex-1 bg-zinc-800 p-6 rounded-lg border border-zinc-700">
      <p class="text-lg pb-4 font-semibold tracking-wide text-zinc-300">
        Libros disponibles{" "}
        <span class="px-1.5 font-mono py-1 rounded-md bg-zinc-700 text-sm">
          {getRemainingBookCount()}
        </span>
      </p>
      <Show
        when={store.showcaseBooks.length > 0}
        fallback={<ShowcaseFallback />}
      >
        <ul class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <For each={store.showcaseBooks}>
            {(book) => (
              <li class="p-2">
                <img
                  src={book.cover}
                  alt={book.title}
                  class="w-full aspect-[2/3]"
                  loading="lazy"
                  decoding="async"
                />
                <div class="pt-3 flex gap-2 justify-between items-start">
                  <div class="">
                    <p class="text-zinc-300">{book.title}</p>
                    <p class="text-zinc-400">{book.author.name}</p>
                  </div>
                  <button class="p-1 mt-1 bg-zinc-700 rounded-md text-zinc-400 hover:bg-red-700 hover:text-zinc-300 transition-all" onclick={() => addToReadingList(book)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
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
    <p class="py-10 text-center font-semibold rounded-md text-zinc-300 border bg-zinc-900 border-zinc-700">
      No se encontró ningun libro 😭, prueba cambiando los filtros
    </p>
  );
}
