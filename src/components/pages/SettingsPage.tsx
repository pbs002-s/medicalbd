import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Settings,
  ArrowLeft,
  ChevronRight,
  User,
  Globe,
  Bell,
  Shield,
  PhoneCall,
  Save,
  CheckCircle2,
  Lock,
  Moon,
  Smartphone
} from 'lucide-react';

interface SettingsPageProps {
  onBack?: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { currentUser, setActiveView } = useAuth();
  const { language, setLanguage } = useLanguage();

  const [nameBn, setNameBn] = useState(currentUser?.nameBn || 'সালমান আহমেদ');
  const [phone, setPhone] = useState(currentUser?.phone || '01712345678');
  const [email, setEmail] = useState(currentUser?.email || 'salman@example.com');
  const [bloodGroup, setBloodGroup] = useState(currentUser?.bloodGroup || 'B+');
  const [emergencyPhone, setEmergencyPhone] = useState('01899887766');

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 font-bangla">
      {/* Header & Breadcrumb */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack ? onBack() : setActiveView('dashboard')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors btn-press"
              title="ড্যাশবোর্ডে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  ড্যাশবোর্ড
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-blue-600 font-semibold">অ্যাকাউন্ট সেটিংস ও প্রোফাইল</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                ব্যবহারকারী প্রোফাইল ও সেটিংস
              </h1>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-blue-500/25 transition-all btn-press"
          >
            <Save className="w-4 h-4" />
            <span>পরিবর্তন সংরক্ষণ করুন</span>
          </button>
        </div>
      </ScrollReveal>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-slide-down">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold">🎉 আপনার তথ্য সফলভাবে আপডেট হয়েছে!</span>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Section 1: Profile Information */}
        <ScrollReveal animation="fade-up" duration={450}>
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>ব্যক্তিগত তথ্য (Personal Information)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">পূর্ণ নাম (বাংলায়):</label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">মোবাইল নম্বর:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ইমেইল ঠিকানা:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">রক্তের গ্রুপ:</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800"
                >
                  <option value="A+">A+ (পজিটিভ)</option>
                  <option value="A-">A- (নেগেটিভ)</option>
                  <option value="B+">B+ (পজিটিভ)</option>
                  <option value="B-">B- (নেগেটিভ)</option>
                  <option value="O+">O+ (পজিটিভ)</option>
                  <option value="O-">O- (নেগেটিভ)</option>
                  <option value="AB+">AB+ (পজিটিভ)</option>
                  <option value="AB-">AB- (নেগেটিভ)</option>
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 2: Language & Emergency Contacts */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>অ্যাপের ভাষা ও জরুরি কন্টাক্ট (Language & Emergency)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-2">পছন্দের ভাষা (Language):</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('bn')}
                    className={`flex-1 py-2.5 rounded-xl border font-bold transition-all ${
                      language === 'bn'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
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
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    English (ইংরেজি)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">জরুরি যোগাযোগ নম্বর (SOS Contact):</label>
                <input
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 3: Notification & Security */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-600" />
              <span>বিজ্ঞপ্তি ও নিরাপত্তা সেটিংস</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">সিরিয়াল ও প্রেসক্রিপশন এসএমএস অ্যালার্ট</h4>
                  <p className="text-[11px] text-slate-500">আপনার সিরিয়াল নিকটবর্তী হলে স্বয়ংক্রিয় এসএমএস পাঠানো হবে</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">বায়োমেট্রিক ও ফাস্ট লগইন</h4>
                  <p className="text-[11px] text-slate-500">পরবর্তী লগইনে ফিঙ্গারপ্রিন্ট বা ফেস আইডি সমর্থন সক্রিয় করুন</p>
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
