import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  advanceQueue,
  callSerial as callSerialRule,
  estimateWaitMinutes,
  rewindQueue,
  type DoctorStatus,
  type QueueState,
} from '../lib/clinical';
import { announceToken, isAudioUnlocked, unlockAudio } from '../lib/announce';
import { KEYS, readJson, writeJson } from '../lib/storage';

/** Where the live queue numbers are coming from right now. */
export type QueueTransport = 'sse' | 'local';

interface QueueContextType extends QueueState {
  patientSerial: number;
  doctorStatusBn: string;
  doctorStatusEn: string;
  doctorNameBn: string;
  doctorNameEn: string;
  doctorSpecialtyBn: string;
  doctorSpecialtyEn: string;
  chamberBn: string;
  chamberEn: string;
  estimatedMinutes: number;
  advanceSerial: () => void;
  rewindSerial: () => void;
  callSerial: (num: number) => void;
  updateDoctorStatus: (status: DoctorStatus) => void;
  resetQueue: () => void;
  lastUpdated: string;
  lastUpdatedBn: string;
  lastUpdatedEn: string;
  /** Bumps on every token change, so displays can re-run their pulse animation. */
  lastChangeAt: number;
  isChimeEnabled: boolean;
  setIsChimeEnabled: (enabled: boolean) => void;
  /** Browsers block audio until a gesture; the TV display surfaces this. */
  isAudioReady: boolean;
  enableAudio: () => Promise<void>;
  transport: QueueTransport;
  isConnected: boolean;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

const DOCTOR_STATUS_BN: Record<DoctorStatus, string> = {
  in_chamber: 'চেম্বারে আছেন',
  on_way: 'আসছেন',
  break: 'সাময়িক বিরতি',
  emergency: 'জরুরি অপারেশনে',
};

const DOCTOR_STATUS_EN: Record<DoctorStatus, string> = {
  in_chamber: 'In Chamber',
  on_way: 'On The Way',
  break: 'On Break',
  emergency: 'In Emergency Surgery',
};

const DEFAULT_STATE: QueueState = {
  currentSerial: 12,
  totalTokens: 45,
  doctorStatus: 'in_chamber',
};

/** Cross-tab channel, so the doctor's desk and the waiting room TV stay in step. */
const CHANNEL_NAME = 'shasthosetu-queue';

const SSE_URL: string | undefined = import.meta.env.VITE_QUEUE_SSE_URL as string | undefined;

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<QueueState>(() => readJson(KEYS.queue, DEFAULT_STATE));
  const [patientSerial] = useState(18);
  const [lastUpdated, setLastUpdated] = useState('এখনই');
  const [lastChangeAt, setLastChangeAt] = useState(0);
  const [isChimeEnabled, setIsChimeEnabled] = useState<boolean>(() =>
    readJson(KEYS.announceEnabled, true)
  );
  const [isAudioReady, setIsAudioReady] = useState(isAudioUnlocked);
  const [transport, setTransport] = useState<QueueTransport>('local');
  const [isConnected, setIsConnected] = useState(true);

  const channelRef = useRef<BroadcastChannel | null>(null);
  const doctorNameBn = 'ডা. তানভীর হাসান';
  const chamberBn = 'চেম্বার ৩';

  // Announce whenever the called token changes — but not on first mount, or
  // every TV in the building would shout the current number on page load.
  const previousSerial = useRef<number | null>(null);
  useEffect(() => {
    const previous = previousSerial.current;
    previousSerial.current = state.currentSerial;
    if (previous === null || previous === state.currentSerial) return;

    setLastChangeAt(Date.now());
    if (isChimeEnabled) {
      announceToken({ tokenNumber: state.currentSerial, doctorNameBn, chamberBn });
    }
  }, [state.currentSerial, isChimeEnabled]);

  useEffect(() => writeJson(KEYS.queue, state), [state]);
  useEffect(() => writeJson(KEYS.announceEnabled, isChimeEnabled), [isChimeEnabled]);

  /**
   * Apply a state change locally and tell the other tabs.
   *
   * `origin: 'remote'` updates skip the re-broadcast, otherwise two tabs would
   * bounce the same message between them forever.
   */
  const commit = useCallback((next: QueueState, origin: 'local' | 'remote' = 'local') => {
    setState(next);
    setLastUpdated('এখনই');
    if (origin === 'local') {
      channelRef.current?.postMessage(next);
    }
  }, []);

  // Cross-tab synchronisation. BroadcastChannel is native and needs no server,
  // which is what makes the TV display work in a chamber with no backend.
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<QueueState>) => {
      const incoming = event.data;
      if (!incoming || typeof incoming.currentSerial !== 'number') return;
      commit(incoming, 'remote');
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [commit]);

  /**
   * Server-sent events, when a backend is configured.
   *
   * SSE rather than a WebSocket because the queue is one-directional: the
   * display only ever reads. EventSource also reconnects by itself, so there
   * is no retry loop to write or get wrong.
   */
  useEffect(() => {
    if (!SSE_URL) return;

    const source = new EventSource(SSE_URL);
    setTransport('sse');

    source.onopen = () => setIsConnected(true);

    source.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as Partial<QueueState>;
        if (typeof payload.currentSerial !== 'number') return;
        commit(
          {
            currentSerial: payload.currentSerial,
            totalTokens: payload.totalTokens ?? DEFAULT_STATE.totalTokens,
            doctorStatus: payload.doctorStatus ?? 'in_chamber',
          },
          'remote'
        );
      } catch (error) {
        console.warn('[queue] malformed SSE payload', error);
      }
    };

    // EventSource retries on its own; we only reflect the state in the UI.
    source.onerror = () => setIsConnected(false);

    return () => source.close();
  }, [commit]);

  const enableAudio = useCallback(async () => {
    setIsAudioReady(await unlockAudio());
  }, []);

  const value = useMemo<QueueContextType>(
    () => ({
      ...state,
      patientSerial,
      doctorStatusBn: DOCTOR_STATUS_BN[state.doctorStatus],
      doctorStatusEn: DOCTOR_STATUS_EN[state.doctorStatus],
      doctorNameBn,
      doctorNameEn: 'Dr. Tanvir Hasan',
      doctorSpecialtyBn: 'মেডিসিন বিশেষজ্ঞ',
      doctorSpecialtyEn: 'Internal Medicine Specialist',
      chamberBn,
      chamberEn: 'Chamber 304',
      estimatedMinutes: estimateWaitMinutes(state, patientSerial),
      advanceSerial: () => commit(advanceQueue(state)),
      rewindSerial: () => commit(rewindQueue(state)),
      callSerial: (num: number) => commit(callSerialRule(state, num)),
      updateDoctorStatus: (doctorStatus: DoctorStatus) => commit({ ...state, doctorStatus }),
      resetQueue: () => commit({ ...state, currentSerial: 1 }),
      lastUpdated,
      lastUpdatedBn: 'এখনই',
      lastUpdatedEn: 'Just now',
      lastChangeAt,
      isChimeEnabled,
      setIsChimeEnabled,
      isAudioReady,
      enableAudio,
      transport,
      isConnected,
    }),
    [state, patientSerial, lastUpdated, lastChangeAt, isChimeEnabled, isAudioReady, transport, isConnected, commit, enableAudio]
  );

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = (): QueueContextType => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
