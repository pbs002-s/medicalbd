/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E60EB',
          'blue-dark': '#1349B8',
          'blue-light': '#EBF2FE',
          green: '#16A34A',
          'green-dark': '#15803D',
          'green-light': '#EBFBF0',
          teal: '#0D9488',
          'teal-light': '#E6F5F4',
          navy: '#0F172A',
          slate: '#1E293B',
          red: '#DC2626',
          'red-light': '#FEF2F2',
          amber: '#D97706',
          'amber-light': '#FEF3C7',
          purple: '#9333EA',
          'purple-light': '#F3E8FF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Bengali', 'Hind Siliguri', 'sans-serif'],
        bangla: ['Noto Sans Bengali', 'Hind Siliguri', 'SolaimanLipi', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
