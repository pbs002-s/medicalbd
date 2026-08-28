import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockMedicines } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Plus,
  Trash2,
  Printer,
  Save,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  Stethoscope,
  Pill,
  Clock,
  QrCode
} from 'lucide-react';

interface RapidPrescriptionBuilderPageProps {
  onBack?: () => void;
}

interface RxMedItem {
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  dosage: string;
  timing: string;
  duration: string;
  instructions: string;
}

export const RapidPrescriptionBuilderPage: React.FC<RapidPrescriptionBuilderPageProps> = ({ onBack }) => {
  const { currentUser, setActiveView } = useAuth();
  const { toBn } = useLanguage();

  const [patientName, setPatientName] = useState('মোঃ জামাল উদ্দিন');
  const [patientAge, setPatientAge] = useState('৪৫');
  const [patientGender, setPatientGender] = useState('পুরুষ');
  const [bp, setBp] = useState('130/85');
  const [pulse, setPulse] = useState('76');
  const [weight, setWeight] = useState('68');
  const [diagnosis, setDiagnosis] = useState('Essential Hypertension & Mild Gastritis');
  const [chiefComplaints, setChiefComplaints] = useState('মাথাব্যথা, বুক জ্বালাপোড়া ও ক্লান্তি (৫ দিন)');

  const [medsList, setMedsList] = useState<RxMedItem[]>([
    {
      brandName: 'Sergel',
      genericName: 'Esomeprazole',
      dosageForm: 'Capsule',
      strength: '20mg',
      dosage: '১+০+১',
      timing: 'খাবার ২০ মিনিট আগে',
      duration: '১৪ দিন',
      instructions: 'পানি দিয়ে গিলে সেব্য',
    },
    {
      brandName: 'Napa Extend',
      genericName: 'Paracetamol',
      dosageForm: 'Tablet',
      strength: '665mg',
      dosage: '১+০+১',
      timing: 'ভরা পেটে',
      duration: '৫ দিন',
      instructions: 'ব্যথা বা জ্বর থাকলে',
    },
  ]);

  const [searchMedQuery, setSearchMedQuery] = useState('');
  const [filteredSearchResults, setFilteredSearchResults] = useState(mockMedicines.slice(0, 4));

  const handleSearchMeds = (q: string) => {
    setSearchMedQuery(q);
    if (!q) {
      setFilteredSearchResults(mockMedicines.slice(0, 4));
    } else {
      setFilteredSearchResults(
        mockMedicines.filter(
          m => m.brandName.toLowerCase().includes(q.toLowerCase()) || m.genericName.toLowerCase().includes(q.toLowerCase())
        )
      );
    }
  };

  const handleAddMed = (med: any) => {
    const newItem: RxMedItem = {
      brandName: med.brandName,
      genericName: med.genericName,
      dosageForm: med.dosageForm,
      strength: med.strength,
      dosage: '১+০+১',
      timing: 'খাবার পর',
      duration: '৭ দিন',
      instructions: 'নিয়মিত সেব্য',
    };
    setMedsList([...medsList, newItem]);
    setSearchMedQuery('');
  };

  const handleRemoveMed = (index: number) => {
    setMedsList(medsList.filter((_, i) => i !== index));
  };

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveRx = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveView('prescriptions');
    }, 2000);
  };

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
                <span className="text-emerald-600 font-semibold">চিকিৎসক প্রেসক্রিপশন বিল্ডার</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5 flex items-center gap-2">
                <span>র‌্যাপিড স্মার্ট প্রেসক্রিপশন জেনারেটর</span>
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveRx}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/25 transition-all btn-press"
            >
              <Save className="w-4 h-4" />
              <span>প্রেসক্রিপশন সংরক্ষণ ও প্রিন্ট</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 animate-slide-down">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold"> প্রেসক্রিপশন সফলভাবে রোগীর ভল্টে সংরক্ষিত হয়েছে!</span>
        </div>
      )}

      {/* 2-Column Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 Columns: Input Builder Forms */}
        <div className="lg:col-span-6 space-y-5">
          {/* Patient Details & Vitals */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" />
              <span>রোগীর তথ্য ও ভাইটালস</span>
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">রোগীর নাম:</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-bold text-slate-800 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">বয়স:</label>
                <input
                  type="text"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">লিঙ্গ:</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-bold"
                >
                  <option>পুরুষ</option>
                  <option>মহিলা</option>
                  <option>শিশু</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">রক্তচাপ (BP):</label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">পালস (Pulse):</label>
                <input
                  type="text"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 mb-1">ওজন (kg):</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 mb-1">রোগ নির্ণয় (Provisional Diagnosis):</label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-semibold text-emerald-800"
              />
            </div>
          </div>

          {/* Quick Drug Search & Add */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-emerald-600" />
              <span>ওষুধ দ্রুত সংযোজন (Smart Drug Search)</span>
            </h3>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ওষুধের ব্র্যান্ড বা জেনেরিক নাম লিখুন (যেমন: Napa, Sergel, Moxacil)..."
                value={searchMedQuery}
                onChange={(e) => handleSearchMeds(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-bangla"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {filteredSearchResults.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleAddMed(m)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-50 block">{m.brandName}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{m.genericName} ({m.strength})</span>
                  </div>
                  <Plus className="w-4 h-4 text-emerald-600" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Real-Time Live Prescription Preview */}
        <div className="lg:col-span-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-5 text-xs">
            {/* Header */}
            <div className="border-b-2 border-emerald-600 pb-3 flex justify-between items-start">
              <div>
                <h3 className="font-black text-slate-900 dark:text-slate-50 text-base">{currentUser?.nameBn || 'ডা. তানভীর হাসান'}</h3>
                <p className="text-[11px] text-emerald-700">MBBS (DMC), FCPS (Medicine)</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">BMDC Reg: A-54982</p>
              </div>
              <div className="text-right text-[10px] text-slate-400 dark:text-slate-500">
                <p>ল্যাবএইড ডায়াগনস্টিক, ধানমন্ডি</p>
                <p className="font-mono text-emerald-600 font-bold">তারিখ: ২০ মে, ২০২৬</p>
              </div>
            </div>

            {/* Patient Bar */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between text-[11px]">
              <span>রোগী: <strong>{patientName}</strong></span>
              <span>বয়স: <strong>{patientAge} বছর</strong></span>
              <span>BP: <strong>{bp}</strong></span>
              <span>ওজন: <strong>{weight} kg</strong></span>
            </div>

            {/* Diagnosis */}
            <div className="text-[11px]">
              <span className="text-slate-400 dark:text-slate-500">Diagnosis: </span>
              <strong className="text-emerald-800 font-mono">{diagnosis}</strong>
            </div>

            {/* Rx List */}
            <div className="space-y-3">
              <span className="text-2xl font-serif font-black text-emerald-600 italic">Rx</span>

              {medsList.map((med, index) => (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-slate-50">{index + 1}. {med.brandName}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">({med.strength})</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                      <span className="font-bold font-mono text-emerald-700">{med.dosage}</span>
                      <span>• {med.timing}</span>
                      <span>• {med.duration}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveMed(index)}
                    className="text-red-400 hover:text-red-600 p-1"
                    title="মুছুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500">
              <span>১৪ দিনের ফ্রি রিপোর্ট রিভিউ কার্যকর</span>
              <span>ডিজিটাল ই-প্রেসক্রিপশন ভল্ট</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapidPrescriptionBuilderPage;
