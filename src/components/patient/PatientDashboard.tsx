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
  Clock,
  Pill,
  Droplet,
  BedDouble,
  Calculator,
  PhoneCall,
  Upload,
  ChevronLeft,
  BadgeCheck,
  ShieldAlert,
  ArrowRight,
  Stethoscope,
  Sparkles,
  CheckCircle2
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
  const { currentUser } = useAuth();
  const { tr, num, isBn } = useLanguage();
  const { currentSerial, patientSerial, doctorStatus, totalTokens, estimatedMinutes, lastUpdated } = useQueue();

  const [activeTipIndex, setActiveTipIndex] = useState(0);

  const healthTips = [
    {
      title: tr('Drink Sufficient Clean Water', 'পর্যাপ্ত বিশুদ্ধ পানি পান করুন'),
      desc: tr(
        'Drink at least 8-10 glasses of purified water daily to keep kidneys and blood circulation healthy.',
        'প্রতিদিন কমপক্ষে ৮-১০ গ্লাস বিশুদ্ধ পানি পান করুন। এতে শরীর হাইড্রেট থাকে এবং কিডনি সুস্থ থাকে।'
      )
    },
    {
      title: tr('Moderate Dietary Salt and Sugar', 'লবণ ও চিনি নিয়ন্ত্রণে রাখুন'),
      desc: tr(
        'Excess table salt and processed sugar significantly increase hypertension and diabetic risks.',
        'অতিরিক্ত কাঁচা লবণ ও প্রক্রিয়াজাত চিনি রক্তচাপ ও ডায়াবেটিসের ঝুঁকি আশঙ্কাজনকভাবে বৃদ্ধি করে।'
      )
    },
    {
      title: tr('Walk 30 Minutes Every Morning', 'দিনে ৩০ মিনিট নিয়মিত হাঁটুন'),
      desc: tr(
        'Light brisk walking in fresh morning air supports cardiovascular fitness and vascular longevity.',
        'সকালের নির্মল বাতাসে হালকা ব্যায়াম ও হাঁটাহাঁটি হার্ট ও রক্তনালীকে দীর্ঘকাল কর্মক্ষম রাখে।'
      )
    }
  ];

  const primaryAppointment = mockAppointments[0];

  const quickActions = [
    {
      label: tr('Appointments', 'অ্যাপয়েন্টমেন্ট'),
      icon: Calendar,
      color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      action: onOpenAppointmentBooking
    },
    {
      label: tr('e-Prescriptions', 'ই-প্রেসক্রিপশন'),
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
      action: () => onOpenPrescription()
    },
    {
      label: tr('Lab Reports', 'ল্যাব রিপোর্ট'),
      icon: Upload,
      color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
      action: onOpenReports
    },
    {
      label: tr('Medicines', 'ওষুধ খুঁজুন'),
      icon: Pill,
      color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
      action: onOpenMedicineIndex
    },
    {
      label: tr('Blood Donors', 'রক্তদাতা'),
      icon: Droplet,
      color: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      action: onOpenBloodBank
    },
    {
      label: tr('Beds & ICU', 'বেড ও ICU'),
      icon: BedDouble,
      color: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
      action: onOpenBedDirectory
    },
    {
      label: tr('Dose Calc', 'ডোজ ক্যালকুলেটর'),
      icon: Calculator,
      color: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
      action: onOpenDoseCalc || onOpenStudentHub
    },
    {
      label: tr('Hotline 16263', 'জরুরি ১৬২৬৩'),
      icon: PhoneCall,
      color: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
      isTel: true,
      href: 'tel:16263'
    },
  ];

  const doctorStatusText = {
    in_chamber: tr('In Chamber', 'চেম্বারে আছেন'),
    on_way: tr('On The Way', 'পথে আছেন'),
    break: tr('On Break', 'বিরতিতে'),
    emergency: tr('Emergency Call', 'জরুরি ডিউটিতে')
  }[doctorStatus] || tr('In Chamber', 'চেম্বারে আছেন');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* 2 Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Columns: Main Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Welcome Banner (OpenGovtBD clean style) */}
          <ScrollReveal animation="fade-down" duration={450}>
            <div className="card card-pad relative overflow-hidden bg-gradient-to-r from-blue-50/70 via-surface to-surface border border-border">
              <div className="relative z-10 max-w-lg space-y-1.5">
                <div className="pill pill-info shadow-2xs mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span>{tr('ShasthoSetu BD • Digital Healthcare Hub', 'স্বাস্থ্যসেতু বিডি • সার্বক্ষণিক ডিজিটাল স্বাস্থ্যসেবা')}</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight flex items-center gap-2">
                  <span>{tr('Welcome,', 'স্বাগতম,')} {isBn ? currentUser?.nameBn || currentUser?.name : currentUser?.name || currentUser?.nameBn}</span>
                </h1>

                <p className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">
                  {tr('Your Health, Our Commitment — Bangladesh Open Digital Healthcare', 'আপনার স্বাস্থ্য, আমাদের অঙ্গীকার — ডিজিটাল স্বাস্থ্যসেবা')}
                </p>

                <p className="text-xs text-muted">
                  {tr(
                    'Track live chamber tokens, review digital prescriptions, and check bed availability in real-time.',
                    'লাইভ চেম্বার সিরিয়াল ট্র্যাক করুন, ডিজিটাল প্রেসক্রিপশন দেখুন এবং রিয়েল-টাইম তথ্য জানুন।'
                  )}
                </p>
              </div>

              {/* Graphic Motif */}
              <div className="hidden sm:block absolute right-6 bottom-0 top-3 w-40 pointer-events-none opacity-90">
                <div className="relative w-full h-full flex items-end justify-end">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
                    alt="Doctor Consultation"
                    className="w-28 h-36 object-cover object-top rounded-2xl shadow-elevation-2 border border-border"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 4 Stat Metric Cards (OpenGovtBD Bento Grid Style) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <ScrollReveal animation="fade-up" delay={50}>
              <div
                onClick={onOpenAppointmentBooking}
                className="card card-pad-sm hoverable cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="stat-icon bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 group-hover:scale-105 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-muted leading-tight">
                      {tr('Appointments', 'অ্যাপয়েন্টমেন্ট')}
                    </div>
                    <div className="text-lg font-black text-ink">{num(2)}</div>
                    <div className="text-[10px] text-blue-600 font-bold leading-none">
                      {tr('Next 7 days', 'আগামী ৭ দিনে')}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={100}>
              <div
                onClick={() => onOpenPrescription()}
                className="card card-pad-sm hoverable cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="stat-icon bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-muted leading-tight">
                      {tr('e-Prescriptions', 'ই-প্রেসক্রিপশন')}
                    </div>
                    <div className="text-lg font-black text-ink">{num(8)}</div>
                    <div className="text-[10px] text-muted font-medium leading-none">
                      {tr('Saved in vault', 'মোট সংরক্ষিত')}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <div
                onClick={onOpenReports}
                className="card card-pad-sm hoverable cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="stat-icon bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 group-hover:scale-105 transition-transform">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-muted leading-tight">
                      {tr('Lab Reports', 'ল্যাব রিপোর্ট')}
                    </div>
                    <div className="text-lg font-black text-ink">{num(5)}</div>
                    <div className="text-[10px] text-purple-600 font-semibold leading-none">
                      {tr('All reports verified', 'সব রিপোর্ট')}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div
                onClick={onOpenBloodBank}
                className="card card-pad-sm hoverable cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="stat-icon bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-muted leading-tight">
                      {tr('Blood Donors', 'রক্তদান')}
                    </div>
                    <div className="text-lg font-black text-ink">{num(3)}</div>
                    <div className="text-[10px] text-red-600 font-semibold leading-none">
                      {tr('Donation network', 'রক্তদাতা তালিকা')}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Upcoming Appointment Primary Card */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="card card-pad">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="section-eyebrow">
                    <span className="n">01 /</span>
                    <span>{tr('Confirmed Schedule', 'নিশ্চিতকৃত সূচি')}</span>
                  </span>
                  <h3 className="font-bold text-ink text-sm sm:text-base">
                    {tr('Upcoming Doctor Consultation', 'আসন্ন ডাক্তার অ্যাপয়েন্টমেন্ট')}
                  </h3>
                </div>

                <button
                  onClick={onOpenAppointmentBooking}
                  className="btn btn-outline btn-sm"
                >
                  <span>{tr('View All Bookings', 'সব দেখুন')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-paper border border-border">
                {/* Date & Time Box */}
                <div className="flex items-center gap-3">
                  <div className="bg-surface border border-border rounded-xl p-2.5 text-center min-w-[70px] shadow-2xs">
                    <div className="text-[10px] font-bold text-muted uppercase">
                      {tr('May', 'মে')}
                    </div>
                    <div className="text-xl font-black text-blue-600 leading-none my-0.5">
                      {num(20)}
                    </div>
                    <div className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded px-1 mt-0.5">
                      11:30 AM
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div className="flex items-center gap-3">
                    <img
                      src={primaryAppointment.doctorAvatar}
                      alt={primaryAppointment.doctorName}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-ink text-sm">
                          {isBn ? primaryAppointment.doctorNameBn : primaryAppointment.doctorName}
                        </span>
                        <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      </div>
                      <p className="text-xs text-muted">
                        {isBn ? primaryAppointment.doctorSpecialtyBn : primaryAppointment.doctorSpecialty}
                      </p>
                      <p className="text-[11px] text-muted">
                        {isBn ? primaryAppointment.doctorHospitalBn : primaryAppointment.doctorHospital}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                  <span className="pill pill-success">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{tr('Serial #18 Confirmed', 'সিরিয়াল ১৮ নিশ্চিতকৃত')}</span>
                  </span>

                  <button
                    onClick={onOpenLiveQueue}
                    className="btn btn-primary btn-sm"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tr('Live Queue Tracker', 'লাইভ ট্র্যাকার')}</span>
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Dual Column: Recent Prescriptions & Reports */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prescriptions List */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="card card-pad-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="section-eyebrow">
                      <span className="n">02 /</span>
                      <span>{tr('Rx Vault', 'ভল্ট')}</span>
                    </span>
                    <h3 className="font-bold text-ink text-xs sm:text-sm">
                      {tr('Recent Prescriptions', 'সাম্প্রতিক প্রেসক্রিপশন')}
                    </h3>
                  </div>

                  <button
                    onClick={() => onOpenPrescription()}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    {tr('View All', 'সব দেখুন')}
                  </button>
                </div>

                <div className="space-y-2">
                  {mockPrescriptions.slice(0, 2).map((rx) => (
                    <div
                      key={rx.id}
                      className="p-3 rounded-xl bg-paper border border-border flex items-center justify-between hover:border-blue-300 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="stat-icon w-8 h-8 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-ink leading-tight">
                            {isBn ? rx.doctorNameBn : rx.doctorName}
                          </p>
                          <p className="text-[10px] text-muted">
                            {isBn ? rx.dateBn : rx.date}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenPrescription(rx.id)}
                        className="btn btn-ghost btn-sm"
                      >
                        {tr('View', 'দেখুন')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Reports List */}
            <ScrollReveal animation="fade-up" delay={250}>
              <div className="card card-pad-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="section-eyebrow">
                      <span className="n">03 /</span>
                      <span>{tr('Diagnostics', 'ল্যাব')}</span>
                    </span>
                    <h3 className="font-bold text-ink text-xs sm:text-sm">
                      {tr('Diagnostic Lab Reports', 'ল্যাব টেস্ট রিপোর্ট')}
                    </h3>
                  </div>

                  <button
                    onClick={onOpenReports}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    {tr('View All', 'সব দেখুন')}
                  </button>
                </div>

                <div className="space-y-2">
                  {mockLabReports.slice(0, 2).map((rep) => (
                    <div
                      key={rep.id}
                      className="p-3 rounded-xl bg-paper border border-border flex items-center justify-between hover:border-purple-300 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="stat-icon w-8 h-8 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          <FlaskConical className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-ink leading-tight truncate max-w-[130px]">
                            {rep.testName}
                          </p>
                          <p className="text-[10px] text-muted">
                            {isBn ? rep.dateBn : rep.date}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`pill ${
                          rep.status === 'normal' ? 'pill-success' : 'pill-warning'
                        } text-[10px] py-0.5`}
                      >
                        {rep.status === 'normal'
                          ? tr('Normal', 'স্বাভাবিক')
                          : tr('Review', 'পর্যবেক্ষণ')}
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
            <div className="card card-pad">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <h3 className="font-bold text-ink text-sm">
                    {tr('Live Serial Tracker', 'লাইভ সিরিয়াল ট্র্যাকার')}
                  </h3>
                </div>

                <button
                  onClick={onOpenLiveQueue}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  {tr('Full Screen', 'পূর্ণাঙ্গ')}
                </button>
              </div>

              {/* Doctor Status Banner */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-paper border border-border mb-3 text-xs">
                <div>
                  <h4 className="font-bold text-ink leading-tight">
                    {isBn ? primaryAppointment.doctorNameBn : primaryAppointment.doctorName}
                  </h4>
                  <p className="text-[11px] text-muted">
                    {isBn ? primaryAppointment.doctorSpecialtyBn : primaryAppointment.doctorSpecialty}
                  </p>
                </div>

                <span className="pill pill-success text-[10.5px]">
                  {doctorStatusText}
                </span>
              </div>

              {/* Serial Numbers Grid */}
              <div className="grid grid-cols-3 gap-2 text-center py-2.5 border-y border-border my-2">
                <div>
                  <div className="text-[10px] text-muted font-medium">
                    {tr('Now Calling', 'চলতি সিরিয়াল')}
                  </div>
                  <div className="text-xl font-black text-ink mt-0.5">
                    {num(String(currentSerial).padStart(2, '0'))}
                  </div>
                </div>

                <div className="border-x border-border">
                  <div className="text-[10px] text-blue-600 font-bold">
                    {tr('Your Token', 'আপনার সিরিয়াল')}
                  </div>
                  <div className="text-xl font-black text-blue-600 mt-0.5">
                    {num(String(patientSerial).padStart(2, '0'))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-muted font-medium">
                    {tr('Est. Wait', 'অপেক্ষার সময়')}
                  </div>
                  <div className="text-sm font-black text-ink mt-1">
                    ~{num(estimatedMinutes)} {tr('mins', 'মিনিট')}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 mt-3">
                <div className="w-full bg-paper border border-border h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (currentSerial / totalTokens) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted">
                  <span>{tr('Total Tokens: ', 'মোট সিরিয়াল: ')}{num(totalTokens)}</span>
                  <span className="text-emerald-600 font-bold">{tr('Active Sync', 'লাইভ সিঙ্ক')}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Actions Grid */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="card card-pad-sm">
              <div className="mb-3">
                <span className="section-eyebrow">
                  <span className="n">04 /</span>
                  <span>{tr('Direct Services', 'সেবা সমূহ')}</span>
                </span>
                <h3 className="font-bold text-ink text-xs sm:text-sm">
                  {tr('Quick Clinical Actions', 'দ্রুত অ্যাকশন সেবা')}
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {quickActions.map((qa, i) => {
                  const Icon = qa.icon;
                  if (qa.isTel) {
                    return (
                      <a
                        key={i}
                        href={qa.href}
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-paper hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-border hover:border-rose-300 card-interactive group"
                      >
                        <div className="stat-icon w-8 h-8 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 mb-1 group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-ink text-center leading-tight truncate w-full">
                          {qa.label}
                        </span>
                      </a>
                    );
                  }

                  return (
                    <button
                      key={i}
                      onClick={qa.action}
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-paper hover:bg-blue-50 dark:hover:bg-blue-950/20 border border-border hover:border-blue-300 card-interactive group"
                    >
                      <div className={`stat-icon w-8 h-8 rounded-lg ${qa.color} mb-1 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-ink text-center leading-tight truncate w-full">
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
            <div className="card card-pad-sm overflow-hidden">
              <div className="flex items-center justify-between mb-2.5">
                <span className="section-eyebrow">
                  <span className="n">05 /</span>
                  <span>{tr('Wellness Advice', 'পরামর্শ')}</span>
                </span>
                <span className="pill pill-info text-[10px] py-0.5">
                  {tr('Daily Tip', 'দৈনিক স্বাস্থ্য')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-paper border border-border text-xs space-y-2">
                <h4 className="font-bold text-ink text-xs">
                  {healthTips[activeTipIndex].title}
                </h4>
                <p className="text-[11.5px] text-muted leading-relaxed">
                  {healthTips[activeTipIndex].desc}
                </p>

                {/* Pagination */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <button
                    onClick={() => setActiveTipIndex((prev) => (prev > 0 ? prev - 1 : healthTips.length - 1))}
                    className="p-1 rounded-lg hover:bg-surface text-muted hover:text-ink transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    {healthTips.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTipIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeTipIndex === i ? 'w-4 bg-blue-600' : 'w-1.5 bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTipIndex((prev) => (prev < healthTips.length - 1 ? prev + 1 : 0))}
                    className="p-1 rounded-lg hover:bg-surface text-muted hover:text-ink transition-colors"
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
