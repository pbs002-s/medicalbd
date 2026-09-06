/**
 * Pure clinical calculations and safety rules.
 *
 * Everything here is side-effect free and framework free so the rules that
 * actually matter clinically can be unit tested without a DOM. UI components
 * call into this module rather than re-deriving the maths inline.
 */

/* ------------------------------------------------------------------ *
 * Bengali numerals
 * ------------------------------------------------------------------ */

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'] as const;

/** Convert every ASCII digit in `input` to its Bengali equivalent. */
export const toBnDigits = (input: number | string): string =>
  String(input).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

/* ------------------------------------------------------------------ *
 * Paediatric dosing
 * ------------------------------------------------------------------ */

export type PediatricDrugId =
  | 'paracetamol'
  | 'amoxicillin'
  | 'azithromycin'
  | 'salbutamol'
  | 'cefixime'
  | 'zinc'
  | 'ors';

/** A liquid preparation available on the Bangladeshi market. */
export interface Preparation {
  /** e.g. "Syrup 120mg/5ml" */
  label: string;
  /** Representative local brands. */
  brands: string;
  /** Milligrams of active drug per millilitre. */
  mgPerMl: number;
  /** Drops per ml, when the preparation is a paediatric dropper. */
  dropsPerMl?: number;
}

export interface PediatricDrug {
  id: PediatricDrugId;
  name: string;
  nameBn: string;
  /** How the reference dose is expressed. */
  basis: 'per_dose' | 'per_day';
  /** mg per kg, interpreted according to `basis`. */
  mgPerKg: number;
  /** Number of administrations in 24 hours. */
  dosesPerDay: number;
  /** Hard ceiling on the 24 hour total, mg/kg. */
  maxMgPerKgPerDay?: number;
  /** Absolute ceiling for a single dose, mg (the adult dose). */
  maxSingleDoseMg?: number;
  ruleBn: string;
  ruleEn?: string;
  preparations: Preparation[];
  warningBn: string;
  warningEn?: string;
  /** Fixed, non weight-based regimen (zinc, ORS); replaces the mg/kg maths. */
  fixedBn?: (weightKg: number, ageMonths: number) => string;
  fixedEn?: (weightKg: number, ageMonths: number) => string;
}

export const PEDIATRIC_DRUGS: Record<PediatricDrugId, PediatricDrug> = {
  paracetamol: {
    id: 'paracetamol',
    name: 'Paracetamol',
    nameBn: 'প্যারাসিটামল (জ্বর/ব্যথা)',
    basis: 'per_dose',
    mgPerKg: 15,
    dosesPerDay: 4,
    maxMgPerKgPerDay: 60,
    maxSingleDoseMg: 1000,
    ruleBn: '১৫ mg/kg/dose, ৪–৬ ঘণ্টা পর পর (সর্বোচ্চ ৪ বার/দিন)',
    ruleEn: '15 mg/kg/dose every 4-6 hours (max 4 times/day)',
    preparations: [
      { label: 'Syrup 120mg/5ml', brands: 'Napa, Ace, Fast', mgPerMl: 24 },
      { label: 'Suspension 250mg/5ml', brands: 'Napa Forte, Ace Plus', mgPerMl: 50 },
      { label: 'Drops 80mg/0.8ml', brands: 'Napa Drops, Ace Drops', mgPerMl: 100, dropsPerMl: 20 },
    ],
    warningBn: '২৪ ঘণ্টায় কোনো অবস্থাতেই ৬০ mg/kg এর বেশি নয় — হেপাটোটক্সিসিটির ঝুঁকি।',
    warningEn: 'Do not exceed 60 mg/kg in 24 hours — risk of severe hepatotoxicity.',
  },
  amoxicillin: {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    nameBn: 'এমোক্সিসিলিন (অ্যান্টিবায়োটিক)',
    basis: 'per_day',
    mgPerKg: 45,
    dosesPerDay: 3,
    maxSingleDoseMg: 500,
    ruleBn: '৪৫ mg/kg/day, ৩ ভাগে বিভক্ত (প্রতি ৮ ঘণ্টা), ৭ দিন',
    ruleEn: '45 mg/kg/day divided in 3 doses (every 8 hours) for 7 days',
    preparations: [
      { label: 'Syrup 125mg/5ml', brands: 'Moxacil, Fimoxyl', mgPerMl: 25 },
      { label: 'Syrup Forte 250mg/5ml', brands: 'Moxacil DS, Amoxin DS', mgPerMl: 50 },
      { label: 'Drops 100mg/ml', brands: 'Moxacil Drops', mgPerMl: 100, dropsPerMl: 20 },
    ],
    warningBn: 'পেনিসিলিন অ্যালার্জি থাকলে সম্পূর্ণ নিষিদ্ধ। কোর্স শেষ করতে হবে।',
    warningEn: 'Strictly contraindicated in penicillin allergy. Complete full course.',
  },
  azithromycin: {
    id: 'azithromycin',
    name: 'Azithromycin',
    nameBn: 'এজিথ্রোমাইসিন',
    basis: 'per_day',
    mgPerKg: 10,
    dosesPerDay: 1,
    maxSingleDoseMg: 500,
    ruleBn: '১০ mg/kg দিনে ১ বার, ৩–৫ দিন (খালি পেটে)',
    ruleEn: '10 mg/kg once daily for 3-5 days (on empty stomach)',
    preparations: [
      { label: 'Suspension 200mg/5ml', brands: 'Zithrox, Tridosil', mgPerMl: 40 },
      { label: 'Suspension 100mg/5ml', brands: 'Azithrocin', mgPerMl: 20 },
    ],
    warningBn: 'QT প্রলম্বন বা কার্ডিয়াক এরিদমিয়ার ইতিহাস থাকলে সতর্কতা।',
    warningEn: 'Caution in patients with history of QT prolongation or cardiac arrhythmia.',
  },
  salbutamol: {
    id: 'salbutamol',
    name: 'Salbutamol',
    nameBn: 'সালবুটামল (হাঁপানি/কাশি)',
    basis: 'per_dose',
    mgPerKg: 0.15,
    dosesPerDay: 3,
    maxSingleDoseMg: 4,
    ruleBn: '০.১৫ mg/kg/dose, দিনে ৩ বার (৮ ঘণ্টা পর পর)',
    ruleEn: '0.15 mg/kg/dose, 3 times daily (every 8 hours)',
    preparations: [{ label: 'Syrup 2mg/5ml', brands: 'Ventolin, Windel', mgPerMl: 0.4 }],
    warningBn: 'ট্যাকিকার্ডিয়া ও কম্পন হতে পারে। তীব্র শ্বাসকষ্টে নেবুলাইজার বা স্পেসার অগ্রাধিকার।',
    warningEn: 'May cause tachycardia and tremor. Use nebulizer or spacer in severe distress.',
  },
  cefixime: {
    id: 'cefixime',
    name: 'Cefixime',
    nameBn: 'সেফিক্সিম',
    basis: 'per_day',
    mgPerKg: 8,
    dosesPerDay: 2,
    maxSingleDoseMg: 200,
    ruleBn: '৮ mg/kg/day, ২ ভাগে বিভক্ত (প্রতি ১২ ঘণ্টা)',
    ruleEn: '8 mg/kg/day divided in 2 doses (every 12 hours)',
    preparations: [{ label: 'Suspension 100mg/5ml', brands: 'Cef-3, Denvar', mgPerMl: 20 }],
    warningBn: 'সেফালোস্পোরিন ও পেনিসিলিন ক্রস-অ্যালার্জি যাচাই করুন।',
    warningEn: 'Check for cephalosporin and penicillin cross-allergy.',
  },
  zinc: {
    id: 'zinc',
    name: 'Zinc Sulfate',
    nameBn: 'জিঙ্ক সালফেট (ডায়রিয়া প্রটোকল)',
    basis: 'per_day',
    mgPerKg: 0,
    dosesPerDay: 1,
    ruleBn: 'WHO প্রটোকল: ৬ মাসের কম ১০ mg/day, ৬ মাসের বেশি ২০ mg/day — টানা ১৪ দিন',
    ruleEn: 'WHO Protocol: Under 6 months 10 mg/day, Over 6 months 20 mg/day for 14 days',
    preparations: [{ label: 'Syrup 10mg/5ml', brands: 'Baby Zinc, Zif-S', mgPerMl: 2 }],
    warningBn: 'খাবারের সাথে দিলে বমির ভাব কম হয়। ১৪ দিনের কোর্স বাধ্যতামূলক।',
    warningEn: 'Administer with meals to avoid nausea. 14-day full course is mandatory.',
    fixedBn: (_w, ageMonths) =>
      ageMonths < 6 ? '১০ mg দিনে ১ বার (৫ ml), ১৪ দিন' : '২০ mg দিনে ১ বার (১০ ml), ১৪ দিন',
    fixedEn: (_w, ageMonths) =>
      ageMonths < 6 ? '10 mg once daily (5 ml) for 14 days' : '20 mg once daily (10 ml) for 14 days',
  },
  ors: {
    id: 'ors',
    name: 'ORS (low osmolarity)',
    nameBn: 'ওরস্যালাইন (পানিশূন্যতা)',
    basis: 'per_day',
    mgPerKg: 0,
    dosesPerDay: 0,
    ruleBn: 'প্রতিবার পাতলা পায়খানার পর: ২ বছরের কম ৫০–১০০ ml, ২ বছরের বেশি ১০০–২০০ ml',
    ruleEn: 'After each loose stool: Under 2 yrs 50-100 ml, Over 2 yrs 100-200 ml',
    preparations: [{ label: 'ORS sachet in 500ml water', brands: 'Orsaline-N', mgPerMl: 0 }],
    warningBn: 'এক প্যাকেট ঠিক ৫০০ ml বিশুদ্ধ পানিতে গুলতে হবে; ১২ ঘণ্টার পর ফেলে দিন।',
    warningEn: 'Dissolve 1 sachet in exactly 500 ml clean drinking water; discard after 12 hours.',
    fixedBn: (_w, ageMonths) =>
      ageMonths < 24
        ? 'প্রতিবার পাতলা পায়খানার পর ৫০–১০০ ml'
        : 'প্রতিবার পাতলা পায়খানার পর ১০০–২০০ ml',
    fixedEn: (_w, ageMonths) =>
      ageMonths < 24
        ? '50–100 ml after each loose stool'
        : '100–200 ml after each loose stool',
  },
};

export interface DoseResult {
  drug: PediatricDrug;
  /** mg for one administration, after ceilings are applied. */
  singleDoseMg: number;
  /** mg across 24 hours. */
  dailyDoseMg: number;
  /** True when a ceiling (mg/kg/day or the adult single dose) clipped the result. */
  cappedByCeiling: boolean;
  /** Volume for one administration, per available preparation. */
  volumes: { preparation: Preparation; ml: number; teaspoons: number; drops?: number }[];
  /** Free-text regimen for fixed-dose protocols such as zinc and ORS. */
  fixedRegimenBn?: string;
  fixedRegimenEn?: string;
}

/** Round to one decimal place without floating point noise. */
const round1 = (n: number): number => Math.round(n * 10) / 10;

/**
 * Weight-based paediatric dose.
 *
 * `basis: 'per_dose'` drugs express mg/kg for a single administration;
 * `basis: 'per_day'` drugs express the 24 hour total, divided here by
 * `dosesPerDay`. Both the mg/kg/day ceiling and the absolute adult single-dose
 * cap are applied, because a 40kg twelve-year-old must not be given more
 * paracetamol than an adult would receive.
 */
export const calculatePediatricDose = (
  drugId: PediatricDrugId,
  weightKg: number,
  ageMonths = 24
): DoseResult => {
  const drug = PEDIATRIC_DRUGS[drugId];
  if (!(weightKg > 0)) throw new RangeError('weightKg must be greater than 0');

  let singleDoseMg =
    drug.basis === 'per_dose'
      ? drug.mgPerKg * weightKg
      : (drug.mgPerKg * weightKg) / drug.dosesPerDay;

  let cappedByCeiling = false;

  if (drug.maxSingleDoseMg && singleDoseMg > drug.maxSingleDoseMg) {
    singleDoseMg = drug.maxSingleDoseMg;
    cappedByCeiling = true;
  }

  if (drug.maxMgPerKgPerDay) {
    const maxSingle = (drug.maxMgPerKgPerDay * weightKg) / drug.dosesPerDay;
    if (singleDoseMg > maxSingle) {
      singleDoseMg = maxSingle;
      cappedByCeiling = true;
    }
  }

  singleDoseMg = round1(singleDoseMg);

  return {
    drug,
    singleDoseMg,
    dailyDoseMg: round1(singleDoseMg * drug.dosesPerDay),
    cappedByCeiling,
    volumes: drug.preparations
      .filter((p) => p.mgPerMl > 0)
      .map((preparation) => {
        const ml = round1(singleDoseMg / preparation.mgPerMl);
        return {
          preparation,
          ml,
          teaspoons: round1(ml / 5),
          drops: preparation.dropsPerMl ? Math.round(ml * preparation.dropsPerMl) : undefined,
        };
      }),
    fixedRegimenBn: drug.fixedBn?.(weightKg, ageMonths),
    fixedRegimenEn: drug.fixedEn?.(weightKg, ageMonths),
  };
};

/* ------------------------------------------------------------------ *
 * Blood donation cooldown
 * ------------------------------------------------------------------ */

/** Whole blood donation interval used in Bangladesh. */
export const DONATION_COOLDOWN_DAYS = 90;

const MS_PER_DAY = 86_400_000;

/** Whole days elapsed between two dates, ignoring the time of day. */
const daysBetween = (from: Date, to: Date): number => {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.floor((b - a) / MS_PER_DAY);
};

export interface DonorEligibility {
  isEligible: boolean;
  daysSinceLastDonation: number;
  cooldownDaysRemaining: number;
  /** Date the donor becomes eligible again. */
  eligibleFrom: Date;
}

/**
 * Whether a donor has cleared the 90 day whole-blood cooldown.
 *
 * A donor with no recorded donation is eligible. A future-dated donation is
 * clamped to today so bad data can never make someone look eligible early.
 */
export const checkDonorEligibility = (
  lastDonationDate: string | Date | null | undefined,
  now: Date = new Date()
): DonorEligibility => {
  if (!lastDonationDate) {
    return {
      isEligible: true,
      daysSinceLastDonation: Infinity,
      cooldownDaysRemaining: 0,
      eligibleFrom: now,
    };
  }

  const last = new Date(lastDonationDate);
  if (Number.isNaN(last.getTime())) throw new RangeError('lastDonationDate is not a valid date');

  const elapsed = Math.max(0, daysBetween(last, now));
  const remaining = Math.max(0, DONATION_COOLDOWN_DAYS - elapsed);

  return {
    isEligible: remaining === 0,
    daysSinceLastDonation: elapsed,
    cooldownDaysRemaining: remaining,
    eligibleFrom: new Date(last.getTime() + DONATION_COOLDOWN_DAYS * MS_PER_DAY),
  };
};

/* ------------------------------------------------------------------ *
 * Free report review window
 * ------------------------------------------------------------------ */

/** Days a patient may return with reports at no additional consultation fee. */
export const FREE_REVIEW_WINDOW_DAYS = 14;

export interface ReviewWindow {
  isOpen: boolean;
  daysRemaining: number;
  expiresOn: Date;
  /** True on the final two days, for the "hurry up" badge. */
  isExpiringSoon: boolean;
}

/**
 * The 14 day free follow-up window that starts on the consultation date.
 *
 * Day 14 is still free; day 15 is not. The window is not open for a
 * consultation dated in the future.
 */
export const getFreeReviewWindow = (
  consultationDate: string | Date,
  now: Date = new Date()
): ReviewWindow => {
  const start = new Date(consultationDate);
  if (Number.isNaN(start.getTime())) throw new RangeError('consultationDate is not a valid date');

  const elapsed = daysBetween(start, now);
  const daysRemaining = Math.max(0, FREE_REVIEW_WINDOW_DAYS - elapsed);

  return {
    isOpen: elapsed >= 0 && elapsed <= FREE_REVIEW_WINDOW_DAYS,
    daysRemaining,
    expiresOn: new Date(start.getTime() + FREE_REVIEW_WINDOW_DAYS * MS_PER_DAY),
    isExpiringSoon: daysRemaining > 0 && daysRemaining <= 2,
  };
};

/* ------------------------------------------------------------------ *
 * Chamber queue progression
 * ------------------------------------------------------------------ */

export type DoctorStatus = 'in_chamber' | 'on_way' | 'break' | 'emergency';

/** Average consultation length in a Bangladeshi private chamber. */
export const MINUTES_PER_PATIENT = 4.5;

export interface QueueState {
  currentSerial: number;
  totalTokens: number;
  doctorStatus: DoctorStatus;
}

/**
 * Advance the called token by one.
 *
 * The serial never runs past the last issued token, and never moves while the
 * doctor is away — a display that keeps counting during a break tells waiting
 * patients a lie about when they will be seen.
 */
export const advanceQueue = (state: QueueState): QueueState => {
  if (state.doctorStatus !== 'in_chamber') return state;
  if (state.currentSerial >= state.totalTokens) return state;
  return { ...state, currentSerial: state.currentSerial + 1 };
};

/** Step back one token, for a mis-click at the desk. Never below 1. */
export const rewindQueue = (state: QueueState): QueueState => ({
  ...state,
  currentSerial: Math.max(1, state.currentSerial - 1),
});

/** Jump directly to a token, clamped to the issued range. */
export const callSerial = (state: QueueState, serial: number): QueueState => ({
  ...state,
  currentSerial: Math.min(Math.max(1, Math.round(serial)), state.totalTokens),
});

/**
 * Minutes until `patientSerial` is called.
 *
 * Returns 0 once the patient's token has been reached or passed. A doctor who
 * is away adds a flat allowance, because the queue is not moving at all during
 * that time.
 */
export const estimateWaitMinutes = (
  state: QueueState,
  patientSerial: number,
  minutesPerPatient: number = MINUTES_PER_PATIENT
): number => {
  const ahead = Math.max(0, patientSerial - state.currentSerial);
  if (ahead === 0) return 0;
  const penalty =
    state.doctorStatus === 'in_chamber' ? 0 : state.doctorStatus === 'on_way' ? 15 : 30;
  return Math.round(ahead * minutesPerPatient + penalty);
};

/* ------------------------------------------------------------------ *
 * Drug safety: interactions and allergies
 * ------------------------------------------------------------------ */

export type Severity = 'severe' | 'moderate' | 'mild';

export interface SafetyAlert {
  severity: Severity;
  /** An interaction between two prescribed drugs, or a charted allergy. */
  kind: 'interaction' | 'allergy';
  drugs: string[];
  messageBn: string;
  messageEn: string;
}

interface InteractionRule {
  /** Lower-cased generic name fragments; both must be present to fire. */
  a: string;
  b: string;
  severity: Severity;
  messageBn: string;
  messageEn: string;
}

/**
 * Heuristic interaction table.
 *
 * ponytail: flat list scanned pairwise, O(rules x pairs) on a handful of
 * prescribed drugs. Swap in a licensed interaction database (BNF, Micromedex)
 * when the prescription list or the rule set grows past a screenful — this
 * covers the combinations that actually turn up in Bangladeshi outpatient
 * prescribing.
 */
const INTERACTION_RULES: InteractionRule[] = [
  {
    a: 'ciprofloxacin', b: 'tizanidine', severity: 'severe',
    messageBn: 'সিপ্রোফ্লক্সাসিন টিজানিডিনের মাত্রা বহুগুণ বাড়ায় — তীব্র হাইপোটেনশন ও সিডেশন। একসাথে দেওয়া নিষিদ্ধ।',
    messageEn: 'Ciprofloxacin sharply raises tizanidine levels — severe hypotension and sedation. Contraindicated.',
  },
  {
    a: 'ciprofloxacin', b: 'theophylline', severity: 'severe',
    messageBn: 'থিওফাইলিনের মাত্রা বেড়ে খিঁচুনি ও এরিদমিয়া হতে পারে।',
    messageEn: 'Raises theophylline levels — risk of seizures and arrhythmia.',
  },
  {
    a: 'enalapril', b: 'potassium', severity: 'severe',
    messageBn: 'ACE ইনহিবিটরের সাথে পটাশিয়াম সাপ্লিমেন্ট — মারাত্মক হাইপারক্যালেমিয়ার ঝুঁকি।',
    messageEn: 'ACE inhibitor with a potassium supplement — risk of life-threatening hyperkalaemia.',
  },
  {
    a: 'lisinopril', b: 'potassium', severity: 'severe',
    messageBn: 'ACE ইনহিবিটরের সাথে পটাশিয়াম সাপ্লিমেন্ট — মারাত্মক হাইপারক্যালেমিয়ার ঝুঁকি।',
    messageEn: 'ACE inhibitor with a potassium supplement — risk of life-threatening hyperkalaemia.',
  },
  {
    a: 'ramipril', b: 'spironolactone', severity: 'severe',
    messageBn: 'ACE ইনহিবিটর ও পটাশিয়াম-স্পেয়ারিং ডাইইউরেটিক — সিরাম পটাশিয়াম মনিটর করুন।',
    messageEn: 'ACE inhibitor with a potassium-sparing diuretic — monitor serum potassium.',
  },
  {
    a: 'warfarin', b: 'aspirin', severity: 'severe',
    messageBn: 'ওয়ারফারিনের সাথে অ্যাসপিরিন — গুরুতর রক্তক্ষরণের ঝুঁকি।',
    messageEn: 'Warfarin with aspirin — major bleeding risk.',
  },
  {
    a: 'warfarin', b: 'ciprofloxacin', severity: 'severe',
    messageBn: 'INR অস্বাভাবিক বেড়ে রক্তক্ষরণ হতে পারে — INR ঘন ঘন দেখুন।',
    messageEn: 'INR may rise sharply — monitor INR closely.',
  },
  {
    a: 'clopidogrel', b: 'omeprazole', severity: 'moderate',
    messageBn: 'ওমিপ্রাজল ক্লোপিডোগ্রেলের কার্যকারিতা কমায়। প্যান্টোপ্রাজল বিকল্প হিসেবে ভালো।',
    messageEn: 'Omeprazole reduces clopidogrel activation. Prefer pantoprazole.',
  },
  {
    a: 'simvastatin', b: 'clarithromycin', severity: 'severe',
    messageBn: 'র‌্যাবডোমায়োলাইসিসের উচ্চ ঝুঁকি — ম্যাক্রোলাইড কোর্স চলাকালে স্ট্যাটিন বন্ধ রাখুন।',
    messageEn: 'High rhabdomyolysis risk — suspend the statin during the macrolide course.',
  },
  {
    a: 'atorvastatin', b: 'clarithromycin', severity: 'moderate',
    messageBn: 'স্ট্যাটিনের মাত্রা বাড়ে — মায়োপ্যাথির লক্ষণ খেয়াল রাখুন।',
    messageEn: 'Statin levels rise — watch for myopathy.',
  },
  {
    a: 'losartan', b: 'ibuprofen', severity: 'moderate',
    messageBn: 'NSAID অ্যান্টিহাইপারটেনসিভের কার্যকারিতা কমায় ও কিডনির ক্ষতি করতে পারে।',
    messageEn: 'NSAID blunts the antihypertensive effect and may impair renal function.',
  },
  {
    a: 'ibuprofen', b: 'aspirin', severity: 'moderate',
    messageBn: 'একসাথে দিলে গ্যাস্ট্রোইনটেস্টাইনাল রক্তক্ষরণের ঝুঁকি বাড়ে।',
    messageEn: 'Combined use increases gastrointestinal bleeding risk.',
  },
  {
    a: 'tramadol', b: 'sertraline', severity: 'severe',
    messageBn: 'সেরোটোনিন সিনড্রোমের ঝুঁকি — বিকল্প ব্যথানাশক বিবেচনা করুন।',
    messageEn: 'Serotonin syndrome risk — consider an alternative analgesic.',
  },
  {
    a: 'azithromycin', b: 'domperidone', severity: 'severe',
    messageBn: 'দুটোই QT প্রলম্বিত করে — মারাত্মক এরিদমিয়ার ঝুঁকি।',
    messageEn: 'Both prolong QT — risk of serious arrhythmia.',
  },
  {
    a: 'metformin', b: 'contrast', severity: 'severe',
    messageBn: 'আয়োডিনযুক্ত কনট্রাস্ট স্টাডির আগে মেটফরমিন বন্ধ রাখুন — ল্যাকটিক অ্যাসিডোসিস।',
    messageEn: 'Withhold metformin around iodinated contrast — lactic acidosis risk.',
  },
  {
    a: 'levofloxacin', b: 'antacid', severity: 'moderate',
    messageBn: 'অ্যান্টাসিড শোষণ কমায় — অন্তত ২ ঘণ্টা ব্যবধানে দিন।',
    messageEn: 'Antacids impair absorption — separate the doses by at least 2 hours.',
  },
];

/**
 * Allergy cross-reactivity: an allergy recorded on the chart blocks the whole
 * class listed here, not only an exact name match.
 */
const ALLERGY_CLASSES: Record<string, string[]> = {
  penicillin: [
    'amoxicillin', 'ampicillin', 'flucloxacillin', 'penicillin', 'piperacillin',
    'cefuroxime', 'cefixime', 'ceftriaxone', 'cephradine',
  ],
  sulfa: ['cotrimoxazole', 'sulfamethoxazole', 'trimethoprim', 'sulfadiazine', 'furosemide'],
  nsaid: ['ibuprofen', 'diclofenac', 'naproxen', 'aspirin', 'ketorolac', 'aceclofenac', 'indomethacin'],
  aspirin: ['aspirin', 'ibuprofen', 'diclofenac', 'naproxen'],
  cephalosporin: ['cefixime', 'ceftriaxone', 'cefuroxime', 'cephradine', 'cefepime'],
  quinolone: ['ciprofloxacin', 'levofloxacin', 'moxifloxacin', 'ofloxacin'],
  macrolide: ['azithromycin', 'clarithromycin', 'erythromycin'],
};

const norm = (s: string): string => s.toLowerCase().trim();

/** True when `haystack` mentions `needle`. */
const mentions = (haystack: string, needle: string): boolean => norm(haystack).includes(norm(needle));

/**
 * Screen a prescription for drug-drug interactions and charted allergies.
 *
 * Matching is on generic names, which is why the builder records the generic
 * alongside the brand — "Sergel" tells you nothing, "Esomeprazole" does.
 * Results come back severe first so the UI can render the worst problem at the
 * top without re-sorting.
 */
export const checkPrescriptionSafety = (
  genericNames: string[],
  patientAllergies: string[] = []
): SafetyAlert[] => {
  const drugs = genericNames.filter(Boolean);
  const alerts: SafetyAlert[] = [];

  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      for (const rule of INTERACTION_RULES) {
        const forward = mentions(drugs[i], rule.a) && mentions(drugs[j], rule.b);
        const reverse = mentions(drugs[i], rule.b) && mentions(drugs[j], rule.a);
        if (forward || reverse) {
          alerts.push({
            severity: rule.severity,
            kind: 'interaction',
            drugs: [drugs[i], drugs[j]],
            messageBn: rule.messageBn,
            messageEn: rule.messageEn,
          });
        }
      }
    }
  }

  for (const allergy of patientAllergies.filter(Boolean)) {
    const key = Object.keys(ALLERGY_CLASSES).find((k) => mentions(allergy, k));
    const blocked = key ? ALLERGY_CLASSES[key] : [norm(allergy)];

    for (const drug of drugs) {
      if (blocked.some((b) => mentions(drug, b))) {
        alerts.push({
          severity: 'severe',
          kind: 'allergy',
          drugs: [drug],
          messageBn: `রোগীর চার্টে "${allergy}" অ্যালার্জি লিপিবদ্ধ — ${drug} দেওয়া যাবে না।`,
          messageEn: `The chart records an allergy to "${allergy}" — ${drug} is contraindicated.`,
        });
      }
    }
  }

  const rank: Record<Severity, number> = { severe: 0, moderate: 1, mild: 2 };
  return alerts.sort((x, y) => rank[x.severity] - rank[y.severity]);
};
