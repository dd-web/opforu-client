import { writable, get } from "svelte/store";

/** @typedef {ReturnType<typeof newThreadStore>} ThreadStore */

function newThreadStore() {
  /** @type {import('svelte/store').Writable<IThreadStore>} */
  const threadStore = writable({})

  /**
   * Gets thread specified or null if any dependencies do not exist
   * @param {string} board board short name
   * @param {string} thread thread slug
   * @returns {IThreadStoreThread|string?}
   */
  function getThread(board, thread) {
    let ts = get(threadStore);
    if (!ts[board]) return null;
    if (!ts[board][thread]) return null;
    return ts[board][thread];
  }

  /**
   * Add thread to the store under specified board
   * @param {string} board board short name
   * @param {string} thread thread slug
   * @param {IThreadStoreThread|string} data thread data
   */
  function setThread(board, thread, data) {
    checkBoard(board);
    let ts = get(threadStore);
    ts[board][thread] = typeof data === 'string' ? 'not found' : data;
    threadStore.set(ts);
  }


  /**
   * Ensures valid indexing of board entries
   * @param {string} board board short name
   */
  function checkBoard(board) {
    let ts = get(threadStore)
    if (!ts[board]) {
      ts[board] = {}
    }
    threadStore.set(ts)
  }

  /**
   * Fetches thread from back end
   * @param {string} board board short name
   * @param {string} thread thread slug
   */
  async function fetchThread(board, thread) {
    const qs = new URLSearchParams();
    qs.append('board', board);
    qs.append('thread', thread);

    return new Promise((res, rej) => {
      fetch(`/api/thread?${qs.toString()}`)
        .then((resp) => res(resp.json()))
    })
  }


  /**
   * Resolves a thread any way it can be found
   * @param {string} board board short name
   * @param {string} thread thread slug
   * @returns {Promise<IThreadStoreThread|string>}
   */
  async function resolveThread(board, thread) {
    let item = getThread(board, thread)
    if (!item) {
      let retreived = await fetchThread(board, thread)
        .catch(() => {
          setThread(board, thread, "not found")
        })
      if (retreived && retreived !== null) {
        setThread(board, thread, retreived)
        return retreived
      } else {
        setThread(board, thread, "not found")
        return "not found"
      }
    }
    return item;
  }

  return {
    subscribe: threadStore.subscribe,
    set: threadStore.set,
    update: threadStore.update,
    reset: () => threadStore.set({}),
    getThread,
    setThread,
    resolveThread,
  }
}

export const threadStore = newThreadStore();