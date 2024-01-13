
/**
 * Click outside svelte action (not svelte-kit)
 * @param {HTMLElement} node 
 */
export function autofocus(node) {
  if (node) {
    node.focus();
  }

  return {
    destroy() {
      node.blur();
    }
  }
}