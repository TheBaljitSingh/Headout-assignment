/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3498db',
        'white-alpha': {
          '10': 'rgba(255, 255, 255, 0.1)',
          '20': 'rgba(255, 255, 255, 0.2)',
          '30': 'rgba(255, 255, 255, 0.3)',
          '50': 'rgba(255, 255, 255, 0.5)',
          '70': 'rgba(255, 255, 255, 0.7)',
          '90': 'rgba(255, 255, 255, 0.9)',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      }
    },
  },
  plugins: [],
} 