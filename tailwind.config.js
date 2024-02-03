/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#265073',
        'secondery': '#508D69',
        'ternery': '#99B7FD',
        'four': '#2C234E',
        'fifth': '#4079FF',
        'six': '#0766AD',
        'seven': '#F0F2F5',
        'eight': '#FFFFFF',
      },
      fontFamily:{
         'Oswald':['Oswald' ,'sans-serif'],
         'Poppins':['Poppins', 'sans-serif'] 
      }
    },
  },
  plugins: [
    
  ],
}
