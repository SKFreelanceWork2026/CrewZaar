/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // IMPORTANT: Disable Tailwind's base styles
  },
  theme: {
    extend: {},
  },
  plugins: [],
}