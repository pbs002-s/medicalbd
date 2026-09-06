import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockAppointments } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  CalendarCheck,
  Stethoscope,
  BadgeCheck,
  Building2,
  DollarSign
} from 'lucide-react';

interface AppointmentsPageProps {
  onBack?: () => void;
  onOpenLiveQueue?: () => void;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ onBack, onOpenLiveQueue }) => {
  const { setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();

  const [activeTab, setActiveTab] = useState<'my_appointments' | 'book_new' | 'doctors'>('my_appointments');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Booking form state
  const [selectedSpecialty, setSelectedSpecialty] = useState('medicine');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Tanvir Hasan (MBBS, FCPS)');
  const [selectedDate, setSelectedDate] = useState('2026-05-20');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [patientNotes, setPatientNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const specialties = [
    { id: 'all', labelBn: 'সকল বিভাগ', labelEn: 'All Specialties' },
    { id: 'medicine', labelBn: 'মেডিসিন ও ডায়াবেটিস', labelEn: 'Internal Medicine' },
    { id: 'cardiology', labelBn: 'হৃদরোগ ও কার্ডিওলজি', labelEn: 'Cardiology' },
    { id: 'surgery', labelBn: 'সার্জারি ও ল্যাপারোস্কপি', labelEn: 'General Surgery' },
    { id: 'gynae', labelBn: 'স্ত্রী ও প্রসূতি', labelEn: 'Gynae & Obs' },
    { id: 'pediatrics', labelBn: 'শিশু বিশেষজ্ঞ', labelEn: 'Pediatrics' },
    { id: 'dermatology', labelBn: 'চর্ম ও যৌনরোগ', labelEn: 'Dermatology' },
  ];

  const timeSlots = [
    { id: '10:00 AM', labelEn: '10:00 AM', labelBn: '১০:০০ AM', periodEn: 'Morning', periodBn: 'সকাল' },
    { id: '11:30 AM', labelEn: '11:30 AM', labelBn: '১১:৩০ AM', periodEn: 'Morning', periodBn: 'সকাল' },
    { id: '01:00 PM', labelEn: '01:00 PM', labelBn: '০১:০০ PM', periodEn: 'Noon', periodBn: 'দুপুর' },
    { id: '05:30 PM', labelEn: '05:30 PM', labelBn: '০৫:৩০ PM', periodEn: 'Evening', periodBn: 'সন্ধ্যা' },
    { id: '07:00 PM', labelEn: '07:00 PM', labelBn: '০৭:০০ PM', periodEn: 'Night', periodBn: 'রাত' },
    { id: '08:30 PM', labelEn: '08:30 PM', labelBn: '০৮:৩০ PM', periodEn: 'Night', periodBn: 'রাত' },
  ];

  const doctorsList = [
    {
      id: 'doc_1',
      nameEn: 'Dr. Tanvir Hasan',
      nameBn: 'ডা. তানভীর হাসান',
      degree: 'MBBS (DMC), FCPS (Medicine)',
      specialty: 'medicine',
      specialtyEn: 'Internal Medicine & Diabetes Specialist',
      specialtyBn: 'মেডিসিন ও ডায়াবেটিস বিশেষজ্ঞ',
      hospitalEn: 'Assistant Professor, Dhaka Medical College Hospital',
      hospitalBn: 'সহকারী অধ্যাপক, ঢাকা মেডিকেল কলেজ হাসপাতাল',
      chamberEn: 'Labaid Diagnostic, Dhanmondi',
      chamberBn: 'ল্যাবএইড ডায়াগনস্টিক, ধানমন্ডি',
      fee: 1200,
      followUpFreeDays: 14,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      rating: '4.9',
      reviews: 142,
      slotsToday: 3,
    },
    {
      id: 'doc_2',
      nameEn: 'Dr. Sayera Afreen',
      nameBn: 'ডা. সায়রা আফরিন',
      degree: 'MBBS, MD (Cardiology)',
      specialty: 'cardiology',
      specialtyEn: 'Cardiology Specialist & Interventionalist',
      specialtyBn: 'হৃদরোগ ও কার্ডিওলজিস্ট',
      hospitalEn: 'Associate Professor, National Heart Foundation',
      hospitalBn: 'সহযোগী অধ্যাপক, ন্যাশনাল হার্ট ফাউন্ডেশন',
      chamberEn: 'Square Hospital, Panthapath',
      chamberBn: 'স্কয়ার হাসপাতাল, পান্থপথ',
      fee: 1500,
      followUpFreeDays: 14,
      avatar: 'https://images.unsplash.com/photo-1594824813512-58e1c667088b?auto=format&fit=crop&w=200&q=80',
      rating: '4.8',
      reviews: 98,
      slotsToday: 5,
    },
    {
      id: 'doc_3',
      nameEn: 'Dr. Rakibul Islam',
      nameBn: 'ডা. রাকিবুল ইসলাম',
      degree: 'MBBS, DDV, FCPS (Dermatology)',
      specialty: 'dermatology',
      specialtyEn: 'Dermatologist & Venereologist',
      specialtyBn: 'চর্ম, এলার্জি ও যৌনরোগ বিশেষজ্ঞ',
      hospitalEn: 'BSMMU (PG Hospital), Dhaka',
      hospitalBn: 'বিএসএমএমইউ (পিজি হাসপাতাল)',
      chamberEn: 'Ibn Sina Diagnostic, Dhanmondi',
      chamberBn: 'ইবনে সিনা ডায়াগনস্টিক, ধানমন্ডি',
      fee: 1000,
      followUpFreeDays: 10,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
      rating: '4.7',
      reviews: 86,
      slotsToday: 2,
    },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setActiveTab('my_appointments');
    }, 2200);
  };

  const getDayLabel = (dateStr: string, dayBn: string) => {
    if (isBn) return dayBn;
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    } catch {
      return 'Tue';
    }
  };

  const getMonthDayLabel = (dateStr: string, dateBn: string) => {
    if (isBn) return dateBn;
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Top Header & Breadcrumb */}
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
                <span className="text-blue-600 font-semibold">{tr('Appointments', 'আমার অ্যাপয়েন্টমেন্ট ও বুকিং')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5">
                {tr('Doctor Appointments & Booking', 'অ্যাপয়েন্টমেন্ট ব্যবস্থাপনা')}
              </h1>
            </div>
          </div>

          {/* Segmented View Switcher */}
          <div className="flex items-center bg-paper border border-border p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('my_appointments')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'my_appointments'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {tr('My Appointments', 'আমার সিরিয়াল')} ({num(mockAppointments.length)})
            </button>
            <button
              onClick={() => setActiveTab('book_new')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'book_new'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{tr('Book New', 'নতুন বুকিং')}</span>
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'doctors'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {tr('Doctors Directory', 'ডাক্তার ডিরেক্টরি')}
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* SUCCESS BANNER ALERT */}
      {bookingSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 flex items-center justify-between animate-slide-down">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">
                {tr('Appointment Successfully Confirmed!', 'অ্যাপয়েন্টমেন্ট সফলভাবে নিশ্চিত হয়েছে!')}
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                {tr('Your token #18 has been reserved. An SMS confirmation was sent.', 'আপনার সিরিয়াল টোকেন #১৮ বুক করা হয়েছে। এসএমএসের মাধ্যমে রিমাইন্ডার পাঠানো হয়েছে।')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: MY APPOINTMENTS */}
      {activeTab === 'my_appointments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-ink">
              {tr('Upcoming Chamber Appointments', 'আসন্ন চেম্বার অ্যাপয়েন্টমেন্টসমূহ')}
            </h2>
            <span className="text-xs text-muted">
              {tr(`Total ${num(mockAppointments.length)} active schedules`, `মোট ${num(mockAppointments.length)}টি সক্রিয় শিডিউল`)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockAppointments.map((apt, index) => (
              <ScrollReveal key={apt.id} animation="fade-up" delay={index * 100}>
                <div className="card card-pad bg-surface border border-border hover:border-blue-300 shadow-elevation-1 hover:shadow-elevation-2 transition-all group">
                  {/* Top Bar with Date badge & Status */}
                  <div className="flex items-start justify-between gap-3 border-b border-border pb-3.5 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-2xl px-3 py-2 text-center min-w-[65px]">
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase block">
                          {getDayLabel(apt.date, apt.dayBn)}
                        </span>
                        <span className="text-lg font-black text-blue-600 dark:text-blue-400 block leading-tight">
                          {num(apt.date.split('-')[2] || '20')}
                        </span>
                        <span className="text-[10px] text-muted font-medium block">
                          {isBn ? apt.dateBn.split(' ')[1] : new Date(apt.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-md">
                          {isBn ? apt.timeBn : apt.time}
                        </span>
                        <h3 className="font-bold text-ink text-sm mt-1 flex items-center gap-1.5">
                          <span>{isBn ? apt.doctorNameBn : apt.doctorName}</span>
                          <BadgeCheck className="w-4 h-4 text-blue-600" />
                        </h3>
                        <p className="text-xs text-muted">{isBn ? apt.doctorSpecialtyBn : apt.doctorSpecialty}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="pill pill-success text-[11px]">
                        {isBn ? apt.statusBn : 'Confirmed'}
                      </span>
                      <div className="mt-1 text-xs text-muted font-mono">
                        {tr('Token', 'টোকেন')} <strong className="text-ink text-sm font-black">#{num(apt.tokenNumber)}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Hospital & Chamber details */}
                  <div className="p-3 bg-paper rounded-2xl border border-border space-y-1.5 text-xs text-muted">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-muted shrink-0" />
                      <span className="font-semibold text-ink">{isBn ? apt.doctorHospitalBn : apt.doctorHospital}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted pl-5">
                      <span>{apt.chamberName}</span>
                      <span className="font-mono font-bold text-blue-600">
                        {tr('Fee', 'ফি')}: ৳ {num(apt.fee)}
                      </span>
                    </div>
                    {apt.isFollowUp && (
                      <div className="mt-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg text-[10px] font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {tr(
                            `Free 14-day follow-up review window active (${num(apt.remainingFollowUpDays || 8)} days remaining)`,
                            `ফ্রি ফলোআপ উইন্ডো সক্রিয় (বাকি ${num(apt.remainingFollowUpDays || 8)} দিন)`
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between gap-2 mt-4 pt-2 border-t border-border">
                    <button
                      onClick={() => {
                        if (onOpenLiveQueue) onOpenLiveQueue();
                        else setActiveView('live_serial');
                      }}
                      className="btn btn-primary flex-1 py-2 text-xs"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{tr('Track Live Serial', 'লাইভ সিরিয়াল দেখুন')}</span>
                    </button>
                    <button
                      onClick={() => alert(tr(`Appointment with ${isBn ? apt.doctorNameBn : apt.doctorName} synced to your calendar.`, `${isBn ? apt.doctorNameBn : apt.doctorName} এর অ্যাপয়েন্টমেন্ট ক্যালেন্ডারে সেভ হয়েছে!`))}
                      className="btn btn-outline p-2 text-xs"
                      title={tr('Add to Calendar', 'ক্যালেন্ডারে যুক্ত করুন')}
                    >
                      <CalendarCheck className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BOOK NEW APPOINTMENT */}
      {activeTab === 'book_new' && (
        <ScrollReveal animation="zoom-in" duration={350}>
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-ink">
                  {tr('Book New Doctor Consultation', 'নতুন ডাক্তার অ্যাপয়েন্টমেন্ট বুকিং')}
                </h2>
                <p className="text-xs text-muted">
                  {tr('Select specialty and reserve an immediate verified chamber token', 'সহজে বিশেষজ্ঞ নির্বাচন করুন এবং তাৎক্ষণিক সিরিয়াল নম্বর নিশ্চিত করুন')}
                </p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5 text-xs">
              {/* Specialty Selector Chips */}
              <div>
                <label className="block font-bold text-ink mb-2">
                  {tr('Select Specialty:', 'বিভাগ বা বিশেষত্ব নির্বাচন করুন:')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {specialties.filter(s => s.id !== 'all').map((sp) => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSelectedSpecialty(sp.id)}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                        selectedSpecialty === sp.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-bold'
                          : 'bg-paper text-ink border-border hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {isBn ? sp.labelBn : sp.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor Selector */}
              <div>
                <label className="block font-bold text-ink mb-1.5">
                  {tr('Select Doctor:', 'চিকিৎসক নির্বাচন করুন:')}
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs font-semibold text-ink focus:outline-hidden focus:border-blue-500 transition-colors"
                >
                  {doctorsList.map((d) => (
                    <option key={d.id} value={`${isBn ? d.nameBn : d.nameEn} (${d.degree})`}>
                      {isBn ? d.nameBn : d.nameEn} — {isBn ? d.specialtyBn : d.specialtyEn} ({isBn ? d.chamberBn : d.chamberEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-ink mb-1.5">
                    {tr('Appointment Date:', 'তারিখ নির্বাচন:')}
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs font-mono text-ink focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1.5">
                    {tr('Chamber Time Slot:', 'চেম্বার সময় স্লট:')}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {timeSlots.map((ts) => (
                      <button
                        key={ts.id}
                        type="button"
                        onClick={() => setSelectedSlot(ts.id)}
                        className={`p-2 rounded-lg border text-center transition-all text-[11px] font-mono ${
                          selectedSlot === ts.id
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                            : 'bg-paper text-ink border-border hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {isBn ? ts.labelBn : ts.labelEn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Follow-up Checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 cursor-pointer hover:bg-emerald-100/50 transition-colors">
                <input
                  type="checkbox"
                  checked={isFollowUp}
                  onChange={(e) => setIsFollowUp(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <strong className="text-emerald-900 dark:text-emerald-200 block text-xs">
                    {tr('14-Day Free Report Review / Follow-Up', '১৪ দিনের ফ্রি রিপোর্ট রিভিউ / ফলোআপ')}
                  </strong>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    {tr(
                      'If you visited this physician in the last 14 days, the consultation review is free (৳ 0).',
                      'গত ১৪ দিনের মধ্যে এই ডাক্তারকে দেখালে কনসালটেশন ফি সম্পূর্ণ ফ্রি (৳ ০)।'
                    )}
                  </span>
                </div>
              </label>

              {/* Notes */}
              <div>
                <label className="block font-bold text-ink mb-1">
                  {tr('Chief Symptoms / Complaints:', 'রোগীর শারীরিক সমস্যা (সংক্ষেপে):')}
                </label>
                <textarea
                  rows={2}
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder={tr('e.g., High fever and throat ache for 3 days...', 'যেমন: ৩ দিন ধরে জ্বর ও কাশি...')}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* Fee & Confirm Button */}
              <div className="p-4 bg-paper rounded-2xl border border-border flex items-center justify-between">
                <div>
                  <span className="text-muted block text-[11px]">{tr('Consultation Fee:', 'অনুমোদিত কনসালটেশন ফি:')}</span>
                  <span className="text-lg font-black text-blue-600 font-mono">
                    {isFollowUp ? tr('৳ 0 (Free Review)', '৳ ০ (ফ্রি রিভিউ)') : `৳ ${num(1200)}`}
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary px-6 py-2.5 text-xs font-bold shadow-md shadow-blue-500/25"
                >
                  {tr('Confirm Appointment Token', 'সিরিয়াল টোকেন নিশ্চিত করুন')}
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      )}

      {/* TAB 3: DOCTOR DIRECTORY */}
      {activeTab === 'doctors' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={tr('Search doctor by name, qualification or chamber...', 'ডাক্তারের নাম বা বিশেষত্ব খুঁজুন...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper border border-border text-xs focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {specialties.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => setSpecialtyFilter(sp.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    specialtyFilter === sp.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-paper border border-border text-muted hover:text-ink'
                  }`}
                >
                  {isBn ? sp.labelBn : sp.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doctorsList
              .filter(d => specialtyFilter === 'all' || d.specialty === specialtyFilter)
              .filter(d => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                  d.nameEn.toLowerCase().includes(query) ||
                  d.nameBn.toLowerCase().includes(query) ||
                  d.specialtyEn.toLowerCase().includes(query) ||
                  d.specialtyBn.toLowerCase().includes(query)
                );
              })
              .map((doc, i) => (
                <ScrollReveal key={doc.id} animation="fade-up" delay={i * 100}>
                  <div className="card card-pad bg-surface border border-border hover:border-blue-300 shadow-elevation-1 hover:shadow-elevation-2 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={doc.avatar}
                          alt={doc.nameEn}
                          className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
                        />
                        <div>
                          <h3 className="font-bold text-ink text-sm flex items-center gap-1">
                            <span>{isBn ? doc.nameBn : doc.nameEn}</span>
                            <BadgeCheck className="w-4 h-4 text-blue-600" />
                          </h3>
                          <p className="text-[11px] text-blue-600 font-medium mt-0.5">
                            {isBn ? doc.specialtyBn : doc.specialtyEn}
                          </p>
                          <p className="text-[10px] text-muted">{doc.degree}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-paper border border-border text-xs space-y-1 text-muted">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-muted shrink-0" />
                          <span className="truncate">{isBn ? doc.chamberBn : doc.chamberEn}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-muted pt-1 border-t border-border">
                          <span>{tr('Fee', 'ফি')}: ৳ {num(doc.fee)}</span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                            {tr(`Available today: ${num(doc.slotsToday)} slots`, `আজকে খালি: ${num(doc.slotsToday)}টি স্লট`)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDoctor(`${isBn ? doc.nameBn : doc.nameEn} (${doc.degree})`);
                        setActiveTab('book_new');
                      }}
                      className="btn btn-outline mt-4 w-full py-2 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      {tr('Book Serial Token', 'সিরিয়াল বুক করুন')}
                    </button>
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
