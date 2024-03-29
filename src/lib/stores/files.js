import { writable } from "svelte/store";

export function newFileStore() {
  /** @type {import('svelte/store').Writable<ILocalFileInfo[]>} */
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    reset: () => set([]),
    add: (/** @type {ILocalFileInfo} */file) => update((files) => [...files, file]),
    remove: (/** @type {string} */id) => update((files) => [...files].filter((file) => file.local_id !== id)),
    update: (/** @type {string} */id, /** @type {Partial<ILocalFileInfo>} */ values) => {
      update((files) => {
        files.forEach((file) => {
          if (file.local_id === id) {
            Object.assign(file, values)
          }
          return file
        });
        return files
      })
    }
  }
}