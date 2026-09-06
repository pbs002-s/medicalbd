import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useQueue } from '../../context/QueueContext';
import { mockHospitalBeds } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
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
  const { tr, num, isBn } = useLanguage();
  const { totalTokens, currentSerial } = useQueue();

  const [beds, setBeds] = useState(mockHospitalBeds);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Admin Header Banner (OpenGovtBD style) */}
      <ScrollReveal animation="fade-down" duration={450}>
        <div className="card card-pad bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white shadow-elevation-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-400">
                <Shield className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {tr('Hospital & Chamber Admin Panel', 'হাসপাতাল ও চেম্বার অ্যাডমিন প্যানেল')}
              </h1>
            </div>
            <p className="text-xs text-slate-300">
              {tr(
                'Dhaka Medical & LabAid Branches • Real-Time Bed Control & Doctor Roster',
                'ঢাকা মেডিকেল ও ল্যাবএইড ব্রাঞ্চ • বেড রিয়েল-টাইম কন্ট্রোল ও ডক্টর রোস্টার'
              )}
            </p>
          </div>

          <button
            onClick={onOpenTVDisplay}
            className="btn btn-primary bg-blue-600 hover:bg-blue-500 text-white"
          >
            <Tv className="w-4 h-4" />
            <span>{tr('Launch Waiting Room TV Mode', 'ওয়েটিং রুম টিভি ডিসপ্লে ওপেন করুন')}</span>
          </button>
        </div>
      </ScrollReveal>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr("Today's Appointments", 'আজকের মোট অ্যাপয়েন্টমেন্ট')}
            </span>
            <span className="text-2xl font-black text-ink my-0.5 block">
              {num(totalTokens)}
            </span>
            <span className="pill pill-info text-[10px] py-0.5">
              {tr('All Chambers', 'সকল চেম্বার মিলিয়ে')}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('On-Duty Consultants', 'অন-ডিউটি কনসালট্যান্ট')}
            </span>
            <span className="text-2xl font-black text-blue-600 my-0.5 block">
              {num(8)}
            </span>
            <span className="pill pill-success text-[10px] py-0.5">
              {tr('Active in Chambers', 'চেম্বারে উপস্থিত')}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('Available ICU Beds', 'মোট খালি ICU বেড')}
            </span>
            <span className="text-2xl font-black text-red-600 my-0.5 block">
              {num(7)}
            </span>
            <span className="pill pill-error text-[10px] py-0.5">
              {tr('Live Broadcast', 'লাইভ সিঙ্ক চালু')}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={200}>
          <div className="card card-pad-sm">
            <span className="text-[11px] text-muted font-medium block">
              {tr('Avg. Wait Duration', 'গড় অপেক্ষার সময়')}
            </span>
            <span className="text-2xl font-black text-emerald-600 my-0.5 block">
              {num(18)} {tr('mins', 'মিনিট')}
            </span>
            <span className="text-[10px] text-muted">
              {tr('Queue Optimized', 'সিরিয়াল অপটিমাইজড')}
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* Bed & Chamber Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 card card-pad space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="section-eyebrow">
                <span className="n">01 /</span>
                <span>{tr('Facility Inventory', 'হাসপাতাল')}</span>
              </span>
              <h3 className="font-bold text-ink text-sm sm:text-base">
                {tr('Hospital Bed & ICU Real-time Inventory', 'বেড ও ICU ইনভেন্টরি ম্যানেজমেন্ট')}
              </h3>
            </div>

            <span className="pill pill-success text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{tr('Live Sync Active', 'রিয়েল-টাইম সিঙ্ক সক্রিয়')}</span>
            </span>
          </div>

          <div className="space-y-3">
            {beds.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-paper border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-300 transition-all"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-ink">
                    {isBn ? b.hospitalNameBn : b.hospitalName}
                  </h4>
                  <p className="text-[11px] text-muted">{b.address}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center px-3 py-1 bg-surface border border-border rounded-xl">
                    <span className="text-[10px] text-muted block font-medium">
                      {tr('General Beds', 'জেনারেল বেড')}
                    </span>
                    <span className="text-xs font-black text-ink">
                      {num(b.generalBeds.available)} {tr('vacant', 'খালি')}
                    </span>
                  </div>

                  <div className="text-center px-3 py-1 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl">
                    <span className="text-[10px] text-red-700 dark:text-red-300 block font-bold">
                      {tr('ICU / CCU', 'আইসিইউ')}
                    </span>
                    <span className="text-xs font-black text-red-600">
                      {num(b.icuBeds.available)} {tr('vacant', 'খালি')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="card card-pad space-y-3">
            <span className="section-eyebrow">
              <span className="n">02 /</span>
              <span>{tr('Public Screen', 'ডিসপ্লে')}</span>
            </span>
            <h3 className="font-bold text-ink text-sm">
              {tr('Waiting Room Display TV', 'ওয়েটিং রুম ডিসপ্লে')}
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              {tr(
                'Broadcast live tokens with visual pulse animation and Bengali voice chime for waiting areas.',
                'ওয়েটিং রুমের বড় পর্দায় মাল্টি-চেম্বার লাইভ টোকেন ও বাংলা ভয়েস চিম সহ ফুলস্ক্রিন ব্রডকাস্ট।'
              )}
            </p>

            <button
              onClick={onOpenTVDisplay}
              className="btn btn-primary w-full"
            >
              <Tv className="w-4 h-4" />
              <span>{tr('Launch TV Mode', 'টিভি মোড চালু করুন')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
