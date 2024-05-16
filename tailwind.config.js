/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,}",
  ],
  theme: {
    extend: {
      fontFamily: { nunito: "Nunito"},
    },

    colors: {
      gray: { 100: "#aaaaaa", 200: "#323232", 300: "#212121" },
      white: "#fff",
      cyan: "#14ffec",
      red: "#d6436e",
      green: "#25da72",   
      orange: "#e62e00",
      orange2: "#ff3300",
      orange3: "#e65400",
      blu: "#0045e6",   
      blu2: "#001fe6",
    },

    fontSize: {
      sm: "14px", 
      md: "18px", 
      lg: "24px", 
      xl: "32px", 
      base: "16px",
    },
  },
  plugins: [],
}

