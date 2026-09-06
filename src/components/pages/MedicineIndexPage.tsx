import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockMedicines } from '../../mockData';
import { MedicineItem } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Pill,
  ArrowLeft,
  ChevronRight,
  Search,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface MedicineIndexPageProps {
  onBack?: () => void;
}

export const MedicineIndexPage: React.FC<MedicineIndexPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();

  const [selectedMedId, setSelectedMedId] = useState<string>(mockMedicines[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const currentMed = mockMedicines.find((m) => m.id === selectedMedId) || mockMedicines[0];

  const filteredMedicines = mockMedicines.filter((m) => {
    const matchesSearch =
      searchQuery === '' ||
      m.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      categoryFilter === 'all' ||
      m.dosageForm.toLowerCase().includes(categoryFilter.toLowerCase());

    return matchesSearch && matchesCat;
  });

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
                <span className="text-emerald-600 font-semibold">{tr('DGDA Medicine & Pricing Directory', 'DGDA ওষুধ মূল্য ও বিকল্প ডিরেক্টরি')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5 flex items-center gap-2">
                <span>{tr('Medicine MRP & Generic Comparison', 'ওষুধের দাম ও জেনেরিক বিকল্প তুলনা')}</span>
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="pill pill-success text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{tr('DGDA Verified Database', 'DGDA অনুমোদিত ডেটাবেজ')}</span>
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Columns: Search & Medicine List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={tr('Search brand, generic or company...', 'ব্র্যান্ড বা জেনেরিকের নাম দিয়ে খুঁজুন...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:outline-hidden focus:border-blue-500"
              />
            </div>

            {/* Dosage Filter Pills */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {[
                { id: 'all', labelEn: 'All Types', labelBn: 'সকল ওষুধ' },
                { id: 'tablet', labelEn: 'Tablet', labelBn: 'ট্যাবলেট' },
                { id: 'capsule', labelEn: 'Capsule', labelBn: 'ক্যাপসুল' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategoryFilter(c.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    categoryFilter === c.id
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-paper border border-border text-muted hover:text-ink'
                  }`}
                >
                  {isBn ? c.labelBn : c.labelEn}
                </button>
              ))}
            </div>

            {/* Medicine Items List */}
            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {filteredMedicines.map((med) => {
                const isSelected = med.id === currentMed.id;
                return (
                  <div
                    key={med.id}
                    onClick={() => setSelectedMedId(med.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-400 shadow-2xs'
                        : 'bg-paper border-border hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-ink text-xs leading-tight">{med.brandName}</h4>
                        <p className="text-[11px] text-muted mt-0.5">{med.genericName}</p>
                        <p className="text-[10px] text-muted">{med.company}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-emerald-600 font-mono">
                          ৳ {num(med.mrpPrice.toFixed(2))}
                        </span>
                        <span className="text-[9px] text-muted block">{med.dosageForm}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 8 Columns: Medicine Detail & Alternative Comparison */}
        <div className="lg:col-span-8 space-y-6">
          <ScrollReveal animation="fade-up" duration={450}>
            <div className="card card-pad bg-surface border border-border shadow-elevation-2 p-6 sm:p-8 space-y-6">
              {/* Top Detail Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-ink">{currentMed.brandName}</h2>
                    <span className="pill pill-success text-xs">
                      {currentMed.strength}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-muted mt-1">
                    {tr('Generic', 'জেনেরিক')}: {currentMed.genericName}
                  </p>
                  <p className="text-xs text-muted mt-0.5 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{tr('Manufacturer', 'প্রস্তুতকারক')}: {currentMed.company}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-3 rounded-2xl">
                  <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold block">
                    {tr('Retail MRP', 'খুচরা মূল্য (MRP)')}
                  </span>
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono leading-none my-0.5 block">
                    ৳ {num(currentMed.mrpPrice.toFixed(2))}
                  </span>
                  <span className="text-[10px] text-muted">
                    {tr('per', 'প্রতি')} {currentMed.dosageForm}
                  </span>
                </div>
              </div>

              {/* Indications & Pregnancy Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card card-pad bg-paper border border-border space-y-1">
                  <h4 className="font-bold text-ink text-xs">
                    {tr('Indications & Clinical Usage:', 'ব্যবহার ও নির্দেশনা (Indications):')}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">{currentMed.indication}</p>
                </div>

                <div className="card card-pad bg-blue-50/60 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 space-y-1">
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 text-xs">
                    {tr('Pregnancy Safety Category:', 'গর্ভাবস্থায় সতর্কতা (Pregnancy Category):')}
                  </h4>
                  <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">{currentMed.pregnancyCategory}</p>
                </div>
              </div>

              {/* Generic Alternatives & Price Comparison */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-ink text-sm">
                      {tr('Affordable Generic Substitutes (Same Molecule & Strength)', 'একই জেনেরিকের সাশ্রয়ী বিকল্প ওষুধসমূহ')}
                    </h3>
                  </div>
                  <span className="text-[11px] text-muted">
                    {tr(`${num(currentMed.alternativeBrands.length)} alternative brands`, `${num(currentMed.alternativeBrands.length)}টি বিকল্প ব্র্যান্ড`)}
                  </span>
                </div>

                <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden text-xs">
                  {currentMed.alternativeBrands.map((alt, index) => {
                    const priceDiff = currentMed.mrpPrice - alt.price;
                    const isCheaper = priceDiff > 0;
                    return (
                      <div
                        key={index}
                        className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-paper hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div>
                          <h5 className="font-bold text-ink text-sm">{alt.brandName}</h5>
                          <p className="text-[11px] text-muted">{alt.company}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="font-mono font-black text-sm text-ink block">
                              ৳ {num(alt.price.toFixed(2))}
                            </span>
                            {isCheaper ? (
                              <span className="pill pill-success text-[10px]">
                                {tr(`Save ৳ ${num(priceDiff.toFixed(2))}`, `৳ ${num(priceDiff.toFixed(2))} সাশ্রয়ী`)}
                              </span>
                            ) : (
                              <span className="text-[10px] text-muted">{tr('Same price', 'একই মূল্য')}</span>
                            )}
                          </div>

                          <button
                            onClick={() => alert(tr(`Information for ${alt.brandName} loaded.`, `${alt.brandName} ওষুধের তথ্য লোড হচ্ছে...`))}
                            className="btn btn-outline py-1.5 px-3 text-xs font-semibold"
                          >
                            {tr('Details', 'বিস্তারিত')}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default MedicineIndexPage;
