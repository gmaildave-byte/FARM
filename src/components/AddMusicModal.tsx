import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Music,
  Search,
  Play,
  Pause,
  Check,
  Volume2,
  Sparkles,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  category: 'Acoustic' | 'Traditional' | 'Beats' | 'Ambient' | 'Uplifting';
  duration: string;
  bpm: number;
  freqPattern: number[];
}

export const licensedAgriTracks: AudioTrack[] = [
  {
    id: 'track-1',
    title: 'Savanna Sunrise Acoustic',
    artist: 'AgriHub Studio Kenya',
    category: 'Acoustic',
    duration: '0:45',
    bpm: 110,
    freqPattern: [261.63, 329.63, 392.00, 523.25, 392.00, 329.63], // C major arpeggio
  },
  {
    id: 'track-2',
    title: 'Highland Harvest Rhythms',
    artist: 'Rift Valley Ensemble',
    category: 'Traditional',
    duration: '1:00',
    bpm: 118,
    freqPattern: [220.00, 277.18, 329.63, 440.00, 329.63, 277.18], // A major
  },
  {
    id: 'track-3',
    title: 'Tractor & Soil Groove',
    artist: 'Kitale Beats Lab',
    category: 'Beats',
    duration: '0:38',
    bpm: 98,
    freqPattern: [196.00, 246.94, 293.66, 392.00, 293.66, 246.94], // G major
  },
  {
    id: 'track-4',
    title: 'Morning Rain on Greenhouse',
    artist: 'Naivasha Ambient Soundscapes',
    category: 'Ambient',
    duration: '0:50',
    bpm: 80,
    freqPattern: [329.63, 392.00, 493.88, 659.25, 493.88, 392.00], // E minor
  },
  {
    id: 'track-5',
    title: 'Commercial Farmer Hustle',
    artist: 'Adams Kipkoech Kering Agrotech',
    category: 'Uplifting',
    duration: '0:42',
    bpm: 122,
    freqPattern: [293.66, 369.99, 440.00, 587.33, 440.00, 369.99], // D major
  },
  {
    id: 'track-6',
    title: 'Eldoret Golden Sunset Folk',
    artist: 'Uasin Gishu Strings',
    category: 'Acoustic',
    duration: '0:55',
    bpm: 92,
    freqPattern: [261.63, 329.63, 392.00, 440.00, 523.25],
  },
];

interface AddMusicModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrackTitle?: string;
  onSelectTrack: (track: AudioTrack) => void;
}

export const AddMusicModal: React.FC<AddMusicModalProps> = ({
  isOpen,
  onClose,
  selectedTrackTitle,
  onSelectTrack,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [previewingTrackId, setPreviewingTrackId] = useState<string | null>(null);
  const [musicVolume, setMusicVolume] = useState<number>(80);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<any>(null);

  // Stop any playing sound on close or unmount
  const stopAudio = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try {
        audioCtxRef.current.close();
      } catch (e) {
        // ignore
      }
      audioCtxRef.current = null;
    }
    setPreviewingTrackId(null);
  };

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
    }
    return () => {
      stopAudio();
    };
  }, [isOpen]);

  const handleTogglePreview = (track: AudioTrack) => {
    if (previewingTrackId === track.id) {
      stopAudio();
      return;
    }

    stopAudio();
    setPreviewingTrackId(track.id);

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      let step = 0;
      const pattern = track.freqPattern;

      const playNote = () => {
        if (!ctx || ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pattern[step % pattern.length], ctx.currentTime);

        const vol = (musicVolume / 100) * 0.15;
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.38);

        step++;
      };

      playNote();
      const intervalMs = Math.round((60 / track.bpm) * 1000 * 0.5);
      intervalRef.current = setInterval(playNote, intervalMs);
    } catch (e) {
      console.warn('Audio preview initialization:', e);
    }
  };

  if (!isOpen) return null;

  const filteredTracks = licensedAgriTracks.filter((t) => {
    const matchesCat = activeCategory === 'all' || t.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F0] border border-stone-200 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#183D29] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base font-serif">AgriHub Music & Soundtracks</h3>
              <p className="text-[11px] text-emerald-200/80">
                Licensed & royalty-cleared audio for field reels & stories
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 bg-white border-b border-stone-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tracks, rhythms, acoustic moods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {['all', 'Acoustic', 'Traditional', 'Beats', 'Ambient', 'Uplifting'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition capitalize ${
                  activeCategory === cat
                    ? 'bg-[#183D29] text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-between text-xs text-stone-600 pt-1 border-t border-stone-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Track Volume:</span>
            </span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="10"
                max="100"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseInt(e.target.value))}
                className="w-24 accent-[#183D29] h-1.5 bg-stone-200 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-[11px] w-7 text-right">{musicVolume}%</span>
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-stone-100">
          {filteredTracks.map((track) => {
            const isPlaying = previewingTrackId === track.id;
            const isSelected = selectedTrackTitle === track.title;

            return (
              <div
                key={track.id}
                className={`pt-2.5 first:pt-0 flex items-center justify-between p-2.5 rounded-2xl transition ${
                  isSelected
                    ? 'bg-emerald-50 border border-emerald-300'
                    : 'hover:bg-stone-100/70 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => handleTogglePreview(track)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition shrink-0 ${
                      isPlaying
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                    title={isPlaying ? 'Pause preview' : 'Play preview'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div className="min-w-0">
                    <div className="font-bold text-stone-900 text-xs sm:text-sm truncate flex items-center gap-1.5">
                      <span>{track.title}</span>
                      <span className="text-[10px] font-normal text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                        {track.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 truncate mt-0.5">
                      {track.artist} • {track.duration} • {track.bpm} BPM
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      stopAudio();
                      onSelectTrack(track);
                      onClose();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      isSelected
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-100 hover:bg-[#183D29] hover:text-white text-stone-800'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{isSelected ? 'Selected' : 'Use Audio'}</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredTracks.length === 0 && (
            <div className="p-8 text-center text-xs text-stone-500">
              No audio tracks match your search filter.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-100/70 border-t border-stone-200 text-center text-[10px] text-stone-500">
          All audio tracks are royalty-cleared and licensed for global agricultural publishing on AgriHub.
        </div>
      </div>
    </div>
  );
};
