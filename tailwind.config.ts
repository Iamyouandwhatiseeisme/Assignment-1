/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "selector",
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideIn: {
          "0%": {
            transform: "translateY(-10%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite",
        "slide-in": "slideIn 150ms ease-in-out",
      },
      backgroundImage: {
        "gym-background": "url('/images/Gym Background.jpg')",
        "workout-bg": "url('/images/Workout Background.jpg')",
        gemini: "url('/images/Gemini.jpg')",
        aurora: "url('/images/Aurora.webp')",
        "chatbot-background": "url('/images/Chatbot Background.jpg')",
      },
      colors: {
        "dark-header": "rgb(17, 14, 14)",
        // "header-hover-dark": "rgba(255, 255, 255, 0.2)",
        "header-hover-dark": "#232323",
      },
      transitionProperty: {
        "header-hover-transition": "background-color 0.5s",
      },
      minHeight: {
        wrapper: "calc(100vh - 110px)",
      },
      maxHeight: {
        "40vh": "40vh",
      },
      height: {
        "60vh": "60vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
        150: "650px",
      },

      width: {
        "info-board-hover-width": "550px",
        "60wv": "60vw",
        "95%": "95%",
      },
      scale: {
        1.02: "1.02",
      },
      borderRadius: {
        50: "50px",
      },
      boxShadow: {
        "small-black-shadow": "0 4px 6px rgba(0, 0, 0, 0.1);",
      },
      transitionDelay: {
        0.3: "0.03s",
      },
      transitionDuration: {
        1500: "1500ms",
      },
    },
  },
  plugins: [],
};