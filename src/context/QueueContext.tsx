import React, { createContext, useContext, useState, useEffect } from 'react';

interface QueueContextType {
  currentSerial: number;
  patientSerial: number;
  totalTokens: number;
  doctorStatus: 'in_chamber' | 'on_way' | 'break' | 'emergency';
  doctorStatusBn: string;
  doctorNameBn: string;
  doctorSpecialtyBn: string;
  estimatedMinutes: number;
  advanceSerial: () => void;
  callSerial: (num: number) => void;
  updateDoctorStatus: (status: 'in_chamber' | 'on_way' | 'break' | 'emergency') => void;
  resetQueue: () => void;
  lastUpdated: string;
  isChimeEnabled: boolean;
  setIsChimeEnabled: (enabled: boolean) => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSerial, setCurrentSerial] = useState<number>(12);
  const [patientSerial] = useState<number>(18);
  const [totalTokens] = useState<number>(45);
  const [doctorStatus, setDoctorStatus] = useState<'in_chamber' | 'on_way' | 'break' | 'emergency'>('in_chamber');
  const [lastUpdated, setLastUpdated] = useState<string>('এখনই');
  const [isChimeEnabled, setIsChimeEnabled] = useState<boolean>(true);

  const doctorStatusBnMap = {
    in_chamber: 'চেম্বারে আছেন',
    on_way: 'আসছেন',
    break: 'সাময়িক বিরতি',
    emergency: 'জরুরি অপারেশনে'
  };

  const playChime = () => {
    if (!isChimeEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.warn('Audio chime not permitted without user interaction');
    }
  };

  const advanceSerial = () => {
    setCurrentSerial((prev) => {
      const next = prev < totalTokens ? prev + 1 : prev;
      playChime();
      return next;
    });
    setLastUpdated('এখনই');
  };

  const callSerial = (num: number) => {
    setCurrentSerial(num);
    playChime();
    setLastUpdated('এখনই');
  };

  const updateDoctorStatus = (status: 'in_chamber' | 'on_way' | 'break' | 'emergency') => {
    setDoctorStatus(status);
    setLastUpdated('এখনই');
  };

  const resetQueue = () => {
    setCurrentSerial(1);
    setLastUpdated('এখনই');
  };

  const diff = Math.max(0, patientSerial - currentSerial);
  const estimatedMinutes = diff * 4.5; // ~4.5 mins per patient in BD chamber

  return (
    <QueueContext.Provider
      value={{
        currentSerial,
        patientSerial,
        totalTokens,
        doctorStatus,
        doctorStatusBn: doctorStatusBnMap[doctorStatus],
        doctorNameBn: 'ডা. তানভীর হাসান',
        doctorSpecialtyBn: 'মেডিসিন বিশেষজ্ঞ',
        estimatedMinutes: Math.round(estimatedMinutes),
        advanceSerial,
        callSerial,
        updateDoctorStatus,
        resetQueue,
        lastUpdated,
        isChimeEnabled,
        setIsChimeEnabled
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = (): QueueContextType => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
