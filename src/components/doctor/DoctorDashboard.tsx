import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useQueue } from '../../context/QueueContext';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Stethoscope,
  Users,
  Clock,
  FileText,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  TrendingUp,
  Tv,
  ArrowRight
} from 'lucide-react';

interface DoctorDashboardProps {
  onOpenPrescriptionBuilder: () => void;
  onOpenTVDisplay: () => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  onOpenPrescriptionBuilder,
  onOpenTVDisplay
}) => {
  const { currentUser } = useAuth();
  const { toBn } = useLanguage();
  const { currentSerial, totalTokens, advanceSerial, doctorStatus, updateDoctorStatus, doctorStatusBn } = useQueue();

  const patientsQueue = [
    { token: 12, name: 'আসিফ করিম', age: '৪৫', problem: 'বুকে ব্যথা ও উচ্চ রক্তচাপ', status: 'এখন চেম্বারে', time: '11:00 AM' },
    { token: 13, name: 'ফাতেমা বেগম', age: '২৮', problem: 'গর্ভাবস্থার রুটিন চেকআপ', status: 'পরবর্তী', time: '11:15 AM' },
    { token: 14, name: 'মোঃ রফিকুল', age: '৫২', problem: 'ডায়াবেটিস ফলোআপ ও রিপোর্ট প্রদর্শন', status: 'অপেক্ষমাণ', time: '11:30 AM', isReport: true },
    { token: 15, name: 'তানজিনা আক্তার', age: '৩৪', problem: 'তীব্র মাথাব্যথা ও মাইগ্রেন', status: 'অপেক্ষমাণ', time: '11:45 AM' },
    { token: 18, name: 'সালমান আহমেদ', age: '৩১', problem: 'জ্বর ও বমি (ডেঙ্গু সন্দেহ)', status: 'অপেক্ষমাণ', time: '12:15 PM' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* Doctor Header Banner */}
      <ScrollReveal animation="fade-down" duration={450}>
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80'}
              alt="Doctor"
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold">{currentUser?.nameBn || 'ডা. তানভীর হাসান'}</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                  BMDC: A-54982 
                </span>
              </div>
              <p className="text-xs text-teal-100 mt-0.5">
                মেডিসিন বিশেষজ্ঞ • সহকারী অধ্যাপক, ঢাকা মেডিকেল কলেজ হাসপাতাল
              </p>
              <p className="text-[11px] text-teal-200 mt-0.5">
                বর্তমান চেম্বার: ল্যাবএইড ডায়াগনস্টিক সেন্টার, ধানমন্ডি (রুম ৩০৪)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenPrescriptionBuilder}
              className="px-4 py-2.5 bg-white dark:bg-slate-900 text-emerald-800 hover:bg-emerald-50 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all btn-press"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>স্মার্ট প্রেসক্রিপশন লিখুন</span>
            </button>
            <button
              onClick={onOpenTVDisplay}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all btn-press"
            >
              <Tv className="w-4 h-4" />
              <span>টিভি ডিসপ্লে মোড</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">আজকের মোট রোগী</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-50 my-0.5 block">{toBn(totalTokens)} জন</span>
            <span className="text-[10px] text-emerald-600 font-bold">বুকিং পূর্ণ</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">দেখা সম্পন্ন হয়েছে</span>
            <span className="text-2xl font-black text-blue-600 my-0.5 block">{toBn(currentSerial - 1)} জন</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">মোট রোগীর {(Math.round(((currentSerial - 1) / totalTokens) * 100))}%</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">চলতি সিরিয়াল</span>
            <span className="text-2xl font-black text-emerald-600 my-0.5 block">{toBn(currentSerial)}</span>
            <span className="text-[10px] text-emerald-700 font-bold">{doctorStatusBn}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">১৪ দিনের ফ্রি রিপোর্ট রোগী</span>
            <span className="text-2xl font-black text-purple-600 my-0.5 block">{toBn(6)} জন</span>
            <span className="text-[10px] text-purple-700 font-bold">ফ্রি রিভিউ উইন্ডো</span>
          </div>
        </ScrollReveal>
      </div>

      {/* Patient Queue & Active Chamber Control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Queue Table */}
        <div className="lg:col-span-8">
          <ScrollReveal animation="fade-up" duration={450}>
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm sm:text-base">
                  আজকের চেম্বার সিরিয়াল তালিকা ({toBn(patientsQueue.length)} জন প্রদর্শিত)
                </h3>

                <button
                  onClick={advanceSerial}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all btn-press"
                >
                  <span>পরবর্তী ডাকুন ({toBn(currentSerial + 1)})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
                {patientsQueue.map((p) => {
                  const isCurrent = p.token === currentSerial;
                  return (
                    <div
                      key={p.token}
                      className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                        isCurrent ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-black text-sm ${
                          isCurrent ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          #{toBn(p.token)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 dark:text-slate-50 text-sm">{p.name}</h4>
                            <span className="text-xs text-slate-400 dark:text-slate-500">({toBn(p.age)} বছর)</span>
                            {p.isReport && (
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md">
                                ফ্রি রিপোর্ট রিভিউ
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.problem}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">{p.time}</span>
                        <button
                          onClick={onOpenPrescriptionBuilder}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs btn-press"
                        >
                          প্রেসক্রিপশন দিন
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right 4 Cols: Chamber Schedules */}
        <div className="lg:col-span-4 space-y-4">
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">আমার চেম্বার শিডিউল</h3>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                  সকালের সেশন (সরকারি)
                </span>
                <h4 className="font-bold text-slate-900 dark:text-slate-50">ঢাকা মেডিকেল কলেজ হাসপাতাল</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">শনিবার - বৃহস্পতিবার (সকাল ৮:০০ - দুপুর ২:৩০)</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1 text-xs">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                  সান্ধ্যকালীন চেম্বার (প্রাইভেট)
                </span>
                <h4 className="font-bold text-slate-900 dark:text-slate-50">ল্যাবএইড ডায়াগনস্টিক, ধানমন্ডি</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">সন্ধ্যা ৫:০০ - রাত ৯:০০ (ফি: ৳ ১২০০)</p>
                <p className="text-[10px] text-emerald-600 font-bold">১৪ দিনের মধ্যে রিপোর্ট দেখানো ফ্রি</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
