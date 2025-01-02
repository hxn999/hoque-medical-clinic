/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  theme: {
    extend: {
      
      
      colors:{
        "primary":"#a7e2fd",
        "secondary":"#1b7be3",
        "accent":"#1d31f0"
  
      },
      fontFamily:{
        classic:["Castoro", "serif"]
      }
      ,
    },
  },
  plugins: [],
}

