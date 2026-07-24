import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      colors: {
        ink: "#161616",
        bone: "#f6f1e8",
        mist: "#dfe8e1",
        moss: "#6e7a5d",
        clay: "#b45f44",
        wine: "#5b2636",
        steel: "#7d8a91",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(22, 22, 22, 0.18)",
      },
    },
  },
  plugins: [],
} satisfies Config;
