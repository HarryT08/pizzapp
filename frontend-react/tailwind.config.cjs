/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '5px 5px 10px rgba(0, 0, 0, 0.25)'
      },
      boxShadow: {
        '3xl': '0 8px 24px rgba(149, 157, 165, 0.5)',
      },
      colors: {
        'azul-marino': '#3366FF',
        'verde-profundo': '#008000',
        'naranja-vivido': '#FFA500',
        'rojo-fuerte': '#D00000'
      },
    },
  },
  plugins: [],
}
