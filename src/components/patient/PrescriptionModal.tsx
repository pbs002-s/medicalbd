import React from 'react';
import { Prescription } from '../../types';
import { mockPrescriptions } from '../../mockData';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Printer,
  Download,
  Share2,
  FileText,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  rxId?: string;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ isOpen, onClose, rxId }) => {
  const { toBn } = useLanguage();

  if (!isOpen) return null;

  const prescription: Prescription =
    mockPrescriptions.find((p) => p.id === rxId) || mockPrescriptions[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative my-4 flex flex-col max-h-[92vh] animate-slide-up">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-slate-800 dark:text-slate-100 font-bangla text-sm">
              ডিজিটাল ই-প্রেসক্রিপশন ({prescription.prescriptionNumber})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-bangla flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Standard A4 Prescription Paper */}
        <div id="printable-prescription" className="p-6 sm:p-10 overflow-y-auto bg-white dark:bg-slate-900 space-y-6 font-bangla text-slate-800 dark:text-slate-100">
          {/* Header with Doctor & Chamber Info */}
          <div className="border-b-2 border-blue-600 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 leading-tight">
                  {prescription.doctorNameBn}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                  {prescription.doctorBmdc}
                </span>
              </div>
              <p className="text-xs font-bold text-blue-700 mt-0.5">{prescription.doctorDegrees}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{prescription.doctorHospital}</p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-100 block">স্বাস্থ্যসেতু ডিজিটাল প্রেসক্রিপশন</span>
              <span>তারিখ: <strong className="text-slate-800 dark:text-slate-100">{prescription.dateBn}</strong></span>
              <span className="block text-[11px] font-mono text-slate-400 dark:text-slate-500">{prescription.prescriptionNumber}</span>
            </div>
          </div>

          {/* Patient Details Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">রোগীর নাম:</span>
              <strong className="text-slate-900 dark:text-slate-50">{prescription.patientNameBn}</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">বয়স / লিঙ্গ:</span>
              <strong className="text-slate-900 dark:text-slate-50">{toBn(prescription.patientAge)} বছর / পুরুষ</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">রক্তের গ্রুপ:</span>
              <strong className="text-red-600 font-black">B (+) Positive</strong>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">পরিচিত এলার্জি:</span>
              <strong className="text-amber-700">Penicillin, Sulfa</strong>
            </div>
          </div>

          {/* 2-Column Clinical Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[380px]">
            {/* Left 4 Cols: Chief Complaints, Vitals, Investigations */}
            <div className="md:col-span-4 border-r border-slate-200/80 pr-4 space-y-5 text-xs">
              {/* Chief Complaints */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-50 uppercase text-[11px] tracking-wider text-blue-900 border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                  C/C (উপসর্গ):
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  {prescription.chiefComplaints.map((cc, i) => (
                    <li key={i} className="leading-tight">{cc}</li>
                  ))}
                </ul>
              </div>

              {/* On Examination (O/E) Vitals */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-50 uppercase text-[11px] tracking-wider text-blue-900 border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                  O/E (শারীরিক পরীক্ষা):
                </h4>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 dark:text-slate-500 block text-[9px]">BP</span>
                    <strong className="text-slate-800 dark:text-slate-100">{prescription.vitals.bp}</strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 dark:text-slate-500 block text-[9px]">Pulse</span>
                    <strong className="text-slate-800 dark:text-slate-100">{prescription.vitals.pulse}</strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 dark:text-slate-500 block text-[9px]">Temp</span>
                    <strong className="text-slate-800 dark:text-slate-100">{prescription.vitals.temp}</strong>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 dark:text-slate-500 block text-[9px]">Weight</span>
                    <strong className="text-slate-800 dark:text-slate-100">{prescription.vitals.weight}</strong>
                  </div>
                </div>
              </div>

              {/* Advised Investigations */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-50 uppercase text-[11px] tracking-wider text-blue-900 border-b border-slate-200 dark:border-slate-800 pb-1 mb-2">
                  Advised Tests (পরীক্ষা):
                </h4>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  {prescription.investigations.map((inv, i) => (
                    <li key={i} className="flex items-center gap-1.5 leading-tight">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{inv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 8 Cols: Rx Medicines & Advice */}
            <div className="md:col-span-8 pl-0 md:pl-2 space-y-6">
              {/* Rx Heading */}
              <div className="flex items-center gap-2">
                <span className="text-3xl font-serif font-black text-blue-600 italic">Rx</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">(ঔষধ সেবন নির্দেশিকা)</span>
              </div>

              {/* Medicines List */}
              <div className="space-y-3.5">
                {prescription.medicines.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 space-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-50">
                          {m.brandName} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({m.strength})</span>
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-black font-mono">
                        {m.frequencyBn}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-400 pl-7 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span> {m.mealTiming}</span>
                      <span>⏱ {m.durationBn}</span>
                      {m.specialInstruction && (
                        <span className="text-red-600 font-semibold"> {m.specialInstruction}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Advice */}
              <div className="pt-2">
                <h4 className="font-bold text-xs text-slate-900 dark:text-slate-50 mb-2">পরামর্শ ও খাদ্য নির্দেশিকা:</h4>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {prescription.adviceBn.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>

              {/* Follow-up reminder */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>পরবর্তী সাক্ষাৎ: {prescription.nextFollowUpBn}</span>
              </div>
            </div>
          </div>

          {/* Prescription Footer */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <div>
              <span>স্বাস্থ্যসেতু ডিজিটাল ভেরিফায়েড ই-প্রেসক্রিপশন • ShasthoSetu BD</span>
            </div>
            <div className="text-right">
              <span className="font-mono">ইলেক্ট্রনিক সিগনেচার ভেরিফায়েড </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
