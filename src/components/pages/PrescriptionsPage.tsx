import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockPrescriptions } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  FileText,
  ArrowLeft,
  ChevronRight,
  Search,
  Printer,
  Download,
  Share2,
  QrCode,
  CheckCircle2,
  Calendar,
  Clock,
  Pill,
  Sparkles,
  MapPin,
  Stethoscope,
  Send,
  AlertCircle
} from 'lucide-react';

interface PrescriptionsPageProps {
  onBack?: () => void;
  initialRxId?: string;
}

export const PrescriptionsPage: React.FC<PrescriptionsPageProps> = ({ onBack, initialRxId }) => {
  const { setActiveView } = useAuth();
  const { toBn } = useLanguage();

  const [selectedRxId, setSelectedRxId] = useState<string>(initialRxId || mockPrescriptions[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const currentRx = mockPrescriptions.find((rx) => rx.id === selectedRxId) || mockPrescriptions[0];

  const filteredRxList = mockPrescriptions.filter(
    (rx) =>
      rx.doctorNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.prescriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.chiefComplaints.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                <span className="text-blue-600 font-semibold">ডিজিটাল ই-প্রেসক্রিপশন ভল্ট</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5">
                প্রেসক্রিপশন ও ওষুধের তালিকা
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all btn-press"
            >
              <Printer className="w-4 h-4" />
              <span>প্রেসক্রিপশন প্রিন্ট</span>
            </button>
            <button
              onClick={() => alert(' প্রেসক্রিপশন PDF ডাউনলোড শুরু হয়েছে!')}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 transition-colors btn-press"
              title="PDF ডাউনলোড"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 2 Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Columns: Prescription List & Search */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ডাক্তার বা প্রেসক্রিপশন আইডি দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-blue-500 font-bangla"
              />
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredRxList.map((rx) => {
                const isSelected = rx.id === currentRx.id;
                return (
                  <div
                    key={rx.id}
                    onClick={() => setSelectedRxId(rx.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-400 shadow-2xs'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-blue-600 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-blue-100 inline-block mb-1">
                          {rx.prescriptionNumber}
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-slate-50 text-xs leading-tight">{rx.doctorNameBn}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{rx.doctorHospital}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bangla shrink-0">{rx.dateBn}</span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 dark:text-slate-400">
                        {toBn(rx.medicines.length)}টি ওষুধ • {toBn(rx.investigations?.length || 0)}টি টেস্ট
                      </span>
                      <span className="font-bold text-emerald-600 font-bangla">ভেরিফায়েড </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 8 Columns: Interactive Printable Prescription Paper */}
        <div className="lg:col-span-8">
          <ScrollReveal animation="fade-up" duration={450}>
            <div
              id="printable-prescription"
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 space-y-6 relative overflow-hidden"
            >
              {/* Top Doctor Letterhead Header */}
              <div className="border-b-2 border-blue-600 pb-5 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 leading-tight">
                    {currentRx.doctorNameBn}
                  </h2>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">{currentRx.doctorDegrees}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{currentRx.doctorHospital}</p>
                  <span className="inline-block mt-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {currentRx.doctorBmdc}
                  </span>
                </div>

                <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                  <p className="font-bold text-slate-800 dark:text-slate-100">ল্যাবএইড স্পেশালাইজড চেম্বার</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs">বাড়ি #০১, রোড #০৪, ধানমন্ডি, ঢাকা</p>
                  <p className="font-mono text-blue-600 font-bold">হটলাইন: 09678123456</p>
                </div>
              </div>

              {/* Patient Banner Bar */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">রোগীর নাম</span>
                  <strong className="text-slate-900 dark:text-slate-50 font-bold">{currentRx.patientNameBn}</strong>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">বয়স ও লিঙ্গ</span>
                  <span className="text-slate-800 dark:text-slate-100 font-semibold">{toBn(currentRx.patientAge)} বছর / {currentRx.patientGender}</span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">তারিখ</span>
                  <span className="text-slate-800 dark:text-slate-100 font-mono font-semibold">{currentRx.dateBn}</span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">প্রেসক্রিপশন আইডি</span>
                  <span className="text-blue-600 font-mono font-bold">{currentRx.prescriptionNumber}</span>
                </div>
              </div>

              {/* Main Prescription Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                {/* Left 4 Cols: Vitals, Complaints & Lab Tests */}
                <div className="md:col-span-4 space-y-5 border-r md:border-slate-200/80 pr-0 md:pr-4">
                  {/* Vitals */}
                  {currentRx.vitals && (
                    <div className="space-y-1.5 bg-blue-50/50 p-3 rounded-2xl border border-blue-100">
                      <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">শারীরিক পরীক্ষা (Vitals)</h4>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                        {currentRx.vitals.bp && (
                          <div>রক্তচাপ: <strong className="font-mono">{currentRx.vitals.bp}</strong></div>
                        )}
                        {currentRx.vitals.pulse && (
                          <div>পালস: <strong className="font-mono">{currentRx.vitals.pulse}</strong></div>
                        )}
                        {currentRx.vitals.weight && (
                          <div>ওজন: <strong className="font-mono">{currentRx.vitals.weight}</strong></div>
                        )}
                        {currentRx.vitals.temp && (
                          <div>তাপমাত্রা: <strong className="font-mono">{currentRx.vitals.temp}</strong></div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Complaints */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-1.5">রোগীর প্রধান উপসর্গ (Complaints)</h4>
                    <ul className="space-y-1">
                      {currentRx.chiefComplaints.map((c, i) => (
                        <li key={i} className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                           {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Advised Lab Tests */}
                  {currentRx.investigations && currentRx.investigations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 uppercase tracking-wider mb-1.5">প্রস্তাবিত পরীক্ষা (Lab Tests)</h4>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {currentRx.investigations.map((test, i) => (
                          <li key={i} className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800 font-mono text-[11px]">
                            {i + 1}. {test}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right 8 Cols: Medications Rx Table */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-3xl font-serif font-black text-blue-600 italic">Rx</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-sans">(নির্ধারিত ওষুধ ও সেবনবিধি)</span>
                  </div>

                  <div className="space-y-3">
                    {currentRx.medicines.map((med, index) => (
                      <div
                        key={med.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 hover:bg-blue-50/30 transition-colors space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-mono font-bold flex items-center justify-center">
                              {index + 1}
                            </span>
                            <div>
                              <h5 className="font-bold text-slate-900 dark:text-slate-50 text-sm">
                                {med.brandName} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">({med.genericName})</span>
                              </h5>
                              <span className="text-[11px] text-blue-600 font-semibold">{med.strength}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-mono font-black text-xs text-slate-800 dark:text-slate-100 shadow-2xs">
                              {med.frequencyBn}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400 pt-1 pl-7">
                          <span>⏱ নিয়ম: <strong className="text-slate-800 dark:text-slate-100">{med.mealTiming}</strong></span>
                          <span> মেয়াদ: <strong className="text-slate-800 dark:text-slate-100">{med.durationBn}</strong></span>
                          {med.specialInstruction && (
                            <span className="text-teal-700 font-medium"> {med.specialInstruction}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* General Advice */}
                  {currentRx.adviceBn && currentRx.adviceBn.length > 0 && (
                    <div className="mt-4 p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-1 text-xs">
                      <h5 className="font-bold text-amber-900">চিকিৎসকের সাধারণ পরামর্শ:</h5>
                      <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                        {currentRx.adviceBn.map((adv, i) => (
                          <li key={i}>{adv}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Footer & QR Verification */}
              <div className="border-t-2 border-slate-100 dark:border-slate-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <QrCode className="w-12 h-12 text-slate-800 dark:text-slate-100" />
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">ডিজিটাল ভেরিফায়েড ই-প্রেসক্রিপশন</p>
                    <p>Shasthosetu BD Digital Health Vault</p>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="w-32 border-b border-slate-400 ml-auto mb-1"></div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">{currentRx.doctorNameBn}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">ডিজিটাল স্বাক্ষর ও সিল</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
