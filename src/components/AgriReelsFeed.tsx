import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Plus,
  X,
  Send,
  Sparkles,
  Calculator,
  Sprout,
  CheckCircle2,
  UserCheck,
  UserPlus,
  Layers,
  Music
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';

export interface AgriReel {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  authorRole: string;
  verified?: boolean;
  title: string;
  caption: string;
  videoPreview: string; // High-quality looping media
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  audioTrack: string;
  county: string;
  linkedToolPage?: Page;
  linkedToolLabel?: string;
  comments: {
    id: string;
    author: string;
    text: string;
    time: string;
  }[];
}

export const initialAgriReels: AgriReel[] = [
  {
    id: 'reel-1',
    authorName: 'Adams Kipkoech Kering',
    authorUsername: 'adams_kering',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Founder & Agronomist',
    verified: true,
    title: 'How to Calibrate a Knapsack Sprayer in 3 Minutes',
    caption: 'Stop under-dosing or burning your crops! Here is how to measure your 100 sq meter calibration strip and knapsack walking speed. #AgronomyHacks #PestControl #KenyaFarming',
    videoPreview: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    likesCount: 1420,
    commentsCount: 96,
    sharesCount: 380,
    audioTrack: 'Original Sound — Adams Kipkoech Kering Agronomy',
    county: 'Uasin Gishu',
    linkedToolPage: 'calculators',
    linkedToolLabel: '🧮 Use Knapsack Calibration Tool',
    comments: [
      { id: 'c1', author: 'Kiprono Koech', text: 'This saved my maize from stem borer damage, asante Adams!', time: '1h ago' },
      { id: 'c2', author: 'Mary Njoroge', text: 'What pressure nozzle do you recommend for fungicide?', time: '30m ago' },
    ],
  },
  {
    id: 'reel-2',
    authorName: 'Erick Korir',
    authorUsername: 'erick_seedhub',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Grain Hub Kitale',
    verified: true,
    title: 'Testing Maize Moisture with Salt & Glass Jar (No Meter Needed)',
    caption: 'Dry table salt in a clean dry jar with 50 grains of maize. Shake for 2 mins. If salt sticks to glass, moisture is above 14% and NOT safe for bags! #GrainStorage #Kitale',
    videoPreview: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    likesCount: 2840,
    commentsCount: 184,
    sharesCount: 940,
    audioTrack: 'Post-Harvest Tips — Erick Korir',
    county: 'Trans Nzoia',
    linkedToolPage: 'crops',
    linkedToolLabel: '🌽 View Maize Storage Manual',
    comments: [
      { id: 'c3', author: 'Samuel Ochieng', text: 'Classic practical test that never fails!', time: '3h ago' },
    ],
  },
  {
    id: 'reel-3',
    authorName: 'Dr. Mary Wambui',
    authorUsername: 'dr_mary_vet',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Livestock Veterinary Specialist',
    verified: true,
    title: 'Zero-Grazing TMR Silage Mixing for High-Yield Dairy',
    caption: 'How to layer Boma Rhodes hay, whole-crop maize silage, canola meal, and mineral premix for 26+ liters per cow per day. #DairyKenya #ZeroGrazing #LivestockNutrition',
    videoPreview: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    likesCount: 1960,
    commentsCount: 112,
    sharesCount: 450,
    audioTrack: 'Dairy Formulation — Dr. Mary',
    county: 'Kiambu',
    linkedToolPage: 'livestock',
    linkedToolLabel: '🐄 View Dairy Feeding Standards',
    comments: [
      { id: 'c4', author: 'John Githae', text: 'What is the exact ratio of molasses to warm water?', time: '2h ago' },
    ],
  },
  {
    id: 'reel-4',
    authorName: 'Grace Muthoni',
    authorUsername: 'grace_horticulture',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Commercial Horticulturalist',
    verified: true,
    title: 'Whip & Tongue Grafting on Hass Avocado Seedlings',
    caption: 'Matching the cambium layer is everything! Clean razor cut at 45 degrees, wrapping tight with Parafilm. 96% take rate this season. #AvocadoFarming #ExportHorticulture',
    videoPreview: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
    likesCount: 3120,
    commentsCount: 228,
    sharesCount: 1100,
    audioTrack: 'Farming Masterclass — Grace Muthoni',
    county: 'Murang\'a',
    linkedToolPage: 'calculators',
    linkedToolLabel: '🧮 Plant Population & Spacing Tool',
    comments: [
      { id: 'c5', author: 'David Mwangi', text: 'How many days after grafting do you remove the tape?', time: '4h ago' },
    ],
  },
];

interface AgriReelsFeedProps {
  setCurrentPage?: (page: Page) => void;
}

export const AgriReelsFeed: React.FC<AgriReelsFeedProps> = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [reels, setReels] = useState<AgriReel[]>(initialAgriReels);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [bookmarkedReels, setBookmarkedReels] = useState<Record<string, boolean>>({});
  const [followedCreators, setFollowedCreators] = useState<Record<string, boolean>>({
    'Adams Kipkoech Kering': true,
  });
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({
    'reel-1': true,
  });
  const [activeCommentsReelId, setActiveCommentsReelId] = useState<string | null>(null);
  const [reelCommentText, setReelCommentText] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  // Upload Reel Modal
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState(
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
  );
  const [newCounty, setNewCounty] = useState('Uasin Gishu');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const isLiked = !prev[reelId];
      setReels((list) =>
        list.map((r) =>
          r.id === reelId ? { ...r, likesCount: r.likesCount + (isLiked ? 1 : -1) } : r
        )
      );
      return { ...prev, [reelId]: isLiked };
    });
  };

  const handleToggleBookmark = (reelId: string) => {
    setBookmarkedReels((prev) => {
      const isBookmarked = !prev[reelId];
      showToast(isBookmarked ? 'Reel saved to bookmarks!' : 'Removed from bookmarks');
      return { ...prev, [reelId]: isBookmarked };
    });
  };

  const handleToggleFollow = (creatorName: string) => {
    setFollowedCreators((prev) => {
      const isFollowed = !prev[creatorName];
      showToast(isFollowed ? `Now following ${creatorName}` : `Unfollowed ${creatorName}`);
      return { ...prev, [creatorName]: isFollowed };
    });
  };

  const handleAddReelComment = (reelId: string) => {
    if (!reelCommentText.trim()) return;

    setReels((list) =>
      list.map((r) => {
        if (r.id === reelId) {
          const newComment = {
            id: `rc-${Date.now()}`,
            author: user?.name || 'Adams Kipkoech Kering',
            text: reelCommentText.trim(),
            time: 'Just now',
          };
          return {
            ...r,
            commentsCount: r.commentsCount + 1,
            comments: [newComment, ...r.comments],
          };
        }
        return r;
      })
    );
    setReelCommentText('');
    showToast('Comment posted! 🌾');
  };

  const handleUploadReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim()) return;

    const newReel: AgriReel = {
      id: `reel-${Date.now()}`,
      authorName: user?.name || 'Adams Kipkoech Kering',
      authorUsername: user?.username || 'adams_kering',
      authorAvatar: user?.avatar,
      authorRole: 'Farmer & Agribusiness Innovator',
      verified: true,
      title: newTitle.trim(),
      caption: newCaption.trim(),
      videoPreview: newVideoUrl,
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      audioTrack: `Original Sound — ${user?.name || 'Adams Kipkoech Kering'}`,
      county: newCounty,
      linkedToolPage: 'calculators',
      linkedToolLabel: '🧮 26 Farming Calculators Suite',
      comments: [],
    };

    setReels([newReel, ...reels]);
    setUploadModalOpen(false);
    setNewTitle('');
    setNewCaption('');
    showToast('Your agricultural video reel is live! 🎬');
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#183D29] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border border-emerald-500 animate-in fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header with Upload Action */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-stone-200/80 shadow-xs">
        <div>
          <h2 className="font-bold text-stone-900 text-base flex items-center gap-2">
            <span>🎬 AgriReels & Field Video Clips</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
              Shorts & Tutorials
            </span>
          </h2>
          <p className="text-xs text-stone-500">
            Real agronomic practices, spray calibrations, harvesting demos, and livestock guides
          </p>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-3.5 py-2 bg-[#183D29] hover:bg-[#122e1f] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Farm Reel</span>
        </button>
      </div>

      {/* Vertical Reels List (Instagram / TikTok Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {reels.map((reel) => {
          const isLiked = likedReels[reel.id];
          const isBookmarked = bookmarkedReels[reel.id];
          const isFollowed = followedCreators[reel.authorName];

          return (
            <div
              key={reel.id}
              className="relative bg-stone-950 rounded-3xl overflow-hidden shadow-xl aspect-[9/15] flex flex-col justify-between text-white group"
            >
              {/* Media Preview (Simulating high-impact video) */}
              <div className="absolute inset-0 z-0">
                <img
                  src={reel.videoPreview}
                  alt={reel.title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
              </div>

              {/* Top Controls: Sound & County */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="bg-black/50 backdrop-blur-xs text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                  📍 {reel.county}
                </span>

                <button
                  onClick={() => setMuted(!muted)}
                  className="p-2 rounded-full bg-black/50 backdrop-blur-xs hover:bg-black/70 text-white transition border border-white/20"
                  title={muted ? 'Unmute' : 'Mute'}
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>

              {/* Right Side Social Action Strip (Instagram Reels Style) */}
              <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
                {/* Like Button */}
                <button
                  onClick={() => handleToggleLike(reel.id)}
                  className="flex flex-col items-center gap-1 group/btn"
                >
                  <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center transition group-hover/btn:scale-110 border border-white/10">
                    <Heart
                      className={`w-6 h-6 transition ${
                        isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-white'
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-bold drop-shadow-md">
                    {reel.likesCount}
                  </span>
                </button>

                {/* Comments Button */}
                <button
                  onClick={() => setActiveCommentsReelId(reel.id)}
                  className="flex flex-col items-center gap-1 group/btn"
                >
                  <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center transition group-hover/btn:scale-110 border border-white/10">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[11px] font-bold drop-shadow-md">
                    {reel.commentsCount}
                  </span>
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() => handleToggleBookmark(reel.id)}
                  className="flex flex-col items-center gap-1 group/btn"
                >
                  <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center transition group-hover/btn:scale-110 border border-white/10">
                    <Bookmark
                      className={`w-5 h-5 ${isBookmarked ? 'fill-emerald-400 text-emerald-400' : 'text-white'}`}
                    />
                  </div>
                  <span className="text-[10px] font-semibold drop-shadow-md">Save</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Reel link copied to clipboard!');
                  }}
                  className="flex flex-col items-center gap-1 group/btn"
                >
                  <div className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center transition group-hover/btn:scale-110 border border-white/10">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-semibold drop-shadow-md">Share</span>
                </button>
              </div>

              {/* Bottom Information Overlay */}
              <div className="relative z-10 p-5 space-y-2.5 max-w-[85%]">
                {/* Author Info & Follow Toggle */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400 bg-stone-800 shrink-0">
                    <img
                      src={reel.videoPreview}
                      alt={reel.authorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs flex items-center gap-1 leading-tight">
                      <span className="truncate">{reel.authorName}</span>
                      {reel.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] text-stone-300 truncate">{reel.authorRole}</div>
                  </div>

                  <button
                    onClick={() => handleToggleFollow(reel.authorName)}
                    className={`ml-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition shrink-0 ${
                      isFollowed
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                </div>

                {/* Reel Title & Caption */}
                <h3 className="font-bold text-sm leading-snug drop-shadow-md">
                  {reel.title}
                </h3>
                <p className="text-xs text-stone-200 line-clamp-2 leading-relaxed">
                  {reel.caption}
                </p>

                {/* Linked Agronomic Tool Tag */}
                {reel.linkedToolLabel && (
                  <div>
                    <button
                      onClick={() => {
                        if (setCurrentPage && reel.linkedToolPage) {
                          setCurrentPage(reel.linkedToolPage);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg text-[11px] font-bold transition shadow-md"
                    >
                      <Sparkles className="w-3 h-3 text-stone-950" />
                      <span>{reel.linkedToolLabel}</span>
                    </button>
                  </div>
                )}

                {/* Audio Track Pill */}
                <div className="flex items-center gap-1.5 text-[10px] text-stone-300 pt-0.5">
                  <Music className="w-3 h-3 animate-spin duration-3000" />
                  <span className="truncate">{reel.audioTrack}</span>
                </div>
              </div>

              {/* Comments Slide-over Drawer */}
              {activeCommentsReelId === reel.id && (
                <div className="absolute inset-x-0 bottom-0 top-1/3 bg-stone-900/95 backdrop-blur-md rounded-t-3xl z-30 p-4 flex flex-col justify-between border-t border-white/20 animate-in slide-in-from-bottom duration-200">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-xs text-white">
                      Comments ({reel.comments.length})
                    </span>
                    <button
                      onClick={() => setActiveCommentsReelId(null)}
                      className="p-1 text-stone-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comment List */}
                  <div className="flex-1 overflow-y-auto py-2 space-y-2.5">
                    {reel.comments.map((c) => (
                      <div key={c.id} className="text-xs bg-black/40 p-2.5 rounded-xl border border-white/5 space-y-0.5">
                        <div className="flex justify-between text-[11px] text-emerald-300 font-bold">
                          <span>{c.author}</span>
                          <span className="text-[10px] text-stone-400 font-normal">{c.time}</span>
                        </div>
                        <p className="text-stone-200 text-[12px]">{c.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add comment */}
                  <div className="pt-2 flex items-center gap-2 border-t border-white/10">
                    <input
                      type="text"
                      placeholder="Add an agronomy comment..."
                      value={reelCommentText}
                      onChange={(e) => setReelCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddReelComment(reel.id);
                      }}
                      className="flex-1 px-3 py-2 bg-black/50 text-white rounded-xl text-xs border border-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    />
                    <button
                      onClick={() => handleAddReelComment(reel.id)}
                      className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upload Farm Reel Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 text-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#183D29] text-white flex items-center justify-center">
                  <Play className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Upload Agricultural Reel</h3>
                  <p className="text-[11px] text-stone-500">Short farming video or field tutorial</p>
                </div>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadReel} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Reel Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Drip Irrigation Emitter Acid Flush Step-by-Step"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Video / Reel Clip URL
                </label>
                <input
                  type="url"
                  required
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Description & Agronomic Tips
                </label>
                <textarea
                  required
                  rows={3}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Explain the farming technique, quantities, and results..."
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">County</label>
                <input
                  type="text"
                  value={newCounty}
                  onChange={(e) => setNewCounty(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#183D29] text-white rounded-xl font-bold hover:bg-[#122e1f] transition"
                >
                  Publish Reel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
