import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useQueue } from '../../context/QueueContext';
import { mockAppointments } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Clock,
  ArrowLeft,
  ChevronRight,
  Volume2,
  Bell,
  MapPin,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Printer,
  Sparkles,
  Stethoscope,
  PhoneCall
} from 'lucide-react';

interface LiveSerialPageProps {
  onBack?: () => void;
}

export const LiveSerialPage: React.FC<LiveSerialPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();
  const {
    currentSerial,
    patientSerial,
    totalTokens,
    estimatedMinutes,
    doctorStatusBn,
    doctorStatusEn,
    doctorNameBn,
    doctorNameEn,
    doctorSpecialtyBn,
    doctorSpecialtyEn,
    chamberBn,
    chamberEn,
    lastUpdatedBn,
    lastUpdatedEn
  } = useQueue();

  const [isSmsEnabled, setIsSmsEnabled] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const primaryAppointment = mockAppointments[0];

  const queueList = [
    { token: 11, nameEn: 'Zakir Hossain', nameBn: 'জাকির হোসেন', statusEn: 'Completed', statusBn: 'সম্পন্ন', time: '10:45 AM', isPast: true },
    { token: 12, nameEn: 'Asif Karim', nameBn: 'আসিফ করিম', statusEn: 'In Chamber', statusBn: 'এখন চেম্বারে', time: '11:00 AM', isCurrent: true },
    { token: 13, nameEn: 'Fatema Begum', nameBn: 'ফাতেমা বেগম', statusEn: 'Next Patient', statusBn: 'পরবর্তী ডাক', time: '11:15 AM', isNext: true },
    { token: 14, nameEn: 'Md. Rafiqul', nameBn: 'মোঃ রফিকুল', statusEn: 'Waiting', statusBn: 'অপেক্ষমাণ', time: '11:30 AM', isWaiting: true },
    { token: 15, nameEn: 'Tanjina Akter', nameBn: 'তানজিনা আক্তার', statusEn: 'Waiting', statusBn: 'অপেক্ষমাণ', time: '11:45 AM', isWaiting: true },
    { token: 16, nameEn: 'Abdul Quadir', nameBn: 'আব্দুল কাদির', statusEn: 'Waiting', statusBn: 'অপেক্ষমাণ', time: '12:00 PM', isWaiting: true },
    { token: 17, nameEn: 'Meherunnesa', nameBn: 'মেহেরুন্নেসা', statusEn: 'Waiting', statusBn: 'অপেক্ষমাণ', time: '12:10 PM', isWaiting: true },
    { token: 18, nameEn: 'Salman Ahmed (You)', nameBn: 'সালমান আহমেদ (আপনি)', statusEn: 'Your Token', statusBn: 'আপনার সিরিয়াল', time: '12:20 PM', isUser: true },
  ];

  const handlePlayVoiceAnnouncement = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      const text = isBn
        ? `টোকেন নম্বর ${currentSerial}, চেম্বারে আসুন`
        : `Token number ${currentSerial}, please enter the chamber`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isBn ? 'bn-BD' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setIsPlayingAudio(false), 2500);
  };

  const progressPercentage = Math.min(100, Math.round((currentSerial / totalTokens) * 100));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Breadcrumb & Header */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack ? onBack() : setActiveView('dashboard')}
              className="p-2 rounded-xl bg-paper hover:bg-slate-100 dark:hover:bg-slate-800 text-muted hover:text-ink transition-colors border border-border"
              title={tr('Back to Dashboard', 'ড্যাশবোর্ডে ফিরে যান')}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-muted font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  {tr('Dashboard', 'ড্যাশবোর্ড')}
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-blue-600 font-semibold">{tr('Live Serial Tracker', 'লাইভ সিরিয়াল ট্র্যাকার')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5 flex items-center gap-2">
                <span>{tr('Live Chamber Serial Monitor', 'লাইভ চেম্বার সিরিয়াল মনিটর')}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              </h1>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayVoiceAnnouncement}
              disabled={isPlayingAudio}
              className="btn btn-outline py-2 px-3 text-xs font-bold flex items-center gap-1.5"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-blue-600' : ''}`} />
              <span>{isPlayingAudio ? tr('Playing Announcement...', 'ঘোষণা বাজছে...') : tr('Voice Chime Test', 'টোকেন অডিও টেস্ট')}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="btn btn-outline p-2 text-xs"
              title={tr('Print Token', 'টোকেন প্রিন্ট করুন')}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Columns: Real-Time Live Serial Board */}
        <div className="lg:col-span-7 space-y-6">
          <ScrollReveal animation="fade-up" duration={450}>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-elevation-3 border border-slate-700 relative overflow-hidden">
              {/* Chamber & Doctor info */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <img
                    src={primaryAppointment.doctorAvatar}
                    alt="Doctor"
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-400/40"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">
                      <span>{isBn ? doctorNameBn : doctorNameEn}</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">{isBn ? doctorSpecialtyBn : doctorSpecialtyEn}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{isBn ? chamberBn : chamberEn} • {isBn ? primaryAppointment.doctorHospitalBn : primaryAppointment.doctorHospital}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isBn ? doctorStatusBn : doctorStatusEn}</span>
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    {tr('Updated', 'আপডেট')}: {isBn ? lastUpdatedBn : lastUpdatedEn}
                  </div>
                </div>
              </div>

              {/* Serial Metric Counters Grid */}
              <div className="grid grid-cols-3 gap-3 text-center py-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 backdrop-blur-xs relative z-10">
                {/* Current Serial */}
                <div className="p-2">
                  <span className="text-[11px] text-slate-400 block font-medium">
                    {tr('Now Calling', 'চলতি সিরিয়াল')}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight my-1 block">
                    #{num(String(currentSerial).padStart(2, '0'))}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    {tr('In Chamber', 'চেম্বারের ভেতরে')}
                  </span>
                </div>

                {/* Patient Serial */}
                <div className="p-2 border-x border-slate-700/80">
                  <span className="text-[11px] text-blue-300 block font-bold">
                    {tr('Your Serial', 'আপনার সিরিয়াল')}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-blue-400 font-mono tracking-tight my-1 block">
                    #{num(String(patientSerial).padStart(2, '0'))}
                  </span>
                  <span className="text-[10px] text-blue-200 font-semibold bg-blue-900/60 px-2 py-0.5 rounded-md">
                    {tr(`${num(Math.max(0, patientSerial - currentSerial))} patients ahead`, `আর ${num(Math.max(0, patientSerial - currentSerial))} জন বাকি`)}
                  </span>
                </div>

                {/* Estimated Wait Time */}
                <div className="p-2">
                  <span className="text-[11px] text-amber-300 block font-medium">
                    {tr('Estimated Wait', 'আনুমানিক অপেক্ষার সময়')}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight my-1 block">
                    ~{num(estimatedMinutes)}
                  </span>
                  <span className="text-[10px] text-amber-200 font-semibold bg-amber-950/60 px-2 py-0.5 rounded-md">
                    {tr('minutes remaining', 'মিনিট বাকি')}
                  </span>
                </div>
              </div>

              {/* Progress Bar with Percentage */}
              <div className="space-y-2 mt-6 relative z-10">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>
                    {tr('Queue Progress', 'সিরিয়াল অগ্রগতি')}: {num(currentSerial)} / {num(totalTokens)}
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    {num(progressPercentage)}% {tr('Completed', 'সম্পন্ন')}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Patient Advice Warning */}
              <div className="mt-6 p-3 rounded-2xl bg-blue-950/70 border border-blue-800/60 text-blue-200 text-xs flex items-start gap-2.5 relative z-10">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  {tr(
                    'Please arrive at the clinic waiting zone at least 15 minutes before your estimated time. You will receive SMS alerts when your token is 3 spots away.',
                    'আপনার সিরিয়ালের অন্তত ১৫ মিনিট পূর্বে ওয়েটিং জোনে উপস্থিত থাকার অনুরোধ করা হচ্ছে। আপনার ডাক আসলে এসএমএস ও অডিও অ্যালার্ট পাওয়া যাবে।'
                  )}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Notification Settings */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-xs sm:text-sm">
                    {tr('SMS & Push Notification Alert', 'এসএমএস ও পুশ নোটিফিকেশন অ্যালার্ট')}
                  </h4>
                  <p className="text-[11px] text-muted">
                    {tr(
                      'Automated SMS alert is dispatched when you are 3 patients away.',
                      'আপনার সিরিয়াল ৩ জন আগে আসলে স্বয়ংক্রিয় এসএমএস পাঠানো হবে।'
                    )}
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSmsEnabled}
                  onChange={(e) => setIsSmsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </ScrollReveal>
        </div>

        {/* Right 5 Columns: Patient Queue List & Token Pass */}
        <div className="lg:col-span-5 space-y-6">
          {/* Printable E-Token Pass */}
          <ScrollReveal animation="slide-left" duration={450}>
            <div className="card card-pad bg-surface border-2 border-dashed border-blue-200 dark:border-blue-800 shadow-elevation-1 text-center space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  {tr('Digital Chamber Token Pass', 'ডিজিটাল সিরিয়াল টোকেন')}
                </span>
                <span className="text-[10px] text-muted font-mono">ID: TK-BD-8819</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted font-medium">{tr('Patient Name', 'রোগীর নাম')}</span>
                <h3 className="text-lg font-black text-ink">{isBn ? 'সালমান আহমেদ' : 'Salman Ahmed'}</h3>

                <div className="py-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/40 my-3">
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold uppercase block">
                    {tr('Your Token Number', 'আপনার টোকেন নম্বর')}
                  </span>
                  <span className="text-4xl font-black text-blue-600 dark:text-blue-400 font-mono block my-0.5">
                    #{num(18)}
                  </span>
                  <span className="text-[11px] text-muted">
                    {tr('Time: 11:30 AM | Room 304', 'সময়: সকাল ১১:৩০ | রুম ৩০৪')}
                  </span>
                </div>

                {/* QR Code Mockup */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <div className="p-2 bg-paper border border-border rounded-xl">
                    <QrCode className="w-14 h-14 text-ink" />
                  </div>
                  <div className="text-left text-[11px] text-muted space-y-1">
                    <p className="font-semibold text-ink">{isBn ? 'ল্যাবএইড ধানমন্ডি' : 'Labaid Dhanmondi'}</p>
                    <p>{isBn ? 'ডা. তানভীর হাসান' : 'Dr. Tanvir Hasan'}</p>
                    <span className="inline-block px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded text-[10px] font-bold">
                      {tr('Appointment Confirmed', 'পেমেন্ট নিশ্চিত')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Live Queue Roll */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="card card-pad bg-surface border border-border shadow-elevation-1 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-ink text-sm">
                  {tr('Live Chamber Queue Lineup', 'চেম্বারের সিরিয়াল সারি তালিকা')}
                </h3>
                <span className="pill pill-success text-[10px]">
                  {tr('LIVE FEED', 'লাইভ ফিড')}
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {queueList.map((item) => (
                  <div
                    key={item.token}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      item.isCurrent
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 font-bold text-emerald-950 dark:text-emerald-100 shadow-2xs'
                        : item.isUser
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 font-bold text-blue-950 dark:text-blue-100 ring-1 ring-blue-400'
                        : item.isPast
                        ? 'bg-paper border-border text-muted line-through'
                        : 'bg-paper border-border text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        item.isCurrent
                          ? 'bg-emerald-600 text-white'
                          : item.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-muted'
                      }`}>
                        #{num(item.token)}
                      </span>
                      <div>
                        <p className="leading-tight">{isBn ? item.nameBn : item.nameEn}</p>
                        <span className="text-[10px] text-muted font-mono">{item.time}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      item.isCurrent
                        ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
                        : item.isUser
                        ? 'bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100'
                        : item.isNext
                        ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200'
                        : 'bg-slate-100 dark:bg-slate-800 text-muted'
                    }`}>
                      {isBn ? item.statusBn : item.statusEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default LiveSerialPage;
