import React, { useEffect, useRef, useState } from 'react';
import { Ambulance, Droplet, Flame, PhoneCall, ShieldAlert, Siren, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Hotline {
  id: string;
  number: string;
  labelBn: string;
  labelEn: string;
  descBn: string;
  descEn: string;
  icon: typeof PhoneCall;
  /** Tailwind classes for the tile. */
  tone: string;
  primary?: boolean;
}

/**
 * Verified national numbers. These are short codes, not commercial dispatch
 * services — anything district-specific belongs behind the directory link
 * rather than hard-coded here, where a stale number costs someone their life.
 */
const HOTLINES: Hotline[] = [
  {
    id: 'emergency',
    number: '999',
    labelBn: 'জাতীয় জরুরি সেবা',
    labelEn: 'National Emergency',
    descBn: 'পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স — ২৪/৭ বিনামূল্যে',
    descEn: 'Police, fire service and ambulance — free, 24/7',
    icon: Siren,
    tone: 'bg-red-600 hover:bg-red-700 text-white',
    primary: true,
  },
  {
    id: 'health',
    number: '16263',
    labelBn: 'স্বাস্থ্য বাতায়ন',
    labelEn: 'Health Hotline',
    descBn: 'সরকারি চিকিৎসা পরামর্শ ও হাসপাতাল রেফারেল',
    descEn: 'Government medical advice and hospital referral',
    icon: PhoneCall,
    tone: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  {
    id: 'ambulance',
    number: '01766661212',
    labelBn: 'অ্যাম্বুলেন্স ডিসপ্যাচ',
    labelEn: 'Ambulance Dispatch',
    descBn: 'ঢাকা ও বিভাগীয় শহরে আইসিইউ অ্যাম্বুলেন্স',
    descEn: 'ICU ambulance in Dhaka and divisional cities',
    icon: Ambulance,
    tone: 'bg-teal-600 hover:bg-teal-700 text-white',
  },
  {
    id: 'fire',
    number: '02-9555555',
    labelBn: 'ফায়ার সার্ভিস কন্ট্রোল',
    labelEn: 'Fire Service Control',
    descBn: 'অগ্নিকাণ্ড ও উদ্ধার নিয়ন্ত্রণ কক্ষ',
    descEn: 'Fire and rescue control room',
    icon: Flame,
    tone: 'bg-orange-600 hover:bg-orange-700 text-white',
  },
];

interface EmergencySOSProps {
  /** Jump to the ICU/bed directory. */
  onOpenBeds?: () => void;
  /** Jump to the blood donor network. */
  onOpenBloodBank?: () => void;
}

/**
 * Always-available emergency panel.
 *
 * Pinned bottom-right on every signed-in screen because in an emergency nobody
 * navigates a menu. `tel:` links dial directly on a phone and are harmless on
 * desktop, so the same markup serves both.
 */
export const EmergencySOS: React.FC<EmergencySOSProps> = ({ onOpenBeds, onOpenBloodBank }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const bn = language === 'bn';

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Move focus into the panel when it opens so keyboard and screen reader users
  // land on the numbers rather than being left behind on the trigger.
  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 no-print font-sans">
      {isOpen && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label={bn ? 'জরুরি হেল্পলাইন' : 'Emergency hotlines'}
          className="w-[19rem] sm:w-80 bg-surface rounded-3xl shadow-modal border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up"
        >
          <div className="px-4 py-3 bg-red-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <h2 className="text-sm font-bold">{bn ? 'জরুরি সহায়তা' : 'Emergency help'}</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20"
              aria-label={bn ? 'বন্ধ করুন' : 'Close'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-2 max-h-[60vh] overflow-y-auto">
            {HOTLINES.map((hotline) => {
              const Icon = hotline.icon;
              return (
                <a
                  key={hotline.id}
                  href={`tel:${hotline.number.replace(/[^0-9+]/g, '')}`}
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-colors btn-press ${hotline.tone} ${
                    hotline.primary ? 'ring-2 ring-red-300 dark:ring-red-900' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-black">{hotline.number}</span>
                      <span className="text-[11px] font-bold opacity-90 truncate">
                        {bn ? hotline.labelBn : hotline.labelEn}
                      </span>
                    </div>
                    <p className="text-[10px] opacity-85 leading-tight mt-0.5">
                      {bn ? hotline.descBn : hotline.descEn}
                    </p>
                  </div>
                </a>
              );
            })}

            {(onOpenBeds || onOpenBloodBank) && (
              <div className="pt-2 grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-slate-800">
                {onOpenBeds && (
                  <button
                    onClick={() => {
                      onOpenBeds();
                      setIsOpen(false);
                    }}
                    className="p-2.5 rounded-2xl bg-paper border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-ink hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {bn ? 'খালি ICU বেড' : 'Free ICU beds'}
                  </button>
                )}
                {onOpenBloodBank && (
                  <button
                    onClick={() => {
                      onOpenBloodBank();
                      setIsOpen(false);
                    }}
                    className="p-2.5 rounded-2xl bg-paper border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-ink hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <Droplet className="w-3 h-3 text-red-600" />
                    {bn ? 'রক্তদাতা' : 'Blood donors'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={bn ? 'জরুরি হেল্পলাইন খুলুন' : 'Open emergency hotlines'}
        className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-modal flex flex-col items-center justify-center btn-press ring-4 ring-red-600/20"
      >
        <Siren className="w-5 h-5" />
        <span className="text-[9px] font-black tracking-wider">SOS</span>
      </button>
    </div>
  );
};
