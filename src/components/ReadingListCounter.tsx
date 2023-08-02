import { store } from "../scripts/store";

export function ReadingListCounter() {
  return (
    <span class="flex items-center justify-center bg-purple-50 text-purple-800 border border-purple-400 text-sm w-8 h-8 rounded-md">
      {store.readingList.length}
    </span>
  );
}
