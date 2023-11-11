
/**
 * Click outside svelte action (not svelte-kit)
 * @param {HTMLElement} node 
 */
export function clickoutside(node) {
  /** @param {any} event */
  const handle = (event) => {
    if (!node.contains(event.target)) {
      node.dispatchEvent(new CustomEvent('clickoutside'))
    }
  };

  document.addEventListener('click', handle, true);

  return {
    destroy() {
      document.removeEventListener('click', handle, true);
    }
  }
}