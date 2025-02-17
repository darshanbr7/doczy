/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        spin: 'spin 1s linear infinite',
        typing: 'typing 3s steps(40)  infinite',
        blink: 'blink 0.75s step-end infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%': { borderColor: 'transparent' },
          '50%': { borderColor: 'black' },
          '100%': { borderColor: 'transparent' },
        },
      },
    },
  },
  plugins: [],
}