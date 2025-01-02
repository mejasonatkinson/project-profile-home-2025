/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],
        secondary: ['Montserrat', 'sans-serif'],
      },
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
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        'bounce-sm': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
        blink: {
          to: { visibility: 'hidden' },
        },
        flipin: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        wave: 'wave 1s ease-in-out infinite',
        'bounce-sm': 'bounce-sm 0.8s ease-in-out infinite',
        blink: 'blink 0.7s steps(2, start) infinite',
        flipin: 'flipin 0.7s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
