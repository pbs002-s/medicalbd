/**
 * Namespaced, versioned localStorage with a safe fallback.
 *
 * Private browsing, a full quota and locked-down site settings all make
 * localStorage throw rather than return null, so every access is guarded and
 * falls back to an in-memory map. Losing persistence is acceptable; a white
 * screen in a chamber waiting room is not.
 */

const PREFIX = 'shasthosetu:v1:';

/** Used when localStorage is unavailable, so reads within a session still work. */
const memory = new Map<string, string>();

let warned = false;
const warnOnce = (error: unknown) => {
  if (warned) return;
  warned = true;
  console.warn('[storage] localStorage unavailable, falling back to memory', error);
};

export const readJson = <T>(key: string, fallback: T): T => {
  const full = PREFIX + key;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(full);
  } catch (error) {
    warnOnce(error);
    raw = memory.get(full) ?? null;
  }
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    // Corrupt entry — drop it rather than crashing on every subsequent read.
    remove(key);
    return fallback;
  }
};

export const writeJson = (key: string, value: unknown): void => {
  const full = PREFIX + key;
  const raw = JSON.stringify(value);
  memory.set(full, raw);
  try {
    window.localStorage.setItem(full, raw);
  } catch (error) {
    warnOnce(error);
  }
};

export const remove = (key: string): void => {
  const full = PREFIX + key;
  memory.delete(full);
  try {
    window.localStorage.removeItem(full);
  } catch (error) {
    warnOnce(error);
  }
};

/** Storage keys in one place so a typo cannot silently orphan saved data. */
export const KEYS = {
  prescriptions: 'prescriptions',
  appointments: 'appointments',
  logbook: 'student.logbook',
  osceProgress: 'student.osce',
  quizProgress: 'student.quiz',
  queue: 'queue.state',
  session: 'auth.session',
  announceEnabled: 'queue.announce',
} as const;
