const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'movilM': '360px',
        'movilL': '425px',
        'tableta': '768px',
        'portatil': '1024px',
        'portatilL': '1440px',
        'monitor': '2560px'
      },
      backgroundImage: {
        'loginBanner': "url('./src/assets/img/bgLoginGrande.jpg')"
      },
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
      minWidth: {
        44: '11rem',
      },
      maxWidth: {
        '9xl': '96rem',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms'),
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
}
