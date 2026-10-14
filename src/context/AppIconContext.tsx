import React, { createContext, useContext, useState, useEffect } from 'react';

export type IconThemeId =
  | 'emerald'
  | 'golden'
  | 'cyber'
  | 'solar'
  | 'aqua'
  | 'avocado';

export interface IconTheme {
  id: IconThemeId;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  bgGradient: string;
  description: string;
  svgDataUri: string;
}

export const ICON_THEMES: Record<IconThemeId, IconTheme> = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Sprout (Official)',
    tagline: 'Deep Forest & Mint Sprout',
    primaryColor: '#10B981',
    accentColor: '#F59E0B',
    bgGradient: 'from-[#092918] to-[#041a0d]',
    description: 'The signature AgriHub identity featuring our digital network nodes and twin growth leaves.',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23092918"/><stop offset="100%" stop-color="%23041a0d"/></linearGradient><linearGradient id="leaf" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="%2310B981"/><stop offset="100%" stop-color="%236EE7B7"/></linearGradient><linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FBBF24"/><stop offset="100%" stop-color="%23D97706"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(%23bg)"/><path d="M256 390 V 210" stroke="url(%23leaf)" stroke-width="18" stroke-linecap="round"/><path d="M168 390 Q 256 420 344 390" stroke="url(%23gold)" stroke-width="16" stroke-linecap="round" fill="none"/><path d="M256 320 C 180 320 140 250 156 180 C 220 176 256 240 256 320 Z" fill="url(%23leaf)"/><path d="M256 260 C 320 260 364 210 352 144 C 294 140 256 195 256 260 Z" fill="url(%23leaf)"/><circle cx="256" cy="130" r="26" fill="url(%23gold)"/><circle cx="256" cy="130" r="14" fill="%23FFFFFF" opacity="0.9"/></svg>`,
  },
  golden: {
    id: 'golden',
    name: 'Golden Harvest',
    tagline: 'Sunlight & Wheat Amber',
    primaryColor: '#F59E0B',
    accentColor: '#10B981',
    bgGradient: 'from-[#451a03] to-[#1c1917]',
    description: 'Rich amber grains, fertile autumn fields, and high-yield bounties.',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23451a03"/><stop offset="100%" stop-color="%231c1917"/></linearGradient><linearGradient id="wheat" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23F59E0B"/><stop offset="100%" stop-color="%23FDE68A"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(%23bgG)"/><circle cx="256" cy="150" r="44" fill="%23FDE047" opacity="0.85"/><path d="M256 400 V 230" stroke="url(%23wheat)" stroke-width="18" stroke-linecap="round"/><path d="M256 340 C 190 340 160 270 170 200 C 230 200 256 270 256 340 Z" fill="url(%23wheat)"/><path d="M256 290 C 320 290 350 220 340 160 C 280 160 256 230 256 290 Z" fill="url(%23wheat)"/></svg>`,
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber Agronomy',
    tagline: 'Dark Tech & Neon Circuit',
    primaryColor: '#22C55E',
    accentColor: '#06B6D4',
    bgGradient: 'from-[#030712] to-[#0f172a]',
    description: 'Precision agritech, satellite crop sensors, drone telemetry, and IoT farm nodes.',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="bgC" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23030712"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><linearGradient id="neon" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="%2322C55E"/><stop offset="100%" stop-color="%2306B6D4"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(%23bgC)"/><circle cx="256" cy="256" r="180" fill="none" stroke="%2322C55E" stroke-width="3" stroke-dasharray="12 12" opacity="0.4"/><path d="M256 390 V 210" stroke="url(%23neon)" stroke-width="18" stroke-linecap="round"/><path d="M256 320 C 180 320 140 250 156 180 C 220 176 256 240 256 320 Z" fill="url(%23neon)"/><path d="M256 260 C 320 260 364 210 352 144 C 294 140 256 195 256 260 Z" fill="url(%23neon)"/><circle cx="256" cy="130" r="22" fill="%2306B6D4"/><circle cx="195" cy="235" r="9" fill="%2322C55E"/><circle cx="315" cy="195" r="9" fill="%2322C55E"/></svg>`,
  },
  solar: {
    id: 'solar',
    name: 'Solar Vitality',
    tagline: 'Warm Sun & Bio-Leaf',
    primaryColor: '#EAB308',
    accentColor: '#16A34A',
    bgGradient: 'from-[#14532d] to-[#052e16]',
    description: 'Renewable solar irrigation, photosynthesis energy, and clean regenerative cultivation.',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="bgS" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2314532d"/><stop offset="100%" stop-color="%23052e16"/></linearGradient><linearGradient id="sol" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="%23FACC15"/><stop offset="100%" stop-color="%234ADE80"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(%23bgS)"/><circle cx="256" cy="140" r="38" fill="%23FACC15"/><path d="M256 390 V 220" stroke="url(%23sol)" stroke-width="18" stroke-linecap="round"/><path d="M256 330 C 180 330 140 260 160 190 C 220 190 256 250 256 330 Z" fill="url(%23sol)"/><path d="M256 270 C 330 270 370 200 350 130 C 290 130 256 190 256 270 Z" fill="url(%23sol)"/></svg>`,
  },
  aqua: {
    id: 'aqua',
    name: 'Aqua Drip',
    tagline: 'Clean Water & Drip Irrigation',
    primaryColor: '#0EA5E9',
    accentColor: '#10B981',
    bgGradient: 'from-[#082f49] to-[#041a28]',
    description: 'Precision water efficiency, drip fertigation, and smart watershed management.',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="bgA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23082f49"/><stop offset="100%" stop-color="%23041a28"/></linearGradient><linearGradient id="water" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="%230EA5E9"/><stop offset="100%" stop-color="%2338BDF8"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(%23bgA)"/><path d="M256 110 C 256 110 320 210 320 260 C 320 295 291 324 256 324 C 221 324 192 295 192 260 C 192 210 256 110 256 110 Z" fill="url(%23water)"/><path d="M256 390 V 290" stroke="%2334D399" stroke-width="16" stroke-linecap="round"/><path d="M256 350 C 200 350 170 300 180 250 C 230 250 256 300 256 350 Z" fill="%2334D399"/><path d="M256 310 C 310 310 340 260 330 210 C 280 210 256 260 256 310 Z" fill="%2334D399"/></svg>`,
  },
  avocado: {
    id: 'avocado',
    name: 'Avocado Orchard',
    tagline: 'Rich Forest & Earth Bronze',
    primaryColor: '#84CC16',
    accentColor: '#A16207',
    bgGradient: 'from-[#1a2e05] to-[#0a1402]',
    description: 'Hass avocado export grade, high-value horticulture, and rich volcanic loam.',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><defs><linearGradient id="bgAv" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231a2e05"/><stop offset="100%" stop-color="%230a1402"/></linearGradient><linearGradient id="avo" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="%2384CC16"/><stop offset="100%" stop-color="%23BEF264"/></linearGradient></defs><rect width="512" height="512" rx="112" fill="url(%23bgAv)"/><ellipse cx="256" cy="270" rx="120" ry="140" fill="url(%23avo)"/><ellipse cx="256" cy="280" rx="60" ry="70" fill="%23713F12"/><path d="M256 130 C 256 130 220 90 270 80 C 290 100 256 130 256 130 Z" fill="%234D7C0F"/></svg>`,
  },
};

interface AppIconContextType {
  currentThemeId: IconThemeId;
  currentTheme: IconTheme;
  setTheme: (id: IconThemeId) => void;
  openSwitcherModal: boolean;
  setOpenSwitcherModal: (open: boolean) => void;
}

const AppIconContext = createContext<AppIconContextType | undefined>(undefined);

export const AppIconProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState<IconThemeId>(() => {
    try {
      const saved = localStorage.getItem('agrihub_icon_theme');
      if (saved && saved in ICON_THEMES) {
        return saved as IconThemeId;
      }
    } catch {
      // Ignore
    }
    return 'emerald';
  });

  const [openSwitcherModal, setOpenSwitcherModal] = useState(false);

  const setTheme = (id: IconThemeId) => {
    setCurrentThemeId(id);
    try {
      localStorage.setItem('agrihub_icon_theme', id);
    } catch {
      // Ignore
    }

    // Dynamically update favicon in document head
    try {
      const theme = ICON_THEMES[id];
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/svg+xml';
      link.href = theme.svgDataUri;
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    // Apply on initial load
    const theme = ICON_THEMES[currentThemeId];
    try {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/svg+xml';
      link.href = theme.svgDataUri;
    } catch {
      // Ignore
    }
  }, [currentThemeId]);

  return (
    <AppIconContext.Provider
      value={{
        currentThemeId,
        currentTheme: ICON_THEMES[currentThemeId],
        setTheme,
        openSwitcherModal,
        setOpenSwitcherModal,
      }}
    >
      {children}
    </AppIconContext.Provider>
  );
};

export const useAppIcon = () => {
  const context = useContext(AppIconContext);
  if (!context) {
    throw new Error('useAppIcon must be used within an AppIconProvider');
  }
  return context;
};
