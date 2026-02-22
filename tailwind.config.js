/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B1116',
          // Matches Stitch project customColor: #0db9f2
          cyan: '#0db9f2',
          orange: '#FF9F66',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      borderRadius: {
        // Matches Stitch ROUND_EIGHT
        'lg': '0.5rem',  // 8px
        'xl': '0.75rem', // 12px
        '2xl': '1rem',   // 16px
      },
    },
  },
  plugins: [],
}
