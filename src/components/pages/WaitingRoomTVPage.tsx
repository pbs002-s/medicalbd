import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useQueue } from '../../context/QueueContext';
import {
  Tv,
  ArrowLeft,
  Volume2,
  Maximize,
  Clock,
  Calendar,
  AlertCircle,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface WaitingRoomTVPageProps {
  onBack?: () => void;
}

export const WaitingRoomTVPage: React.FC<WaitingRoomTVPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { toBn } = useLanguage();
  const { currentSerial, advanceSerial } = useQueue();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US'));
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const chambers = [
    { room: 'রুম ৩০৪', doc: 'ডা. তানভীর হাসান (মেডিসিন)', serial: currentSerial, next: currentSerial + 1, status: 'এখন চেম্বারে', color: 'border-emerald-500' },
    { room: 'রুম ৩০৫', doc: 'ডা. সায়রা আফরিন (কার্ডিওলজি)', serial: 8, next: 9, status: 'এখন চেম্বারে', color: 'border-blue-500' },
    { room: 'রুম ৩০৬', doc: 'ডা. রাকিবুল ইসলাম (চর্ম ও এলার্জি)', serial: 15, next: 16, status: 'এখন চেম্বারে', color: 'border-purple-500' },
    { room: 'রুম ৩০৭', doc: 'ডা. ফারহানা চৌধুরী (গাইনি ও প্রসূতি)', serial: 22, next: 23, status: 'এখন চেম্বারে', color: 'border-amber-500' },
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-bangla select-none p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top TV Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onBack ? onBack() : setActiveView('dashboard')}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="ড্যাশবোর্ডে ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping inline-block" />
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                ল্যাবএইড স্পেশালাইজড হসপিটাল • ডিজিটাল ওয়েটিং ডিসপ্লে
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">রিয়েল-টাইম পেশেন্ট কিউ মনিটর</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right font-mono">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 block leading-none">{currentTime}</span>
            <span className="text-xs text-slate-400">২০ মে, ২০২৬ | মঙ্গলবার</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            title="ফুলস্ক্রিন মোড"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Multi-Doctor Room Chamber Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {chambers.map((c, i) => (
          <div
            key={i}
            className={`bg-slate-900/90 rounded-3xl border-2 ${c.color} p-6 shadow-2xl flex flex-col justify-between space-y-4`}
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono font-bold text-slate-300">
                  {c.room}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white mt-2">{c.doc}</h2>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold animate-pulse">
                {c.status}
              </span>
            </div>

            {/* Giant Token Display */}
            <div className="grid grid-cols-2 gap-4 text-center py-4 bg-slate-950/70 rounded-2xl border border-slate-800">
              <div className="p-2 border-r border-slate-800">
                <span className="text-xs text-slate-400 block">চলতি সিরিয়াল (Serving)</span>
                <span className="text-5xl sm:text-6xl font-black text-emerald-400 font-mono tracking-tight my-1 block">
                  #{toBn(c.serial)}
                </span>
                <span className="text-[11px] text-emerald-300 font-bold">চেম্বারে প্রবেশ করুন</span>
              </div>

              <div className="p-2">
                <span className="text-xs text-slate-400 block">পরবর্তী সিরিয়াল (Next)</span>
                <span className="text-5xl sm:text-6xl font-black text-amber-400 font-mono tracking-tight my-1 block">
                  #{toBn(c.next)}
                </span>
                <span className="text-[11px] text-amber-300 font-bold">প্রস্তুত থাকুন</span>
              </div>
            </div>

            {/* Bottom Controls for Demo */}
            {i === 0 && (
              <div className="flex justify-end pt-1">
                <button
                  onClick={advanceSerial}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <span>পরবর্তী সিরিয়াল কল করুন ({toBn(currentSerial + 1)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Running Bottom Ticker */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 flex items-center gap-3 overflow-hidden text-xs text-slate-300">
        <span className="px-2.5 py-1 bg-red-600 text-white rounded-lg font-bold text-[10px] uppercase shrink-0">
          জরুরি নোটিশ
        </span>
        <div className="truncate font-semibold animate-pulse">
          📢 সকল রোগীদের অনুরোধ করা হচ্ছে তাদের সিরিয়ালের ১৫ মিনিট পূর্বে চেম্বারের সামনে উপস্থিত থাকতে। ১৪ দিনের মধ্যে রিপোর্ট প্রদর্শন সম্পূর্ণ ফ্রি।
        </div>
      </div>
    </div>
  );
};

export default WaitingRoomTVPage;
