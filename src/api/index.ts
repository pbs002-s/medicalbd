/**
 * Data access for the app.
 *
 * Every function tries the backend first and falls back to the local store, so
 * the UI has one call to make and never has to know whether the chamber is
 * online. Writes always land locally, so nothing a doctor typed is lost when
 * the connection drops mid-save.
 */

import { OfflineError, request } from './client';
import { KEYS, readJson, writeJson } from '../lib/storage';
import { mockAppointments, mockLabReports, mockMedicines, mockPrescriptions, mockBloodDonors, mockHospitalBeds } from '../mockData';
import type {
  Appointment,
  BloodDonor,
  HospitalBed,
  LabReport,
  MedicineItem,
  Prescription,
} from '../types';
import { checkDonorEligibility } from '../lib/clinical';

/**
 * Try the backend, fall back to a locally computed value.
 *
 * Only `OfflineError` falls through — a 422 from the server is a real problem
 * the caller has to see, not something to paper over with stale local data.
 */
const withFallback = async <T>(remote: () => Promise<T>, local: () => T): Promise<T> => {
  try {
    return await remote();
  } catch (error) {
    if (error instanceof OfflineError) return local();
    throw error;
  }
};

/* ------------------------------------------------------------------ *
 * Prescriptions
 * ------------------------------------------------------------------ */

/** Locally saved prescriptions, newest first, ahead of the seeded demo set. */
const localPrescriptions = (): Prescription[] => [
  ...readJson<Prescription[]>(KEYS.prescriptions, []),
  ...mockPrescriptions,
];

export const prescriptionApi = {
  list: (): Promise<Prescription[]> =>
    withFallback(() => request<Prescription[]>('/prescriptions'), localPrescriptions),

  get: async (id: string): Promise<Prescription | undefined> =>
    (await prescriptionApi.list()).find((p) => p.id === id),

  search: async (query: string): Promise<Prescription[]> => {
    const q = query.toLowerCase().trim();
    if (!q) return prescriptionApi.list();
    return (await prescriptionApi.list()).filter(
      (p) =>
        p.patientName.toLowerCase().includes(q) ||
        p.patientNameBn.includes(query) ||
        p.prescriptionNumber.toLowerCase().includes(q) ||
        p.medicines.some((m) => m.brandName.toLowerCase().includes(q) || m.genericName.toLowerCase().includes(q))
    );
  },

  /**
   * Save a prescription.
   *
   * The local write happens first and unconditionally, so a failed upload
   * never costs the doctor the consultation they just typed up.
   */
  save: async (prescription: Prescription): Promise<Prescription> => {
    const saved = readJson<Prescription[]>(KEYS.prescriptions, []);
    const next = [prescription, ...saved.filter((p) => p.id !== prescription.id)];
    writeJson(KEYS.prescriptions, next);

    try {
      return await request<Prescription>('/prescriptions', { method: 'POST', body: prescription });
    } catch (error) {
      if (error instanceof OfflineError) return prescription;
      throw error;
    }
  },
};

/* ------------------------------------------------------------------ *
 * Appointments
 * ------------------------------------------------------------------ */

export const appointmentApi = {
  list: (): Promise<Appointment[]> =>
    withFallback(() => request<Appointment[]>('/appointments'), () => [
      ...readJson<Appointment[]>(KEYS.appointments, []),
      ...mockAppointments,
    ]),

  book: async (appointment: Appointment): Promise<Appointment> => {
    const saved = readJson<Appointment[]>(KEYS.appointments, []);
    writeJson(KEYS.appointments, [appointment, ...saved]);
    try {
      return await request<Appointment>('/appointments', { method: 'POST', body: appointment });
    } catch (error) {
      if (error instanceof OfflineError) return appointment;
      throw error;
    }
  },
};

/* ------------------------------------------------------------------ *
 * Medicines (DGDA index)
 * ------------------------------------------------------------------ */

export const medicineApi = {
  search: (query: string): Promise<MedicineItem[]> =>
    withFallback(
      () => request<MedicineItem[]>(`/medicines?q=${encodeURIComponent(query)}`),
      () => {
        const q = query.toLowerCase().trim();
        if (!q) return mockMedicines;
        return mockMedicines.filter(
          (m) =>
            m.brandName.toLowerCase().includes(q) ||
            m.genericName.toLowerCase().includes(q) ||
            m.company.toLowerCase().includes(q)
        );
      }
    ),

  /** Cheaper brands of the same generic, cheapest first. */
  substitutes: async (medicineId: string): Promise<MedicineItem['alternativeBrands']> => {
    const all = await medicineApi.search('');
    const target = all.find((m) => m.id === medicineId);
    if (!target) return [];
    return [...target.alternativeBrands].sort((a, b) => a.price - b.price);
  },
};

/* ------------------------------------------------------------------ *
 * Blood donors
 * ------------------------------------------------------------------ */

export const bloodBankApi = {
  /**
   * Donors matching a blood group and district.
   *
   * Availability is recomputed from the last donation date rather than trusted
   * from the stored flag, so a stale `isAvailable` can never send a patient's
   * family to someone who donated last week.
   */
  search: (filters: { bloodGroup?: string; district?: string; availableOnly?: boolean } = {}): Promise<BloodDonor[]> =>
    withFallback(
      () => request<BloodDonor[]>(`/blood-donors?${new URLSearchParams(filters as Record<string, string>)}`),
      () =>
        mockBloodDonors
          .map((donor) => {
            const eligibility = checkDonorEligibility(donor.lastDonationDate);
            return {
              ...donor,
              isAvailable: eligibility.isEligible,
              cooldownDaysRemaining: eligibility.cooldownDaysRemaining,
            };
          })
          .filter(
            (d) =>
              (!filters.bloodGroup || d.bloodGroup === filters.bloodGroup) &&
              (!filters.district || d.district === filters.district) &&
              (!filters.availableOnly || d.isAvailable)
          )
    ),
};

/* ------------------------------------------------------------------ *
 * Hospital beds
 * ------------------------------------------------------------------ */

export const bedApi = {
  list: (district?: string): Promise<HospitalBed[]> =>
    withFallback(
      () => request<HospitalBed[]>(`/beds${district ? `?district=${encodeURIComponent(district)}` : ''}`),
      () => (district ? mockHospitalBeds.filter((b) => b.district === district) : mockHospitalBeds)
    ),
};

/* ------------------------------------------------------------------ *
 * Lab reports
 * ------------------------------------------------------------------ */

export const reportApi = {
  list: (): Promise<LabReport[]> =>
    withFallback(() => request<LabReport[]>('/reports'), () => mockLabReports),
};

/* ------------------------------------------------------------------ *
 * Student hub
 * ------------------------------------------------------------------ */

export interface LogbookEntry {
  id: string;
  date: string;
  ward: string;
  diagnosis: string;
  patientInitials: string;
  notes: string;
  /** Signed off by a consultant. */
  verified: boolean;
}

export const studentApi = {
  listLogbook: (): Promise<LogbookEntry[]> =>
    withFallback(() => request<LogbookEntry[]>('/student/logbook'), () =>
      readJson<LogbookEntry[]>(KEYS.logbook, [])
    ),

  saveLogbookEntry: async (entry: LogbookEntry): Promise<LogbookEntry> => {
    const existing = readJson<LogbookEntry[]>(KEYS.logbook, []);
    writeJson(KEYS.logbook, [entry, ...existing.filter((e) => e.id !== entry.id)]);
    try {
      return await request<LogbookEntry>('/student/logbook', { method: 'POST', body: entry });
    } catch (error) {
      if (error instanceof OfflineError) return entry;
      throw error;
    }
  },

  /** Per-station OSCE scores, keyed by station id. */
  getOsceProgress: (): Record<string, number> => readJson(KEYS.osceProgress, {}),

  saveOsceScore: (stationId: string, score: number): void => {
    writeJson(KEYS.osceProgress, { ...studentApi.getOsceProgress(), [stationId]: score });
  },

  getQuizProgress: (): { correct: number; attempted: number } =>
    readJson(KEYS.quizProgress, { correct: 0, attempted: 0 }),

  recordQuizAnswer: (wasCorrect: boolean): { correct: number; attempted: number } => {
    const prev = studentApi.getQuizProgress();
    const next = { correct: prev.correct + (wasCorrect ? 1 : 0), attempted: prev.attempted + 1 };
    writeJson(KEYS.quizProgress, next);
    return next;
  },
};
