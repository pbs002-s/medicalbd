import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Clock,
  FileText,
  Pill,
  Droplet,
  BedDouble,
  GraduationCap,
  ChevronRight,
  Shield,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Heart,
  Sparkles,
  Award,
  Sun,
  Moon,
  Palette,
  Check,
  Building2,
  Activity,
  Users
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
  const { setIsLoginModalOpen, setIsRegisterModalOpen, setActiveView, switchRole } = useAuth();
  const { language, setLanguage, tr, num, isBn } = useLanguage();
  const { resolvedTheme, toggleTheme, mood, setMood, moods } = useTheme();

  const [isMoodOpen, setIsMoodOpen] = useState(false);

  const bentoFeatures = [
    {
      index: '01',
      tagEn: 'LIVE QUEUE',
      tagBn: 'লাইভ সিরিয়াল',
      titleEn: 'Real-Time Chamber Serial Tracker',
      titleBn: 'লাইভ চেম্বার সিরিয়াল ট্র্যাকিং',
      descEn: 'Eliminate 3-5 hour waiting room chaos. Know exact calling token, doctor arrival state, and estimated wait before leaving home.',
      descBn: 'চেম্বারে ঘণ্টার পর ঘণ্টা অপেক্ষার দিন শেষ। বাসা থেকেই জানুন ডাক্তার কখন উপস্থিত হচ্ছেন এবং আপনার সিরিয়াল আসতে আর কত সময় বাকি।',
      icon: Clock,
      action: onOpenLiveQueue,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/30'
    },
    {
      index: '02',
      tagEn: 'BMDC E-PRESCRIPTION',
      tagBn: 'ই-প্রেসক্রিপশন',
      titleEn: 'Digital Rx & Lifelong Health Vault',
      titleBn: 'ডিজিটাল প্রেসক্রিপশন ও আজীবন হেলথ ভল্ট',
      descEn: 'Clear bilingual e-prescriptions with dosage chips (1+0+1 after meals), investigations, and QR verification. Exportable print-ready PDF.',
      descBn: 'স্পষ্ট বাংলা ডোজেস নির্দেশনাসহ প্রেসক্রিপশন। প্রেসক্রিপশন হারিয়ে যাওয়ার ভয় নেই, সংরক্ষিত থাকবে আজীবন ক্লাউড ভল্টে।',
      icon: FileText,
      action: onOpenPrescriptions,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/30'
    },
    {
      index: '03',
      tagEn: 'DGDA PRICING',
      tagBn: 'ওষুধের দাম',
      titleEn: 'Medicine Prices & Generic Substitutes',
      titleBn: 'ওষুধ মূল্য ও সাশ্রয়ী বিকল্প নির্দেশিকা',
      descEn: 'Search any Bangladeshi brand to inspect official DGDA prices, formula, and top-tier cheaper generic alternatives from Square, Incepta, and Beximco.',
      descBn: 'ব্র্যান্ড অনুযায়ী সরকারি এমআরপি মূল্য জানুন এবং একই মানের কম দামি জেনেরিক বিকল্প ওষুধ সহজে খুঁজে সাশ্রয় করুন।',
      icon: Pill,
      action: onOpenMedicines,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/30'
    },
    {
      index: '04',
      tagEn: 'VERIFIED DONORS',
      tagBn: 'রক্তদান',
      titleEn: 'Blood Donor Network with 90-Day Cooldown',
      titleBn: 'যাচাইকৃত রক্তদাতা নেটওয়ার্ক (৯০ দিনের বিরতি)',
      descEn: 'Filter verified blood donors across 64 districts and upazilas. Automated 90-day cooldown timer ensures only ready, healthy donors show as available.',
      descBn: '৬৪ জেলা ও উপজেলায় রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন। ৯০ দিনের স্বয়ংক্রিয় স্বাস্থ্য সুরক্ষা ফিল্টার নিশ্চিত করে সক্রিয় ডোনারদের তালিকা।',
      icon: Droplet,
      action: onOpenBloodBank,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/30'
    },
    {
      index: '05',
      tagEn: 'EMERGENCY DIRECTORY',
      tagBn: 'বেড ও ICU',
      titleEn: 'Hospital Bed & ICU Vacancy Counter',
      titleBn: 'হাসপাতাল বেড ও ICU রিয়েল-টাইম ডিরেক্টরি',
      descEn: 'Live vacancy counts of General Beds, ICU, CCU, HDU, and NICU units across registered government medicals and private clinics with direct dispatch dials.',
      descBn: 'জরুরি সময়ে জেনারেল বেড, আইসিইউ, সিসিইউ ও এনআইসিইউ এর বর্তমান খালি সংখ্যা দেখুন এবং সরাসরি হাসপাতালে যোগাযোগ করুন।',
      icon: BedDouble,
      action: onOpenBeds,
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-50 dark:bg-cyan-900/30'
    },
    {
      index: '06',
      tagEn: 'MEDICAL EDUCATION',
      tagBn: 'মেডিকেল শিক্ষা',
      titleEn: 'Student Hub, OSCE & Weight-Based Dose Calc',
      titleBn: 'শিক্ষার্থী হাব, OSCE স্টেশন ও পেডিয়াট্রিক ডোজ',
      descEn: 'MBBS clinical ward logbooks, interactive 5-min OSCE examination timers with viva checklists, and pediatric mg/kg emergency dose calculators.',
      descBn: 'এমবিবিএস শিক্ষার্থীদের জন্য ক্লিনিক্যাল ওয়ার্ড লগবুক, ৫ মিনিটের ওএসসিই ভাইভা চেকলিস্ট এবং শিশুর ওজনভিত্তিক নিখুঁত ওষুধ ক্যালকুলেটর।',
      icon: GraduationCap,
      action: onOpenStudentHub,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/30'
    }
  ];

  const steps = [
    {
      num: 1,
      titleEn: 'Create Account or Choose Role',
      titleBn: 'অ্যাকাউন্ট তৈরি বা ভূমিকা নির্বাচন',
      descEn: 'Quick registration for patients, doctors, or medical students with phone verification.',
      descBn: 'রোগী, চিকিৎসক বা মেডিকেল শিক্ষার্থী হিসেবে সহজেই রেজিস্ট্রেশন করুন।'
    },
    {
      num: 2,
      titleEn: 'Book Serial & Track Live',
      titleBn: 'সিরিয়াল বুকিং ও লাইভ ট্র্যাকিং',
      descEn: 'Select doctor chamber, get token number, and watch real-time queue progression from home.',
      descBn: 'চেম্বারের সিরিয়াল নম্বর নিন এবং বাসা থেকেই লাইভ সিরিয়াল মনিটর করুন।'
    },
    {
      num: 3,
      titleEn: 'Consultation & Digital Prescription',
      titleBn: 'পরামর্শ ও ডিজিটাল ই-প্রেসক্রিপশন',
      descEn: 'Receive clear, structured prescriptions with BMDC registration QR code and Bengali advice.',
      descBn: 'ডাক্তারের কাছ থেকে পান বিএমডিসি ভেরিফাইড ডিজিটাল ই-প্রেসক্রিপশন।'
    },
    {
      num: 4,
      titleEn: 'Lifetime Vault & 14-Day Free Review',
      titleBn: 'আজীবন ভল্ট ও ১৪ দিনের ফ্রি ফলোআপ',
      descEn: 'Access past records anytime and track remaining days for complimentary lab report review.',
      descBn: 'রিপোর্ট প্রদর্শনীর ১৪ দিনের ফ্রি রিভিউ উইন্ডো স্বয়ংক্রিয়ভাবে ট্র্যাক করুন।'
    }
  ];

  const announcements = [
    {
      type: 'EMERGENCY',
      titleEn: 'Heavy Dengue Vector Warning — Dhaka & Chattogram',
      titleBn: 'ডেঙ্গু বিস্তার প্রতিরোধে জরুরি স্বাস্থ্য সতর্কবার্তা — ঢাকা ও চট্টগ্রাম',
      descEn: 'DGHS advisory: avoid stagnant water, consult early for high fever, and test CBC + NS1 within 48 hours.',
      descBn: 'স্বাস্থ্য অধিদপ্তরের পরামর্শ: জ্বর হলে অবহেলা না করে ৪৮ ঘণ্টার মধ্যে এনএস১ পরীক্ষা করান এবং চিকিৎসকের পরামর্শ নিন।'
    },
    {
      type: 'HOTLINE',
      titleEn: '24/7 National Health Hotline 16263 Available Nationwide',
      titleBn: 'টোল-ফ্রি জাতীয় স্বাস্থ্য বাতায়ন ১৬২৬৩ সার্বক্ষণিক সক্রিয়',
      descEn: 'Direct access to government registered medical officers for free preliminary medical advice.',
      descBn: 'যেকোনো স্বাস্থ্য পরামর্শের জন্য ১৬২৬৩ নম্বরে বিনা খরচে সরকারি চিকিৎসকের পরামর্শ নিন।'
    },
    {
      type: 'EDUCATION',
      titleEn: 'BCPS FCPS-1 & BSMMU Residency Mock Banks Updated',
      titleBn: 'এফসিপিএস-১ ও রেসিডেন্সি পরীক্ষার প্রশ্ন ব্যাংক হালনাগাদ',
      descEn: 'High-yield past clinical MCQs, SBAs, and explanatory rationales added to the Student Hub.',
      descBn: 'মেডিকেল শিক্ষার্থী হাবে যুক্ত হয়েছে উচ্চ-ফলনশীল প্রশ্ন ও বিস্তারিত ব্যাখ্যা।'
    }
  ];

  return (
    <div className="min-h-screen bg-paper overflow-x-hidden">
      {/* Public Navigation (OpenGovtBD style) */}
      <nav className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border px-4 sm:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo />

          <div className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-muted">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tr('Services', 'সেবাসমূহ')}
            </a>
            <a href="#how_it_works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tr('How It Works', 'কিভাবে কাজ করে')}
            </a>
            <a href="#announcements" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tr('Announcements', 'জরুরি বার্তা')}
            </a>
            <button
              onClick={() => {
                switchRole('student');
                setActiveView('student_hub');
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {tr('Medical Students', 'শিক্ষার্থী হাব')}
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* 1-Click Language Switcher (OpenGovtBD pill) */}
            <div className="flex items-center bg-paper border border-border p-0.5 rounded-xl shadow-2xs text-xs font-bold select-none">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-muted hover:text-ink'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded-lg transition-all font-bangla ${
                  language === 'bn'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-muted hover:text-ink'
                }`}
                title="বাংলা ভাষায় পরিবর্তন"
              >
                বাং
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-muted hover:text-ink hover:bg-paper border border-border transition-colors shadow-2xs"
              title={resolvedTheme === 'dark' ? tr('Light Mode', 'লাইট মোড') : tr('Dark Mode', 'ডার্ক মোড')}
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Colour Mood Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsMoodOpen(!isMoodOpen)}
                className="p-2 rounded-xl text-muted hover:text-blue-600 hover:bg-paper border border-border transition-colors shadow-2xs flex items-center gap-1.5"
                title={tr('Change Colour Theme', 'রঙের থিম')}
              >
                <Palette className="w-4 h-4 text-blue-600" />
                <span
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-black/20"
                  style={{ background: moods.find((m) => m.id === mood)?.swatch[0] || '#0B4F8A' }}
                />
              </button>

              {isMoodOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-surface rounded-2xl shadow-card-hover border border-border p-3 z-50 animate-slide-down">
                  <div className="text-xs font-bold text-ink pb-2 border-b border-border mb-2 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-blue-600" />
                    <span>{tr('Palette Mood', 'রঙের মুড')}</span>
                  </div>
                  <div className="space-y-1">
                    {moods.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setMood(opt.id);
                          setIsMoodOpen(false);
                        }}
                        className={`w-full p-2 rounded-xl border flex items-center gap-2 text-xs transition-all ${
                          mood === opt.id
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/25 font-bold'
                            : 'border-border bg-paper hover:bg-surface font-medium'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full ring-1 ring-black/10 shrink-0"
                          style={{ background: opt.swatch[0] }}
                        />
                        <span className="text-ink flex-1 text-left">
                          {isBn ? opt.labelBn : opt.labelEn}
                        </span>
                        {mood === opt.id && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Login / Register Buttons */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="btn btn-ghost btn-sm hidden sm:inline-flex"
            >
              {tr('Log in', 'লগ ইন')}
            </button>

            <button
              onClick={onStartNow}
              className="btn btn-primary btn-sm"
            >
              <span>{tr('Open Dashboard', 'ড্যাশবোর্ডে প্রবেশ')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section (OpenGovtBD signature hero style) */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-7">
        <ScrollReveal animation="fade-down" duration={450}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-semibold text-muted shadow-2xs mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{tr("Bangladesh's Open Digital Healthcare & Medical Education Platform", 'বাংলাদেশের ওপেন ডিজিটাল স্বাস্থ্যসেবা ও চিকিৎসা শিক্ষা প্ল্যাটফর্ম')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight max-w-4xl mx-auto leading-tight">
            {tr(
              'The digital bridge between patients, doctors & healthcare.',
              'রোগী, চিকিৎসক ও স্বাস্থ্যসেবার আধুনিক ডিজিটাল সেতু।'
            )}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {tr(
              'Track live chamber serials without waiting room chaos, access legible e-prescriptions, find verified blood donors, and explore open medical education tools.',
              'চেম্বারে ঘণ্টার পর ঘণ্টা অপেক্ষা ছাড়াই লাইভ সিরিয়াল ট্র্যাক করুন, বিএমডিসি মানের ই-প্রেসক্রিপশন সংরক্ষণ করুন এবং জরুরি রক্তদাতা ও আইসিইউ বেড খুঁজুন সহজে।'
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartNow}
              className="btn btn-primary text-sm sm:text-base py-3 px-6 shadow-elevation-2"
            >
              <span>{tr('Launch Patient Portal', 'রোগী পোর্টাল চালু করুন')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                switchRole('doctor');
                setActiveView('dashboard');
              }}
              className="btn btn-outline text-sm sm:text-base py-3 px-6"
            >
              <Activity className="w-4 h-4 text-blue-600" />
              <span>{tr('Doctor / Clinic Login', 'চিকিৎসক ও ক্লিনিক পোর্টাল')}</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Stats Band (OpenGovtBD style) */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 max-w-5xl mx-auto mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="pt-3 md:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-blue-600">{num(64)}</div>
                <div className="text-xs font-semibold text-muted mt-1">{tr('Districts Covered', '৬৪ জেলায় কাভারেজ')}</div>
              </div>
              <div className="pt-3 md:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">{num('500')}+</div>
                <div className="text-xs font-semibold text-muted mt-1">{tr('Registered BMDC Doctors', 'নিবন্ধিত চিকিৎসক')}</div>
              </div>
              <div className="pt-3 md:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-ink">{tr('100%', '১০০%')}</div>
                <div className="text-xs font-semibold text-muted mt-1">{tr('Open-Source & Free', 'ওপেন-সোর্স ও উন্মুক্ত')}</div>
              </div>
              <div className="pt-3 md:pt-0">
                <div className="text-2xl sm:text-3xl font-black text-red-600">{tr('24/7', '২৪/৭')}</div>
                <div className="text-xs font-semibold text-muted mt-1">{tr('Emergency Availability', 'সার্বক্ষণিক হেল্পলাইন')}</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Bento Grid: "Everything a Citizen & Doctor Needs" */}
      <section id="features" className="py-14 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="section-eyebrow">
            <span className="n">01 /</span>
            <span>{tr('Core Modules', 'মূল সেবাসমূহ')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            {tr('Everything you need, in one cohesive platform', 'আপনার প্রয়োজনীয় সবকিছু এক ছাদের নিচে')}
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            {tr(
              'Engineered specifically to solve real, everyday medical friction in Bangladesh.',
              'বাংলাদেশের স্বাস্থ্য ব্যবস্থার বাস্তব সমস্যা সমাধানে বিশেষভাবে নির্মিত।'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bentoFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.index}
                onClick={feat.action}
                className="card card-pad hoverable cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`stat-icon w-11 h-11 ${feat.bg} ${feat.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-muted">
                      {feat.index} / {isBn ? feat.tagBn : feat.tagEn}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-ink group-hover:text-blue-600 transition-colors">
                    {isBn ? feat.titleBn : feat.titleEn}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed">
                    {isBn ? feat.descBn : feat.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>{tr('Explore Feature', 'বিস্তারিত দেখুন')}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works (OpenGovtBD 4-step process) */}
      <section id="how_it_works" className="py-14 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="section-eyebrow">
            <span className="n">02 /</span>
            <span>{tr('Transparent Process', 'সহজ ধাপসমূহ')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            {tr('How ShasthoSetu BD works', 'স্বাস্থ্যসেতু বিডি কিভাবে কাজ করে')}
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            {tr('From chamber queue to lifelong digital care in four seamless steps.', 'সিরিয়াল বুকিং থেকে শুরু করে আজীবন ডিজিটাল সেবা মাত্র ৪ ধাপে।')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step) => (
            <div key={step.num} className="card card-pad relative space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-black text-sm flex items-center justify-center shadow-2xs">
                {num(step.num)}
              </div>
              <h4 className="font-bold text-sm text-ink pt-1">
                {isBn ? step.titleBn : step.titleEn}
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                {isBn ? step.descBn : step.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Announcements & Advisories (OpenGovtBD announcements band) */}
      <section id="announcements" className="py-14 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
        <div className="space-y-1">
          <span className="section-eyebrow">
            <span className="n">03 /</span>
            <span>{tr('Health Advisories', 'স্বাস্থ্য বুলেটিন')}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            {tr('Latest Clinical & Emergency Announcements', 'সাম্প্রতিক স্বাস্থ্য ও চিকিৎসা বার্তা')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {announcements.map((item, idx) => (
            <div key={idx} className="card card-pad space-y-2.5">
              <span className={`pill ${item.type === 'EMERGENCY' ? 'pill-error' : item.type === 'HOTLINE' ? 'pill-info' : 'pill-success'} text-[10px]`}>
                {item.type}
              </span>
              <h4 className="font-bold text-sm text-ink leading-snug">
                {isBn ? item.titleBn : item.titleEn}
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                {isBn ? item.descBn : item.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Band (OpenGovtBD CTA banner) */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="card card-pad bg-gradient-to-r from-blue-700 via-blue-800 to-slate-950 text-white text-center py-10 sm:py-14 space-y-4 rounded-3xl shadow-elevation-3">
          <h2 className="text-2xl sm:text-4xl font-black text-white max-w-2xl mx-auto leading-tight">
            {tr(
              'Join thousands of patients, doctors & students across Bangladesh',
              'বাংলাদেশের হাজারো রোগী, চিকিৎসক ও শিক্ষার্থীর সাথে যুক্ত হোন'
            )}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
            {tr(
              'Free, open, and built to transform healthcare delivery nationwide.',
              'সম্পূর্ণ উন্মুক্ত ও আধুনিক চিকিৎসাসেবায় দেশব্যাপী বিপ্লব ঘটাতে অঙ্গীকারবদ্ধ।'
            )}
          </p>

          <div className="pt-2">
            <button
              onClick={onStartNow}
              className="btn btn-primary bg-white text-blue-900 hover:bg-blue-50 py-3 px-8 text-sm font-bold shadow-md border-0"
            >
              <span>{tr('Get Started Free', 'বিনামূল্যে শুরু করুন')}</span>
              <ArrowRight className="w-4 h-4 text-blue-700" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer (OpenGovtBD clean footer style) */}
      <footer className="border-t border-border bg-surface py-12 px-4 sm:px-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <BrandLogo />
              <p className="text-xs text-muted max-w-xs leading-relaxed">
                {tr(
                  'A transparent, modern digital healthcare bridge connecting citizens, doctors, students, and healthcare facilities in Bangladesh.',
                  'বাংলাদেশের রোগী, চিকিৎসক, শিক্ষার্থী ও হাসপাতালসমূহের মধ্যে স্বচ্ছ ও আধুনিক ডিজিটাল স্বাস্থ্যসেবার সেতু।'
                )}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <h5 className="font-bold text-ink uppercase tracking-wider text-[11px] font-mono">
                {tr('For Patients', 'রোগীদের জন্য')}
              </h5>
              <div className="space-y-1.5 flex flex-col text-muted">
                <button onClick={onOpenLiveQueue} className="hover:text-blue-600 text-left">
                  {tr('Chamber Serial Tracker', 'লাইভ সিরিয়াল ট্র্যাকার')}
                </button>
                <button onClick={onOpenPrescriptions} className="hover:text-blue-600 text-left">
                  {tr('Digital e-Prescription Vault', 'ডিজিটাল প্রেসক্রিপশন')}
                </button>
                <button onClick={onOpenMedicines} className="hover:text-blue-600 text-left">
                  {tr('Medicine MRP & Generic Finder', 'ওষুধের দাম ও জেনেরিক')}
                </button>
                <button onClick={onOpenBloodBank} className="hover:text-blue-600 text-left">
                  {tr('Verified Blood Donors', 'রক্তদাতা নেটওয়ার্ক')}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h5 className="font-bold text-ink uppercase tracking-wider text-[11px] font-mono">
                {tr('For Doctors & Clinics', 'চিকিৎসক ও চেম্বার')}
              </h5>
              <div className="space-y-1.5 flex flex-col text-muted">
                <button
                  onClick={() => {
                    switchRole('doctor');
                    setActiveView('rx_builder');
                  }}
                  className="hover:text-blue-600 text-left"
                >
                  {tr('Rapid Rx Builder', 'দ্রুত প্রেসক্রিপশন বিল্ডার')}
                </button>
                <button
                  onClick={() => {
                    switchRole('admin');
                    setActiveView('tv_display');
                  }}
                  className="hover:text-blue-600 text-left"
                >
                  {tr('Waiting Room TV Mode', 'ওয়েটিং রুম টিভি ডিসপ্লে')}
                </button>
                <button onClick={onOpenBeds} className="hover:text-blue-600 text-left">
                  {tr('Bed & ICU Directory', 'বেড ও ICU তালিকা')}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h5 className="font-bold text-ink uppercase tracking-wider text-[11px] font-mono">
                {tr('Medical Students & Legal', 'শিক্ষার্থী ও লিগ্যাল')}
              </h5>
              <div className="space-y-1.5 flex flex-col text-muted">
                <button
                  onClick={() => {
                    switchRole('student');
                    setActiveView('student_hub');
                  }}
                  className="hover:text-blue-600 text-left"
                >
                  {tr('OSCE & Bedside Logbook', 'OSCE ও কেস লগবুক')}
                </button>
                <a
                  href="https://github.com/pbs002-s/medicalbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 text-left"
                >
                  {tr('Source Code on GitHub', 'সোর্স কোড (গিটহাব)')}
                </a>
                <span className="text-muted/60">
                  {tr('MIT License • Open Platform', 'এমআইটি লাইসেন্স • উন্মুক্ত')}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-2">
            <span>
              © 2026 {tr('ShasthoSetu BD (OpenHealthBD). Built for Bangladesh healthcare.', 'স্বাস্থ্যসেতু বিডি (ওপেনহেলথ বিডি) • জনস্বার্থে উন্মুক্ত।')}
            </span>
            <span className="font-mono text-[11px]">
              {tr('National Health Hotline: 16263 • Emergency: 999', 'স্বাস্থ্য বাতায়ন: ১৬২৬৩ • জাতীয় জরুরি সেবা: ৯৯৯')}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
