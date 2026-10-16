import React, { useState, useEffect } from 'react';
import {
  Plus,
  X,
  Heart,
  Send,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Camera,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';

export interface FarmStory {
  id: string;
  authorName: string;
  authorUsername: string;
  authorRole: string;
  authorAvatar?: string;
  county: string;
  caption: string;
  mediaUrl: string;
  timestamp: string;
  likes: number;
  tags: string[];
}

export const initialFarmStories: FarmStory[] = [
  {
    id: 'story-1',
    authorName: 'Adams Kipkoech Kering',
    authorUsername: 'adams_kering',
    authorRole: 'Founder & Agronomist',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    county: 'Uasin Gishu',
    caption: 'Precision drip manifold testing in Eldoret. Pressure regulator dialed in at 1.2 bar with zero emitter clogging.',
    mediaUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80',
    timestamp: '2h ago',
    likes: 84,
    tags: ['#DripIrrigation', '#EldoretFarming'],
  },
  {
    id: 'story-2',
    authorName: 'Erick Korir',
    authorUsername: 'erick_seedhub',
    authorRole: 'Trans Nzoia Seed Producer',
    county: 'Trans Nzoia',
    caption: 'Long Rains maize harvest drying on certified hermetic tarps. Moisture meter reading exactly 13.1%. Zero post-harvest mold!',
    mediaUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80',
    timestamp: '4h ago',
    likes: 129,
    tags: ['#MaizeHarvest', '#Kitale'],
  },
  {
    id: 'story-3',
    authorName: 'Dr. Mary Wambui',
    authorUsername: 'dr_mary_vet',
    authorRole: 'Livestock Veterinary Specialist',
    county: 'Kiambu',
    caption: 'Total Mixed Ration (TMR) silage mixing demo. Boma Rhodes hay chopped to 2.5cm mixed with dairy meal and molasses.',
    mediaUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1200&q=80',
    timestamp: '6h ago',
    likes: 95,
    tags: ['#DairyFarming', '#ZeroGrazing'],
  },
  {
    id: 'story-4',
    authorName: 'Grace Muthoni',
    authorUsername: 'grace_avocados',
    authorRole: 'Export Avocado Grower',
    county: 'Murang\'a',
    caption: 'Hass avocado Grade 1 harvest ready for GlobalGAP export packing. Dry matter oil content tested at 24.8%.',
    mediaUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1200&q=80',
    timestamp: '8h ago',
    likes: 167,
    tags: ['#HassAvocado', '#ExportAgriculture'],
  },
  {
    id: 'story-5',
    authorName: 'Naivasha Hydroponics',
    authorUsername: 'naivasha_hydro',
    authorRole: 'Greenhouse Technologist',
    county: 'Nakuru',
    caption: 'Dutch bucket tomato vines entering week 7. First flower trusses set with bumblebee pollination. Electrical Conductivity EC 2.2.',
    mediaUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=1200&q=80',
    timestamp: '11h ago',
    likes: 142,
    tags: ['#Hydroponics', '#Greenhouse'],
  },
];

interface AgriStoriesBarProps {
  onStoryClick?: (story: FarmStory) => void;
}

export const AgriStoriesBar: React.FC<AgriStoriesBarProps> = () => {
  const { user } = useAuth();
  const { openOverlay, closeOverlay, activeOverlay } = useNavigation();
  const [stories, setStories] = useState<FarmStory[]>(initialFarmStories);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [storyLiked, setStoryLiked] = useState<Record<string, boolean>>({});
  const [replyText, setReplyText] = useState('');
  const [storyToast, setStoryToast] = useState<string | null>(null);

  // New Story Modal State
  const [newStoryModalOpen, setNewStoryModalOpen] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [newCounty, setNewCounty] = useState('Uasin Gishu');
  const [newImage, setNewImage] = useState(
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
  );

  const activeStory = activeStoryIdx !== null ? stories[activeStoryIdx] : null;

  // Sync with browser back navigation via NavigationContext activeOverlay
  useEffect(() => {
    if (activeOverlay !== 'story-viewer' && activeStoryIdx !== null) {
      setActiveStoryIdx(null);
    }
    if (activeOverlay !== 'new-story' && newStoryModalOpen) {
      setNewStoryModalOpen(false);
    }
  }, [activeOverlay, activeStoryIdx, newStoryModalOpen]);

  // Handle ESC key to close active story or modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeStoryIdx !== null) {
          closeOverlay('story-viewer');
          setActiveStoryIdx(null);
        }
        if (newStoryModalOpen) {
          closeOverlay('new-story');
          setNewStoryModalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryIdx, newStoryModalOpen, closeOverlay]);

  // Auto-advance progress timer for Instagram-style story viewer
  useEffect(() => {
    if (activeStoryIdx === null) {
      setStoryProgress(0);
      return;
    }

    setStoryProgress(0);
    const interval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          // Advance to next story or close if last
          if (activeStoryIdx < stories.length - 1) {
            setActiveStoryIdx(activeStoryIdx + 1);
            return 0;
          } else {
            closeOverlay('story-viewer');
            setActiveStoryIdx(null);
            return 0;
          }
        }
        return prev + 2; // ~5 seconds per story
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIdx, stories.length, closeOverlay]);

  const handleNextStory = () => {
    if (activeStoryIdx !== null) {
      if (activeStoryIdx < stories.length - 1) {
        setActiveStoryIdx(activeStoryIdx + 1);
      } else {
        setActiveStoryIdx(null);
      }
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIdx !== null) {
      if (activeStoryIdx > 0) {
        setActiveStoryIdx(activeStoryIdx - 1);
      } else {
        setActiveStoryIdx(0);
        setStoryProgress(0);
      }
    }
  };

  const handleToggleStoryLike = (storyId: string) => {
    setStoryLiked((prev) => {
      const isLiked = !prev[storyId];
      setStories((list) =>
        list.map((s) => (s.id === storyId ? { ...s, likes: s.likes + (isLiked ? 1 : -1) } : s))
      );
      return { ...prev, [storyId]: isLiked };
    });
  };

  const handleSendStoryReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeStory) return;
    setStoryToast(`Reply sent to @${activeStory.authorUsername}!`);
    setReplyText('');
    setTimeout(() => setStoryToast(null), 3000);
  };

  const handleCreateNewStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    const newStory: FarmStory = {
      id: `story-${Date.now()}`,
      authorName: user?.name || 'Adams Kipkoech Kering',
      authorUsername: user?.username || 'adams_kering',
      authorRole: 'Grower & Contributor',
      authorAvatar: user?.avatar,
      county: newCounty,
      caption: newCaption.trim(),
      mediaUrl: newImage,
      timestamp: 'Just now',
      likes: 1,
      tags: ['#FarmStory', `#${newCounty}`],
    };

    setStories([newStory, ...stories]);
    setNewStoryModalOpen(false);
    setNewCaption('');
    setStoryToast('Your 24-hr agricultural story is live! 🌾');
    setTimeout(() => setStoryToast(null), 3000);
  };

  return (
    <div className="w-full">
      {/* Toast */}
      {storyToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#183D29] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border border-emerald-500 animate-in fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{storyToast}</span>
        </div>
      )}

      {/* Horizontal Stories Carousel (Instagram Style) */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-3.5 shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 min-w-max">
          {/* Add Story Button (Self) */}
          <button
            onClick={() => {
              openOverlay('new-story');
              setNewStoryModalOpen(true);
            }}
            className="flex flex-col items-center gap-1.5 focus:outline-none group select-none"
          >
            <div className="relative">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-0.5 bg-stone-200 group-hover:bg-emerald-600 transition">
                <div className="w-full h-full rounded-full bg-stone-100 flex items-center justify-center overflow-hidden border-2 border-white">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="You" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-xs text-stone-700">YOU</span>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center border-2 border-white shadow-xs">
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
            <span className="text-[11px] font-bold text-stone-800 max-w-[70px] truncate text-center">
              Add Story
            </span>
          </button>

          {/* Stories List with Gradient Instagram-style Rings */}
          {stories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => {
                openOverlay('story-viewer');
                setActiveStoryIdx(idx);
              }}
              className="flex flex-col items-center gap-1.5 focus:outline-none group select-none transition active:scale-95"
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-emerald-600 to-[#183D29] group-hover:scale-105 transition duration-200">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <img
                    src={story.mediaUrl}
                    alt={story.authorName}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-[11px] font-medium text-stone-800 max-w-[72px] truncate text-center">
                {story.authorName.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Instagram Story Fullscreen Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-150">
          <div className="relative max-w-sm w-full h-[90vh] max-h-[720px] bg-stone-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            {/* Background Story Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeStory.mediaUrl}
                alt={activeStory.authorName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
            </div>

            {/* Left & Right Tap Zones for Prev / Next */}
            <div className="absolute inset-0 z-10 flex">
              <div className="w-1/3 h-full cursor-pointer" onClick={handlePrevStory} />
              <div className="w-2/3 h-full cursor-pointer" onClick={handleNextStory} />
            </div>

            {/* Top Bar with Story Progress Bars & Author */}
            <div className="relative z-20 p-4 space-y-3">
              {/* Progress Bar Segments */}
              <div className="flex items-center gap-1.5 w-full">
                {stories.map((s, idx) => (
                  <div
                    key={s.id}
                    className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
                  >
                    <div
                      className="h-full bg-white transition-all duration-100 ease-linear"
                      style={{
                        width:
                          idx < (activeStoryIdx || 0)
                            ? '100%'
                            : idx === activeStoryIdx
                            ? `${storyProgress}%`
                            : '0%',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Author Strip */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400 bg-stone-800">
                    <img
                      src={activeStory.mediaUrl}
                      alt={activeStory.authorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xs flex items-center gap-1 leading-tight">
                      <span>{activeStory.authorName}</span>
                      <span className="text-[10px] text-emerald-300">• {activeStory.county}</span>
                    </div>
                    <div className="text-[10px] text-stone-300">{activeStory.timestamp}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    closeOverlay('story-viewer');
                    setActiveStoryIdx(null);
                  }}
                  className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition"
                  aria-label="Close story"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Caption, Likes & Quick Reply */}
            <div className="relative z-20 p-4 space-y-3">
              {/* Caption */}
              <div className="bg-black/40 backdrop-blur-xs p-3 rounded-2xl border border-white/10 text-white">
                <p className="text-xs leading-relaxed font-medium">{activeStory.caption}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activeStory.tags.map((t) => (
                    <span key={t} className="text-[10px] text-emerald-300 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Reply Input & Heart Reaction */}
              <div className="flex items-center gap-2 pt-1">
                <form onSubmit={handleSendStoryReply} className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${activeStory.authorName.split(' ')[0]}...`}
                    className="flex-1 bg-black/50 text-white placeholder-stone-400 px-3.5 py-2 rounded-full text-xs border border-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-400 backdrop-blur-xs"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition shrink-0"
                    title="Send quick reply"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                <button
                  onClick={() => handleToggleStoryLike(activeStory.id)}
                  className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition shrink-0 border border-white/20"
                  title="Like story"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      storyLiked[activeStory.id] ? 'fill-rose-500 text-rose-500 scale-110' : 'text-white'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Farm Story Modal */}
      {newStoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#183D29] text-white flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">Post Farm Story</h3>
                  <p className="text-[11px] text-stone-500">24-hour agricultural field snapshot</p>
                </div>
              </div>
              <button
                onClick={() => {
                  closeOverlay('new-story');
                  setNewStoryModalOpen(false);
                }}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewStory} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Photo / Video Demo URL
                </label>
                <input
                  type="url"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  What is happening in the field today?
                </label>
                <textarea
                  required
                  rows={3}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. Grafting Hass Avocado scions today, soil moisture at 65%..."
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
                  onClick={() => setNewStoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#183D29] text-white rounded-xl font-bold hover:bg-[#122e1f] transition"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
