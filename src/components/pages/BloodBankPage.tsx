import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockBloodDonors } from '../../mockData';
import { BloodDonor } from '../../types';
import { ScrollReveal } from '../common/ScrollReveal';
import { checkDonorEligibility } from '../../lib/clinical';
import {
  Droplet,
  ArrowLeft,
  ChevronRight,
  Search,
  PhoneCall,
  ShieldCheck,
  Plus,
  MapPin,
  Share2
} from 'lucide-react';

interface BloodBankPageProps {
  onBack?: () => void;
}

export const BloodBankPage: React.FC<BloodBankPageProps> = ({ onBack }) => {
  const { setActiveView } = useAuth();
  const { tr, num, isBn } = useLanguage();

  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegisterDonorOpen, setIsRegisterDonorOpen] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const donors = useMemo(
    () =>
      mockBloodDonors.map((donor) => {
        const eligibility = checkDonorEligibility(donor.lastDonationDate);
        return {
          ...donor,
          isAvailable: eligibility.isEligible,
          cooldownDaysRemaining: eligibility.cooldownDaysRemaining,
        };
      }),
    []
  );

  const filteredDonors = donors.filter((d) => {
    const matchesGroup = selectedBloodGroup === 'all' || d.bloodGroup === selectedBloodGroup;
    const matchesDistrict = selectedDistrict === 'all' || d.district.toLowerCase() === selectedDistrict.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      d.name.toLowerCase().includes(query) ||
      d.district.toLowerCase().includes(query) ||
      d.districtBn.toLowerCase().includes(query) ||
      d.upazilaBn.toLowerCase().includes(query);

    return matchesGroup && matchesDistrict && matchesSearch;
  });

  const availableDonorsCount = donors.filter((d) => d.isAvailable).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header & Breadcrumb */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack ? onBack() : setActiveView('dashboard')}
              className="p-2 rounded-xl bg-paper hover:bg-slate-100 dark:hover:bg-slate-800 text-muted hover:text-ink transition-colors border border-border"
              title={tr('Back to Dashboard', 'ড্যাশবোর্ডে ফিরে যান')}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-muted font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  {tr('Dashboard', 'ড্যাশবোর্ড')}
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-red-600 font-semibold">{tr('Emergency Blood Donor Network', 'জরুরি রক্তদাতা নেটওয়ার্ক')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5 flex items-center gap-2">
                <span>{tr('Blood Donors Directory & 90-Day Tracker', 'রক্তের সন্ধানে • ব্লাড ডোনার ডিরেক্টরি')}</span>
                <Droplet className="w-6 h-6 text-red-600 fill-red-600" />
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRegisterDonorOpen(true)}
              className="btn btn-primary bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-xs border-0"
            >
              <Plus className="w-4 h-4" />
              <span>{tr('Register as Donor', 'রক্তদাতা হিসেবে যোগ দিন')}</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Emergency Request Feed Banner */}
      <ScrollReveal animation="fade-up" duration={400}>
        <div className="card card-pad bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-elevation-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-0">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <span className="text-2xl font-black">O-</span>
            </div>
            <div>
              <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mb-1">
                {tr('URGENT BLOOD APPEAL', 'অতি জরুরি রক্তের আবেদন')}
              </span>
              <h3 className="font-bold text-base">
                {tr('2 Bags of O Negative Blood Needed (Thalassemia Patient)', '২ ব্যাগ O নেগেটিভ রক্ত প্রয়োজন (থ্যালাসেমিয়া রোগী)')}
              </h3>
              <p className="text-xs text-red-100">
                {tr('Location: Dhaka Medical College Hospital (Donate blood, save a life)', 'স্থান: ঢাকা মেডিকেল কলেজ হাসপাতাল (রক্ত দিন, জীবন বাঁচান)')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:01711998877"
              className="px-4 py-2.5 bg-white text-red-700 hover:bg-red-50 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{tr('Call Attendant', 'যোগাযোগ করুন')}</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Quick Blood Group Filter Pills */}
      <div className="card card-pad bg-surface border border-border shadow-elevation-1 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-ink">{tr('Filter by Blood Group:', 'রক্তের গ্রুপ অনুযায়ী খুঁজুন:')}</span>
          <span className="text-xs text-emerald-600 font-bold">
            {tr(`${num(availableDonorsCount)} donors available right now`, `${num(availableDonorsCount)} জন রক্তদাতা অবিলম্বে প্রস্তুত`)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedBloodGroup('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedBloodGroup === 'all'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-paper text-ink hover:bg-slate-100 dark:hover:bg-slate-800 border border-border'
            }`}
          >
            {tr('All Groups', 'সকল গ্রুপ')} ({num(mockBloodDonors.length)})
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
                    : 'bg-paper text-ink hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 border border-border'
                }`}
              >
                {bg} ({num(count)})
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Location Bar */}
      <div className="card card-pad bg-surface border border-border shadow-elevation-1 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={tr('Search by donor name or area...', 'নাম, থানা বা এলাকা দিয়ে খুঁজুন...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-paper border border-border text-xs focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-muted font-bold shrink-0">{tr('District:', 'জেলা:')}</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 bg-paper border border-border rounded-xl text-xs font-semibold focus:outline-hidden text-ink"
          >
            <option value="all">{tr('All Districts', 'সকল জেলা')}</option>
            <option value="Dhaka">{tr('Dhaka', 'ঢাকা')}</option>
            <option value="Chittagong">{tr('Chittagong', 'চট্টগ্রাম')}</option>
          </select>
        </div>
      </div>

      {/* Verified Donors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.map((donor, index) => (
          <ScrollReveal key={donor.id} animation="fade-up" delay={index * 60}>
            <div className="card card-pad bg-surface border border-border hover:border-red-300 shadow-elevation-1 hover:shadow-elevation-2 transition-all space-y-3.5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center justify-center font-mono font-black text-red-600 text-lg shadow-2xs">
                    {donor.bloodGroup}
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-sm leading-tight">{donor.name}</h3>
                    <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-muted" />
                      <span>{isBn ? `${donor.upazilaBn}, ${donor.districtBn}` : `${donor.district}, ${donor.district}`}</span>
                    </p>
                  </div>
                </div>

                <span
                  className={`pill text-[10px] shrink-0 ${
                    donor.isAvailable ? 'pill-success' : 'pill-warning'
                  }`}
                >
                  {donor.isAvailable
                    ? tr('Ready to Donate', 'রক্তদানে প্রস্তুত')
                    : tr(`Cooldown (${num(donor.cooldownDaysRemaining)}d)`, `কুলডাউন (${num(donor.cooldownDaysRemaining)} দিন)`)}
                </span>
              </div>

              {/* Donor Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-paper p-2.5 rounded-2xl border border-border">
                <div>
                  <span className="text-muted text-[10px] block">{tr('Last Donation', 'সর্বশেষ রক্তদান')}</span>
                  <span className="font-mono font-semibold text-ink">{donor.lastDonationDate}</span>
                </div>
                <div>
                  <span className="text-muted text-[10px] block">{tr('Total Donations', 'মোট রক্তদান')}</span>
                  <span className="font-bold text-red-600">{num(donor.totalDonations)} {tr('times', 'বার')}</span>
                </div>
              </div>

              {/* Call Action Button */}
              <div className="pt-1 flex gap-2">
                <a
                  href={`tel:${donor.phone}`}
                  className="btn btn-primary bg-red-600 hover:bg-red-700 text-white flex-1 py-2 text-xs font-bold border-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{tr(`Call (${donor.phone})`, `কল করুন (${donor.phone})`)}</span>
                </a>

                <button
                  onClick={() => alert(tr(`Donor ${donor.name} phone number copied!`, `রক্তদাতা ${donor.name} এর তথ্য কপি করা হয়েছে!`))}
                  className="btn btn-outline p-2 text-xs"
                  title={tr('Share Donor Info', 'শেয়ার করুন')}
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
          <div className="card card-pad bg-surface rounded-3xl max-w-md w-full p-6 space-y-4 shadow-elevation-3 border border-border animate-slide-up">
            <h3 className="text-base font-bold text-ink">
              {tr('Register as a Volunteer Blood Donor', 'রক্তদাতা হিসেবে নিবন্ধন করুন')}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-ink font-bold block mb-1">
                  {tr('Full Name', 'আপনার পূর্ণ নাম')}
                </label>
                <input
                  type="text"
                  placeholder={tr('e.g., Salman Ahmed', 'যেমন: সালমান আহমেদ')}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border"
                />
              </div>
              <div>
                <label className="text-ink font-bold block mb-1">
                  {tr('Blood Group', 'রক্তের গ্রুপ')}
                </label>
                <select className="w-full p-2.5 rounded-xl bg-paper border border-border font-bold text-ink">
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-ink font-bold block mb-1">
                  {tr('Mobile Phone Number', 'মোবাইল নম্বর')}
                </label>
                <input
                  type="tel"
                  placeholder="017XXXXXXXX"
                  className="w-full p-2.5 rounded-xl bg-paper border border-border font-mono text-ink"
                />
              </div>
              <div>
                <label className="text-ink font-bold block mb-1">
                  {tr('District & Upazila', 'জেলা ও থানা')}
                </label>
                <input
                  type="text"
                  placeholder={tr('e.g., Dhaka, Dhanmondi', 'যেমন: ঢাকা, ধানমন্ডি')}
                  className="w-full p-2.5 rounded-xl bg-paper border border-border text-ink"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsRegisterDonorOpen(false)}
                className="btn btn-outline flex-1 py-2 text-xs"
              >
                {tr('Cancel', 'বাতিল')}
              </button>
              <button
                onClick={() => {
                  alert(tr('Donor registration successful! Thank you for your noble contribution.', 'রক্তদাতা নিবন্ধন সফল হয়েছে! ধন্যবাদ আপনার মহতী উদ্যোগের জন্য।'));
                  setIsRegisterDonorOpen(false);
                }}
                className="btn btn-primary bg-red-600 hover:bg-red-700 text-white flex-1 py-2 text-xs border-0"
              >
                {tr('Complete Registration', 'নিবন্ধন সম্পন্ন করুন')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodBankPage;
