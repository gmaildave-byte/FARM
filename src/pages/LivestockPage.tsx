import React, { useState } from 'react';
import {
  Layers,
  Search,
  ShieldCheck,
  Milk,
  Egg,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Droplet,
  CheckCircle2,
  X,
  DollarSign
} from 'lucide-react';
import { livestockData } from '../data/livestock';
import { LivestockGuide } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const LivestockPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLivestockModal, setActiveLivestockModal] = useState<LivestockGuide | null>(null);

  const categories = [
    { id: 'all', label: 'All Species', count: livestockData.length },
    { id: 'dairy-cattle', label: 'Dairy Cattle', count: livestockData.filter(l => l.category === 'dairy-cattle').length },
    { id: 'poultry', label: 'Poultry (Broiler / Layer / Kienyeji)', count: livestockData.filter(l => l.category === 'poultry').length },
    { id: 'goats', label: 'Goats (Dairy & Meat)', count: livestockData.filter(l => l.category === 'goats').length },
    { id: 'aquaculture', label: 'Fish Farming', count: livestockData.filter(l => l.category === 'aquaculture').length },
    { id: 'beekeeping', label: 'Beekeeping', count: livestockData.filter(l => l.category === 'beekeeping').length }
  ];

  const filteredLivestock = livestockData.filter((guide) => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch =
      guide.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.swahiliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.breeds.some(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Layers className="w-3.5 h-3.5" />
            Comprehensive Kenyan Livestock Farming Module
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Livestock Farming & Animal Health
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Practical production guidelines for dairy cattle, commercial poultry, goats, fish farming, and apiculture in Kenya. Includes verified vaccination schedules, zero-grazing housing plans, dry matter feed budgeting, and disease prevention.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
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

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search species, breed, disease..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Livestock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLivestock.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.species}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-emerald-950/85 backdrop-blur-xs text-emerald-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    {item.species} ({item.swahiliName})
                  </h3>
                  <p className="text-xs text-stone-500 italic">{item.scientificName}</p>
                </div>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {item.overview}
                </p>

                {/* Breeds Preview */}
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Key Breeds / Strains
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.breeds.map((b) => (
                      <span
                        key={b.name}
                        className="text-[11px] bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-medium"
                      >
                        {b.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vaccinations Count */}
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-900 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Vaccination Schedule:
                  </span>
                  <span className="font-bold text-emerald-800">
                    {item.vaccinationSchedule.length} Key Milestones
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setActiveLivestockModal(item)}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Read Full Livestock Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive Livestock Detail Modal */}
      {activeLivestockModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                  <Layers className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                    {activeLivestockModal.species} ({activeLivestockModal.swahiliName})
                  </h2>
                  <p className="text-xs text-stone-500 italic">{activeLivestockModal.scientificName}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveLivestockModal(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Overview */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                  Species Overview & Kenyan Industry Context
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  {activeLivestockModal.overview}
                </p>
              </div>

              {/* Breeds Selection */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                  Breeds Characteristics & Production Yields
                </h3>
                <div className="space-y-3">
                  {activeLivestockModal.breeds.map((b) => (
                    <div
                      key={b.name}
                      className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 text-xs space-y-1"
                    >
                      <div className="flex justify-between items-center font-bold text-stone-900 text-sm">
                        <span>{b.name}</span>
                        <span className="text-xs text-emerald-800 font-semibold">{b.productionYield}</span>
                      </div>
                      <div className="text-stone-600"><strong>Traits:</strong> {b.characteristics}</div>
                      <div className="text-stone-600"><strong>Ideal Suitability:</strong> {b.suitability}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Housing & Space Specifications */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                  Housing Specifications & Space Requirements
                </h3>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs leading-relaxed text-stone-700">
                  <div><strong>Unit Architecture:</strong> {activeLivestockModal.housingRequirements}</div>
                  <div><strong>Recommended Floor Space:</strong> {activeLivestockModal.spacePerAnimal}</div>
                </div>
              </div>

              {/* Feeding & Daily Rations */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                  Nutrition, Feeds & Clean Water Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                    <div className="font-bold text-stone-900">Roughage & Base Rations</div>
                    <div className="text-stone-700">{activeLivestockModal.feedingNutrition.roughageOrMain}</div>
                    <div className="font-bold text-stone-900 pt-1">Concentrates / Meal</div>
                    <div className="text-stone-700">{activeLivestockModal.feedingNutrition.concentrates}</div>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                    <div className="font-bold text-stone-900">Minerals & Supplements</div>
                    <div className="text-stone-700">{activeLivestockModal.feedingNutrition.mineralsAndVitamins}</div>
                    <div className="font-bold text-stone-900 pt-1">Daily Clean Water</div>
                    <div className="text-emerald-800 font-bold">{activeLivestockModal.feedingNutrition.waterLitersPerDay}</div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Vaccination Schedule */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Preventive Vaccination & Health Schedule (Kenya Veterinary Standards)
                </h3>
                <div className="overflow-x-auto border border-stone-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-emerald-950 text-white text-[11px] uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Timing / Age</th>
                        <th className="p-3">Target Disease</th>
                        <th className="p-3">Vaccine</th>
                        <th className="p-3">Route</th>
                        <th className="p-3">Technical Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      {activeLivestockModal.vaccinationSchedule.map((vac, idx) => (
                        <tr key={idx} className="hover:bg-stone-50">
                          <td className="p-3 font-semibold text-stone-900">{vac.timing}</td>
                          <td className="p-3 font-bold text-red-900">{vac.disease}</td>
                          <td className="p-3 text-stone-700">{vac.vaccine}</td>
                          <td className="p-3 text-stone-600">{vac.route}</td>
                          <td className="p-3 text-stone-500">{vac.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Common Diseases & Prevention */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                  Critical Diseases & Warning Signs
                </h3>
                <div className="space-y-2">
                  {activeLivestockModal.commonDiseases.map((d, idx) => (
                    <div
                      key={idx}
                      className="bg-red-50/50 p-3.5 rounded-xl border border-red-200 text-xs space-y-1"
                    >
                      <div className="font-bold text-red-900">{d.disease}</div>
                      <div className="text-stone-700"><strong>Symptoms:</strong> {d.symptoms}</div>
                      <div className="text-emerald-900 font-medium"><strong>Prevention:</strong> {d.prevention}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise Economics Example */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-700" />
                  Enterprise Economics & Cash Flow Example (KES)
                </h3>
                <div className="bg-emerald-900 text-white p-5 rounded-2xl space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-emerald-800/80 p-3 rounded-xl border border-emerald-700">
                      <div className="text-xs text-emerald-200">Capital Setup Outlay</div>
                      <div className="text-lg font-bold">KES {activeLivestockModal.economicsExample.setupCostKES.toLocaleString()}</div>
                    </div>
                    <div className="bg-emerald-800/80 p-3 rounded-xl border border-emerald-700">
                      <div className="text-xs text-emerald-200">Monthly Operating Costs</div>
                      <div className="text-lg font-bold">KES {activeLivestockModal.economicsExample.monthlyOperatingKES.toLocaleString()}</div>
                    </div>
                    <div className="bg-emerald-950 p-3 rounded-xl border border-emerald-600">
                      <div className="text-xs text-emerald-300">Monthly Gross Revenue</div>
                      <div className="text-lg font-bold text-emerald-400">KES {activeLivestockModal.economicsExample.monthlyRevenueKES.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-200 text-center">
                    Estimated Break-Even Timeline: {activeLivestockModal.economicsExample.breakEvenMonths}
                  </div>
                </div>
              </div>

              {/* References */}
              <div className="border-t border-stone-200 pt-4 text-xs text-stone-500 space-y-1">
                <div className="font-bold text-stone-700">Technical References:</div>
                <ul className="list-disc list-inside">
                  {activeLivestockModal.citations.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setActiveLivestockModal(null)}
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
