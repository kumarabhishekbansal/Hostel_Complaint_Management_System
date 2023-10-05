/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#1565D8",
        dark:{
          hard:"#0D2436",
          soft:"#183B56"
        },
      },
      fontFamily:{
        opensans:["'Open Sans'", "sans-serif"],
        roboto:["'Roboto'", "sans-serif"]
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [], 
    base: false, 
    styled: true, 
    utils: true,  
  },
}

