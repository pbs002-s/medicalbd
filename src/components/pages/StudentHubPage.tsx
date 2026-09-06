import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockClinicalCases, mockOSCEStations, mockPostGradQuestions, mockForumPosts, ForumPost } from '../../mockData';
import { ScrollReveal } from '../common/ScrollReveal';
import { PediatricDoseCalculator } from '../student/PediatricDoseCalculator';
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
  const { tr, num, isBn } = useLanguage();

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
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    setForumPostsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + (likedPosts[id] ? -1 : 1) } : p))
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header & Breadcrumb (OpenGovtBD card style) */}
      <ScrollReveal animation="fade-down" duration={400}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-5 rounded-3xl border border-border shadow-elevation-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (onBack ? onBack() : setActiveView('dashboard'))}
              className="p-2 rounded-xl bg-paper hover:bg-slate-200 dark:hover:bg-slate-800 text-ink transition-colors btn-press"
              title={tr('Return to Dashboard', 'ড্যাশবোর্ডে ফিরে যান')}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-muted font-medium">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveView('dashboard')}>
                  {tr('Dashboard', 'ড্যাশবোর্ড')}
                </span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-blue-600 font-semibold">{tr('Medical Student & Intern Hub', 'মেডিকেল শিক্ষার্থী ও ইন্টার্ন হাব')}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight mt-0.5 flex items-center gap-2">
                <span>{tr('Clinical Resources & Exam Practice', 'ক্লিনিক্যাল রিসোর্স ও এক্সাম প্র্যাকটিস')}</span>
                <Sparkles className="w-5 h-5 text-blue-600" />
              </h1>
            </div>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-paper p-1 rounded-2xl border border-border overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('logbook')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'logbook' ? 'bg-blue-600 text-white shadow-xs' : 'text-muted hover:text-ink'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{tr('Case Logbook', 'কেস লগবুক')}</span>
            </button>

            <button
              onClick={() => setActiveTab('osce')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'osce' ? 'bg-blue-600 text-white shadow-xs' : 'text-muted hover:text-ink'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{tr('OSCE Stations', 'OSCE স্টেশন')}</span>
            </button>

            <button
              onClick={() => setActiveTab('dose')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'dose' ? 'bg-blue-600 text-white shadow-xs' : 'text-muted hover:text-ink'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{tr('Dose Calculator', 'ডোজ ক্যালকুলেটর')}</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'quiz' ? 'bg-blue-600 text-white shadow-xs' : 'text-muted hover:text-ink'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{tr('Postgrad Quiz', 'পোস্টগ্রাজুয়েট কুইজ')}</span>
            </button>

            <button
              onClick={() => setActiveTab('forum')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'forum' ? 'bg-blue-600 text-white shadow-xs' : 'text-muted hover:text-ink'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{tr('Case Forum', 'কেস ফোরাম')}</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* ===================== TAB 1: CLINICAL CASE LOGBOOK ===================== */}
      {activeTab === 'logbook' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-surface p-4 rounded-2xl border border-border shadow-elevation-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-ink">{tr('Department Filter:', 'বিভাগ ফিল্টার:')}</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {['all', 'Medicine', 'Surgery', 'Gynae', 'Pediatrics'].map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedDept(w)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                      selectedDept === w
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-paper text-muted hover:text-ink border border-border'
                    }`}
                  >
                    {w === 'all' ? tr('All Wards', 'সকল ওয়ার্ড') : w}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsAddCaseOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{tr('New Case Entry', 'নতুন কেস লগবুক এন্ট্রি')}</span>
            </button>
          </div>

          {/* Cases List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockClinicalCases
              .filter((c) => selectedDept === 'all' || c.department.includes(selectedDept))
              .map((c, i) => (
                <ScrollReveal key={c.id} animation="fade-up" delay={i * 80}>
                  <div className="card card-pad hoverable space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="pill pill-info text-[10px]">
                          {c.department}
                        </span>
                        <h3 className="font-bold text-ink text-sm mt-1">{c.title}</h3>
                        <p className="text-[11px] text-muted">{c.patientAgeGender}</p>
                      </div>

                      <span
                        className={`pill text-[10px] ${
                          c.verifiedByDoctor ? 'pill-success' : 'pill-warning'
                        }`}
                      >
                        {c.verifiedByDoctor
                          ? tr('Verified', 'ভেরিফায়েড')
                          : tr('Pending Verification', 'ভেরিফিকেশন পেন্ডিং')}
                      </span>
                    </div>

                    <p className="text-xs text-ink bg-paper p-3 rounded-2xl border border-border leading-relaxed">
                      <strong>{tr('Chief Complaint:', 'প্রধান সমস্যা:')}</strong> {c.chiefComplaint}
                    </p>

                    <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted">
                      <span>{tr('Author: ', 'লেখক: ')}{c.authorStudent}</span>
                      <span>{tr('Likes: ', 'লাইক: ')}{num(c.likesCount)}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 2: OSCE / OSPE STATIONS ===================== */}
      {activeTab === 'osce' && (
        <div className="card card-pad space-y-6">
          {/* Station Selectors & Timer Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-5">
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
                      : 'bg-paper border border-border text-ink hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {st.title}
                </button>
              ))}
            </div>

            {/* Timer & Score Box */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-paper px-3.5 py-2 rounded-2xl border border-border font-mono font-bold text-xs">
                <Timer className="w-4 h-4 text-blue-600" />
                <span
                  className={`text-base ${
                    timeLeftSeconds < 60 ? 'text-red-600 animate-pulse font-black' : 'text-ink'
                  }`}
                >
                  {num(String(Math.floor(timeLeftSeconds / 60)).padStart(2, '0'))}:
                  {num(String(timeLeftSeconds % 60).padStart(2, '0'))}
                </span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 ml-1"
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-1 rounded-lg bg-paper text-muted hover:bg-slate-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pill pill-success text-xs py-1.5 font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>
                  {tr('Score: ', 'স্কোর: ')}{num(totalScore.toFixed(1))} / {num(maxScore.toFixed(1))}
                </span>
              </div>
            </div>
          </div>

          {/* Scenario Box */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-xs">
            <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block mb-1">
              {tr('Station Scenario:', 'স্টেশন সিনারিও (OSCE Scenario):')}
            </span>
            <p className="text-sm font-bold text-ink leading-snug">{selectedStation.scenario}</p>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-ink text-sm">
              {tr("Examiner's Step-by-Step Marking Checklist:", 'পরীক্ষকের স্টেপ-বাই-স্টেপ মার্কিং চেকলিস্ট:')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {selectedStation.checklistItems.map((item) => {
                const isChecked = checkedItemIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3 rounded-2xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 font-semibold shadow-2xs'
                        : 'bg-surface border-border text-ink hover:bg-paper'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-muted shrink-0 mt-0.5" />
                      )}
                      <span className="leading-relaxed">{item.text}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-paper border border-border font-mono font-bold text-ink shrink-0">
                      +{num(item.marks)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* High Yield Viva Questions */}
          <div className="space-y-3 pt-4 border-t border-border text-xs">
            <h4 className="font-bold text-ink text-sm flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>{tr('Station Viva Q&A & Model Answers:', 'স্টেশন সংলগ্ন ভাইভা প্রশ্ন ও মডেল উত্তর (Viva Q&A):')}</span>
            </h4>
            <div className="space-y-2">
              {selectedStation.vivaQuestions.map((vq, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-paper border border-border space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-ink text-xs">
                      Q{i + 1}: {vq.question}
                    </p>
                    <button
                      onClick={() => setShowVivaAnswers({ ...showVivaAnswers, [i]: !showVivaAnswers[i] })}
                      className="btn btn-outline btn-sm py-1 px-2 text-[10px]"
                    >
                      {showVivaAnswers[i] ? tr('Hide Answer', 'উত্তর লুকান') : tr('Show Answer', 'উত্তর দেখুন')}
                    </button>
                  </div>
                  {showVivaAnswers[i] && (
                    <p className="p-2.5 bg-surface rounded-xl border border-border text-ink leading-relaxed text-[11px] animate-slide-down">
                      <strong>{tr('Model Answer:', 'মডেল উত্তর:')}</strong> {vq.answer}
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
        <div className="card card-pad max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-ink">
                {tr('Pediatric mg/kg Weight-Based Dose Calculator', 'পেডিয়াট্রিক mg/kg ওজনভিত্তিক ডোজ ক্যালকুলেটর')}
              </h2>
              <p className="text-xs text-muted">
                {tr(
                  'Exact dosing volumes for syrups, suspensions, and drops by age & weight',
                  'ওজন ও বয়স অনুযায়ী সিরাপ, সাসপেনশন ও ড্রপসের নিখুঁত পরিমাণ'
                )}
              </p>
            </div>
          </div>

          <PediatricDoseCalculator />
        </div>
      )}

      {/* ===================== TAB 4: POSTGRAD QUIZ ===================== */}
      {activeTab === 'quiz' && (
        <div className="card card-pad max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ink">
                  {tr('FCPS Part-1 & Residency Mock Exam', 'FCPS Part-1 ও রেসিডেন্সি মক টেস্ট')}
                </h3>
                <p className="text-xs text-muted">
                  {tr('Question', 'প্রশ্ন')} {num(currentQIndex + 1)} / {num(mockPostGradQuestions.length)}
                </p>
              </div>
            </div>

            <span className="pill pill-success text-xs">
              {currentQ.examType}
            </span>
          </div>

          {/* Question Text */}
          <div className="p-4 rounded-2xl bg-paper border border-border">
            <h4 className="text-sm sm:text-base font-bold text-ink leading-relaxed">
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
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 font-bold'
                        : isSelected
                        ? 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-950 dark:text-red-100'
                        : 'bg-surface border-border text-muted'
                      : 'bg-surface border-border text-ink hover:bg-paper'
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
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-xs space-y-1 animate-slide-down">
              <h5 className="font-bold text-blue-950 dark:text-blue-100">
                {tr('Clinical Rationale:', 'ক্লিনিক্যাল ব্যাখ্যা (Clinical Rationale):')}
              </h5>
              <p className="text-ink leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between pt-4 border-t border-border">
            <button
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex((prev) => prev - 1)}
              className="btn btn-outline btn-sm disabled:opacity-40"
            >
              {tr('Previous Question', 'পূর্ববর্তী প্রশ্ন')}
            </button>
            <button
              disabled={currentQIndex === mockPostGradQuestions.length - 1}
              onClick={() => setCurrentQIndex((prev) => prev + 1)}
              className="btn btn-primary btn-sm disabled:opacity-40"
            >
              {tr('Next Question', 'পরবর্তী প্রশ্ন')}
            </button>
          </div>
        </div>
      )}

      {/* ===================== TAB 5: CLINICAL CASE FORUM ===================== */}
      {activeTab === 'forum' && (
        <div className="space-y-6">
          {/* Post New Case Card */}
          <div className="card card-pad space-y-3">
            <h3 className="font-bold text-ink text-sm">
              {tr('Post New Clinical Case or ECG Discussion', 'নতুন ক্লিনিক্যাল কেস বা ECG আলোচনা পোস্ট করুন')}
            </h3>
            <textarea
              rows={2}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder={tr(
                'Share case history, ECG, vitals or findings for senior consultant feedback...',
                'কেসের উপসর্গ, ইসিজি বা হিস্ট্রি শেয়ার করুন এবং সিনিয়রদের মতামত নিন...'
              )}
              className="w-full p-3 rounded-2xl bg-paper border border-border text-xs focus:outline-hidden focus:border-blue-500 font-sans"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (newPostContent.trim()) {
                    alert(tr('Your case has been posted to the forum!', 'আপনার কেসটি ফোরামে পোস্ট করা হয়েছে!'));
                    setNewPostContent('');
                  }
                }}
                className="btn btn-primary btn-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{tr('Post Case', 'পোস্ট করুন')}</span>
              </button>
            </div>
          </div>

          {/* Forum Feeds */}
          <div className="space-y-4">
            {forumPostsList.map((post: ForumPost, i: number) => (
              <ScrollReveal key={post.id} animation="fade-up" delay={i * 80}>
                <div className="card card-pad space-y-3 hoverable">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorAvatar}
                        alt={isBn ? post.authorNameBn : (post.authorNameEn || post.authorNameBn)}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                      />
                      <div>
                        <h4 className="font-bold text-ink text-xs sm:text-sm">
                          {isBn ? post.authorNameBn : (post.authorNameEn || post.authorNameBn)}
                        </h4>
                        <p className="text-[11px] text-muted">
                          {isBn ? post.authorTitleBn : (post.authorTitleEn || post.authorTitleBn)} •{' '}
                          {isBn ? post.createdAtBn : (post.createdAtEn || post.createdAtBn)}
                        </p>
                      </div>
                    </div>

                    <span className="pill pill-info text-[10px]">
                      {isBn ? post.categoryBn : (post.categoryEn || post.categoryBn)}
                    </span>
                  </div>

                  <h3 className="font-bold text-ink text-sm">{post.title}</h3>
                  <p className="text-xs text-muted leading-relaxed bg-paper p-3 rounded-2xl border border-border">
                    {isBn ? post.content : (post.contentEn || post.content)}
                  </p>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          likedPosts[post.id]
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-paper text-muted hover:text-ink border-border'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{num(post.upvotes)} {tr('Upvotes', 'আপভোট')}</span>
                      </button>

                      <button className="flex items-center gap-1.5 text-muted hover:text-ink font-semibold">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{num(post.commentsCount)} {tr('Comments', 'টি মন্তব্য')}</span>
                      </button>
                    </div>

                    <button className="p-1.5 text-muted hover:text-ink">
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
