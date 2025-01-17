/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        grow: "grow 0.5s ease-in-out forwards",
        shrink: "shrink 0.5s ease-in-out forwards",
      },
      keyframes: {
        grow: {
          "0%": {
            width: "100%",
            height: "auto",
            transform: "translate(0, 0)",
          },
          "100%": {
            width: "500px",
            height: "500px",
            transform: "translate(-50%, -50%)",
          },
        },
        shrink: {
          "0%": {
            width: "500px",
            height: "500px",
            transform: "translate(-50%, -50%)",
          },
          "100%": {
            width: "100%",
            height: "auto",
            transform: "translate(0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
}

