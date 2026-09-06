import React, { useState, useRef, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Palette,
  ChevronDown,
  UserCheck,
  Stethoscope,
  GraduationCap,
  Shield,
  LogOut,
  Sliders,
  Check,
  Home,
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { currentUser, activeRole, switchRole, logout, setActiveView } = useAuth();
  const { language, setLanguage, t, tr, isBn } = useLanguage();
  const { theme, setTheme, resolvedTheme, toggleTheme, mood, setMood, moods } = useTheme();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isMoodOpen, setIsMoodOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const moodRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setIsRoleMenuOpen(false);
      }
      if (moodRef.current && !moodRef.current.contains(e.target as Node)) {
        setIsMoodOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const notifications = [
    {
      id: 1,
      title: tr('Your Serial #18 is Approaching', 'আপনার সিরিয়াল ১৮ সন্নিকটে'),
      desc: tr('Dr. Tanveer Hassan is now calling token #12. Approx 20 mins remaining.', 'ডা. তানভীর হাসানের চেম্বারে এখন সিরিয়াল ১২ চলছে। আর প্রায় ২০ মিনিট বাকি।'),
      time: tr('5 mins ago', '৫ মিনিট আগে'),
      unread: true
    },
    {
      id: 2,
      title: tr('New e-Prescription Saved', 'নতুন প্রেসক্রিপশন সংরক্ষিত হয়েছে'),
      desc: tr('Your recent clinical prescription is now available in your Health Vault.', 'সাম্প্রতিক ডিজিটাল প্রেসক্রিপশন আপনার হেলথ ভল্টে দেখার জন্য প্রস্তুত।'),
      time: tr('1 day ago', '১ দিন আগে'),
      unread: true
    },
    {
      id: 3,
      title: tr('Lab Report Ready (CBC Panel)', 'ল্যাব রিপোর্ট রেডি (CBC)'),
      desc: tr('Diagnostic report uploaded from LabAid Diagnostic Center.', 'ল্যাবএইড থেকে আপনার রক্তের সম্পূর্ণ রিপোর্ট আপলোড করা হয়েছে।'),
      time: tr('2 days ago', '২ দিন আগে'),
      unread: false
    }
  ];

  const roleConfig: Record<UserRole, { labelBn: string; labelEn: string; icon: any; colorClass: string }> = {
    patient: {
      labelBn: 'রোগী',
      labelEn: 'Patient',
      icon: UserCheck,
      colorClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800'
    },
    doctor: {
      labelBn: 'চিকিৎসক',
      labelEn: 'Doctor',
      icon: Stethoscope,
      colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800'
    },
    student: {
      labelBn: 'শিক্ষার্থী',
      labelEn: 'Student',
      icon: GraduationCap,
      colorClass: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-800'
    },
    admin: {
      labelBn: 'অ্যাডমিন',
      labelEn: 'Admin',
      icon: Shield,
      colorClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800'
    }
  };

  const currentRoleInfo = roleConfig[activeRole];

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border px-4 lg:px-8 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Public Home link */}
        <div className="flex items-center gap-3">
          <div onClick={() => setActiveView('dashboard')} className="cursor-pointer">
            <BrandLogo />
          </div>

          <button
            onClick={() => setActiveView('landing')}
            className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-muted hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-paper transition-colors"
            title={tr('View Public Landing Page', 'পাবলিক হোম পেজ দেখুন')}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{tr('Public Home', 'হোম পেজ')}</span>
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div
            onClick={() => {
              if (onOpenSearch) onOpenSearch();
              else setActiveView('medicines');
            }}
            className="w-full relative flex items-center bg-paper hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-border rounded-xl px-3.5 py-2 text-muted cursor-pointer transition-colors group"
          >
            <Search className="w-4 h-4 text-muted group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mr-2.5 shrink-0" />
            <span className="text-xs sm:text-sm text-muted truncate flex-1 font-sans">
              {t('search_placeholder')}
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-muted bg-surface border border-border rounded-md shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher Pill (Direct 1-click toggle, OpenGovtBD style) */}
          <div className="flex items-center bg-paper border border-border p-0.5 rounded-xl shadow-2xs text-xs font-bold select-none">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-2.5 py-1 rounded-lg transition-all font-bangla ${
                language === 'bn'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
              title="বাংলা ভাষায় দেখুন"
            >
              বাং
            </button>
          </div>

          {/* Theme Mode Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-muted hover:text-ink hover:bg-paper border border-border transition-colors shadow-2xs"
            title={resolvedTheme === 'dark' ? tr('Switch to Light Mode', 'লাইট মোডে যান') : tr('Switch to Dark Mode', 'ডার্ক মোডে যান')}
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Colour Mood Picker Popover */}
          <div className="relative" ref={moodRef}>
            <button
              onClick={() => setIsMoodOpen(!isMoodOpen)}
              className="p-2 rounded-xl text-muted hover:text-blue-600 dark:hover:text-blue-400 hover:bg-paper border border-border transition-colors shadow-2xs flex items-center gap-1.5"
              title={tr('Change Colour Theme', 'রঙের থিম পরিবর্তন করুন')}
              aria-label="Colour theme mood"
            >
              <Palette className="w-4 h-4 text-blue-600" />
              <span
                className="w-2.5 h-2.5 rounded-full ring-1 ring-black/20"
                style={{ background: moods.find((m) => m.id === mood)?.swatch[0] || '#0B4F8A' }}
              />
            </button>

            {isMoodOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-surface rounded-2xl shadow-card-hover border border-border p-3.5 z-50 animate-slide-down">
                <div className="flex items-center justify-between pb-2 border-b border-border mb-2.5">
                  <div className="text-xs font-bold text-ink flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-blue-600" />
                    <span>{tr('Accent Colour Mood', 'রঙের থিম মুড')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {moods.map((option) => {
                    const active = mood === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          setMood(option.id);
                          setIsMoodOpen(false);
                        }}
                        className={`p-2 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                          active
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/25 shadow-2xs font-bold'
                            : 'border-border bg-paper hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium'
                        }`}
                      >
                        <span className="flex shrink-0">
                          <span
                            className="w-4 h-4 rounded-full ring-1 ring-black/10"
                            style={{ background: option.swatch[0] }}
                          />
                          <span
                            className="w-4 h-4 rounded-full -ml-1.5 ring-1 ring-black/10"
                            style={{ background: option.swatch[1] }}
                          />
                        </span>
                        <span className="text-xs text-ink flex-1">
                          {isBn ? option.labelBn : option.labelEn}
                        </span>
                        {active && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Pill */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs ${currentRoleInfo.colorClass}`}
              title={tr('Switch Workspace Role', 'ভূমিকা পরিবর্তন করুন')}
            >
              <currentRoleInfo.icon className="w-3.5 h-3.5 shrink-0" />
              <span>{isBn ? currentRoleInfo.labelBn : currentRoleInfo.labelEn}</span>
              <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-surface rounded-2xl shadow-card-hover border border-border py-2 z-50 animate-slide-down">
                <div className="px-3 py-1.5 text-[11px] font-bold text-muted uppercase tracking-wider">
                  {tr('Demo Roles', 'ভূমিকা পরিবর্তন')}
                </div>
                {(Object.keys(roleConfig) as UserRole[]).map((role) => {
                  const item = roleConfig[role];
                  const Icon = item.icon;
                  const isSelected = activeRole === role;
                  return (
                    <button
                      key={role}
                      onClick={() => {
                        switchRole(role);
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors hover:bg-paper ${
                        isSelected
                          ? 'text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/20'
                          : 'text-ink font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-muted" />
                        <span>{isBn ? item.labelBn : item.labelEn}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-xl text-muted hover:text-ink hover:bg-paper border border-border transition-colors shadow-2xs"
              title={t('notifications')}
              aria-label={t('notifications')}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-surface">
                {isBn ? '২' : '2'}
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface rounded-2xl shadow-card-hover border border-border py-3 z-50 animate-slide-down">
                <div className="px-4 pb-2 border-b border-border flex items-center justify-between">
                  <h4 className="font-bold text-ink text-xs sm:text-sm">
                    {t('notifications')}
                  </h4>
                  <span className="text-xs text-blue-600 hover:underline cursor-pointer font-medium">
                    {t('mark_all_read')}
                  </span>
                </div>
                <div className="divide-y divide-border max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-paper transition-colors cursor-pointer flex gap-2.5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.unread ? 'bg-blue-600' : 'bg-transparent'}`} />
                      <div>
                        <p className="text-xs font-bold text-ink leading-tight">{n.title}</p>
                        <p className="text-[11.5px] text-muted mt-0.5">{n.desc}</p>
                        <span className="text-[10px] text-muted mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile & Account Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-paper border border-border transition-colors shadow-2xs"
              aria-label="User profile menu"
            >
              <div className="hidden sm:block text-right leading-none">
                <div className="text-xs font-bold text-ink truncate max-w-[110px]">
                  {isBn ? currentUser?.nameBn || currentUser?.name : currentUser?.name || currentUser?.nameBn}
                </div>
                <div className="text-[10px] font-medium text-muted mt-0.5">
                  {isBn ? currentRoleInfo.labelBn : currentRoleInfo.labelEn}
                </div>
              </div>
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt="Profile"
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-border"
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-surface rounded-2xl shadow-card-hover border border-border py-2 z-50 animate-slide-down">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-xs font-bold text-ink">
                    {isBn ? currentUser?.nameBn || currentUser?.name : currentUser?.name || currentUser?.nameBn}
                  </p>
                  <p className="text-[11px] text-muted truncate">{currentUser?.email}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveView('settings');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-ink hover:bg-paper transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5 text-muted" />
                    <span>{t('settings')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveView('landing');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-ink hover:bg-paper transition-colors"
                  >
                    <Home className="w-3.5 h-3.5 text-muted" />
                    <span>{tr('Public Home Page', 'পাবলিক হোম পেজ')}</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-border">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
