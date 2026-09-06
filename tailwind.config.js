/** @type {import('tailwindcss').Config} */

// Both brand scales read CSS variables that the colour "mood" swaps at runtime
// (see the [data-mood] blocks in src/index.css). `blue-*` is the primary and
// `teal-*` the highlight — the names are historical, they no longer mean blue
// or teal. Keeping the Tailwind key names means switching a mood repaints every
// existing `bg-blue-600` in the app without editing a single component.
const scale = (name) =>
  Object.fromEntries(
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => [
      step,
      `rgb(var(--${name}-${step}) / <alpha-value>)`,
    ])
  );

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand primary — buttons, links, active states, focus rings.
        primary: scale('accent'),
        blue: scale('accent'),
        emerald: scale('accent'),
        // Brand highlight — live indicators, chips.
        teal: scale('highlight'),
        highlight: scale('highlight'),
        // OpenGovtBD theme tokens
        setu: scale('accent'),
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Inter"', '"Hind Siliguri"', 'system-ui', 'sans-serif'],
        bangla: ['"Hind Siliguri"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(16,24,40,0.04), 0 1px 1px rgba(16,24,40,0.03)',
        'elevation-2': '0 4px 10px rgba(11,79,138,0.07), 0 1px 3px rgba(16,24,40,0.04)',
        'elevation-3': '0 14px 34px rgba(11,79,138,0.14), 0 4px 10px rgba(16,24,40,0.06)',
        card: '0 1px 2px 0 rgba(15, 23, 20, 0.04), 0 1px 1px -1px rgba(15, 23, 20, 0.04)',
        'card-hover': '0 8px 20px -6px rgba(15, 23, 20, 0.10), 0 4px 8px -4px rgba(15, 23, 20, 0.06)',
        modal: '0 24px 48px -12px rgba(10, 16, 13, 0.35)',
      },
      borderRadius: {
        sm: '10px',
        md: '12px',
        lg: '16px',
        xl: '18px',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
