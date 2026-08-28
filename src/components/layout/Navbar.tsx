import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { UserRole } from '../../types';
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Globe,
  UserCheck,
  Stethoscope,
  GraduationCap,
  Shield,
  LogOut,
  Sliders,
  CheckCircle2,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { currentUser, activeRole, switchRole, logout, setActiveView } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      titleBn: 'আপনার সিরিয়াল ১৮ সন্নিকটে',
      descBn: 'ডা. তানভীর হাসানের চেম্বারে এখন সিরিয়াল ১২ চলছে। আর প্রায় ২৫ মিনিট বাকি।',
      timeBn: '৫ মিনিট আগে',
      unread: true
    },
    {
      id: 2,
      titleBn: 'নতুন প্রেসক্রিপশন সংরক্ষিত হয়েছে',
      descBn: '১৬ মে এর ই-প্রেসক্রিপশন এখন আপনার হেলথ ভল্টে দেখার জন্য প্রস্তুত।',
      timeBn: '১ দিন আগে',
      unread: true
    },
    {
      id: 3,
      titleBn: 'ল্যাব রিপোর্ট রেডি (CBC)',
      descBn: 'ল্যাবএইড থেকে আপনার রক্তের সম্পূর্ণ রিপোর্ট আপলোড করা হয়েছে।',
      timeBn: '২ দিন আগে',
      unread: true
    }
  ];

  const roleConfig: Record<UserRole, { labelBn: string; labelEn: string; icon: any; color: string }> = {
    patient: { labelBn: 'রোগী', labelEn: 'Patient', icon: UserCheck, color: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800' },
    doctor: { labelBn: 'চিকিৎসক', labelEn: 'Doctor', icon: Stethoscope, color: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800' },
    student: { labelBn: 'শিক্ষার্থী', labelEn: 'Student', icon: GraduationCap, color: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-800' },
    admin: { labelBn: 'অ্যাডমিন', labelEn: 'Admin', icon: Shield, color: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800' }
  };

  const currentRoleInfo = roleConfig[activeRole];

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div onClick={() => setActiveView('dashboard')}>
          <BrandLogo />
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div
            onClick={() => {
              if (onOpenSearch) onOpenSearch();
              else setActiveView('medicines');
            }}
            className="w-full relative flex items-center bg-paper hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors group"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mr-3 shrink-0" />
            <span className="text-sm font-bangla text-slate-500 dark:text-slate-400 truncate flex-1">
              {t('search_placeholder')}
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-surface border border-slate-200 dark:border-slate-700 rounded-md">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors ${currentRoleInfo.color}`}
              title="ভূমিকা পরিবর্তন করুন (Switch Role)"
            >
              <currentRoleInfo.icon className="w-3.5 h-3.5" />
              <span className="font-bangla">{language === 'bn' ? currentRoleInfo.labelBn : currentRoleInfo.labelEn}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-surface rounded-2xl shadow-card-hover border border-slate-200 dark:border-slate-800 py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bangla">
                  ভূমিকা পরিবর্তন (Demo Roles)
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
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                        isSelected ? 'text-blue-700 dark:text-blue-300 font-semibold bg-blue-50/60 dark:bg-blue-900/20' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="font-bangla">{item.labelBn}</span>
                        <span className="text-slate-400 dark:text-slate-500 text-[10px]">({item.labelEn})</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Night / light mood toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'লাইট মোড (Light mode)' : 'নাইট মোড (Night mode)'}
            aria-label="Toggle light and night mode"
          >
            {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="বিজ্ঞপ্তি"
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-teal-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center ring-2 ring-surface">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface rounded-2xl shadow-card-hover border border-slate-200 dark:border-slate-800 py-3 z-50">
                <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h4 className="font-semibold text-ink font-bangla text-sm">বিজ্ঞপ্তি সমূহ</h4>
                  <span className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer font-bangla hover:underline">সব পঠিত করুন</span>
                </div>
                <div className="divide-y divide-slate-50 dark:divide-slate-800 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 font-bangla leading-tight">{n.titleBn}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla mt-0.5">{n.descBn}</p>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bangla mt-1 block">{n.timeBn}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <button
            onClick={() => setActiveView('forum')}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="মেসেজ / ফোরাম"
          >
            <MessageSquare className="w-[18px] h-[18px]" />
          </button>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative pl-1">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 group-hover:ring-blue-500 transition-all"
              />
              <div className="hidden lg:block text-left pr-1">
                <div className="text-xs font-bold text-ink font-bangla leading-tight">
                  {language === 'bn' ? currentUser?.nameBn : currentUser?.name}
                </div>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 font-bangla capitalize leading-none">
                  {language === 'bn' ? currentRoleInfo.labelBn : currentRoleInfo.labelEn}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 hidden lg:block" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-surface rounded-2xl shadow-card-hover border border-slate-200 dark:border-slate-800 py-2 z-50">
                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-bold text-ink font-bangla">{currentUser?.nameBn}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{currentUser?.phone}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{currentUser?.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveView('health_timeline');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2 font-bangla"
                  >
                    <Sliders className="w-4 h-4 text-slate-400" />
                    প্রোফাইল ও স্বাস্থ্য বিবরণী
                  </button>
                  <button
                    onClick={() => {
                      setLanguage(language === 'bn' ? 'en' : 'bn');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between font-bangla"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-400" />
                      ভাষা (Language)
                    </div>
                    <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                      {language === 'bn' ? 'বাংলা' : 'English'}
                    </span>
                  </button>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-medium text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 flex items-center gap-2 font-bangla"
                  >
                    <LogOut className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    লগআউট করুন
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
