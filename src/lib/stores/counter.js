import { writable, get } from "svelte/store";

export const counterStore = (init = 0) => {
  const state = writable(init);

  const increment = () => {
    state.update((n) => n + 1);
  };

  const getValue = () => {
    let v = get(state);
    increment();
    return v;
  }

  return {
    subscribe: state.subscribe,
    set: state.set,
    update: state.update,
    getValue
  }
}