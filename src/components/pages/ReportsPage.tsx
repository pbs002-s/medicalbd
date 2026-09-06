import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockAppointments, mockLabReports } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import { getFreeReviewWindow } from '../../lib/clinical';
import {
  FlaskConical,
  ArrowLeft,
  ChevronRight,
  Download,
  Upload,
  Search,
  CheckCircle2,
  Building2,
  RefreshCw,
  FileText
} from 'lucide-react';

interface ReportsPageProps {
  onBack?: () => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();

  const [selectedReportId, setSelectedReportId] = useState<string>(mockLabReports[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const currentReport = mockLabReports.find((r) => r.id === selectedReportId) || mockLabReports[0];

  const lastConsultationDate = mockAppointments[0]?.date ?? new Date().toISOString().slice(0, 10);
  const reviewWindow = getFreeReviewWindow(lastConsultationDate);

  const filteredReports = mockLabReports.filter((rep) => {
    return (
      searchQuery === '' ||
      rep.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.labName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header & Breadcrumb */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack ? onBack() : setActiveView('dashboard')}
              className="p-2 rounded-xl bg-paper hover:bg-slate-100 dark:hover:bg-slate-800 text-muted hover:text-ink transition-colors border border-border"
              title={tr('Back to Dashboard', 'ড্যাশবোর্ডে ফিরে যান')}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-muted font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  {tr('Dashboard', 'ড্যাশবোর্ড')}
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-blue-600 font-semibold">{tr('Diagnostic Reports & Results', 'ল্যাব টেস্ট রিপোর্ট ও ফলাফল')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5">
                {tr('Diagnostic Reports Vault', 'ডায়াগনস্টিক রিপোর্ট ভল্ট')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="btn btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Upload className="w-4 h-4" />
              <span>{tr('Upload New Report', 'নতুন রিপোর্ট আপলোড')}</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 14-day free follow-up window banner */}
      <ScrollReveal animation="fade-up" duration={400}>
        <div
          className={`card card-pad border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevation-1 ${
            reviewWindow.isOpen
              ? reviewWindow.isExpiringSoon
                ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
              : 'bg-paper border-border'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-2xl text-white flex items-center justify-center shrink-0 ${
                reviewWindow.isOpen
                  ? reviewWindow.isExpiringSoon
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                  : 'bg-slate-400'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-ink text-sm">
                {reviewWindow.isOpen
                  ? tr(
                      `14-Day Free Report Review Window Active — ${num(reviewWindow.daysRemaining)} days remaining`,
                      `১৪ দিনের ফ্রি রিপোর্ট রিভিউ উইন্ডো সক্রিয় — আর ${num(reviewWindow.daysRemaining)} দিন বাকি`
                    )
                  : tr('Free report review window expired', 'ফ্রি রিপোর্ট রিভিউ উইন্ডো শেষ হয়েছে')}
              </h4>
              <p className="text-xs text-muted mt-0.5">
                {reviewWindow.isOpen
                  ? tr(
                      `Diagnostic reports requested by Dr. Tanvir Hasan are eligible for free consultation review until ${reviewWindow.expiresOn.toLocaleDateString(isBn ? 'bn-BD' : 'en-US')}.`,
                      `ডা. তানভীর হাসানের পরামর্শে করা টেস্ট রিপোর্ট ${reviewWindow.expiresOn.toLocaleDateString('bn-BD')} তারিখ পর্যন্ত ফ্রিতে দেখাতে পারবেন।`
                    )
                  : tr(
                      'Book a new appointment to review these reports — the next 14-day review window will begin then.',
                      'নতুন সিরিয়াল নিয়ে রিপোর্ট দেখান — পরবর্তী ভিজিটে আবার ১৪ দিনের উইন্ডো শুরু হবে।'
                    )}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('appointments')}
            className="btn btn-primary px-4 py-2 text-xs font-bold whitespace-nowrap"
          >
            {tr('Book Follow-Up Visit', 'ফলোআপ সিরিয়াল নিন')}
          </button>
        </div>
      </ScrollReveal>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Columns: Filter & Report List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={tr('Search report by test name...', 'টেস্টের নাম দিয়ে খুঁজুন...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:outline-hidden focus:border-blue-500"
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
                        ? 'bg-blue-50/80 dark:bg-blue-900/30 border-blue-500 shadow-2xs'
                        : 'bg-paper border-border hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-ink text-xs leading-tight">{rep.testName}</h4>
                        <p className="text-[11px] text-muted mt-0.5">{rep.labName}</p>
                      </div>
                      <span
                        className={`pill text-[10px] shrink-0 ${
                          rep.status === 'normal' ? 'pill-success' : 'pill-warning'
                        }`}
                      >
                        {isBn ? rep.statusBn : (rep.status === 'normal' ? 'Normal' : 'Borderline')}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between text-[10px] text-muted">
                      <span>{isBn ? rep.dateBn : rep.date}</span>
                      <span className="font-mono text-blue-600 font-bold">{tr('PDF Ready', 'PDF রেডি')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 8 Columns: Report Detail View */}
        <div className="lg:col-span-8 space-y-6">
          <ScrollReveal animation="fade-up" duration={450}>
            <div className="card card-pad bg-surface border border-border shadow-elevation-2 p-6 sm:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <span className="pill pill-info text-[10px] mb-1 inline-block">
                    {tr('Diagnostic Investigation Report', 'ল্যাব টেস্ট ফলাফল বিবরণী')}
                  </span>
                  <h2 className="text-xl font-black text-ink">{currentReport.testName}</h2>
                  <p className="text-xs text-muted mt-0.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-muted" />
                    <span>{currentReport.labName} • {tr('Date', 'তারিখ')}: {isBn ? currentReport.dateBn : currentReport.date}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(tr('Lab report PDF download initiated!', 'ল্যাব রিপোর্ট PDF ডাউনলোড শুরু হয়েছে!'))}
                    className="btn btn-outline py-1.5 px-3.5 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{tr('Download', 'ডাউনলোড')}</span>
                  </button>
                </div>
              </div>

              {/* Biomarkers Table with Range */}
              <div className="space-y-3">
                <h3 className="font-bold text-ink text-sm">
                  {tr('Test Findings & Reference Range', 'পরীক্ষার ফলাফল ও রেফারেন্স সীমা')}
                </h3>

                <div className="p-4 bg-paper rounded-2xl border border-border space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted">{tr('Measured Value:', 'ফলাফল ভ্যালু:')}</span>
                    <strong className="font-mono text-base text-ink">{currentReport.resultValue || 'Normal'}</strong>
                  </div>

                  {currentReport.referenceRange && (
                    <div className="flex justify-between items-center text-xs border-t border-border pt-2">
                      <span className="text-muted">{tr('Standard Reference Range:', 'স্বাভাবিক রেফারেন্স সীমা:')}</span>
                      <span className="font-mono text-emerald-600 font-bold">{currentReport.referenceRange}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs border-t border-border pt-2">
                    <span className="text-muted">{tr('Status:', 'স্ট্যাটাস:')}</span>
                    <span
                      className={`pill text-xs ${
                        currentReport.status === 'normal' ? 'pill-success' : 'pill-warning'
                      }`}
                    >
                      {isBn ? currentReport.statusBn : (currentReport.status === 'normal' ? 'Normal' : 'Borderline')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lab Authenticity Badge */}
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 space-y-1 text-xs">
                <h4 className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>{tr('Digital Authenticity & Verification:', 'ডিজিটাল ভেরিফিকেশন ও মন্তব্য:')}</span>
                </h4>
                <p className="text-muted leading-relaxed pt-1">
                  {tr(
                    'This report has been authenticated directly via the diagnostic laboratory electronic health records feed and archived in your lifelong health vault.',
                    'এই রিপোর্টটি সংশ্লিষ্ট ডায়াগনস্টিক সেন্টারের সেন্ট্রাল ডাটাবেজ থেকে ডিজিটালভাবে ভেরিফাই ও সংগ্রহ করা হয়েছে।'
                  )}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="card card-pad bg-surface rounded-3xl max-w-md w-full space-y-4 shadow-elevation-3 border border-border animate-slide-up">
            <h3 className="text-base font-bold text-ink">
              {tr('Upload Lab Investigation Report', 'ল্যাব টেস্ট রিপোর্ট আপলোড')}
            </h3>
            <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer bg-paper">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-ink">
                {tr('Drag file here or click to browse', 'ফাইল এখানে ড্র্যাগ করুন অথবা ব্রাউজ করুন')}
              </p>
              <p className="text-[10px] text-muted mt-1">PDF, JPG, PNG (Max 10 MB)</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsUploadOpen(false)}
                className="btn btn-outline flex-1 py-2 text-xs"
              >
                {tr('Cancel', 'বাতিল')}
              </button>
              <button
                onClick={() => {
                  alert(tr('Report successfully archived!', 'রিপোর্ট সফলভাবে সংরক্ষিত হয়েছে!'));
                  setIsUploadOpen(false);
                }}
                className="btn btn-primary flex-1 py-2 text-xs"
              >
                {tr('Complete Upload', 'আপলোড সম্পন্ন করুন')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
