import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockMedicines } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import { PrescriptionSheet, type PrescriptionSheetData, type RxLine } from '../print/PrescriptionSheet';
import { checkPrescriptionSafety, type SafetyAlert } from '../../lib/clinical';
import { prescriptionApi } from '../../api';
import type { MedicineItem, Prescription } from '../../types';
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
  ShieldAlert,
  ShieldCheck,
  X,
  User,
  Pill,
} from 'lucide-react';

interface RapidPrescriptionBuilderPageProps {
  onBack?: () => void;
}

/** Common allergies offered as one-tap chips; doctor can still type any other. */
const COMMON_ALLERGIES = ['Penicillin', 'Sulfa', 'NSAID', 'Aspirin', 'Cephalosporin', 'Quinolone'];

export const RapidPrescriptionBuilderPage: React.FC<RapidPrescriptionBuilderPageProps> = ({ onBack }) => {
  const { currentUser, setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();

  const frequencies = isBn
    ? ['১+০+১', '১+১+১', '০+০+১', '১+০+০', '০+১+০', '১+১+১+১']
    : ['1+0+1', '1+1+1', '0+0+1', '1+0+0', '0+1+0', '1+1+1+1'];

  const timings = isBn
    ? ['খাবার পর', 'খাবার ২০ মিনিট আগে', 'ভরা পেটে', 'খালি পেটে', 'ঘুমানোর আগে']
    : ['After meals', '20 mins before meals', 'With food', 'Empty stomach', 'Before sleep'];

  const [patientName, setPatientName] = useState(isBn ? 'মোঃ জামাল উদ্দিন' : 'Md. Jamal Uddin');
  const [patientAge, setPatientAge] = useState('45');
  const [patientGender, setPatientGender] = useState(isBn ? 'পুরুষ' : 'Male');
  const [bp, setBp] = useState('130/85');
  const [pulse, setPulse] = useState('76');
  const [weight, setWeight] = useState('68');
  const [diagnosis, setDiagnosis] = useState('Essential Hypertension & Mild Gastritis');
  const [chiefComplaints, setChiefComplaints] = useState(
    isBn ? 'মাথাব্যথা, বুক জ্বালাপোড়া ও ক্লান্তি (৫ দিন)' : 'Headache, heartburn and fatigue (5 days)'
  );
  const [followUp, setFollowUp] = useState(isBn ? '১৪ দিন পর' : 'After 14 days');
  const [allergies, setAllergies] = useState<string[]>(['Penicillin']);
  const [allergyDraft, setAllergyDraft] = useState('');

  const [medsList, setMedsList] = useState<RxLine[]>([
    {
      brandName: 'Sergel',
      genericName: 'Esomeprazole',
      dosageForm: 'Cap',
      strength: '20mg',
      dosage: isBn ? '১+০+১' : '1+0+1',
      timing: isBn ? 'খাবার ২০ মিনিট আগে' : '20 mins before meals',
      duration: isBn ? '১৪ দিন' : '14 days',
      instructions: isBn ? 'পানি দিয়ে গিলে সেব্য' : 'Swallow whole with water',
    },
    {
      brandName: 'Napa Extend',
      genericName: 'Paracetamol',
      dosageForm: 'Tab',
      strength: '665mg',
      dosage: isBn ? '১+০+১' : '1+0+1',
      timing: isBn ? 'ভরা পেটে' : 'After meals',
      duration: isBn ? '৫ দিন' : '5 days',
      instructions: isBn ? 'ব্যথা বা জ্বর থাকলে' : 'Take when having pain or fever',
    },
  ]);

  const [searchMedQuery, setSearchMedQuery] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());

  const searchResults = useMemo(() => {
    const q = searchMedQuery.toLowerCase().trim();
    if (!q) return mockMedicines.slice(0, 4);
    return mockMedicines
      .filter(
        (m) => m.brandName.toLowerCase().includes(q) || m.genericName.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchMedQuery]);

  const alerts: SafetyAlert[] = useMemo(
    () => checkPrescriptionSafety(medsList.map((m) => m.genericName), allergies),
    [medsList, allergies]
  );

  const blockingAlerts = alerts.filter(
    (a) => a.severity === 'severe' && !acknowledged.has(a.messageEn)
  );

  const handleAddMed = (med: MedicineItem) => {
    setMedsList((prev) => [
      ...prev,
      {
        brandName: med.brandName,
        genericName: med.genericName,
        dosageForm: med.dosageForm,
        strength: med.strength,
        dosage: isBn ? '১+০+১' : '1+0+1',
        timing: isBn ? 'খাবার পর' : 'After meals',
        duration: isBn ? '৭ দিন' : '7 days',
        instructions: '',
      },
    ]);
    setSearchMedQuery('');
  };

  const updateMed = (index: number, patch: Partial<RxLine>) => {
    setMedsList((prev) => prev.map((m, i) => (i === index ? { ...m, ...patch } : m)));
  };

  const handleRemoveMed = (index: number) => {
    setMedsList((prev) => prev.filter((_, i) => i !== index));
  };

  const addAllergy = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || allergies.some((a) => a.toLowerCase() === trimmed.toLowerCase())) return;
    setAllergies((prev) => [...prev, trimmed]);
    setAllergyDraft('');
  };

  const prescriptionNumber = useMemo(
    () => `RX-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    []
  );

  const sheetData: PrescriptionSheetData = {
    prescriptionNumber,
    date: new Date().toLocaleDateString('en-GB'),
    doctorName: isBn ? (currentUser?.nameBn || currentUser?.name || 'ডা. তানভীর হাসান') : (currentUser?.name || currentUser?.nameBn || 'Dr. Tanveer Hassan'),
    doctorDegrees: currentUser?.qualifications || 'MBBS (DMC), FCPS (Medicine)',
    doctorBmdc: currentUser?.bmdcNumber || 'A-54982',
    doctorSpecialty: isBn ? (currentUser?.specialtyBn || 'মেডিসিন ও ডায়াবেটিস বিশেষজ্ঞ') : (currentUser?.specialty || 'Internal Medicine & Diabetes Specialist'),
    chamberName: isBn ? (currentUser?.hospital || 'ল্যাবএইড ডায়াগনস্টিক, ধানমন্ডি') : (currentUser?.hospital || 'LabAid Diagnostic, Dhanmondi'),
    chamberAddress: isBn ? 'বাড়ি ০১, সড়ক ০৪, ধানমন্ডি, ঢাকা-১২০৫' : 'House 01, Road 04, Dhanmondi, Dhaka-1205',
    chamberPhone: '10606',
    patientName,
    patientAge: `${patientAge} ${tr('yrs', 'বছর')}`,
    patientGender,
    vitals: { bp, pulse: `${pulse}/min`, weight: `${weight} kg` },
    chiefComplaints,
    diagnosis,
    medicines: medsList,
    investigations: ['CBC with ESR', 'Serum Creatinine', 'Lipid Profile (fasting)'],
    advice: isBn
      ? ['লবণ কম খাবেন', 'দৈনিক ৩০ মিনিট হাঁটুন', 'নিয়মিত রক্তচাপ মাপুন']
      : ['Limit dietary salt intake', 'Brisk walk 30 mins daily', 'Monitor blood pressure regularly'],
    followUp,
  };

  const handleSaveRx = async (thenPrint: boolean) => {
    setSaveError(null);
    const record: Prescription = {
      id: prescriptionNumber,
      prescriptionNumber,
      patientId: 'local',
      patientName,
      patientNameBn: patientName,
      patientAge: Number(patientAge.replace(/\D/g, '')) || 0,
      patientGender,
      date: new Date().toISOString().slice(0, 10),
      dateBn: new Date().toLocaleDateString('en-GB'),
      doctorName: sheetData.doctorName,
      doctorNameBn: sheetData.doctorName,
      doctorDegrees: sheetData.doctorDegrees,
      doctorBmdc: sheetData.doctorBmdc,
      doctorHospital: sheetData.chamberName,
      chiefComplaints: [chiefComplaints],
      vitals: { bp, pulse, temp: '98.4 F', weight },
      medicines: medsList.map((m, index) => ({
        id: `${prescriptionNumber}-${index}`,
        brandName: m.brandName,
        genericName: m.genericName,
        strength: m.strength,
        dosageForm: m.dosageForm,
        frequency: m.dosage,
        frequencyBn: m.dosage,
        mealTiming: m.timing,
        durationDays: Number(m.duration.replace(/\D/g, '')) || 0,
        durationBn: m.duration,
        specialInstruction: m.instructions,
      })),
      investigations: sheetData.investigations ?? [],
      adviceBn: sheetData.advice ?? [],
      nextFollowUpBn: followUp,
    };

    try {
      await prescriptionApi.save(record);
      setSavedSuccess(true);
      if (thenPrint) {
        window.setTimeout(() => window.print(), 150);
      }
      window.setTimeout(() => setSavedSuccess(false), 4000);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : tr('Save failed', 'সংরক্ষণ ব্যর্থ হয়েছে'));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header & Breadcrumb */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 rounded-3xl border border-border shadow-elevation-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (onBack ? onBack() : setActiveView('dashboard'))}
              className="p-2 rounded-xl bg-paper hover:bg-slate-200 dark:hover:bg-slate-800 text-ink transition-colors btn-press"
              title={tr('Return to Dashboard', 'ড্যাশবোর্ডে ফিরে যান')}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-muted font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  {tr('Dashboard', 'ড্যাশবোর্ড')}
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-blue-600 font-semibold">{tr('Doctor Rx Builder', 'চিকিৎসক প্রেসক্রিপশন বিল্ডার')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5 flex items-center gap-2">
                <span>{tr('Rapid Smart e-Prescription Generator', 'র‌্যাপিড স্মার্ট প্রেসক্রিপশন জেনারেটর')}</span>
                <Sparkles className="w-5 h-5 text-blue-600" />
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSaveRx(false)}
              disabled={blockingAlerts.length > 0}
              className="btn btn-outline btn-sm"
            >
              <Save className="w-4 h-4" />
              <span>{tr('Save Prescription', 'সংরক্ষণ')}</span>
            </button>
            <button
              onClick={() => handleSaveRx(true)}
              disabled={blockingAlerts.length > 0}
              title={
                blockingAlerts.length > 0
                  ? tr('Resolve severe clinical alerts before printing', 'গুরুতর সতর্কতা সমাধান বা স্বীকার না করা পর্যন্ত প্রিন্ট করা যাবে না')
                  : tr('Save & Print A4 Sheet / PDF', 'A4 প্রেসক্রিপশন প্রিন্ট বা PDF সংরক্ষণ')
              }
              className="btn btn-primary btn-sm shadow-elevation-1"
            >
              <Printer className="w-4 h-4" />
              <span>{tr('Save & Print A4 / PDF', 'সংরক্ষণ ও A4 প্রিন্ট / PDF')}</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {savedSuccess && (
        <div className="no-print p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 flex items-center gap-3 animate-slide-down">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold">{tr('Prescription successfully saved to health vault.', 'প্রেসক্রিপশন রোগীর ভল্টে সংরক্ষিত হয়েছে।')}</span>
        </div>
      )}

      {saveError && (
        <div className="no-print p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-100 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="text-xs font-bold">{saveError}</span>
        </div>
      )}

      {/* Clinical safety screen */}
      <div className="no-print">
        {alerts.length === 0 ? (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-emerald-900 dark:text-emerald-100">
              {tr('No drug interactions or allergy conflicts detected.', 'কোনো ড্রাগ ইন্টার‌্যাকশন বা অ্যালার্জি সংঘাত পাওয়া যায়নি।')}
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((alert) => {
              const isSevere = alert.severity === 'severe';
              const isAcknowledged = acknowledged.has(alert.messageEn);
              return (
                <div
                  key={`${alert.kind}-${alert.messageEn}`}
                  role="alert"
                  className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
                    isAcknowledged
                      ? 'bg-paper border-border opacity-70'
                      : isSevere
                      ? 'bg-red-50 dark:bg-red-950/25 border-red-300 dark:border-red-800'
                      : 'bg-amber-50 dark:bg-amber-950/25 border-amber-300 dark:border-amber-800'
                  }`}
                >
                  <ShieldAlert
                    className={`w-4 h-4 shrink-0 mt-0.5 ${isSevere ? 'text-red-600' : 'text-amber-600'}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wide ${
                          isSevere ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
                        }`}
                      >
                        {isSevere ? tr('Severe', 'গুরুতর') : tr('Moderate', 'মাঝারি')}
                      </span>
                      <span className="text-[10px] font-bold text-muted uppercase">
                        {alert.kind === 'allergy' ? tr('Allergy', 'অ্যালার্জি') : tr('Interaction', 'ইন্টার‌্যাকশন')}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-ink">
                        {alert.drugs.join(' + ')}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-ink mt-1 leading-snug">
                      {isBn ? alert.messageBn : alert.messageEn}
                    </p>
                  </div>

                  {isSevere && !isAcknowledged && (
                    <button
                      onClick={() =>
                        setAcknowledged((prev) => new Set(prev).add(alert.messageEn))
                      }
                      className="shrink-0 px-2.5 py-1 rounded-lg bg-surface border border-red-300 dark:border-red-800 text-[10px] font-bold text-red-700 dark:text-red-300 hover:bg-red-100 transition-colors"
                      title={tr('Override and acknowledge risk', 'ঝুঁকি জেনেও প্রেসক্রাইব করছি')}
                    >
                      {tr('Acknowledge & Proceed', 'স্বীকার করে এগোন')}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2-Column Builder Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: input forms */}
        <div className="no-print lg:col-span-6 space-y-5">
          {/* Patient details & vitals */}
          <div className="card card-pad space-y-4 text-xs">
            <h2 className="font-bold text-ink text-sm flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" />
              <span>{tr('Patient Vitals & Demographics', 'রোগীর তথ্য ও ভাইটালস')}</span>
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="rx-name" className="block text-muted mb-1">
                  {tr('Patient Name:', 'রোগীর নাম:')}
                </label>
                <input
                  id="rx-name"
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border font-bold text-ink"
                />
              </div>
              <div>
                <label htmlFor="rx-age" className="block text-muted mb-1">
                  {tr('Age:', 'বয়স:')}
                </label>
                <input
                  id="rx-age"
                  type="text"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border font-mono font-bold text-ink"
                />
              </div>
              <div>
                <label htmlFor="rx-sex" className="block text-muted mb-1">
                  {tr('Gender:', 'লিঙ্গ:')}
                </label>
                <select
                  id="rx-sex"
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border font-bold text-ink"
                >
                  <option value={isBn ? 'পুরুষ' : 'Male'}>{tr('Male', 'পুরুষ')}</option>
                  <option value={isBn ? 'মহিলা' : 'Female'}>{tr('Female', 'মহিলা')}</option>
                  <option value={isBn ? 'শিশু' : 'Child'}>{tr('Child', 'শিশু')}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="rx-bp" className="block text-muted mb-1">
                  {tr('Blood Pressure (BP):', 'রক্তচাপ (BP):')}
                </label>
                <input
                  id="rx-bp"
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full p-2 rounded-xl bg-paper border border-border font-mono text-ink"
                />
              </div>
              <div>
                <label htmlFor="rx-pulse" className="block text-muted mb-1">
                  {tr('Pulse:', 'পালস:')}
                </label>
                <input
                  id="rx-pulse"
                  type="text"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full p-2 rounded-xl bg-paper border border-border font-mono text-ink"
                />
              </div>
              <div>
                <label htmlFor="rx-weight" className="block text-muted mb-1">
                  {tr('Weight (kg):', 'ওজন (kg):')}
                </label>
                <input
                  id="rx-weight"
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 rounded-xl bg-paper border border-border font-mono text-ink"
                />
              </div>
            </div>

            <div>
              <label htmlFor="rx-cc" className="block text-muted mb-1">
                {tr('Chief Complaints (C/C):', 'রোগীর অভিযোগ (C/C):')}
              </label>
              <input
                id="rx-cc"
                type="text"
                value={chiefComplaints}
                onChange={(e) => setChiefComplaints(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-paper border border-border text-ink"
              />
            </div>

            <div>
              <label htmlFor="rx-dx" className="block text-muted mb-1">
                {tr('Diagnosis:', 'রোগ নির্ণয় (Provisional Diagnosis):')}
              </label>
              <input
                id="rx-dx"
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-paper border border-border font-semibold text-blue-700 dark:text-blue-300"
              />
            </div>

            <div>
              <label htmlFor="rx-followup" className="block text-muted mb-1">
                {tr('Next Follow-up:', 'পরবর্তী সাক্ষাৎ:')}
              </label>
              <input
                id="rx-followup"
                type="text"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-paper border border-border text-ink"
              />
            </div>
          </div>

          {/* Recorded allergies — feeds the safety screen */}
          <div className="card card-pad space-y-3 text-xs">
            <h2 className="font-bold text-ink text-sm flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>{tr('Known Allergies:', 'রোগীর অ্যালার্জি রেকর্ড')}</span>
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {allergies.map((allergy) => (
                <span
                  key={allergy}
                  className="pill pill-error text-xs"
                >
                  {allergy}
                  <button
                    onClick={() => setAllergies((prev) => prev.filter((a) => a !== allergy))}
                    aria-label={`Remove ${allergy}`}
                    className="hover:text-red-950 dark:hover:text-white ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {allergies.length === 0 && (
                <span className="text-[11px] text-muted">
                  {tr('No known drug allergies (NKDA)', 'কোনো অ্যালার্জি লিপিবদ্ধ নেই (NKDA)')}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {COMMON_ALLERGIES.filter((a) => !allergies.includes(a)).map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => addAllergy(allergy)}
                  className="pill bg-paper hover:bg-slate-200 text-muted hover:text-ink text-xs transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  {allergy}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={allergyDraft}
                onChange={(e) => setAllergyDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addAllergy(allergyDraft);
                  }
                }}
                placeholder={tr('Type other allergy and press Enter...', 'অন্য অ্যালার্জি লিখে Enter চাপুন')}
                aria-label="Add allergy"
                className="flex-1 p-2.5 rounded-xl bg-paper border border-border text-ink"
              />
              <button
                onClick={() => addAllergy(allergyDraft)}
                className="btn btn-outline btn-sm"
              >
                {tr('Add', 'যোগ')}
              </button>
            </div>
          </div>

          {/* Drug search & add */}
          <div className="card card-pad space-y-3 text-xs">
            <h2 className="font-bold text-ink text-sm flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-blue-600" />
              <span>{tr('Prescribed Medications (Rx):', 'ওষুধ দ্রুত সংযোজন (Smart Drug Search)')}</span>
            </h2>

            <div className="relative">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={tr('Search brand or generic name (e.g. Napa, Sergel, Moxacil)...', 'ব্র্যান্ড বা জেনেরিক নাম (যেমন: Napa, Sergel, Moxacil)...')}
                value={searchMedQuery}
                onChange={(e) => setSearchMedQuery(e.target.value)}
                aria-label="Search medicine"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-paper border border-border text-ink"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {searchResults.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleAddMed(m)}
                  className="p-2.5 rounded-xl border border-border hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 text-left transition-all flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-ink block truncate">
                      {m.brandName}
                    </span>
                    <span className="text-[10px] text-muted truncate block">
                      {m.genericName} ({m.strength})
                    </span>
                  </div>
                  <Plus className="w-4 h-4 text-blue-600 shrink-0" />
                </button>
              ))}
              {searchResults.length === 0 && (
                <p className="col-span-2 text-[11px] text-muted py-2">
                  {tr('No medicine found.', 'কোনো ওষুধ পাওয়া যায়নি।')}
                </p>
              )}
            </div>
          </div>

          {/* Per-drug dosing */}
          <div className="card card-pad space-y-3 text-xs">
            <h2 className="font-bold text-ink text-sm">
              {tr('Dose & Regimen Schedule', 'ডোজ ও সময়সূচি')} ({num(medsList.length)} {tr('drugs', 'টি ওষুধ')})
            </h2>

            {medsList.map((med, index) => (
              <div
                key={`${med.brandName}-${index}`}
                className="p-3 rounded-2xl bg-paper border border-border space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-bold text-ink">
                      {num(index + 1)}. {med.dosageForm}. {med.brandName}
                    </span>
                    <span className="text-[10px] text-muted font-mono ml-1">
                      {med.genericName} {med.strength}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveMed(index)}
                    className="text-red-400 hover:text-red-600 p-1 shrink-0"
                    aria-label={`Delete ${med.brandName}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={med.dosage}
                    onChange={(e) => updateMed(index, { dosage: e.target.value })}
                    aria-label="Dosage"
                    className="p-2 rounded-lg bg-surface border border-border font-mono font-bold text-ink"
                  >
                    {frequencies.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </select>
                  <select
                    value={med.timing}
                    onChange={(e) => updateMed(index, { timing: e.target.value })}
                    aria-label="Timing"
                    className="p-2 rounded-lg bg-surface border border-border text-ink"
                  >
                    {timings.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={med.duration}
                    onChange={(e) => updateMed(index, { duration: e.target.value })}
                    aria-label="Duration"
                    className="p-2 rounded-lg bg-surface border border-border text-ink"
                  />
                </div>
              </div>
            ))}

            {medsList.length === 0 && (
              <p className="text-[11px] text-muted">
                {tr('Search and select drugs above to add to prescription.', 'উপরের সার্চ থেকে ওষুধ যোগ করুন।')}
              </p>
            )}
          </div>
        </div>

        {/* Right: exact sheet that will print */}
        <div className="lg:col-span-6">
          <div className="no-print mb-2 flex items-center gap-2 text-[11px] font-bold text-muted">
            <Printer className="w-3.5 h-3.5 text-blue-600" />
            <span>{tr('Live A4 Prescription Preview — Print / PDF mirror', 'A4 প্রিন্ট প্রিভিউ — যা দেখছেন হুবহু তাই প্রিন্ট হবে')}</span>
          </div>
          <div className="bg-white rounded-3xl border border-border shadow-elevation-2 p-4 overflow-auto max-h-[80vh]">
            <PrescriptionSheet data={sheetData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapidPrescriptionBuilderPage;
