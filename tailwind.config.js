/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary — deep bottle green, replaces Tailwind's default blue
        // everywhere in the app (buttons, links, active states, focus rings).
        blue: {
          50: '#EEF4F0',
          100: '#D6E6DC',
          200: '#AFCEBB',
          300: '#82B096',
          400: '#57906F',
          500: '#3B7554',
          600: '#2C5F43',
          700: '#204833',
          800: '#183726',
          900: '#12291C',
          950: '#0B1F14',
        },
        // Brand accent — muted terracotta/brick, replaces Tailwind's default
        // teal. Used sparingly: live indicators, emergency, highlight chips.
        teal: {
          50: '#FBEEEA',
          100: '#F5D9D0',
          200: '#E8B2A0',
          300: '#DA8A6E',
          400: '#C2673A',
          500: '#B9552F',
          600: '#A8462A',
          700: '#863620',
          800: '#692A19',
          900: '#4F1F13',
          950: '#3A160E',
        },
        // Theme-aware surfaces, driven by CSS variables that flip in .dark.
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Noto Sans Bengali"', 'sans-serif'],
        bangla: ['"Noto Sans Bengali"', 'sans-serif'],
        serif: ['"Source Serif 4"', '"Noto Serif Bengali"', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 2px 0 rgba(15, 23, 20, 0.04), 0 1px 1px -1px rgba(15, 23, 20, 0.04)',
        'card-hover': '0 8px 20px -6px rgba(15, 23, 20, 0.10), 0 4px 8px -4px rgba(15, 23, 20, 0.06)',
        'modal': '0 24px 48px -12px rgba(10, 16, 13, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
