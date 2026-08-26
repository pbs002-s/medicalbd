import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PrescriptionMedicine } from '../../types';
import {
  X,
  FileText,
  Plus,
  Trash2,
  Printer,
  Save,
  CheckCircle2,
  Sparkles,
  Search,
  AlertCircle
} from 'lucide-react';

interface RapidPrescriptionBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const RapidPrescriptionBuilder: React.FC<RapidPrescriptionBuilderProps> = ({
  isOpen,
  onClose,
  onSaved
}) => {
  const { toBn } = useLanguage();

  const [patientName, setPatientName] = useState('সালমান আহমেদ');
  const [patientAge, setPatientAge] = useState('৩১');
  const [patientGender, setPatientGender] = useState('পুরুষ');

  // Vitals
  const [bp, setBp] = useState('120/80');
  const [pulse, setPulse] = useState('84');
  const [temp, setTemp] = useState('101.4');
  const [weight, setWeight] = useState('68');
  const [spo2, setSpo2] = useState('98');

  // Selected Complaints
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([
    '৪ দিন ধরে উচ্চমাত্রার জ্বর (Fever)',
    'তীব্র মাথাব্যথা ও চোখের পেছনে ব্যথা (Retro-orbital pain)'
  ]);

  // Selected Investigations
  const [selectedInvestigations, setSelectedInvestigations] = useState<string[]>([
    'CBC with ESR',
    'Dengue NS1 Antigen'
  ]);

  // Medicines List
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([
    {
      id: '1',
      brandName: 'Tab. Napa Extra',
      genericName: 'Paracetamol + Caffeine',
      strength: '565 mg',
      dosageForm: 'Tablet',
      frequency: '1+1+1+1',
      frequencyBn: '১+১+১+১',
      mealTiming: 'খাবার পরে (ভরা পেটে)',
      durationDays: 5,
      durationBn: '৫ দিন',
      specialInstruction: 'জ্বর ১০০.৫ এর বেশি হলে ১টি করে খাবেন'
    },
    {
      id: '2',
      brandName: 'Cap. Maxpro',
      genericName: 'Esomeprazole',
      strength: '20 mg',
      dosageForm: 'Capsule',
      frequency: '1+0+1',
      frequencyBn: '১+০+১',
      mealTiming: 'খাবার ৩০ মিনিট আগে (খালি পেটে)',
      durationDays: 14,
      durationBn: '১৪ দিন'
    }
  ]);

  // Selected Advice
  const [selectedAdvice, setSelectedAdvice] = useState<string[]>([
    'প্রতিদিন কমপক্ষে ৩-৪ লিটার তরল খাবার (পানি, ডাবের পানি, ওরস্যালাইন) পান করুন।',
    'সম্পূর্ণ শারীরিক বিশ্রামে থাকুন এবং কোনো প্রকার ব্যথানাশক ঔষধ (NSAIDs) খাবেন না।'
  ]);

  if (!isOpen) return null;

  const quickComplaintChips = [
    'জ্বর (Fever)',
    'কাশি ও শ্বাসকষ্ট (Cough)',
    'তীব্র মাথাব্যথা (Headache)',
    'বুকে চাপ অনুভব (Chest pain)',
    'পেট ব্যথা ও বমি (Abdominal pain)',
    'প্রস্রাবে জ্বালাপোড়া (Burning micturition)',
    'দুর্বলতা ও অরুচি (Fatigue)'
  ];

  const quickInvestigationChips = [
    'CBC with ESR',
    'Dengue NS1 Antigen',
    'Serum Creatinine',
    'Urine R/M/E',
    'ECG (12 Leads)',
    'USG of Whole Abdomen',
    'Chest X-Ray P/A View'
  ];

  const quickDrugPresets = [
    { brand: 'Tab. Napa Extra 565mg', freq: '১+১+১+১', timing: 'খাবার পরে', days: '৫ দিন' },
    { brand: 'Cap. Maxpro 20mg', freq: '১+০+১', timing: 'খাবার ৩০ মি. আগে', days: '১৪ দিন' },
    { brand: 'Tab. Fexo 120mg', freq: '০+০+১', timing: 'রাতে খাবার পর', days: '৭ দিন' },
    { brand: 'Cap. Cef-3 200mg', freq: '১+০+১', timing: 'খাবার পর', days: '৭ দিন' },
    { brand: 'Tab. Monas 10mg', freq: '০+০+১', timing: 'রাতে খাবার পর', days: '১ মাস' }
  ];

  const addDrugPreset = (preset: typeof quickDrugPresets[0]) => {
    const newMed: PrescriptionMedicine = {
      id: String(Date.now()),
      brandName: preset.brand,
      genericName: 'Standard Generic',
      strength: 'Standard',
      dosageForm: 'Tab/Cap',
      frequency: preset.freq,
      frequencyBn: preset.freq,
      mealTiming: preset.timing,
      durationDays: 7,
      durationBn: preset.days
    };
    setMedicines([...medicines, newMed]);
  };

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const handleSave = () => {
    alert('✅ ই-প্রেসক্রিপশন সফলভাবে তৈরি হয়েছে এবং রোগীর ডিজিটাল ভল্টে সেভ করা হয়েছে!');
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[94vh] font-bangla animate-slide-up">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">স্মার্ট সাব-৬০ সেকেন্ড ই-প্রেসক্রিপশন জেনারেটর</h2>
              <p className="text-xs text-blue-200">
                ডা. তানভীর হাসান • ল্যাবএইড ডায়াগনস্টিক চেম্বার (রোগী: {patientName})
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Builder Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 overflow-y-auto flex-1 p-4 sm:p-6 gap-6">
          {/* Left Column: Clinical Complaints, Vitals, Investigations */}
          <div className="lg:col-span-5 space-y-5">
            {/* Patient Info Bar */}
            <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">রোগীর নাম</span>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="font-bold text-slate-800 bg-transparent border-b border-blue-200 w-full focus:outline-hidden"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">বয়স (বছর)</span>
                <input
                  type="text"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="font-bold text-slate-800 bg-transparent border-b border-blue-200 w-full focus:outline-hidden"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">লিঙ্গ</span>
                <span className="font-bold text-slate-800 block">{patientGender}</span>
              </div>
            </div>

            {/* Vitals Keypad */}
            <div>
              <h4 className="font-bold text-xs text-slate-800 mb-2">শারীরিক পরীক্ষা (O/E Vitals):</h4>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block">BP (mmHg)</label>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="w-full p-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono font-bold text-slate-800 text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Pulse (bpm)</label>
                  <input
                    type="text"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    className="w-full p-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono font-bold text-slate-800 text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Temp (°F)</label>
                  <input
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full p-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono font-bold text-slate-800 text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">SpO2 (%)</label>
                  <input
                    type="text"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full p-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono font-bold text-slate-800 text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Weight (kg)</label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono font-bold text-slate-800 text-center"
                  />
                </div>
              </div>
            </div>

            {/* Quick Complaints Chips */}
            <div>
              <h4 className="font-bold text-xs text-slate-800 mb-1.5">প্রধান উপসর্গ (Chief Complaints):</h4>
              <div className="flex flex-wrap gap-1.5">
                {quickComplaintChips.map((chip, i) => {
                  const isSelected = selectedComplaints.some((c) => c.includes(chip.split(' ')[0]));
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedComplaints(selectedComplaints.filter((c) => !c.includes(chip.split(' ')[0])));
                        } else {
                          setSelectedComplaints([...selectedComplaints, chip]);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advised Investigations */}
            <div>
              <h4 className="font-bold text-xs text-slate-800 mb-1.5">প্রয়োজনীয় পরীক্ষা (Investigations):</h4>
              <div className="flex flex-wrap gap-1.5">
                {quickInvestigationChips.map((inv, i) => {
                  const isSelected = selectedInvestigations.includes(inv);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedInvestigations(selectedInvestigations.filter((item) => item !== inv));
                        } else {
                          setSelectedInvestigations([...selectedInvestigations, inv]);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-teal-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {inv}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Rx Drugs & Instructions */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1-Click Drug Presets */}
            <div>
              <h4 className="font-bold text-xs text-slate-800 mb-2">⚡ দ্রুত ঔষধ যুক্ত করুন (BD Top Brand Presets):</h4>
              <div className="flex flex-wrap gap-1.5">
                {quickDrugPresets.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => addDrugPreset(preset)}
                    className="px-3 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-1 transition-all shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{preset.brand}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prescribed Medicines Table */}
            <div>
              <h4 className="font-bold text-xs text-slate-800 mb-2">প্রেসক্রিপশনের ওষুধসমূহ ({medicines.length}):</h4>
              <div className="space-y-2.5">
                {medicines.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center font-mono shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <strong className="text-slate-900 block">{m.brandName}</strong>
                        <span className="text-slate-500 text-[11px]">{m.mealTiming} • {m.durationBn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-white border border-slate-200 rounded-lg font-black font-mono text-blue-700">
                        {m.frequencyBn}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeMedicine(m.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bengali Advice Box */}
            <div>
              <h4 className="font-bold text-xs text-slate-800 mb-1.5">রোগীর পরামর্শ ও খাদ্য নির্দেশিকা:</h4>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
                {selectedAdvice.map((adv, i) => (
                  <p key={i}>• {adv}</p>
                ))}
              </div>
            </div>

            {/* Free Follow-up Grace Period Notice */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ফলোআপ পলিসি: আগামী ১৪ দিনের মধ্যে রিপোর্ট প্রদর্শন সম্পূর্ণ ফ্রি</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            বাতিল করুন
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিভিউ ও প্রিন্ট</span>
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/25 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>প্রেসক্রিপশন সেভ ও ইস্যু করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
