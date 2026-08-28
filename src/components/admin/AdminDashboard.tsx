import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useQueue } from '../../context/QueueContext';
import { mockHospitalBeds } from '../../mockData';
import {
  Shield,
  BedDouble,
  Tv,
  Users,
  Activity,
  Plus,
  CheckCircle2,
  TrendingUp,
  Building2,
  PhoneCall
} from 'lucide-react';

interface AdminDashboardProps {
  onOpenTVDisplay: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onOpenTVDisplay }) => {
  const { toBn } = useLanguage();
  const { totalTokens, currentSerial } = useQueue();

  const [beds, setBeds] = useState(mockHospitalBeds);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* Admin Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold">হাসপাতাল ও চেম্বার অ্যাডমিন প্যানেল</h1>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            ঢাকা মেডিকেল ও ল্যাবএইড ব্রাঞ্চ • বেড রিয়েল-টাইম কন্ট্রোল ও ডক্টর রোস্টার
          </p>
        </div>

        <button
          onClick={onOpenTVDisplay}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
        >
          <Tv className="w-4 h-4" />
          <span>ওয়েটিং রুম টিভি ডিসপ্লে ওপেন করুন</span>
        </button>
      </div>

      {/* 4 Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">আজকের মোট অ্যাপয়েন্টমেন্ট</span>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-50 my-0.5 block">{toBn(totalTokens)} টি</span>
          <span className="text-[10px] text-emerald-600 font-bold">সকল চেম্বার মিলিয়ে</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">অন-ডিউটি কনসালট্যান্ট</span>
          <span className="text-2xl font-black text-blue-600 my-0.5 block">{toBn(8)} জন</span>
          <span className="text-[10px] text-blue-600 font-bold">চেম্বারে উপস্থিত</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">মোট খালি ICU বেড</span>
          <span className="text-2xl font-black text-red-600 my-0.5 block">{toBn(7)} টি</span>
          <span className="text-[10px] text-red-700 font-bold">লাইভ সিঙ্ক চালু</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xs">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">গড় অপেক্ষার সময়</span>
          <span className="text-2xl font-black text-emerald-600 my-0.5 block">{toBn(18)} মিনিট</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">সিরিয়াল অপটিমাইজড</span>
        </div>
      </div>

      {/* Bed & Chamber Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm sm:text-base">
              বেড ও ICU ইনভেন্টরি ম্যানেজমেন্ট
            </h3>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>রিয়েল-টাইম ব্রডকাস্ট সক্রিয়</span>
            </span>
          </div>

          <div className="space-y-3">
            {beds.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-50">{b.hospitalNameBn}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{b.address}</p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">সাধারণ বেড</span>
                    <strong className="text-slate-800 dark:text-slate-100">{toBn(b.generalBeds.available)} খালি</strong>
                  </div>
                  <div className="text-center border-l pl-3 border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-red-600 font-bold block">ICU</span>
                    <strong className="text-red-600">{toBn(b.icuBeds.available)} খালি</strong>
                  </div>
                  <div className="text-center border-l pl-3 border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-blue-600 font-bold block">CCU</span>
                    <strong className="text-blue-600">{toBn(b.ccuBeds.available)} খালি</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Roster & BMDC Verification Panel */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm">ডাক্তার রোস্টার ও BMDC যাচাইকরণ</h3>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <strong className="text-emerald-900">ডা. তানভীর হাসান</strong>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-200 text-emerald-900 rounded">
                BMDC ভেরিফাইড 
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">মেডিসিন বিশেষজ্ঞ • রুম ৩০৪</p>
          </div>

          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <strong className="text-blue-900">ডা. সায়রা আফরিন</strong>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-200 text-blue-900 rounded">
                BMDC ভেরিফাইড 
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">কার্ডিওলজি স্পেশালিস্ট • রুম ২০২</p>
          </div>
        </div>
      </div>
    </div>
  );
};
