import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

/** The colour "mood" — a named accent palette applied across the whole app. */
export type Mood = 'setu' | 'clinical' | 'ocean' | 'sunset' | 'violet' | 'graphite' | 'bottle';

export interface MoodOption {
  id: Mood;
  labelBn: string;
  labelEn: string;
  /** Swatch colours for the picker: [primary, highlight]. */
  swatch: [string, string];
}

export const MOODS: MoodOption[] = [
  { id: 'setu', labelBn: 'সেতু নীল (OpenGovt)', labelEn: 'Setu Blue (Official)', swatch: ['#0B4F8A', '#046A38'] },
  { id: 'clinical', labelBn: 'ক্লিনিক্যাল সবুজ', labelEn: 'Clinical Emerald', swatch: ['#046A38', '#0B4F8A'] },
  { id: 'ocean', labelBn: 'সমুদ্র নীল', labelEn: 'Ocean Blue', swatch: ['#0369A1', '#D97706'] },
  { id: 'sunset', labelBn: 'গোধূলি লাল', labelEn: 'Sunset Crimson', swatch: ['#BE123C', '#EA580C'] },
  { id: 'violet', labelBn: 'রয়্যাল বেগুনি', labelEn: 'Royal Violet', swatch: ['#6D28D9', '#DB2777'] },
  { id: 'graphite', labelBn: 'গ্রাফাইট স্লেট', labelEn: 'Graphite Slate', swatch: ['#334155', '#0284C7'] },
  { id: 'bottle', labelBn: 'বটল সবুজ', labelEn: 'Bottle Green', swatch: ['#2C5F43', '#B9552F'] },
];

interface ThemeContextType {
  /** The user's choice, which may be 'system'. */
  theme: Theme;
  /** What is actually painted right now — 'system' already resolved. */
  resolvedTheme: 'light' | 'dark';
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  /** Cycle light -> dark -> system. */
  toggleTheme: () => void;
  mood: Mood;
  setMood: (mood: Mood) => void;
  moods: MoodOption[];
}

const THEME_KEY = 'shasthosetu_theme';
const MOOD_KEY = 'shasthosetu_mood';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const readTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  const saved = window.localStorage.getItem(THEME_KEY);
  return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
};

const readMood = (): Mood => {
  if (typeof window === 'undefined') return 'setu';
  const saved = window.localStorage.getItem(MOOD_KEY);
  return MOODS.some((m) => m.id === saved) ? (saved as Mood) : 'setu';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(readTheme);
  const [mood, setMoodState] = useState<Mood>(readMood);
  const [systemDark, setSystemDark] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Follow the OS while the user has chosen 'system'. Listening unconditionally
  // and resolving below keeps the listener lifecycle simple.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.style.colorScheme = resolvedTheme;
    root.dataset.mood = mood;
    window.localStorage.setItem(THEME_KEY, theme);
    window.localStorage.setItem(MOOD_KEY, mood);

    // Keep the mobile browser chrome in step with the palette.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#0A100D' : MOODS.find((m) => m.id === mood)!.swatch[0]
      );
    }
  }, [theme, mood, resolvedTheme]);

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      resolvedTheme,
      isDark: resolvedTheme === 'dark',
      setTheme: setThemeState,
      toggleTheme: () =>
        setThemeState((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light')),
      mood,
      setMood: setMoodState,
      moods: MOODS,
    }),
    [theme, resolvedTheme, mood]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
