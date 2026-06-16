/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--text-h)",
        background: "var(--bg)",
        muted: {
          foreground: "var(--text)",
        },
        secondary: {
          DEFAULT: "var(--code-bg)",
          foreground: "var(--text-h)",
          hover: "var(--border)",
        }
      }
    },
  },
  plugins: [],
}
