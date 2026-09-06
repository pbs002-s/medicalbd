import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import {
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Headphones,
  Zap,
  LogIn
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen, login, switchRole, demoAccounts } = useAuth();
  const { tr, isBn } = useLanguage();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(identifier || 'demo_user');
  };

  const handleQuickLogin = (role: UserRole) => {
    switchRole(role);
    setIsLoginModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="card card-pad bg-surface rounded-3xl max-w-md w-full shadow-elevation-3 border border-border overflow-hidden relative font-sans">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-muted hover:text-ink hover:bg-paper transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-2 sm:p-4 pb-2">
          <div className="flex justify-center mb-3">
            <BrandLogo size="md" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-extrabold text-ink flex items-center justify-center gap-1.5">
              <span>{tr('Welcome Back!', 'আবারো স্বাগতম!')}</span>
            </h2>
            <p className="text-xs text-muted">
              {tr('Sign in to access your digital healthcare records & portal.', 'আপনার অ্যাকাউন্ট লগইন করুন এবং স্বাস্থ্যসেবা সহজ করুন।')}
            </p>
          </div>

          {/* Quick Demo Role Logins */}
          <div className="mt-4 p-2.5 rounded-2xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40">
            <div className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider text-center mb-1.5">
              {tr('Quick Demo Sign-In (1-Click Role Switch)', 'দ্রুত ডেমো লগইন (১-ক্লিকে ভূমিকা পরীক্ষা করুন)')}
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('patient')}
                className="p-1.5 rounded-xl bg-surface hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-300 border border-border text-[10px] font-bold text-center shadow-2xs transition-all"
              >
                {tr('Patient', 'রোগী')}
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('doctor')}
                className="p-1.5 rounded-xl bg-surface hover:bg-emerald-600 hover:text-white text-emerald-700 dark:text-emerald-300 border border-border text-[10px] font-bold text-center shadow-2xs transition-all"
              >
                {tr('Doctor', 'ডাক্তার')}
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="p-1.5 rounded-xl bg-surface hover:bg-purple-600 hover:text-white text-purple-700 dark:text-purple-300 border border-border text-[10px] font-bold text-center shadow-2xs transition-all"
              >
                {tr('Student', 'শিক্ষার্থী')}
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-1.5 rounded-xl bg-surface hover:bg-amber-600 hover:text-white text-amber-700 dark:text-amber-300 border border-border text-[10px] font-bold text-center shadow-2xs transition-all"
              >
                {tr('Admin', 'অ্যাডমিন')}
              </button>
            </div>
          </div>

          {/* Demo accounts */}
          <div className="mt-3 p-3 rounded-2xl bg-paper border border-border">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">
              {tr('Preconfigured Demo Logins:', 'ডেমো অ্যাকাউন্ট (এক ক্লিকে)')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {demoAccounts.map((account) => (
                <button
                  key={account}
                  type="button"
                  onClick={() => {
                    setIdentifier(account);
                    login(account);
                  }}
                  className="px-2 py-1 bg-surface rounded-lg text-ink border border-border hover:border-blue-500 font-mono text-[10px] transition-colors"
                >
                  {account}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {tr('Email or Mobile Number', 'ইমেইল বা ফোন নম্বর')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={tr('e.g., 01712345678 or user@example.com', 'উদাহরণ: 01712345678 বা email@example.com')}
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-paper border border-border text-xs focus:bg-surface focus:border-blue-500 outline-hidden transition-all text-ink"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                {tr('Password', 'পাসওয়ার্ড')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tr('Enter your secure password', 'আপনার পাসওয়ার্ড দিন')}
                  className="w-full pl-10 pr-10 py-2 rounded-xl bg-paper border border-border text-xs focus:bg-surface focus:border-blue-500 outline-hidden transition-all text-ink"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted hover:text-ink"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-muted cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                <span>{tr('Remember me', 'আমাকে মনে রাখুন')}</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline font-semibold">
                {tr('Forgot password?', 'পাসওয়ার্ড ভুলেছেন?')}
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-2.5 text-xs font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{tr('Sign In', 'লগইন করুন')}</span>
            </button>

            <p className="text-center text-xs text-muted pt-2">
              {tr("Don't have an account?", 'অ্যাকাউন্ট নেই?')}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLoginModalOpen(false);
                  setIsRegisterModalOpen(true);
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                {tr('Create an Account', 'নতুন অ্যাকাউন্ট তৈরি করুন')}
              </button>
            </p>
          </form>
        </div>

        {/* Modal Bottom Trust Badges */}
        <div className="bg-paper p-3 border-t border-border grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center justify-center text-[10px]">
            <ShieldCheck className="w-4 h-4 text-blue-600 mb-0.5" />
            <span className="font-bold text-ink">{tr('100% Encrypted', 'নিরাপদ ও বিশ্বস্ত')}</span>
            <span className="text-[9px] text-muted">{tr('BMDC Compliant', 'তথ্য সুরক্ষিত')}</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[10px] border-x border-border">
            <Headphones className="w-4 h-4 text-emerald-600 mb-0.5" />
            <span className="font-bold text-ink">{tr('24/7 Hotline', '২৪/৭ সাপোর্ট')}</span>
            <span className="text-[9px] text-muted">16263 Toll-Free</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[10px]">
            <Zap className="w-4 h-4 text-amber-600 mb-0.5" />
            <span className="font-bold text-ink">{tr('Instant Access', 'সহজ ও দ্রুত')}</span>
            <span className="text-[9px] text-muted">{tr('No Wait Time', 'ক্লিকসেই সমাধান')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
