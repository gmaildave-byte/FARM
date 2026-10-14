import React, { useState } from 'react';
import { X, Check, Smartphone, Sparkles, Download, CheckCircle2, Palette } from 'lucide-react';
import { useAppIcon, ICON_THEMES, IconThemeId } from '../context/AppIconContext';

interface AppIconSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppIconSwitcherModal: React.FC<AppIconSwitcherModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentThemeId, setTheme } = useAppIcon();
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelect = (id: IconThemeId) => {
    setTheme(id);
    setCopiedNotification(`Applied "${ICON_THEMES[id].name}" icon! Browser favicon updated.`);
    setTimeout(() => {
      setCopiedNotification(null);
    }, 2800);
  };

  const handleDownloadSvg = (id: IconThemeId) => {
    const theme = ICON_THEMES[id];
    const blob = new Blob([decodeURIComponent(theme.svgDataUri.replace('data:image/svg+xml;utf8,', ''))], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agrihub-icon-${id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setCopiedNotification(`Downloaded ${theme.name} SVG asset!`);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  const activeTheme = ICON_THEMES[currentThemeId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-[#183D29] via-[#122e1f] to-[#0a1b12] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Palette className="w-4 h-4" />
            <span>Visual Brand Identity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
            <span>Customize AgriHub App Icon</span>
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-md leading-relaxed">
            Change your AgriHub home-screen tile, app badge, and browser favicon to match your favorite agricultural aesthetic.
          </p>
        </div>

        {/* Toast */}
        {copiedNotification && (
          <div className="mx-6 mt-4 p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{copiedNotification}</span>
          </div>
        )}

        {/* Live Mobile Home Screen Preview Card */}
        <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200/80 flex items-center justify-center">
          <div className="flex flex-col items-center p-4 bg-gradient-to-b from-stone-900/90 to-stone-950 rounded-2xl shadow-inner text-white w-full max-w-xs border border-stone-700/60">
            <div className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-3">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mobile Home-Screen Tile Preview</span>
            </div>
            {/* The Squircle Icon */}
            <div className="relative group/preview mb-2">
              <img
                src={activeTheme.svgDataUri}
                alt={activeTheme.name}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl shadow-xl ring-2 ring-white/20"
              />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-stone-900 shadow">
                ★
              </span>
            </div>
            <div className="text-xs font-bold text-stone-100 text-center tracking-tight">AgriHub</div>
            <div className="text-[10px] text-emerald-300 mt-0.5">{activeTheme.name}</div>
          </div>
        </div>

        {/* Grid of Icon Themes */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Select Your Icon Theme (6 Styles)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(ICON_THEMES) as IconThemeId[]).map((themeKey) => {
              const theme = ICON_THEMES[themeKey];
              const isSelected = currentThemeId === themeKey;

              return (
                <div
                  key={themeKey}
                  onClick={() => handleSelect(themeKey)}
                  className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 text-left group ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                      : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50/70'
                  }`}
                >
                  {/* Icon Thumbnail */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-md ring-1 ring-black/10 group-hover:scale-105 transition-transform">
                    <img
                      src={theme.svgDataUri}
                      alt={theme.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-900 transition">
                        {theme.name}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 font-medium truncate">{theme.tagline}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">{theme.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={() => handleDownloadSvg(currentThemeId)}
            className="px-3.5 py-2 text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition flex items-center gap-1.5 shadow-xs"
            title="Download the selected icon SVG file for custom shortcuts"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" />
            <span>Download SVG</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#183D29] hover:bg-[#122e1f] rounded-xl transition shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
