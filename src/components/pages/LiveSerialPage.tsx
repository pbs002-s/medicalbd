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
  VolumeX,
  Bell,
  RefreshCw,
  MapPin,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Printer,
  Share2,
  Sparkles,
  UserCheck,
  Stethoscope,
  PhoneCall
} from 'lucide-react';

interface LiveSerialPageProps {
  onBack?: () => void;
}

export const LiveSerialPage: React.FC<LiveSerialPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { toBn } = useLanguage();
  const {
    currentSerial,
    patientSerial,
    totalTokens,
    estimatedMinutes,
    doctorStatusBn,
    lastUpdated,
    advanceSerial
  } = useQueue();

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isSmsEnabled, setIsSmsEnabled] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const primaryAppointment = mockAppointments[0];

  const queueList = [
    { token: 11, name: 'জাকির হোসেন', status: 'সম্পন্ন', time: '10:45 AM', isPast: true },
    { token: 12, name: 'আসিফ করিম', status: 'এখন চেম্বারে', time: '11:00 AM', isCurrent: true },
    { token: 13, name: 'ফাতেমা বেগম', status: 'পরবর্তী ডাক', time: '11:15 AM', isNext: true },
    { token: 14, name: 'মোঃ রফিকুল', status: 'অপেক্ষমাণ', time: '11:30 AM', isWaiting: true },
    { token: 15, name: 'তানজিনা আক্তার', status: 'অপেক্ষমাণ', time: '11:45 AM', isWaiting: true },
    { token: 16, name: 'আব্দুল কাদির', status: 'অপেক্ষমাণ', time: '12:00 PM', isWaiting: true },
    { token: 17, name: 'মেহেরুন্নেসা', status: 'অপেক্ষমাণ', time: '12:10 PM', isWaiting: true },
    { token: 18, name: 'সালমান আহমেদ (আপনি)', status: 'আপনার সিরিয়াল', time: '12:20 PM', isUser: true },
  ];

  const handlePlayVoiceAnnouncement = () => {
    setIsPlayingAudio(true);
    // Synthetic Bangla speech if supported, else simulation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`টোকেন নম্বর ${currentSerial}, রুম ৩০৪ এ আসুন`);
      utterance.lang = 'bn-BD';
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setIsPlayingAudio(false), 2500);
  };

  const progressPercentage = Math.min(100, Math.round((currentSerial / totalTokens) * 100));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* Breadcrumb & Header */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack ? onBack() : setActiveView('dashboard')}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors btn-press"
              title="ড্যাশবোর্ডে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  ড্যাশবোর্ড
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-blue-600 font-semibold">লাইভ সিরিয়াল ট্র্যাকার</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5 flex items-center gap-2">
                <span>লাইভ চেম্বার সিরিয়াল মনিটর</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              </h1>
            </div>
          </div>

          {/* Action pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayVoiceAnnouncement}
              disabled={isPlayingAudio}
              className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-all btn-press"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-blue-700' : ''}`} />
              <span>{isPlayingAudio ? 'ঘোষণা বাজছে...' : 'টোকেন অডিও টেস্ট'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-colors btn-press"
              title="টোকেন প্রিন্ট করুন"
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
          {/* Main Pulse Tracker Board */}
          <ScrollReveal animation="fade-up" duration={450}>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 relative overflow-hidden">
              {/* Background ambient pulse circles */}
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Chamber & Doctor info */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <img
                    src={primaryAppointment.doctorAvatar}
                    alt="Doctor"
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-400/40"
                  />
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight flex items-center gap-1.5">
                      <span>{primaryAppointment.doctorNameBn}</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">{primaryAppointment.doctorSpecialtyBn}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{primaryAppointment.chamberName}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{doctorStatusBn}</span>
                  </span>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-mono">আপডেট: {lastUpdated}</div>
                </div>
              </div>

              {/* Serial Metric Counters Grid */}
              <div className="grid grid-cols-3 gap-3 text-center py-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 backdrop-blur-xs relative z-10">
                {/* Current Serial */}
                <div className="p-2">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-medium">চলতি সিরিয়াল</span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight my-1 block">
                    #{toBn(String(currentSerial).padStart(2, '0'))}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md">
                    চেম্বারের ভেতরে
                  </span>
                </div>

                {/* Patient Serial */}
                <div className="p-2 border-x border-slate-700/80">
                  <span className="text-[11px] text-blue-300 block font-bold">আপনার সিরিয়াল</span>
                  <span className="text-3xl sm:text-4xl font-black text-blue-400 font-mono tracking-tight my-1 block">
                    #{toBn(String(patientSerial).padStart(2, '0'))}
                  </span>
                  <span className="text-[10px] text-blue-200 font-semibold bg-blue-900/60 px-2 py-0.5 rounded-md">
                    আর {toBn(patientSerial - currentSerial)} জন বাকি
                  </span>
                </div>

                {/* Estimated Wait Time */}
                <div className="p-2">
                  <span className="text-[11px] text-amber-300 block font-medium">আনুমানিক অপেক্ষার সময়</span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight my-1 block">
                    ~{toBn(estimatedMinutes)}
                  </span>
                  <span className="text-[10px] text-amber-200 font-semibold bg-amber-950/60 px-2 py-0.5 rounded-md">
                    মিনিট বাকি
                  </span>
                </div>
              </div>

              {/* Progress Bar with Percentage */}
              <div className="space-y-2 mt-6 relative z-10">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>সিরিয়াল অগ্রগতি: {toBn(currentSerial)} / {toBn(totalTokens)}</span>
                  <span className="font-mono font-bold text-emerald-400">{toBn(progressPercentage)}% সম্পন্ন</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500 relative shimmer-badge"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Patient Advice Warning */}
              <div className="mt-6 p-3 rounded-2xl bg-blue-950/70 border border-blue-800/60 text-blue-200 text-xs flex items-start gap-2.5 relative z-10">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-[11px]">
                  আপনার সিরিয়ালের অন্তত ১৫ মিনিট পূর্বে ওয়েটিং জোনে উপস্থিত থাকার অনুরোধ করা হচ্ছে। আপনার ডাক আসলে এসএমএস ও অডিও অ্যালার্ট পাওয়া যাবে।
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Notification Settings */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 text-xs sm:text-sm">এসএমএস ও পুশ নোটিফিকেশন অ্যালার্ট</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">আপনার সিরিয়াল ৩ জন আগে আসলে স্বয়ংক্রিয় এসএমএস পাঠানো হবে।</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSmsEnabled}
                  onChange={(e) => setIsSmsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:bg-slate-900 after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </ScrollReveal>
        </div>

        {/* Right 5 Columns: Patient Queue List & Token Pass */}
        <div className="lg:col-span-5 space-y-6">
          {/* Printable E-Token Pass */}
          <ScrollReveal animation="slide-left" duration={450}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-blue-200 p-6 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">ডিজিটাল সিরিয়াল টোকেন</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">ID: TK-BD-8819</span>
              </div>

              <div className="text-center space-y-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">রোগীর নাম</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-50">সালমান আহমেদ</h3>

                <div className="py-3 bg-blue-50/70 rounded-2xl border border-blue-100 my-3">
                  <span className="text-[10px] text-blue-700 font-bold uppercase block">আপনার টোকেন নম্বর</span>
                  <span className="text-4xl font-black text-blue-600 font-mono block my-0.5">#১৮</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400">সময়: সকাল ১১:৩০ | রুম ৩০৪</span>
                </div>

                {/* QR Code Mockup */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <QrCode className="w-16 h-16 text-slate-800 dark:text-slate-100" />
                  </div>
                  <div className="text-left text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">ল্যাবএইড ধানমন্ডি</p>
                    <p>ডা. তানভীর হাসান</p>
                    <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold">
                      পেমেন্ট নিশ্চিত 
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Live Queue Roll */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">চেম্বারের সিরিয়াল সারি তালিকা</h3>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  লাইভ ফিড
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {queueList.map((item) => (
                  <div
                    key={item.token}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      item.isCurrent
                        ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950 shadow-2xs'
                        : item.isUser
                        ? 'bg-blue-50 border-blue-300 font-bold text-blue-950 ring-1 ring-blue-400'
                        : item.isPast
                        ? 'bg-slate-50/60 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 line-through'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        item.isCurrent
                          ? 'bg-emerald-600 text-white'
                          : item.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        #{toBn(item.token)}
                      </span>
                      <div>
                        <p className="leading-tight">{item.name}</p>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{item.time}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      item.isCurrent
                        ? 'bg-emerald-200 text-emerald-900'
                        : item.isUser
                        ? 'bg-blue-200 text-blue-900'
                        : item.isNext
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {item.status}
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
