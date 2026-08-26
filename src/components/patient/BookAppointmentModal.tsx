import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useQueue } from '../../context/QueueContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Stethoscope,
  Sparkles
} from 'lucide-react';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBooked?: () => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  onBooked
}) => {
  const { toBn } = useLanguage();
  const { advanceSerial } = useQueue();

  const [selectedSpecialty, setSelectedSpecialty] = useState('মেডিসিন');
  const [selectedDoctor, setSelectedDoctor] = useState('ডা. তানভীর হাসান (MBBS, FCPS)');
  const [selectedDate, setSelectedDate] = useState('2026-05-20');
  const [selectedSlot, setSelectedSlot] = useState('সন্ধ্যা ৬:০০ - রাত ৯:০০');
  const [isFollowUp, setIsFollowUp] = useState(false);

  if (!isOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`🎉 অ্যাপয়েন্টমেন্ট সফলভাবে বুক হয়েছে!\n\n👨‍⚕️ চিকিৎসক: ${selectedDoctor}\n📍 চেম্বার: ল্যাবএইড ডায়াগনস্টিক, ধানমন্ডি\n🎫 আপনার সিরিয়াল টোকেন: #১৮\n📅 তারিখ: ২০ মে, ২০২৬\n💰 ফি: ${isFollowUp ? '৳ ০ (ফ্রি ফলোআপ)' : '৳ ১২০০'}`);
    if (onBooked) onBooked();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto font-bangla">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[92vh] animate-slide-up">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-600 to-teal-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">নতুন অ্যাপয়েন্টমেন্ট বুকিং</h2>
              <p className="text-xs text-blue-100">
                বিশেষজ্ঞ ডাক্তার নির্বাচন করুন ও সিরিয়াল টোকেন নিশ্চিত করুন
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleBooking} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Department */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">বিভাগ বা বিশেষত্ব (Specialty):</label>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-hidden focus:border-blue-500"
            >
              <option value="মেডিসিন">মেডিসিন ও ডায়াবেটিস (Internal Medicine)</option>
              <option value="কার্ডিওলজি">হৃদরোগ ও কার্ডিওলজি (Cardiology)</option>
              <option value="সার্জারি">জেনারেল ও ল্যাপারোস্কপিক সার্জারি (Surgery)</option>
              <option value="গাইনি">স্ত্রী ও প্রসূতি রোগ (Gynae & Obs)</option>
              <option value="শিশু">শিশু বিশেষজ্ঞ (Pediatrics)</option>
              <option value="চর্ম">চর্ম ও যৌন রোগ (Dermatology)</option>
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">ডাক্তার নির্বাচন করুন:</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-hidden focus:border-blue-500"
            >
              <option value="ডা. তানভীর হাসান (MBBS, FCPS)">ডা. তানভীর হাসান (সহকারী অধ্যাপক, DMC - ল্যাবএইড ধানমন্ডি)</option>
              <option value="ডা. সায়রা আফরিন (MBBS, MD Cardiology)">ডা. সায়রা আফরিন (ন্যাশনাল হার্ট ফাউন্ডেশন)</option>
              <option value="ডা. রাকিবুল ইসলাম (MBBS, DDV, FCPS)">ডা. রাকিবুল ইসলাম (বিএসএমএমইউ পিজি হাসপাতাল)</option>
            </select>
          </div>

          {/* Date & Slot */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">তারিখ:</label>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">চেম্বার সময়:</label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-hidden focus:border-blue-500"
              >
                <option value="সকাল ১১:৩০ - দুপুর ১:৩০">সকাল ১১:৩০ - দুপুর ১:৩০</option>
                <option value="সন্ধ্যা ৬:০০ - রাত ৯:০০">সন্ধ্যা ৬:০০ - রাত ৯:০০</option>
              </select>
            </div>
          </div>

          {/* Follow-up Checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 cursor-pointer">
            <input
              type="checkbox"
              checked={isFollowUp}
              onChange={(e) => setIsFollowUp(e.target.checked)}
              className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <div>
              <strong className="text-emerald-900 block text-xs">১৪ দিনের ফ্রি রিপোর্ট রিভিউ / ফলোআপ</strong>
              <span className="text-[11px] text-emerald-700">
                আমি গত ১৪ দিনের মধ্যে এই ডাক্তারকে দেখিয়েছি এবং রিপোর্ট দেখাতে চাচ্ছি (কোনো কনসালটেশন ফি লাগবে না)।
              </span>
            </div>
          </label>

          {/* Fee Breakdown */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-700">অনুমোদিত কনসালটেশন ফি:</span>
            <span className="text-base font-black text-blue-600 font-mono">
              {isFollowUp ? '৳ ০ (ফ্রি রিভিউ)' : '৳ ১২০০'}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/25 transition-all"
          >
            অ্যাপয়েন্টমেন্ট ও সিরিয়াল টোকেন নিশ্চিত করুন
          </button>
        </form>
      </div>
    </div>
  );
};
