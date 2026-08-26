import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockPrescriptions, mockLabReports } from '../../mockData';
import {
  X,
  History,
  ShieldCheck,
  AlertCircle,
  FileText,
  FlaskConical,
  Activity,
  Heart,
  Droplet
} from 'lucide-react';

interface HealthTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HealthTimelineModal: React.FC<HealthTimelineModalProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { toBn } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto font-bangla">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[92vh] animate-slide-up">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-700 via-teal-700 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">আমার স্বাস্থ্য প্রোফাইল ও টাইমলাইন</h2>
              <p className="text-xs text-teal-200">
                ক্রনিক ডিজিজ, ড্রাগ এলার্জি ও বিগত প্রেসক্রিপশনের স্থায়ী ডিজিটাল ভল্ট
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Medical Profile Summary Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-100 text-center">
              <span className="text-[10px] text-slate-400 block">রক্তের গ্রুপ</span>
              <strong className="text-lg font-black text-red-600 font-mono">B (+) Positive</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
              <span className="text-[10px] text-slate-400 block">বয়স / লিঙ্গ</span>
              <strong className="text-sm font-bold text-slate-900">৩১ বছর / পুরুষ</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
              <span className="text-[10px] text-slate-400 block">পরিচিত এলার্জি</span>
              <strong className="text-xs font-bold text-amber-800">Penicillin, Sulfa</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
              <span className="text-[10px] text-slate-400 block">দীর্ঘমেয়াদী রোগ</span>
              <strong className="text-xs font-bold text-purple-800">উচ্চ রক্তচাপ, এজমা</strong>
            </div>
          </div>

          {/* Chronological Timeline */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>স্বাস্থ্যসেবা ইতিহাস ও টাইমলাইন (২০২৬):</span>
            </h3>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
              {/* Event 1 */}
              <div className="relative flex items-start gap-4 pl-8">
                <div className="absolute left-2 top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      ই-প্রেসক্রিপশন
                    </span>
                    <span className="text-[10px] text-slate-400">১৬ মে, ২০২৬</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">
                    ডা. তানভীর হাসান (মেডিসিন বিশেষজ্ঞ, ল্যাবএইড)
                  </h4>
                  <p className="text-slate-600 text-[11px]">
                    ডায়াগনসিস: ডেঙ্গু জ্বর উইথ ওয়ার্নিং সাইনস। ঔষধ: Napa Extra, Maxpro, Fexo, ORS.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative flex items-start gap-4 pl-8">
                <div className="absolute left-2 top-1 w-3.5 h-3.5 rounded-full bg-purple-600 ring-4 ring-purple-100" />
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                      ল্যাব রিপোর্ট (CBC)
                    </span>
                    <span className="text-[10px] text-slate-400">১৮ মে, ২০২৬</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">ল্যাবএইড ডায়াগনস্টিক</h4>
                  <p className="text-slate-600 text-[11px]">
                    ফলাফল: প্লেটলেট ১,৮৫,০০০/uL, হিমোগ্লোবিন ১৪.২ g/dL (স্বাভাবিক)।
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative flex items-start gap-4 pl-8">
                <div className="absolute left-2 top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      কার্ডিওলজি চেকআপ
                    </span>
                    <span className="text-[10px] text-slate-400">০৬ মে, ২০২৬</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">
                    ডা. সায়রা আফরিন (ন্যাশনাল হার্ট ফাউন্ডেশন)
                  </h4>
                  <p className="text-slate-600 text-[11px]">
                    রুটিন ইসিজি ও রক্তচাপ নিয়ন্ত্রণ ওষুধ পর্যালোচনা।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
