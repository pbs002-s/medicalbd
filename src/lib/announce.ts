/**
 * Waiting room audio: a chime followed by a spoken Bengali token call.
 *
 * Uses the platform's Web Speech API rather than shipping audio files, so the
 * announcement works offline and for any token number. Browsers refuse to
 * speak or play audio until the page has had a user gesture, which is why the
 * TV display asks an operator to press "start" once.
 */

import { toBnDigits } from './clinical';

/** One AudioContext for the page; creating one per chime exhausts the limit. */
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioContext) audioContext = new Ctor();
  return audioContext;
};

/** True once the browser will actually let us make noise. */
export const isAudioUnlocked = (): boolean => getAudioContext()?.state === 'running';

/**
 * Resume audio after a user gesture. Call this from a click handler; without
 * it every chime and announcement is silently dropped.
 */
export const unlockAudio = async (): Promise<boolean> => {
  const ctx = getAudioContext();
  if (!ctx) return false;
  try {
    if (ctx.state === 'suspended') await ctx.resume();
    return ctx.state === 'running';
  } catch {
    return false;
  }
};

/** Two-tone attention chime (D5 then A5). */
export const playChime = (): void => {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, ctx.currentTime);
  osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.5);
};

/** Pick a Bengali voice if the device has one, else the default. */
const bengaliVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  return voices.find((v) => v.lang === 'bn-BD') ?? voices.find((v) => v.lang.startsWith('bn'));
};

export interface AnnouncementDetails {
  tokenNumber: number;
  doctorNameBn: string;
  chamberBn: string;
}

/** "টোকেন নম্বর ১২, ডা. ... এর চেম্বার ৩-এ আসুন" */
export const buildAnnouncementBn = ({ tokenNumber, doctorNameBn, chamberBn }: AnnouncementDetails): string =>
  `টোকেন নম্বর ${toBnDigits(tokenNumber)}। ${doctorNameBn} এর ${chamberBn} এ আসুন।`;

/**
 * Speak a token call in Bengali, after the chime.
 *
 * Any queued speech is cancelled first: when the desk advances the queue twice
 * quickly, the room should hear the current token, not a backlog of stale ones.
 */
export const announceToken = (details: AnnouncementDetails): void => {
  playChime();

  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
  if (!synth) return;

  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(buildAnnouncementBn(details));
  utterance.lang = 'bn-BD';
  utterance.rate = 0.85; // Slower than default; token numbers must be unmistakable.
  utterance.pitch = 1;
  utterance.volume = 1;

  const voice = bengaliVoice();
  if (voice) utterance.voice = voice;

  // Let the chime finish before speaking over it.
  window.setTimeout(() => synth.speak(utterance), 600);
};
