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
  Sparkles,
  CheckCircle2,
  FileText
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
  const { tr, num, isBn } = useLanguage();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Student Welcome Banner (OpenGovtBD card style) */}
      <ScrollReveal animation="fade-down" duration={450}>
        <div className="card card-pad bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-950 text-white shadow-elevation-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'}
              alt="Student"
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {isBn ? currentUser?.nameBn || 'আয়ান চৌধুরী' : currentUser?.name || 'Ayan Chowdhury'}
                </h1>
                <span className="pill bg-white/20 text-white border-white/30 text-[10.5px] font-mono">
                  DMC (K-78)
                </span>
              </div>
              <p className="text-xs text-purple-200">
                {tr('5th Year MBBS (Clinical Phase) • Dhaka Medical College', '৫ম বর্ষ এমবিবিএস (ক্লিনিক্যাল ফেজ) • ঢাকা মেডিকেল কলেজ')}
              </p>
              <p className="text-[11px] text-purple-300">
                {tr('Ward Posting: Internal Medicine (Ward 1, DMCH)', 'চলতি ওয়ার্ড পোস্টিং: ইন্টারনাল মেডিসিন (ওয়ার্ড ১, ডিএমসিএইচ)')}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenLogbook}
            className="btn btn-primary bg-white text-purple-900 hover:bg-purple-50 border-0"
          >
            <BookOpen className="w-4 h-4 text-purple-700" />
            <span>{tr('Open Clinical Logbook', 'কেস লগবুক খুলুন')}</span>
          </button>
        </div>
      </ScrollReveal>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('Saved Clinical Cases', 'সংরক্ষিত কেস')}
            </span>
            <span className="text-2xl font-black text-purple-700 dark:text-purple-400 my-0.5 block">
              {num(14)}
            </span>
            <span className="pill pill-success text-[10px] py-0.5">
              {tr('12 Verified', 'ভেরিফাইড: ১২টি')}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('OSCE Station Score', 'OSCE স্কোর')}
            </span>
            <span className="text-2xl font-black text-blue-600 my-0.5 block">
              {num('9.5')} / {num(10)}
            </span>
            <span className="pill pill-info text-[10px] py-0.5">
              {tr('Cardiovascular Exam', 'কার্ডিওভাসকুলার')}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('FCPS-1 Mock Practice', 'FCPS-1 প্র্যাকটিস')}
            </span>
            <span className="text-2xl font-black text-emerald-600 my-0.5 block">
              {num(84)}%
            </span>
            <span className="text-[10px] text-muted">
              {tr('Pharmacology & Physiology', 'ফার্মাকোলজি ও ফিজিওলজি')}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('Forum Peer Likes', 'ফোরাম লাইক')}
            </span>
            <span className="text-2xl font-black text-amber-600 my-0.5 block">
              {num(28)}
            </span>
            <span className="pill pill-warning text-[10px] py-0.5">
              {tr('Top Contributor', 'কেস মতামত')}
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* 5 Core Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* 1. Case Logbook */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div
            onClick={onOpenLogbook}
            className="card card-pad hoverable cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="stat-icon w-11 h-11 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-blue-600 transition-colors">
                {tr('Bedside Clinical Case Logbook', 'ক্লিনিক্যাল ওয়ার্ড কেস লগবুক')}
              </h3>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                {tr(
                  'Record standardized bedside history sheets for Medicine, Surgery, Gynae, and Paediatrics wards.',
                  'মেডিসিন, সার্জারি, গাইনি ও পেডিয়াট্রিক্স ওয়ার্ডের জন্য স্ট্যান্ডার্ড বেডসাইড হিস্ট্রি শীট রেকর্ড করুন।'
                )}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-blue-600">
              <span>{tr('Open Logbook', 'লগবুক দেখুন')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </ScrollReveal>

        {/* 2. OSCE / OSPE Hub */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div
            onClick={onOpenOSCE}
            className="card card-pad hoverable cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="stat-icon w-11 h-11 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 mb-3 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-blue-600 transition-colors">
                {tr('OSCE / OSPE Stations & Viva Guide', 'OSCE / OSPE স্টেশন ও ভাইভা গাইড')}
              </h3>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                {tr(
                  'Interactive 5-minute examination timer, step-by-step clinical checklists, and high-yield viva Q&As.',
                  '৫ মিনিটের প্রফেশনাল এক্সাম টাইমার, স্টেপ-বাই-স্টেপ এক্সাম চেকলিস্ট ও হাই-ইল্ড ভাইভা উত্তর।'
                )}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-blue-600">
              <span>{tr('Start Practice', 'প্র্যাকটিস শুরু করুন')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </ScrollReveal>

        {/* 3. Pediatric Dose Calculator */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div
            onClick={onOpenDoseCalc}
            className="card card-pad hoverable cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="stat-icon w-11 h-11 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 mb-3 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-blue-600 transition-colors">
                {tr('Pediatric mg/kg Weight-Based Dose Calc', 'পেডিয়াট্রিক mg/kg ডোজ ক্যালকুলেটর')}
              </h3>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                {tr(
                  'Accurate infant and child dosing with syrup, suspension, and spoon conversions for Paracetamol, Amoxicillin, etc.',
                  'প্যারাসিটামল, অ্যামোক্সিসিলিন, এজিথ্রোমাইসিনের মিলি/চামচ রূপান্তরসহ নিখুঁত শিশু ডোজ গণনা।'
                )}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-blue-600">
              <span>{tr('Calculate Dose', 'হিসেব করুন')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </ScrollReveal>

        {/* 4. PostGrad Quiz */}
        <ScrollReveal animation="fade-up" delay={250}>
          <div
            onClick={onOpenQuiz}
            className="card card-pad hoverable cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="stat-icon w-11 h-11 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 mb-3 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-blue-600 transition-colors">
                {tr('FCPS-1 & Residency Quiz Bank', 'FCPS-1 ও রেসিডেন্সি কুইজ হাব')}
              </h3>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                {tr(
                  'BCPS and BSMMU past examination questions with comprehensive explanations and rationales.',
                  'বিসিপিএস ও বিএসএমএমইউ এর পূর্ববর্তী পরীক্ষার প্রশ্ন ব্যাংক ও পূর্ণাঙ্গ ক্লিনিক্যাল ব্যাখ্যা।'
                )}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-blue-600">
              <span>{tr('Take Mock Test', 'মক টেস্ট দিন')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </ScrollReveal>

        {/* 5. Clinical Case Discussion Forum */}
        <ScrollReveal animation="fade-up" delay={300}>
          <div
            onClick={onOpenForum}
            className="card card-pad hoverable cursor-pointer group flex flex-col justify-between h-full"
          >
            <div>
              <div className="stat-icon w-11 h-11 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-blue-600 transition-colors">
                {tr('ECG & Clinical Case Study Forum', 'ECG ও ক্লিনিক্যাল কেস ডিসকাশন ফোরাম')}
              </h3>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                {tr(
                  'Share ECG strips, Chest X-rays, and rare ward cases for diagnosis feedback from registrars and professors.',
                  'ইসিজি স্ট্রিপ, চেস্ট এক্স-রে ও জটিল কেস নিয়ে সিনিয়র কনসালট্যান্টদের মতামত নিন।'
                )}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-blue-600">
              <span>{tr('Join Discussion', 'ফোরামে যান')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default StudentDashboard;
