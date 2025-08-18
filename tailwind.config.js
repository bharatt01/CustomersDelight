/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",              // 👈 add this
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'spark': 'spark 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { transform: 'scale(0.9) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1) rotate(15deg)', opacity: '0.5' },
        },
        spark: {
          '0%': { transform: 'translateY(0px) translateX(0px)', opacity: 0.7 },
          '50%': { transform: 'translateY(-10px) translateX(5px)', opacity: 0.3 },
          '100%': { transform: 'translateY(0px) translateX(0px)', opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
};
