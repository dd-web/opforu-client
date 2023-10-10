/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      screens: {
        "1440": "1440px",
      },
      colors: {
        primary: '#61caff',
        "on-primary": '#000000',
        secondary: '#136cfb',
        "on-secondary": '#ffffff',
        tertiary: '#b95cdb',
        "on-tertiary": '#000000',
        success: '#4bc35f',
        "on-success": '#000000',
        warning: '#f0dc56',
        "on-warning": '#000000',
        error: '#d13d3d',
        "on-error": '#ffffff',
        surface: '#2e2e2e',
        "on-surface": '#ffffff',
      }
    },
  },
  plugins: [],
}

