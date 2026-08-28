import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  History,
  ArrowLeft,
  ChevronRight,
  Plus,
  Heart,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Stethoscope,
  FlaskConical,
  Pill,
  Clock,
  Sparkles
} from 'lucide-react';

interface HealthTimelinePageProps {
  onBack?: () => void;
}

export const HealthTimelinePage: React.FC<HealthTimelinePageProps> = ({ onBack }) => {
  const { currentUser, setActiveView } = useAuth();
  const { toBn } = useLanguage();

  const [isAddLogOpen, setIsAddLogOpen] = useState(false);

  const timelineEvents = [
    {
      id: 1,
      date: '২০ মে, ২০২৬',
      type: 'appointment',
      title: 'ডা. তানভীর হাসানের সাথে ফলোআপ চেকআপ',
      place: 'ল্যাবএইড ডায়াগনস্টিক, ধানমন্ডি',
      notes: 'রক্তচাপ ১৩০/৮৫ mmHg। লিপিড প্রোফাইল টেস্টের ফলাফল পর্যালোচনা করা হবে।',
      icon: Stethoscope,
      color: 'bg-blue-500 text-white',
      tag: 'আসন্ন অ্যাপয়েন্টমেন্ট',
    },
    {
      id: 2,
      date: '১৬ মে, ২০২৬',
      type: 'rx',
      title: 'নতুন প্রেসক্রিপশন সংরক্ষিত (Rx-8891)',
      place: 'ল্যাবএইড ডায়াগনস্টিক সেন্টার',
      notes: 'ওষুধ সংযোজন: Tab. Napa Extra ও Tab. Sergel 20mg।',
      icon: Pill,
      color: 'bg-teal-500 text-white',
      tag: 'ই-প্রেসক্রিপশন',
    },
    {
      id: 3,
      date: '১৪ মে, ২০২৬',
      type: 'lab',
      title: 'ল্যাব টেস্ট সম্পন্ন (CBC ও Lipid Panel)',
      place: 'ল্যাবএইড মেইন ব্রাঞ্চ',
      notes: 'হিমোগ্লোবিন ১৪.২ g/dL (স্বাভাবিক), সিরাম কোলেস্টেরল ১৯৫ mg/dL।',
      icon: FlaskConical,
      color: 'bg-purple-500 text-white',
      tag: 'ল্যাব রিপোর্ট',
    },
    {
      id: 4,
      date: '১০ জানুয়ারি, ২০২৬',
      type: 'vitals',
      title: 'বার্ষিক স্বাস্থ্য পরীক্ষা ও ভ্যাকসিন',
      place: 'ইউনাইটেড হাসপাতাল, ঢাকা',
      notes: 'ইনফ্লুয়েঞ্জা ভ্যাকসিনেশন সম্পন্ন। রক্তচাপ ১২৫/৮০ mmHg।',
      icon: ShieldCheck,
      color: 'bg-emerald-500 text-white',
      tag: 'প্রতিরোধমূলক সেবা',
    },
    {
      id: 5,
      date: '১৫ আগস্ট, ২০২৫',
      type: 'surgery',
      title: 'ল্যাপারোস্কপিক এপেন্ডিসেক্টমি',
      place: 'ঢাকা মেডিকেল কলেজ হাসপাতাল',
      notes: 'সফল অস্ত্রোপচার ও সম্পূর্ণ সুস্থতা। কোনো জটিলতা নেই।',
      icon: Activity,
      color: 'bg-rose-500 text-white',
      tag: 'অস্ত্রোপচার ইতিহাস',
    },
  ];

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
                <span className="text-blue-600 font-semibold">আমার স্বাস্থ্য টাইমলাইন</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5">
                আজীবন স্বাস্থ্য বিবরণী ও টাইমলাইন
              </h1>
            </div>
          </div>

          <button
            onClick={() => setIsAddLogOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all btn-press"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন স্বাস্থ্য রেকর্ড যুক্ত করুন</span>
          </button>
        </div>
      </ScrollReveal>

      {/* Patient Health Summary Card */}
      <ScrollReveal animation="fade-up" duration={450}>
        <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/20 pb-5 mb-5">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                alt="Patient"
                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
              />
              <div>
                <h2 className="text-xl font-extrabold">{currentUser?.nameBn || 'সালমান আহমেদ'}</h2>
                <p className="text-xs text-blue-200 mt-0.5">বয়স: ৩১ বছর • রক্তের গ্রুপ: B+ (পজিটিভ)</p>
                <p className="text-[11px] text-blue-300">ডিজিটাল হেলথ আইডি: SH-BD-2026-9811</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20 text-center">
                <span className="text-[10px] text-blue-200 block">উচ্চতা / ওজন</span>
                <span className="text-sm font-bold font-mono">৫'৮" / ৭২ kg</span>
              </div>
              <div className="bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20 text-center">
                <span className="text-[10px] text-blue-200 block">বিএমআই (BMI)</span>
                <span className="text-sm font-bold font-mono text-emerald-400">২৪.১ (স্বাভাবিক)</span>
              </div>
            </div>
          </div>

          {/* Allergies & Chronic Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
              <span className="text-[11px] text-red-300 font-bold block mb-1"> চিহ্নিত ড্রাগ এলার্জি (Allergies):</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-200 border border-red-400/30 text-[11px] font-semibold">
                  Penicillin (পেনিসিলিন)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-200 border border-red-400/30 text-[11px] font-semibold">
                  Sulfa Drugs (সালফা ড্রাগ)
                </span>
              </div>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl border border-white/15">
              <span className="text-[11px] text-teal-300 font-bold block mb-1"> দীর্ঘমেয়াদী স্বাস্থ্য অবস্থা (Chronic Conditions):</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-200 border border-teal-400/30 text-[11px] font-semibold">
                  Hypertension (উচ্চ রক্তচাপ)
                </span>
                <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-200 border border-teal-400/30 text-[11px] font-semibold">
                  Mild Asthma (মৃদু হাঁপানি)
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Chronological Timeline Feed */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-slate-50 text-base">কালানুক্রমিক স্বাস্থ্য ইভেন্ট তালিকা</h3>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 space-y-6">
          {timelineEvents.map((evt, i) => {
            const Icon = evt.icon;
            return (
              <ScrollReveal key={evt.id} animation="fade-up" delay={i * 100}>
                <div className="relative group">
                  {/* Timeline bullet node */}
                  <div className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-8 h-8 rounded-full ${evt.color} flex items-center justify-center shadow-md ring-4 ring-white`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Content Box */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-blue-200 transition-all space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md inline-block">
                        {evt.date}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {evt.tag}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-slate-50 text-sm sm:text-base">{evt.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{evt.place}</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 leading-relaxed">
                      {evt.notes}
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800 animate-slide-up text-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">নতুন স্বাস্থ্য রেকর্ড যুক্ত করুন</h3>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">রেকর্ডের ধরন:</label>
              <select className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
                <option>ডাক্তার ভিজিট ও চেকআপ</option>
                <option>ভ্যাকসিন গ্রহণ</option>
                <option>রক্তচাপ ও ডায়াবেটিস পরিমাপ</option>
                <option>অস্ত্রোপচার বা হাসপাতালে ভর্তি</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">তারিখ:</label>
              <input type="date" defaultValue="2026-05-20" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs font-mono" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">বিবরণ:</label>
              <textarea rows={3} placeholder="স্বাস্থ্য ইভেন্টের বিস্তারিত..." className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs" />
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setIsAddLogOpen(false)} className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                বাতিল
              </button>
              <button
                onClick={() => {
                  alert(' স্বাস্থ্য বিবরণী সফলভাবে আপডেট হয়েছে!');
                  setIsAddLogOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTimelinePage;
