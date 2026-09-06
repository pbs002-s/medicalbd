import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import {
  X,
  UserCheck,
  Stethoscope,
  GraduationCap,
  Shield,
  CheckCircle2,
  Lock,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Layers,
  FileCheck2
} from 'lucide-react';

export const RegisterModal: React.FC = () => {
  const { isRegisterModalOpen, setIsRegisterModalOpen, setIsLoginModalOpen, register } = useAuth();
  const { tr, isBn } = useLanguage();

  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  if (!isRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert(tr('Please accept the Terms of Service to continue.', 'দয়া করে শর্তাবলী মেনে চলুন'));
      return;
    }
    register({
      name: nameEn || nameBn || 'Registered User',
      nameBn: nameBn || nameEn || 'নিবন্ধিত ব্যবহারকারী',
      phone: phone || '01711223344',
      email: email || 'user@example.com',
      role: selectedRole
    });
  };

  const roles = [
    { id: 'patient', labelBn: 'রোগী', labelEn: 'Patient', icon: UserCheck },
    { id: 'doctor', labelBn: 'চিকিৎসক', labelEn: 'Doctor', icon: Stethoscope },
    { id: 'student', labelBn: 'শিক্ষার্থী', labelEn: 'Student', icon: GraduationCap },
    { id: 'admin', labelBn: 'অ্যাডমিন', labelEn: 'Admin', icon: Shield }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="card card-pad bg-surface rounded-3xl max-w-lg w-full shadow-elevation-3 border border-border overflow-hidden relative my-6 font-sans">
        {/* Close Button */}
        <button
          onClick={() => setIsRegisterModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-muted hover:text-ink hover:bg-paper transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-2 sm:p-4 pb-2">
          <div className="flex justify-center mb-3">
            <BrandLogo size="md" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-ink">
              {tr('Create Your Account', 'নতুন অ্যাকাউন্ট তৈরি করুন')}
            </h2>
            <p className="text-xs text-muted">
              {tr('Join Bangladesh’s open digital healthcare network.', 'আপনার তথ্য দিন এবং স্বাস্থ্যসেবার সাথে যুক্ত হন।')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                {tr('Select Your Role:', 'আমি হিসেবে যোগ দিতে চাই:')}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id as UserRole)}
                      className={`p-3 rounded-2xl border text-center transition-all relative flex flex-col items-center justify-center ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-900/25 text-blue-700 dark:text-blue-300 shadow-2xs'
                          : 'border-border bg-paper text-muted hover:text-ink'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                      <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-blue-600' : 'text-muted'}`} />
                      <span className="text-xs font-bold block leading-tight">
                        {isBn ? r.labelBn : r.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {tr('Full Name (Bangla)', 'নাম (বাংলা)')}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    value={nameBn}
                    onChange={(e) => setNameBn(e.target.value)}
                    placeholder={tr('e.g., সালমান আহমেদ', 'আপনার নাম (বাংলায়)')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:bg-surface focus:border-blue-500 outline-hidden transition-all text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {tr('Full Name (English)', 'নাম (English)')}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder={tr('e.g., Salman Ahmed', 'Your name in English')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:bg-surface focus:border-blue-500 outline-hidden transition-all text-ink"
                  />
                </div>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {tr('Mobile Phone', 'ফোন নম্বর')}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs font-mono focus:bg-surface focus:border-blue-500 outline-hidden transition-all text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {tr('Email (Optional)', 'ইমেইল (ঐচ্ছিক)')}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:bg-surface focus:border-blue-500 outline-hidden transition-all text-ink"
                  />
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {tr('Password', 'পাসওয়ার্ড')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={tr('Minimum 8 characters', 'কমপক্ষে ৮টি অক্ষর দিন')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:bg-surface focus:border-blue-500 outline-hidden transition-all text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  {tr('Confirm Password', 'পাসওয়ার্ড নিশ্চিত করুন')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-muted absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={tr('Re-enter password', 'পাসওয়ার্ড পুনরায় দিন')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:bg-surface focus:border-blue-500 outline-hidden transition-all text-ink"
                  />
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 text-xs text-muted cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>
                {tr(
                  'I agree to the Terms of Service & Privacy Policy of ShasthoSetu BD.',
                  'আমি শর্তাবলী ও গোপনীয়তা নীতি পড়েছি এবং সম্মত হচ্ছি।'
                )}
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full py-2.5 text-xs font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{tr('Complete Registration', 'অ্যাকাউন্ট তৈরি করুন')}</span>
            </button>

            <p className="text-center text-xs text-muted pt-1">
              {tr('Already have an account?', 'ইতোমধ্যে অ্যাকাউন্ট আছে?')}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegisterModalOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                {tr('Sign In', 'লগইন করুন')}
              </button>
            </p>
          </form>
        </div>

        {/* Bottom Badges */}
        <div className="bg-paper p-3 border-t border-border grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center justify-center text-[10px]">
            <FileCheck2 className="w-4 h-4 text-emerald-600 mb-0.5" />
            <span className="font-bold text-ink">{tr('Fast Verification', 'সহজ রেজিস্ট্রেশন')}</span>
            <span className="text-[9px] text-muted">{tr('Instant Access', 'মাত্র ১ মিনিটে')}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[10px] border-x border-border">
            <ShieldCheck className="w-4 h-4 text-blue-600 mb-0.5" />
            <span className="font-bold text-ink">{tr('Data Protected', 'আপনার তথ্য সুরক্ষিত')}</span>
            <span className="text-[9px] text-muted">{tr('Encrypted Vault', 'গোপনীয়তা রক্ষা')}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[10px]">
            <Layers className="w-4 h-4 text-teal-600 mb-0.5" />
            <span className="font-bold text-ink">{tr('All-in-One Care', 'সব সেবায় এক প্ল্যাটফর্ম')}</span>
            <span className="text-[9px] text-muted">{tr('Unified Records', 'সবকিছু এক জায়গায়')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
