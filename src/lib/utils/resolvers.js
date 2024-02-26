import { nanoid } from 'nanoid'


/**
 * Resolves an object for creating post link and post link events
 * @param {Element} node - parsed html node
 * @param {string} board - board short (always pass current)
 * @param {string} thread - thread slug (always pass current)
 * @returns {IPostLinkData}
 */
export function resolvePostLinkEvent(node, board, thread) {
  const type = resolveLinkType(node)
  const text = node.textContent ?? "";
  const arr = text.split('/');

  /** @type {IPostLinkData} */
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
 * @returns {keyof typeof EPostLinkType} - resolved post link type
 */
function resolveLinkType(node) {
  if (node.classList.contains('post-internal-thread')) return 'post-internal-thread';
  if (node.classList.contains('thread-internal-board')) return 'thread-internal-board'
  if (node.classList.contains('post-internal-board')) return 'post-internal-board'
  if (node.classList.contains('thread-external-board')) return 'thread-external-board'
  return 'post-external-board'
}


/**
 * Creates a pagination object with default values
 * @returns {IPaginator} default pagination object
 */
export function defaultPaginator() {
  return {
    current_page: 1,
    page_size: 10,
    total_pages: 1,
    total_records: 10,
    last_page: 1,
    last_page_size: 10,
  }
}


/**
 * New action bar button item
 * @param {string} event_name - if emit is true, will emit an event with this name to parent of ContentActionBar
 * @param {any} event_data - data to pass along when emitting the event
 * @param {string} text - action button display text
 * @returns {IActionBarItem}
 */
export function newActionBarItem(event_name, event_data, text = 'ActionButton') {
  return {
    id: nanoid(),
    event_name,
    text,
    event_data
  }
}

