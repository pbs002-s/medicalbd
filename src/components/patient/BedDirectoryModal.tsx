import React, { useState } from 'react';
import { mockHospitalBeds } from '../../mockData';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  BedDouble,
  PhoneCall,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  Activity
} from 'lucide-react';

interface BedDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BedDirectoryModal: React.FC<BedDirectoryModalProps> = ({ isOpen, onClose }) => {
  const { toBn } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');

  if (!isOpen) return null;

  const filteredBeds = mockHospitalBeds.filter(
    (b) => selectedDistrict === 'ALL' || b.district === selectedDistrict
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[92vh] animate-slide-up">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <BedDouble className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-bangla">হাসপাতাল বেড ও ICU লাইভ ডিরেক্টরি</h2>
              <p className="text-xs text-teal-100 font-bangla">
                জেনারেল বেড, আইসিইউ (ICU), সিসিইউ (CCU) ও এনআইসিইউ (NICU) লাইভ তথ্য
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

        {/* Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0 font-bangla">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">জেলা ফিল্টার:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="py-1.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">সকল জেলা</option>
              <option value="Dhaka">ঢাকা (Dhaka)</option>
              <option value="Chittagong">চট্টগ্রাম (Chittagong)</option>
            </select>
          </div>

          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>সরাসরি হাসপাতাল সার্ভার থেকে আপডেট</span>
          </span>
        </div>

        {/* Beds Cards List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 font-bangla">
          {filteredBeds.map((hosp) => (
            <div
              key={hosp.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-300 transition-all shadow-2xs space-y-4"
            >
              {/* Hospital Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-tight">
                    {hosp.hospitalNameBn}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{hosp.address}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400">আপডেট: {hosp.updatedTime}</span>
                  <a
                    href={`tel:${hosp.phone}`}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white rounded-xl text-xs font-bold font-mono border border-teal-200 flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{hosp.phone}</span>
                  </a>
                </div>
              </div>

              {/* Bed Metrics 4-Box Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* General Beds */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[11px] font-bold text-slate-500 block">জেনারেল বেড</span>
                  <span className="text-xl font-black text-slate-900 font-mono my-0.5 block">
                    {toBn(hosp.generalBeds.available)} <span className="text-xs text-slate-400 font-normal">/ {toBn(hosp.generalBeds.total)}</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">খালি আছে</span>
                </div>

                {/* ICU */}
                <div className="p-3 rounded-2xl bg-red-50/70 border border-red-100 text-center">
                  <span className="text-[11px] font-bold text-red-700 block">ICU (আইসিইউ)</span>
                  <span className="text-xl font-black text-red-600 font-mono my-0.5 block">
                    {toBn(hosp.icuBeds.available)} <span className="text-xs text-red-400 font-normal">/ {toBn(hosp.icuBeds.total)}</span>
                  </span>
                  <span className={`text-[10px] font-bold ${hosp.icuBeds.available > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {hosp.icuBeds.available > 0 ? 'খালি আছে' : 'পূর্ণ (No Vacancy)'}
                  </span>
                </div>

                {/* CCU */}
                <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                  <span className="text-[11px] font-bold text-blue-700 block">CCU (সিসিইউ)</span>
                  <span className="text-xl font-black text-blue-600 font-mono my-0.5 block">
                    {toBn(hosp.ccuBeds.available)} <span className="text-xs text-blue-400 font-normal">/ {toBn(hosp.ccuBeds.total)}</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">খালি আছে</span>
                </div>

                {/* NICU */}
                <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
                  <span className="text-[11px] font-bold text-purple-700 block">NICU (শিশু আইসিইউ)</span>
                  <span className="text-xl font-black text-purple-600 font-mono my-0.5 block">
                    {toBn(hosp.nicuBeds.available)} <span className="text-xs text-purple-400 font-normal">/ {toBn(hosp.nicuBeds.total)}</span>
                  </span>
                  <span className={`text-[10px] font-bold ${hosp.nicuBeds.available > 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {hosp.nicuBeds.available > 0 ? 'খালি আছে' : 'পূর্ণ'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
