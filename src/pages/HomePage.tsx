import React from 'react';
import {
  Sprout,
  Search,
  ArrowRight,
  TrendingUp,
  Calculator,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Users,
  Layers,
  Droplet,
  Bug,
  Sun,
  MapPin,
  Calendar,
  CheckCircle2,
  DollarSign,
  ShoppingBag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cropsData } from '../data/crops';
import { livestockData } from '../data/livestock';
import { marketPricesData } from '../data/markets';
import { Page } from '../types';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
  openSearchModal: () => void;
  selectedCounty: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  openSearchModal,
  selectedCounty,
}) => {
  const { t, language } = useLanguage();

  const featuredCrops = cropsData.filter((c) => c.isFeatured).slice(0, 4);

  const categories = [
    { id: 'marketplace', name: 'Agricultural Marketplace', swahili: 'Soko la Kilimo', icon: ShoppingBag, count: '12 Trade Categories', desc: 'Trade certified seeds, fertilizers, machinery, feeds, livestock, and fresh produce directly.' },
    { id: 'community', name: 'Farmer Community', swahili: 'Jukwaa la Wakulima', icon: Users, count: 'Real Field Posts', desc: 'Connect with fellow Kenyan farmers, share harvest photos, and swap advice.' },
    { id: 'crops', name: 'Crop Farming Guides', swahili: 'Kilimo cha Mazao', icon: Sprout, count: '30+ Kenyan Crops', desc: 'Cereals, legumes, vegetables, fruits, cash crops, and fodder.' },
    { id: 'livestock', name: 'Livestock Farming', swahili: 'Ufugaji wa Mifugo', icon: Layers, count: '10+ Farmed Species', desc: 'Dairy, beef, poultry, dairy goats, sheep, aquaculture, and bees.' },
    { id: 'calculators', name: '26 Farming Calculators', swahili: 'Vikokotoo vya Kilimo', icon: Calculator, count: 'Complete Precision Suite', desc: 'Seed rate, fertilizer bags, drip irrigation, break-even, and feed intake.' },
    { id: 'soil-water', name: 'Soil & Irrigation', swahili: 'Udongo na Maji', icon: Droplet, count: 'Testing & Fertility', desc: 'Soil testing labs, pH liming, NPK precision, and drip irrigation.' },
    { id: 'pests', name: 'Pests & Diseases', swahili: 'Wadudu na Magonjwa', icon: Bug, count: 'IPM Diagnostic Bank', desc: 'Symptom identifier, prevention, biological controls, and chemical safety.' },
    { id: 'weather', name: 'Weather & Climate', swahili: 'Hali ya Hewa', icon: Sun, count: 'County Calendars', desc: 'Agro-weather forecasts, seasonal outlooks, and planting timetables.' },
    { id: 'markets', name: 'Market Price Tracker', swahili: 'Soko na Bei za Mazao', icon: TrendingUp, count: 'Wholesale & Retail', desc: 'Live price benchmarks across Nairobi, Eldoret, Nakuru, Kisumu, Mombasa.' },
    { id: 'farm-manager', name: 'Farm Manager', swahili: 'Usimamizi wa Shamba', icon: Calendar, count: 'Personal Farm Portal', desc: 'Track fields, seasonal activities, harvest logs, and KES financials.' },
    { id: 'suppliers', name: 'Supplies & Machinery', swahili: 'Vifaa na Pembejeo', icon: ShieldCheck, count: 'Certified Agribusiness', desc: 'Certified seed producers, fertilizer dealers, and solar pumps.' },
    { id: 'learning', name: 'Learning Centre', swahili: 'Chuo cha Kilimo', icon: BookOpen, count: 'Certified Courses', desc: 'Interactive lessons, field checklists, quizzes, and certificates.' },
    { id: 'ai-assistant', name: 'AI Farming Assistant', swahili: 'Msaidizi wa AI', icon: Sparkles, count: '24/7 Agronomist', desc: 'Server-side agronomic advisory grounded in KALRO research manuals.' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-stone-900 text-white shadow-xl">
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80"
            alt="Kenyan agricultural landscape with lush fields"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/85 to-stone-950/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-24 text-center sm:text-left">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-xs sm:text-sm font-medium text-emerald-200 mb-6 backdrop-blur-xs">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Grow Knowledge • Share Progress • Build the Future</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-3xl leading-tight sm:leading-none mb-6">
            Everything You Need to Know About Farming —{' '}
            <span className="text-emerald-400 underline decoration-emerald-500/50 decoration-wavy">
              All in One Place
            </span>
          </h1>

          <p className="text-base sm:text-xl text-stone-200 max-w-2xl leading-relaxed mb-8">
            An integrated agricultural technology platform founded by <strong>Adams Kipkoech Kering</strong>. Learn, plan, calculate, manage, and trade with verified Kenyan agronomic guides, 26 functional farming calculators, wholesale price benchmarks, and a direct marketplace.
          </p>

          {/* Prominent Search Bar */}
          <div className="max-w-2xl w-full mb-8">
            <div
              onClick={openSearchModal}
              className="flex items-center justify-between bg-white rounded-2xl p-1.5 sm:p-2 shadow-2xl border-2 border-emerald-500/30 cursor-pointer group hover:border-emerald-400 transition"
            >
              <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 flex-1 text-stone-500 text-xs sm:text-base min-w-0">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
                <span className="text-stone-400 truncate text-left">Search maize, blight, fertilizers, prices...</span>
              </div>
              <button
                type="button"
                className="bg-emerald-700 group-hover:bg-emerald-600 text-white px-3 sm:px-7 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 sm:gap-2 shrink-0 shadow-md"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setCurrentPage('crops')}
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm sm:text-base transition shadow-lg flex items-center gap-2"
            >
              <Sprout className="w-5 h-5" />
              <span>Explore Farming Guides</span>
            </button>
            <button
              onClick={() => setCurrentPage('farm-manager')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm sm:text-base border border-white/20 transition backdrop-blur-xs flex items-center gap-2"
            >
              <Layers className="w-5 h-5" />
              <span>Manage Your Farm</span>
            </button>
            <button
              onClick={() => setCurrentPage('calculators')}
              className="px-5 py-3.5 bg-amber-600/90 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition shadow-md flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>26 Farming Calculators</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="relative z-10 border-t border-white/10 bg-emerald-950/80 px-6 sm:px-12 py-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">30+ Crops</div>
              <div className="text-xs text-emerald-300">Detailed 31-point agronomy profiles</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">26 Calculators</div>
              <div className="text-xs text-emerald-300">Real math & KES budget tools</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">47 Counties</div>
              <div className="text-xs text-emerald-300">Kenyan ecological zone adaptation</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">Zero Guesswork</div>
              <div className="text-xs text-emerald-300">Grounding in KALRO & KEPHIS manuals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Localized Agro-Weather Preview for Selected County */}
      <section className="bg-gradient-to-r from-emerald-50 to-stone-50 border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Local Farming Conditions • {selectedCounty}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Seasonal Outlook & Planting Window
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
              Currently in the transition to the Short Rains season across central and eastern regions. Farmers in grain basket counties (Trans Nzoia, Uasin Gishu) are finalizing maize field drying.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white p-3 rounded-xl border border-stone-200 text-center shadow-xs">
              <div className="text-xs text-stone-500 font-medium">Safe Moisture Target</div>
              <div className="text-base font-bold text-emerald-800">13.5% or lower</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200 text-center shadow-xs">
              <div className="text-xs text-stone-500 font-medium">Wholesale Dry Maize</div>
              <div className="text-base font-bold text-stone-900">KES 3,200 / 90kg</div>
            </div>
            <button
              onClick={() => setCurrentPage('weather')}
              className="px-4 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 12 Agricultural Knowledge & Management Modules Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full">
            All-In-One Platform
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Complete Agricultural Modules
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Every module is functional, integrated, and tailored for Kenyan agricultural conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setCurrentPage(cat.id as Page)}
                className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-200 text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:text-white transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold text-emerald-700 mb-1">{cat.count}</div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-900 mb-2">
                    {language === 'sw' ? cat.swahili : cat.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">{cat.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 group-hover:translate-x-1 transition-transform">
                  <span>Open Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Crop Guides Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-stone-200 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Comprehensive Agronomy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">Featured Crop Farming Guides</h2>
          </div>
          <button
            onClick={() => setCurrentPage('crops')}
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>View All 30+ Crops</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => setCurrentPage('crops')}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-xs text-emerald-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {crop.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800">
                    {crop.name} ({crop.swahiliName})
                  </h3>
                  <p className="text-xs text-stone-500 italic">{crop.botanicalName}</p>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {crop.economicImportance}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700">Yield: {crop.yieldPerAcre.split('.')[0]}</span>
                <span className="text-emerald-800 font-bold group-hover:underline">Read Guide →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Prices Live Snapshot */}
      <section className="bg-stone-50 rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Market Transparency
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Kenyan Agricultural Market Benchmarks
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('markets')}
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>Explore Full Trading Board</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketPricesData.slice(0, 3).map((mp) => (
            <div
              key={mp.id}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  {mp.marketName} ({mp.county})
                </span>
                <div className="text-base font-bold text-stone-900">{mp.commodity}</div>
                <div className="text-xs text-stone-500">Unit: {mp.unit}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-emerald-900">
                  KES {mp.wholesalePriceKES.toLocaleString()}
                </div>
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    mp.trend === 'up'
                      ? 'bg-emerald-100 text-emerald-800'
                      : mp.trend === 'down'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {mp.trend === 'up' ? '▲ Up' : mp.trend === 'down' ? '▼ Down' : '● Stable'} vs last wk
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner: Farm Manager & AI Agronomist */}
      <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800 rounded-full text-xs font-semibold text-emerald-200 border border-emerald-700">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Agronomy & Farm Records
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Take Control of Your Farming Enterprise?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Record planting dates, monitor crop tasks, track fertilizer applications, log farm revenue and expenses in KES, and get instant answers from our AI Farming Assistant.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => setCurrentPage('farm-manager')}
            className="px-6 py-3.5 bg-white text-emerald-950 hover:bg-stone-100 font-bold rounded-xl text-sm transition shadow-md text-center"
          >
            Open My Farm Dashboard
          </button>
          <button
            onClick={() => setCurrentPage('ai-assistant')}
            className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm border border-emerald-700 transition text-center flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Consult AI Agronomist</span>
          </button>
        </div>
      </section>
    </div>
  );
};
