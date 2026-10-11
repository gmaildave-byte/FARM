import React, { useState } from 'react';
import {
  Sprout,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Droplet,
  Layers,
  Calendar,
  X
} from 'lucide-react';
import { cropsData } from '../data/crops';
import { Crop, CropCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const CropsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCropModal, setActiveCropModal] = useState<Crop | null>(null);

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Crops', count: cropsData.length },
    { id: 'cereals', label: 'Cereals', count: cropsData.filter(c => c.category === 'cereals').length },
    { id: 'vegetables', label: 'Vegetables', count: cropsData.filter(c => c.category === 'vegetables').length },
    { id: 'legumes', label: 'Legumes', count: cropsData.filter(c => c.category === 'legumes').length },
    { id: 'roots-tubers', label: 'Roots & Tubers', count: cropsData.filter(c => c.category === 'roots-tubers').length },
    { id: 'fruits', label: 'Fruits', count: cropsData.filter(c => c.category === 'fruits').length },
    { id: 'cash-industrial', label: 'Cash & Industrial', count: cropsData.filter(c => c.category === 'cash-industrial').length },
    { id: 'fodder', label: 'Fodder Crops', count: cropsData.filter(c => c.category === 'fodder').length }
  ];

  const filteredCrops = cropsData.filter((crop) => {
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    const matchesQuery =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.swahiliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.varieties.some(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Sprout className="w-3.5 h-3.5" />
            Comprehensive Kenyan Crop Knowledge Library
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Crop Farming Guides
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Detailed 31-point agronomic manuals for Kenyan cereals, legumes, vegetables, fruits, and commercial crops. Every guide includes KEPHIS certified varieties, planting calendars, spacing geometries, fertilizer schedules, pest management, and realistic KES gross margins.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search crop, variety, botanical..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Crops Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Image & Category Tag */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-emerald-950/85 backdrop-blur-xs text-emerald-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {crop.category}
                </span>
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-bold px-2 py-0.5 rounded shadow-xs">
                  {crop.maturityDays}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    {crop.name} ({crop.swahiliName})
                  </h3>
                  <p className="text-xs text-stone-500 italic">{crop.botanicalName}</p>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {crop.economicImportance}
                </p>

                {/* Key Quick Facts */}
                <div className="bg-stone-50 rounded-xl p-3 space-y-1 text-xs border border-stone-100">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Altitude:</span>
                    <span className="font-semibold text-stone-800">{crop.altitudeRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Soil pH:</span>
                    <span className="font-semibold text-stone-800">{crop.soilPhRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Yield Potential:</span>
                    <span className="font-semibold text-emerald-800">{crop.yieldPerAcre.split('.')[0]}</span>
                  </div>
                </div>

                {/* Variety Pills */}
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Recommended Varieties
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {crop.varieties.slice(0, 3).map((v) => (
                      <span
                        key={v.name}
                        className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-medium"
                      >
                        {v.name.split('(')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-5 pt-0">
              <button
                onClick={() => setActiveCropModal(crop)}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Read Full 31-Point Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 text-stone-500 text-sm">
          No crop guides match your search. Try "Maize", "Tomatoes", or "Beans".
        </div>
      )}

      {/* 31-Point Comprehensive Crop Detail Modal / Drawer */}
      {activeCropModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Top Header with Sticky Close */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                    {activeCropModal.name} ({activeCropModal.swahiliName})
                  </h2>
                  <p className="text-xs text-stone-500 italic">{activeCropModal.botanicalName}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveCropModal(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body: 31 Comprehensive Dimensions */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Hero Banner */}
              <div className="h-64 rounded-2xl overflow-hidden relative">
                <img
                  src={activeCropModal.image}
                  alt={activeCropModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {activeCropModal.category}
                    </span>
                    <p className="text-sm font-medium text-stone-200 max-w-2xl leading-relaxed">
                      {activeCropModal.economicImportance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1: Climatic, Altitude & Soil Requirements */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  1. Climate, Altitude & Soil Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <span className="text-stone-500 font-semibold block mb-1">Suitable Altitude:</span>
                    <span className="font-bold text-stone-900">{activeCropModal.altitudeRange}</span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <span className="text-stone-500 font-semibold block mb-1">Temperature Range:</span>
                    <span className="font-bold text-stone-900">{activeCropModal.temperatureRange}</span>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <span className="text-stone-500 font-semibold block mb-1">Soil Type & pH:</span>
                    <span className="font-bold text-stone-900">pH {activeCropModal.soilPhRange} ({activeCropModal.soilRequirements})</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Certified Varieties by Agro-Ecological Zone */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  2. Certified Varieties & Regional Characteristics
                </h3>
                <div className="space-y-3">
                  {activeCropModal.varieties.map((v) => (
                    <div
                      key={v.name}
                      className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80 text-xs space-y-1"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-emerald-950 text-sm">
                        <span>{v.name}</span>
                        <span className="text-xs text-emerald-800 font-semibold">{v.maturityDays} • {v.yieldPotential}</span>
                      </div>
                      <div className="text-stone-700"><strong>Target Zones:</strong> {v.altitudeZones}</div>
                      <div className="text-stone-700"><strong>Special Agronomic Traits:</strong> {v.specialTraits}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Planting Seasons, Spacing & Plant Population */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  3. Planting Seasons, Seed Rate & Geometry
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                    <div className="font-bold text-stone-900">Planting Calendar Windows</div>
                    <div><strong>Long Rains:</strong> {activeCropModal.plantingSeasons.longRains}</div>
                    <div><strong>Short Rains:</strong> {activeCropModal.plantingSeasons.shortRains}</div>
                    <div className="text-emerald-800 font-semibold pt-1">Seed Rate: {activeCropModal.seedRatePerAcre}</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                    <div className="font-bold text-stone-900">Plant Spacing & Population</div>
                    <div>{activeCropModal.spacing.description}</div>
                    <div className="text-emerald-800 font-bold text-sm">
                      {activeCropModal.plantPopulationPerAcre.toLocaleString()} plants / acre
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Fertilizer & Nutrient Management Schedule */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  4. Fertilizer & Nutrient Management Protocol
                </h3>
                <div className="space-y-2">
                  {activeCropModal.fertilizerSchedule.map((f, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900">{f.stage}</div>
                        <div className="text-stone-600">{f.notes}</div>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                          {f.fertilizerType} ({f.ratePerAcre})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Common Pests, Diseases & Integrated Pest Management */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  5. Common Pests & Diseases
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-red-50/50 p-4 rounded-xl border border-red-200/60">
                    <div className="font-bold text-red-900 mb-2">Key Pests</div>
                    <ul className="space-y-1 list-disc list-inside text-stone-700">
                      {activeCropModal.commonPests.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                    <div className="font-bold text-amber-900 mb-2">Key Diseases</div>
                    <ul className="space-y-1 list-disc list-inside text-stone-700">
                      {activeCropModal.commonDiseases.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 6: Harvesting, Safe Moisture & Post-Harvest Handling */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  6. Maturity Indicators & Post-Harvest Storage
                </h3>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs leading-relaxed text-stone-700">
                  <div><strong>Maturity Indicators:</strong> {activeCropModal.harvestIndicators}</div>
                  <div><strong>Post-Harvest Protocol:</strong> {activeCropModal.postHarvestHandling}</div>
                </div>
              </div>

              {/* Section 7: Enterprise Economics & Gross Margin (KES) */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  7. Production Economics & Profitability Example
                </h3>
                <div className="bg-emerald-900 text-white p-5 rounded-2xl space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-emerald-800/80 p-3 rounded-xl border border-emerald-700">
                      <div className="text-xs text-emerald-200">Production Cost / Acre</div>
                      <div className="text-lg font-bold">KES {activeCropModal.profitabilityExample.costKES.toLocaleString()}</div>
                    </div>
                    <div className="bg-emerald-800/80 p-3 rounded-xl border border-emerald-700">
                      <div className="text-xs text-emerald-200">Gross Sales Revenue</div>
                      <div className="text-lg font-bold">KES {activeCropModal.profitabilityExample.revenueKES.toLocaleString()}</div>
                    </div>
                    <div className="bg-emerald-950 p-3 rounded-xl border border-emerald-600">
                      <div className="text-xs text-emerald-300">Net Profit / Acre</div>
                      <div className="text-lg font-bold text-emerald-400">KES {activeCropModal.profitabilityExample.profitKES.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-200 text-center">
                    {activeCropModal.profitabilityExample.assumptions}
                  </div>
                </div>
              </div>

              {/* Section 8: Common Mistakes to Avoid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-700" />
                  8. Critical Mistakes to Avoid
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-700 list-disc list-inside bg-red-50/50 p-4 rounded-xl border border-red-200/60">
                  {activeCropModal.mistakesToAvoid.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>

              {/* Section 9: References & Publication Source */}
              <div className="border-t border-stone-200 pt-4 text-xs text-stone-500 space-y-1">
                <div className="font-bold text-stone-700">Verified Technical References:</div>
                <ul className="list-disc list-inside">
                  {activeCropModal.citations.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Bottom Close */}
            <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setActiveCropModal(null)}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
