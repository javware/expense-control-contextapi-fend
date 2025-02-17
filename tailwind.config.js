/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 4px 5px hsla(0, 0%, 53%, .4)',
      }
    }
  },
  plugins: [],
}

