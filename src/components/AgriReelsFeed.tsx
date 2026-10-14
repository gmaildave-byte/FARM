import React, { useState, useEffect } from 'react';
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
  Music,
  Maximize2,
  Images,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';
import { AgriReelViewerModal } from './AgriReelViewerModal';
import { AddMusicModal, AudioTrack } from './AddMusicModal';
import { ShareSheetModal } from './ShareSheetModal';

export interface AgriReel {
  id: string;
  mediaType?: 'video' | 'image' | 'gallery';
  authorName: string;
  authorUsername: string;
  authorAvatar?: string;
  authorRole: string;
  verified?: boolean;
  title: string;
  caption: string;
  videoPreview: string; // High-quality looping media or image preview
  videoUrl?: string;
  images?: string[]; // Multiple photos for gallery reels
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  audioTrack: string;
  county: string;
  linkedToolPage?: Page;
  linkedToolLabel?: string;
  linkedToolId?: number;
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
    mediaType: 'video',
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
    audioTrack: 'Savanna Sunrise Acoustic — AgriHub Studio',
    county: 'Uasin Gishu',
    linkedToolPage: 'calculators',
    linkedToolLabel: '🧮 Use Knapsack Calibration Tool',
    linkedToolId: 23,
    comments: [
      { id: 'c1', author: 'Kiprono Koech', text: 'This saved my maize from stem borer damage, asante Adams!', time: '1h ago' },
      { id: 'c2', author: 'Mary Njoroge', text: 'What pressure nozzle do you recommend for fungicide?', time: '30m ago' },
    ],
  },
  {
    id: 'reel-2',
    mediaType: 'video',
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
    audioTrack: 'Highland Harvest Rhythms — Rift Valley Ensemble',
    county: 'Trans Nzoia',
    linkedToolPage: 'crops',
    linkedToolLabel: '🌽 View Maize Storage Manual',
    comments: [
      { id: 'c3', author: 'Samuel Ochieng', text: 'Classic practical test that never fails!', time: '3h ago' },
    ],
  },
  {
    id: 'reel-3',
    mediaType: 'video',
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
    audioTrack: 'Tractor & Soil Groove — Kitale Beats Lab',
    county: 'Kiambu',
    linkedToolPage: 'calculators',
    linkedToolLabel: '🐄 Cow Feed & Ration Calculator',
    linkedToolId: 16,
    comments: [
      { id: 'c4', author: 'John Githae', text: 'What is the exact ratio of molasses to warm water?', time: '2h ago' },
    ],
  },
  {
    id: 'reel-4',
    mediaType: 'gallery',
    authorName: 'Grace Muthoni',
    authorUsername: 'grace_horticulture',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Commercial Horticulturalist',
    verified: true,
    title: 'Whip & Tongue Grafting on Hass Avocado (4-Stage Photo Guide)',
    caption: 'Matching the cambium layer is everything! Swipe through the 4 steps: 1) Rootstock cut, 2) Scion slice, 3) Cambium interlocking, 4) Parafilm sealing. 96% take rate. #AvocadoFarming #Horticulture',
    videoPreview: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80',
    ],
    likesCount: 3120,
    commentsCount: 228,
    sharesCount: 1100,
    audioTrack: 'Commercial Farmer Hustle — Adams Kipkoech Kering',
    county: 'Murang\'a',
    linkedToolPage: 'calculators',
    linkedToolLabel: '🧮 Plant Population & Spacing Tool',
    linkedToolId: 4,
    comments: [
      { id: 'c5', author: 'David Mwangi', text: 'How many days after grafting do you remove the tape?', time: '4h ago' },
    ],
  },
  {
    id: 'reel-5',
    mediaType: 'image',
    authorName: 'Kenya Plant Health (KEPHIS) Team',
    authorUsername: 'kephis_official',
    authorAvatar: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=200&q=80',
    authorRole: 'Phytosanitary Diagnostic Unit',
    verified: true,
    title: 'Spotting Fall Armyworm Egg Masses Early (High-Res Diagnostic)',
    caption: 'Look on the underside of young maize leaves for fuzzy, cream-colored felty clusters. Each mass contains 100-200 eggs. Hand-pick or spray biological neem before whorl penetration! #IPM #FallArmyworm',
    videoPreview: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    likesCount: 1540,
    commentsCount: 88,
    sharesCount: 620,
    audioTrack: 'Morning Rain on Greenhouse — Ambient',
    county: 'Nakuru',
    linkedToolPage: 'pests',
    linkedToolLabel: '🐛 Open Pest Diagnostic Bank',
    comments: [
      { id: 'c6', author: 'Ben Cheruiyot', text: 'Excellent photo guide, found some in Rongai today.', time: '5h ago' }
    ]
  }
];

interface AgriReelsFeedProps {
  setCurrentPage?: (page: Page) => void;
  onNavigateToTool?: (page: Page, toolId?: number) => void;
}

export const AgriReelsFeed: React.FC<AgriReelsFeedProps> = ({
  setCurrentPage,
  onNavigateToTool,
}) => {
  const { user } = useAuth();
  const [reels, setReels] = useState<AgriReel[]>(initialAgriReels);
  const [selectedViewerReelId, setSelectedViewerReelId] = useState<string | null>(null);

  // Deep linking and browser back navigation integration
  const handleOpenReel = (reelId: string) => {
    setSelectedViewerReelId(reelId);
    try {
      if (!window.location.hash.startsWith(`#reel-${reelId}`)) {
        window.history.pushState({ reelId, type: 'agri-reel-viewer' }, '', `#reel-${reelId}`);
      }
    } catch {
      // ignore
    }
  };

  const handleCloseReel = () => {
    setSelectedViewerReelId(null);
    try {
      if (window.location.hash.startsWith('#reel-')) {
        window.history.back();
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#reel-')) {
        const targetId = hash.replace('#reel-', '');
        const exists = reels.find((r) => r.id === targetId);
        if (exists) {
          setSelectedViewerReelId(targetId);
        }
      } else if (selectedViewerReelId) {
        setSelectedViewerReelId(null);
      }
    };

    checkHash();
    window.addEventListener('popstate', checkHash);
    return () => window.removeEventListener('popstate', checkHash);
  }, [reels]);

  // Likes & bookmarks local state
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [bookmarkedReels, setBookmarkedReels] = useState<Record<string, boolean>>({});
  const [followedCreators, setFollowedCreators] = useState<Record<string, boolean>>({
    'Adams Kipkoech Kering': true,
  });

  // Sharing
  const [shareModalPost, setShareModalPost] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Upload Reel Modal
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [musicModalOpen, setMusicModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'video' | 'gallery'>('video');
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState(
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
  );
  const [newCounty, setNewCounty] = useState('Uasin Gishu');
  const [selectedAudioTitle, setSelectedAudioTitle] = useState('Savanna Sunrise Acoustic — AgriHub Studio');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleLike = (reelId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  const handleToggleBookmark = (reelId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedReels((prev) => {
      const isBookmarked = !prev[reelId];
      showToast(isBookmarked ? 'Reel saved to bookmarks!' : 'Removed from bookmarks');
      return { ...prev, [reelId]: isBookmarked };
    });
  };

  const handleToggleFollow = (creatorName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFollowedCreators((prev) => {
      const isFollowed = !prev[creatorName];
      showToast(isFollowed ? `Now following ${creatorName}` : `Unfollowed ${creatorName}`);
      return { ...prev, [creatorName]: isFollowed };
    });
  };

  const handleUploadReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaption.trim()) return;

    const newReel: AgriReel = {
      id: `reel-${Date.now()}`,
      mediaType: uploadType,
      authorName: user?.name || 'Adams Kipkoech Kering',
      authorUsername: user?.username || 'adams_kering',
      authorAvatar: user?.avatar,
      authorRole: 'Farmer & Agribusiness Innovator',
      verified: true,
      title: newTitle.trim(),
      caption: newCaption.trim(),
      videoPreview: newVideoUrl,
      images: uploadType === 'gallery' ? [newVideoUrl, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'] : undefined,
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      audioTrack: selectedAudioTitle,
      county: newCounty,
      linkedToolPage: 'calculators',
      linkedToolLabel: '🧮 26 Farming Calculators Suite',
      linkedToolId: 1,
      comments: [],
    };

    setReels([newReel, ...reels]);
    setUploadModalOpen(false);
    setNewTitle('');
    setNewCaption('');
    showToast('Your agricultural reel is live! 🎬');
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#183D29] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border border-emerald-500 animate-in fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header with Upload Action */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs">
        <div>
          <h2 className="font-bold text-stone-900 text-lg sm:text-xl flex items-center gap-2 font-serif">
            <span>🎬 AgriHub Reels & Visual Guides</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Tap any Reel to Watch
            </span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Real agronomic practices, spray calibrations, harvesting demos, and swipeable field galleries
          </p>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2.5 bg-[#183D29] hover:bg-[#122e1f] text-white rounded-2xl text-xs font-bold flex items-center gap-2 transition shadow-md shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Post AgriReel</span>
        </button>
      </div>

      {/* Responsive Grid of Tappable Reels Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reels.map((reel) => {
          const isLiked = likedReels[reel.id];
          const isBookmarked = bookmarkedReels[reel.id];
          const isFollowed = followedCreators[reel.authorName];
          const isGallery = reel.mediaType === 'gallery';

          return (
            <div
              key={reel.id}
              onClick={() => handleOpenReel(reel.id)}
              className="relative bg-stone-950 rounded-3xl overflow-hidden shadow-lg aspect-[9/14] flex flex-col justify-between text-white group cursor-pointer border border-stone-800/80 transition-all duration-300 hover:shadow-2xl hover:border-emerald-600/60"
            >
              {/* Media Preview image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={reel.videoPreview}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60 group-hover:via-black/20 transition-colors" />
              </div>

              {/* Top Badges */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="bg-black/60 backdrop-blur-md text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                  <span>📍</span>
                  <span>{reel.county}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  {isGallery ? (
                    <span className="bg-emerald-950/80 text-emerald-300 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1">
                      <Images className="w-3 h-3" />
                      <span>Gallery</span>
                    </span>
                  ) : (
                    <span className="bg-black/60 text-stone-200 backdrop-blur-md text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Video</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Central Play/Watch Hint Button (Appears on hover or prominent) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="px-4 py-2 rounded-full bg-[#183D29]/90 text-white text-xs font-bold shadow-2xl flex items-center gap-2 border border-emerald-400/40 backdrop-blur-md transform scale-95 group-hover:scale-100 transition-transform">
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Immersive Reel</span>
                </div>
              </div>

              {/* Right Side Social Actions Strip */}
              <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-3.5 text-white">
                {/* Like Button */}
                <button
                  onClick={(e) => handleToggleLike(reel.id, e)}
                  className="flex flex-col items-center gap-0.5 group/btn"
                >
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center transition group-hover/btn:scale-110 border border-white/10">
                    <Heart
                      className={`w-5 h-5 transition ${
                        isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-white'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-bold drop-shadow-md">
                    {reel.likesCount}
                  </span>
                </button>

                {/* Comments Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenReel(reel.id);
                  }}
                  className="flex flex-col items-center gap-0.5 group/btn"
                >
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center transition group-hover/btn:scale-110 border border-white/10">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold drop-shadow-md">
                    {reel.commentsCount}
                  </span>
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={(e) => handleToggleBookmark(reel.id, e)}
                  className="flex flex-col items-center gap-0.5 group/btn"
                >
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center transition group-hover/btn:scale-110 border border-white/10">
                    <Bookmark
                      className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-400 text-emerald-400' : 'text-white'}`}
                    />
                  </div>
                  <span className="text-[9px] font-semibold drop-shadow-md">Save</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShareModalPost({
                      id: reel.id,
                      title: reel.title,
                      authorName: reel.authorName,
                      content: reel.caption,
                      county: reel.county,
                    });
                  }}
                  className="flex flex-col items-center gap-0.5 group/btn"
                >
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center transition group-hover/btn:scale-110 border border-white/10">
                    <Share2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[9px] font-semibold drop-shadow-md">Share</span>
                </button>
              </div>

              {/* Bottom Information Overlay */}
              <div className="relative z-10 p-4 space-y-2 max-w-[85%]">
                {/* Author Info & Follow Toggle */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-400 bg-stone-800 shrink-0">
                    <img
                      src={reel.videoPreview}
                      alt={reel.authorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs flex items-center gap-1 leading-tight truncate">
                      <span>{reel.authorName}</span>
                      {reel.verified && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-emerald-400 shrink-0" />
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleToggleFollow(reel.authorName, e)}
                    className={`ml-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition shrink-0 ${
                      isFollowed
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {isFollowed ? 'Following' : 'Follow'}
                  </button>
                </div>

                {/* Reel Title & Caption */}
                <h3 className="font-bold text-xs sm:text-sm leading-snug drop-shadow-md line-clamp-2">
                  {reel.title}
                </h3>
                <p className="text-[11px] text-stone-200 line-clamp-2 leading-relaxed">
                  {reel.caption}
                </p>

                {/* Linked Tool Tag */}
                {reel.linkedToolLabel && (
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-400/90 text-stone-950 rounded-md text-[10px] font-bold">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{reel.linkedToolLabel}</span>
                    </span>
                  </div>
                )}

                {/* Audio Track Pill */}
                <div className="flex items-center gap-1.5 text-[9px] text-stone-300 pt-0.5">
                  <Music className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                  <span className="truncate">{reel.audioTrack}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Immersive Dedicated Reel Viewer Modal */}
      {selectedViewerReelId && (
        <AgriReelViewerModal
          isOpen={Boolean(selectedViewerReelId)}
          onClose={handleCloseReel}
          reels={reels}
          initialReelId={selectedViewerReelId}
          onNavigateToTool={(toolPage, toolId) => {
            if (onNavigateToTool) {
              onNavigateToTool(toolPage, toolId);
            } else if (setCurrentPage) {
              setCurrentPage(toolPage);
            }
          }}
          onOpenShareSheet={(p) => setShareModalPost(p)}
        />
      )}

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
                  <h3 className="font-bold text-sm font-serif">Create AgriReel / Photo Story</h3>
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
              {/* Type Switcher */}
              <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
                <button
                  type="button"
                  onClick={() => setUploadType('video')}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-center transition flex items-center justify-center gap-1.5 ${
                    uploadType === 'video'
                      ? 'bg-white text-[#183D29] shadow-xs'
                      : 'text-stone-600'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Video Reel</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType('gallery')}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-center transition flex items-center justify-center gap-1.5 ${
                    uploadType === 'gallery'
                      ? 'bg-white text-[#183D29] shadow-xs'
                      : 'text-stone-600'
                  }`}
                >
                  <Images className="w-3.5 h-3.5" />
                  <span>Photo Gallery</span>
                </button>
              </div>

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
                  Media URL (Video or Photo)
                </label>
                <input
                  type="url"
                  required
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              {/* Music / Soundtrack Picker */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Audio Soundtrack
                </label>
                <div className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <div className="flex items-center gap-2 min-w-0">
                    <Music className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-xs font-medium text-stone-800 truncate">
                      {selectedAudioTitle}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMusicModalOpen(true)}
                    className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-[11px] font-bold transition shrink-0 ml-2"
                  >
                    Change Music
                  </button>
                </div>
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

      {/* Add Music Modal */}
      {musicModalOpen && (
        <AddMusicModal
          isOpen={musicModalOpen}
          onClose={() => setMusicModalOpen(false)}
          selectedTrackTitle={selectedAudioTitle}
          onSelectTrack={(t) => setSelectedAudioTitle(`${t.title} — ${t.artist}`)}
        />
      )}

      {/* Share Sheet Modal */}
      {shareModalPost && (
        <ShareSheetModal
          isOpen={Boolean(shareModalPost)}
          onClose={() => setShareModalPost(null)}
          post={shareModalPost}
        />
      )}
    </div>
  );
};
