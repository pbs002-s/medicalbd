import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockClinicalCases, mockOSCEStations, mockPostGradQuestions, mockForumPosts, ForumPost } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import {
  GraduationCap,
  BookOpen,
  Calculator,
  Award,
  MessageSquare,
  ArrowLeft,
  ChevronRight,
  Plus,
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckSquare,
  Square,
  HelpCircle,
  Baby,
  Pill,
  AlertTriangle,
  CheckCircle2,
  ThumbsUp,
  MessageCircle,
  Share2,
  Sparkles,
  Send
} from 'lucide-react';

interface StudentHubPageProps {
  onBack?: () => void;
  initialTab?: 'logbook' | 'osce' | 'dose' | 'quiz' | 'forum';
}

export const StudentHubPage: React.FC<StudentHubPageProps> = ({ onBack, initialTab = 'logbook' }) => {
  const { currentUser, setActiveView } = useAuth();
  const { toBn } = useLanguage();

  const [activeTab, setActiveTab] = useState<'logbook' | 'osce' | 'dose' | 'quiz' | 'forum'>(initialTab);

  // --- LOGBOOK STATE ---
  const [selectedDept, setSelectedDept] = useState('all');
  const [isAddCaseOpen, setIsAddCaseOpen] = useState(false);

  // --- OSCE STATE ---
  const [selectedStation, setSelectedStation] = useState(mockOSCEStations[0]);
  const [checkedItemIds, setCheckedItemIds] = useState<string[]>([]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(selectedStation.timeLimitMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showVivaAnswers, setShowVivaAnswers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((t) => t - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeftSeconds]);

  const toggleCheck = (id: string) => {
    if (checkedItemIds.includes(id)) {
      setCheckedItemIds(checkedItemIds.filter((item) => item !== id));
    } else {
      setCheckedItemIds([...checkedItemIds, id]);
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeftSeconds(selectedStation.timeLimitMinutes * 60);
    setCheckedItemIds([]);
  };

  const totalScore = selectedStation.checklistItems
    .filter((item) => checkedItemIds.includes(item.id))
    .reduce((acc, item) => acc + item.marks, 0);

  const maxScore = selectedStation.checklistItems.reduce((acc, item) => acc + item.marks, 0);

  // --- PEDIATRIC DOSE CALCULATOR STATE ---
  const [weightKg, setWeightKg] = useState<number>(12);
  const [selectedDrug, setSelectedDrug] = useState<'paracetamol' | 'amoxicillin' | 'azithromycin' | 'salbutamol' | 'zinc'>('paracetamol');

  const calculateDose = () => {
    switch (selectedDrug) {
      case 'paracetamol': {
        const mgDose = weightKg * 15;
        const syrupMl = (mgDose / 24).toFixed(1);
        const dropsMl = (mgDose / 100).toFixed(1);
        const spoon = (Number(syrupMl) / 5).toFixed(1);
        return {
          drugName: 'Paracetamol (প্যারাসিটামল)',
          standardRule: '15 mg/kg/dose (৪-৬ ঘণ্টা পর পর, সর্বোচ্চ ৪ বার/দিন)',
          totalMg: `${mgDose.toFixed(0)} mg`,
          syrup: `Syr. Napa/Ace (120mg/5ml): ${toBn(syrupMl)} ml (প্রায় ${toBn(spoon)} চা চামচ)`,
          drops: `Pediatric Drops (80mg/0.8ml): ${toBn(dropsMl)} ml (${toBn(Math.round(Number(dropsMl) * 20))} ফোঁটা)`,
          warning: '২৪ ঘণ্টায় কোনো অবস্থাতেই ৬০ mg/kg এর বেশি দেওয়া যাবে না।'
        };
      }
      case 'amoxicillin': {
        const dailyMg = weightKg * 45;
        const singleDoseMg = dailyMg / 3;
        const syrupMl = (singleDoseMg / 25).toFixed(1);
        const forteMl = (singleDoseMg / 50).toFixed(1);
        return {
          drugName: 'Amoxicillin (এমোক্সিসিলিন)',
          standardRule: '45 mg/kg/day (৩ ভাগে বিভক্ত - প্রতি ৮ ঘণ্টা পর পর ৭ দিন)',
          totalMg: `প্রতি ডোজে ${singleDoseMg.toFixed(0)} mg`,
          syrup: `Syr. Moxacil/Fimoxyl (125mg/5ml): ${toBn(syrupMl)} ml (প্রতি ৮ ঘণ্টায়)`,
          drops: `Syr. Forte (250mg/5ml): ${toBn(forteMl)} ml (প্রতি ৮ ঘণ্টায়)`,
          warning: 'অ্যান্টিবায়োটিক কোর্স সম্পূর্ণ শেষ করতে হবে।'
        };
      }
      case 'azithromycin': {
        const dailyMg = weightKg * 10;
        const suspMl = (dailyMg / 40).toFixed(1);
        return {
          drugName: 'Azithromycin (এজিথ্রোমাইসিন)',
          standardRule: '10 mg/kg once daily for 3–5 days (দিনে ১ বার)',
          totalMg: `দৈনিক ${dailyMg.toFixed(0)} mg`,
          syrup: `Susp. Zithrox/Tridosil (200mg/5ml): ${toBn(suspMl)} ml (দিনে ১ বার খাবার ১ ঘণ্টা আগে)`,
          drops: `খাবার ১ ঘণ্টা আগে অথবা ২ ঘণ্টা পর খালি পেটে সেব্য।`,
          warning: 'কার্ডিয়াক বা এরিদমিয়ার ইতিহাস থাকলে সতর্ক থাকুন।'
        };
      }
      case 'salbutamol': {
        const singleMg = weightKg * 0.15;
        const syrupMl = (singleMg / 0.4).toFixed(1);
        return {
          drugName: 'Salbutamol (সালবুটামল)',
          standardRule: '0.15 mg/kg/dose TDS (৮ ঘণ্টা পর পর)',
          totalMg: `প্রতি ডোজে ${singleMg.toFixed(1)} mg`,
          syrup: `Syr. Ventolin/Windel (2mg/5ml): ${toBn(syrupMl)} ml (দিনে ৩ বার)`,
          drops: `তীব্র শ্বাসকষ্টে নেবুলাইজার বা ইনহেলার স্পেসার অধিক কার্যকর।`,
          warning: 'হার্টবিট বেড়ে যাওয়া বা বুক ধড়ফড় করতে পারে।'
        };
      }
      case 'zinc': {
        return {
          drugName: 'Zinc Sulfate (জিঙ্ক সালফেট - ডায়রিয়া প্রটোকল)',
          standardRule: 'শিশু ৬ মাসের কম: 10 mg/day, শিশু ৬ মাসের বেশি: 20 mg/day (১৪ দিন)',
          totalMg: weightKg < 6 ? '10 mg/day' : '20 mg/day',
          syrup: `Syr. Baby Zinc / Zif-S (10mg/5ml): ${weightKg < 6 ? '৫ ml' : '১০ ml'} দিনে ১ বার`,
          drops: `টানা ১৪ দিন খাওয়াতে হবে যা ডায়রিয়ার পুনরাবৃত্তি রোধ করে।`,
          warning: 'খাবারের সাথে বা খাবার পরে খাওয়ালে বমির ভাব কম হয়।'
        };
      }
    }
  };

  const doseResult = calculateDose();

  // --- POSTGRAD QUIZ STATE ---
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const currentQ = mockPostGradQuestions[currentQIndex];

  // --- FORUM STATE ---
  const [forumPostsList, setForumPostsList] = useState<ForumPost[]>(mockForumPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const handleLikePost = (id: string) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
    setForumPostsList(prev =>
      prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + (likedPosts[id] ? -1 : 1) } : p)
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-bangla">
      {/* Header & Breadcrumb */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onBack ? onBack() : setActiveView('dashboard')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors btn-press"
              title="ড্যাশবোর্ডে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  ড্যাশবোর্ড
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-purple-600 font-semibold">মেডিকেল শিক্ষার্থী ও ইন্টার্ন হাব</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5 flex items-center gap-2">
                <span>ক্লিনিক্যাল রিসোর্স ও এক্সাম প্র্যাকটিস</span>
                <Sparkles className="w-5 h-5 text-purple-600" />
              </h1>
            </div>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-2xl overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('logbook')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'logbook' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>কেস লগবুক</span>
            </button>

            <button
              onClick={() => setActiveTab('osce')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'osce' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>OSCE স্টেশন</span>
            </button>

            <button
              onClick={() => setActiveTab('dose')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'dose' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>ডোজ ক্যালকুলেটর</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'quiz' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>পোস্টগ্রাজুয়েট কুইজ</span>
            </button>

            <button
              onClick={() => setActiveTab('forum')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'forum' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>কেস ফোরাম</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* ===================== TAB 1: CLINICAL CASE LOGBOOK ===================== */}
      {activeTab === 'logbook' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">বিভাগ ফিল্টার:</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {['all', 'Medicine', 'Surgery', 'Gynae', 'Pediatrics'].map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedDept(w)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                      selectedDept === w ? 'bg-purple-600 text-white font-bold' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {w === 'all' ? 'সকল ওয়ার্ড' : w}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsAddCaseOpen(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs btn-press"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন কেস লগবুক এন্ট্রি</span>
            </button>
          </div>

          {/* Cases List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockClinicalCases
              .filter(c => selectedDept === 'all' || c.department.includes(selectedDept))
              .map((c, i) => (
                <ScrollReveal key={c.id} animation="fade-up" delay={i * 80}>
                  <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs hover:shadow-md hover:border-purple-200 transition-all space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                          {c.department}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm mt-1">{c.title}</h3>
                        <p className="text-[11px] text-slate-500">{c.patientAgeGender}</p>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          c.verifiedByDoctor
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {c.verifiedByDoctor ? 'ভেরিফায়েড ✔' : 'ভেরিফিকেশন পেন্ডিং'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                      <strong>প্রধান সমস্যা:</strong> {c.chiefComplaint}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>লেখক: {c.authorStudent}</span>
                      <span>লাইক: {toBn(c.likesCount)}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 2: OSCE / OSPE STATIONS ===================== */}
      {activeTab === 'osce' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-8 space-y-6">
          {/* Station Selectors & Timer Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap gap-2">
              {mockOSCEStations.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStation(st);
                    setTimeLeftSeconds(st.timeLimitMinutes * 60);
                    setIsTimerRunning(false);
                    setCheckedItemIds([]);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedStation.id === st.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {st.title}
                </button>
              ))}
            </div>

            {/* Timer & Score Box */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200 font-mono font-bold text-xs">
                <Timer className="w-4 h-4 text-blue-600" />
                <span className={`text-base ${timeLeftSeconds < 60 ? 'text-red-600 animate-pulse font-black' : 'text-slate-800'}`}>
                  {toBn(String(Math.floor(timeLeftSeconds / 60)).padStart(2, '0'))}:{toBn(String(timeLeftSeconds % 60).padStart(2, '0'))}
                </span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 ml-1"
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button onClick={resetTimer} className="p-1 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="px-3.5 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>স্কোর: {toBn(totalScore.toFixed(1))} / {toBn(maxScore.toFixed(1))}</span>
              </div>
            </div>
          </div>

          {/* Scenario Box */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
              স্টেশন সিনারিও (OSCE Scenario):
            </span>
            <p className="text-sm font-bold text-slate-900 leading-snug">{selectedStation.scenario}</p>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-sm">পরীক্ষকের স্টেপ-বাই-স্টেপ মার্কিং চেকলিস্ট:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {selectedStation.checklistItems.map((item) => {
                const isChecked = checkedItemIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3 rounded-2xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{item.text}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono font-bold text-slate-600 shrink-0">
                      +{toBn(item.marks)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High Yield Viva Questions */}
          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-purple-600" />
              <span>স্টেশন সংলগ্ন ভাইভা প্রশ্ন ও মডেল উত্তর (Viva Q&A):</span>
            </h4>
            <div className="space-y-2">
              {selectedStation.vivaQuestions.map((vq, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-purple-950 text-xs">Q{i + 1}: {vq.question}</p>
                    <button
                      onClick={() => setShowVivaAnswers({ ...showVivaAnswers, [i]: !showVivaAnswers[i] })}
                      className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-700 rounded-lg text-[10px] font-bold border border-purple-200 shrink-0"
                    >
                      {showVivaAnswers[i] ? 'উত্তর লুকান' : 'উত্তর দেখুন'}
                    </button>
                  </div>
                  {showVivaAnswers[i] && (
                    <p className="p-2.5 bg-white rounded-xl border border-purple-200/60 text-slate-700 leading-relaxed text-[11px] animate-in fade-in">
                      💡 <strong>মডেল উত্তর:</strong> {vq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: PEDIATRIC DOSE CALCULATOR ===================== */}
      {activeTab === 'dose' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">পেডিয়াট্রিক mg/kg ওজনভিত্তিক ডোজ ক্যালকুলেটর</h2>
              <p className="text-xs text-slate-500">শিশুর সঠিক ওজন অনুযায়ী সিরাপ ও ড্রপসের নিখুঁত পরিমাণ হিসেব</p>
            </div>
          </div>

          {/* Weight Slider */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-amber-700" />
                <span>শিশুর শারীরিক ওজন (Weight in kg):</span>
              </label>
              <span className="text-2xl font-black text-amber-700 font-mono">{toBn(weightKg)} কেজি</span>
            </div>

            <input
              type="range"
              min="2"
              max="40"
              step="0.5"
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value))}
              className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />

            <div className="flex justify-between text-[10px] text-amber-800 font-mono">
              <span>২ কেজি (নবজাতক)</span>
              <span>১০ কেজি (~১ বছর)</span>
              <span>২০ কেজি (~৫ বছর)</span>
              <span>৪০ কেজি (~১২ বছর)</span>
            </div>
          </div>

          {/* Compact Drug Pills */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">ওষুধ নির্বাচন করুন:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'paracetamol', label: 'Paracetamol (জ্বর/ব্যথা)' },
                { id: 'amoxicillin', label: 'Amoxicillin (অ্যান্টিবায়োটিক)' },
                { id: 'azithromycin', label: 'Azithromycin (অ্যাজিথ্রো)' },
                { id: 'salbutamol', label: 'Salbutamol (কাশি/হাঁপানি)' },
                { id: 'zinc', label: 'Zinc (ডায়রিয়া প্রটোকল)' },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDrug(d.id as any)}
                  className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                    selectedDrug === d.id
                      ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result Output Card */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-md">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">নির্ধারিত ডোজ ফলাফল</span>
                <h3 className="text-base font-bold text-white mt-0.5">{doseResult.drugName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{doseResult.standardRule}</p>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-mono font-black">
                {toBn(doseResult.totalMg)}
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-200">
              <div className="p-3 rounded-xl bg-slate-800/80 flex items-center gap-2.5">
                <span className="text-amber-400 font-bold">🥄 সিরাপ ডোজ:</span>
                <span className="font-semibold text-white">{doseResult.syrup}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 flex items-center gap-2.5">
                <span className="text-teal-400 font-bold">💧 ড্রপস/বিকল্প:</span>
                <span className="text-slate-300">{doseResult.drops}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/60 text-red-200 text-[11px] flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{doseResult.warning}</span>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 4: POSTGRAD QUIZ ===================== */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">FCPS Part-1 ও রেসিডেন্সি মক টেস্ট</h3>
                <p className="text-xs text-slate-500">প্রশ্ন {toBn(currentQIndex + 1)} / {toBn(mockPostGradQuestions.length)}</p>
              </div>
            </div>

            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
              {currentQ.examType}
            </span>
          </div>

          {/* Question Text */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-2.5 text-xs">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedAnswers[currentQIndex] === i;
              const isCorrect = i === currentQ.correctOptionIndex;
              const hasAnswered = selectedAnswers[currentQIndex] !== undefined;

              return (
                <button
                  key={i}
                  onClick={() => {
                    if (!hasAnswered) {
                      setSelectedAnswers({ ...selectedAnswers, [currentQIndex]: i });
                      setShowExplanation({ ...showExplanation, [currentQIndex]: true });
                    }
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    hasAnswered
                      ? isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                        : isSelected
                        ? 'bg-red-50 border-red-300 text-red-950'
                        : 'bg-white border-slate-100 text-slate-400'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{opt}</span>
                  {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation[currentQIndex] && (
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs space-y-1 animate-in fade-in">
              <h5 className="font-bold text-blue-950">💡 ক্লিনিক্যাল ব্যাখ্যা (Clinical Rationale):</h5>
              <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex(prev => prev - 1)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40"
            >
              পূর্ববর্তী প্রশ্ন
            </button>
            <button
              disabled={currentQIndex === mockPostGradQuestions.length - 1}
              onClick={() => setCurrentQIndex(prev => prev + 1)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              পরবর্তী প্রশ্ন
            </button>
          </div>
        </div>
      )}

      {/* ===================== TAB 5: CLINICAL CASE FORUM ===================== */}
      {activeTab === 'forum' && (
        <div className="space-y-6">
          {/* Post New Case Card */}
          <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">নতুন ক্লিনিক্যাল কেস বা ECG আলোচনা পোস্ট করুন</h3>
            <textarea
              rows={2}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="কেসের উপসর্গ, ইসিজি বা হিস্ট্রি শেয়ার করুন এবং সিনিয়রদের মতামত নিন..."
              className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-hidden focus:border-indigo-500 font-bangla"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (newPostContent.trim()) {
                    alert('🎉 আপনার কেসটি ফোরামে পোস্ট করা হয়েছে!');
                    setNewPostContent('');
                  }
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs btn-press"
              >
                <Send className="w-3.5 h-3.5" />
                <span>পোস্ট করুন</span>
              </button>
            </div>
          </div>

          {/* Forum Feeds */}
          <div className="space-y-4">
            {forumPostsList.map((post: ForumPost, i: number) => (
              <ScrollReveal key={post.id} animation="fade-up" delay={i * 80}>
                <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorNameBn}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{post.authorNameBn}</h4>
                        <p className="text-[11px] text-slate-400">{post.authorTitleBn} • {post.createdAtBn}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                      {post.categoryBn}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">{post.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    {post.content}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          likedPosts[post.id]
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{toBn(post.upvotes)} আপভোট</span>
                      </button>

                      <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-semibold">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{toBn(post.commentsCount)}টি মন্তব্য</span>
                      </button>
                    </div>

                    <button className="p-1.5 text-slate-400 hover:text-slate-700">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHubPage;
