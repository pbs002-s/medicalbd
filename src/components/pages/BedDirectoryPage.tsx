import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockHospitalBeds } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  BedDouble,
  ArrowLeft,
  ChevronRight,
  Search,
  MapPin,
  PhoneCall,
  Activity,
  AlertCircle,
  Clock,
  ShieldCheck,
  Building2,
  HeartPulse,
  Filter
} from 'lucide-react';

interface BedDirectoryPageProps {
  onBack?: () => void;
}

export const BedDirectoryPage: React.FC<BedDirectoryPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { toBn } = useLanguage();

  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [bedTypeFilter, setBedTypeFilter] = useState<'all' | 'icu' | 'ccu' | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = mockHospitalBeds.filter((h) => {
    const matchesDistrict = selectedDistrict === 'all' || h.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      h.hospitalNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBed =
      bedTypeFilter === 'all' ||
      (bedTypeFilter === 'icu' && h.icuBeds.available > 0) ||
      (bedTypeFilter === 'ccu' && h.ccuBeds.available > 0) ||
      (bedTypeFilter === 'general' && h.generalBeds.available > 0);

    return matchesDistrict && matchesSearch && matchesBed;
  });

  const totalIcuAvailable = mockHospitalBeds.reduce((acc, h) => acc + h.icuBeds.available, 0);
  const totalCcuAvailable = mockHospitalBeds.reduce((acc, h) => acc + h.ccuBeds.available, 0);
  const totalGeneralAvailable = mockHospitalBeds.reduce((acc, h) => acc + h.generalBeds.available, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* Header & Breadcrumb */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack ? onBack() : setActiveView('dashboard')}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors btn-press"
              title="ড্যাশবোর্ডে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  ড্যাশবোর্ড
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-cyan-600 font-semibold">হাসপাতাল বেড ও ICU ডিরেক্টরি</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5">
                লাইভ হাসপাতাল বেড ও ICU প্রাপ্যতা
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:16263"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all btn-press"
            >
              <PhoneCall className="w-4 h-4" />
              <span>জাতীয় স্বাস্থ্য বাতায়ন (১৬২৬৩)</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* 3 Live Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">মোট ফাঁকা ICU বেড</span>
              <span className="text-2xl font-black text-slate-900 dark:text-slate-50 leading-tight block">{toBn(totalIcuAvailable)} টি</span>
              <span className="text-[10px] text-red-600 font-bold">লাইভ মনিটরিং</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">মোট ফাঁকা CCU / HDU বেড</span>
              <span className="text-2xl font-black text-slate-900 dark:text-slate-50 leading-tight block">{toBn(totalCcuAvailable)} টি</span>
              <span className="text-[10px] text-cyan-700 font-bold">ক্রিটিক্যাল কেয়ার</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <BedDouble className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">সাধারণ ওয়ার্ড বেড ফাঁকা</span>
              <span className="text-2xl font-black text-slate-900 dark:text-slate-50 leading-tight block">{toBn(totalGeneralAvailable)} টি</span>
              <span className="text-[10px] text-emerald-600 font-bold">তাৎক্ষণিক ভর্তিযোগ্য</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="হাসপাতালের নাম বা এলাকা দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-cyan-500 font-bangla"
          />
        </div>

        {/* District & Bed Type Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {['all', 'Dhaka', 'Chittagong'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedDistrict === d ? 'bg-cyan-600 text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50'
                }`}
              >
                {d === 'all' ? 'সকল জেলা' : d === 'Dhaka' ? 'ঢাকা' : 'চট্টগ্রাম'}
              </button>
            ))}
          </div>

          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {[
              { id: 'all', label: 'সব বেড' },
              { id: 'icu', label: 'ICU ফাঁকা' },
              { id: 'ccu', label: 'CCU ফাঁকা' },
              { id: 'general', label: 'সাধারণ বেড' }
            ].map((bt) => (
              <button
                key={bt.id}
                onClick={() => setBedTypeFilter(bt.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  bedTypeFilter === bt.id ? 'bg-cyan-700 text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-slate-50'
                }`}
              >
                {bt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hospital Bed Directory Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHospitals.map((h, index) => (
          <ScrollReveal key={h.id} animation="fade-up" delay={index * 80}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-cyan-200 transition-all space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-50 text-base">{h.hospitalNameBn}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">{h.hospitalName}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>{h.address} ({h.districtBn})</span>
                  </p>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 shrink-0">
                  {h.districtBn}
                </span>
              </div>

              {/* 4 Bed Availability Meters */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-2xl bg-red-50/70 border border-red-100">
                  <span className="text-[10px] text-red-700 font-bold block">ICU বেড</span>
                  <span className="text-base font-black text-red-700 my-0.5 block">{toBn(h.icuBeds.available)}</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500">মোট {toBn(h.icuBeds.total)}</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-cyan-50/70 border border-cyan-100">
                  <span className="text-[10px] text-cyan-700 font-bold block">CCU / HDU</span>
                  <span className="text-base font-black text-cyan-700 my-0.5 block">{toBn(h.ccuBeds.available)}</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500">মোট {toBn(h.ccuBeds.total)}</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <span className="text-[10px] text-emerald-700 font-bold block">সাধারণ বেড</span>
                  <span className="text-base font-black text-emerald-700 my-0.5 block">{toBn(h.generalBeds.available)}</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500">মোট {toBn(h.generalBeds.total)}</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <span className="text-[10px] text-purple-700 font-bold block">NICU বেড</span>
                  <span className="text-base font-black text-purple-700 my-0.5 block">{toBn(h.nicuBeds.available)}</span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500">মোট {toBn(h.nicuBeds.total)}</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>আপডেট: {h.updatedTime}</span>
                </span>

                <a
                  href={`tel:${h.phone}`}
                  className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all btn-press"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>জরুরি কল: {h.phone}</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default BedDirectoryPage;
