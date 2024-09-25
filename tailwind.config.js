/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF", // White background
        foreground: "#000000", // Black text
        border: "#E5E7EB", // Light gray border for inputs and other elements
        input: "#FFFFFF", // White background for inputs
        ring: "#3B82F6", // Blue ring for focus states
        // Optional: Define primary and secondary colors as needed
        primary: {
          DEFAULT: "#3B82F6", // Primary color (blue)
          foreground: "#FFFFFF", // White text on primary color
        },
        secondary: {
          DEFAULT: "#FBBF24", // Secondary color (yellow)
          foreground: "#000000", // Black text on secondary color
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};
