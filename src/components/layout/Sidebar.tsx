import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
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
  Stethoscope,
  Sparkles
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

  const navItems = [
    { id: 'dashboard', labelBn: 'ড্যাশবোর্ড', labelEn: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', labelBn: 'আমার অ্যাপয়েন্টমেন্ট', labelEn: 'Appointments', icon: Calendar },
    { id: 'live_serial', labelBn: 'লাইভ সিরিয়াল ট্র্যাকার', labelEn: 'Live Serial Tracker', icon: Clock, badge: 'লাইভ' },
    { id: 'prescriptions', labelBn: 'ই-প্রেসক্রিপশন', labelEn: 'e-Prescriptions', icon: FileText },
    { id: 'reports', labelBn: 'রিপোর্ট ও ফলাফল', labelEn: 'Reports & Results', icon: FlaskConical },
    { id: 'health_timeline', labelBn: 'আমার স্বাস্থ্য টাইমলাইন', labelEn: 'Health Timeline', icon: History },
    { id: 'medicines', labelBn: 'ওষুধ ও মূল্য সূচক', labelEn: 'Medicine & Price Index', icon: Pill },
    { id: 'blood_bank', labelBn: 'রক্তদান নেটওয়ার্ক', labelEn: 'Blood Donation', icon: Droplet },
    { id: 'beds', labelBn: 'বেড ও ICU ডিরেক্টরি', labelEn: 'Bed & ICU Directory', icon: BedDouble },
    { id: 'student_hub', labelBn: 'হেলথ রিসোর্স ও শিক্ষার্থী হাব', labelEn: 'Medical Student Hub', icon: GraduationCap, highlight: true },
    ...(activeRole === 'doctor' || activeRole === 'admin'
      ? [{ id: 'rx_builder', labelBn: 'প্রেসক্রিপশন বিল্ডার', labelEn: 'Rx Builder', icon: Sparkles }]
      : []),
    { id: 'tv_display', labelBn: 'ওয়েটিং রুম টিভি ডিসপ্লে', labelEn: 'Waiting Room TV', icon: Tv },
    { id: 'settings', labelBn: 'সেটিংস ও প্রোফাইল', labelEn: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)] py-4 px-3 select-none">
      {/* Navigation List */}
      <div className="space-y-1">
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
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bangla text-xs font-semibold transition-all duration-150 group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                <span className="truncate">{language === 'bn' ? item.labelBn : item.labelEn}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                  isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600 animate-pulse'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Emergency Card & Language Toggle */}
      <div className="pt-4 space-y-3">
        {/* Emergency Help Card */}
        <div className="bg-gradient-to-br from-blue-50 to-teal-50/50 border border-blue-100 rounded-2xl p-3 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1.5 text-slate-700 font-bold text-xs font-bangla mb-0.5">
            <span>জরুরি প্রয়োজনে</span>
          </div>
          <p className="text-[11px] text-slate-500 font-bangla">হেল্পলাইন ২৪/৭</p>
          <a
            href="tel:09678123456"
            className="mt-1.5 inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-white hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl border border-blue-200 text-xs font-bold font-mono shadow-2xs transition-all duration-200"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>09678-123456</span>
          </a>
        </div>

        {/* Bilingual Segmented Toggle */}
        <div className="bg-slate-100/90 p-1 rounded-xl flex items-center text-xs font-bangla font-semibold">
          <button
            onClick={() => setLanguage('bn')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              language === 'bn' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              language === 'en' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            English
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
