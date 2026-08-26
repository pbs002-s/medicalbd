import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
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
  CheckCircle2
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { currentUser, activeRole, switchRole, logout, setActiveView } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      titleBn: 'আপনার সিরিয়াল ১৮ সন্নিকটে',
      descBn: 'ডা. তানভীর হাসানের চেম্বারে এখন সিরিয়াল ১২ চলছে। আর প্রায় ২৫ মিনিট বাকি।',
      timeBn: '৫ মিনিট আগে',
      unread: true
    },
    {
      id: 2,
      titleBn: 'নতুন প্রেসক্রিপশন সংরক্ষিত হয়েছে',
      descBn: '১৬ মে এর ই-প্রেসক্রিপশন এখন আপনার হেলথ ভল্টে দেখার জন্য প্রস্তুত।',
      timeBn: '১ দিন আগে',
      unread: true
    },
    {
      id: 3,
      titleBn: 'ল্যাব রিপোর্ট রেডি (CBC)',
      descBn: 'ল্যাবএইড থেকে আপনার রক্তের সম্পূর্ণ রিপোর্ট আপলোড করা হয়েছে।',
      timeBn: '২ দিন আগে',
      unread: true
    }
  ];

  const roleConfig: Record<UserRole, { labelBn: string; labelEn: string; icon: any; color: string }> = {
    patient: { labelBn: 'রোগী', labelEn: 'Patient', icon: UserCheck, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    doctor: { labelBn: 'চিকিৎসক', labelEn: 'Doctor', icon: Stethoscope, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    student: { labelBn: 'শিক্ষার্থী', labelEn: 'Student', icon: GraduationCap, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    admin: { labelBn: 'অ্যাডমিন', labelEn: 'Admin', icon: Shield, color: 'bg-amber-50 text-amber-700 border-amber-200' }
  };

  const currentRoleInfo = roleConfig[activeRole];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
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
            className="w-full relative flex items-center bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-full px-4 py-2 text-slate-500 cursor-pointer transition-all shadow-sm group hover:border-blue-400"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors mr-3 shrink-0" />
            <span className="text-sm font-bangla text-slate-500 truncate flex-1">
              {t('search_placeholder')}
            </span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-2xs transition-all hover:shadow-sm ${currentRoleInfo.color}`}
              title="ভূমিকা পরিবর্তন করুন (Switch Role)"
            >
              <currentRoleInfo.icon className="w-3.5 h-3.5" />
              <span className="font-bangla">{language === 'bn' ? currentRoleInfo.labelBn : currentRoleInfo.labelEn}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-bangla">
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
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-50 ${
                        isSelected ? 'text-blue-600 font-semibold bg-blue-50/60' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-slate-500" />
                        <span className="font-bangla">{item.labelBn}</span>
                        <span className="text-slate-400 text-[10px]">({item.labelEn})</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              title="বিজ্ঞপ্তি"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900 font-bangla text-sm">বিজ্ঞপ্তি সমূহ</h4>
                  <span className="text-xs text-blue-600 cursor-pointer font-bangla hover:underline">সব পঠিত করুন</span>
                </div>
                <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-slate-50/80 transition-colors cursor-pointer flex gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-slate-800 font-bangla leading-tight">{n.titleBn}</p>
                        <p className="text-[11px] text-slate-500 font-bangla mt-0.5">{n.descBn}</p>
                        <span className="text-[10px] text-slate-400 font-bangla mt-1 block">{n.timeBn}</span>
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
            className="p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="মেসেজ / ফোরাম"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative pl-1">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-50 transition-colors group"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt={currentUser?.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500 transition-all"
              />
              <div className="hidden lg:block text-left pr-1">
                <div className="text-xs font-bold text-slate-900 font-bangla leading-tight">
                  {language === 'bn' ? currentUser?.nameBn : currentUser?.name}
                </div>
                <div className="text-[11px] font-medium text-slate-500 font-bangla capitalize leading-none">
                  {language === 'bn' ? currentRoleInfo.labelBn : currentRoleInfo.labelEn}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 hidden lg:block" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-sm font-bold text-slate-900 font-bangla">{currentUser?.nameBn}</p>
                  <p className="text-xs text-slate-500">{currentUser?.phone}</p>
                  <p className="text-xs text-slate-400 truncate">{currentUser?.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveView('health_timeline');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-bangla"
                  >
                    <Sliders className="w-4 h-4 text-slate-400" />
                    প্রোফাইল ও স্বাস্থ্য বিবরণী
                  </button>
                  <button
                    onClick={() => {
                      setLanguage(language === 'bn' ? 'en' : 'bn');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between font-bangla"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-400" />
                      ভাষা (Language)
                    </div>
                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                      {language === 'bn' ? 'বাংলা' : 'English'}
                    </span>
                  </button>
                </div>
                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 font-bangla"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
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
