/** @type {import('tailwindcss').Config} */
module.exports = {
  purge:false,
  content: ["./src/public/Chat/index.html","./src/public/Chat/register.html"],
  theme: {
    extend: {
      colors:{
        'primary':'#f3c614',
        'secondary':'#353535'
      }
    },
  },
  plugins: [],
}

