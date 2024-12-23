/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        bgColor: "rgb(var(--color-bg) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        white: "rgb(var(--color-white) / <alpha-value>)",
        ascent: {
          1: "rgb(var(--color-ascent1) / <alpha-value>)",
          2: "rgb(var(--color-ascent2) / <alpha-value>)",
        },
        blue: {
          DEFAULT: "rgb(var(--color-blue) / <alpha-value>)", // Use this for the default `bg-blue`
          500: "#3b82f6", // Custom blue
          700: "#1e40af", // Darker blue
          300: "#93c5fd", // Lighter blue
        },
        green: {
          500: "#22c55e", // Custom green
          600: "#16a34a", // Darker green
        },
        red: {
          500: "#ef4444", // Custom red
          600: "#dc2626", // Darker red
        },
      },
    },
  },
  plugins: [],
};
