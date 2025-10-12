/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🐛 FIX 1: 'darkMode' must be defined at the root level of the config object,
  // NOT inside theme.extend. This was likely causing your dark mode utilities to fail entirely.
  darkMode: 'class',

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 💡 Suggestion 1: Include the default font for consistency.
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      
      // 💡 Suggestion 2: Define custom keyframes and animations here.
      // This is crucial if your animations were breaking or not being generated.
      // I've added a custom "wiggle" animation as an example.
      keyframes: {
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'fadeIn': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        }
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-in-out forwards',
        // If you were using any custom animations, ensure they are defined here.
      }
    },
  },
  plugins: [],
};
