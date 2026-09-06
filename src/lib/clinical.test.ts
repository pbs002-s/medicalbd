import { describe, it, expect } from 'vitest';
import {
  advanceQueue,
  calculatePediatricDose,
  callSerial,
  checkDonorEligibility,
  checkPrescriptionSafety,
  estimateWaitMinutes,
  getFreeReviewWindow,
  rewindQueue,
  toBnDigits,
  type QueueState,
} from './clinical';

/* ------------------------------------------------------------------ */

describe('toBnDigits', () => {
  it('converts every ASCII digit and leaves other characters alone', () => {
    expect(toBnDigits(1234567890)).toBe('১২৩৪৫৬৭৮৯০');
    expect(toBnDigits('01712-345678')).toBe('০১৭১২-৩৪৫৬৭৮');
    expect(toBnDigits('BP 130/85 mmHg')).toBe('BP ১৩০/৮৫ mmHg');
  });
});

/* ------------------------------------------------------------------ */

describe('calculatePediatricDose', () => {
  it('applies mg/kg/dose drugs directly (paracetamol 15 mg/kg)', () => {
    const r = calculatePediatricDose('paracetamol', 10);
    expect(r.singleDoseMg).toBe(150);
    expect(r.dailyDoseMg).toBe(600);
    expect(r.cappedByCeiling).toBe(false);
  });

  it('converts a paracetamol dose into every stocked preparation', () => {
    const r = calculatePediatricDose('paracetamol', 10);
    const syrup = r.volumes.find((v) => v.preparation.mgPerMl === 24)!;
    const forte = r.volumes.find((v) => v.preparation.mgPerMl === 50)!;
    const drops = r.volumes.find((v) => v.preparation.mgPerMl === 100)!;

    expect(syrup.ml).toBeCloseTo(6.3, 1); // 150 / 24
    expect(syrup.teaspoons).toBeCloseTo(1.3, 1);
    expect(forte.ml).toBe(3);
    expect(drops.ml).toBe(1.5);
    expect(drops.drops).toBe(30); // 1.5ml at 20 drops/ml
  });

  it('divides mg/kg/day drugs by the number of daily doses (amoxicillin 45 in 3)', () => {
    const r = calculatePediatricDose('amoxicillin', 10);
    expect(r.singleDoseMg).toBe(150); // 450 / 3
    expect(r.dailyDoseMg).toBe(450);
    expect(r.volumes.find((v) => v.preparation.mgPerMl === 25)!.ml).toBe(6);
  });

  it('never exceeds the adult single dose ceiling', () => {
    // 80kg would compute 1200mg of paracetamol; the adult dose is 1000mg.
    const r = calculatePediatricDose('paracetamol', 80);
    expect(r.singleDoseMg).toBe(1000);
    expect(r.cappedByCeiling).toBe(true);
  });

  it('never exceeds 60 mg/kg/day of paracetamol', () => {
    const r = calculatePediatricDose('paracetamol', 12);
    expect(r.dailyDoseMg).toBeLessThanOrEqual(60 * 12);
  });

  it('uses the WHO fixed regimen for zinc, split at 6 months of age', () => {
    expect(calculatePediatricDose('zinc', 6, 4).fixedRegimenBn).toContain('১০ mg');
    expect(calculatePediatricDose('zinc', 9, 8).fixedRegimenBn).toContain('২০ mg');
  });

  it('rejects a non-positive weight rather than returning a dose of zero', () => {
    expect(() => calculatePediatricDose('paracetamol', 0)).toThrow(RangeError);
    expect(() => calculatePediatricDose('paracetamol', -5)).toThrow(RangeError);
  });
});

/* ------------------------------------------------------------------ */

describe('checkDonorEligibility (90 day cooldown)', () => {
  const now = new Date('2026-09-06T10:00:00');

  it('blocks a donor inside the window and reports the days left', () => {
    const r = checkDonorEligibility('2026-08-07', now); // 30 days ago
    expect(r.isEligible).toBe(false);
    expect(r.daysSinceLastDonation).toBe(30);
    expect(r.cooldownDaysRemaining).toBe(60);
  });

  it('still blocks on day 89 and clears on day 90', () => {
    const day89 = new Date(now.getTime() - 89 * 86_400_000);
    const day90 = new Date(now.getTime() - 90 * 86_400_000);
    expect(checkDonorEligibility(day89, now).isEligible).toBe(false);
    expect(checkDonorEligibility(day89, now).cooldownDaysRemaining).toBe(1);
    expect(checkDonorEligibility(day90, now).isEligible).toBe(true);
    expect(checkDonorEligibility(day90, now).cooldownDaysRemaining).toBe(0);
  });

  it('treats a donor with no recorded donation as eligible', () => {
    expect(checkDonorEligibility(null, now).isEligible).toBe(true);
    expect(checkDonorEligibility(undefined, now).isEligible).toBe(true);
  });

  it('does not let a future-dated donation look eligible', () => {
    const r = checkDonorEligibility('2026-12-01', now);
    expect(r.isEligible).toBe(false);
    expect(r.cooldownDaysRemaining).toBe(90);
  });

  it('rejects an unparseable date', () => {
    expect(() => checkDonorEligibility('not-a-date', now)).toThrow(RangeError);
  });
});

/* ------------------------------------------------------------------ */

describe('getFreeReviewWindow (14 day free report review)', () => {
  const now = new Date('2026-09-06T10:00:00');

  it('counts down from the consultation date', () => {
    const r = getFreeReviewWindow('2026-09-01', now); // 5 days ago
    expect(r.isOpen).toBe(true);
    expect(r.daysRemaining).toBe(9);
    expect(r.isExpiringSoon).toBe(false);
  });

  it('keeps day 14 free and closes on day 15', () => {
    const day14 = new Date(now.getTime() - 14 * 86_400_000);
    const day15 = new Date(now.getTime() - 15 * 86_400_000);
    expect(getFreeReviewWindow(day14, now).isOpen).toBe(true);
    expect(getFreeReviewWindow(day14, now).daysRemaining).toBe(0);
    expect(getFreeReviewWindow(day15, now).isOpen).toBe(false);
  });

  it('flags the final two days as expiring soon', () => {
    const day12 = new Date(now.getTime() - 12 * 86_400_000);
    const day13 = new Date(now.getTime() - 13 * 86_400_000);
    expect(getFreeReviewWindow(day12, now).isExpiringSoon).toBe(true);
    expect(getFreeReviewWindow(day13, now).isExpiringSoon).toBe(true);
  });

  it('is not open for a consultation dated in the future', () => {
    expect(getFreeReviewWindow('2026-10-01', now).isOpen).toBe(false);
  });
});

/* ------------------------------------------------------------------ */

describe('queue progression', () => {
  const base: QueueState = { currentSerial: 12, totalTokens: 45, doctorStatus: 'in_chamber' };

  it('advances one token at a time', () => {
    expect(advanceQueue(base).currentSerial).toBe(13);
  });

  it('stops at the last issued token', () => {
    const last = { ...base, currentSerial: 45 };
    expect(advanceQueue(last).currentSerial).toBe(45);
  });

  it('does not advance while the doctor is away', () => {
    for (const status of ['break', 'on_way', 'emergency'] as const) {
      expect(advanceQueue({ ...base, doctorStatus: status }).currentSerial).toBe(12);
    }
  });

  it('rewinds a mis-click but never below token 1', () => {
    expect(rewindQueue(base).currentSerial).toBe(11);
    expect(rewindQueue({ ...base, currentSerial: 1 }).currentSerial).toBe(1);
  });

  it('clamps a directly called serial to the issued range', () => {
    expect(callSerial(base, 30).currentSerial).toBe(30);
    expect(callSerial(base, 99).currentSerial).toBe(45);
    expect(callSerial(base, 0).currentSerial).toBe(1);
    expect(callSerial(base, -4).currentSerial).toBe(1);
  });

  it('does not mutate the state it is given', () => {
    advanceQueue(base);
    expect(base.currentSerial).toBe(12);
  });

  it('estimates the wait at 4.5 minutes per patient ahead', () => {
    expect(estimateWaitMinutes(base, 18)).toBe(27); // 6 ahead
    expect(estimateWaitMinutes(base, 12)).toBe(0);
    expect(estimateWaitMinutes(base, 5)).toBe(0); // already called
  });

  it('adds an allowance when the doctor is not in the chamber', () => {
    expect(estimateWaitMinutes({ ...base, doctorStatus: 'on_way' }, 18)).toBe(42); // 27 + 15
    expect(estimateWaitMinutes({ ...base, doctorStatus: 'break' }, 18)).toBe(57); // 27 + 30
  });
});

/* ------------------------------------------------------------------ */

describe('checkPrescriptionSafety', () => {
  it('flags ciprofloxacin with tizanidine as severe, in either order', () => {
    const a = checkPrescriptionSafety(['Ciprofloxacin', 'Tizanidine']);
    const b = checkPrescriptionSafety(['Tizanidine', 'Ciprofloxacin']);
    expect(a).toHaveLength(1);
    expect(a[0].severity).toBe('severe');
    expect(a[0].kind).toBe('interaction');
    expect(b).toHaveLength(1);
  });

  it('flags an ACE inhibitor with a potassium supplement', () => {
    const alerts = checkPrescriptionSafety(['Enalapril Maleate', 'Potassium Chloride']);
    expect(alerts[0].severity).toBe('severe');
  });

  it('stays quiet on a safe combination', () => {
    expect(checkPrescriptionSafety(['Esomeprazole', 'Paracetamol'])).toEqual([]);
  });

  it('blocks the whole class when an allergy is charted (penicillin -> amoxicillin)', () => {
    const alerts = checkPrescriptionSafety(['Amoxicillin'], ['Penicillin']);
    expect(alerts).toHaveLength(1);
    expect(alerts[0].kind).toBe('allergy');
    expect(alerts[0].severity).toBe('severe');
  });

  it('catches sulfa cross-reactivity with cotrimoxazole', () => {
    const alerts = checkPrescriptionSafety(['Cotrimoxazole'], ['Sulfa drugs']);
    expect(alerts).toHaveLength(1);
    expect(alerts[0].kind).toBe('allergy');
  });

  it('does not fire an allergy for an unrelated drug', () => {
    expect(checkPrescriptionSafety(['Paracetamol'], ['Penicillin'])).toEqual([]);
  });

  it('sorts severe alerts above moderate ones', () => {
    const alerts = checkPrescriptionSafety([
      'Clopidogrel', 'Omeprazole', // moderate
      'Warfarin', 'Aspirin',       // severe
    ]);
    expect(alerts[0].severity).toBe('severe');
    expect(alerts[alerts.length - 1].severity).toBe('moderate');
  });

  it('handles an empty prescription', () => {
    expect(checkPrescriptionSafety([])).toEqual([]);
    expect(checkPrescriptionSafety([], ['Penicillin'])).toEqual([]);
  });
});
