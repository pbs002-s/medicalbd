import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockLabReports } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  FlaskConical,
  ArrowLeft,
  ChevronRight,
  Download,
  Upload,
  Search,
  CheckCircle2,
  Building2,
  RefreshCw
} from 'lucide-react';

interface ReportsPageProps {
  onBack?: () => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { toBn } = useLanguage();

  const [selectedReportId, setSelectedReportId] = useState<string>(mockLabReports[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const currentReport = mockLabReports.find((r) => r.id === selectedReportId) || mockLabReports[0];

  const filteredReports = mockLabReports.filter((rep) => {
    return (
      searchQuery === '' ||
      rep.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.labName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* Header & Breadcrumb */}
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
                <span className="text-blue-600 font-semibold">ল্যাব টেস্ট রিপোর্ট ও ফলাফল</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5">
                ডায়াগনস্টিক রিপোর্ট ভল্ট
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all btn-press"
            >
              <Upload className="w-4 h-4" />
              <span>নতুন রিপোর্ট আপলোড</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 14-day Free Follow-Up Notice Banner */}
      <ScrollReveal animation="fade-up" duration={400}>
        <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-white border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-sm">১৪ দিনের ফ্রি রিপোর্ট রিভিউ উইন্ডো সক্রিয়</h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                ডা. তানভীর হাসানের পরামর্শে করা টেস্ট রিপোর্ট আগামী ৮ দিনের মধ্যে ফ্রিতে দেখাতে পারবেন।
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('appointments')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold whitespace-nowrap btn-press"
          >
            ফলোআপ সিরিয়াল নিন
          </button>
        </div>
      </ScrollReveal>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Columns: Filter & Report List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="টেস্টের নাম দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-blue-500 font-bangla"
              />
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {filteredReports.map((rep) => {
                const isSelected = rep.id === currentReport.id;
                return (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedReportId(rep.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-50/80 border-purple-400 shadow-2xs'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-50 text-xs leading-tight">{rep.testName}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{rep.labName}</p>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                          rep.status === 'normal'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {rep.statusBn}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                      <span>{rep.dateBn}</span>
                      <span className="font-mono text-purple-600 font-bold">PDF রেডি </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 8 Columns: Report Detail View with Reference Ranges */}
        <div className="lg:col-span-8 space-y-6">
          <ScrollReveal animation="fade-up" duration={450}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100 inline-block mb-1">
                    ল্যাব টেস্ট ফলাফল বিবরণী
                  </span>
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-50">{currentReport.testName}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{currentReport.labName} • তারিখ: {currentReport.dateBn}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(' ল্যাব রিপোর্ট PDF ডাউনলোড শুরু হয়েছে!')}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-colors btn-press"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ডাউনলোড</span>
                  </button>
                </div>
              </div>

              {/* Biomarkers Table with Range Meters */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">পরীক্ষার ফলাফল ও রেফারেন্স সীমা (Reference Range)</h3>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">ফলাফল ভ্যালু:</span>
                    <strong className="font-mono text-base text-slate-900 dark:text-slate-50">{currentReport.resultValue || 'Normal'}</strong>
                  </div>

                  {currentReport.referenceRange && (
                    <div className="flex justify-between items-center text-xs border-t border-slate-200 dark:border-slate-800 pt-2">
                      <span className="text-slate-500 dark:text-slate-400">স্বাভাবিক রেফারেন্স সীমা:</span>
                      <span className="font-mono text-emerald-700 font-bold">{currentReport.referenceRange}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs border-t border-slate-200 dark:border-slate-800 pt-2">
                    <span className="text-slate-500 dark:text-slate-400">স্ট্যাটাস:</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        currentReport.status === 'normal'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {currentReport.statusBn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lab Authenticity Badge */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1 text-xs">
                <h4 className="font-bold text-blue-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>ডিজিটাল ভেরিফিকেশন ও মন্তব্য:</span>
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                  এই রিপোর্টটি সংশ্লিষ্ট ডায়াগনস্টিক সেন্টারের সেন্ট্রাল ডাটাবেজ থেকে ডিজিটালভাবে ভেরিফাই ও সংগ্রহ করা হয়েছে।
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800 animate-slide-up">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">ল্যাব টেস্ট রিপোর্ট আপলোড</h3>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/60">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">ফাইল এখানে ড্র্যাগ করুন অথবা ব্রাউজ করুন</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">PDF, JPG, PNG (সর্বোচ্চ ১০ MB)</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsUploadOpen(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  alert(' রিপোর্ট সফলভাবে সংরক্ষিত হয়েছে!');
                  setIsUploadOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                আপলোড সম্পন্ন করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
