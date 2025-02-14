import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      color1: "#150a33",
      color2: "#1c0950",
      color3: "#fff",
      color4: '#9b51e0',
      color5: "#512fad",
      color6: "rgb(247, 52, 94)",
      color7: "#22c8e5",
      color8: "#a08fc3"
    },
  },
  plugins: [],
} satisfies Config;
