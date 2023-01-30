/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'blue-azureRadiance': '#0079FE',
          black: '#191C1F'
        }
      },
      animation: {
        "fade-in-out": "fadeInOut .2s linear both",
        'slide-1':'slide1  3s linear infinite',
        'preLoader':'preLoader 1.2s ease-in-out infinite',
        'ModalB2T': ' ModalB2T .5s forwards',
      },
      keyframes: {
        fadeInOut: {
          "0%": { transform: "translateY(-1em)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        preLoader: {
          "50%": { backgroundSize:'80%'  },
          "100%": { backgroundPosition:'125% 0' },
        },
        ModalB2T: {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
    }
  },
  plugins: [],
}
