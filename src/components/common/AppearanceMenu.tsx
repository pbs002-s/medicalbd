import React, { useEffect, useRef, useState } from 'react';
import { Check, Languages, Monitor, Moon, Palette, Sun } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme, type Theme } from '../../context/ThemeContext';

/**
 * Language, light/dark mode and colour mood in one popover.
 *
 * Used by the dashboard navbar and the landing page header so the controls sit
 * in the same place whether or not somebody is signed in.
 */
export const AppearanceMenu: React.FC<{ align?: 'left' | 'right' }> = ({ align = 'right' }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, mood, setMood, moods } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on an outside click or Escape — a popover that traps the page is
  // worse than no popover.
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const themeOptions: { id: Theme; labelBn: string; labelEn: string; icon: typeof Sun }[] = [
    { id: 'light', labelBn: 'দিন', labelEn: 'Light', icon: Sun },
    { id: 'dark', labelBn: 'রাত', labelEn: 'Dark', icon: Moon },
    { id: 'system', labelBn: 'সিস্টেম', labelEn: 'System', icon: Monitor },
  ];

  const bn = language === 'bn';

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title={bn ? 'ভাষা, থিম ও রঙ' : 'Language, theme and colour'}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={bn ? 'ভাষা, থিম ও রঙের সেটিংস' : 'Language, theme and colour settings'}
      >
        <Palette className="w-[18px] h-[18px]" />
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={bn ? 'প্রদর্শন সেটিংস' : 'Appearance settings'}
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-72 bg-surface rounded-2xl shadow-card-hover border border-slate-200 dark:border-slate-800 p-4 z-50 space-y-4 animate-slide-down`}
        >
          {/* Language */}
          <section>
            <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              <Languages className="w-3.5 h-3.5" />
              {t('language', bn ? 'ভাষা' : 'Language')}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {(['bn', 'en'] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                  className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                    language === code
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-paper text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {code === 'bn' ? 'বাংলা' : 'English'}
                </button>
              ))}
            </div>
          </section>

          {/* Light / dark / system */}
          <section>
            <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              <Sun className="w-3.5 h-3.5" />
              {bn ? 'মোড' : 'Mode'}
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const active = theme === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    aria-pressed={active}
                    className={`py-2 rounded-xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all ${
                      active
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-paper text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-sans">{bn ? option.labelBn : option.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Colour mood */}
          <section>
            <h4 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              <Palette className="w-3.5 h-3.5" />
              {bn ? 'রঙের মুড' : 'Colour mood'}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {moods.map((option) => {
                const active = mood === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setMood(option.id)}
                    aria-pressed={active}
                    className={`p-2 rounded-xl border flex items-center gap-2 text-left transition-all ${
                      active
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/25'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex shrink-0" aria-hidden="true">
                      <span
                        className="w-3.5 h-3.5 rounded-full ring-1 ring-black/10"
                        style={{ background: option.swatch[0] }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full -ml-1.5 ring-1 ring-black/10"
                        style={{ background: option.swatch[1] }}
                      />
                    </span>
                    <span className="text-[10px] font-bold text-ink font-sans leading-tight flex-1">
                      {bn ? option.labelBn : option.labelEn}
                    </span>
                    {active && <Check className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
