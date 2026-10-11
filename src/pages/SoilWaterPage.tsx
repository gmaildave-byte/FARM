import React, { useState } from 'react';
import {
  Droplet,
  Layers,
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Calculator,
  Compass,
  Building,
  Sprout
} from 'lucide-react';
import { soilTypesData, soilTestingLabs, irrigationMethods } from '../data/soilWater';
import { useLanguage } from '../context/LanguageContext';
import { Page } from '../types';

interface SoilWaterPageProps {
  setCurrentPage: (page: Page) => void;
}

export const SoilWaterPage: React.FC<SoilWaterPageProps> = ({ setCurrentPage }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'soil' | 'testing' | 'irrigation'>('soil');

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Droplet className="w-3.5 h-3.5" />
            Soil Health, Nutrient Management & Irrigation Center
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Soil Health, Fertilizers & Water Management
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Healthy soil is the foundation of high crop yields. Learn how to diagnose soil types, calculate exact agricultural lime requirements for acidic soils, interpret laboratory tests, and choose water-efficient drip irrigation systems across Kenya.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 gap-2">
        <button
          onClick={() => setActiveTab('soil')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'soil'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Kenyan Soil Types & Fertility
        </button>
        <button
          onClick={() => setActiveTab('testing')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'testing'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Soil Testing Labs & Sampling Protocols
        </button>
        <button
          onClick={() => setActiveTab('irrigation')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition ${
            activeTab === 'irrigation'
              ? 'border-emerald-800 text-emerald-900'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          Irrigation Systems & Water Harvesting
        </button>
      </div>

      {/* Tab 1: Soil Types */}
      {activeTab === 'soil' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {soilTypesData.map((soil) => (
              <div
                key={soil.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">{soil.name}</h3>
                    <p className="text-xs text-stone-500 italic">{soil.swahiliName}</p>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{soil.characteristics}</p>

                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs space-y-1">
                    <div><strong>Drainage Rate:</strong> {soil.drainageRate}</div>
                    <div><strong>Organic Matter:</strong> {soil.organicMatterContent}</div>
                    <div><strong>Dominant Counties:</strong> {soil.dominantCounties.join(', ')}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                      Best Adapted Crops
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {soil.bestCrops.map((c) => (
                        <span key={c} className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-stone-100">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Agronomic Management Tips
                  </span>
                  <ul className="text-xs text-stone-600 space-y-1 list-disc list-inside">
                    {soil.managementTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Liming Guide */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-700" />
              Soil Acidity & Agricultural Lime Guidance (Kenya Tea & Highland Zones)
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              In heavy rainfall zones like western Kenya and Central highlands, base cations (calcium and magnesium) leach away, leaving soils acidic (pH &lt; 5.2). In acidic soils, over 70% of applied inorganic phosphate fertilizer (DAP) becomes chemically fixed into insoluble iron/aluminum compounds and unavailable to maize or vegetable roots.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-red-900 block mb-0.5">pH &lt; 5.0 (Severely Acidic)</span>
                <span>Apply 1.5 – 2.0 Tonnes of Calcitic or Dolomitic Lime per acre 4 weeks before planting.</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-amber-900 block mb-0.5">pH 5.0 – 5.8 (Moderately Acidic)</span>
                <span>Apply 1.0 Tonne Lime per acre; supplement with organic cattle manure.</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200">
                <span className="font-bold text-emerald-900 block mb-0.5">pH 6.0 – 6.8 (Optimal Range)</span>
                <span>Ideal nutrient availability. No liming needed; maintain with compost.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Testing Labs & Sampling */}
      {activeTab === 'testing' && (
        <div className="space-y-6">
          {/* Step-by-Step Sampling Protocol */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-stone-900">
              Standard 5-Step Field Soil Sampling Protocol
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-black text-emerald-800 text-base">01</span>
                <div className="font-bold text-stone-900">Divide Field</div>
                <div className="text-stone-600">Sample uniform blocks separately (separate slopes, colors, crops).</div>
              </div>
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-black text-emerald-800 text-base">02</span>
                <div className="font-bold text-stone-900">Zigzag Walk</div>
                <div className="text-stone-600">Walk in a "W" or "Z" pattern taking 15 to 20 sub-samples across 1-5 acres.</div>
              </div>
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-black text-emerald-800 text-base">03</span>
                <div className="font-bold text-stone-900">V-Shaped Cut</div>
                <div className="text-stone-600">Dig a 20cm V-notch hole with a clean spade; scrape a 2cm slice from top to bottom.</div>
              </div>
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-black text-emerald-800 text-base">04</span>
                <div className="font-bold text-stone-900">Mix in Clean Pail</div>
                <div className="text-stone-600">Thoroughly combine all 15 slices in a clean plastic bucket. Remove stones and grass roots.</div>
              </div>
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-black text-emerald-800 text-base">05</span>
                <div className="font-bold text-stone-900">Pack 500g Sample</div>
                <div className="text-stone-600">Place 0.5 kg of composite soil into a labeled khaki paper bag and submit to certified lab.</div>
              </div>
            </div>
          </div>

          {/* Directory of Labs */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900">
              Verified Soil Testing Laboratories in Kenya
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {soilTestingLabs.map((lab) => (
                <div
                  key={lab.name}
                  className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                    <Building className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{lab.name}</h4>
                    <p className="text-xs text-stone-500">{lab.location}</p>
                  </div>
                  <div className="text-xs text-stone-600">
                    <strong>Testing Services:</strong> {lab.services}
                  </div>
                  <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-xs flex justify-between items-center">
                    <span className="text-stone-600">Standard Test Fee:</span>
                    <span className="font-bold text-emerald-900">KES {lab.standardPriceKES.toLocaleString()}</span>
                  </div>
                  <div className="text-[11px] text-stone-500">{lab.contact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Irrigation & Water Management */}
      {activeTab === 'irrigation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {irrigationMethods.map((irr) => (
              <div
                key={irr.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">{irr.name}</h3>
                    <p className="text-xs text-stone-500 italic">{irr.swahiliName}</p>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs space-y-1">
                    <div><strong>Water Efficiency:</strong> {irr.efficiencyPct}</div>
                    <div><strong>Est. Cost / Acre:</strong> KES {irr.costPerAcreKES}</div>
                    <div><strong>Water Savings:</strong> {irr.waterSaving}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                      Ideal Crops
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {irr.idealCrops.map((c) => (
                        <span key={c} className="text-[11px] bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                  <div className="text-emerald-900"><strong>Pros:</strong> {irr.pros}</div>
                  <div className="text-stone-600"><strong>Cons:</strong> {irr.cons}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Link to Irrigation Water Estimator */}
          <div className="bg-emerald-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold">Need to calculate exact crop water needs?</h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                Use Calculator #8 in our 26-tool suite to estimate daily litres, pump flow rates, and monthly reservoir requirements.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('calculators')}
              className="px-5 py-2.5 bg-white text-emerald-950 hover:bg-stone-100 font-bold rounded-xl text-xs transition shadow-xs shrink-0"
            >
              Open Irrigation Calculator #8
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
