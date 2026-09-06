import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  History,
  ArrowLeft,
  ChevronRight,
  Plus,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  Activity
} from 'lucide-react';

interface HealthTimelinePageProps {
  onBack?: () => void;
}

export const HealthTimelinePage: React.FC<HealthTimelinePageProps> = ({ onBack }) => {
  const { currentUser, setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();

  const [isAddLogOpen, setIsAddLogOpen] = useState(false);

  const timelineEvents = [
    {
      id: 1,
      dateEn: '20 May, 2026',
      dateBn: '২০ মে, ২০২৬',
      type: 'appointment',
      titleEn: 'Follow-up Consultation with Dr. Tanvir Hasan',
      titleBn: 'ডা. তানভীর হাসানের সাথে ফলোআপ চেকআপ',
      placeEn: 'Labaid Diagnostic, Dhanmondi',
      placeBn: 'ল্যাবএইড ডায়াগনস্টিক, ধানমন্ডি',
      notesEn: 'Blood pressure recorded at 130/85 mmHg. Lipid panel report will be reviewed.',
      notesBn: 'রক্তচাপ ১৩০/৮৫ mmHg। লিপিড প্রোফাইল টেস্টের ফলাফল পর্যালোচনা করা হবে।',
      icon: Stethoscope,
      color: 'bg-blue-600 text-white',
      tagEn: 'Upcoming Visit',
      tagBn: 'আসন্ন অ্যাপয়েন্টমেন্ট',
    },
    {
      id: 2,
      dateEn: '16 May, 2026',
      dateBn: '১৬ মে, ২০২৬',
      type: 'rx',
      titleEn: 'New e-Prescription Archived (Rx-8891)',
      titleBn: 'নতুন প্রেসক্রিপশন সংরক্ষিত (Rx-8891)',
      placeEn: 'Labaid Diagnostic Center',
      placeBn: 'ল্যাবএইড ডায়াগনস্টিক সেন্টার',
      notesEn: 'Medications added: Tab. Napa Extra and Tab. Sergel 20mg.',
      notesBn: 'ওষুধ সংযোজন: Tab. Napa Extra ও Tab. Sergel 20mg।',
      icon: Pill,
      color: 'bg-emerald-600 text-white',
      tagEn: 'e-Prescription',
      tagBn: 'ই-প্রেসক্রিপশন',
    },
    {
      id: 3,
      dateEn: '14 May, 2026',
      dateBn: '১৪ মে, ২০২৬',
      type: 'lab',
      titleEn: 'Diagnostic Investigation Completed (CBC & Lipid Panel)',
      titleBn: 'ল্যাব টেস্ট সম্পন্ন (CBC ও Lipid Panel)',
      placeEn: 'Labaid Main Branch, Dhaka',
      placeBn: 'ল্যাবএইড মেইন ব্রাঞ্চ',
      notesEn: 'Hemoglobin 14.2 g/dL (Normal), Serum Cholesterol 195 mg/dL.',
      notesBn: 'হিমোগ্লোবিন ১৪.২ g/dL (স্বাভাবিক), সিরাম কোলেস্টেরল ১৯৫ mg/dL।',
      icon: FlaskConical,
      color: 'bg-purple-600 text-white',
      tagEn: 'Lab Report',
      tagBn: 'ল্যাব রিপোর্ট',
    },
    {
      id: 4,
      dateEn: '10 Jan, 2026',
      dateBn: '১০ জানুয়ারি, ২০২৬',
      type: 'vitals',
      titleEn: 'Annual Health Checkup & Immunization',
      titleBn: 'বার্ষিক স্বাস্থ্য পরীক্ষা ও ভ্যাকসিন',
      placeEn: 'United Hospital, Dhaka',
      placeBn: 'ইউনাইটেড হাসপাতাল, ঢাকা',
      notesEn: 'Seasonal influenza booster vaccination administered. BP 125/80 mmHg.',
      notesBn: 'ইনফ্লুয়েঞ্জা ভ্যাকসিনেশন সম্পন্ন। রক্তচাপ ১২৫/৮০ mmHg।',
      icon: ShieldCheck,
      color: 'bg-teal-600 text-white',
      tagEn: 'Preventive Care',
      tagBn: 'প্রতিরোধমূলক সেবা',
    },
    {
      id: 5,
      dateEn: '15 Aug, 2025',
      dateBn: '১৫ আগস্ট, ২০২৫',
      type: 'surgery',
      titleEn: 'Laparoscopic Appendectomy',
      titleBn: 'ল্যাপারোস্কপিক এপেন্ডিসেক্টমি',
      placeEn: 'Dhaka Medical College Hospital',
      placeBn: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
      notesEn: 'Surgical recovery uneventful. Full healing confirmed with no complications.',
      notesBn: 'সফল অস্ত্রোপচার ও সম্পূর্ণ সুস্থতা। কোনো জটিলতা নেই।',
      icon: Activity,
      color: 'bg-rose-600 text-white',
      tagEn: 'Surgical History',
      tagBn: 'অস্ত্রোপচার ইতিহাস',
    },
  ];

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
                <span className="text-blue-600 font-semibold">{tr('My Health Timeline', 'আমার স্বাস্থ্য টাইমলাইন')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5">
                {tr('Lifelong Health Records & Timeline', 'আজীবন স্বাস্থ্য বিবরণী ও টাইমলাইন')}
              </h1>
            </div>
          </div>

          <button
            onClick={() => setIsAddLogOpen(true)}
            className="btn btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{tr('Log Health Event', 'নতুন স্বাস্থ্য রেকর্ড যুক্ত করুন')}</span>
          </button>
        </div>
      </ScrollReveal>

      {/* Patient Health Summary Card */}
      <ScrollReveal animation="fade-up" duration={450}>
        <div className="card card-pad bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-elevation-2 border-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/20 pb-5 mb-5">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt="Patient"
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
              />
              <div>
                <h2 className="text-xl font-extrabold">{isBn ? (currentUser?.nameBn || 'সালমান আহমেদ') : (currentUser?.name || 'Salman Ahmed')}</h2>
                <p className="text-xs text-blue-200 mt-0.5">
                  {tr('Age: 31 years • Blood Group: B+ (Positive)', 'বয়স: ৩১ বছর • রক্তের গ্রুপ: B+ (পজিটিভ)')}
                </p>
                <p className="text-[11px] text-blue-300 font-mono">
                  {tr('Digital Health ID: SH-BD-2026-9811', 'ডিজিটাল হেলথ আইডি: SH-BD-2026-9811')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20 text-center">
                <span className="text-[10px] text-blue-200 block">{tr('Height / Weight', 'উচ্চতা / ওজন')}</span>
                <span className="text-sm font-bold font-mono">5&apos;8&quot; / 72 kg</span>
              </div>
              <div className="bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20 text-center">
                <span className="text-[10px] text-blue-200 block">{tr('BMI', 'বিএমআই (BMI)')}</span>
                <span className="text-sm font-bold font-mono text-emerald-300">24.1 ({tr('Normal', 'স্বাভাবিক')})</span>
              </div>
            </div>
          </div>

          {/* Allergies & Chronic Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
              <span className="text-[11px] text-red-300 font-bold block mb-1">
                ⚠️ {tr('Known Drug Allergies:', 'চিহ্নিত ড্রাগ এলার্জি (Allergies):')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-200 border border-red-400/30 text-[11px] font-semibold">
                  Penicillin
                </span>
                <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-200 border border-red-400/30 text-[11px] font-semibold">
                  Sulfa Drugs
                </span>
              </div>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
              <span className="text-[11px] text-teal-300 font-bold block mb-1">
                🩺 {tr('Chronic Conditions:', 'দীর্ঘমেয়াদী স্বাস্থ্য অবস্থা (Chronic Conditions):')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-200 border border-teal-400/30 text-[11px] font-semibold">
                  {tr('Hypertension', 'Hypertension (উচ্চ রক্তচাপ)')}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-200 border border-teal-400/30 text-[11px] font-semibold">
                  {tr('Mild Asthma', 'Mild Asthma (মৃদু হাঁপানি)')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Chronological Timeline Feed */}
      <div className="space-y-4">
        <h3 className="font-bold text-ink text-base">
          {tr('Chronological Health Events', 'কালানুক্রমিক স্বাস্থ্য ইভেন্ট তালিকা')}
        </h3>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-900 space-y-6">
          {timelineEvents.map((evt, i) => {
            const Icon = evt.icon;
            return (
              <ScrollReveal key={evt.id} animation="fade-up" delay={i * 100}>
                <div className="relative group">
                  {/* Timeline bullet node */}
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-8 h-8 rounded-full ${evt.color} flex items-center justify-center shadow-md ring-4 ring-paper`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content Box */}
                  <div className="card card-pad bg-surface border border-border hover:border-blue-300 shadow-elevation-1 hover:shadow-elevation-2 transition-all space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-md inline-block">
                        {isBn ? evt.dateBn : evt.dateEn}
                      </span>
                      <span className="pill pill-info text-[10px]">
                        {isBn ? evt.tagBn : evt.tagEn}
                      </span>
                    </div>

                    <h4 className="font-bold text-ink text-sm sm:text-base">
                      {isBn ? evt.titleBn : evt.titleEn}
                    </h4>
                    <p className="text-xs text-muted">{isBn ? evt.placeBn : evt.placeEn}</p>
                    <p className="text-xs text-muted bg-paper p-3 rounded-2xl border border-border leading-relaxed">
                      {isBn ? evt.notesBn : evt.notesEn}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Add Log Modal */}
      {isAddLogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="card card-pad bg-surface rounded-3xl max-w-md w-full p-6 space-y-4 shadow-elevation-3 border border-border animate-slide-up text-xs">
            <h3 className="text-base font-bold text-ink">
              {tr('Log New Health Event', 'নতুন স্বাস্থ্য রেকর্ড যুক্ত করুন')}
            </h3>
            <div>
              <label className="block font-bold text-ink mb-1">
                {tr('Record Type:', 'রেকর্ডের ধরন:')}
              </label>
              <select className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs text-ink">
                <option>{tr('Doctor Visit & Consultation', 'ডাক্তার ভিজিট ও চেকআপ')}</option>
                <option>{tr('Immunization / Vaccine', 'ভ্যাকসিন গ্রহণ')}</option>
                <option>{tr('Vitals Measurement (BP/Glucose)', 'রক্তচাপ ও ডায়াবেটিস পরিমাপ')}</option>
                <option>{tr('Hospital Admission / Procedure', 'অস্ত্রোপচার বা হাসপাতালে ভর্তি')}</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">
                {tr('Date:', 'তারিখ:')}
              </label>
              <input type="date" defaultValue="2026-05-20" className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs font-mono text-ink" />
            </div>
            <div>
              <label className="block font-bold text-ink mb-1">
                {tr('Clinical Summary:', 'বিবরণ:')}
              </label>
              <textarea
                rows={3}
                placeholder={tr('Details of medical event, diagnosis, or vitals...', 'স্বাস্থ্য ইভেন্টের বিস্তারিত...')}
                className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs text-ink"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setIsAddLogOpen(false)} className="btn btn-outline flex-1 py-2 text-xs">
                {tr('Cancel', 'বাতিল')}
              </button>
              <button
                onClick={() => {
                  alert(tr('Health record saved successfully!', 'স্বাস্থ্য বিবরণী সফলভাবে আপডেট হয়েছে!'));
                  setIsAddLogOpen(false);
                }}
                className="btn btn-primary flex-1 py-2 text-xs font-bold"
              >
                {tr('Save Record', 'সংরক্ষণ করুন')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTimelinePage;
