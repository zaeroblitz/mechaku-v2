import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#170645",
        secondary: "#282A37",
        tertiary: "#E7E7E7",
        subtitle: "#282A37",
        "accent-purple": "#806DF4",
        "accent-blue": "#1DA1F2",
        "accent-gray": "#858585",
        "accent-gray-alt": "#737373",
        "form-label": "#908AA0",
        "form-icon": "#6D6D6D",
        "form-input": "#333333",
        "form-positive": "#218F40",
        "form-negative": "#FB6F92",
        "form-placeholder": "#6B6B6B",
        "form-checkbbox": "#2C2C2C",
        "form-background": "#FAFAFA",
        "form-border": "#EBF0ED",
        dark: {
          "100": "#000000",
          "200": "#0F1117",
          "300": "#151821",
          "400": "#212734",
          "500": "#101012",
        },
        light: {
          "400": "#858EAD",
          "500": "#7B8EC8",
          "700": "#DCE3F1",
          "800": "#F4F6F8",
          "850": "#FDFDFD",
          "900": "#FFFFFF",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        lexend: ["var(--font-lexend)"],
        poppins: ["var(--font-poppins)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
