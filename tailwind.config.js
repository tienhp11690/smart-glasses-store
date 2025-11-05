/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",        // nhạt, viền
        background: "#ffffff",    // nền trắng
        foreground: "#111827",    // chữ đen
        primary: "#2563eb",       // xanh chủ đạo
        secondary: "#6b7280",     // xám phụ
      },
    },
  },
  plugins: [],
}