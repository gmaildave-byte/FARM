import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Music,
  Send,
  UserCheck,
  UserPlus,
  ArrowRight,
  Calculator,
  Sprout,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { AgriReel } from './AgriReelsFeed';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';

interface AgriReelViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  reels: AgriReel[];
  initialReelId: string;
  onNavigateToTool?: (page: Page, toolId?: number) => void;
  onOpenShareSheet?: (post: any) => void;
}

export const AgriReelViewerModal: React.FC<AgriReelViewerModalProps> = ({
  isOpen,
  onClose,
  reels,
  initialReelId,
  onNavigateToTool,
  onOpenShareSheet,
}) => {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(75);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(38); // seconds
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Image Gallery state
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Social interactions state
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  const [followedMap, setFollowedMap] = useState<Record<string, boolean>>({
    'Adams Kipkoech Kering': true,
  });
  const [heartBurst, setHeartBurst] = useState<boolean>(false);

  // Comments drawer state
  const [commentsDrawerOpen, setCommentsDrawerOpen] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>('');
  const [localComments, setLocalComments] = useState<Record<string, { id: string; author: string; text: string; time: string }[]>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const progressTimerRef = useRef<any>(null);

  // Set initial reel index on open
  useEffect(() => {
    if (isOpen) {
      const idx = reels.findIndex((r) => r.id === initialReelId);
      setCurrentIdx(idx >= 0 ? idx : 0);
      setIsPlaying(true);
      setCurrentTime(0);
      setActiveImageIdx(0);
      setZoomLevel(1);
    }
  }, [isOpen, initialReelId, reels]);

  const activeReel = reels[currentIdx] || reels[0];
  const isVideo = !activeReel?.mediaType || activeReel.mediaType === 'video';
  const isGallery = activeReel?.mediaType === 'gallery' && (activeReel.images?.length || 0) > 1;

  // Simulate video playback progress
  useEffect(() => {
    if (!isOpen || !isVideo) return;

    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0; // loop
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(progressTimerRef.current);
    }

    return () => clearInterval(progressTimerRef.current);
  }, [isOpen, isPlaying, isVideo, duration]);

  // Keyboard navigation (ArrowUp, ArrowDown, Space for pause, Esc to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevReel();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextReel();
      } else if (e.key === ' ' && isVideo) {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIdx, isVideo]);

  if (!isOpen || !activeReel) return null;

  const handleNextReel = () => {
    if (currentIdx < reels.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setCurrentTime(0);
      setActiveImageIdx(0);
      setZoomLevel(1);
      setIsPlaying(true);
    }
  };

  const handlePrevReel = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setCurrentTime(0);
      setActiveImageIdx(0);
      setZoomLevel(1);
      setIsPlaying(true);
    }
  };

  const handleToggleLike = () => {
    const isLiked = !likedMap[activeReel.id];
    setLikedMap((prev) => ({ ...prev, [activeReel.id]: isLiked }));
    if (isLiked) {
      setHeartBurst(true);
      setTimeout(() => setHeartBurst(false), 900);
    }
  };

  const handleToggleBookmark = () => {
    setBookmarkedMap((prev) => ({
      ...prev,
      [activeReel.id]: !prev[activeReel.id],
    }));
  };

  const handleToggleFollow = () => {
    setFollowedMap((prev) => ({
      ...prev,
      [activeReel.authorName]: !prev[activeReel.authorName],
    }));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newC = {
      id: `rc-${Date.now()}`,
      author: user?.name || 'Adams Kipkoech Kering',
      text: commentInput.trim(),
      time: 'Just now',
    };

    const existing = localComments[activeReel.id] || activeReel.comments || [];
    setLocalComments({
      ...localComments,
      [activeReel.id]: [newC, ...existing],
    });
    setCommentInput('');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentComments = localComments[activeReel.id] || activeReel.comments || [];
  const currentLikes = activeReel.likesCount + (likedMap[activeReel.id] ? 1 : 0);

  // Gallery active image
  const galleryImages = activeReel.images && activeReel.images.length > 0
    ? activeReel.images
    : [activeReel.videoPreview];
  const displayedMedia = galleryImages[activeImageIdx] || activeReel.videoPreview;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/95 sm:bg-black/90 backdrop-blur-md flex items-center justify-center overflow-hidden animate-in fade-in duration-200"
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-3 sm:p-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-stone-300">
            {currentIdx + 1} / {reels.length}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vertical Navigation Chevrons (Desktop/Tablet) */}
      <div className="hidden md:flex flex-col gap-3 absolute right-6 z-30 top-1/2 -translate-y-1/2">
        <button
          onClick={handlePrevReel}
          disabled={currentIdx === 0}
          className="w-11 h-11 rounded-full bg-stone-900/80 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition border border-white/10 shadow-lg"
          title="Previous Reel (Up Arrow)"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextReel}
          disabled={currentIdx === reels.length - 1}
          className="w-11 h-11 rounded-full bg-stone-900/80 hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition border border-white/10 shadow-lg"
          title="Next Reel (Down Arrow)"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Main Reel Card Container (Instagram/TikTok 9:16 Aspect) */}
      <div className="relative w-full h-full sm:h-[92vh] sm:max-w-md sm:rounded-3xl overflow-hidden bg-stone-950 flex flex-col justify-between shadow-2xl border-0 sm:border border-stone-800">
        {/* Media Background Canvas / Video simulation */}
        <div
          className="absolute inset-0 z-0 bg-stone-900 flex items-center justify-center overflow-hidden cursor-pointer select-none"
          onClick={() => {
            if (isVideo) setIsPlaying(!isPlaying);
          }}
        >
          <img
            src={displayedMedia}
            alt={activeReel.title}
            style={{ transform: `scale(${zoomLevel})` }}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isVideo && isPlaying ? 'scale-[1.02]' : 'scale-100'
            }`}
          />

          {/* Video Scanline and Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

          {/* Central Play/Pause Watermark when paused */}
          {isVideo && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#183D29]/90 text-white flex items-center justify-center shadow-2xl ring-4 ring-white/20">
                <Play className="w-8 h-8 ml-1 fill-white" />
              </div>
            </div>
          )}

          {/* Heart Burst on Like */}
          {heartBurst && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-in zoom-in-75 duration-300">
              <Heart className="w-24 h-24 fill-rose-500 text-rose-500 drop-shadow-2xl animate-pulse" />
            </div>
          )}
        </div>

        {/* Top Creator Info Bar */}
        <div className="relative z-20 pt-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 bg-stone-800 shadow-md shrink-0">
              {activeReel.authorAvatar ? (
                <img
                  src={activeReel.authorAvatar}
                  alt={activeReel.authorName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold bg-[#183D29]">
                  {activeReel.authorName.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-xs sm:text-sm drop-shadow-sm truncate">
                  {activeReel.authorName}
                </span>
                {activeReel.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20 shrink-0" />
                )}
              </div>
              <span className="text-[10px] text-stone-300 drop-shadow-sm">
                @{activeReel.authorUsername} • {activeReel.county}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggleFollow}
            className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1 ${
              followedMap[activeReel.authorName]
                ? 'bg-white/20 text-white backdrop-blur-md'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
            }`}
          >
            {followedMap[activeReel.authorName] ? (
              <>
                <UserCheck className="w-3 h-3 text-emerald-300" />
                <span>Following</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3 h-3" />
                <span>Follow</span>
              </>
            )}
          </button>
        </div>

        {/* Right Floating Action Controls */}
        <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white">
          {/* Like */}
          <button
            onClick={handleToggleLike}
            className="flex flex-col items-center gap-1 group active:scale-90 transition"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition ${
                likedMap[activeReel.id]
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  likedMap[activeReel.id] ? 'fill-white stroke-white' : ''
                }`}
              />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md">{currentLikes}</span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setCommentsDrawerOpen(!commentsDrawerOpen)}
            className="flex flex-col items-center gap-1 group active:scale-90 transition"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center backdrop-blur-md">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md">
              {currentComments.length}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={() => {
              if (onOpenShareSheet) {
                onOpenShareSheet({
                  id: activeReel.id,
                  title: activeReel.title,
                  authorName: activeReel.authorName,
                  content: activeReel.caption,
                  county: activeReel.county,
                });
              }
            }}
            className="flex flex-col items-center gap-1 group active:scale-90 transition"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center backdrop-blur-md">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold drop-shadow-md">
              {activeReel.sharesCount}
            </span>
          </button>

          {/* Bookmark */}
          <button
            onClick={handleToggleBookmark}
            className="flex flex-col items-center gap-1 group active:scale-90 transition"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition ${
                bookmarkedMap[activeReel.id]
                  ? 'bg-emerald-600 text-white'
                  : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
            >
              <Bookmark
                className={`w-5 h-5 ${
                  bookmarkedMap[activeReel.id] ? 'fill-white' : ''
                }`}
              />
            </div>
            <span className="text-[10px] drop-shadow-md">Save</span>
          </button>

          {/* Image Zoom controls (if gallery/image reel) */}
          {!isVideo && (
            <div className="flex flex-col gap-1 bg-black/50 p-1 rounded-2xl backdrop-blur-md">
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.3))}
                className="p-1.5 hover:text-emerald-300"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(1, z - 0.3))}
                className="p-1.5 hover:text-emerald-300"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              {zoomLevel > 1 && (
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 hover:text-emerald-300"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Gallery Carousel Navigation Dots & Arrows */}
        {isGallery && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-2 pointer-events-none">
            <button
              onClick={() => setActiveImageIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeImageIdx === 0}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center disabled:opacity-0 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                setActiveImageIdx((prev) =>
                  Math.min((galleryImages.length || 1) - 1, prev + 1)
                )
              }
              disabled={activeImageIdx === (galleryImages.length || 1) - 1}
              className="pointer-events-auto w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center disabled:opacity-0 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Bottom Details Overlay & Controls */}
        <div className="relative z-20 p-4 pb-5 space-y-2.5">
          {/* Gallery pagination indicators */}
          {isGallery && (
            <div className="flex items-center justify-center gap-1.5 pb-1">
              {galleryImages.map((_, gIdx) => (
                <span
                  key={gIdx}
                  className={`h-1.5 rounded-full transition-all ${
                    gIdx === activeImageIdx
                      ? 'w-5 bg-emerald-400'
                      : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Linked Tool Callout Badge */}
          {activeReel.linkedToolPage && (
            <div>
              <button
                onClick={() => {
                  if (onNavigateToTool) {
                    onNavigateToTool(activeReel.linkedToolPage!, activeReel.linkedToolId);
                  }
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/50 rounded-xl text-xs font-bold backdrop-blur-md transition shadow-md group"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-300" />
                <span>{activeReel.linkedToolLabel || 'Open Linked Tool'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* Caption & Title */}
          <div className="space-y-1 pr-14 text-white">
            <h4 className="font-bold text-sm sm:text-base leading-snug drop-shadow-md">
              {activeReel.title}
            </h4>
            <p className="text-xs text-stone-200 leading-relaxed line-clamp-3 drop-shadow-sm">
              {activeReel.caption}
            </p>
          </div>

          {/* Audio Soundtrack Ribbon */}
          <div className="flex items-center gap-2 text-xs text-emerald-300 pt-1">
            <div className="w-6 h-6 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Music className="w-3 h-3 text-emerald-300 animate-pulse" />
            </div>
            <span className="truncate font-mono text-[11px] text-stone-300">
              {activeReel.audioTrack}
            </span>
          </div>

          {/* Video Scrub Bar & Player Controls (only for Video Reels!) */}
          {isVideo && (
            <div className="pt-2 space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/30 rounded-lg accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-stone-300 font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:text-white"
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-white"
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <span>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-emerald-300 font-sans">
                  <span>HD 1080p</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Slide-Up Comments Drawer */}
        {commentsDrawerOpen && (
          <div className="absolute inset-x-0 bottom-0 top-36 z-40 bg-stone-900/95 border-t border-stone-800 rounded-t-3xl p-4 flex flex-col justify-between backdrop-blur-xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white text-xs">
                  Reel Comments ({currentComments.length})
                </span>
              </div>
              <button
                onClick={() => setCommentsDrawerOpen(false)}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {currentComments.map((c) => (
                <div key={c.id} className="text-xs space-y-1 bg-stone-800/60 p-2.5 rounded-xl border border-stone-700/60">
                  <div className="flex items-center justify-between text-stone-400">
                    <span className="font-bold text-emerald-300">{c.author}</span>
                    <span className="text-[10px]">{c.time}</span>
                  </div>
                  <p className="text-stone-200">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="pt-2 border-t border-stone-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask agronomy question or reply..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
