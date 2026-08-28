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
  Filter,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  PhoneCall,
  UserCheck,
  CalendarCheck,
  Stethoscope,
  XCircle,
  BadgeCheck
} from 'lucide-react';

interface AppointmentsPageProps {
  onBack?: () => void;
  onOpenLiveQueue?: () => void;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ onBack, onOpenLiveQueue }) => {
  const { setActiveView } = useAuth();
  const { toBn, language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'my_appointments' | 'book_new' | 'doctors'>('my_appointments');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Booking form state with compact options
  const [selectedSpecialty, setSelectedSpecialty] = useState('মেডিসিন');
  const [selectedDoctor, setSelectedDoctor] = useState('ডা. তানভীর হাসান (MBBS, FCPS)');
  const [selectedDate, setSelectedDate] = useState('2026-05-20');
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [isFollowUp, setIsFollowUp] = useState(false);
  const [patientNotes, setPatientNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const specialties = [
    { id: 'all', labelBn: 'সকল বিভাগ', labelEn: 'All Specialties' },
    { id: 'মেডিসিন', labelBn: 'মেডিসিন ও ডায়াবেটিস', labelEn: 'Internal Medicine' },
    { id: 'কার্ডিওলজি', labelBn: 'হৃদরোগ ও কার্ডিওলজি', labelEn: 'Cardiology' },
    { id: 'সার্জারি', labelBn: 'সার্জারি ও ল্যাপারোস্কপি', labelEn: 'Surgery' },
    { id: 'গাইনি', labelBn: 'স্ত্রী ও প্রসূতি', labelEn: 'Gynae & Obs' },
    { id: 'শিশু', labelBn: 'শিশু বিশেষজ্ঞ', labelEn: 'Pediatrics' },
  ];

  const timeSlots = [
    { id: '10:00 AM', label: '১০:০০ AM', period: 'সকাল' },
    { id: '11:30 AM', label: '১১:৩০ AM', period: 'সকাল' },
    { id: '01:00 PM', label: '০১:০০ PM', period: 'দুপুর' },
    { id: '05:30 PM', label: '০৫:৩০ PM', period: 'সন্ধ্যা' },
    { id: '07:00 PM', label: '০৭:০০ PM', period: 'রাত' },
    { id: '08:30 PM', label: '০৮:৩০ PM', period: 'রাত' },
  ];

  const doctorsList = [
    {
      id: 'doc_1',
      name: 'ডা. তানভীর হাসান',
      degree: 'MBBS (DMC), FCPS (Medicine)',
      specialty: 'মেডিসিন',
      specialtyLabel: 'মেডিসিন ও ডায়াবেটিস বিশেষজ্ঞ',
      hospital: 'সহকারী অধ্যাপক, ঢাকা মেডিকেল কলেজ হাসপাতাল',
      chamber: 'ল্যাবএইড ডায়াগনস্টিক, ধানমন্ডি',
      fee: 1200,
      followUpFreeDays: 14,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
      rating: '4.9',
      reviews: 142,
      slotsToday: 3,
    },
    {
      id: 'doc_2',
      name: 'ডা. সায়রা আফরিন',
      degree: 'MBBS, MD (Cardiology)',
      specialty: 'কার্ডিওলজি',
      specialtyLabel: 'হৃদরোগ ও কার্ডিওলজিস্ট',
      hospital: 'সহযোগী অধ্যাপক, ন্যাশনাল হার্ট ফাউন্ডেশন',
      chamber: 'স্কয়ার হাসপাতাল, পান্থপথ',
      fee: 1500,
      followUpFreeDays: 14,
      avatar: 'https://images.unsplash.com/photo-1594824813512-58e1c667088b?auto=format&fit=crop&w=200&q=80',
      rating: '4.8',
      reviews: 98,
      slotsToday: 5,
    },
    {
      id: 'doc_3',
      name: 'ডা. রাকিবুল ইসলাম',
      degree: 'MBBS, DDV, FCPS (Dermatology)',
      specialty: 'চর্ম',
      specialtyLabel: 'চর্ম, এলার্জি ও যৌনরোগ বিশেষজ্ঞ',
      hospital: 'বিএসএমএমইউ (পিজি হাসপাতাল)',
      chamber: 'ইবনে সিনা ডায়াগনস্টিক, ধানমন্ডি',
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* Top Header & Breadcrumb */}
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
                <span className="text-blue-600 font-semibold">আমার অ্যাপয়েন্টমেন্ট ও বুকিং</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5">
                অ্যাপয়েন্টমেন্ট ব্যবস্থাপনা
              </h1>
            </div>
          </div>

          {/* Quick Segmented View Switcher */}
          <div className="flex items-center bg-slate-100/80 p-1 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('my_appointments')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'my_appointments'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50'
              }`}
            >
              আমার সিরিয়াল ({toBn(mockAppointments.length)})
            </button>
            <button
              onClick={() => setActiveTab('book_new')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'book_new'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>নতুন বুকিং</span>
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'doctors'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50'
              }`}
            >
              ডাক্তার ডিরেক্টরি
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* SUCCESS BANNER ALERT */}
      {bookingSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between animate-slide-down">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm"> অ্যাপয়েন্টমেন্ট সফলভাবে নিশ্চিত হয়েছে!</h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                আপনার সিরিয়াল টোকেন <strong>#১৮</strong> বুক করা হয়েছে। এসএমএসের মাধ্যমে রিমাইন্ডার পাঠানো হয়েছে।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: MY APPOINTMENTS */}
      {activeTab === 'my_appointments' && (
        <div className="space-y-6">
          {/* Active Appointments Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-50">আসন্ন চেম্বার অ্যাপয়েন্টমেন্টসমূহ</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                মোট {toBn(mockAppointments.length)}টি সক্রিয় শিডিউল
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockAppointments.map((apt, index) => (
                <ScrollReveal key={apt.id} animation="fade-up" delay={index * 120}>
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100/90 hover:border-blue-200 p-5 shadow-xs hover:shadow-md transition-all group">
                    {/* Top Bar with Date badge & Status */}
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5 mb-3.5">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-3 py-2 text-center min-w-[65px]">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase block">
                            {apt.dayBn}
                          </span>
                          <span className="text-lg font-black text-emerald-600 block leading-tight">
                            {apt.dateBn.split(' ')[0]}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium block">
                            {apt.dateBn.split(' ')[1]}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                            {apt.timeBn}
                          </span>
                          <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm mt-1 flex items-center gap-1.5">
                            <span>{apt.doctorNameBn}</span>
                            <BadgeCheck className="w-4 h-4 text-blue-600" />
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{apt.doctorSpecialtyBn}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block">
                          {apt.statusBn}
                        </span>
                        <div className="mt-1 text-xs text-slate-400 dark:text-slate-500 font-mono">
                          টোকেন <strong className="text-slate-800 dark:text-slate-100 text-sm font-black">#{toBn(apt.tokenNumber)}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Hospital & Chamber details */}
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{apt.doctorHospitalBn}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pl-5">
                        <span>{apt.chamberName}</span>
                        <span className="font-mono font-bold text-blue-600">ফি: ৳ {toBn(apt.fee)}</span>
                      </div>
                      {apt.isFollowUp && (
                        <div className="mt-1 px-2 py-1 bg-emerald-100/70 text-emerald-800 rounded-lg text-[10px] font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>ফ্রি ফলোআপ উইন্ডো সক্রিয় (বাকি {toBn(apt.remainingFollowUpDays || 8)} দিন)</span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between gap-2 mt-4 pt-2 border-t border-slate-50">
                      <button
                        onClick={() => {
                          if (onOpenLiveQueue) onOpenLiveQueue();
                          else setActiveView('live_serial');
                        }}
                        className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all btn-press"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>লাইভ সিরিয়াল দেখুন</span>
                      </button>
                      <button
                        onClick={() => alert(` ${apt.doctorNameBn} এর অ্যাপয়েন্টমেন্ট আপনার ক্যালেন্ডারে সেভ করা হয়েছে!`)}
                        className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 text-xs font-semibold transition-colors btn-press"
                        title="ক্যালেন্ডারে যুক্ত করুন"
                      >
                        <CalendarCheck className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOK NEW APPOINTMENT (Clean, compact, non-bulky layout) */}
      {activeTab === 'book_new' && (
        <ScrollReveal animation="zoom-in" duration={350}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">নতুন ডাক্তার অ্যাপয়েন্টমেন্ট বুকিং</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  সহজে বিশেষজ্ঞ নির্বাচন করুন এবং তাৎক্ষণিক সিরিয়াল নম্বর নিশ্চিত করুন
                </p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5 text-xs">
              {/* Specialty Selector Chips (Compact) */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">বিভাগ বা বিশেষত্ব নির্বাচন করুন:</label>
                <div className="flex flex-wrap gap-2">
                  {specialties.filter(s => s.id !== 'all').map((sp) => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSelectedSpecialty(sp.id)}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                        selectedSpecialty === sp.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-bold'
                          : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {sp.labelBn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor Selector */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">চিকিৎসক নির্বাচন করুন:</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-blue-500 transition-colors"
                >
                  {doctorsList.map((d) => (
                    <option key={d.id} value={`${d.name} (${d.degree})`}>
                      {d.name} — {d.specialtyLabel} ({d.chamber})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">তারিখ নির্বাচন:</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">চেম্বার সময় স্লট:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {timeSlots.map((ts) => (
                      <button
                        key={ts.id}
                        type="button"
                        onClick={() => setSelectedSlot(ts.id)}
                        className={`p-2 rounded-lg border text-center transition-all text-[11px] font-mono ${
                          selectedSlot === ts.id
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                            : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {ts.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Follow-up Checkbox (Compact) */}
              <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 cursor-pointer hover:bg-emerald-50 transition-colors">
                <input
                  type="checkbox"
                  checked={isFollowUp}
                  onChange={(e) => setIsFollowUp(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <strong className="text-emerald-900 block text-xs">১৪ দিনের ফ্রি রিপোর্ট রিভিউ / ফলোআপ</strong>
                  <span className="text-[11px] text-emerald-700">
                    গত ১৪ দিনের মধ্যে এই ডাক্তারকে দেখালে কনসালটেশন ফি সম্পূর্ণ ফ্রি (৳ ০)।
                  </span>
                </div>
              </label>

              {/* Notes */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">রোগীর শারীরিক সমস্যা (সংক্ষেপে):</label>
                <textarea
                  rows={2}
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder="যেমন: ৩ দিন ধরে জ্বর ও কাশি..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* Fee & Confirm Button */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">অনুমোদিত কনসালটেশন ফি:</span>
                  <span className="text-lg font-black text-blue-600 font-mono">
                    {isFollowUp ? '৳ ০ (ফ্রি রিভিউ)' : '৳ ১২০০'}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition-all btn-press"
                >
                  সিরিয়াল টোকেন নিশ্চিত করুন
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
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ডাক্তারের নাম বা বিশেষত্ব খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-blue-500 font-bangla"
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
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {sp.labelBn}
                </button>
              ))}
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doctorsList
              .filter(d => specialtyFilter === 'all' || d.specialty === specialtyFilter)
              .filter(d => !searchQuery || d.name.includes(searchQuery) || d.specialtyLabel.includes(searchQuery))
              .map((doc, i) => (
                <ScrollReveal key={doc.id} animation="fade-up" delay={i * 100}>
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
                        />
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm flex items-center gap-1">
                            <span>{doc.name}</span>
                            <BadgeCheck className="w-4 h-4 text-blue-600" />
                          </h3>
                          <p className="text-[11px] text-blue-600 font-medium mt-0.5">{doc.specialtyLabel}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">{doc.degree}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1 text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                          <span className="truncate">{doc.chamber}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/50">
                          <span>ফি: ৳ {toBn(doc.fee)}</span>
                          <span className="text-emerald-700 font-semibold">আজকে খালি: {toBn(doc.slotsToday)}টি স্লট</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDoctor(`${doc.name} (${doc.degree})`);
                        setActiveTab('book_new');
                      }}
                      className="mt-4 w-full py-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl text-xs font-bold border border-blue-200 hover:border-blue-600 transition-all btn-press"
                    >
                      সিরিয়াল বুক করুন
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
