import { writable, get } from "svelte/store";

/** @typedef {ReturnType<typeof newPostStore>} PostStore */

function newPostStore() {
  /** @type {import('svelte/store').Writable<IPostStore>} */
  const postStore = writable({})

  /**
   * Gets post from specified board/thread and returns it or null if any dependencies do not exist
   * @param {string} board board short name
   * @param {string} thread thread slug
   * @param {number} postnum post number
   * @returns {IPostStorePost|string?}
   */
  function getPost(board, thread, postnum) {
    let ps = get(postStore);
    if (!ps[board]) return null;
    if (!ps[board][thread]) return null;
    if (!ps[board][thread][postnum]) return null;
    return ps[board][thread][postnum];
  }

  /**
   * Add post to the store under specified board and thread
   * @param {string} board board short name
   * @param {string} thread thread slug
   * @param {number} postnum post number
   * @param {IPostStorePost|string} data post data
   */
  function setPost(board, thread, postnum, data) {
    checkThread(board, thread);
    let ps = get(postStore);
    ps[board][thread][postnum] = typeof data === 'string' ? 'not found' : data;
    postStore.set(ps)
  }

  /**
   * Ensures valid indexing of thread entries
   * @param {string} board board short name
   * @param {string} thread thread slug
   */
  function checkThread(board, thread) {
    checkBoard(board)
    let ps = get(postStore)
    if (!ps[board][thread]) {
      ps[board][thread] = {}
    }
    postStore.set(ps)
  }

  /**
   * Ensures valid indexing of board entries
   * @param {string} board board short name
   */
  function checkBoard(board) {
    let ps = get(postStore);
    if (!ps[board]) {
      ps[board] = {}
    }
    postStore.set(ps);
  }

  /**
   * Fetches post from back end
   * @param {string} thread thread slug
   * @param {number} postnum post number
   * @returns {Promise<IPostLookupData|"not found"?>}
   */
  async function fetchPost(thread, postnum) {
    const qs = new URLSearchParams();
    qs.append('thread', thread);
    qs.append('post', String(postnum));

    return new Promise((res, rej) => {
      fetch(`/api/post?${qs.toString()}`)
        .then((resp) => res(resp.json()))
    })
  }

  /**
   * Resolves a post any way it can be found
   * @param {string} board board short name
   * @param {string} thread thread slug
   * @param {number} postnum post number
   * @returns {Promise<IPostStorePost|string>}
   */
  async function resolvePost(board, thread, postnum) {
    let post = getPost(board, thread, postnum)
    if (!post) {
      let retreived = await fetchPost(thread, postnum)
        .catch(() => {
          setPost(board, thread, postnum, "not found")
        })
      if (retreived && retreived !== null) {
        setPost(board, thread, postnum, retreived)
        return retreived
      } else {
        setPost(board, thread, postnum, "not found")
        return "not found"
      }
    }
    return post
  }

  return {
    /** store implementation methods */
    subscribe: postStore.subscribe,
    set: postStore.set,
    update: postStore.update,
    /** convenience methods */
    reset: () => postStore.set({}),
    getPost,
    setPost,
    resolvePost,
  }
}

export const postStore = newPostStore();