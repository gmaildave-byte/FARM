import React, { useState } from 'react';
import {
  Search,
  Sprout,
  Layers,
  Droplet,
  Bug,
  Sun,
  Calculator,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Award,
  ChevronRight,
  Filter,
  CheckCircle2,
  Calendar,
  ExternalLink,
  MapPin,
  Leaf
} from 'lucide-react';
import { Page } from '../types';
import { cropsData } from '../data/crops';
import { livestockData } from '../data/livestock';
import { kenyanCounties } from '../components/Navbar';

interface DiscoverPageProps {
  setCurrentPage: (page: Page) => void;
  openSearchModal: () => void;
  selectedCounty: string;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  setCurrentPage,
  openSearchModal,
  selectedCounty,
}) => {
  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [filterCounty, setFilterCounty] = useState<string>(selectedCounty);
  const [searchQuery, setSearchQuery] = useState('');

  const knowledgeSections = [
    {
      id: 'crops',
      title: 'Crop Farming Guides',
      desc: '30+ Kenyan crops with certified seed varieties (H614, SC Duma, Kilele F1), spacing, fertilizer rates & harvest stages.',
      icon: Sprout,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      page: 'crops' as Page,
      badge: '30+ Crops',
    },
    {
      id: 'livestock',
      title: 'Livestock Husbandry',
      desc: 'Dairy zero-grazing, improved Kienyeji poultry vaccination, beef fattening, dairy goats, sheep, and commercial beekeeping.',
      icon: Layers,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      page: 'livestock' as Page,
      badge: '10 Species',
    },
    {
      id: 'soil-water',
      title: 'Soil Health & Irrigation',
      desc: 'Soil pH testing laboratories, agricultural lime neutralizing, NPK recommendations, and gravity drip irrigation sizing.',
      icon: Droplet,
      color: 'bg-sky-100 text-sky-800 border-sky-200',
      page: 'soil-water' as Page,
      badge: 'KALRO Benchmarks',
    },
    {
      id: 'pests',
      title: 'Pests, Diseases & IPM',
      desc: 'Diagnostic symptom bank for Fall Armyworm, Tomato Tuta Absoluta, Maize MLND, and safe pesticide handling with PHI rules.',
      icon: Bug,
      color: 'bg-rose-100 text-rose-800 border-rose-200',
      page: 'pests' as Page,
      badge: 'Diagnostic Bank',
    },
    {
      id: 'calculators',
      title: '26 Farming Calculators',
      desc: 'Precision suite for seed rate calculation, fertilizer bags per acre, drip irrigation runtime, dairy ration, and profit break-even.',
      icon: Calculator,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      page: 'calculators' as Page,
      badge: 'Precision Suite',
    },
    {
      id: 'weather',
      title: 'Weather & County Calendars',
      desc: 'Kenya Meteorological Department seasonal advisories, Long Rains (Mar-May) & Short Rains (Oct-Dec) timetables for all 47 counties.',
      icon: Sun,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      page: 'weather' as Page,
      badge: 'County Forecasts',
    },
    {
      id: 'markets',
      title: 'Market Price Tracker',
      desc: 'Wholesale and retail price benchmarks across Nairobi Marikiti, Eldoret, Nakuru, Kisumu, and Mombasa wholesale markets.',
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      page: 'markets' as Page,
      badge: 'Price Benchmarks',
    },
    {
      id: 'suppliers',
      title: 'Verified Inputs Directory',
      desc: 'Authorized KEPHIS seed stockists, certified fertilizer distributors, and vetted solar pump & mechanization providers.',
      icon: ShieldCheck,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      page: 'suppliers' as Page,
      badge: 'KEPHIS Vetted',
    },
    {
      id: 'learning',
      title: 'Learning Centre & Courses',
      desc: 'Comprehensive structured modules with interactive quizzes, field management checklists, and downloadable certificates.',
      icon: BookOpen,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      page: 'learning' as Page,
      badge: 'Free Certification',
    },
    {
      id: 'ai-assistant',
      title: '24/7 AI Farming Assistant',
      desc: 'Ask direct questions in English or Kiswahili grounded in published KALRO and Kenya Ministry of Agriculture manuals.',
      icon: Sparkles,
      color: 'bg-teal-100 text-teal-800 border-teal-200',
      page: 'ai-assistant' as Page,
      badge: 'Bilingual AI',
    },
    {
      id: 'sustainable',
      title: 'Regenerative Agriculture',
      desc: 'Agroforestry, Push-Pull technology for stemborer control, composting, biochar, and minimum-tillage conservation farming.',
      icon: Leaf,
      color: 'bg-lime-100 text-lime-800 border-lime-200',
      page: 'sustainable' as Page,
      badge: 'Eco Farming',
    },
    {
      id: 'opportunities',
      title: 'Grants, Tenders & Jobs',
      desc: 'Verified youth agribusiness grants, agricultural financing opportunities, agribusiness tenders, and training workshops in Kenya.',
      icon: Award,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      page: 'opportunities' as Page,
      badge: 'Verified Calls',
    },
  ];

  const filteredSections = knowledgeSections.filter((item) => {
    if (activeTopic !== 'all' && item.id !== activeTopic) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-[#183D29] text-[#FAF7F0] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-xs font-semibold text-emerald-200">
            <Sprout className="w-3.5 h-3.5" />
            <span>Comprehensive Kenyan Agricultural Knowledge Centre</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif text-white">
            Discover Verified Agricultural Science & Tools
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Curated agronomic manuals, 26 practical calculators, pest diagnostic banks, and agro-weather advisories grounded in published research from KALRO, KEPHIS, and the Kenya Ministry of Agriculture.
          </p>

          {/* Quick Search */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search crops, pests, calculators, market prices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-stone-900 placeholder-stone-400 pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
              />
            </div>
            <div className="flex items-center gap-2 bg-[#122e1f] px-3 py-2 rounded-2xl border border-emerald-800/80 text-xs shrink-0">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <select
                value={filterCounty}
                onChange={(e) => setFilterCounty(e.target.value)}
                className="bg-transparent text-emerald-100 font-medium focus:outline-none text-xs cursor-pointer"
              >
                {kenyanCounties.map((c) => (
                  <option key={c} value={c} className="text-stone-900">{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
        <button
          onClick={() => setActiveTopic('all')}
          className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
            activeTopic === 'all'
              ? 'bg-[#183D29] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          All Topics ({knowledgeSections.length})
        </button>
        {knowledgeSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveTopic(sec.id)}
            className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
              activeTopic === sec.id
                ? 'bg-[#183D29] text-white font-bold shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* Grid of Knowledge Hubs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.id}
              onClick={() => setCurrentPage(sec.page)}
              className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-emerald-600 hover:shadow-lg transition cursor-pointer flex flex-col justify-between group shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${sec.color} group-hover:scale-105 transition`}>
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-stone-100 text-stone-700 rounded-full border border-stone-200">
                    {sec.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-stone-900 text-base group-hover:text-emerald-900 transition flex items-center justify-between">
                    <span>{sec.title}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition" />
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-emerald-800 font-bold">
                <span>Explore Section</span>
                <span className="text-[11px] font-normal text-stone-500">
                  {filterCounty !== 'National (All Counties)' ? `Localized: ${filterCounty}` : 'National'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Authoritative Research Grounding Note */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#183D29] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Official Agronomic Sources & Quality Standards</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          AgriKnowledge Hub adheres to official standards published by the <strong>Kenya Agricultural & Livestock Research Organization (KALRO)</strong>, <strong>Kenya Plant Health Inspectorate Service (KEPHIS)</strong>, and <strong>Ministry of Agriculture and Livestock Development (MoALD)</strong>. Educational guides are reviewed regularly by registered agronomy specialists.
        </p>
      </div>
    </div>
  );
};
