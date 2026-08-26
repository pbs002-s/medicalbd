import React, { useState, useEffect } from 'react';
import { useQueue } from '../../context/QueueContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Tv,
  Volume2,
  Clock,
  MapPin,
  ArrowRight,
  Maximize2,
  Sparkles
} from 'lucide-react';

interface WaitingRoomTVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitingRoomTVModal: React.FC<WaitingRoomTVModalProps> = ({ isOpen, onClose }) => {
  const { currentSerial, doctorStatusBn, totalTokens, advanceSerial, isChimeEnabled } = useQueue();
  const { toBn } = useLanguage();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('bn-BD'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('bn-BD'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in font-bangla">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Tv className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              ল্যাবএইড ডায়াগনস্টিক সেন্টার • চেম্বার লাইভ সিরিয়াল মনিটর
            </h1>
            <p className="text-xs text-slate-400">
              রুম ৩০৪ (৩য় তলা) • ShasthoSetu BD TV Display System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right font-mono">
            <div className="text-xl sm:text-2xl font-black text-teal-400">{currentTime}</div>
            <div className="text-xs text-slate-500">ঢাকা, বাংলাদেশ</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="ফুলস্ক্রিন মোড বন্ধ করুন"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Calling Token Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
        {/* Left 8 Cols: Huge Calling Token */}
        <div className="lg:col-span-8 p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-2 border-blue-500/40 shadow-2xl text-center space-y-4 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>এখন চেম্বারে প্রবেশ করুন (Calling Token)</span>
          </div>

          <div className="py-4">
            <span className="text-7xl sm:text-9xl font-black tracking-tight text-white font-mono drop-shadow-[0_10px_20px_rgba(37,99,235,0.4)] animate-pulse-subtle block">
              {toBn(String(currentSerial).padStart(3, '0'))}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 max-w-md mx-auto flex items-center justify-between text-left">
            <div>
              <h3 className="text-lg font-bold text-white">ডা. তানভীর হাসান</h3>
              <p className="text-xs text-teal-300">মেডিসিন বিশেষজ্ঞ • বিএমডিসি রেজি: A-54982</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold">
              {doctorStatusBn}
            </span>
          </div>

          {/* Quick next call button */}
          <div className="pt-2">
            <button
              onClick={advanceSerial}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-lg transition-all"
            >
              <span>পরবর্তী সিরিয়াল ডাকুন ({toBn(currentSerial + 1)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 4 Cols: Upcoming Tokens in Waiting Area */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
            অপেক্ষমাণ পরবর্তী সিরিয়াল সমূহ:
          </h3>

          <div className="space-y-2.5">
            {[1, 2, 3, 4, 5].map((offset) => {
              const tokenNum = currentSerial + offset;
              if (tokenNum > totalTokens) return null;
              return (
                <div
                  key={offset}
                  className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">ধাপ +{toBn(offset)}</span>
                    <span className="text-lg font-black font-mono text-teal-300">
                      টোকেন #{toBn(String(tokenNum).padStart(3, '0'))}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    ~{toBn(offset * 4)} মিনিট
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Ticker Marquee */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-blue-400 shrink-0">
          <span>📢 জরুরি নির্দেশনা:</span>
        </div>
        <div className="truncate px-4 text-slate-300">
          অনুগ্রহ করে আপনার নির্ধারিত সিরিয়ালের জন্য অপেক্ষা করুন • রোগী দেখার সময় মোবাইল সাইলেন্ট রাখুন • জরুরি প্রয়োজনে রিসেপশনে যোগাযোগ করুন (হেল্পলাইন: 09678-123456)
        </div>
        <div className="shrink-0 text-slate-500 font-mono">
          মোট বুকিং: {toBn(totalTokens)}
        </div>
      </div>
    </div>
  );
};
