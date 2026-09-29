/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ncmrwf: {
          dark: '#0a0f1d',
          card: '#111827',
          border: '#1f293d',
          primary: '#3b82f6',
          accent: '#06b6d4',
          warning: '#f59e0b',
          danger: '#ef4444',
          success: '#10b981',
          cyan: '#00f2fe',
          navy: '#060d1f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-spin': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
