import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Clock,
  FileText,
  Pill,
  RefreshCw,
  Droplet,
  BedDouble,
  GraduationCap,
  MessageSquare,
  ChevronRight,
  Play,
  QrCode,
  Users,
  Shield,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Heart,
  Sparkles,
  Award,
  Activity
} from 'lucide-react';

interface LandingPageProps {
  onStartNow: () => void;
  onOpenLiveQueue: () => void;
  onOpenPrescriptions: () => void;
  onOpenMedicines: () => void;
  onOpenBloodBank: () => void;
  onOpenBeds: () => void;
  onOpenStudentHub: () => void;
  onOpenForum: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartNow,
  onOpenLiveQueue,
  onOpenPrescriptions,
  onOpenMedicines,
  onOpenBloodBank,
  onOpenBeds,
  onOpenStudentHub,
  onOpenForum
}) => {
  const { setIsLoginModalOpen, setIsRegisterModalOpen, setActiveView } = useAuth();
  const { toBn } = useLanguage();

  const services = [
    {
      id: 'live_queue',
      titleBn: 'লাইভ সিরিয়াল ট্র্যাকিং',
      descBn: 'ডাক্তারের চেম্বারের লাইভ সিরিয়াল দেখুন এবং অপেক্ষার সময় জানতে পারবেন।',
      icon: Clock,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      action: onOpenLiveQueue
    },
    {
      id: 'prescriptions',
      titleBn: 'ই-প্রেসক্রিপশন',
      descBn: 'ডাক্তারের ডিজিটাল প্রেসক্রিপশন সহজে দেখুন ও প্রিন্ট বা সংরক্ষণ করুন।',
      icon: FileText,
      color: 'bg-teal-50 text-teal-600 border-teal-100',
      action: onOpenPrescriptions
    },
    {
      id: 'medicines',
      titleBn: 'ওষুধ মূল্য ও বিকল্প',
      descBn: 'ওষুধের দাম ও সেরা জেনেরিক বিকল্প তুলনা করে সাশ্রয়ী নির্বাচন করুন।',
      icon: Pill,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      action: onOpenMedicines
    },
    {
      id: 'reports',
      titleBn: 'রিপোর্ট ফলোআপ',
      descBn: '১৪ দিনের ফ্রি রিপোর্ট রিভিউ ট্র্যাক করুন ও অটোমেটিক রিমাইন্ডার পান।',
      icon: RefreshCw,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      action: onStartNow
    },
    {
      id: 'blood_bank',
      titleBn: 'রক্তদাতা নেটওয়ার্ক',
      descBn: 'জেলা ভিত্তিক ৯০ দিনের কুলডাউন যাচাইকৃত রক্তদাতা খুঁজুন ও সহায়তা নিন।',
      icon: Droplet,
      color: 'bg-red-50 text-red-600 border-red-100',
      action: onOpenBloodBank
    },
    {
      id: 'beds',
      titleBn: 'বেড ও ICU ডিরেক্টরি',
      descBn: 'হাসপাতালের সাধারণ বেড, ICU ও CCU এর লাইভ অ্যাভেইলেবিলিটি চেক করুন।',
      icon: BedDouble,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      action: onOpenBeds
    },
    {
      id: 'student_hub',
      titleBn: 'মেডিকেল শিক্ষার্থী হাব',
      descBn: 'ক্লিনিক্যাল ওয়ার্ড লগবুক, OSCE চেকলিস্ট, ডোজ ক্যালকুলেটর ও কুইজ।',
      icon: GraduationCap,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      action: onOpenStudentHub
    },
    {
      id: 'case_forum',
      titleBn: 'কেস ডিসকাশন ফোরাম',
      descBn: 'ECG, X-Ray ও ক্লিনিক্যাল কেস নিয়ে অভিজ্ঞ ডাক্তারদের সাথে আলোচনা করুন।',
      icon: MessageSquare,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      action: onOpenForum
    }
  ];

  const steps = [
    { num: 1, titleBn: 'অ্যাকাউন্ট তৈরি করুন', descBn: 'আপনার মোবাইল নম্বর দিয়ে রোগী, ডাক্তার বা শিক্ষার্থী হিসেবে সহজে রেজিস্টার করুন।' },
    { num: 2, titleBn: 'সেবা নির্বাচন করুন', descBn: 'সিরিয়াল ট্র্যাকার, ই-প্রেসক্রিপশন বা রক্তদাতা নেটওয়ার্ক থেকে সেবা বেছে নিন।' },
    { num: 3, titleBn: 'লাইভ আপডেট পান', descBn: 'ডাক্তারের আগমন ও চেম্বার সিরিয়ালের রিয়েল-টাইম নোটিফিকেশন ট্র্যাক করুন।' },
    { num: 4, titleBn: 'ডিজিটাল ভল্টে সংরক্ষণ', descBn: 'প্রেসক্রিপশন ও ল্যাব টেস্টের রিপোর্ট আজীবন সুরক্ষিত ভল্টে রাখুন।' }
  ];

  const partners = [
    { name: 'Square', sub: 'Pharmaceuticals Ltd.', color: 'text-blue-700' },
    { name: 'incepta', sub: 'Incepta Pharmaceuticals Ltd.', color: 'text-emerald-700' },
    { name: 'BEXIMCO', sub: 'PHARMA', color: 'text-purple-700' },
    { name: 'Renata', sub: 'Limited', color: 'text-rose-700' },
    { name: 'MEDICINE', sub: 'CORNER', color: 'text-cyan-700' }
  ];

  return (
    <div className="min-h-screen bg-paper font-bangla overflow-x-hidden">
      {/* Top Landing Header */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 sm:px-8 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo />

          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
            <a href="#hero" className="text-blue-600 hover:text-blue-700 transition-colors">হোম</a>
            <a href="#services" className="hover:text-blue-600 transition-colors">সেবাসমূহ</a>
            <a href="#how_it_works" className="hover:text-blue-600 transition-colors">কিভাবে কাজ করে</a>
            <a href="#mobile_app" className="hover:text-blue-600 transition-colors">মোবাইল অ্যাপ</a>
            <a href="#partners" className="hover:text-blue-600 transition-colors">সহযোগী প্রতিষ্ঠান</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">যোগাযোগ</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all btn-press"
            >
              লগইন
            </button>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/25 transition-all btn-press"
            >
              অ্যাকাউন্ট করুন
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-10 sm:pt-16 pb-14 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <ScrollReveal animation="fade-down" duration={400}>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>বাংলাদেশের ডিজিটাল স্বাস্থ্য নেটওয়ার্ক</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" duration={450} delay={100}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-ink leading-[1.15] tracking-tight">
                স্বাস্থ্যসেবা হবে<br />
                <span className="text-blue-600 dark:text-blue-400">সহজ, দ্রুত ও বিশ্বাসযোগ্য</span>
              </h1>
              <div className="mt-4 h-px w-24 bg-teal-600" />
            </ScrollReveal>

            <ScrollReveal animation="fade-up" duration={450} delay={150}>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                রোগী, চিকিৎসক ও মেডিকেল শিক্ষার্থীদের জন্য একটি স্মার্ট ডিজিটাল স্বাস্থ্যসেবা প্ল্যাটফর্ম। চেম্বারের দীর্ঘ অপেক্ষা পরিহার করুন এবং আধুনিক চিকিৎসাসেবার অভিজ্ঞতা নিন।
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" duration={450} delay={200}>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={onStartNow}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors btn-press"
                >
                  <span>শুরু করুন এখনই</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#how_it_works"
                  className="px-5 py-3 bg-surface hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors btn-press"
                >
                  <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>কিভাবে কাজ করে</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Stat strip */}
            <ScrollReveal animation="fade-up" duration={450} delay={250}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <div className="text-2xl font-serif font-semibold text-ink">১০,০০০+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">সন্তুষ্ট রোগী</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-semibold text-ink">৫০০+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">বিশেষজ্ঞ ডাক্তার</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-semibold text-ink">৫০+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">হাসপাতাল ও ক্লিনিক</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-semibold text-ink">২৪/৭</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">সাপোর্ট সেবা</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Hero Right: the live queue ticket — the product's actual signature feature,
              styled after a real hospital token stub rather than a generic app screenshot. */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-up" duration={500} delay={150}>
              <div className="bg-surface border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <div className="px-5 pt-5 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                    <span>লাইভ সিরিয়াল</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">চেম্বার ৪</span>
                </div>

                <div className="px-5 pb-5">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">এখন চলছে সিরিয়াল</div>
                  <div className="font-mono text-6xl font-semibold text-ink leading-none mt-1">১২</div>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">আপনার সিরিয়াল <span className="font-mono font-bold text-ink">১৮</span></span>
                    <span className="text-slate-500 dark:text-slate-400">আনুমানিক <span className="font-mono font-bold text-ink">২৫ মিনিট</span></span>
                  </div>
                </div>

                {/* Perforated tear line, like a real token stub */}
                <div className="relative border-t border-dashed border-slate-300 dark:border-slate-700">
                  <div className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-paper border border-slate-200 dark:border-slate-800" />
                  <div className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-paper border border-slate-200 dark:border-slate-800" />
                </div>

                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=100&q=80"
                      alt="Doctor"
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-ink">ডা. তানভীর হাসান</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">মেডিসিন বিশেষজ্ঞ · চেম্বারে আছেন</div>
                    </div>
                  </div>
                  <button
                    onClick={onOpenLiveQueue}
                    className="text-xs font-bold text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 flex items-center gap-1 shrink-0"
                  >
                    ট্র্যাক করুন
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Secondary quick links to the other core services */}
              <div className="grid grid-cols-3 gap-2 mt-3 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <button onClick={onOpenPrescriptions} className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface hover:border-blue-300 dark:hover:border-blue-700 transition-colors card-interactive">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">প্রেসক্রিপশন</span>
                </button>
                <button onClick={onOpenMedicines} className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface hover:border-blue-300 dark:hover:border-blue-700 transition-colors card-interactive">
                  <Pill className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">ওষুধ সূচক</span>
                </button>
                <button onClick={onOpenBloodBank} className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface hover:border-blue-300 dark:hover:border-blue-700 transition-colors card-interactive">
                  <Droplet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">রক্তদান</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Grid (8 Services) */}
      <section id="services" className="py-14 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800">
        <ScrollReveal animation="fade-up" duration={450}>
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>সুবিধাসমূহ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
              আমাদের ডিজিটাল সেবাসমূহ
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              আপনার স্বাস্থ্যসেবা যাত্রাকে সহজ ও স্মার্ট করতে আমরা আছি সার্বক্ষণিক পাশে।
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((s, index) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.id} animation="fade-up" delay={index * 60}>
                <div
                  onClick={s.action}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xs hover:shadow-xl hover:border-blue-200 card-interactive flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${s.color} border flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-2xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 transition-colors">
                      {s.titleBn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {s.descBn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center text-xs font-bold text-blue-600 group-hover:gap-1.5 transition-all">
                    <span>ক্লিক করে ব্যবহার করুন</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Dark Blue Mobile App Banner */}
      <section id="mobile_app" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up" duration={450}>
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold text-teal-400 tracking-wider uppercase">
                  সব সেবা আপনার হাতের মুঠোয়
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                  স্বাস্থ্যসেবা এখন <br />
                  আপনার হাতের মুঠোয়
                </h2>
                <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                  আমাদের মোবাইল অ্যাপের মাধ্যমে লাইভ সিরিয়াল ট্র্যাক করুন, প্রেসক্রিপশন দেখুন এবং জরুরি রক্তদাতা খুঁজুন মাত্র এক ট্যাপে।
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <div className="flex items-center gap-3 bg-white/10 border border-white/20 p-2.5 rounded-2xl backdrop-blur-md hover:bg-white/15 transition-colors">
                    <QrCode className="w-12 h-12 text-white" />
                    <div className="text-left text-xs">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 block">QR কোড স্ক্যান করুন</span>
                      <span className="font-bold text-white">অ্যাপ ডাউনলোড</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold cursor-pointer transition-all btn-press">
                       Google Play তে ইনস্টল করুন
                    </div>
                    <div className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold cursor-pointer transition-all btn-press">
                       App Store থেকে ডাউনলোড
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div
                  onClick={onOpenLiveQueue}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all cursor-pointer card-interactive"
                >
                  <Clock className="w-6 h-6 text-teal-400 mb-2" />
                  <h4 className="font-bold text-sm">লাইভ সিরিয়াল</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">রিয়েল-টাইম ডাক্তার ট্র্যাকিং</p>
                </div>

                <div
                  onClick={onOpenBloodBank}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all cursor-pointer card-interactive"
                >
                  <Droplet className="w-6 h-6 text-red-400 mb-2 animate-heart-beat" />
                  <h4 className="font-bold text-sm">রক্তদাতা খুঁজুন</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">যাচাইকৃত ডোনার নেটওয়ার্ক</p>
                </div>

                <div
                  onClick={onOpenBeds}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all cursor-pointer card-interactive"
                >
                  <BedDouble className="w-6 h-6 text-emerald-400 mb-2" />
                  <h4 className="font-bold text-sm">বেড খালি আছে</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">ICU ও সাধারণ বেড আপডেট</p>
                </div>

                <div
                  onClick={onOpenMedicines}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all cursor-pointer card-interactive"
                >
                  <Pill className="w-6 h-6 text-amber-400 mb-2" />
                  <h4 className="font-bold text-sm">ওষুধের বিকল্প</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">সাশ্রয়ী জেনেরিক বিকল্প</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* How it Works */}
      <section id="how_it_works" className="py-14 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800">
        <ScrollReveal animation="fade-up" duration={450}>
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>প্রক্রিয়া</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
              কিভাবে কাজ করে
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              মাত্র ৪টি সহজ ধাপে স্বাস্থ্যসেবা গ্রহণ করুন।
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <ScrollReveal key={step.num} animation="fade-up" delay={index * 100}>
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center relative shadow-2xs hover:shadow-md transition-all card-interactive group h-full">
                <div className="w-11 h-11 rounded-full bg-emerald-500 text-white font-bold text-sm flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  {toBn(step.num)}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-base group-hover:text-emerald-700 transition-colors">
                  {step.titleBn}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {step.descBn}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Pharma Partners */}
      <section id="partners" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800 text-center">
        <ScrollReveal animation="fade-up" duration={400}>
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-8">
            বিশ্বস্ত সহযোগী ও ওষুধ ডেটাবেজ পার্টনার
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {partners.map((p, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all card-interactive text-center font-sans min-w-[140px] group"
              >
                <span className={`text-xl font-black tracking-tight ${p.color} block group-hover:scale-105 transition-transform`}>
                  {p.name}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{p.sub}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Family Health CTA Banner */}
      <section className="py-8 px-4 sm:px-8 max-w-7xl mx-auto">
        <ScrollReveal animation="zoom-in" duration={450}>
          <div className="bg-blue-600 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                আপনার ও আপনার পরিবারের স্বাস্থ্য আমাদের অঙ্গীকার
              </h3>
              <p className="text-xs sm:text-sm text-blue-100">
                আজই যোগ দিন স্বাস্থ্যসেতু বিডির সাথে এবং স্মার্ট ডিজিটাল স্বাস্থ্যসেবার অভিজ্ঞতা নিন।
              </p>
            </div>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="whitespace-nowrap px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 btn-press"
            >
              <span>অ্যাকাউন্ট করুন এখনই</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-12 pb-8 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-3">
            <BrandLogo />
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              বাংলাদেশের সর্বাধুনিক ডিজিটাল স্বাস্থ্য ও মেডিকেল এডুকেশন নেটওয়ার্ক। রোগী, ডাক্তার ও শিক্ষার্থীদের এক ছাতার নিচে সেতুবন্ধন।
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-50 text-xs">দ্রুত লিঙ্ক</h4>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
              <li><a href="#hero" className="hover:text-blue-600 transition-colors">হোম</a></li>
              <li><a href="#services" className="hover:text-blue-600 transition-colors">সেবাসমূহ</a></li>
              <li><button onClick={onOpenMedicines} className="hover:text-blue-600 transition-colors">ওষুধের তালিকা</button></li>
              <li><button onClick={onOpenBloodBank} className="hover:text-blue-600 transition-colors">রক্তদাতা অনুসন্ধান</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-50 text-xs">সহায়তা</h4>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
              <li><a href="#" className="hover:text-blue-600 transition-colors">সাধারণ প্রশ্ন (FAQ)</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">গোপনীয়তা নীতি</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">ব্যবহারের শর্তাবলী</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-50 text-xs">যোগাযোগ</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
               09678-123456 <br />
               support@shasthosetu.gov.bd <br />
               বাড়ি #১২, রোড #৫, ধানমন্ডি, ঢাকা-১২০৫
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          © ২০২৬ স্বাস্থ্যসেতু বিডি (OpenHealthBD). সর্বস্বত্ব সংরক্ষিত।
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
