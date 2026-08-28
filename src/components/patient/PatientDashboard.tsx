import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useQueue } from '../../context/QueueContext';
import { mockAppointments, mockPrescriptions, mockLabReports } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Calendar,
  FileText,
  FlaskConical,
  Heart,
  ChevronRight,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  Pill,
  Droplet,
  BedDouble,
  Calculator,
  PhoneCall,
  Upload,
  Plus,
  ShieldCheck,
  ChevronLeft,
  Users,
  Activity,
  Sparkles,
  BadgeCheck
} from 'lucide-react';

interface PatientDashboardProps {
  onOpenLiveQueue: () => void;
  onOpenPrescription: (rxId?: string) => void;
  onOpenReports: () => void;
  onOpenAppointmentBooking: () => void;
  onOpenMedicineIndex: () => void;
  onOpenBloodBank: () => void;
  onOpenBedDirectory: () => void;
  onOpenStudentHub: () => void;
  onOpenDoseCalc?: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  onOpenLiveQueue,
  onOpenPrescription,
  onOpenReports,
  onOpenAppointmentBooking,
  onOpenMedicineIndex,
  onOpenBloodBank,
  onOpenBedDirectory,
  onOpenStudentHub,
  onOpenDoseCalc
}) => {
  const { currentUser, setActiveView } = useAuth();
  const { toBn } = useLanguage();
  const { currentSerial, patientSerial, doctorStatusBn, totalTokens, estimatedMinutes, lastUpdated } = useQueue();

  const [activeTipIndex, setActiveTipIndex] = useState(0);

  const healthTips = [
    {
      title: 'পর্যাপ্ত পানি পান করুন',
      desc: 'প্রতিদিন কমপক্ষে ৮-১০ গ্লাস বিশুদ্ধ পানি পান করুন। এতে আপনার শরীর হাইড্রেট থাকে এবং কিডনি ও রক্ত সঞ্চালন সুস্থ থাকে।'
    },
    {
      title: 'লবণ ও চিনি নিয়ন্ত্রণে রাখুন',
      desc: 'অতিরিক্ত কাঁচা লবণ ও প্রক্রিয়াজাত চিনি রক্তচাপ ও ডায়াবেটিসের ঝুঁকি আশঙ্কাজনকভাবে বৃদ্ধি করে।'
    },
    {
      title: 'দিনে ৩০ মিনিট নিয়মিত হাঁটুন',
      desc: 'সকালের নির্মল বাতাসে হালকা ব্যায়াম ও হাঁটাহাঁটি হার্ট ও রক্তনালীকে দীর্ঘকাল কর্মক্ষম ও সতেজ রাখে।'
    }
  ];

  const primaryAppointment = mockAppointments[0];

  const quickActions = [
    { label: 'অ্যাপয়েন্টমেন্ট', icon: Calendar, color: 'bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-300', action: onOpenAppointmentBooking },
    { label: 'ই-প্রেসক্রিপশন', icon: FileText, color: 'bg-teal-50 text-teal-600 border-teal-100 hover:border-teal-300', action: () => onOpenPrescription() },
    { label: 'রিপোর্ট আপলোড', icon: Upload, color: 'bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-300', action: onOpenReports },
    { label: 'ওষুধ খুঁজুন', icon: Pill, color: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:border-emerald-300', action: onOpenMedicineIndex },
    { label: 'রক্তদাতা', icon: Droplet, color: 'bg-red-50 text-red-600 border-red-100 hover:border-red-300', action: onOpenBloodBank },
    { label: 'বেড খুঁজুন', icon: BedDouble, color: 'bg-cyan-50 text-cyan-600 border-cyan-100 hover:border-cyan-300', action: onOpenBedDirectory },
    { label: 'ডোজ ক্যালকুলেটর', icon: Calculator, color: 'bg-amber-50 text-amber-600 border-amber-100 hover:border-amber-300', action: onOpenDoseCalc || onOpenStudentHub },
    { label: 'জরুরি সেবা', icon: PhoneCall, color: 'bg-rose-50 text-rose-600 border-rose-100 hover:border-rose-300', isTel: true, href: 'tel:09678123456' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* 2 Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Columns: Main Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Welcome Banner */}
          <ScrollReveal animation="fade-down" duration={450}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 via-teal-50/60 to-white border border-blue-100/80 p-6 sm:p-7 shadow-2xs hover:shadow-xs transition-shadow">
              <div className="relative z-10 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 border border-blue-200/60 rounded-full text-xs font-semibold text-blue-700 mb-2.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span>স্বাস্থ্যসেতু বিডি • সার্বক্ষণিক ডিজিটাল স্বাস্থ্যসেবা</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
                  <span>স্বাগতম, {currentUser?.nameBn || 'সালমান আহমেদ'}</span>
                  <span className="inline-block animate-bounce"></span>
                </h1>
                <p className="text-xs sm:text-sm font-bold text-teal-800 mt-0.5">
                  আপনার স্বাস্থ্য, আমাদের অঙ্গীকার
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  সুস্থ থাকুন, নিরাপদ থাকুন।
                </p>
              </div>

              {/* Graphic Illustration */}
              <div className="hidden sm:block absolute right-6 bottom-0 top-2 w-44 pointer-events-none">
                <div className="relative w-full h-full flex items-end justify-end">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
                    alt="Doctor"
                    className="w-28 h-36 object-cover object-top rounded-2xl shadow-md border-2 border-white animate-float"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 4 Stat Metric Cards (Compact & Balanced) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <ScrollReveal animation="fade-up" delay={50}>
              <div
                onClick={onOpenAppointmentBooking}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs card-interactive group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 leading-tight">অ্যাপয়েন্টমেন্ট</div>
                    <div className="text-lg font-black text-slate-900 dark:text-slate-50">{toBn(2)}</div>
                    <div className="text-[10px] text-emerald-600 font-bold leading-none">আগামী ৭ দিনে</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <div
                onClick={() => onOpenPrescription()}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs card-interactive group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 leading-tight">ই-প্রেসক্রিপশন</div>
                    <div className="text-lg font-black text-slate-900 dark:text-slate-50">{toBn(8)}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-none">মোট সংরক্ষিত</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <div
                onClick={onOpenReports}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs card-interactive group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 leading-tight">ল্যাব রিপোর্ট</div>
                    <div className="text-lg font-black text-slate-900 dark:text-slate-50">{toBn(5)}</div>
                    <div className="text-[10px] text-purple-600 font-medium leading-none">সব রিপোর্ট</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div
                onClick={onOpenBloodBank}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs card-interactive group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                    <Heart className="w-4 h-4 animate-heart-beat" />
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 leading-tight">রক্তদান সহায়তা</div>
                    <div className="text-lg font-black text-slate-900 dark:text-slate-50">{toBn(3)}</div>
                    <div className="text-[10px] text-red-600 font-medium leading-none">বার সহায়তা</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Upcoming Appointment Primary Card */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">আসন্ন ডাক্তার অ্যাপয়েন্টমেন্ট</h3>
                <button
                  onClick={onOpenAppointmentBooking}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 btn-press"
                >
                  <span>সব দেখুন</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-blue-200 transition-all">
                {/* Date Box */}
                <div className="flex items-center gap-3">
                  <div className="bg-white dark:bg-slate-900 border border-emerald-100 rounded-xl p-2.5 text-center min-w-[68px] shadow-2xs">
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">মে</div>
                    <div className="text-xl font-black text-emerald-600 leading-none my-0.5">{toBn(20)}</div>
                    <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded px-1 mt-0.5">
                      11:30 AM
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div className="flex items-center gap-2.5">
                    <img
                      src={primaryAppointment.doctorAvatar}
                      alt={primaryAppointment.doctorName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-900 dark:text-slate-50 text-sm">
                          {primaryAppointment.doctorNameBn}
                        </span>
                        <BadgeCheck className="w-4 h-4 text-blue-600" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {primaryAppointment.doctorSpecialtyBn}
                      </p>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        {primaryAppointment.doctorHospitalBn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {primaryAppointment.statusBn}
                  </span>
                  <button
                    onClick={onOpenLiveQueue}
                    className="px-3.5 py-1.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all shadow-2xs btn-press"
                  >
                    লাইভ ট্র্যাকার
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Dual Column: Recent Prescriptions & Reports */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prescriptions List */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">সাম্প্রতিক প্রেসক্রিপশন</h3>
                  <button
                    onClick={() => onOpenPrescription()}
                    className="text-xs font-semibold text-blue-600 hover:underline btn-press"
                  >
                    সব দেখুন
                  </button>
                </div>

                <div className="space-y-2">
                  {mockPrescriptions.slice(0, 2).map((rx) => (
                    <div
                      key={rx.id}
                      className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-blue-50/40 hover:border-blue-200 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">{rx.doctorNameBn}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">{rx.dateBn}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenPrescription(rx.id)}
                        className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-white dark:bg-slate-900 hover:bg-blue-50 border border-blue-200 rounded-lg shadow-2xs btn-press"
                      >
                        দেখুন
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Reports List */}
            <ScrollReveal animation="fade-up" delay={250}>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">ল্যাব টেস্ট রিপোর্ট</h3>
                  <button
                    onClick={onOpenReports}
                    className="text-xs font-semibold text-blue-600 hover:underline btn-press"
                  >
                    সব দেখুন
                  </button>
                </div>

                <div className="space-y-2">
                  {mockLabReports.slice(0, 2).map((rep) => (
                    <div
                      key={rep.id}
                      className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-purple-50/40 hover:border-purple-200 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                          <FlaskConical className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight truncate max-w-[120px]">
                            {rep.testName}
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">{rep.dateBn}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          rep.status === 'normal'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {rep.statusBn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Right 4 Columns: Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Serial Tracker Widget */}
          <ScrollReveal animation="fade-up" duration={450}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">লাইভ সিরিয়াল ট্র্যাকার</h3>
                </div>
                <button
                  onClick={onOpenLiveQueue}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 btn-press"
                >
                  পূর্ণাঙ্গ দেখুন
                </button>
              </div>

              {/* Doctor Status Banner */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 leading-tight">{primaryAppointment.doctorNameBn}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">মেডিসিন বিশেষজ্ঞ</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  {doctorStatusBn}
                </span>
              </div>

              {/* Serial Numbers Grid */}
              <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-slate-100 dark:border-slate-800 my-2">
                <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">চলতি সিরিয়াল</div>
                  <div className="text-xl font-black text-slate-800 dark:text-slate-100 mt-0.5">
                    {toBn(String(currentSerial).padStart(2, '0'))}
                  </div>
                </div>
                <div className="border-x border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] text-blue-600 font-bold">আপনার সিরিয়াল</div>
                  <div className="text-xl font-black text-blue-600 mt-0.5">
                    {toBn(String(patientSerial).padStart(2, '0'))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">অপেক্ষার সময়</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1">
                    ~{toBn(estimatedMinutes)} মিনিট
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 mt-2.5">
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-teal-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (currentSerial / totalTokens) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                  <span>মোট সিরিয়াল: {toBn(totalTokens)}</span>
                  <span className="text-emerald-600 font-semibold">আপডেট: {lastUpdated}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Actions Grid (Refined & Compact) */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm mb-3">দ্রুত অ্যাকশন সেবা</h3>

              <div className="grid grid-cols-4 gap-2">
                {quickActions.map((qa, i) => {
                  const Icon = qa.icon;
                  if (qa.isTel) {
                    return (
                      <a
                        key={i}
                        href={qa.href}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50 border border-slate-100 dark:border-slate-800 hover:border-rose-200 card-interactive group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 text-center leading-tight truncate w-full">
                          {qa.label}
                        </span>
                      </a>
                    );
                  }

                  return (
                    <button
                      key={i}
                      onClick={qa.action}
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 border border-slate-100 dark:border-slate-800 hover:border-blue-200 card-interactive group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-100/80 text-blue-600 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 text-center leading-tight truncate w-full">
                        {qa.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Health Tips Carousel Widget */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 sm:p-5 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">স্বাস্থ্য টিপস</h3>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  দৈনিক স্বাস্থ্য
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-50 text-xs">
                      {healthTips[activeTipIndex].title}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {healthTips[activeTipIndex].desc}
                    </p>
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-emerald-100/60">
                  <button
                    onClick={() => setActiveTipIndex((prev) => (prev > 0 ? prev - 1 : healthTips.length - 1))}
                    className="p-1 rounded-lg hover:bg-emerald-100 text-emerald-700 transition-colors btn-press"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    {healthTips.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTipIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeTipIndex === i ? 'w-4 bg-blue-600' : 'w-1.5 bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTipIndex((prev) => (prev < healthTips.length - 1 ? prev + 1 : 0))}
                    className="p-1 rounded-lg hover:bg-emerald-100 text-emerald-700 transition-colors btn-press"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
