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
  QrCode,
  CheckCircle2,
  Calendar,
  Clock,
  Pill,
  Sparkles,
  MapPin,
  Stethoscope,
  BadgeCheck,
  Info
} from 'lucide-react';

interface PrescriptionsPageProps {
  onBack?: () => void;
  initialRxId?: string;
}

export const PrescriptionsPage: React.FC<PrescriptionsPageProps> = ({ onBack, initialRxId }) => {
  const { setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();

  const [selectedRxId, setSelectedRxId] = useState<string>(initialRxId || mockPrescriptions[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const currentRx = mockPrescriptions.find((rx) => rx.id === selectedRxId) || mockPrescriptions[0];

  const filteredRxList = mockPrescriptions.filter((rx) => {
    const q = searchQuery.toLowerCase();
    return (
      rx.doctorName.toLowerCase().includes(q) ||
      rx.doctorNameBn.toLowerCase().includes(q) ||
      rx.prescriptionNumber.toLowerCase().includes(q) ||
      rx.chiefComplaints.some((c) => c.toLowerCase().includes(q))
    );
  });

  const formatMealTiming = (timing: string) => {
    if (isBn) return timing;
    if (timing.includes('পূর্বে')) return '30 mins before meals';
    if (timing.includes('পরে')) return 'After meals';
    return 'As prescribed';
  };

  const formatDuration = (days: number, bnStr: string) => {
    if (isBn) return bnStr;
    return `${days} days`;
  };

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
                <span className="text-blue-600 font-semibold">{tr('Digital e-Prescription Vault', 'ডিজিটাল ই-প্রেসক্রিপশন ভল্ট')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5">
                {tr('Prescription & Medication Records', 'প্রেসক্রিপশন ও ওষুধের তালিকা')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="btn btn-primary px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>{tr('Print Prescription', 'প্রেসক্রিপশন প্রিন্ট')}</span>
            </button>
            <button
              onClick={() => alert(tr('Prescription PDF download initiated!', 'প্রেসক্রিপশন PDF ডাউনলোড শুরু হয়েছে!'))}
              className="btn btn-outline p-2 text-xs"
              title={tr('Download PDF', 'PDF ডাউনলোড')}
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
          <div className="card card-pad bg-surface border border-border shadow-elevation-1 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={tr('Search by doctor or Rx ID...', 'ডাক্তার বা প্রেসক্রিপশন আইডি দিয়ে খুঁজুন...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:outline-hidden focus:border-blue-500"
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
                        ? 'bg-blue-50/80 dark:bg-blue-900/30 border-blue-500 shadow-2xs'
                        : 'bg-paper border-border hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-blue-600 bg-surface px-2 py-0.5 rounded-md border border-border inline-block mb-1">
                          {rx.prescriptionNumber}
                        </span>
                        <h4 className="font-bold text-ink text-xs leading-tight">
                          {isBn ? rx.doctorNameBn : rx.doctorName}
                        </h4>
                        <p className="text-[11px] text-muted mt-0.5">{rx.doctorHospital}</p>
                      </div>
                      <span className="text-[10px] text-muted font-mono shrink-0">
                        {isBn ? rx.dateBn : rx.date}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between text-[10px]">
                      <span className="text-muted">
                        {tr(
                          `${num(rx.medicines.length)} medicines • ${num(rx.investigations?.length || 0)} tests`,
                          `${num(rx.medicines.length)}টি ওষুধ • ${num(rx.investigations?.length || 0)}টি টেস্ট`
                        )}
                      </span>
                      <span className="font-bold text-emerald-600">
                        {tr('Verified', 'ভেরিফায়েড')}
                      </span>
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
              className="card card-pad bg-surface border border-border shadow-elevation-2 p-6 sm:p-10 space-y-6 relative overflow-hidden"
            >
              {/* Top Doctor Letterhead Header */}
              <div className="border-b-2 border-blue-600 pb-5 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-ink leading-tight">
                    {isBn ? currentRx.doctorNameBn : currentRx.doctorName}
                  </h2>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">{currentRx.doctorDegrees}</p>
                  <p className="text-xs text-muted mt-0.5">{currentRx.doctorHospital}</p>
                  <span className="inline-block mt-1 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                    {currentRx.doctorBmdc}
                  </span>
                </div>

                <div className="text-left sm:text-right text-xs text-muted space-y-0.5">
                  <p className="font-bold text-ink">{tr('Labaid Specialized Chamber', 'ল্যাবএইড স্পেশালাইজড চেম্বার')}</p>
                  <p className="text-[11px] text-muted max-w-xs">{tr('House #01, Road #04, Dhanmondi, Dhaka', 'বাড়ি #০১, রোড #০৪, ধানমন্ডি, ঢাকা')}</p>
                  <p className="font-mono text-blue-600 font-bold">{tr('Hotline: 09678123456', 'হটলাইন: 09678123456')}</p>
                </div>
              </div>

              {/* Patient Banner Bar */}
              <div className="p-3.5 bg-paper rounded-2xl border border-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-muted block text-[10px]">{tr('Patient Name', 'রোগীর নাম')}</span>
                  <strong className="text-ink font-bold">{isBn ? currentRx.patientNameBn : currentRx.patientName}</strong>
                </div>
                <div>
                  <span className="text-muted block text-[10px]">{tr('Age / Gender', 'বয়স ও লিঙ্গ')}</span>
                  <span className="text-ink font-semibold">
                    {num(currentRx.patientAge)} {tr('yrs', 'বছর')} / {currentRx.patientGender}
                  </span>
                </div>
                <div>
                  <span className="text-muted block text-[10px]">{tr('Date', 'তারিখ')}</span>
                  <span className="text-ink font-mono font-semibold">{isBn ? currentRx.dateBn : currentRx.date}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px]">{tr('Prescription ID', 'প্রেসক্রিপশন আইডি')}</span>
                  <span className="text-blue-600 font-mono font-bold">{currentRx.prescriptionNumber}</span>
                </div>
              </div>

              {/* Main Prescription Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                {/* Left 4 Cols: Vitals, Complaints & Lab Tests */}
                <div className="md:col-span-4 space-y-5 border-r border-border pr-0 md:pr-4">
                  {/* Vitals */}
                  {currentRx.vitals && (
                    <div className="space-y-1.5 bg-blue-50/50 dark:bg-blue-900/20 p-3 rounded-2xl border border-blue-100 dark:border-blue-800/40">
                      <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                        {tr('Clinical Vitals', 'শারীরিক পরীক্ষা (Vitals)')}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-ink">
                        {currentRx.vitals.bp && (
                          <div>{tr('BP', 'রক্তচাপ')}: <strong className="font-mono">{currentRx.vitals.bp}</strong></div>
                        )}
                        {currentRx.vitals.pulse && (
                          <div>{tr('Pulse', 'পালস')}: <strong className="font-mono">{currentRx.vitals.pulse}</strong></div>
                        )}
                        {currentRx.vitals.weight && (
                          <div>{tr('Weight', 'ওজন')}: <strong className="font-mono">{currentRx.vitals.weight}</strong></div>
                        )}
                        {currentRx.vitals.temp && (
                          <div>{tr('Temp', 'তাপমাত্রা')}: <strong className="font-mono">{currentRx.vitals.temp}</strong></div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Complaints */}
                  <div>
                    <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      {tr('Chief Complaints', 'রোগীর প্রধান উপসর্গ (Complaints)')}
                    </h4>
                    <ul className="space-y-1">
                      {currentRx.chiefComplaints.map((c, i) => (
                        <li key={i} className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-100 dark:border-emerald-800">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Advised Lab Tests */}
                  {currentRx.investigations && currentRx.investigations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                        {tr('Advised Lab Tests', 'প্রস্তাবিত পরীক্ষা (Lab Tests)')}
                      </h4>
                      <ul className="space-y-1 text-xs text-ink">
                        {currentRx.investigations.map((test, i) => (
                          <li key={i} className="p-2 bg-paper rounded-lg border border-border font-mono text-[11px]">
                            {i + 1}. {test}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right 8 Cols: Medications Rx Table */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <span className="text-3xl font-black text-blue-600 italic">Rx</span>
                    <span className="text-xs text-muted">
                      ({tr('Prescribed Medicines & Regimen', 'নির্ধারিত ওষুধ ও সেবনবিধি')})
                    </span>
                  </div>

                  <div className="space-y-3">
                    {currentRx.medicines.map((med, index) => (
                      <div
                        key={med.id}
                        className="card card-pad bg-paper border border-border hover:border-blue-200 transition-colors space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] font-mono font-bold flex items-center justify-center">
                              {index + 1}
                            </span>
                            <div>
                              <h5 className="font-bold text-ink text-sm">
                                {med.brandName} <span className="text-xs font-normal text-muted">({med.genericName})</span>
                              </h5>
                              <span className="text-[11px] text-blue-600 font-semibold">{med.strength}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="px-2.5 py-1 bg-surface border border-border rounded-lg font-mono font-black text-xs text-ink shadow-2xs">
                              {isBn ? med.frequencyBn : med.frequency}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted pt-1 pl-7">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-muted shrink-0" />
                            <span>{tr('Timing:', 'নিয়ম:')}</span> <strong className="text-ink">{formatMealTiming(med.mealTiming)}</strong>
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-muted shrink-0" />
                            <span>{tr('Duration:', 'মেয়াদ:')}</span> <strong className="text-ink">{formatDuration(med.durationDays, med.durationBn)}</strong>
                          </span>
                          {med.specialInstruction && (
                            <span className="text-teal-700 dark:text-teal-400 font-medium flex items-center gap-1">
                              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{med.specialInstruction}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* General Advice */}
                  {currentRx.adviceBn && currentRx.adviceBn.length > 0 && (
                    <div className="mt-4 p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200/80 dark:border-amber-800/50 space-y-1 text-xs">
                      <h5 className="font-bold text-amber-900 dark:text-amber-200">
                        {tr('Physician Clinical Advice:', 'চিকিৎসকের সাধারণ পরামর্শ:')}
                      </h5>
                      <ul className="list-disc list-inside space-y-0.5 text-amber-800 dark:text-amber-300">
                        {isBn
                          ? currentRx.adviceBn.map((adv, i) => <li key={i}>{adv}</li>)
                          : [
                              'Drink plenty of oral rehydration fluids and warm water.',
                              'Maintain complete bed rest until fever subsides for 24 hours.',
                              'Follow up immediately if platelets drop or if bleeding gums occur.'
                            ].map((adv, i) => <li key={i}>{adv}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Footer & QR Verification */}
              <div className="border-t-2 border-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-paper border border-border rounded-xl">
                    <QrCode className="w-12 h-12 text-ink" />
                  </div>
                  <div className="text-[11px] text-muted">
                    <p className="font-semibold text-ink">
                      {tr('Digitally Verified e-Prescription', 'ডিজিটাল ভেরিফায়েড ই-প্রেসক্রিপশন')}
                    </p>
                    <p>ShasthoSetu BD Digital Health Vault</p>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="w-32 border-b border-muted ml-auto mb-1"></div>
                  <span className="text-xs font-bold text-ink block">
                    {isBn ? currentRx.doctorNameBn : currentRx.doctorName}
                  </span>
                  <span className="text-[10px] text-muted">
                    {tr('Digital BMDC Signature & Stamp', 'ডিজিটাল স্বাক্ষর ও সিল')}
                  </span>
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
