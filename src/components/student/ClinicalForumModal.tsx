import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  MessageSquare,
  Send,
  ThumbsUp,
  Share2,
  Image,
  Sparkles,
  CheckCircle2,
  User
} from 'lucide-react';

interface ClinicalForumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicalForumModal: React.FC<ClinicalForumModalProps> = ({ isOpen, onClose }) => {
  const { toBn } = useLanguage();

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'ডা. সাইফ মাহমুদ (রেজিস্ট্রার, কার্ডিওলজি, NICVD)',
      timeBn: '২ ঘণ্টা আগে',
      title: 'চ্যালেঞ্জিং ECG কেস: Anterior Wall STEMI নাকি Benign Early Repolarization (BER)?',
      desc: '৫৫ বছর বয়সী রোগী তীব্র বুকে চাপ ও ঘাম নিয়ে এমারজেন্সিতে এসেছেন। V2-V4 এ 2mm concave ST elevation পাওয়া গেছে। নিচে ইসিজি স্ট্রিপ শেয়ার করা হলো। মতামত কাম্য।',
      ecgUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80',
      likes: 24,
      comments: [
        { author: 'আয়ান চৌধুরী (৫ম বর্ষ, DMC)', text: 'ST elevation concave হলেও reciprocal changes in III/aVF আছে কিনা দেখা জরুরি।' },
        { author: 'ডা. তানভীর হাসান (মেডিসিন)', text: 'Serial Troponin I ও urgent bedside Echo করে regional wall motion abnormality (RWMA) চেক করুন।' }
      ]
    },
    {
      id: 2,
      author: 'আয়ান চৌধুরী (মেডিকেল শিক্ষার্থী, DMC)',
      timeBn: '১ দিন আগে',
      title: 'চেস্ট এক্স-রে (CXR) ডিসকাশন: Right Middle Lobe Consolidation',
      desc: 'ওয়ার্ডে ভর্তি থাকা রোগীর ডান মধ্য ফুসফুসে ঘন অপাসিটি এবং সিলুয়েট সাইন পজিটিভ (Right heart border obscured)।',
      likes: 18,
      comments: [
        { author: 'ডা. সায়রা আফরিন', text: 'Classic Lobar Pneumonia findings. Sputum Gram stain ও CBC monitoring করুন।' }
      ]
    }
  ]);

  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  if (!isOpen) return null;

  const handleAddComment = (postId: number) => {
    const text = commentInputs[postId];
    if (!text) return;
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, { author: 'আপনি (মেডিকেল স্টুডেন্ট)', text }]
          };
        }
        return p;
      })
    );
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto font-bangla">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-4 flex flex-col max-h-[92vh] animate-slide-up">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-indigo-700 via-purple-700 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">ক্লিনিক্যাল কেস ও ECG / X-Ray ডিসকাশন ফোরাম</h2>
              <p className="text-xs text-purple-200">
                শিক্ষার্থী, ইন্টার্ন ও অভিজ্ঞ কনসালট্যান্টদের যৌথ কেস অ্যানালাইসিস
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feed */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {posts.map((post) => (
            <div key={post.id} className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3.5">
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">{post.author}</h4>
                    <span className="text-[10px] text-slate-400">{post.timeBn}</span>
                  </div>
                </div>
              </div>

              {/* Title & Desc */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">{post.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{post.desc}</p>
              </div>

              {/* Optional ECG Image */}
              {post.ecgUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 max-h-48">
                  <img src={post.ecgUrl} alt="Clinical Image" className="w-full h-48 object-cover" />
                </div>
              )}

              {/* Likes & Comments Summary */}
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                <button
                  onClick={() =>
                    setPosts(
                      posts.map((p) => (p.id === post.id ? { ...p, likes: p.likes + 1 } : p))
                    )
                  }
                  className="flex items-center gap-1.5 font-bold text-indigo-700 hover:text-indigo-900"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{toBn(post.likes)} লাইক</span>
                </button>
                <span>💬 {toBn(post.comments.length)} মন্তব্য</span>
              </div>

              {/* Comments Stream */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60">
                {post.comments.map((cm, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs">
                    <strong className="text-slate-900 text-[11px] block">{cm.author}</strong>
                    <p className="text-slate-600 mt-0.5">{cm.text}</p>
                  </div>
                ))}
              </div>

              {/* Write Comment Box */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  placeholder="আপনার ক্লিনিক্যাল মতামত লিখুন..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-hidden focus:border-indigo-500"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-2xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
