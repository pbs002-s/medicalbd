import React from 'react';
import { useAuth } from '../../context/AuthContext';
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
  Sun,
  Moon
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
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', labelBn: 'ড্যাশবোর্ড', labelEn: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', labelBn: 'আমার অ্যাপয়েন্টমেন্ট', labelEn: 'Appointments', icon: Calendar },
    { id: 'live_serial', labelBn: 'লাইভ সিরিয়াল ট্র্যাকার', labelEn: 'Live Serial Tracker', icon: Clock, badge: 'লাইভ' },
    { id: 'prescriptions', labelBn: 'ই-প্রেসক্রিপশন', labelEn: 'e-Prescriptions', icon: FileText },
    { id: 'reports', labelBn: 'রিপোর্ট ও ফলাফল', labelEn: 'Reports & Results', icon: FlaskConical },
    { id: 'health_timeline', labelBn: 'আমার স্বাস্থ্য টাইমলাইন', labelEn: 'Health Timeline', icon: History },
    { id: 'medicines', labelBn: 'ওষুধ ও মূল্য সূচক', labelEn: 'Medicine & Price Index', icon: Pill },
    { id: 'blood_bank', labelBn: 'রক্তদান নেটওয়ার্ক', labelEn: 'Blood Donation', icon: Droplet },
    { id: 'beds', labelBn: 'বেড ও ICU ডিরেক্টরি', labelEn: 'Bed & ICU Directory', icon: BedDouble },
    { id: 'student_hub', labelBn: 'হেলথ রিসোর্স ও শিক্ষার্থী হাব', labelEn: 'Medical Student Hub', icon: GraduationCap, highlight: true },
    ...(activeRole === 'doctor' || activeRole === 'admin'
      ? [{ id: 'rx_builder', labelBn: 'প্রেসক্রিপশন বিল্ডার', labelEn: 'Rx Builder', icon: Sparkles }]
      : []),
    { id: 'tv_display', labelBn: 'ওয়েটিং রুম টিভি ডিসপ্লে', labelEn: 'Waiting Room TV', icon: Tv },
    { id: 'settings', labelBn: 'সেটিংস ও প্রোফাইল', labelEn: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)] py-4 px-3 select-none transition-colors">
      {/* Navigation List */}
      <div className="space-y-0.5">
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
              className={`w-full flex items-center justify-between pl-3 pr-3.5 py-2.5 border-l-2 font-bangla text-xs font-semibold transition-colors duration-150 group ${
                isActive
                  ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 font-bold'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-300'}`} />
                <span className="truncate">{language === 'bn' ? item.labelBn : item.labelEn}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                  isActive ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200' : 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Emergency Card & Mood Controls */}
      <div className="pt-4 space-y-3">
        {/* Emergency Help Card */}
        <div className="bg-blue-50/60 dark:bg-blue-900/15 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-200 font-bold text-xs font-bangla mb-0.5">
            <span>জরুরি প্রয়োজনে</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bangla">হেল্পলাইন ২৪/৭</p>
          <a
            href="tel:09678123456"
            className="mt-1.5 inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-surface hover:bg-blue-600 text-blue-700 dark:text-blue-300 hover:text-white rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-bold font-mono transition-colors duration-200"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>09678-123456</span>
          </a>
        </div>

        {/* Mood controls: language + night/light, grouped as one preference row */}
        <div className="space-y-1.5">
          <div className="px-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bangla">
            ভাষা ও মোড
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex-1 bg-paper p-1 rounded-xl flex items-center text-xs font-bangla font-semibold border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage('bn')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-colors ${
                  language === 'bn' ? 'bg-surface text-blue-700 dark:text-blue-300 font-bold shadow-card' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-colors ${
                  language === 'en' ? 'bg-surface text-blue-700 dark:text-blue-300 font-bold shadow-card' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                English
              </button>
            </div>
            <button
              onClick={toggleTheme}
              className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-paper text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              title={theme === 'dark' ? 'লাইট মোড' : 'নাইট মোড'}
              aria-label="Toggle light and night mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
