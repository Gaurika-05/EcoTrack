/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ecoDark: '#0f172a',
        ecoGreen: '#10b981',
        ecoLight: '#f8fafc'
      }
    },
  },
  plugins: [],
}

