import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useQueue } from '../../context/QueueContext';
import { announceToken } from '../../lib/announce';
import {
  ArrowLeft,
  ArrowRight,
  Maximize,
  Megaphone,
  Minimize,
  Radio,
  Volume2,
  VolumeX,
  WifiOff,
} from 'lucide-react';

interface WaitingRoomTVPageProps {
  onBack?: () => void;
}

export const WaitingRoomTVPage: React.FC<WaitingRoomTVPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();
  const {
    currentSerial,
    totalTokens,
    advanceSerial,
    lastChangeAt,
    isChimeEnabled,
    setIsChimeEnabled,
    isAudioReady,
    enableAudio,
    doctorNameBn,
    doctorNameEn,
    chamberBn,
    chamberEn,
    transport,
    isConnected,
  } = useQueue();

  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.warn('[tv] fullscreen unavailable', error);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === 'f' || event.key === 'F') void toggleFullscreen();
      if (event.key === 'n' || event.key === 'N') advanceSerial();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggleFullscreen, advanceSerial]);

  const chambers = [
    {
      room: isBn ? 'রুম ৩০৪' : 'Room 304',
      doc: isBn ? `${doctorNameBn} (মেডিসিন)` : `${doctorNameEn} (Medicine)`,
      serial: currentSerial,
      accent: 'border-blue-500',
      live: true,
    },
    {
      room: isBn ? 'রুম ৩০৫' : 'Room 305',
      doc: isBn ? 'ডা. সায়রা আফরিন (কার্ডিওলজি)' : 'Dr. Sayera Afreen (Cardiology)',
      serial: 8,
      accent: 'border-emerald-500',
      live: false
    },
    {
      room: isBn ? 'রুম ৩০৬' : 'Room 306',
      doc: isBn ? 'ডা. রাকিবুল ইসলাম (চর্ম ও এলার্জি)' : 'Dr. Rakibul Islam (Dermatology)',
      serial: 15,
      accent: 'border-purple-500',
      live: false
    },
    {
      room: isBn ? 'রুম ৩০৭' : 'Room 307',
      doc: isBn ? 'ডা. ফারহানা চৌধুরী (গাইনি ও প্রসূতি)' : 'Dr. Farhana Chowdhury (Gynae & Obs)',
      serial: 22,
      accent: 'border-amber-500',
      live: false
    },
  ];

  const repeatAnnouncement = () => {
    announceToken({ tokenNumber: currentSerial, doctorNameBn, chamberBn });
  };

  const justChanged = Date.now() - lastChangeAt < 5000;

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans select-none p-4 sm:p-6 lg:p-8 gap-5 transition-colors">
      {/* Top bar (OpenGovtBD clean elevated card) */}
      <header className="card card-pad-sm bg-surface flex flex-wrap items-center justify-between gap-4 border border-border shadow-elevation-1 rounded-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (onBack ? onBack() : setActiveView('dashboard'))}
            className="p-2 rounded-xl bg-paper hover:bg-slate-200 dark:hover:bg-slate-800 text-ink border border-border transition-colors btn-press"
            title={tr('Back to Dashboard', 'ড্যাশবোর্ডে ফিরে যান')}
            aria-label={tr('Back to Dashboard', 'ড্যাশবোর্ডে ফিরে যান')}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full inline-block ${
                  isConnected ? 'bg-blue-600 animate-ping' : 'bg-muted'
                }`}
              />
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-ink">
                {tr('Labaid Specialized Hospital • Digital Queue TV Display', 'ল্যাবএইড স্পেশালাইজড হসপিটাল • ডিজিটাল ওয়েটিং ডিসপ্লে')}
              </h1>
            </div>
            <p className="text-xs text-muted mt-0.5 flex items-center gap-2">
              <Radio className="w-3 h-3 text-blue-600" />
              <span>{tr('Real-Time Patient Queue Monitor', 'রিয়েল-টাইম পেশেন্ট কিউ মনিটর')}</span>
              <span className="text-muted">•</span>
              <span>{transport === 'sse' ? tr('Server Live Feed', 'সার্ভার লাইভ ফিড') : tr('Local Sync (All Tabs)', 'লোকাল সিঙ্ক (সব ট্যাব)')}</span>
              {!isConnected && (
                <span className="text-amber-600 flex items-center gap-1 font-bold">
                  <WifiOff className="w-3 h-3" />
                  <span>{tr('Reconnecting...', 'পুনঃসংযোগ হচ্ছে')}</span>
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono">
            <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 block leading-none">
              {currentTime.toLocaleTimeString(isBn ? 'bn-BD' : 'en-GB')}
            </span>
            <span className="text-xs text-muted font-bold">
              {currentTime.toLocaleDateString(isBn ? 'bn-BD' : 'en-GB')}
            </span>
          </div>

          <button
            onClick={repeatAnnouncement}
            disabled={!isAudioReady}
            className="p-2.5 rounded-xl bg-paper hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 text-ink border border-border transition-colors shadow-2xs"
            title={tr('Repeat Voice Callout', 'ঘোষণা পুনরাবৃত্তি করুন')}
            aria-label={tr('Repeat Voice Callout', 'ঘোষণা পুনরাবৃত্তি করুন')}
          >
            <Megaphone className="w-5 h-5 text-blue-600" />
          </button>

          <button
            onClick={() => setIsChimeEnabled(!isChimeEnabled)}
            className="p-2.5 rounded-xl bg-paper hover:bg-slate-200 dark:hover:bg-slate-800 text-ink border border-border transition-colors shadow-2xs"
            title={isChimeEnabled ? tr('Mute Announcement', 'ঘোষণা বন্ধ করুন') : tr('Enable Announcement', 'ঘোষণা চালু করুন')}
            aria-pressed={isChimeEnabled}
          >
            {isChimeEnabled ? <Volume2 className="w-5 h-5 text-blue-600" /> : <VolumeX className="w-5 h-5 text-muted" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-paper hover:bg-slate-200 dark:hover:bg-slate-800 text-ink border border-border transition-colors shadow-2xs"
            title={tr('Fullscreen Mode (F)', 'ফুলস্ক্রিন মোড (F)')}
            aria-label="Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-5 h-5 text-ink" /> : <Maximize className="w-5 h-5 text-ink" />}
          </button>
        </div>
      </header>

      {/* Browsers block audio until a gesture */}
      {!isAudioReady && isChimeEnabled && (
        <button
          onClick={() => void enableAudio()}
          className="w-full p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-900/25 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100 text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-2xs btn-press"
        >
          <Volume2 className="w-4 h-4 text-blue-600" />
          <span>{tr('Click here once to enable automated voice callout audio', 'বাংলা কণ্ঠ ঘোষণা চালু করতে এখানে একবার ক্লিক করুন (ব্রাউজারের নিরাপত্তা নিয়ম)')}</span>
        </button>
      )}

      {/* Chamber grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
        {chambers.map((chamber) => (
          <section
            key={chamber.room}
            className={`card card-pad bg-surface rounded-3xl border-2 ${chamber.accent} shadow-elevation-2 flex flex-col justify-between gap-4`}
          >
            <div className="flex items-start justify-between border-b border-border pb-3 gap-3">
              <div className="min-w-0">
                <span className="px-3 py-1 bg-paper border border-border rounded-full text-xs font-mono font-bold text-ink">
                  {chamber.room}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-ink mt-2 truncate">{chamber.doc}</h2>
              </div>
              <span className="pill pill-success text-xs font-bold shrink-0">
                {tr('In Consultation', 'এখন চেম্বারে')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center py-5 bg-paper rounded-2xl border border-border">
              <div className="p-2 border-r border-border">
                <span className="text-xs text-muted font-bold uppercase tracking-wider block">{tr('Now Calling', 'চলতি সিরিয়াল')}</span>
                <span
                  key={chamber.live ? lastChangeAt : 'static'}
                  className={`text-5xl sm:text-7xl font-black text-blue-600 dark:text-blue-400 font-mono tracking-tight my-1 block rounded-2xl ${
                    chamber.live && justChanged ? 'animate-pulse' : ''
                  }`}
                >
                  #{num(chamber.serial)}
                </span>
                <span className="pill pill-info text-xs font-bold mt-1 inline-flex items-center gap-1">
                  {tr('Enter Chamber', 'চেম্বারে প্রবেশ করুন')}
                </span>
              </div>

              <div className="p-2">
                <span className="text-xs text-muted font-bold uppercase tracking-wider block">{tr('Next Token', 'পরবর্তী সিরিয়াল')}</span>
                <span className="text-5xl sm:text-7xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight my-1 block">
                  #{num(chamber.serial + 1)}
                </span>
                <span className="pill pill-warning text-xs font-bold mt-1 inline-flex items-center gap-1">
                  {tr('Please Be Ready', 'প্রস্তুত থাকুন')}
                </span>
              </div>
            </div>

            {chamber.live && (
              <div className="flex items-center justify-between gap-3 pt-1">
                <span className="text-xs text-muted font-mono font-bold">
                  {tr('Total Tokens: ', 'মোট টোকেন: ')}{num(totalTokens)}
                </span>
                <button
                  onClick={advanceSerial}
                  disabled={currentSerial >= totalTokens}
                  className="btn btn-primary btn-sm shadow-elevation-1"
                >
                  <span>
                    {tr(`Call Next Serial (#${num(Math.min(currentSerial + 1, totalTokens))})`, `পরবর্তী সিরিয়াল কল করুন (${num(Math.min(currentSerial + 1, totalTokens))})`)}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Ticker (OpenGovtBD clean card style) */}
      <footer className="bg-surface rounded-2xl border border-border p-3 flex items-center gap-3 overflow-hidden text-xs text-muted shadow-elevation-1">
        <span className="pill pill-error text-[10px] font-bold uppercase shrink-0">
          {tr('NOTICE', 'জরুরি নোটিশ')}
        </span>
        <div className="truncate font-semibold text-ink">
          {tr(
            'Patients are kindly requested to arrive at the waiting area 15 minutes before their estimated slot. Report reviews within 14 days are completely free. Emergency hotline: 999 or 16263.',
            'সকল রোগীকে অনুরোধ করা হচ্ছে সিরিয়ালের ১৫ মিনিট পূর্বে চেম্বারের সামনে উপস্থিত থাকতে। ১৪ দিনের মধ্যে রিপোর্ট প্রদর্শন সম্পূর্ণ ফ্রি। জরুরি প্রয়োজনে ৯৯৯ অথবা স্বাস্থ্য বাতায়ন ১৬২৬৩।'
          )}
        </div>
        <span className="ml-auto shrink-0 text-[10px] text-muted font-mono hidden sm:block font-bold">
          {tr('F = Fullscreen • N = Next', 'F = ফুলস্ক্রিন · N = পরবর্তী')}
        </span>
      </footer>
    </div>
  );
};

export default WaitingRoomTVPage;
