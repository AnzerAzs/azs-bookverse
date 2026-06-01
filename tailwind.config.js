/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#06140f',
        'dark-card': '#0a1f1a',
        'neon-green': '#00ff99',
        'neon-dark': '#00cc7a',
        'glass': 'rgba(0, 255, 153, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropFilter: {
        'glass': 'backdrop-filter: blur(10px)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 153, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 255, 153, 0.5)',
      },
    },
  },
  plugins: [],
};
