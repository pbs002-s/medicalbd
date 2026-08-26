import React, { useState, useEffect } from 'react';
import { mockOSCEStations } from '../../mockData';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  GraduationCap,
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckSquare,
  Square,
  HelpCircle,
  Award,
  ChevronRight
} from 'lucide-react';

interface OSCEModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OSCEModal: React.FC<OSCEModalProps> = ({ isOpen, onClose }) => {
  const { toBn } = useLanguage();
  const [selectedStation, setSelectedStation] = useState(mockOSCEStations[0]);
  const [checkedItemIds, setCheckedItemIds] = useState<string[]>([]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(selectedStation.timeLimitMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showVivaAnswers, setShowVivaAnswers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((t) => t - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeftSeconds]);

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    if (checkedItemIds.includes(id)) {
      setCheckedItemIds(checkedItemIds.filter((item) => item !== id));
    } else {
      setCheckedItemIds([...checkedItemIds, id]);
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeftSeconds(selectedStation.timeLimitMinutes * 60);
    setCheckedItemIds([]);
  };

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;

  const totalScore = selectedStation.checklistItems
    .filter((item) => checkedItemIds.includes(item.id))
    .reduce((acc, item) => acc + item.marks, 0);

  const maxScore = selectedStation.checklistItems.reduce((acc, item) => acc + item.marks, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto font-bangla">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[94vh] animate-slide-up">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">OSCE / OSPE ক্লিনিক্যাল এক্সাম চেকলিস্ট ও ভাইভা</h2>
              <p className="text-xs text-blue-200">
                ৫ মিনিটের প্রফেশনাল এক্সাম স্টেশন টাইমার ও মার্কিং চেকলিস্ট
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Station Selectors & Timer Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {mockOSCEStations.map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  setSelectedStation(st);
                  setTimeLeftSeconds(st.timeLimitMinutes * 60);
                  setIsTimerRunning(false);
                  setCheckedItemIds([]);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedStation.id === st.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {st.title}
              </button>
            ))}
          </div>

          {/* Timer & Score Display */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs font-mono font-bold text-xs">
              <Timer className="w-4 h-4 text-blue-600" />
              <span className={`text-sm ${timeLeftSeconds < 60 ? 'text-red-600 animate-pulse font-black' : 'text-slate-800'}`}>
                {toBn(String(minutes).padStart(2, '0'))}:{toBn(String(seconds).padStart(2, '0'))}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>মার্কস: {toBn(totalScore.toFixed(1))} / {toBn(maxScore.toFixed(1))}</span>
            </div>
          </div>
        </div>

        {/* Station Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Scenario Box */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
              স্টেশন সিনারিও (OSCE Scenario):
            </span>
            <p className="text-sm font-bold text-slate-900 leading-snug">{selectedStation.scenario}</p>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center justify-between">
              <span>পরীক্ষকের মার্কিং চেকলিস্ট (Marking Checklist):</span>
              <span className="text-xs text-slate-400 font-normal">ক্লিক করে প্র্যাকটিস স্কোর হিসেব করুন</span>
            </h4>

            <div className="space-y-2">
              {selectedStation.checklistItems.map((item) => {
                const isChecked = checkedItemIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3 rounded-2xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{item.text}</span>
                    </div>

                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono font-bold text-slate-600 shrink-0">
                      +{toBn(item.marks)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High Yield Viva Questions */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>স্টেশন সংলগ্ন উচ্চ-গুরুত্বপূর্ণ ভাইভা প্রশ্ন (High-Yield Viva Q&A):</span>
            </h4>

            <div className="space-y-2.5">
              {selectedStation.vivaQuestions.map((vq, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-purple-950 text-xs">
                      Q{i + 1}: {vq.question}
                    </p>
                    <button
                      onClick={() => setShowVivaAnswers({ ...showVivaAnswers, [i]: !showVivaAnswers[i] })}
                      className="px-2 py-1 bg-white hover:bg-purple-100 text-purple-700 rounded-lg text-[10px] font-bold border border-purple-200 shrink-0"
                    >
                      {showVivaAnswers[i] ? 'উত্তর লুকান' : 'উত্তর দেখুন'}
                    </button>
                  </div>

                  {showVivaAnswers[i] && (
                    <p className="p-2.5 bg-white rounded-xl border border-purple-200/60 text-slate-700 leading-relaxed text-[11px] animate-in fade-in">
                      💡 <strong>মডেল উত্তর:</strong> {vq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
