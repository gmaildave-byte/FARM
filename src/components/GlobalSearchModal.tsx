import React, { useState, useMemo } from 'react';
import { Search, X, Sprout, Bug, Calculator, TrendingUp, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { cropsData } from '../data/crops';
import { livestockData } from '../data/livestock';
import { pestsData } from '../data/pests';
import { marketPricesData } from '../data/markets';
import { coursesData } from '../data/courses';
import { Page } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (page: Page, itemId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle ESC key to close search modal
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return [];

    const query = searchTerm.toLowerCase();
    const hits: {
      type: string;
      title: string;
      sub: string;
      page: Page;
      id: string;
      icon: any;
    }[] = [];

    // Search Crops
    cropsData.forEach((crop) => {
      if (
        crop.name.toLowerCase().includes(query) ||
        crop.swahiliName.toLowerCase().includes(query) ||
        crop.botanicalName.toLowerCase().includes(query) ||
        crop.economicImportance.toLowerCase().includes(query)
      ) {
        hits.push({
          type: 'Crop Farming Guide',
          title: `${crop.name} (${crop.swahiliName})`,
          sub: `${crop.category.toUpperCase()} • ${crop.varieties.map((v) => v.name).join(', ')}`,
          page: 'crops',
          id: crop.id,
          icon: Sprout,
        });
      }
    });

    // Search Livestock
    livestockData.forEach((anim) => {
      if (
        anim.species.toLowerCase().includes(query) ||
        anim.swahiliName.toLowerCase().includes(query) ||
        anim.overview.toLowerCase().includes(query)
      ) {
        hits.push({
          type: 'Livestock Guide',
          title: `${anim.species} (${anim.swahiliName})`,
          sub: `${anim.category.toUpperCase()} • Breeds: ${anim.breeds.map((b) => b.name).join(', ')}`,
          page: 'livestock',
          id: anim.id,
          icon: Layers,
        });
      }
    });

    // Search Pests & Diseases
    pestsData.forEach((pest) => {
      if (
        pest.name.toLowerCase().includes(query) ||
        pest.swahiliName.toLowerCase().includes(query) ||
        pest.scientificName.toLowerCase().includes(query) ||
        pest.affectedCropsOrAnimals.some((c) => c.toLowerCase().includes(query))
      ) {
        hits.push({
          type: `Problem: ${pest.type.toUpperCase()}`,
          title: `${pest.name} (${pest.swahiliName})`,
          sub: `Attacks: ${pest.affectedCropsOrAnimals.join(', ')}`,
          page: 'pests',
          id: pest.id,
          icon: Bug,
        });
      }
    });

    // Search Market Prices
    marketPricesData.forEach((mp) => {
      if (
        mp.commodity.toLowerCase().includes(query) ||
        mp.swahiliCommodity.toLowerCase().includes(query) ||
        mp.county.toLowerCase().includes(query)
      ) {
        hits.push({
          type: 'Market Benchmark',
          title: `${mp.commodity} — KES ${mp.wholesalePriceKES.toLocaleString()} / ${mp.unit}`,
          sub: `${mp.marketName}, ${mp.county} County (${mp.trend.toUpperCase()})`,
          page: 'markets',
          id: mp.id,
          icon: TrendingUp,
        });
      }
    });

    // Search Courses
    coursesData.forEach((course) => {
      if (
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      ) {
        hits.push({
          type: 'Learning Centre Course',
          title: course.title,
          sub: `${course.level} • ${course.durationHours} hrs • Includes Verified Certificate`,
          page: 'learning',
          id: course.id,
          icon: BookOpen,
        });
      }
    });

    return hits.slice(0, 10);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-stone-200 bg-stone-50/50">
          <Search className="w-5 h-5 text-emerald-700 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search crop name, livestock, disease, pest, calculator, market price..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 focus:outline-none placeholder-stone-400"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {searchTerm.length < 2 && (
            <div className="text-center py-10 text-stone-400 text-xs sm:text-sm">
              <Sprout className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              Type at least 2 characters to search across 30+ crops, livestock guides, pests, market benchmarks, and tools.
            </div>
          )}

          {searchTerm.length >= 2 && results.length === 0 && (
            <div className="text-center py-10 text-stone-500 text-sm">
              No matching agricultural resources found for "{searchTerm}". Try a crop name like "Maize", "Tomatoes", or disease like "Late Blight".
            </div>
          )}

          {results.map((hit, idx) => {
            const Icon = hit.icon;
            return (
              <button
                key={`${hit.page}-${hit.id}-${idx}`}
                onClick={() => {
                  onSelectResult(hit.page, hit.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-stone-100 hover:border-emerald-300 hover:bg-emerald-50/60 transition text-left group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {hit.type}
                    </span>
                    <div className="text-sm font-semibold text-stone-900 group-hover:text-emerald-900">
                      {hit.title}
                    </div>
                    <div className="text-xs text-stone-500 line-clamp-1">{hit.sub}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 text-xs text-stone-500 flex justify-between items-center px-4">
          <span>Search hints: Maize, Tomatoes, Avocado, Dairy, Fall Armyworm, PICS bags</span>
          <kbd className="text-[10px] bg-white border border-stone-300 rounded px-1.5 py-0.5 text-stone-600 font-mono">
            ESC to close
          </kbd>
        </div>
      </div>
    </div>
  );
};
