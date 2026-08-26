import React, { useState } from 'react';
import { mockMedicines } from '../../mockData';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Search,
  Pill,
  ShieldCheck,
  Building2,
  TrendingDown,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface MedicineIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MedicineIndexModal: React.FC<MedicineIndexModalProps> = ({ isOpen, onClose }) => {
  const { toBn } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(mockMedicines[0]);

  if (!isOpen) return null;

  const filteredMedicines = mockMedicines.filter(
    (m) =>
      m.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[92vh] animate-slide-up">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-bangla">ওষুধের মূল্য ও জেনেরিক বিকল্প অনুসন্ধান</h2>
              <p className="text-xs text-emerald-100 font-bangla">
                অফিসিয়াল MRP মূল্য, জেনেরিক উপাদান ও সাশ্রয়ী বিকল্প ব্র্যান্ড
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ওষুধের নাম বা জেনেরিক দিয়ে খুঁজুন (যেমন: Napa, Maxpro, Paracetamol, Seclo, Fexo)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bangla focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
        </div>

        {/* 2-Column Explorer */}
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-y-auto flex-1 font-bangla">
          {/* Left Column: Medicines List */}
          <div className="md:col-span-5 p-4 space-y-2 overflow-y-auto max-h-[550px]">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              ওষুধের তালিকা ({toBn(filteredMedicines.length)} টি পাওয়া গেছে)
            </div>

            {filteredMedicines.map((med) => {
              const isSelected = selectedMedicine.id === med.id;
              return (
                <div
                  key={med.id}
                  onClick={() => setSelectedMedicine(med)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                      : 'bg-white border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">{med.brandName}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{med.genericName}</p>
                    </div>
                    <span className="text-xs font-black text-emerald-700 font-mono">
                      ৳ {toBn(med.mrpPrice.toFixed(2))}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>{med.dosageForm} • {med.strength}</span>
                    <span className="truncate max-w-[130px]">{med.company}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed View & Generic Alternatives */}
          <div className="md:col-span-7 p-6 space-y-5 overflow-y-auto">
            {/* Selected Medicine Info Card */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {selectedMedicine.dosageForm} • {selectedMedicine.strength}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {selectedMedicine.brandName}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600">
                    জেনেরিক: <span className="text-emerald-700">{selectedMedicine.genericName}</span>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">সরকারি MRP মূল্য</span>
                  <span className="text-2xl font-black text-emerald-700 font-mono">
                    ৳ {toBn(selectedMedicine.mrpPrice.toFixed(2))}
                  </span>
                  <span className="text-[10px] text-slate-400 block">প্রতি পিস</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/60">
                <div>
                  <span className="text-slate-400 text-[10px] block">প্রস্তুতকারক প্রতিষ্ঠান:</span>
                  <strong className="text-slate-800">{selectedMedicine.company}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">গর্ভকালীন নিরাপত্তা:</span>
                  <strong className="text-blue-700">{selectedMedicine.pregnancyCategory}</strong>
                </div>
              </div>

              <div className="text-xs">
                <span className="text-slate-400 text-[10px] block">ব্যবহার / ইনডিকেশন:</span>
                <p className="text-slate-700">{selectedMedicine.indication}</p>
              </div>
            </div>

            {/* Alternative Cheaper Brands Table */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-sm text-slate-900">
                  একই জেনেরিকের সাশ্রয়ী বিকল্প ব্র্যান্ড সমূহ:
                </h4>
              </div>

              <div className="space-y-2">
                {selectedMedicine.alternativeBrands.map((alt, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between hover:border-emerald-300 transition-colors"
                  >
                    <div>
                      <h5 className="font-bold text-xs text-slate-900">{alt.brandName}</h5>
                      <p className="text-[10px] text-slate-500">{alt.company}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-700 font-mono">
                        ৳ {toBn(alt.price.toFixed(2))}
                      </span>
                      <span className="text-[9px] text-slate-400 block">প্রতি পিস</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                সতর্কতা: চিকিৎসকের প্রেসক্রিপশন বা রেজিস্টার্ড ফার্মাসিস্টের পরামর্শ ছাড়া কোনো ওষুধ সেবন করবেন না।
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
