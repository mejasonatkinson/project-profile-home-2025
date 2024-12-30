/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-off-white": "var(--color-off-white)",
        "color-off-black": "var(--color-off-black)",
        "color-yellow": "var(--color-yellow)",
        "color-red": "var(--color-red)",
        "color-teal": "var(--color-teal)",
      },
      backgroundImage: {
        'paper-texture': "var(--paper-texture)",
      },
    },
  },
  plugins: [],
}
