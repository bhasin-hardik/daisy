/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      'Actor': ['Actor', 'sans-serif'],
      
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

