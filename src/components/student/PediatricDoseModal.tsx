import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Calculator,
  Baby,
  Pill,
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';

interface PediatricDoseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PediatricDoseModal: React.FC<PediatricDoseModalProps> = ({ isOpen, onClose }) => {
  const { toBn } = useLanguage();
  const [weightKg, setWeightKg] = useState<number>(10);
  const [selectedDrug, setSelectedDrug] = useState<'paracetamol' | 'amoxicillin' | 'azithromycin' | 'salbutamol' | 'zinc'>('paracetamol');

  if (!isOpen) return null;

  const calculateDose = () => {
    switch (selectedDrug) {
      case 'paracetamol': {
        // 15 mg/kg/dose. Standard Syrup: 120mg/5ml (24mg/ml). Drops: 80mg/0.8ml (100mg/ml).
        const mgDose = weightKg * 15;
        const syrupMl = (mgDose / 24).toFixed(1);
        const dropsMl = (mgDose / 100).toFixed(1);
        const spoon = (Number(syrupMl) / 5).toFixed(1);
        return {
          drugName: 'Paracetamol (প্যারাসিটামল)',
          standardRule: '15 mg/kg/dose (৪-৬ ঘণ্টা পর পর, সর্বোচ্চ ৪ বার/দিন)',
          totalMg: `${mgDose.toFixed(0)} mg`,
          syrup: `Syr. Napa/Ace (120mg/5ml): ${toBn(syrupMl)} ml (প্রায় ${toBn(spoon)} চা চামচ)`,
          drops: `Pediatric Drops (80mg/0.8ml): ${toBn(dropsMl)} ml (${toBn(Math.round(Number(dropsMl) * 20))} ফোঁটা)`,
          warning: '২৪ ঘণ্টায় কোনো অবস্থাতেই ৬০ mg/kg এর বেশি দেওয়া যাবে না।'
        };
      }
      case 'amoxicillin': {
        // 45 mg/kg/day divided 8 hourly. Standard syrup: 125mg/5ml (25mg/ml) or 250mg/5ml (50mg/ml)
        const dailyMg = weightKg * 45;
        const singleDoseMg = dailyMg / 3;
        const syrupMl = (singleDoseMg / 25).toFixed(1);
        const forteMl = (singleDoseMg / 50).toFixed(1);
        return {
          drugName: 'Amoxicillin (এমোক্সিসিলিন)',
          standardRule: '45 mg/kg/day (৩ ভাগে বিভক্ত - প্রতি ৮ ঘণ্টা পর পর ৭ দিন)',
          totalMg: `প্রতি ডোজে ${singleDoseMg.toFixed(0)} mg`,
          syrup: `Syr. Moxacil/Fimoxyl (125mg/5ml): ${toBn(syrupMl)} ml (প্রতি ৮ ঘণ্টায়)`,
          drops: `Syr. Forte (250mg/5ml): ${toBn(forteMl)} ml (প্রতি ৮ ঘণ্টায়)`,
          warning: 'অ্যান্টিবায়োটিক কোর্স সম্পূর্ণ শেষ করতে হবে।'
        };
      }
      case 'azithromycin': {
        // 10 mg/kg/day once daily for 3-5 days. Standard suspension: 200mg/5ml (40mg/ml)
        const dailyMg = weightKg * 10;
        const suspMl = (dailyMg / 40).toFixed(1);
        return {
          drugName: 'Azithromycin (এজিথ্রোমাইসিন)',
          standardRule: '10 mg/kg once daily for 3–5 days (দিনে ১ বার)',
          totalMg: `দৈনিক ${dailyMg.toFixed(0)} mg`,
          syrup: `Susp. Zithrox/Tridosil (200mg/5ml): ${toBn(suspMl)} ml (দিনে ১ বার খাবার ১ ঘণ্টা আগে)`,
          drops: `খাবার ১ ঘণ্টা আগে অথবা ২ ঘণ্টা পর খালি পেটে সেব্য।`,
          warning: 'কার্ডিয়াক বা এরিদমিয়ার ইতিহাস থাকলে সতর্ক থাকুন।'
        };
      }
      case 'salbutamol': {
        // 0.15 mg/kg/dose TDS. Syrup: 2mg/5ml (0.4mg/ml)
        const singleMg = weightKg * 0.15;
        const syrupMl = (singleMg / 0.4).toFixed(1);
        return {
          drugName: 'Salbutamol (সালবুটামল)',
          standardRule: '0.15 mg/kg/dose TDS (৮ ঘণ্টা পর পর)',
          totalMg: `প্রতি ডোজে ${singleMg.toFixed(1)} mg`,
          syrup: `Syr. Ventolin/Windel (2mg/5ml): ${toBn(syrupMl)} ml (দিনে ৩ বার)`,
          drops: `তীব্র শ্বাসকষ্টে নেবুলাইজার বা ইনহেলার স্পেসার অধিক কার্যকর।`,
          warning: 'হার্টবিট বেড়ে যাওয়া বা বুক ধড়ফড় করতে পারে।'
        };
      }
      case 'zinc': {
        return {
          drugName: 'Zinc Sulfate (জিঙ্ক সালফেট - ডায়রিয়া ব্যবস্থাপনা)',
          standardRule: 'শিশু ৬ মাসের কম: 10 mg/day, শিশু ৬ মাসের বেশি: 20 mg/day (১৪ দিন)',
          totalMg: weightKg < 6 ? '10 mg/day' : '20 mg/day',
          syrup: `Syr. Baby Zinc / Zif-S (10mg/5ml): ${weightKg < 6 ? '৫ ml' : '১০ ml'} দিনে ১ বার`,
          drops: `টানা ১৪ দিন খাওয়াতে হবে যা ডায়রিয়ার পুনরাবৃত্তি রোধ করে।`,
          warning: 'খাবারের সাথে বা খাবার পরে খাওয়ালে বমির ভাব কম হয়।'
        };
      }
    }
  };

  const result = calculateDose();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto font-bangla">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[92vh] animate-slide-up">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">পেডিয়াট্রিক mg/kg ওজনভিত্তিক ডোজ ক্যালকুলেটর</h2>
              <p className="text-xs text-amber-100">
                ইন্টার্ন ও মেডিকেল শিক্ষার্থীদের জন্য দ্রুত ও নিখুঁত শিশু ডোজ হিসেব
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Weight Input Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-amber-700" />
                <span>শিশুর সঠিক শারীরিক ওজন (Weight in kg):</span>
              </label>
              <span className="text-xl font-black text-amber-700 font-mono">
                {toBn(weightKg)} কেজি
              </span>
            </div>

            <input
              type="range"
              min="2"
              max="40"
              step="0.5"
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value))}
              className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />

            <div className="flex justify-between text-[10px] text-amber-800 font-mono">
              <span>২ কেজি (নবজাতক)</span>
              <span>১০ কেজি (~১ বছর)</span>
              <span>২০ কেজি (~৫ বছর)</span>
              <span>৪০ কেজি (~১২ বছর)</span>
            </div>
          </div>

          {/* Drug Selection Pills */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">ওষুধ নির্বাচন করুন:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'paracetamol', label: 'Paracetamol (জ্বর/ব্যথা)' },
                { id: 'amoxicillin', label: 'Amoxicillin (অ্যান্টিবায়োটিক)' },
                { id: 'azithromycin', label: 'Azithromycin (অ্যাজিথ্রো)' },
                { id: 'salbutamol', label: 'Salbutamol (কাশি/হাঁপানি)' },
                { id: 'zinc', label: 'Zinc (ডায়রিয়া প্রটোকল)' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDrug(d.id as any)}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    selectedDrug === d.id
                      ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calculated Output Card */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3 shadow-md">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  নির্ধারিত ফলাফল
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{result.drugName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{result.standardRule}</p>
              </div>
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-mono font-black">
                {toBn(result.totalMg)}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-200">
              <div className="p-2.5 rounded-xl bg-slate-800/80 flex items-center gap-2">
                <span className="text-amber-400 font-bold">🥄 সিরাপ ডোজ:</span>
                <span className="font-semibold text-white">{result.syrup}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/80 flex items-center gap-2">
                <span className="text-teal-400 font-bold">💧 বিকল্প/ড্রপস:</span>
                <span className="text-slate-300">{result.drops}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-[11px] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{result.warning}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
