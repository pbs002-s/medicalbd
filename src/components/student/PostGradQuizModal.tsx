import React, { useState } from 'react';
import { mockPostGradQuestions } from '../../mockData';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  GraduationCap,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface PostGradQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostGradQuizModal: React.FC<PostGradQuizModalProps> = ({ isOpen, onClose }) => {
  const { toBn } = useLanguage();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const currentQ = mockPostGradQuestions[currentQIndex];

  const handleSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctOptionIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < mockPostGradQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      alert(`🎉 কুইজ সমাপ্ত! আপনার মোট স্কোর: ${score + (selectedOption === currentQ.correctOptionIndex ? 1 : 0)} / ${mockPostGradQuestions.length}`);
      setCurrentQIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setScore(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto font-bangla">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[92vh] animate-slide-up">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-purple-700 to-indigo-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">পোস্ট-গ্র্যাজুয়েশন প্রিপারেশন হাব (FCPS-1 / Residency)</h2>
              <p className="text-xs text-purple-200">
                BCPS ও BSMMU রেসিডেন্সি পরীক্ষার হাই-ইল্ড প্রশ্ন ও বিস্তারিত ব্যাখ্যা
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress & Meta Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
              {currentQ.examType}
            </span>
            <span className="text-slate-500">বিষয়: {currentQ.subject}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-600 font-mono">
              প্রশ্ন: {toBn(currentQIndex + 1)} / {toBn(mockPostGradQuestions.length)}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold font-mono">
              স্কোর: {toBn(score)}
            </span>
          </div>
        </div>

        {/* Question & Options */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h3>

          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = currentQ.correctOptionIndex === idx;

              let style = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-red-50 border-red-400 text-red-900 line-through';
                }
              } else if (isSelected) {
                style = 'bg-purple-50 border-purple-400 text-purple-900 font-bold shadow-2xs';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs leading-relaxed">{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Rationale Explanation */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-1.5 animate-in fade-in">
              <h4 className="font-bold text-indigo-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>মডেল ব্যাখ্যা ও ক্লিনিক্যাল যুক্তি (Rationale):</span>
              </h4>
              <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              setCurrentQIndex(0);
              setSelectedOption(null);
              setIsAnswerSubmitted(false);
              setScore(0);
            }}
            className="px-3 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>রিসেট করুন</span>
          </button>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedOption !== null
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              উত্তর সাবমিট করুন
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <span>পরবর্তী প্রশ্ন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
