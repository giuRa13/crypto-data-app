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
      orange: " #fc5b23",
      orange2: "#e62e00",
      orange3: "#e65400",
      blu: "#0045e6",   
      blu2: "#001fe6",
      grey: "#666",
      darkgrey: "#2f2f2f",
      darkgrey2: "#181818",
      black2: "#080b0c",
    },

    fontSize: {
      sm: "14px", 
      md: "18px", 
      lg: "24px", 
      xl: "32px", 
      xxl: "40px",
      base: "16px",
    },
  },
  plugins: [],
}

