import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockClinicalCases } from '../../mockData';
import { ClinicalCase } from '../../types';
import {
  X,
  BookOpen,
  Plus,
  Save,
  CheckCircle2,
  Share2,
  FileText,
  Sparkles,
  Search,
  ThumbsUp
} from 'lucide-react';

interface CaseLogbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseLogbookModal: React.FC<CaseLogbookModalProps> = ({ isOpen, onClose }) => {
  const { toBn } = useLanguage();
  const [cases, setCases] = useState<ClinicalCase[]>(mockClinicalCases);
  const [selectedCase, setSelectedCase] = useState<ClinicalCase>(mockClinicalCases[0]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New Case State
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Internal Medicine (Ward 1, DMCH)');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [hpi, setHpi] = useState('');
  const [systemicExam, setSystemicExam] = useState('');
  const [diffDiag, setDiffDiag] = useState('');

  if (!isOpen) return null;

  const handleSaveNewCase = (e: React.FormEvent) => {
    e.preventDefault();
    const newCase: ClinicalCase = {
      id: `case_${Date.now()}`,
      title: title || 'New Clinical Ward Case',
      department: department,
      patientAgeGender: '35 Y / Male',
      chiefComplaint: chiefComplaint || 'Fever and abdominal pain',
      hpi: hpi || 'Patient developed sudden onset symptoms...',
      generalExam: {
        anemia: 'Mild',
        jaundice: 'Absent',
        cyanosis: 'Absent',
        clubbing: 'Absent',
        edema: 'Absent',
        pulse: '88 bpm',
        bp: '120/80 mmHg'
      },
      systemicExam: systemicExam || 'Systemic examination reveals normal findings.',
      differentialDiagnosis: diffDiag ? diffDiag.split(',') : ['Differential 1', 'Differential 2'],
      investigationPlan: ['CBC', 'USG of Whole Abdomen'],
      treatmentPlan: ['Supportive IV fluids', 'Symptomatic management'],
      authorStudent: 'Ayan Chowdhury (K-78, DMCH)',
      verifiedByDoctor: 'Pending Registrar Review',
      likesCount: 1
    };

    setCases([newCase, ...cases]);
    setSelectedCase(newCase);
    setIsCreatingNew(false);
    alert(' নতুন ক্লিনিক্যাল কেস শিট আপনার ডিজিটাল লগবুকে সংরক্ষিত হয়েছে!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto font-bangla">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative my-4 flex flex-col max-h-[94vh] animate-slide-up">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-700 via-indigo-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">মেডিকেল স্টুডেন্ট ক্লিনিক্যাল কেস লগবুক</h2>
              <p className="text-xs text-purple-200">
                MBBS ওয়ার্ড পোস্টিং ও বেডসাইড হিস্ট্রি শীট বিল্ডার (মেডিসিন, সার্জারি, গাইনি, পেডিয়াট্রিক্স)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreatingNew(!isCreatingNew)}
              className="px-3 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isCreatingNew ? 'কেস তালিকা' : 'নতুন কেস লিখুন'}</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-800 overflow-y-auto flex-1 p-4 sm:p-6 gap-6">
          {/* Left Column: Cases List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              সংরক্ষিত ক্লিনিক্যাল কেস ({toBn(cases.length)} টি)
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {cases.map((c) => {
                const isSelected = selectedCase.id === c.id && !isCreatingNew;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCase(c);
                      setIsCreatingNew(false);
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-50 border-purple-300 shadow-2xs'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md">
                      {c.department}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-slate-50 mt-1.5 leading-snug line-clamp-2">
                      {c.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 mt-2">
                      <span> {c.authorStudent}</span>
                      <span className="flex items-center gap-1 text-purple-700 font-bold">
                        <ThumbsUp className="w-3 h-3" /> {toBn(c.likesCount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Case Details or Creation Form */}
          <div className="lg:col-span-8 overflow-y-auto space-y-4">
            {isCreatingNew ? (
              <form onSubmit={handleSaveNewCase} className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 border-b pb-2">
                  নতুন বেডসাইড কেস রেকর্ড করুন
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">কেস শিরোনাম / ডায়াগনসিস</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. 28Y Male with High fever and retro-orbital pain"
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">ওয়ার্ড / ডিপার্টমেন্ট</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-purple-500"
                    >
                      <option value="Internal Medicine (Ward 1, DMCH)">Internal Medicine (মেডিসিন)</option>
                      <option value="General Surgery (Ward 7, DMCH)">General Surgery (সার্জারি)</option>
                      <option value="Paediatrics Ward (DMCH)">Paediatrics (শিশু বিভাগ)</option>
                      <option value="Gynae & Obstetrics (Ward 21)">Gynae & Obstetrics (স্ত্রী ও প্রসূতি)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">প্রধান উপসর্গ (Chief Complaints)</label>
                  <textarea
                    rows={2}
                    required
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    placeholder="e.g. High fever for 4 days, vomiting for 1 day..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">বর্তমান অসুস্থতার ইতিহাস (HPI - 7 Dimensions)</label>
                  <textarea
                    rows={3}
                    required
                    value={hpi}
                    onChange={(e) => setHpi(e.target.value)}
                    placeholder="Onset, duration, character, radiation, aggravating/relieving factors..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">সিস্টেমিক পরীক্ষা (Systemic Exam Findings)</label>
                  <textarea
                    rows={2}
                    value={systemicExam}
                    onChange={(e) => setSystemicExam(e.target.value)}
                    placeholder="Per Abdomen / Chest / CVS / CNS findings..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">ডিফারেন্সিয়াল ডায়াগনসিস (কমা দিয়ে আলাদা করুন)</label>
                  <input
                    type="text"
                    value={diffDiag}
                    onChange={(e) => setDiffDiag(e.target.value)}
                    placeholder="e.g. Dengue Fever with Warning Signs, Enteric Fever, Malaria"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>লগবুকে কেসটি সংরক্ষণ করুন</span>
                </button>
              </form>
            ) : (
              <div className="space-y-5 text-xs">
                {/* Case Header */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-200/80 text-purple-900 rounded-md">
                    {selectedCase.department}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 leading-snug">
                    {selectedCase.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400 text-[11px] pt-1">
                    <span> সংগ্রাহক: <strong>{selectedCase.authorStudent}</strong></span>
                    <span> ভেরিফায়ার: <strong className="text-emerald-700">{selectedCase.verifiedByDoctor}</strong></span>
                  </div>
                </div>

                {/* Chief Complaint */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-1 text-xs">১. প্রধান উপসর্গ (Chief Complaints):</h4>
                  <p className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedCase.chiefComplaint}
                  </p>
                </div>

                {/* HPI */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-1 text-xs">২. রোগবৃত্তান্ত (History of Present Illness - HPI):</h4>
                  <p className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedCase.hpi}
                  </p>
                </div>

                {/* General Exam Findings */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-1 text-xs">৩. সাধারণ শারীরিক পরীক্ষা (General Physical Examination):</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] block">রক্তস্বল্পতা (Anemia)</span>
                      <strong className="text-slate-800 dark:text-slate-100">{selectedCase.generalExam.anemia}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] block">জন্ডিস (Jaundice)</span>
                      <strong className="text-slate-800 dark:text-slate-100">{selectedCase.generalExam.jaundice}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] block">সায়ানোসিস (Cyanosis)</span>
                      <strong className="text-slate-800 dark:text-slate-100">{selectedCase.generalExam.cyanosis}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] block">ইডিমা (Edema)</span>
                      <strong className="text-slate-800 dark:text-slate-100">{selectedCase.generalExam.edema}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] block">পালস (Pulse)</span>
                      <strong className="text-slate-800 dark:text-slate-100">{selectedCase.generalExam.pulse}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] block">রক্তচাপ (BP)</span>
                      <strong className="text-slate-800 dark:text-slate-100">{selectedCase.generalExam.bp}</strong>
                    </div>
                  </div>
                </div>

                {/* Differential Diagnosis */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-1 text-xs">৪. ডিফারেন্সিয়াল ডায়াগনসিস (D/D):</h4>
                  <ul className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300">
                    {selectedCase.differentialDiagnosis.map((dd, i) => (
                      <li key={i} className="font-semibold">{dd}</li>
                    ))}
                  </ul>
                </div>

                {/* Treatment Plan */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-50 mb-1 text-xs">৫. চিকিৎসা ও ব্যবস্থাপনা পরিকল্পনা (Management Plan):</h4>
                  <ul className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 list-disc list-inside space-y-1 text-slate-800 dark:text-slate-100">
                    {selectedCase.treatmentPlan.map((tp, i) => (
                      <li key={i}>{tp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
