import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockBloodDonors } from '../../mockData';
import { BloodDonor } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  Droplet,
  ArrowLeft,
  ChevronRight,
  Search,
  PhoneCall,
  ShieldCheck,
  Heart,
  Plus,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Share2
} from 'lucide-react';

interface BloodBankPageProps {
  onBack?: () => void;
}

export const BloodBankPage: React.FC<BloodBankPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { toBn } = useLanguage();

  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegisterDonorOpen, setIsRegisterDonorOpen] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const filteredDonors = mockBloodDonors.filter((d) => {
    const matchesGroup = selectedBloodGroup === 'all' || d.bloodGroup === selectedBloodGroup;
    const matchesDistrict = selectedDistrict === 'all' || d.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.districtBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.upazilaBn.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesGroup && matchesDistrict && matchesSearch;
  });

  const availableDonorsCount = mockBloodDonors.filter((d) => d.isAvailable).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* Header & Breadcrumb */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack ? onBack() : setActiveView('dashboard')}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors btn-press"
              title="ড্যাশবোর্ডে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  ড্যাশবোর্ড
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-red-600 font-semibold">জরুরি রক্তদাতা নেটওয়ার্ক</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5 flex items-center gap-2">
                <span>রক্তের সন্ধানে • ব্লাড ডোনার ডিরেক্টরি</span>
                <Droplet className="w-6 h-6 text-red-600 fill-red-600 animate-heart-beat" />
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRegisterDonorOpen(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all btn-press"
            >
              <Plus className="w-4 h-4" />
              <span>রক্তদাতা হিসেবে যোগ দিন</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Emergency Request Feed Banner */}
      <ScrollReveal animation="fade-up" duration={400}>
        <div className="p-5 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <span className="text-2xl font-black">O-</span>
            </div>
            <div>
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mb-1">
                 অতি জরুরি রক্তের আবেদন
              </span>
              <h3 className="font-bold text-base">২ ব্যাগ O নেগেটিভ রক্ত প্রয়োজন (থ্যালাসেমিয়া রোগী)</h3>
              <p className="text-xs text-red-100">স্থান: ঢাকা মেডিকেল কলেজ হাসপাতাল (রক্ত দিন, জীবন বাঁচান)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:01711998877"
              className="px-4 py-2.5 bg-white dark:bg-slate-900 text-red-700 hover:bg-red-50 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all btn-press"
            >
              <PhoneCall className="w-4 h-4" />
              <span>যোগাযোগ করুন</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Blood Group Filter Pills (Compact & Sleek) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">রক্তের গ্রুপ অনুযায়ী খুঁজুন:</span>
          <span className="text-xs text-emerald-600 font-bold">
            {toBn(availableDonorsCount)} জন রক্তদাতা অবিলম্বে প্রস্তুত 
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedBloodGroup('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedBloodGroup === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            সকল গ্রুপ ({toBn(mockBloodDonors.length)})
          </button>

          {bloodGroups.map((bg) => {
            const count = mockBloodDonors.filter((d) => d.bloodGroup === bg).length;
            const isSelected = selectedBloodGroup === bg;
            return (
              <button
                key={bg}
                onClick={() => setSelectedBloodGroup(bg)}
                className={`px-4 py-2 rounded-2xl text-xs font-mono font-black transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-700 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {bg} ({toBn(count)})
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Location Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="নাম, থানা বা এলাকা দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs focus:outline-hidden focus:border-red-500 font-bangla"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold shrink-0">জেলা:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bangla focus:outline-hidden"
          >
            <option value="all">সকল জেলা</option>
            <option value="Dhaka">ঢাকা</option>
            <option value="Chittagong">চট্টগ্রাম</option>
          </select>
        </div>
      </div>

      {/* Verified Donors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.map((donor, index) => (
          <ScrollReveal key={donor.id} animation="fade-up" delay={index * 60}>
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-red-200 transition-all space-y-3.5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center font-mono font-black text-red-600 text-lg shadow-2xs">
                    {donor.bloodGroup}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-50 text-sm leading-tight">{donor.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{donor.upazilaBn}, {donor.districtBn}</span>
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${
                    donor.isAvailable
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {donor.isAvailable ? 'রক্তদানে প্রস্তুত' : `কুলডাউন (${toBn(donor.cooldownDaysRemaining)} দিন)`}
                </span>
              </div>

              {/* Donor Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] block">সর্বশেষ রক্তদান</span>
                  <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{donor.lastDonationDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] block">মোট রক্তদান</span>
                  <span className="font-bold text-red-600">{toBn(donor.totalDonations)} বার</span>
                </div>
              </div>

              {/* Call Action Button */}
              <div className="pt-1 flex gap-2">
                <a
                  href={`tel:${donor.phone}`}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all btn-press"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>কল করুন ({donor.phone})</span>
                </a>

                <button
                  onClick={() => alert(` রক্তদাতা ${donor.name} এর তথ্য কপি করা হয়েছে!`)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  title="শেয়ার করুন"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* REGISTER DONOR MODAL */}
      {isRegisterDonorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800 animate-slide-up">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">রক্তদাতা হিসেবে নিবন্ধন করুন</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">আপনার পূর্ণ নাম</label>
                <input
                  type="text"
                  placeholder="যেমন: সালমান আহমেদ"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-bangla"
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">রক্তের গ্রুপ</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-bold">
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  placeholder="017XXXXXXXX"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">জেলা ও থানা</label>
                <input
                  type="text"
                  placeholder="যেমন: ঢাকা, ধানমন্ডি"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-bangla"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsRegisterDonorOpen(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                বাতিল
              </button>
              <button
                onClick={() => {
                  alert(' রক্তদাতা নিবন্ধন সফল হয়েছে! ধন্যবাদ আপনার মহতী উদ্যোগের জন্য।');
                  setIsRegisterDonorOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white font-bold text-xs"
              >
                নিবন্ধন সম্পন্ন করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodBankPage;
