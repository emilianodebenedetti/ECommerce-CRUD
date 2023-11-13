/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        'grey': '#e8e8e8', // Define un color de fondo personalizado
        'crema': '#fffbeb', 
        'negro': '#080707',
        'rojo': '#cb3234'
      },
    },
  },
  plugins: [require("daisyui")],
}

