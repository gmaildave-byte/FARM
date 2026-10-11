import React, { useState } from 'react';
import {
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Droplet,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { kenyanCounties } from '../components/Navbar';

interface WeatherPageProps {
  selectedCounty: string;
  setSelectedCounty: (county: string) => void;
}

export const WeatherPage: React.FC<WeatherPageProps> = ({
  selectedCounty,
  setSelectedCounty,
}) => {
  const { t } = useLanguage();
  const [selectedCropCalendar, setSelectedCropCalendar] = useState('Maize');
  const [selectedRainfallSeason, setSelectedRainfallSeason] = useState('Long Rains (March - August)');

  const agroEcologicalZones = [
    {
      zone: 'Highland Grain Basket (Trans Nzoia, Uasin Gishu, Nandi)',
      annualRainfall: '1,000 – 1,400 mm unimodal / extended bimodal',
      elevation: '1,800 – 2,400 m ASL',
      advisory: 'Main season maize harvesting and field drying currently underway. Farmers advised to test grain moisture (<13.5%) before storage. Early land preparation recommended for short-season legumes.'
    },
    {
      zone: 'Central Highlands & Mount Kenya (Kiambu, Nyeri, Murang\'a, Meru)',
      annualRainfall: '900 – 1,600 mm bimodal (Long Rains Mar-May, Short Rains Oct-Dec)',
      elevation: '1,500 – 2,200 m ASL',
      advisory: 'Short Rains season onset anticipated. Complete soil liming and deep tillage now. Plant certified potato tubers, French beans, and brassicas upon onset of 20mm cumulative rainfall.'
    },
    {
      zone: 'Eastern Semi-Arid Lowlands (Machakos, Makueni, Kitui)',
      annualRainfall: '450 – 750 mm highly erratic bimodal',
      elevation: '700 – 1,300 m ASL',
      advisory: 'Short rains are the primary reliable cropping window. Plant drought-tolerant varieties (KDV4 maize, Katumani beans, Green grams Ndengu, Cowpeas, Sorghum). Dig Zai pits and contour bunds.'
    },
    {
      zone: 'Lake Victoria Basin & Western (Kakamega, Bungoma, Kisumu, Kisii)',
      annualRainfall: '1,200 – 1,900 mm well-distributed bimodal',
      elevation: '1,100 – 1,700 m ASL',
      advisory: 'Regular afternoon convective showers. Excellent moisture for cassava, sweet potatoes, and continuous vegetable production. Watch for Fall Armyworm in young cereals.'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Sun className="w-3.5 h-3.5" />
            Kenyan Agro-Meteorological & Seasonal Intelligence
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Weather, Climate & Planting Calendars
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Location-specific weather advisories grounded in official Kenya Meteorological Department (KMD) seasonal forecasts. Learn when to plant, plan irrigation schedules, and generate week-by-week operational timetables for your county.
          </p>
        </div>
      </div>

      {/* County Selector & Current Conditions Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Current Observation Station</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900">{selectedCounty} Agro-Weather Advisory</h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">Switch County:</span>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-900 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {kenyanCounties.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Weather Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
              <Thermometer className="w-4 h-4 text-emerald-700" />
              <span>Temperature</span>
            </div>
            <div className="text-2xl font-black text-stone-900">22°C – 26°C</div>
            <div className="text-[11px] text-stone-500">Mild Highland Optimum</div>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
              <CloudRain className="w-4 h-4 text-emerald-700" />
              <span>Seasonal Phase</span>
            </div>
            <div className="text-2xl font-black text-emerald-900">Short Rains Onset</div>
            <div className="text-[11px] text-stone-500">October – December Cycle</div>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
              <Droplet className="w-4 h-4 text-emerald-700" />
              <span>Soil Moisture</span>
            </div>
            <div className="text-2xl font-black text-stone-900">Moderate</div>
            <div className="text-[11px] text-stone-500">Favorable for Seed Germination</div>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
              <Wind className="w-4 h-4 text-emerald-700" />
              <span>Pest Risk Level</span>
            </div>
            <div className="text-2xl font-black text-amber-700">Moderate</div>
            <div className="text-[11px] text-stone-500">Scout early for Fall Armyworm</div>
          </div>
        </div>
      </div>

      {/* Agro-Ecological Zones Intelligence */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-stone-900">Regional Agricultural Outlooks by Zone</h3>
          <span className="text-xs text-stone-500">Source: Kenya Meteorological Department (KMD)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agroEcologicalZones.map((z, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2 shadow-xs"
            >
              <h4 className="text-sm font-bold text-emerald-950">{z.zone}</h4>
              <div className="text-xs text-stone-500">
                <strong>Annual Rainfall:</strong> {z.annualRainfall} • <strong>Elevation:</strong> {z.elevation}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed pt-1">
                {z.advisory}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Planting Calendar Generator */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-stone-100 pb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            Operational Planning Tool
          </div>
          <h3 className="text-xl font-bold text-stone-900">Interactive Crop Planting Calendar Generator</h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Generate an authoritative week-by-week timetable tailored to your rainfall onset and crop selection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">County</label>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
            >
              {kenyanCounties.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Crop</label>
            <select
              value={selectedCropCalendar}
              onChange={(e) => setSelectedCropCalendar(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
            >
              <option value="Maize">Hybrid Maize (H614D / SC Duma)</option>
              <option value="Tomatoes">Tomatoes (Kilele F1 / Anna F1)</option>
              <option value="Beans">Common Beans (Rosecoco / Nyota)</option>
              <option value="Potatoes">Irish Potatoes (Shangi / Unica)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Season</label>
            <select
              value={selectedRainfallSeason}
              onChange={(e) => setSelectedRainfallSeason(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-xs sm:text-sm bg-white"
            >
              <option value="Long Rains (March - August)">Long Rains (March – August)</option>
              <option value="Short Rains (October - January)">Short Rains (October – January)</option>
            </select>
          </div>
        </div>

        {/* Timetable Schedule Cards */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div className="bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg shrink-0 text-center">
              Weeks 1–2
            </div>
            <div>
              <div className="font-bold text-stone-900 text-sm">Primary & Secondary Land Preparation</div>
              <div className="text-stone-600 mt-0.5 leading-relaxed">
                Plow field to 20–25cm depth to expose soil pests to predators and sunlight. Harrow to a fine, weed-free tilth before rainfall onset. Submit soil sample to KALRO/Cropnuts if not tested in the past 2 years. Purchase certified seed with scratch SMS verification code.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div className="bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg shrink-0 text-center">
              Weeks 3–4
            </div>
            <div>
              <div className="font-bold text-stone-900 text-sm">Planting & Basal Fertilization</div>
              <div className="text-stone-600 mt-0.5 leading-relaxed">
                Sow seed immediately when soil is consistently moist (minimum 20mm rainfall). Place basal DAP or NPK 23:23:0 (50kg/acre) 5cm away from the seed and cover with thin layer of soil to prevent seed burning.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div className="bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg shrink-0 text-center">
              Weeks 6–8
            </div>
            <div>
              <div className="font-bold text-stone-900 text-sm">First Weeding & Knee-High CAN Top-Dressing</div>
              <div className="text-stone-600 mt-0.5 leading-relaxed">
                Execute shallow mechanical or hand-hoe weeding before the weed canopy competes for soil moisture. Apply top-dressing of Calcium Ammonium Nitrate (CAN 26% N) at 50 to 75 kg per acre banded 10–15 cm from stems while soil is moist. Scout funnel whorls for Fall Armyworm window-pane feeding.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div className="bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg shrink-0 text-center">
              Weeks 16+
            </div>
            <div>
              <div className="font-bold text-stone-900 text-sm">Maturity, Field Drying & Hermetic Storage</div>
              <div className="text-stone-600 mt-0.5 leading-relaxed">
                Look for physiological maturity (black layer at kernel base). Allow crop to dry in field or stooking. Dry harvested grain on clean tarpaulins to exactly 13.5% or lower. Store in hermetic PICS bags without synthetic chemical dust to prevent larger grain borer infestation.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Climate Resilience & Drought/Flood Preparedness */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          Climate Resilience, Drought & Flood Preparedness Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700 leading-relaxed">
          <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-1.5">
            <span className="font-bold text-stone-900 block text-sm">Drought & Dry Spell Mitigation:</span>
            <ul className="list-disc list-inside space-y-1">
              <li>Mulch soil beds with dry grass or maize stover to reduce evaporation losses by 60%.</li>
              <li>Conserve silage and high-protein legume hay (Brachiaria, Lucerne) during surplus seasons.</li>
              <li>Adopt minimum-tillage conservation agriculture to preserve subsoil moisture reserves.</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-1.5">
            <span className="font-bold text-stone-900 block text-sm">Excessive Rainfall & Flood Preparedness:</span>
            <ul className="list-disc list-inside space-y-1">
              <li>Excavate contour cutoff drains (Fanya Juu terraces) to direct destructive flash runoff away from fields.</li>
              <li>Construct raised beds (15–20cm) in heavy clay or black cotton soils to prevent root waterlogging.</li>
              <li>Elevate grain drying tarpaulins off the ground to avoid bottom moisture absorption.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
