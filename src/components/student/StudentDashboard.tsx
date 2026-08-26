import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  GraduationCap,
  BookOpen,
  Calculator,
  Award,
  MessageSquare,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface StudentDashboardProps {
  onOpenLogbook: () => void;
  onOpenOSCE: () => void;
  onOpenDoseCalc: () => void;
  onOpenQuiz: () => void;
  onOpenForum: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onOpenLogbook,
  onOpenOSCE,
  onOpenDoseCalc,
  onOpenQuiz,
  onOpenForum
}) => {
  const { currentUser } = useAuth();
  const { toBn } = useLanguage();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* Student Welcome Banner */}
      <ScrollReveal animation="fade-down" duration={450}>
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-800 to-slate-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'}
              alt="Student"
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold">{currentUser?.nameBn || 'আয়ান চৌধুরী'}</h1>
                <span className="px-2 py-0.5 rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30 text-[11px] font-bold">
                  DMC (K-78)
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                ৫ম বর্ষ এমবিবিএস (ক্লিনিক্যাল ফেজ) • ঢাকা মেডিকেল কলেজ
              </p>
              <p className="text-[11px] text-purple-300 mt-0.5">
                চলতি ওয়ার্ড পোস্টিং: ইন্টারনাল মেডিসিন (ওয়ার্ড ১, ডিএমসিএইচ)
              </p>
            </div>
          </div>

          <button
            onClick={onOpenLogbook}
            className="px-4 py-2.5 bg-white text-purple-900 hover:bg-purple-50 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all btn-press"
          >
            <BookOpen className="w-4 h-4 text-purple-700" />
            <span>কেস লগবুক খুলুন</span>
          </button>
        </div>
      </ScrollReveal>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">সংরক্ষিত ক্লিনিক্যাল কেস</span>
            <span className="text-2xl font-black text-purple-700 my-0.5 block">{toBn(14)} টি</span>
            <span className="text-[10px] text-emerald-600 font-bold">ভেরিফাইড: ১২টি</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">OSCE স্টেশন স্কোর</span>
            <span className="text-2xl font-black text-blue-600 my-0.5 block">{toBn(9.5)} / ১০</span>
            <span className="text-[10px] text-blue-600 font-bold">কার্ডিওভাসকুলার এক্সাম</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">FCPS-1 প্র্যাকটিস স্কোর</span>
            <span className="text-2xl font-black text-emerald-600 my-0.5 block">৮৪%</span>
            <span className="text-[10px] text-slate-400">ফার্মাকোলজি ও ফিজিওলজি</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <span className="text-[11px] text-slate-500 font-medium block">ফোরাম কন্ট্রিবিউশন</span>
            <span className="text-2xl font-black text-amber-600 my-0.5 block">{toBn(28)}</span>
            <span className="text-[10px] text-amber-700 font-bold">কেস মতামত ও লাইক</span>
          </div>
        </ScrollReveal>
      </div>

      {/* 5 Core Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Case Logbook */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div
            onClick={onOpenLogbook}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                ক্লিনিক্যাল ওয়ার্ড কেস লগবুক
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                মেডিসিন, সার্জারি, গাইনি ও পেডিয়াট্রিক্স ওয়ার্ডের জন্য স্ট্যান্ডার্ড বেডসাইড হিস্ট্রি শীট রেকর্ড করুন।
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>লগবুক দেখুন</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>

        {/* 2. OSCE / OSPE Hub */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div
            onClick={onOpenOSCE}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                OSCE / OSPE স্টেশন ও ভাইভা গাইড
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                ৫ মিনিটের প্রফেশনাল এক্সাম টাইমার, স্টেপ-বাই-স্টেপ এক্সাম চেকলিস্ট ও হাই-ইল্ড ভাইভা উত্তর।
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>প্র্যাকটিস শুরু করুন</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>

        {/* 3. Pediatric Dose Calculator */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div
            onClick={onOpenDoseCalc}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs hover:shadow-lg hover:border-amber-300 transition-all cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                পেডিয়াট্রিক mg/kg ডোজ ক্যালকুলেটর
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                প্যারাসিটামল, অ্যামোক্সিসিলিন, এজিথ্রোমাইসিনের মিলি/চামচ রূপান্তরসহ নিখুঁত শিশু ডোজ গণনা।
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>হিসেব করুন</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>

        {/* 4. PostGrad Quiz */}
        <ScrollReveal animation="fade-up" delay={250}>
          <div
            onClick={onOpenQuiz}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs hover:shadow-lg hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                FCPS-1 ও রেসিডেন্সি কুইজ হাব
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                বিসিপিএস ও বিএসএমএমইউ এর পূর্ববর্তী পরীক্ষার প্রশ্ন ব্যাংক ও পূর্ণাঙ্গ ক্লিনিক্যাল ব্যাখ্যা।
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>মক টেস্ট দিন</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>

        {/* 5. Clinical Case Discussion Forum */}
        <ScrollReveal animation="fade-up" delay={300}>
          <div
            onClick={onOpenForum}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xs hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                ECG ও ক্লিনিক্যাল কেস ডিসকাশন ফোরাম
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                ইসিজি স্ট্রিপ, চেস্ট এক্স-রে ও জটিল কেস নিয়ে সিনিয়র কনসালট্যান্টদের মতামত নিন।
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>ফোরামে যান</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default StudentDashboard;
