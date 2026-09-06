import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Settings,
  ArrowLeft,
  ChevronRight,
  User,
  Globe,
  Bell,
  Save,
  CheckCircle2,
  Moon,
  Sun,
  Smartphone
} from 'lucide-react';

interface SettingsPageProps {
  onBack?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { currentUser, setActiveView } = useAuth();
  const { language, setLanguage, tr, isBn } = useLanguage();
  const { theme, setTheme, mood, setMood, moods } = useTheme();

  const [name, setName] = useState(isBn ? (currentUser?.nameBn || 'সালমান আহমেদ') : (currentUser?.name || 'Salman Ahmed'));
  const [phone, setPhone] = useState(currentUser?.phone || '01712345678');
  const [email, setEmail] = useState(currentUser?.email || 'salman@example.com');
  const [bloodGroup, setBloodGroup] = useState(currentUser?.bloodGroup || 'B+');
  const [emergencyPhone, setEmergencyPhone] = useState('01899887766');

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 font-sans">
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
                <span className="text-blue-600 font-semibold">{tr('Account Settings & Profile', 'অ্যাকাউন্ট সেটিংস ও প্রোফাইল')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5">
                {tr('User Profile & Preferences', 'ব্যবহারকারী প্রোফাইল ও সেটিংস')}
              </h1>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn btn-primary px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{tr('Save Changes', 'পরিবর্তন সংরক্ষণ করুন')}</span>
          </button>
        </div>
      </ScrollReveal>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center gap-3 animate-slide-down">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold">
            {tr('Your profile and preferences have been successfully updated!', 'আপনার তথ্য সফলভাবে আপডেট হয়েছে!')}
          </span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Section 1: Profile Information */}
        <ScrollReveal animation="fade-up" duration={450}>
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 space-y-4">
            <h3 className="font-bold text-ink text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>{tr('Personal Information', 'ব্যক্তিগত তথ্য')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-ink mb-1">
                  {tr('Full Name:', 'পূর্ণ নাম:')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs text-ink"
                />
              </div>

              <div>
                <label className="block font-bold text-ink mb-1">
                  {tr('Mobile Phone Number:', 'মোবাইল নম্বর:')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs font-mono text-ink"
                />
              </div>

              <div>
                <label className="block font-bold text-ink mb-1">
                  {tr('Email Address:', 'ইমেইল ঠিকানা:')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs text-ink"
                />
              </div>

              <div>
                <label className="block font-bold text-ink mb-1">
                  {tr('Blood Group:', 'রক্তের গ্রুপ:')}
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs font-bold text-ink"
                >
                  <option value="A+">A+ {tr('(Positive)', '(পজিটিভ)')}</option>
                  <option value="A-">A- {tr('(Negative)', '(নেগেটিভ)')}</option>
                  <option value="B+">B+ {tr('(Positive)', '(পজিটিভ)')}</option>
                  <option value="B-">B- {tr('(Negative)', '(নেগেটিভ)')}</option>
                  <option value="O+">O+ {tr('(Positive)', '(পজিটিভ)')}</option>
                  <option value="O-">O- {tr('(Negative)', '(নেগেটিভ)')}</option>
                  <option value="AB+">AB+ {tr('(Positive)', '(পজিটিভ)')}</option>
                  <option value="AB-">AB- {tr('(Negative)', '(নেগেটিভ)')}</option>
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 2: Language, Theme & Colour Mood */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 space-y-4">
            <h3 className="font-bold text-ink text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{tr('Language, Theme & Accent Mood', 'ভাষা, থিম ও রঙের মুড')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-bold text-ink mb-2">
                  {tr('Interface Language:', 'পছন্দের ভাষা:')}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('bn')}
                    className={`flex-1 py-2.5 rounded-xl border font-bold transition-all ${
                      language === 'bn'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-paper text-muted border-border hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    বাংলা (Bangla)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`flex-1 py-2.5 rounded-xl border font-bold transition-all ${
                      language === 'en'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-paper text-muted border-border hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    English (ইংরেজি)
                  </button>
                </div>
              </div>

              <div>
                <span className="block font-bold text-ink mb-2">
                  {tr('Display Theme Mode:', 'প্রদর্শন মোড:')}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'light' as const, labelBn: 'দিন', labelEn: 'Light', icon: Sun },
                    { id: 'dark' as const, labelBn: 'রাত', labelEn: 'Dark', icon: Moon },
                    { id: 'system' as const, labelBn: 'সিস্টেম', labelEn: 'System', icon: Smartphone },
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setTheme(option.id)}
                        aria-pressed={theme === option.id}
                        className={`py-2.5 rounded-xl border font-bold flex flex-col items-center gap-1 transition-all ${
                          theme === option.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-paper text-muted border-border hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{isBn ? option.labelBn : option.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="sm:col-span-2">
                <span className="block font-bold text-ink mb-2">
                  {tr('Accent Colour Mood (Repaints all buttons, cards & highlights instantly):', 'রঙের মুড (Colour mood) — পুরো অ্যাপের অ্যাকসেন্ট রঙ বদলে যাবে:')}
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {moods.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setMood(option.id)}
                      aria-pressed={mood === option.id}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                        mood === option.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/25 shadow-2xs'
                          : 'border-border bg-paper hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex shrink-0" aria-hidden="true">
                        <span className="w-4 h-4 rounded-full ring-1 ring-black/10" style={{ background: option.swatch[0] }} />
                        <span className="w-4 h-4 rounded-full -ml-2 ring-1 ring-black/10" style={{ background: option.swatch[1] }} />
                      </span>
                      <span className="font-bold text-ink text-left leading-tight">
                        {isBn ? option.labelBn : option.labelEn}
                      </span>
                      {mood === option.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 ml-auto shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-ink mb-1">
                  {tr('Emergency SOS Contact Number:', 'জরুরি যোগাযোগ নম্বর (SOS Contact):')}
                </label>
                <input
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border text-xs font-mono text-ink"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 3: Notification & Security */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 space-y-4">
            <h3 className="font-bold text-ink text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-600" />
              <span>{tr('Notifications & Security Preferences', 'বিজ্ঞপ্তি ও নিরাপত্তা সেটিংস')}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-paper rounded-2xl border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-ink">
                    {tr('Chamber Queue & Prescription SMS Alerts', 'সিরিয়াল ও প্রেসক্রিপশন এসএমএস অ্যালার্ট')}
                  </h4>
                  <p className="text-[11px] text-muted">
                    {tr('Receive automated SMS when your serial number approaches', 'আপনার সিরিয়াল নিকটবর্তী হলে স্বয়ংক্রিয় এসএমএস পাঠানো হবে')}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </div>

              <div className="p-3.5 bg-paper rounded-2xl border border-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-ink">
                    {tr('Biometric & Quick Authenticated Login', 'বায়োমেট্রিক ও ফাস্ট লগইন')}
                  </h4>
                  <p className="text-[11px] text-muted">
                    {tr('Enable fingerprint or facial unlock support for rapid sign-in', 'পরবর্তী লগইনে ফিঙ্গারপ্রিন্ট বা ফেস আইডি সমর্থন সক্রিয় করুন')}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={biometricEnabled}
                  onChange={(e) => setBiometricEnabled(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default SettingsPage;
