/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'pastel-blue': {
          100: '#E6F0FF', // Light pastel blue
        },
        'pastel-purple': {
          100: '#F3E8FF', // Light pastel purple
        },
    },
  },
  plugins: [],
}
}
