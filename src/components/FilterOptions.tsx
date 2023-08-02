import { For } from "solid-js";
import {
  store,
  getMaxPages,
  getMinPages,
  getAllGenres,
  filterByGenre,
  filterByPages,
  filterBySearch,
  sortByYear,
} from "../scripts/store";

export function FilterOptions() {
  return (
    <form class="bg-blue-100 p-4 border border-blue-400 rounded-lg grid grid-cols-1">
      <label
        for="pages"
        class="uppercase font-bold tracking-wide text-xs text-blue-800 mb-1"
      >
        páginas
      </label>
      <div class="flex gap-2 items-center mb-2">
        <input
          id="pages"
          type="range"
          class="w-full h-2 bg-gray-100 rounded-lg"
          value={store.filters.pages}
          min={getMinPages()}
          max={getMaxPages()}
          onInput={(e) => {
            const pages = parseInt(e.currentTarget.value);
            filterByPages(pages);
          }}
        />
        <input
          class="font-bold flex-shrink-0 w-12 text-sm text-center bg-white border border-blue-400 text-blue-800 p-1 rounded-md"
          value={store.filters.pages}
          onChange={(e) => {
            const pages = parseInt(e.currentTarget.value);
            if (pages < getMinPages() || pages > getMaxPages()) return;
            filterByPages(pages);
          }}
        ></input>
      </div>
      <label
        for="genre"
        class="uppercase font-bold tracking-wide text-xs text-blue-800 mb-2"
      >
        género
      </label>
      <select
        id="genre"
        class="rounded-lg bg-white border-0 text-zinc-500 mb-4 py-1"
        onInput={(e) => {
          const genre = e.currentTarget.value;
          filterByGenre(genre);
        }}
      >
        <option value="todos">Todos</option>
        <For each={getAllGenres()}>
          {(genre) => (
            <option value={genre} selected={store.filters.genre === genre}>
              {genre}
            </option>
          )}
        </For>
      </select>
      <label
        for="search"
        class="uppercase font-bold tracking-wide text-xs text-blue-800 mb-2"
      >
        Buscar
      </label>
      <input
        id="search"
        value={store.filters.search}
        type="text"
        class="rounded-lg bg-white border-0 text-zinc-500 mb-4 py-1"
        placeholder="Busca un libro"
        onInput={(e) => {
          const search = e.currentTarget.value;
          filterBySearch(search);
        }}
      />
      <label
        for="order"
        class="uppercase font-bold tracking-wide text-xs text-blue-800 mb-2"
      >
        Ordenar por año
      </label>
      <select
        id="order"
        class="rounded-lg bg-white border-0 text-zinc-500 py-1 mb-1"
        value={store.filters.sortByYear}
        onInput={(e) => {
          const order = e.currentTarget.value as "asc" | "desc";
          sortByYear(order);
        }}
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </form>
  );
}
