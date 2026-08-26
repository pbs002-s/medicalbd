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
  CheckCircle2,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  Building2,
  AlertTriangle
} from 'lucide-react';

interface MedicineIndexPageProps {
  onBack?: () => void;
}

export const MedicineIndexPage: React.FC<MedicineIndexPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { toBn } = useLanguage();

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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
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
                <span className="text-emerald-600 font-semibold">DGDA ওষুধ মূল্য ও বিকল্প ডিরেক্টরি</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 flex items-center gap-2">
                <span>ওষুধের দাম ও জেনেরিক বিকল্প তুলনা</span>
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>DGDA অনুমোদিত ডেটাবেজ</span>
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Columns: Search & Medicine List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-xs space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ব্র্যান্ড বা জেনেরিকের নাম দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-emerald-500 font-bangla"
              />
            </div>

            {/* Dosage Filter Pills */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'সকল ওষুধ' },
                { id: 'tablet', label: 'ট্যাবলেট' },
                { id: 'capsule', label: 'ক্যাপসুল' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategoryFilter(c.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    categoryFilter === c.id
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c.label}
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
                        ? 'bg-emerald-50/80 border-emerald-400 shadow-2xs'
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs leading-tight">{med.brandName}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{med.genericName}</p>
                        <p className="text-[10px] text-slate-400">{med.company}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-emerald-700 font-mono">
                          ৳ {toBn(med.mrpPrice.toFixed(2))}
                        </span>
                        <span className="text-[9px] text-slate-400 block">{med.dosageForm}</span>
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
            <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-8 space-y-6">
              {/* Top Detail Card */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{currentMed.brandName}</h2>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {currentMed.strength}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 mt-1">জেনেরিক: {currentMed.genericName}</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>প্রস্তুতকারক: {currentMed.company}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right bg-emerald-50/70 border border-emerald-200 p-3 rounded-2xl">
                  <span className="text-[10px] text-emerald-800 font-bold block">খুচরা মূল্য (MRP)</span>
                  <span className="text-2xl font-black text-emerald-700 font-mono leading-none my-0.5 block">
                    ৳ {toBn(currentMed.mrpPrice.toFixed(2))}
                  </span>
                  <span className="text-[10px] text-slate-500">প্রতি {currentMed.dosageForm}</span>
                </div>
              </div>

              {/* Indications & Pregnancy Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs">ব্যবহার ও নির্দেশনা (Indications):</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{currentMed.indication}</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
                  <h4 className="font-bold text-blue-900 text-xs">গর্ভাবস্থায় সতর্কতা (Pregnancy Category):</h4>
                  <p className="text-xs text-blue-800 leading-relaxed">{currentMed.pregnancyCategory}</p>
                </div>
              </div>

              {/* Generic Alternatives & Price Comparison */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-slate-900 text-sm">একই জেনেরিকের সাশ্রয়ী বিকল্প ওষুধসমূহ</h3>
                  </div>
                  <span className="text-[11px] text-slate-400 font-bangla">
                    {toBn(currentMed.alternativeBrands.length)}টি বিকল্প ব্র্যান্ড
                  </span>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  {currentMed.alternativeBrands.map((alt, index) => {
                    const priceDiff = currentMed.mrpPrice - alt.price;
                    const isCheaper = priceDiff > 0;
                    return (
                      <div
                        key={index}
                        className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors"
                      >
                        <div>
                          <h5 className="font-bold text-slate-900 text-sm">{alt.brandName}</h5>
                          <p className="text-[11px] text-slate-500">{alt.company}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="font-mono font-black text-sm text-slate-900 block">
                              ৳ {toBn(alt.price.toFixed(2))}
                            </span>
                            {isCheaper ? (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                ৳ {toBn(priceDiff.toFixed(2))} সাশ্রয়ী
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400">একই মূল্য</span>
                            )}
                          </div>

                          <button
                            onClick={() => alert(`🔍 ${alt.brandName} ওষুধের তথ্য লোড হচ্ছে...`)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700"
                          >
                            বিস্তারিত
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
