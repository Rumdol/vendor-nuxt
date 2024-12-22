// tailwind.config.js
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.js',
    './nuxt.config.{js,ts}',
    'node_modules/element-plus/es/components/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2EC4B6', // Element Plus primary color
        error: '#F56C6C',
      },
    },
  },
  plugins: [],
};
