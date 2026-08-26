import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Clock,
  CheckCircle2,
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  MapPin,
  Calendar,
  AlertTriangle,
  UserCheck
} from 'lucide-react';

interface LiveSerialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveSerialModal: React.FC<LiveSerialModalProps> = ({ isOpen, onClose }) => {
  const {
    currentSerial,
    patientSerial,
    totalTokens,
    doctorStatus,
    doctorStatusBn,
    doctorNameBn,
    doctorSpecialtyBn,
    estimatedMinutes,
    advanceSerial,
    lastUpdated,
    isChimeEnabled,
    setIsChimeEnabled,
    updateDoctorStatus
  } = useQueue();

  const { toBn } = useLanguage();

  if (!isOpen) return null;

  const serialsBehind = Math.max(0, patientSerial - currentSerial);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden relative animate-slide-up">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-bangla">লাইভ চেম্বার সিরিয়াল ট্র্যাকার</h2>
              <p className="text-xs text-blue-100 font-bangla">রিয়েল-টাইম ডাক্তার ও সিরিয়াল আপডেট</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Doctor Status Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80"
                alt="Doctor"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              <div>
                <h4 className="font-bold text-slate-900 font-bangla text-sm sm:text-base">{doctorNameBn}</h4>
                <p className="text-xs text-slate-600 font-bangla">{doctorSpecialtyBn}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bangla mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>ল্যাবএইড ডায়াগনস্টিক, ধানমন্ডি (রুম ৩০৪)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-bangla rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{doctorStatusBn}</span>
              </span>
            </div>
          </div>

          {/* Big Serial Numbers Display */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Current */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 font-bangla block">চলতি সিরিয়াল</span>
              <span className="text-3xl sm:text-4xl font-black text-slate-900 font-bangla my-1 block">
                {toBn(String(currentSerial).padStart(3, '0'))}
              </span>
              <span className="text-[10px] text-slate-400 font-bangla">এখন চেম্বারে</span>
            </div>

            {/* Your Token */}
            <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-600 shadow-xs">
              <span className="text-xs font-bold text-blue-700 font-bangla block">আপনার সিরিয়াল</span>
              <span className="text-3xl sm:text-4xl font-black text-blue-600 font-bangla my-1 block">
                {toBn(String(patientSerial).padStart(3, '0'))}
              </span>
              <span className="text-[10px] font-bold text-blue-700 font-bangla">
                {serialsBehind > 0 ? `আর ${toBn(serialsBehind)} জন বাকি` : 'আপনার সময় এসেছে!'}
              </span>
            </div>

            {/* Estimated Wait */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 font-bangla block">আনুমানিক সময়</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-bangla my-1 block">
                {toBn(estimatedMinutes)}
              </span>
              <span className="text-[10px] text-slate-400 font-bangla">মিনিট অপেক্ষার সময়</span>
            </div>
          </div>

          {/* Queue Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bangla font-semibold text-slate-600">
              <span>সিরিয়াল অগ্রগতি: {toBn(currentSerial)} / {toBn(totalTokens)}</span>
              <span className="text-emerald-600">আপডেট: {lastUpdated}</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-blue-600 to-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (currentSerial / totalTokens) * 100)}%` }}
              />
            </div>
          </div>

          {/* Interactive Simulation Controls for Demo */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-bangla">
              <span className="font-bold text-blue-900">🎮 ডেমো লাইভ কন্ট্রোলার (সিমুলেশন)</span>
              <button
                onClick={() => setIsChimeEnabled(!isChimeEnabled)}
                className="flex items-center gap-1 text-slate-600 hover:text-blue-600"
                title="সাউন্ড বেল টগল"
              >
                {isChimeEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                <span className="text-[11px]">{isChimeEnabled ? 'শব্দ চালু' : 'শব্দ বন্ধ'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={advanceSerial}
                className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-bangla flex items-center justify-center gap-1.5 shadow-2xs transition-all"
              >
                <span>পরবর্তী সিরিয়াল ডাকুন ({toBn(currentSerial + 1)})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <select
                value={doctorStatus}
                onChange={(e: any) => updateDoctorStatus(e.target.value)}
                className="py-2 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bangla font-semibold text-slate-700 focus:outline-hidden"
              >
                <option value="in_chamber">🟢 চেম্বারে আছেন</option>
                <option value="on_way">🟡 আসছেন</option>
                <option value="break">☕ সাময়িক বিরতি</option>
                <option value="emergency">🔴 জরুরি অপারেশনে</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
