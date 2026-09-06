import React, { useState } from 'react';
import { AlertTriangle, Baby, Calculator, Droplets, Info, Syringe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  PEDIATRIC_DRUGS,
  calculatePediatricDose,
  type PediatricDrugId,
} from '../../lib/clinical';

/** Reference weights, so a student can sanity-check the age against the weight. */
const AGE_MARKERS: { months: number; labelBn: string; labelEn: string; approxKg: number }[] = [
  { months: 1, labelBn: 'নবজাতক', labelEn: 'Neonate', approxKg: 4 },
  { months: 6, labelBn: '৬ মাস', labelEn: '6 mos', approxKg: 7.5 },
  { months: 12, labelBn: '১ বছর', labelEn: '1 yr', approxKg: 10 },
  { months: 36, labelBn: '৩ বছর', labelEn: '3 yrs', approxKg: 14 },
  { months: 60, labelBn: '৫ বছর', labelEn: '5 yrs', approxKg: 18 },
  { months: 96, labelBn: '৮ বছর', labelEn: '8 yrs', approxKg: 25 },
  { months: 144, labelBn: '১২ বছর', labelEn: '12 yrs', approxKg: 38 },
];

/**
 * Weight- and age-based paediatric dosing.
 *
 * All arithmetic lives in `lib/clinical.ts` and is unit tested; this component
 * only presents it. The output deliberately shows every stocked preparation at
 * once — the point of the tool is that a house officer can read off whichever
 * bottle the pharmacy actually handed the family.
 */
export const PediatricDoseCalculator: React.FC = () => {
  const { tr, num, isBn } = useLanguage();
  const [weightKg, setWeightKg] = useState(12);
  const [ageMonths, setAgeMonths] = useState(36);
  const [drugId, setDrugId] = useState<PediatricDrugId>('paracetamol');

  const result = calculatePediatricDose(drugId, weightKg, ageMonths);
  const { drug } = result;

  const ageLabel = isBn
    ? ageMonths < 12
      ? `${num(ageMonths)} মাস`
      : `${num(Math.floor(ageMonths / 12))} বছর ${ageMonths % 12 ? `${num(ageMonths % 12)} মাস` : ''}`
    : ageMonths < 12
    ? `${ageMonths} months`
    : `${Math.floor(ageMonths / 12)} yrs ${ageMonths % 12 ? `${ageMonths % 12} mos` : ''}`;

  /** Weight expected for this age, to flag an obvious data-entry slip. */
  const expectedKg = AGE_MARKERS.reduce((closest, marker) =>
    Math.abs(marker.months - ageMonths) < Math.abs(closest.months - ageMonths) ? marker : closest
  ).approxKg;
  const weightLooksOff = weightKg < expectedKg * 0.55 || weightKg > expectedKg * 1.9;

  return (
    <div className="space-y-5 font-sans">
      {/* Weight and age */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="dose-weight" className="text-xs font-bold text-blue-950 dark:text-blue-100 flex items-center gap-1.5">
              <Baby className="w-4 h-4" />
              <span>{tr('Weight (kg)', 'ওজন (kg)')}</span>
            </label>
            <input
              id="dose-weight-number"
              type="number"
              min={1}
              max={60}
              step={0.1}
              value={weightKg}
              onChange={(e) =>
                setWeightKg(Math.min(60, Math.max(1, parseFloat(e.target.value) || 1)))
              }
              aria-label={tr('Child weight in kilograms', 'শিশুর ওজন কিলোগ্রামে')}
              className="w-24 p-1.5 text-right rounded-lg bg-surface border border-blue-300 dark:border-blue-700 text-lg font-black font-mono text-blue-700 dark:text-blue-300"
            />
          </div>

          <input
            id="dose-weight"
            type="range"
            min={1}
            max={60}
            step={0.1}
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value))}
            aria-label={tr('Weight slider', 'ওজন স্লাইডার')}
            className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-blue-800 dark:text-blue-300 font-mono font-bold">
            <span>{num(1)} kg</span>
            <span>{num(30)} kg</span>
            <span>{num(60)} kg</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-paper border border-border space-y-3">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="dose-age" className="text-xs font-bold text-ink flex items-center gap-1.5">
              <Info className="w-4 h-4" />
              <span>{tr('Age', 'বয়স')}</span>
            </label>
            <span className="text-lg font-black font-mono text-ink">{ageLabel}</span>
          </div>

          <input
            id="dose-age"
            type="range"
            min={1}
            max={168}
            step={1}
            value={ageMonths}
            onChange={(e) => setAgeMonths(parseInt(e.target.value, 10))}
            aria-label={tr('Age slider in months', 'বয়স স্লাইডার (মাসে)')}
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex flex-wrap gap-1">
            {AGE_MARKERS.map((marker) => (
              <button
                key={marker.months}
                onClick={() => {
                  setAgeMonths(marker.months);
                  setWeightKg(marker.approxKg);
                }}
                className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-surface border border-border text-muted hover:text-ink hover:border-blue-500"
              >
                {isBn ? marker.labelBn : marker.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {weightLooksOff && (
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/25 border border-amber-300 dark:border-amber-800 flex items-start gap-2 text-[11px] text-amber-900 dark:text-amber-100">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
          <span>
            {tr(
              `Expected weight at this age is ~${expectedKg} kg. Please re-check weight — inaccurate weight leads to incorrect dose.`,
              `এই বয়সে সাধারণত ~${num(expectedKg)} kg প্রত্যাশিত। ওজন আবার যাচাই করুন — ভুল ওজনে ডোজও ভুল হবে।`
            )}
          </span>
        </div>
      )}

      {/* Drug selection */}
      <div>
        <span className="text-xs font-bold text-ink block mb-2">
          {tr('Select Medication:', 'ওষুধ নির্বাচন করুন:')}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          {Object.values(PEDIATRIC_DRUGS).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setDrugId(option.id)}
              aria-pressed={drugId === option.id}
              className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                drugId === option.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-paper border-border text-ink hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {isBn ? option.nameBn : option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Result Card */}
      <div className="card card-pad bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-ink space-y-4 shadow-elevation-1">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
          <div>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block">
              {tr('Calculated Dose Result', 'নির্ধারিত ডোজ ফলাফল')}
            </span>
            <h3 className="text-base font-bold text-ink mt-0.5">
              {isBn ? `${drug.name} — ${drug.nameBn}` : drug.name}
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {isBn ? drug.ruleBn : drug.ruleEn || drug.ruleBn}
            </p>
          </div>

          {drug.mgPerKg > 0 && (
            <div className="text-right">
              <div className="px-3 py-1 bg-blue-600 text-white rounded-xl text-sm font-mono font-black shadow-xs">
                {num(result.singleDoseMg)} mg / {tr('dose', 'ডোজ')}
              </div>
              <div className="text-[10px] text-muted font-mono mt-1">
                {tr('Daily total', 'দৈনিক মোট')} {num(result.dailyDoseMg)} mg ({num(drug.dosesPerDay)} {tr('times/day', 'বার')})
              </div>
            </div>
          )}
        </div>

        {result.cappedByCeiling && (
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              {tr(
                'Calculated dose exceeded adult ceiling — capped at maximum adult single dose.',
                'হিসাবকৃত ডোজ সর্বোচ্চ সীমা ছাড়িয়ে গিয়েছিল — প্রাপ্তবয়স্কের সর্বোচ্চ ডোজে সীমাবদ্ধ করা হয়েছে।'
              )}
            </span>
          </div>
        )}

        {(isBn ? result.fixedRegimenBn : (result.fixedRegimenEn || result.fixedRegimenBn)) ? (
          <div className="p-3 rounded-xl bg-surface border border-border flex items-start gap-2.5 text-xs text-ink shadow-2xs">
            <Droplets className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span className="font-semibold text-ink">
              {isBn ? result.fixedRegimenBn : (result.fixedRegimenEn || result.fixedRegimenBn)}
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider">
              {tr('Dose Volumes by Available Preparation', 'বাজারে প্রাপ্ত প্রস্তুতি অনুযায়ী পরিমাণ')}
            </span>
            {result.volumes.map((volume) => (
              <div
                key={volume.preparation.label}
                className="p-3 rounded-xl bg-surface border border-border flex flex-wrap items-center justify-between gap-2 text-xs text-ink shadow-2xs"
              >
                <div className="min-w-0">
                  <div className="font-bold text-ink">{volume.preparation.label}</div>
                  <div className="text-[10px] text-muted">{volume.preparation.brands}</div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 border border-blue-200 dark:border-blue-800 font-black">
                    {num(volume.ml)} ml
                  </span>
                  <span className="text-muted text-[11px]">
                    ≈ {num(volume.teaspoons)} {tr('teaspoons', 'চা চামচ')}
                  </span>
                  {volume.drops !== undefined && (
                    <span className="text-muted text-[11px] flex items-center gap-1">
                      <Syringe className="w-3 h-3 text-blue-600" />
                      {num(volume.drops)} {tr('drops', 'ফোঁটা')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-[11px] flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{isBn ? drug.warningBn : (drug.warningEn || drug.warningBn)}</span>
        </div>

        <p className="text-[10px] text-muted flex items-start gap-1.5">
          <Calculator className="w-3 h-3 text-muted shrink-0 mt-0.5" />
          {tr(
            'Clinical decision support tool for students — verify with senior medical officer before prescribing.',
            'শিক্ষার্থীদের হিসাব যাচাইয়ের সহায়ক টুল — প্রেসক্রাইব করার আগে সিনিয়র চিকিৎসকের অনুমোদন নিন।'
          )}
        </p>
      </div>
    </div>
  );
};
