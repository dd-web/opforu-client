
/**
 * Resolves an object for creating post link and post link events
 * @param {Element} node - parsed html node
 * @param {string} board - board short (always pass current)
 * @param {string} thread - thread slug (always pass current)
 * @returns {PostLinkData}
 */
export function resolvePostLinkEvent(node, board, thread) {
  const text = node.textContent ?? "";
  const arr = text.split('/');

  /** @type {PostLinkData} */
  let obj = {
    board: board,
    thread: thread,
    post_number: 0,
    link_type: 'post-internal-thread'
  }

  if (isSameThreadLink(arr)) {
    obj.post_number = parseInt(arr[0]);
    return obj;
  }

  if (isSameBoardLink(arr)) {
    obj.thread = arr[0];
    obj.link_type = arr.length === 1 ? 'thread-internal-board' : 'post-internal-board';
    obj.post_number = arr.length === 1 ? 0 : parseInt(arr[1]);
    return obj;
  }

  obj.board = arr[0]
  obj.thread = arr[1];
  obj.post_number = arr.length > 2 ? parseInt(arr[2]) : 0;
  obj.link_type = arr.length > 2 ? 'post-external-board' : 'thread-external-board';

  return obj;
}

/**
 * @param {Array<any>} arr 
 * @returns {boolean} if the provided array has structure for same thread links
 */
const isSameThreadLink = (arr) => {
  return arr && arr.length === 1 && !isNaN(parseInt(arr[0]))
}


/**
 * @param {Array<any>} arr 
 * @returns {boolean} if the provided array has structure pointing to same board links
 */
const isSameBoardLink = (arr) => {
  return arr && arr.length === 1 ? true
    : arr.length > 2 ? false : !isNaN(parseInt(arr[1]))
}