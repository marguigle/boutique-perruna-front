/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta primaria con MAYOR CONTRASTE
        beige: {
          50: "#fef9f3",
          100: "#fde8d3",
          200: "#fbd8a8",
          300: "#f9c77c",
          400: "#f7b451",
          500: "#d99700", // Más oscuro y saturado
          600: "#b37a00",
          700: "#8d5f00",
          800: "#664500",
          900: "#402a00",
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#ea580c", // Más saturado
          600: "#c2410c",
          700: "#9a3412",
          800: "#7c2d12",
          900: "#431407",
        },
        yellow: {
          50: "#fefce8",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#f59e0b", // Más saturado
          500: "#d97706", // Más oscuro
          600: "#b45309",
          700: "#92400e",
          800: "#78350f",
          900: "#451a03",
        },
        // Colores neutrales sofisticados con contraste
        warm: {
          50: "#faf8f4",
          100: "#f5ede3",
          200: "#ecdcc7",
          300: "#dcc4a8",
          400: "#cc9d7a",
          500: "#a8704f", // Más oscuro
          600: "#8a5a3a",
          700: "#6b452b",
          800: "#4d311f",
          900: "#2f1d12",
        },
      },
      backgroundImage: {
        "gradient-warm":
          "linear-gradient(135deg, #d99700 0%, #ea580c 50%, #f59e0b 100%)",
        "gradient-soft":
          "linear-gradient(135deg, #fef9f3 0%, #fff7ed 50%, #fef3c7 100%)",
        "gradient-modern": "linear-gradient(135deg, #d99700 0%, #f59e0b 100%)",
        "gradient-button": "linear-gradient(135deg, #ea580c 0%, #d99700 100%)",
      },
      boxShadow: {
        soft: "0 4px 6px rgba(217, 151, 0, 0.15)",
        warm: "0 8px 16px rgba(234, 88, 12, 0.2)",
        elevated: "0 12px 24px rgba(217, 151, 0, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "bounce-soft": "bounceSoft 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      transition: {
        DEFAULT: "all 0.3s ease-in-out",
        fast: "all 0.2s ease-in-out",
        smooth: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
