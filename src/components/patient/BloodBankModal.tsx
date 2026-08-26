import React, { useState } from 'react';
import { mockBloodDonors } from '../../mockData';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Droplet,
  Search,
  PhoneCall,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Heart,
  ShieldCheck
} from 'lucide-react';

interface BloodBankModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloodBankModal: React.FC<BloodBankModalProps> = ({ isOpen, onClose }) => {
  const { toBn } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');

  if (!isOpen) return null;

  const bloodGroups = ['ALL', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const districts = ['ALL', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'];

  const filteredDonors = mockBloodDonors.filter((d) => {
    const matchGroup = selectedGroup === 'ALL' || d.bloodGroup === selectedGroup;
    const matchDistrict = selectedDistrict === 'ALL' || d.district === selectedDistrict;
    return matchGroup && matchDistrict;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[92vh] animate-slide-up">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-600 to-rose-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Droplet className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-bangla">যাচাইকৃত রক্তদাতা অনুসন্ধান</h2>
              <p className="text-xs text-red-100 font-bangla">
                ৯০ দিনের কুলডাউন যাচাইসহ জরুরি রক্তদান নেটওয়ার্ক
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0 font-bangla">
          {/* Blood Group Pills */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1.5">রক্তের গ্রুপ নির্বাচন করুন:</span>
            <div className="flex flex-wrap gap-1.5">
              {bloodGroups.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all ${
                    selectedGroup === bg
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {bg === 'ALL' ? 'সকল গ্রুপ' : bg}
                </button>
              ))}
            </div>
          </div>

          {/* District Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 whitespace-nowrap">জেলা:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="py-1.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">সকল জেলা</option>
              <option value="Dhaka">ঢাকা (Dhaka)</option>
              <option value="Chittagong">চট্টগ্রাম (Chittagong)</option>
              <option value="Sylhet">সিলেট (Sylhet)</option>
              <option value="Rajshahi">রাজশাহী (Rajshahi)</option>
            </select>
          </div>
        </div>

        {/* Donors List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 font-bangla">
          <div className="text-xs text-slate-500 font-semibold mb-2">
            মোট পাওয়া গেছে: {toBn(filteredDonors.length)} জন রক্তদাতা
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 font-black font-mono text-base flex items-center justify-center border border-red-100 shrink-0">
                      {donor.bloodGroup}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-tight">{donor.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{donor.upazilaBn}, {donor.districtBn}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">মোট রক্তদান:</span>
                    <strong className="text-slate-800">{toBn(donor.totalDonations)} বার</strong>
                  </div>

                  {donor.isAvailable ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>রক্তদানে প্রস্তুত</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{toBn(donor.cooldownDaysRemaining)} দিন বাকি</span>
                    </span>
                  )}
                </div>

                <a
                  href={`tel:${donor.phone}`}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs ${
                    donor.isAvailable
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{donor.isAvailable ? `কল করুন (${donor.phone})` : 'এখন রক্তদানে অনুপলব্ধ'}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
