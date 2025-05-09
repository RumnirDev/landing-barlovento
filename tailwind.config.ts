import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        waveMotion: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(0) rotate(-0.5deg)' },
          '75%': { transform: 'translateY(5px) rotate(0.5deg)' },
        },
      },
      animation: {
        'wave-slow': 'waveMotion 5s linear infinite',
        'wave-medium': 'waveMotion 4s linear infinite',
        'wave-fast': 'waveMotion 3s linear infinite',
      },
    },
  },
  plugins: []
};
export default config;
