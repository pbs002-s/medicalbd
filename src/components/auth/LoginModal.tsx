import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  UserCheck,
  Stethoscope,
  GraduationCap,
  Shield,
  ShieldCheck,
  Headphones,
  Zap,
  LogIn
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen, login, switchRole } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'email_phone' | 'phone_otp'>('email_phone');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(identifier || 'demo_user', 'patient');
  };

  const handleQuickLogin = (role: UserRole) => {
    switchRole(role);
    setIsLoginModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header matching Image 2 */}
        <div className="p-6 sm:p-7 pb-4">
          <div className="flex justify-center mb-4">
            <BrandLogo size="md" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-bangla flex items-center justify-center gap-1.5">
              <span>আবারো স্বাগতম!</span>
              <span></span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bangla">
              আপনার অ্যাকাউন্ট লগইন করুন এবং স্বাস্থ্যসেবা সহজ করুন।
            </p>
          </div>

          {/* Quick Demo Role Logins */}
          <div className="mt-4 p-2.5 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider text-center font-bangla mb-1.5">
               দ্রুত ডেমো লগইন (১-ক্লিকে ভূমিকা পরীক্ষা করুন)
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('patient')}
                className="p-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 text-[10px] font-bold font-bangla text-center shadow-2xs transition-all"
              >
                 রোগী
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('doctor')}
                className="p-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 text-[10px] font-bold font-bangla text-center shadow-2xs transition-all"
              >
                 ডাক্তার
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="p-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-purple-600 hover:text-white text-purple-700 border border-purple-200 text-[10px] font-bold font-bangla text-center shadow-2xs transition-all"
              >
                 শিক্ষার্থী
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-amber-600 hover:text-white text-amber-700 border border-amber-200 text-[10px] font-bold font-bangla text-center shadow-2xs transition-all"
              >
                 অ্যাডমিন
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 font-bangla mb-1">
                ইমেইল বা ফোন নম্বর
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="উদাহরণ: 01712345678 বা email@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs font-bangla focus:bg-white dark:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 font-bangla mb-1">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs font-bangla focus:bg-white dark:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bangla">
              <label className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                <span>আমাকে মনে রাখুন</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline font-semibold">
                পাসওয়ার্ড ভুলেছেন?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-bangla shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>লগইন করুন</span>
            </button>

            <div className="relative py-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <span className="relative px-3 bg-white dark:bg-slate-900 text-[11px] text-slate-400 dark:text-slate-500 font-bangla">
                অথবা
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => login('google_user')}
                className="py-2 px-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl text-xs font-semibold font-bangla text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Google দিয়ে লগইন</span>
              </button>
              <button
                type="button"
                onClick={() => login('fb_user')}
                className="py-2 px-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl text-xs font-semibold font-bangla text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Facebook দিয়ে লগইন</span>
              </button>
            </div>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 font-bangla pt-2">
              অ্যাকাউন্ট নেই?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLoginModalOpen(false);
                  setIsRegisterModalOpen(true);
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                নতুন অ্যাকাউন্ট তৈরি করুন
              </button>
            </p>
          </form>
        </div>

        {/* Modal Bottom Trust Badges matching Image 2 */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center font-bangla">
          <div className="flex flex-col items-center justify-center text-[10px]">
            <ShieldCheck className="w-4 h-4 text-blue-600 mb-0.5" />
            <span className="font-bold text-slate-700 dark:text-slate-300">নিরাপদ ও বিশ্বস্ত</span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500">তথ্য ১০০% সুরক্ষিত</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[10px] border-x border-slate-200 dark:border-slate-800">
            <Headphones className="w-4 h-4 text-emerald-600 mb-0.5" />
            <span className="font-bold text-slate-700 dark:text-slate-300">২৪/৭ সাপোর্ট</span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500">আমরা সবসময় আছি</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[10px]">
            <Zap className="w-4 h-4 text-amber-600 mb-0.5" />
            <span className="font-bold text-slate-700 dark:text-slate-300">সহজ ও দ্রুত</span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500">ক্লিকসেই সমাধান</span>
          </div>
        </div>
      </div>
    </div>
  );
};
