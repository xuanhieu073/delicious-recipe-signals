/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,html}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '24px',
      screens: {
        xs: '960px',
        mobile: '960px',
        tablet: '1200px',
        desktop: '1248px',
      },
    },
  },
  plugins: [],
};
