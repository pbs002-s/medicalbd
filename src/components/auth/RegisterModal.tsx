import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
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
      alert('দয়া করে শর্তাবলী মেনে চলুন');
      return;
    }
    register({
      name: nameEn || 'Registered User',
      nameBn: nameBn || 'নিবন্ধিত ব্যবহারকারী',
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
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative my-6">
        {/* Close Button */}
        <button
          onClick={() => setIsRegisterModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-7 pb-4">
          <div className="flex justify-center mb-3">
            <BrandLogo size="md" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 font-bangla">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </h2>
            <p className="text-xs text-slate-500 font-bangla">
              আপনার তথ্য দিন এবং স্বাস্থ্যসেবার সাথে যুক্ত হন।
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Role Selection 4-Cards matching Image 2 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-bangla mb-2">
                আমি হিসেবে যোগ দিতে চাই:
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
                          ? 'border-blue-600 bg-blue-50/70 text-blue-700 shadow-2xs'
                          : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                      )}
                      <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                      <span className="text-xs font-bold font-bangla block leading-tight">{r.labelBn}</span>
                      <span className="text-[9px] text-slate-400">{r.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dual Name Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  নাম (বাংলা)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={nameBn}
                    onChange={(e) => setNameBn(e.target.value)}
                    placeholder="আপনার নাম (বাংলায়)"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bangla focus:bg-white focus:border-emerald-500 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  নাম (English)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="Your name in English"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-emerald-500 outline-hidden transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  ফোন নম্বর
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:bg-white focus:border-emerald-500 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  ইমেইল (ঐচ্ছিক)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-emerald-500 outline-hidden transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="কমপক্ষে ৮টি অক্ষর দিন"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-emerald-500 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 font-bangla mb-1">
                  পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড পুনরায় দিন"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-emerald-500 outline-hidden transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 text-xs text-slate-600 font-bangla cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>
                আমি <a href="#" className="text-emerald-600 font-semibold underline">শর্তাবলী</a> ও <a href="#" className="text-emerald-600 font-semibold underline">গোপনীয়তা নীতি</a> পড়েছি এবং সম্মত হচ্ছি
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-bangla shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>অ্যাকাউন্ট তৈরি করুন</span>
            </button>

            <p className="text-center text-xs text-slate-500 font-bangla pt-1">
              ইতোমধ্যে অ্যাকাউন্ট আছে?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegisterModalOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="text-emerald-600 font-bold hover:underline"
              >
                লগইন করুন
              </button>
            </p>
          </form>
        </div>

        {/* Bottom Badges matching Image 2 */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center font-bangla">
          <div className="flex flex-col items-center justify-center text-[10px]">
            <FileCheck2 className="w-4 h-4 text-emerald-600 mb-0.5" />
            <span className="font-bold text-slate-700">সহজ রেজিস্ট্রেশন</span>
            <span className="text-[9px] text-slate-400">মাত্র ১ মিনিটে শুরু করুন</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[10px] border-x border-slate-200">
            <ShieldCheck className="w-4 h-4 text-blue-600 mb-0.5" />
            <span className="font-bold text-slate-700">আপনার তথ্য সুরক্ষিত</span>
            <span className="text-[9px] text-slate-400">গোপনীয়তা রক্ষা করি</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[10px]">
            <Layers className="w-4 h-4 text-teal-600 mb-0.5" />
            <span className="font-bold text-slate-700">সব সেবায় এক প্ল্যাটফর্ম</span>
            <span className="text-[9px] text-slate-400">সবকিছু এক জায়গায়</span>
          </div>
        </div>
      </div>
    </div>
  );
};
