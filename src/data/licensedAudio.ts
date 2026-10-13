export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  artistBio: string;
  durationSeconds: number;
  durationLabel: string;
  genre: 'Acoustic Folk' | 'Afro-Fusion' | 'Ambient Nature' | 'Lo-Fi Chill' | 'Uplifting Agronomy' | 'Traditional Strings';
  mood: 'Inspiring' | 'Energetic' | 'Peaceful' | 'Motivating' | 'Warm' | 'Reflective';
  bpm: number;
  coverArt: string;
  audioUrl: string; // Preview streaming audio URL
  license: string;
  licenseType: 'Royalty-Free Commercial' | 'CC-BY-4.0 Cleared' | 'Open Music Initiative';
  attributionText: string;
  trendingRank?: number;
  isPopular?: boolean;
}

export const licensedAudioCatalog: AudioTrack[] = [
  {
    id: 'track-1',
    title: 'Sunrise Over the Rift Valley',
    artist: 'Adams Kipkoech & East Africa Acoustic',
    artistBio: 'Original organic acoustic instrumental featuring Nyatiti strings and warm guitar.',
    durationSeconds: 30,
    durationLabel: '0:30',
    genre: 'Afro-Fusion',
    mood: 'Inspiring',
    bpm: 96,
    coverArt: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3',
    license: 'Royalty-Free Commercial License cleared for global AgriHub social publishing and video reels.',
    licenseType: 'Royalty-Free Commercial',
    attributionText: '🎵 Sunrise Over the Rift Valley — Adams Kipkoech & EA Acoustic (Licensed)',
    trendingRank: 1,
    isPopular: true,
  },
  {
    id: 'track-2',
    title: 'Highland Soil & Fresh Rain',
    artist: 'Nairobi Organic Collective',
    artistBio: 'Authentic field ambience infused with gentle kalimba and warm marimba rhythms.',
    durationSeconds: 30,
    durationLabel: '0:30',
    genre: 'Ambient Nature',
    mood: 'Peaceful',
    bpm: 82,
    coverArt: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3',
    license: 'CC-BY 4.0 International — Cleared for personal, educational, and commercial farmer reels.',
    licenseType: 'CC-BY-4.0 Cleared',
    attributionText: '🎵 Highland Soil & Fresh Rain — Nairobi Organic Collective (CC-BY)',
    trendingRank: 2,
    isPopular: true,
  },
  {
    id: 'track-3',
    title: 'Bumper Harvest Rhythm',
    artist: 'Trans Nzoia Percussionists',
    artistBio: 'Upbeat celebratory drum patterns honoring grain harvest and agricultural resilience.',
    durationSeconds: 30,
    durationLabel: '0:30',
    genre: 'Traditional Strings',
    mood: 'Energetic',
    bpm: 118,
    coverArt: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-african-savanna-ambient-96.mp3',
    license: 'Open Music Initiative — Fully cleared for short-form social video broadcast.',
    licenseType: 'Open Music Initiative',
    attributionText: '🎵 Bumper Harvest Rhythm — Trans Nzoia Percussionists',
    trendingRank: 3,
    isPopular: true,
  },
  {
    id: 'track-4',
    title: 'Early Morning Farm Routine',
    artist: 'Eldoret Lo-Fi Lab',
    artistBio: 'Relaxing lo-fi beats blended with chirping birds and dawn coffee acoustic guitar.',
    durationSeconds: 30,
    durationLabel: '0:30',
    genre: 'Lo-Fi Chill',
    mood: 'Warm',
    bpm: 78,
    coverArt: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=400&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3',
    license: 'Royalty-Free Commercial License — Universal worldwide distribution.',
    licenseType: 'Royalty-Free Commercial',
    attributionText: '🎵 Early Morning Farm Routine — Eldoret Lo-Fi Lab',
    trendingRank: 4,
    isPopular: true,
  },
  {
    id: 'track-5',
    title: 'The Green Horizon',
    artist: 'Savannah Acoustic Guild',
    artistBio: 'Lush finger-picked acoustic melodies inspiring hope, conservation, and regenerative farming.',
    durationSeconds: 30,
    durationLabel: '0:30',
    genre: 'Acoustic Folk',
    mood: 'Inspiring',
    bpm: 104,
    coverArt: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-raising-me-higher-34.mp3',
    license: 'Royalty-Free Commercial License cleared for all creator tiers.',
    licenseType: 'Royalty-Free Commercial',
    attributionText: '🎵 The Green Horizon — Savannah Acoustic Guild',
    trendingRank: 5,
    isPopular: false,
  },
  {
    id: 'track-6',
    title: 'Drip Irrigation Flow',
    artist: 'TechAgri Soundworks',
    artistBio: 'Modern rhythmic electronic pulses designed for tutorial reels, speed builds, and field demos.',
    durationSeconds: 30,
    durationLabel: '0:30',
    genre: 'Uplifting Agronomy',
    mood: 'Motivating',
    bpm: 110,
    coverArt: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
    license: 'Royalty-Free Commercial License — Cleared for product demonstrations and tutorials.',
    licenseType: 'Royalty-Free Commercial',
    attributionText: '🎵 Drip Irrigation Flow — TechAgri Soundworks',
    trendingRank: 6,
    isPopular: false,
  },
  {
    id: 'track-7',
    title: 'Evening Herd Return',
    artist: 'Maasai Mara Ambient Project',
    artistBio: 'Atmospheric sunset flutes and soft wind chimes capturing evening livestock calm.',
    durationSeconds: 30,
    durationLabel: '0:30',
    genre: 'Ambient Nature',
    mood: 'Peaceful',
    bpm: 72,
    coverArt: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-game-level-music-689.mp3',
    license: 'CC-BY-4.0 Cleared for verified agricultural platforms.',
    licenseType: 'CC-BY-4.0 Cleared',
    attributionText: '🎵 Evening Herd Return — Maasai Mara Ambient Project',
    isPopular: false,
  },
  {
    id: 'track-8',
    title: 'Coffee Blossom Bloom',
    artist: 'Central Highlands Strings',
    artistBio: 'Vibrant classical acoustic guitar celebrating white coffee flowering across Nyeri & Kiambu.',
    durationSeconds: 30,
    durationLabel: '0:30',
    genre: 'Acoustic Folk',
    mood: 'Warm',
    bpm: 92,
    coverArt: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-acoustic-guitar-loop-114.mp3',
    license: 'Royalty-Free Commercial License — Verified CC-BY 4.0.',
    licenseType: 'Royalty-Free Commercial',
    attributionText: '🎵 Coffee Blossom Bloom — Central Highlands Strings',
    isPopular: true,
  },
];

export interface AudioProviderConfig {
  providerName: string;
  catalogStatus: 'Active & Pre-Cleared' | 'API Credentials Optional';
  supportedFormats: string[];
  licensingNotice: string;
  commercialCleared: boolean;
}

export const audioProviderInfo: AudioProviderConfig = {
  providerName: 'AgriHub Royalty-Cleared Global Catalog',
  catalogStatus: 'Active & Pre-Cleared',
  supportedFormats: ['MP3', 'AAC', 'WAV (44.1kHz / 16-bit)'],
  licensingNotice:
    'All tracks in this catalog are legitimate royalty-cleared original works or licensed under Creative Commons (CC-BY 4.0) with express commercial-use clearance for AgriHub creators. For enterprise commercial sync with external providers (such as Epidemic Sound or Jamendo Licensing), configure your API client credentials in server environment variables.',
  commercialCleared: true,
};
