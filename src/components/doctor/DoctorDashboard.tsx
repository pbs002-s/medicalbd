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
  ArrowRight,
  UserCheck,
  AlertTriangle,
  Coffee
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
  const { tr, num, isBn } = useLanguage();
  const { currentSerial, totalTokens, advanceSerial, doctorStatus, updateDoctorStatus } = useQueue();

  const patientsQueue = [
    { token: 12, nameEn: 'Asif Karim', nameBn: 'আসিফ করিম', ageEn: '45', ageBn: '৪৫', problemEn: 'Chest discomfort & Hypertension', problemBn: 'বুকে ব্যথা ও উচ্চ রক্তচাপ', statusEn: 'In Chamber', statusBn: 'এখন চেম্বারে', time: '11:00 AM' },
    { token: 13, nameEn: 'Fatema Begum', nameBn: 'ফাতেমা বেগম', ageEn: '28', ageBn: '২৮', problemEn: 'Routine antenatal checkup', problemBn: 'গর্ভাবস্থার রুটিন চেকআপ', statusEn: 'Next Up', statusBn: 'পরবর্তী', time: '11:15 AM' },
    { token: 14, nameEn: 'Md. Rafiqul', nameBn: 'মোঃ রফিকুল', ageEn: '52', ageBn: '৫২', problemEn: 'Diabetic follow-up & lab review', problemBn: 'ডায়াবেটিস ফলোআপ ও রিপোর্ট প্রদর্শন', statusEn: 'Waiting (Report)', statusBn: 'অপেক্ষমাণ (রিপোর্ট)', time: '11:30 AM', isReport: true },
    { token: 15, nameEn: 'Tanjina Akter', nameBn: 'তানজিনা আক্তার', ageEn: '34', ageBn: '৩৪', problemEn: 'Severe migraine headache', problemBn: 'তীব্র মাথাব্যথা ও মাইগ্রেন', statusEn: 'Waiting', statusBn: 'অপেক্ষমাণ', time: '11:45 AM' },
    { token: 18, nameEn: 'Salman Ahmed', nameBn: 'সালমান আহমেদ', ageEn: '31', ageBn: '৩১', problemEn: 'High fever & vomiting', problemBn: 'জ্বর ও বমি (ডেঙ্গু সন্দেহ)', statusEn: 'Waiting', statusBn: 'অপেক্ষমাণ', time: '12:15 PM' }
  ];

  const doctorStatusLabels = {
    in_chamber: tr('In Chamber', 'চেম্বারে আছেন'),
    on_way: tr('On The Way', 'পথে আছেন'),
    break: tr('On Break', 'বিরতিতে'),
    emergency: tr('Emergency Duty', 'জরুরি ডিউটিতে')
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Doctor Header Banner (OpenGovtBD card style) */}
      <ScrollReveal animation="fade-down" duration={450}>
        <div className="card card-pad bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 text-white shadow-elevation-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80'}
              alt="Doctor"
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
            />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  {isBn ? currentUser?.nameBn || 'ডা. তানভীর হাসান' : currentUser?.name || 'Dr. Tanveer Hassan'}
                </h1>
                <span className="pill bg-white/20 text-white border-white/30 text-[10px] font-mono">
                  BMDC: A-54982
                </span>
              </div>
              <p className="text-xs text-blue-100">
                {tr('Associate Professor, Internal Medicine • Dhaka Medical College', 'মেডিসিন বিশেষজ্ঞ • সহযোগী অধ্যাপক, ঢাকা মেডিকেল কলেজ হাসপাতাল')}
              </p>
              <p className="text-[11px] text-blue-200">
                {tr('Chamber: LabAid Diagnostic Center, Dhanmondi (Room 304)', 'বর্তমান চেম্বার: ল্যাবএইড ডায়াগনস্টিক সেন্টার, ধানমন্ডি (রুম ৩০৪)')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenPrescriptionBuilder}
              className="btn btn-primary bg-white text-blue-800 hover:bg-blue-50 border-0"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{tr('Rapid e-Prescription', 'স্মার্ট প্রেসক্রিপশন লিখুন')}</span>
            </button>

            <button
              onClick={onOpenTVDisplay}
              className="btn btn-outline border-white/40 text-white hover:bg-white/10"
            >
              <Tv className="w-4 h-4" />
              <span>{tr('Waiting Room TV Mode', 'টিভি ডিসপ্লে মোড')}</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr("Today's Total Patients", 'আজকের মোট রোগী')}
            </span>
            <span className="text-2xl font-black text-ink my-0.5 block">
              {num(totalTokens)}
            </span>
            <span className="pill pill-info text-[10px] py-0.5">
              {tr('Full Schedule', 'বুকিং পূর্ণ')}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('Consultations Done', 'দেখা সম্পন্ন হয়েছে')}
            </span>
            <span className="text-2xl font-black text-blue-600 my-0.5 block">
              {num(Math.max(0, currentSerial - 1))}
            </span>
            <span className="text-[10px] text-muted">
              {Math.round((Math.max(0, currentSerial - 1) / totalTokens) * 100)}% {tr('completed', 'সম্পন্ন')}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('Now Calling Token', 'চলতি সিরিয়াল')}
            </span>
            <span className="text-2xl font-black text-emerald-600 my-0.5 block">
              {num(currentSerial)}
            </span>
            <span className="pill pill-success text-[10px] py-0.5">
              {doctorStatusLabels[doctorStatus]}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('14-Day Free Report Patients', '১৪ দিনের ফ্রি রিপোর্ট রোগী')}
            </span>
            <span className="text-2xl font-black text-purple-600 my-0.5 block">
              {num(6)}
            </span>
            <span className="pill pill-warning text-[10px] py-0.5">
              {tr('Free Review Window', 'ফ্রি রিভিউ উইন্ডো')}
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Main Queue & Doctor Action Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Patient Live Queue Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="card card-pad">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="section-eyebrow">
                  <span className="n">01 /</span>
                  <span>{tr('Chamber Queue Terminal', 'চেম্বার কিউ')}</span>
                </span>
                <h3 className="font-bold text-ink text-sm sm:text-base">
                  {tr('Live Chamber Patient Queue', 'লাইভ চেম্বার সিরিয়াল তালিকা')}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={advanceSerial}
                  className="btn btn-primary btn-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>{tr('Call Next Patient', 'পরবর্তী রোগী ডাকুন')}</span>
                </button>
              </div>
            </div>

            {/* Queue Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted font-mono uppercase text-[10.5px]">
                    <th className="pb-2.5 font-bold">{tr('Token', 'টোকেন')}</th>
                    <th className="pb-2.5 font-bold">{tr('Patient Name', 'রোগীর নাম')}</th>
                    <th className="pb-2.5 font-bold">{tr('Complaint / Details', 'সমস্যা')}</th>
                    <th className="pb-2.5 font-bold">{tr('Time', 'সময়')}</th>
                    <th className="pb-2.5 font-bold">{tr('Status', 'অবস্থা')}</th>
                    <th className="pb-2.5 font-bold text-right">{tr('Action', 'অ্যাকশন')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {patientsQueue.map((pt) => {
                    const isCurrent = pt.token === currentSerial;
                    return (
                      <tr
                        key={pt.token}
                        className={`hover:bg-paper transition-colors ${
                          isCurrent ? 'bg-blue-50/50 dark:bg-blue-900/15 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3 font-mono font-black text-sm">
                          <span
                            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center ${
                              isCurrent
                                ? 'bg-blue-600 text-white shadow-2xs'
                                : 'bg-paper text-ink border border-border'
                            }`}
                          >
                            {num(pt.token)}
                          </span>
                        </td>
                        <td className="py-3 font-bold text-ink">
                          {isBn ? pt.nameBn : pt.nameEn}
                          <span className="text-[10.5px] text-muted font-normal ml-1">
                            ({num(isBn ? pt.ageBn : pt.ageEn)} {tr('yrs', 'বছর')})
                          </span>
                        </td>
                        <td className="py-3 text-muted">
                          {isBn ? pt.problemBn : pt.problemEn}
                        </td>
                        <td className="py-3 font-mono text-muted">{pt.time}</td>
                        <td className="py-3">
                          <span
                            className={`pill text-[10px] py-0.5 ${
                              isCurrent
                                ? 'pill-success'
                                : pt.isReport
                                ? 'pill-warning'
                                : 'pill-info'
                            }`}
                          >
                            {isBn ? pt.statusBn : pt.statusEn}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={onOpenPrescriptionBuilder}
                            className="btn btn-ghost btn-sm py-1 px-2.5"
                          >
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            <span>{tr('Prescribe', 'প্রেসক্রিপশন')}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Chamber State & Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card card-pad">
            <span className="section-eyebrow">
              <span className="n">02 /</span>
              <span>{tr('Chamber Status', 'চেম্বার কন্ট্রোল')}</span>
            </span>
            <h3 className="font-bold text-ink text-sm mb-3">
              {tr('Doctor Activity State', 'ডাক্তারের বর্তমান অবস্থান')}
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateDoctorStatus('in_chamber')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  doctorStatus === 'in_chamber'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-paper text-ink border-border hover:bg-surface'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>{tr('In Chamber', 'চেম্বারে আছেন')}</span>
              </button>

              <button
                onClick={() => updateDoctorStatus('break')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  doctorStatus === 'break'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-paper text-ink border-border hover:bg-surface'
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span>{tr('On Break', 'বিরতিতে')}</span>
              </button>

              <button
                onClick={() => updateDoctorStatus('on_way')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  doctorStatus === 'on_way'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-paper text-ink border-border hover:bg-surface'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{tr('On The Way', 'পথে আছেন')}</span>
              </button>

              <button
                onClick={() => updateDoctorStatus('emergency')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  doctorStatus === 'emergency'
                    ? 'bg-red-600 text-white border-red-600 shadow-2xs'
                    : 'bg-paper text-ink border-border hover:bg-surface'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{tr('Emergency', 'জরুরি ডিউটি')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
