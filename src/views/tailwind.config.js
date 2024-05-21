/** @type {import('tailwindcss').Config} */
module.exports = {
  purge:false,
  content: ["./src/views/templates/**.ejs" ],
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

