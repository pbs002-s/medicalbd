import React from 'react';
import { useAuth } from '../../context/AuthContext';
import type { AppView } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  FileText,
  FlaskConical,
  History,
  Pill,
  Droplet,
  BedDouble,
  GraduationCap,
  Settings,
  PhoneCall,
  Tv,
  Sparkles,
  Home,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  onOpenLiveQueue?: () => void;
  onOpenPrescriptions?: () => void;
  onOpenReports?: () => void;
  onOpenAppointments?: () => void;
  onOpenMedicines?: () => void;
  onOpenBloodBank?: () => void;
  onOpenBeds?: () => void;
  onOpenStudentHub?: () => void;
  onOpenTVDisplay?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { activeView, setActiveView, activeRole } = useAuth();
  const { language, tr, isBn } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navItems: {
    id: AppView;
    labelEn: string;
    labelBn: string;
    icon: any;
    badgeEn?: string;
    badgeBn?: string;
    highlight?: boolean;
  }[] = [
    { id: 'dashboard', labelEn: 'Dashboard', labelBn: 'ড্যাশবোর্ড', icon: LayoutDashboard },
    { id: 'landing', labelEn: 'Public Overview', labelBn: 'পাবলিক হোম', icon: Home },
    { id: 'appointments', labelEn: 'Appointments', labelBn: 'আমার অ্যাপয়েন্টমেন্ট', icon: Calendar },
    { id: 'live_serial', labelEn: 'Live Serial Tracker', labelBn: 'লাইভ সিরিয়াল ট্র্যাকার', icon: Clock, badgeEn: 'LIVE', badgeBn: 'লাইভ' },
    { id: 'prescriptions', labelEn: 'e-Prescriptions', labelBn: 'ই-প্রেসক্রিপশন', icon: FileText },
    { id: 'reports', labelEn: 'Diagnostic Reports', labelBn: 'রিপোর্ট ও ফলাফল', icon: FlaskConical },
    { id: 'health_timeline', labelEn: 'Health Timeline', labelBn: 'স্বাস্থ্য টাইমলাইন', icon: History },
    { id: 'medicines', labelEn: 'Medicine & Price Index', labelBn: 'ওষুধ ও মূল্য সূচক', icon: Pill },
    { id: 'blood_bank', labelEn: 'Blood Donation', labelBn: 'রক্তদান নেটওয়ার্ক', icon: Droplet },
    { id: 'beds', labelEn: 'Bed & ICU Directory', labelBn: 'বেড ও ICU ডিরেক্টরি', icon: BedDouble },
    { id: 'student_hub', labelEn: 'Medical Student Hub', labelBn: 'মেডিকেল শিক্ষার্থী হাব', icon: GraduationCap, highlight: true },
    ...(activeRole === 'doctor' || activeRole === 'admin'
      ? [{ id: 'rx_builder' as const, labelEn: 'Rapid Rx Builder', labelBn: 'প্রেসক্রিপশন বিল্ডার', icon: Sparkles, badgeEn: 'PRO', badgeBn: 'প্রো' }]
      : []),
    { id: 'tv_display', labelEn: 'Waiting Room TV', labelBn: 'ওয়েটিং রুম টিভি ডিসপ্লে', icon: Tv },
    { id: 'settings', labelEn: 'Settings & Profile', labelBn: 'সেটিংস ও প্রোফাইল', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col justify-between shrink-0 min-h-[calc(100vh-65px)] py-4 px-3 select-none transition-colors">
      {/* Navigation List */}
      <div className="space-y-1">
        <div className="px-3 pb-2 text-[10.5px] font-bold text-muted uppercase tracking-wider font-mono">
          {tr('Platform Navigation', 'মূল মেনু')}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeView === item.id ||
            (item.id === 'student_hub' &&
              ['student_hub', 'student_logbook', 'student_osce', 'student_dose', 'student_quiz', 'student_forum', 'forum'].includes(activeView));

          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/25'
                  : 'text-ink hover:text-blue-600 dark:hover:text-blue-400 hover:bg-paper'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'text-muted group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }`}
                />
                <span className="truncate">{isBn ? item.labelBn : item.labelEn}</span>
              </div>

              {(item.badgeEn || item.badgeBn) && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                  }`}
                >
                  {isBn ? item.badgeBn : item.badgeEn}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Emergency Card (100% localized, OpenGovtBD card style) */}
      <div className="pt-4">
        <div className="card card-pad-sm border border-border bg-paper rounded-2xl text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-ink font-bold text-xs">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>{tr('Emergency Hotlines', 'জরুরি হেল্পলাইন')}</span>
          </div>

          <p className="text-[11px] text-muted leading-tight">
            {tr('24/7 National Health Service (Free)', 'সার্বক্ষণিক স্বাস্থ্য বাতায়ন (টোল-ফ্রি)')}
          </p>

          <a
            href="tel:16263"
            className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 bg-surface hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl border border-border text-xs font-bold font-mono transition-all shadow-2xs group"
          >
            <PhoneCall className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
            <span>{tr('Dial 16263', '১৬২৬৩ ডায়াল করুন')}</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
