
/**
 * Resolves an object for creating post link and post link events
 * @param {Element} node - parsed html node
 * @param {string} board - board short (always pass current)
 * @param {string} thread - thread slug (always pass current)
 * @returns {PostLinkData}
 */
export function resolvePostLinkEvent(node, board, thread) {
  const type = resolveLinkType(node)
  const text = node.textContent ?? "";
  const arr = text.split('/');

  /** @type {PostLinkData} */
  const obj = {
    board: board,
    thread: thread,
    post_number: 0,
    link_type: type
  }

  switch (type) {
    case 'post-internal-thread':
      obj.post_number = parseInt(text);
      break;
    case 'thread-internal-board':
      obj.thread = text;
      break;
    case 'post-internal-board':
      obj.thread = arr[0];
      obj.post_number = parseInt(arr[1]);
      break;
    case 'thread-external-board':
      obj.board = arr[0];
      obj.thread = arr[1];
      break;
    case 'post-external-board':
      obj.board = arr[0];
      obj.thread = arr[1];
      obj.post_number = parseInt(arr[2]);
      break;
  }

  return obj;
}

/**
 * Resolves post link type from node
 * @param {Element} node - parsed DOM node
 * @returns {PostLinkType} - resolved post link type
 */
function resolveLinkType(node) {
  if (node.classList.contains('post-internal-thread')) return 'post-internal-thread';
  if (node.classList.contains('thread-internal-board')) return 'thread-internal-board'
  if (node.classList.contains('post-internal-board')) return 'post-internal-board'
  if (node.classList.contains('thread-external-board')) return 'thread-external-board'
  return 'post-external-board'
}