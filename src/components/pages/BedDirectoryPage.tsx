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
  Clock,
  HeartPulse
} from 'lucide-react';

interface BedDirectoryPageProps {
  onBack?: () => void;
}

export const BedDirectoryPage: React.FC<BedDirectoryPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();

  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [bedTypeFilter, setBedTypeFilter] = useState<'all' | 'icu' | 'ccu' | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = mockHospitalBeds.filter((h) => {
    const matchesDistrict = selectedDistrict === 'all' || h.district.toLowerCase() === selectedDistrict.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      h.hospitalNameBn.toLowerCase().includes(query) ||
      h.hospitalName.toLowerCase().includes(query) ||
      h.address.toLowerCase().includes(query);

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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
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
                <span className="text-cyan-600 font-semibold">{tr('Hospital Beds & ICU Directory', 'হাসপাতাল বেড ও ICU ডিরেক্টরি')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5">
                {tr('Live Hospital Bed & ICU Vacancy', 'লাইভ হাসপাতাল বেড ও ICU প্রাপ্যতা')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:16263"
              className="btn btn-primary bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-xs border-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{tr('National Health Hotline (16263)', 'জাতীয় স্বাস্থ্য বাতায়ন (১৬২৬৩)')}</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* 3 Live Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ScrollReveal animation="fade-up" delay={50}>
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex items-center gap-3.5">
            <div className="stat-icon w-11 h-11 bg-red-50 dark:bg-red-950/40 text-red-600">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] text-muted font-medium block">
                {tr('Available ICU Beds', 'মোট ফাঁকা ICU বেড')}
              </span>
              <span className="text-2xl font-black text-ink leading-tight block">
                {num(totalIcuAvailable)} {tr('beds', 'টি')}
              </span>
              <span className="pill pill-error text-[10px] mt-0.5 inline-block">
                {tr('LIVE MONITOR', 'লাইভ মনিটরিং')}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100}>
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex items-center gap-3.5">
            <div className="stat-icon w-11 h-11 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-muted font-medium block">
                {tr('Available CCU / HDU Beds', 'মোট ফাঁকা CCU / HDU বেড')}
              </span>
              <span className="text-2xl font-black text-ink leading-tight block">
                {num(totalCcuAvailable)} {tr('beds', 'টি')}
              </span>
              <span className="pill pill-info text-[10px] mt-0.5 inline-block">
                {tr('CRITICAL CARE', 'ক্রিটিক্যাল কেয়ার')}
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={150}>
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex items-center gap-3.5">
            <div className="stat-icon w-11 h-11 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
              <BedDouble className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-muted font-medium block">
                {tr('Available General Ward Beds', 'সাধারণ ওয়ার্ড বেড ফাঁকা')}
              </span>
              <span className="text-2xl font-black text-ink leading-tight block">
                {num(totalGeneralAvailable)} {tr('beds', 'টি')}
              </span>
              <span className="pill pill-success text-[10px] mt-0.5 inline-block">
                {tr('READY FOR ADMISSION', 'তাৎক্ষণিক ভর্তিযোগ্য')}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Filter Toolbar */}
      <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={tr('Search hospital name or area...', 'হাসপাতালের নাম বা এলাকা দিয়ে খুঁজুন...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:outline-hidden focus:border-cyan-500"
          />
        </div>

        {/* District & Bed Type Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex gap-1 bg-paper border border-border p-1 rounded-xl">
            {['all', 'Dhaka', 'Chittagong'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedDistrict === d
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {d === 'all' ? tr('All Districts', 'সকল জেলা') : d === 'Dhaka' ? tr('Dhaka', 'ঢাকা') : tr('Chittagong', 'চট্টগ্রাম')}
              </button>
            ))}
          </div>

          <div className="flex gap-1 bg-paper border border-border p-1 rounded-xl">
            {[
              { id: 'all', labelEn: 'All Beds', labelBn: 'সব বেড' },
              { id: 'icu', labelEn: 'Free ICU', labelBn: 'ICU ফাঁকা' },
              { id: 'ccu', labelEn: 'Free CCU', labelBn: 'CCU ফাঁকা' },
              { id: 'general', labelEn: 'General Beds', labelBn: 'সাধারণ বেড' }
            ].map((bt) => (
              <button
                key={bt.id}
                onClick={() => setBedTypeFilter(bt.id as any)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  bedTypeFilter === bt.id
                    ? 'bg-cyan-700 text-white font-bold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {isBn ? bt.labelBn : bt.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hospital Bed Directory Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHospitals.map((h, index) => (
          <ScrollReveal key={h.id} animation="fade-up" delay={index * 80}>
            <div className="card card-pad bg-surface border border-border hover:border-cyan-300 shadow-elevation-1 hover:shadow-elevation-2 transition-all space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-ink text-base">
                    {isBn ? h.hospitalNameBn : h.hospitalName}
                  </h3>
                  <p className="text-xs text-muted mt-0.5">
                    {isBn ? h.hospitalName : h.hospitalNameBn}
                  </p>
                  <p className="text-xs text-muted flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-muted" />
                    <span>{h.address} ({isBn ? h.districtBn : h.district})</span>
                  </p>
                </div>

                <span className="pill pill-info text-[10px] shrink-0">
                  {isBn ? h.districtBn : h.district}
                </span>
              </div>

              {/* 4 Bed Availability Meters */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40">
                  <span className="text-[10px] text-red-700 dark:text-red-400 font-bold block">
                    {tr('ICU Beds', 'ICU বেড')}
                  </span>
                  <span className="text-base font-black text-red-700 dark:text-red-300 my-0.5 block font-mono">
                    {num(h.icuBeds.available)}
                  </span>
                  <span className="text-[9px] text-muted">
                    {tr('total', 'মোট')} {num(h.icuBeds.total)}
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/40">
                  <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-bold block">
                    CCU / HDU
                  </span>
                  <span className="text-base font-black text-cyan-700 dark:text-cyan-300 my-0.5 block font-mono">
                    {num(h.ccuBeds.available)}
                  </span>
                  <span className="text-[9px] text-muted">
                    {tr('total', 'মোট')} {num(h.ccuBeds.total)}
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block">
                    {tr('General', 'সাধারণ বেড')}
                  </span>
                  <span className="text-base font-black text-emerald-700 dark:text-emerald-300 my-0.5 block font-mono">
                    {num(h.generalBeds.available)}
                  </span>
                  <span className="text-[9px] text-muted">
                    {tr('total', 'মোট')} {num(h.generalBeds.total)}
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                  <span className="text-[10px] text-purple-700 dark:text-purple-400 font-bold block">
                    {tr('NICU', 'NICU বেড')}
                  </span>
                  <span className="text-base font-black text-purple-700 dark:text-purple-300 my-0.5 block font-mono">
                    {num(h.nicuBeds.available)}
                  </span>
                  <span className="text-[9px] text-muted">
                    {tr('total', 'মোট')} {num(h.nicuBeds.total)}
                  </span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-muted flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-muted" />
                  <span>{tr('Updated:', 'আপডেট:')} {isBn ? '১০ মিনিট আগে' : '10m ago'}</span>
                </span>

                <a
                  href={`tel:${h.phone}`}
                  className="btn btn-primary bg-cyan-600 hover:bg-cyan-700 text-white py-1.5 px-3.5 text-xs font-bold border-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{tr(`Call: ${h.phone}`, `জরুরি কল: ${h.phone}`)}</span>
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
