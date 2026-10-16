import React from 'react';

export interface AgriHubLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'white' | 'icon-only';
  showTagline?: boolean;
  className?: string;
}

export const AgriHubLogo: React.FC<AgriHubLogoProps> = ({
  size = 'md',
  variant = 'light',
  showTagline = false,
  className = '',
}) => {
  // Dimension tokens
  const sizeMap = {
    xs: { icon: 'w-6 h-6', text: 'text-sm', badge: 'text-[9px]', tagline: 'text-[9px]' },
    sm: { icon: 'w-8 h-8', text: 'text-base sm:text-lg', badge: 'text-[10px]', tagline: 'text-[10px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl sm:text-2xl', badge: 'text-[10px]', tagline: 'text-[11px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl sm:text-3xl', badge: 'text-xs', tagline: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl sm:text-4xl', badge: 'text-sm', tagline: 'text-sm' },
  };

  const { icon, text, tagline } = sizeMap[size];

  const isDarkBg = variant === 'dark' || variant === 'white';
  const primaryTextColor = isDarkBg ? 'text-white' : 'text-stone-900';
  const hubTextColor = isDarkBg ? 'text-emerald-300' : 'text-[#183D29]';
  const tagColor = isDarkBg ? 'text-emerald-200/80' : 'text-stone-500';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Precision Geometric Agricultural-Tech Icon Emblem */}
      <div className={`relative ${icon} rounded-xl shrink-0 overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200 ring-1 ring-emerald-500/20`}>
        <svg
          viewBox="0 0 512 512"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Deep Emerald Background Gradient */}
            <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#092918" />
              <stop offset="50%" stopColor="#0f3d26" />
              <stop offset="100%" stopColor="#041a0d" />
            </linearGradient>

            {/* Fresh Mint Digital Sprout Gradient */}
            <linearGradient id="logoMintGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="45%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#6EE7B7" />
            </linearGradient>

            {/* Golden Harvest Energy Accent */}
            <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            <radialGradient id="logoCoreGlow" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#092918" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Squircle Base */}
          <rect width="512" height="512" rx="112" fill="url(#logoBgGrad)" />
          <rect width="512" height="512" rx="112" fill="url(#logoCoreGlow)" />

          {/* Subtle Outer Precision Circuit Compass Ring */}
          <circle
            cx="256"
            cy="256"
            r="195"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeDasharray="8 10"
            opacity="0.35"
          />

          {/* Foundation Furrows / Agro-Horizon Accent Lines */}
          <path
            d="M160 395 Q 256 425 352 395"
            stroke="url(#logoGoldGrad)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M196 425 Q 256 445 316 425"
            stroke="url(#logoGoldGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />

          {/* Central Vigorous Sprout Stem with Technological Node Intersections */}
          <path
            d="M256 395 V 205"
            stroke="url(#logoMintGrad)"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Left Geometric Seedling Leaf */}
          <path
            d="M256 325 C 172 325 130 252 148 180 C 218 175 256 242 256 325 Z"
            fill="url(#logoMintGrad)"
          />

          {/* Right Sunlit Emerging Leaf */}
          <path
            d="M256 262 C 322 262 368 210 354 142 C 292 138 256 195 256 262 Z"
            fill="url(#logoMintGrad)"
          />

          {/* Sun / Knowledge Core Orb */}
          <circle cx="256" cy="125" r="26" fill="url(#logoGoldGrad)" />
          <circle cx="256" cy="125" r="13" fill="#FFFFFF" opacity="0.9" />

          {/* Data Network Connected Synapses */}
          <circle cx="192" cy="235" r="7.5" fill="#FFFFFF" opacity="0.95" />
          <path
            d="M192 235 L 256 272"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            opacity="0.45"
            strokeDasharray="3 3"
          />

          <circle cx="318" cy="192" r="7.5" fill="#FFFFFF" opacity="0.95" />
          <path
            d="M318 192 L 256 222"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            opacity="0.45"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* Brand Typography & Wordmark */}
      {variant !== 'icon-only' && (
        <div className="min-w-0">
          <div className={`font-serif font-black tracking-tight leading-none flex items-center ${text}`}>
            <span className={primaryTextColor}>Agri</span>
            <span className={`${hubTextColor} font-sans ml-0.5 relative`}>
              Hub
              {/* Organic Sprout Micro-accent dot */}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5 align-top" />
            </span>
          </div>

          {showTagline && (
            <div className={`${tagColor} font-medium mt-1 truncate ${tagline}`}>
              Grow Knowledge • Share Progress • Build the Future
            </div>
          )}
        </div>
      )}
    </div>
  );
};
