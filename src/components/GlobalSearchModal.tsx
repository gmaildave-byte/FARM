import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  Sprout,
  Bug,
  Calculator,
  TrendingUp,
  BookOpen,
  Layers,
  ArrowRight,
  ShoppingBag,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { cropsData } from '../data/crops';
import { livestockData } from '../data/livestock';
import { pestsData } from '../data/pests';
import { marketPricesData } from '../data/markets';
import { coursesData } from '../data/courses';
import { expertDirectory } from '../data/experts';
import { initialMarketplaceListings } from '../data/marketplaceListings';
import { Page } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (page: Page, itemId?: string) => void;
}

const calculatorTools = [
  { id: '1', name: 'Knapsack Sprayer Calibration', desc: 'Walking speed & nozzle discharge rate calculation', page: 'calculators' as Page },
  { id: '2', name: 'Seed Rate & Plant Population', desc: 'Spacing and seeds per acre for maize, beans, potatoes', page: 'calculators' as Page },
  { id: '3', name: 'Fertilizer NPK Blend Calculator', desc: 'DAP, CAN, Urea & NPK 17:17:17 nutrient units', page: 'calculators' as Page },
  { id: '4', name: 'Drip Irrigation Water Requirement', desc: 'Crop evapotranspiration & emitter running time', page: 'calculators' as Page },
  { id: '5', name: 'Dairy TMR Feed Ration Calculator', desc: 'Dry matter intake, crude protein & energy per cow', page: 'calculators' as Page },
  { id: '6', name: 'Silage Pit Volume & Weight', desc: 'Tonnage calculation for pit, bunker & tube silage', page: 'calculators' as Page },
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'crops' | 'products' | 'pests' | 'prices' | 'tools' | 'courses' | 'experts'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Handle ESC and Arrow key navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === 'Enter') {
        if (results[selectedIndex]) {
          e.preventDefault();
          onSelectResult(results[selectedIndex].page, results[selectedIndex].id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, selectedIndex]);

  const results = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 2) return [];

    const query = searchTerm.toLowerCase();
    const hits: {
      type: string;
      category: string;
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
          category: 'crops',
          title: `${crop.name} (${crop.swahiliName})`,
          sub: `${crop.category.toUpperCase()} • ${crop.varieties.map((v) => v.name).slice(0, 3).join(', ')}`,
          page: 'crops',
          id: crop.id,
          icon: Sprout,
        });
      }
    });

    // Search Marketplace Listings
    initialMarketplaceListings.forEach((item) => {
      if (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.county.toLowerCase().includes(query)
      ) {
        hits.push({
          type: `Market Listing • ${item.category.toUpperCase()}`,
          category: 'products',
          title: item.title,
          sub: `KES ${item.priceKES.toLocaleString()} ${item.unit || ''} • Seller: ${item.sellerName} (${item.county})`,
          page: 'marketplace',
          id: item.id,
          icon: ShoppingBag,
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
          type: 'Livestock Care Guide',
          category: 'crops',
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
          type: `Pest / Disease • ${pest.type.toUpperCase()}`,
          category: 'pests',
          title: `${pest.name} (${pest.swahiliName})`,
          sub: `Attacks: ${pest.affectedCropsOrAnimals.join(', ')}`,
          page: 'pests',
          id: pest.id,
          icon: Bug,
        });
      }
    });

    // Search Calculators
    calculatorTools.forEach((tool) => {
      if (
        tool.name.toLowerCase().includes(query) ||
        tool.desc.toLowerCase().includes(query)
      ) {
        hits.push({
          type: 'Precision Farm Tool',
          category: 'tools',
          title: tool.name,
          sub: tool.desc,
          page: 'calculators',
          id: tool.id,
          icon: Calculator,
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
          type: 'Price Benchmark',
          category: 'prices',
          title: `${mp.commodity} — KES ${mp.wholesalePriceKES.toLocaleString()} / ${mp.unit}`,
          sub: `${mp.marketName}, ${mp.county} County • Trend: ${mp.trend.toUpperCase()}`,
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
          type: 'Learning Course',
          category: 'courses',
          title: course.title,
          sub: `${course.level} • ${course.durationHours} hrs • Includes Certified Exam`,
          page: 'learning',
          id: course.id,
          icon: BookOpen,
        });
      }
    });

    // Search Experts
    expertDirectory.forEach((exp) => {
      if (
        exp.name.toLowerCase().includes(query) ||
        exp.title.toLowerCase().includes(query) ||
        exp.specialties.some((s) => s.toLowerCase().includes(query))
      ) {
        hits.push({
          type: 'Verified Agricultural Expert',
          category: 'experts',
          title: exp.name,
          sub: `${exp.title} (${exp.county} County) • ${exp.specialties.join(', ')}`,
          page: 'expert',
          id: exp.id,
          icon: GraduationCap,
        });
      }
    });

    if (selectedFilter !== 'all') {
      return hits.filter((h) => h.category === selectedFilter).slice(0, 15);
    }

    return hits.slice(0, 15);
  }, [searchTerm, selectedFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-start justify-center pt-14 sm:pt-20 p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-3.5 sm:p-4 border-b border-stone-200 bg-stone-50/70">
          <Search className="w-5 h-5 text-emerald-800 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search crops, pests, market products, calculators, prices, experts..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 focus:outline-none placeholder-stone-400 font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition text-xs font-semibold"
              title="Clear search"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills Ribbon */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-stone-100 bg-[#FAF7F0] overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'crops', label: 'Crops & Livestock' },
            { id: 'products', label: 'Marketplace' },
            { id: 'pests', label: 'Pests & IPM' },
            { id: 'tools', label: 'Calculators' },
            { id: 'prices', label: 'Prices' },
            { id: 'courses', label: 'Courses' },
            { id: 'experts', label: 'Experts' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition shrink-0 text-[11px] ${
                selectedFilter === f.id
                  ? 'bg-[#183D29] text-white shadow-2xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 overscroll-contain">
          {searchTerm.length < 2 && (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <Sprout className="w-10 h-10 text-emerald-800 mx-auto opacity-70" />
              <h4 className="font-bold text-stone-800 text-sm">Universal Agricultural Search</h4>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Type 2 or more characters to instantly discover certified seeds, crops, disease diagnostics, calculators, wholesale market benchmarks, or experts.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['Maize', 'Tomatoes', 'Fall Armyworm', 'Drip Kit', 'Dairy Meal', 'Knapsack', 'Avocado'].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => setSearchTerm(hint)}
                    className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-medium hover:bg-emerald-50 hover:text-emerald-900 transition border border-stone-200"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchTerm.length >= 2 && results.length === 0 && (
            <div className="text-center py-10 text-stone-500 space-y-2">
              <p className="text-sm font-semibold text-stone-700">No matching agricultural records found for "{searchTerm}"</p>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Check spelling, try broader keywords (e.g. "Maize", "Irrigation", "Lime", "Calf"), or select "All Results".
              </p>
            </div>
          )}

          {results.map((hit, idx) => {
            const Icon = hit.icon;
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={`${hit.page}-${hit.id}-${idx}`}
                onClick={() => {
                  onSelectResult(hit.page, hit.id);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition text-left group cascade-item cascade-stagger-${Math.min(
                  idx + 1,
                  8
                )} ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                    : 'border-stone-100 hover:border-emerald-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition ${
                      isSelected ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                      {hit.type}
                    </span>
                    <div className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-emerald-950 truncate">
                      {hit.title}
                    </div>
                    <div className="text-[11px] text-stone-500 truncate mt-0.5">{hit.sub}</div>
                  </div>
                </div>
                <ArrowRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-emerald-800 translate-x-1' : 'text-stone-300'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 text-[11px] text-stone-500 flex justify-between items-center px-4">
          <div className="flex items-center gap-2">
            <span>Use</span>
            <kbd className="bg-white border border-stone-300 rounded px-1.5 py-0.5 text-stone-700 font-mono text-[10px]">
              ↑
            </kbd>
            <kbd className="bg-white border border-stone-300 rounded px-1.5 py-0.5 text-stone-700 font-mono text-[10px]">
              ↓
            </kbd>
            <span>to navigate,</span>
            <kbd className="bg-white border border-stone-300 rounded px-1.5 py-0.5 text-stone-700 font-mono text-[10px]">
              Enter
            </kbd>
            <span>to open</span>
          </div>
          <kbd className="bg-white border border-stone-300 rounded px-1.5 py-0.5 text-stone-600 font-mono text-[10px]">
            ESC to close
          </kbd>
        </div>
      </div>
    </div>
  );
};
