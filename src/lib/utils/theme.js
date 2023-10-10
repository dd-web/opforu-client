
/**
 * Sets the theme based on the user's preference
 * only call from the browser
 * @returns {void}
 */
export const setTheme = () => {
  if (localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}