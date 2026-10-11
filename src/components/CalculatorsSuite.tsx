import React, { useState } from 'react';
import {
  Calculator,
  Compass,
  Droplet,
  DollarSign,
  TrendingUp,
  Scale,
  Milk,
  Egg,
  Truck,
  RotateCcw,
  Calendar,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CalculatorsSuite: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCalcId, setSelectedCalcId] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // 1. Land Area Converter
  const [c1Area, setC1Area] = useState<number>(2.5);
  const [c1Unit, setC1Unit] = useState<string>('acres');

  // 2. Acre to Hectare
  const [c2Acres, setC2Acres] = useState<number>(5);

  // 3. Seed Quantity Calculator
  const [c3Crop, setC3Crop] = useState<string>('maize');
  const [c3Acreage, setC3Acreage] = useState<number>(3);
  const [c3GermRate, setC3GermRate] = useState<number>(95);

  // 4. Plant Spacing Calculator
  const [c4RowCm, setC4RowCm] = useState<number>(75);
  const [c4PlantCm, setC4PlantCm] = useState<number>(25);

  // 5. Plant Population Calculator
  const [c5AreaAcres, setC5AreaAcres] = useState<number>(2);
  const [c5RowCm, setC5RowCm] = useState<number>(60);
  const [c5PlantCm, setC5PlantCm] = useState<number>(45);

  // 6. Fertilizer Quantity Calculator
  const [c6Acreage, setC6Acreage] = useState<number>(4);
  const [c6BasalRateKg, setC6BasalRateKg] = useState<number>(50); // DAP kg/acre
  const [c6TopRateKg, setC6TopRateKg] = useState<number>(75); // CAN kg/acre
  const [c6DapPriceKES, setC6DapPriceKES] = useState<number>(2500); // subsidized bag
  const [c6CanPriceKES, setC6CanPriceKES] = useState<number>(2000);

  // 7. Manure and Compost Calculator
  const [c7Acreage, setC7Acreage] = useState<number>(2);
  const [c7RateTonsPerAcre, setC7RateTonsPerAcre] = useState<number>(5);

  // 8. Irrigation Water Estimator
  const [c8AreaM2, setC8AreaM2] = useState<number>(4047); // 1 acre
  const [c8DailyEtMm, setC8DailyEtMm] = useState<number>(5); // 5mm/day
  const [c8EfficiencyPct, setC8EfficiencyPct] = useState<number>(90); // drip

  // 9. Crop Yield Estimator (Maize example)
  const [c9PlantCount, setC9PlantCount] = useState<number>(20000);
  const [c9CobsPerPlant, setC9CobsPerPlant] = useState<number>(1);
  const [c9GrainPerCobGrams, setC9GrainPerCobGrams] = useState<number>(145);

  // 10. Harvest Quantity Converter
  const [c10GrossWeightKg, setC10GrossWeightKg] = useState<number>(4500);

  // 11. Farm Production Cost Calculator
  const [c11LandPrep, setC11LandPrep] = useState<number>(7000);
  const [c11Seeds, setC11Seeds] = useState<number>(6000);
  const [c11Fertilizers, setC11Fertilizers] = useState<number>(12000);
  const [c11LaborChemicals, setC11LaborChemicals] = useState<number>(9500);
  const [c11HarvestPost, setC11HarvestPost] = useState<number>(6000);

  // 12. Gross Revenue Calculator
  const [c12UnitsSold, setC12UnitsSold] = useState<number>(35);
  const [c12PricePerUnit, setC12PricePerUnit] = useState<number>(3200);

  // 13. Net Profit / Loss
  const [c13Revenue, setC13Revenue] = useState<number>(112000);
  const [c13Expenses, setC13Expenses] = useState<number>(40500);

  // 14. Break-even Price Calculator
  const [c14TotalCost, setC14TotalCost] = useState<number>(40500);
  const [c14ExpectedBags, setC14ExpectedBags] = useState<number>(30);

  // 15. Crop Budget Planner
  const [c15Acres, setC15Acres] = useState<number>(2);
  const [c15CostPerAcre, setC15CostPerAcre] = useState<number>(35000);
  const [c15YieldPerAcre, setC15YieldPerAcre] = useState<number>(28);
  const [c15PricePerUnit, setC15PricePerUnit] = useState<number>(3100);

  // 16. Livestock Feed Estimator
  const [c16CowWeightKg, setC16CowWeightKg] = useState<number>(450);
  const [c16DailyMilkLiters, setC16DailyMilkLiters] = useState<number>(20);

  // 17. Poultry Flock & Egg Tracker
  const [c17BirdsCount, setC17BirdsCount] = useState<number>(500);
  const [c17LayRatePct, setC17LayRatePct] = useState<number>(86);
  const [c17PricePerTray, setC17PricePerTray] = useState<number>(420);

  // 18. Dairy Milk Revenue Tracker
  const [c18CowsMilking, setC18CowsMilking] = useState<number>(4);
  const [c18AvgLitersPerCow, setC18AvgLitersPerCow] = useState<number>(18);
  const [c18PricePerLiter, setC18PricePerLiter] = useState<number>(52);

  // 19. Feed Cost vs Milk Margin
  const [c19MilkDailyLiters, setC19MilkDailyLiters] = useState<number>(60);
  const [c19MilkPriceKES, setC19MilkPriceKES] = useState<number>(52);
  const [c19DairyMealKg, setC19DairyMealKg] = useState<number>(25);
  const [c19MealCostPerKg, setC19MealCostPerKg] = useState<number>(65);

  // 20. Greenhouse Budget
  const [c20KitCost, setC20KitCost] = useState<number>(250000);
  const [c20SeasonalTurnover, setC20SeasonalTurnover] = useState<number>(450000);
  const [c20SeasonalOperating, setC20SeasonalOperating] = useState<number>(120000);

  // 21. Farm Loan Repayment
  const [c21LoanPrincipal, setC21LoanPrincipal] = useState<number>(200000);
  const [c21AnnualInterest, setC21AnnualInterest] = useState<number>(13);
  const [c21TenureMonths, setC21TenureMonths] = useState<number>(24);

  // 22. Produce Transport Cost
  const [c22DistanceKm, setC22DistanceKm] = useState<number>(85);
  const [c22BagsCount, setC22BagsCount] = useState<number>(50);
  const [c22RatePerBagKm, setC22RatePerBagKm] = useState<number>(4.5);

  // 23. Post-Harvest Loss Calculator
  const [c23BagsStored, setC23BagsStored] = useState<number>(100);
  const [c23BagValueKES, setC23BagValueKES] = useState<number>(3200);
  const [c23LossRatePct, setC23LossRatePct] = useState<number>(14);

  // 24. Stock & Inventory Balance
  const [c24InitialBags, setC24InitialBags] = useState<number>(60);
  const [c24UsedBags, setC24UsedBags] = useState<number>(42);

  // 25. Crop Rotation Planner
  const [c25Year1Crop, setC25Year1Crop] = useState<string>('Maize (Heavy Feeder)');

  // 26. Planting Calendar Generator
  const [c26County, setC26County] = useState<string>('Trans Nzoia');
  const [c26Crop, setC26Crop] = useState<string>('Maize');
  const [c26Season, setC26Season] = useState<string>('Long Rains (March - August)');

  const calculatorsList = [
    { id: 1, name: 'Land Area Converter', category: 'land', desc: 'Convert between Acres, Hectares, Sq. Metres, and 50x100 plots.' },
    { id: 2, name: 'Acre-to-Hectare Converter', category: 'land', desc: 'Direct precision conversion between acres and hectares.' },
    { id: 3, name: 'Seed Quantity Calculator', category: 'land', desc: 'Calculate exact certified seed kg needed per acre.' },
    { id: 4, name: 'Plant Spacing Calculator', category: 'land', desc: 'Determine intra-row and inter-row spacing geometries.' },
    { id: 5, name: 'Plant Population Calculator', category: 'land', desc: 'Calculate total plant stand per acre or hectare.' },
    { id: 6, name: 'Fertilizer Quantity Calculator', category: 'nutrients', desc: 'Determine basal DAP and CAN top-dressing bag requirements & costs.' },
    { id: 7, name: 'Manure & Compost Calculator', category: 'nutrients', desc: 'Estimate tons of farmyard manure or compost required per field.' },
    { id: 8, name: 'Irrigation Water Estimator', category: 'nutrients', desc: 'Daily and seasonal water requirements based on ET and emitter efficiency.' },
    { id: 9, name: 'Crop Yield Estimator', category: 'yield', desc: 'Estimate harvest yield based on plant count, cob size, or fruit weight.' },
    { id: 10, name: 'Harvest Quantity Converter', category: 'yield', desc: 'Convert gross harvest weight into 90kg maize bags, 50kg potato bags, or crates.' },
    { id: 11, name: 'Farm Production Cost Calculator', category: 'finance', desc: 'Aggregate all input, land prep, chemical, labor, and harvesting expenses.' },
    { id: 12, name: 'Gross Revenue Calculator', category: 'finance', desc: 'Calculate total farm sales based on yield and market unit price.' },
    { id: 13, name: 'Net Profit & Loss Calculator', category: 'finance', desc: 'Determine enterprise net profit margin (Revenue minus Costs).' },
    { id: 14, name: 'Break-even Price Calculator', category: 'finance', desc: 'Find minimum price per bag/kg needed to cover production costs.' },
    { id: 15, name: 'Crop Budget Planner', category: 'finance', desc: 'Comprehensive seasonal enterprise budgeting model.' },
    { id: 16, name: 'Livestock Feed Estimator', category: 'livestock', desc: 'Calculate daily Dry Matter (DM) and roughage requirements for cattle.' },
    { id: 17, name: 'Poultry Flock & Egg Tracker', category: 'livestock', desc: 'Track daily lay rate %, egg trays harvested, and daily flock revenue.' },
    { id: 18, name: 'Dairy Milk Production Tracker', category: 'livestock', desc: 'Calculate monthly dairy milk turnover and lactating performance.' },
    { id: 19, name: 'Feed Cost vs Milk Margin', category: 'livestock', desc: 'Measure dairy meal concentrate cost against daily milk revenue.' },
    { id: 20, name: 'Greenhouse Production Budget', category: 'finance', desc: 'Analyze greenhouse capital investment, seasonal inputs, and payback period.' },
    { id: 21, name: 'Farm Loan Repayment Estimator', category: 'finance', desc: 'Calculate monthly loan installments and total interest on agricultural credit.' },
    { id: 22, name: 'Produce Transport Cost Calculator', category: 'finance', desc: 'Estimate trucking freight costs per bag/ton over delivery distances.' },
    { id: 23, name: 'Post-Harvest Loss Calculator', category: 'yield', desc: 'Quantify financial losses from storage pests, moisture, and spillage.' },
    { id: 24, name: 'Stock & Inventory Tracker', category: 'finance', desc: 'Track inputs balance and consumption rate in on-farm stores.' },
    { id: 25, name: 'Crop Rotation Planner', category: 'land', desc: 'Generate 4-season rotation sequence to break pests and build soil nitrogen.' },
    { id: 26, name: 'Planting Calendar Generator', category: 'land', desc: 'Week-by-week operational schedule aligned with Kenyan rainfall seasons.' }
  ];

  const filteredCalcs = calculatorsList.filter(c => {
    const matchesCat = activeCategory === 'all' || c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          c.desc.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const selectedCalc = calculatorsList.find(c => c.id === selectedCalcId) || calculatorsList[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800/80 rounded-full text-xs font-medium text-emerald-200 mb-3 border border-emerald-700">
            <Calculator className="w-3.5 h-3.5" />
            26 Verified Agricultural Calculators
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Farming Calculators & Planning Tools
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Real, functional calculators designed specifically for Kenyan agro-ecological parameters, standard 90kg/50kg bagging standards, local input rates, and Kenyan Shilling (KES) budgeting.
          </p>
        </div>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All 26 Tools' },
            { id: 'land', label: 'Land & Planting' },
            { id: 'nutrients', label: 'Nutrients & Water' },
            { id: 'yield', label: 'Yield & Harvest' },
            { id: 'finance', label: 'Economics & Finance' },
            { id: 'livestock', label: 'Livestock & Dairy' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search calculator..."
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Main Grid: Left Selector List, Right Interactive Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Calculators Directory (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredCalcs.map(calc => (
            <button
              key={calc.id}
              onClick={() => setSelectedCalcId(calc.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedCalcId === calc.id
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                  : 'border-stone-200 bg-white hover:border-emerald-300 hover:bg-stone-50/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-emerald-800 mr-1.5">#{calc.id}</span>
                  <span className="text-sm font-semibold text-stone-900">{calc.name}</span>
                </div>
                {selectedCalcId === calc.id && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                )}
              </div>
              <p className="text-xs text-stone-700 mt-1 line-clamp-1">{calc.desc}</p>
            </button>
          ))}

          {filteredCalcs.length === 0 && (
            <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-stone-700 text-sm">
              No calculators match your search.
            </div>
          )}
        </div>

        {/* Right: Active Calculator Workspace (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
          <div className="border-b border-stone-100 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
              <span>Calculator #{selectedCalc.id}</span>
              <span>•</span>
              <span className="capitalize">{selectedCalc.category}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">{selectedCalc.name}</h2>
            <p className="text-sm text-stone-700 mt-1">{selectedCalc.desc}</p>
          </div>

          {/* Render individual calculator logic */}
          {selectedCalcId === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Area Value</label>
                  <input
                    type="number"
                    value={c1Area}
                    onChange={e => setC1Area(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Input Unit</label>
                  <select
                    value={c1Unit}
                    onChange={e => setC1Unit(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                    <option value="sqm">Square Metres (m²)</option>
                    <option value="plots">50x100 Plots (1/8 Acre)</option>
                  </select>
                </div>
              </div>

              {/* Conversion Output */}
              {(() => {
                let acres = 0;
                if (c1Unit === 'acres') acres = c1Area;
                else if (c1Unit === 'hectares') acres = c1Area * 2.47105;
                else if (c1Unit === 'sqm') acres = c1Area / 4046.86;
                else if (c1Unit === 'plots') acres = c1Area * 0.125;

                const hectares = acres * 0.404686;
                const sqm = acres * 4046.86;
                const plots = acres * 8;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">Converted Equivalents</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-800">{acres.toFixed(3)}</div>
                        <div className="text-xs text-stone-700">Acres</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-800">{hectares.toFixed(3)}</div>
                        <div className="text-xs text-stone-700">Hectares</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-800">{Math.round(sqm).toLocaleString()}</div>
                        <div className="text-xs text-stone-700">Sq. Metres (m²)</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-800">{plots.toFixed(1)}</div>
                        <div className="text-xs text-stone-700">50x100 Plots (1/8th)</div>
                      </div>
                    </div>
                    <div className="text-xs text-stone-700 pt-2 border-t border-emerald-200">
                      <strong>Standard Formula:</strong> 1 Acre = 0.4047 Hectares = 4,046.86 m² = 8 standard 50x100 plots (approx. 465 m² each).
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Acres to Convert</label>
                <input
                  type="number"
                  value={c2Acres}
                  onChange={e => setC2Acres(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Result</div>
                <div className="text-2xl font-bold text-emerald-900">
                  {c2Acres} Acres = {(c2Acres * 0.404686).toFixed(4)} Hectares
                </div>
                <div className="text-xs text-stone-700">
                  Reverse: {(c2Acres * 0.404686).toFixed(4)} Hectares = {c2Acres} Acres (Multiplier: 1 Acre = 0.404686 Hectare; 1 Hectare = 2.471 Acres).
                </div>
              </div>
            </div>
          )}

          {selectedCalcId === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Crop Type</label>
                  <select
                    value={c3Crop}
                    onChange={e => setC3Crop(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="maize">Hybrid Maize (10 kg/acre)</option>
                    <option value="beans">Common Beans (22 kg/acre)</option>
                    <option value="wheat">Wheat (50 kg/acre)</option>
                    <option value="potatoes">Potatoes (16 bags size II/acre)</option>
                    <option value="sukuma">Kale/Sukuma Wiki (150 g/acre)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cultivated Acreage</label>
                  <input
                    type="number"
                    value={c3Acreage}
                    onChange={e => setC3Acreage(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Certified Germination %</label>
                  <input
                    type="number"
                    value={c3GermRate}
                    onChange={e => setC3GermRate(Math.min(100, Math.max(50, parseFloat(e.target.value) || 95)))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                let basePerAcre = 10;
                let unit = 'kg';
                if (c3Crop === 'beans') basePerAcre = 22;
                if (c3Crop === 'wheat') basePerAcre = 50;
                if (c3Crop === 'potatoes') { basePerAcre = 16; unit = 'bags (50kg)'; }
                if (c3Crop === 'sukuma') { basePerAcre = 0.15; unit = 'kg (150g)'; }

                const adjustedPerAcre = basePerAcre * (100 / c3GermRate);
                const totalNeeded = adjustedPerAcre * c3Acreage;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Required Certified Seed</div>
                    <div className="text-2xl font-bold text-emerald-900">
                      {totalNeeded.toFixed(2)} {unit}
                    </div>
                    <div className="text-xs text-stone-700">
                      For {c3Acreage} acres at {c3GermRate}% verified germination rate. Recommended packet breakdown: {Math.ceil(totalNeeded / 2)} x 2kg packets (if maize).
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Inter-Row Spacing (Between Rows in cm)</label>
                  <input
                    type="number"
                    value={c4RowCm}
                    onChange={e => setC4RowCm(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Intra-Row Spacing (Within Row in cm)</label>
                  <input
                    type="number"
                    value={c4PlantCm}
                    onChange={e => setC4PlantCm(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const areaPerPlantM2 = (c4RowCm / 100) * (c4PlantCm / 100);
                const perAcre = Math.round(4046.86 / areaPerPlantM2);
                const perHectare = Math.round(10000 / areaPerPlantM2);

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Resulting Plant Geometry</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-xl font-bold text-emerald-900">{perAcre.toLocaleString()} plants / acre</div>
                        <div className="text-xs text-stone-700">Area per plant: {(areaPerPlantM2 * 10000).toFixed(0)} cm²</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-xl font-bold text-emerald-900">{perHectare.toLocaleString()} plants / hectare</div>
                        <div className="text-xs text-stone-700">Standard 10,000 m² base</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cultivated Acres</label>
                  <input
                    type="number"
                    value={c5AreaAcres}
                    onChange={e => setC5AreaAcres(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Between Rows (cm)</label>
                  <input
                    type="number"
                    value={c5RowCm}
                    onChange={e => setC5RowCm(Math.max(5, parseFloat(e.target.value) || 5))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Between Plants (cm)</label>
                  <input
                    type="number"
                    value={c5PlantCm}
                    onChange={e => setC5PlantCm(Math.max(5, parseFloat(e.target.value) || 5))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const areaPerPlant = (c5RowCm / 100) * (c5PlantCm / 100);
                const totalPopulation = Math.round((c5AreaAcres * 4046.86) / areaPerPlant);

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Total Plant Population</div>
                    <div className="text-3xl font-bold text-emerald-900">{totalPopulation.toLocaleString()} plants</div>
                    <div className="text-xs text-stone-700">
                      Formula: (Acreage × 4,046.86 m²) ÷ ((Row cm ÷ 100) × (Plant cm ÷ 100))
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 6 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Acreage</label>
                  <input
                    type="number"
                    value={c6Acreage}
                    onChange={e => setC6Acreage(Math.max(0.5, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Basal DAP (kg/acre)</label>
                  <input
                    type="number"
                    value={c6BasalRateKg}
                    onChange={e => setC6BasalRateKg(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Top-dress CAN (kg/acre)</label>
                  <input
                    type="number"
                    value={c6TopRateKg}
                    onChange={e => setC6TopRateKg(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const totalDapKg = c6Acreage * c6BasalRateKg;
                const dapBags = Math.ceil(totalDapKg / 50);
                const dapCost = dapBags * c6DapPriceKES;

                const totalCanKg = c6Acreage * c6TopRateKg;
                const canBags = Math.ceil(totalCanKg / 50);
                const canCost = canBags * c6CanPriceKES;

                const totalFertilizerCost = dapCost + canCost;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Fertilizer Requirement & Cost</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">{dapBags} bags (50kg)</div>
                        <div className="text-xs text-stone-700">DAP Basal ({totalDapKg} kg)</div>
                        <div className="text-xs font-semibold text-emerald-700 mt-1">KES {dapCost.toLocaleString()}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">{canBags} bags (50kg)</div>
                        <div className="text-xs text-stone-700">CAN Top-dress ({totalCanKg} kg)</div>
                        <div className="text-xs font-semibold text-emerald-700 mt-1">KES {canCost.toLocaleString()}</div>
                      </div>
                      <div className="bg-emerald-800 text-white p-3 rounded-lg">
                        <div className="text-lg font-bold">KES {totalFertilizerCost.toLocaleString()}</div>
                        <div className="text-xs text-emerald-200">Total Fertilizer Investment</div>
                        <div className="text-xs text-emerald-100 mt-1">{dapBags + canBags} bags total</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 7 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Acreage</label>
                  <input
                    type="number"
                    value={c7Acreage}
                    onChange={e => setC7Acreage(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Target Application (Tons/Acre)</label>
                  <input
                    type="number"
                    value={c7RateTonsPerAcre}
                    onChange={e => setC7RateTonsPerAcre(Math.max(1, parseFloat(e.target.value) || 5))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const totalTons = c7Acreage * c7RateTonsPerAcre;
                const pickups = Math.ceil(totalTons / 1.5); // 1.5-ton Isuzu pickup
                const canterLoads = Math.ceil(totalTons / 4.0); // 4-ton canter

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Total Manure Needed</div>
                    <div className="text-2xl font-bold text-emerald-900">{totalTons.toFixed(1)} Tonnes</div>
                    <div className="text-xs text-stone-700">
                      Transport logistics equivalent: ~{pickups} pickups (1.5-ton) or ~{canterLoads} Canter truckloads (4-ton).
                      Provides ~{Math.round(totalTons * 12)} kg of organic Nitrogen and {Math.round(totalTons * 8)} kg of Phosphorus gradually over 2 seasons.
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 8 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cultivated Area (m²)</label>
                  <input
                    type="number"
                    value={c8AreaM2}
                    onChange={e => setC8AreaM2(Math.max(10, parseFloat(e.target.value) || 1000))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <span className="text-[10px] text-stone-700">1 Acre = 4,047 m²</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Daily ETc Crop Demand (mm/day)</label>
                  <input
                    type="number"
                    value={c8DailyEtMm}
                    onChange={e => setC8DailyEtMm(Math.max(1, parseFloat(e.target.value) || 5))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <span className="text-[10px] text-stone-700">Warm sunny Kenya: 4-6 mm</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Irrigation Efficiency %</label>
                  <input
                    type="number"
                    value={c8EfficiencyPct}
                    onChange={e => setC8EfficiencyPct(Math.min(100, Math.max(50, parseFloat(e.target.value) || 90)))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <span className="text-[10px] text-stone-700">Drip = 90%, Sprinkler = 70%</span>
                </div>
              </div>

              {(() => {
                // 1 mm water over 1 m² = 1 liter
                const netDailyLiters = c8AreaM2 * c8DailyEtMm;
                const grossDailyLiters = netDailyLiters / (c8EfficiencyPct / 100);
                const grossDailyM3 = grossDailyLiters / 1000;
                const monthlyM3 = grossDailyM3 * 30;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Water Pumping Requirements</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-xl font-bold text-emerald-900">{Math.round(grossDailyLiters).toLocaleString()} L</div>
                        <div className="text-xs text-stone-700">Gross Water Daily</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-xl font-bold text-emerald-900">{grossDailyM3.toFixed(1)} m³</div>
                        <div className="text-xs text-stone-700">Daily Cubic Metres</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-xl font-bold text-emerald-900">{Math.round(monthlyM3).toLocaleString()} m³</div>
                        <div className="text-xs text-stone-700">30-Day Monthly Reserve</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 9 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Stand Plant Population</label>
                  <input
                    type="number"
                    value={c9PlantCount}
                    onChange={e => setC9PlantCount(Math.max(100, parseFloat(e.target.value) || 1000))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Marketable Cobs/Fruits per Plant</label>
                  <input
                    type="number"
                    value={c9CobsPerPlant}
                    onChange={e => setC9CobsPerPlant(Math.max(0.5, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Avg Grain/Fruit Weight (Grams)</label>
                  <input
                    type="number"
                    value={c9GrainPerCobGrams}
                    onChange={e => setC9GrainPerCobGrams(Math.max(10, parseFloat(e.target.value) || 140))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const totalGrams = c9PlantCount * c9CobsPerPlant * c9GrainPerCobGrams;
                const totalKg = totalGrams / 1000;
                const bags90kg = totalKg / 90;
                const tonnes = totalKg / 1000;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Estimated Biological Yield</div>
                    <div className="text-2xl font-bold text-emerald-900">
                      {bags90kg.toFixed(1)} Bags (90kg) ≈ {tonnes.toFixed(2)} Tonnes
                    </div>
                    <div className="text-xs text-stone-700">
                      Total dry weight: {Math.round(totalKg).toLocaleString()} kg. Note: Actual field recovery may vary by 5-10% depending on harvesting efficiency and sheller settings.
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 10 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Total Harvest Weight (Kilograms)</label>
                <input
                  type="number"
                  value={c10GrossWeightKg}
                  onChange={e => setC10GrossWeightKg(Math.max(1, parseFloat(e.target.value) || 100))}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Standard Packaging Equivalents</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="text-lg font-bold text-emerald-900">{(c10GrossWeightKg / 90).toFixed(1)}</div>
                    <div className="text-xs text-stone-700">90kg Bags (Maize/Beans)</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="text-lg font-bold text-emerald-900">{(c10GrossWeightKg / 50).toFixed(1)}</div>
                    <div className="text-xs text-stone-700">50kg Bags (Potatoes/Fert)</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="text-lg font-bold text-emerald-900">{(c10GrossWeightKg / 64).toFixed(1)}</div>
                    <div className="text-xs text-stone-700">64kg Wooden Crates (Tomato)</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="text-lg font-bold text-emerald-900">{(c10GrossWeightKg / 1000).toFixed(2)}</div>
                    <div className="text-xs text-stone-700">Metric Tonnes (MT)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCalcId === 11 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Land Preparation (KES)</label>
                  <input
                    type="number"
                    value={c11LandPrep}
                    onChange={e => setC11LandPrep(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Certified Seeds (KES)</label>
                  <input
                    type="number"
                    value={c11Seeds}
                    onChange={e => setC11Seeds(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Fertilizers & Manure (KES)</label>
                  <input
                    type="number"
                    value={c11Fertilizers}
                    onChange={e => setC11Fertilizers(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Chemicals & Weeding Labor (KES)</label>
                  <input
                    type="number"
                    value={c11LaborChemicals}
                    onChange={e => setC11LaborChemicals(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Harvesting, Bags & Transport (KES)</label>
                  <input
                    type="number"
                    value={c11HarvestPost}
                    onChange={e => setC11HarvestPost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const totalCost = c11LandPrep + c11Seeds + c11Fertilizers + c11LaborChemicals + c11HarvestPost;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Total Production Cost</div>
                    <div className="text-3xl font-bold text-emerald-900">KES {totalCost.toLocaleString()}</div>
                    <div className="text-xs text-stone-700">
                      Fertilizer represents {((c11Fertilizers / totalCost) * 100).toFixed(1)}% of total cost budget.
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 12 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Quantity Sold (Bags / Crates / Litres)</label>
                  <input
                    type="number"
                    value={c12UnitsSold}
                    onChange={e => setC12UnitsSold(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Selling Price per Unit (KES)</label>
                  <input
                    type="number"
                    value={c12PricePerUnit}
                    onChange={e => setC12PricePerUnit(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Gross Sales Revenue</div>
                <div className="text-3xl font-bold text-emerald-900">
                  KES {(c12UnitsSold * c12PricePerUnit).toLocaleString()}
                </div>
                <div className="text-xs text-stone-700">Formula: Quantity Sold × Market Selling Price</div>
              </div>
            </div>
          )}

          {selectedCalcId === 13 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Total Gross Revenue (KES)</label>
                  <input
                    type="number"
                    value={c13Revenue}
                    onChange={e => setC13Revenue(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Total Production Expenses (KES)</label>
                  <input
                    type="number"
                    value={c13Expenses}
                    onChange={e => setC13Expenses(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const profit = c13Revenue - c13Expenses;
                const margin = c13Revenue > 0 ? (profit / c13Revenue) * 100 : 0;
                const isProfitable = profit >= 0;

                return (
                  <div className={`rounded-xl p-5 border space-y-2 ${isProfitable ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-700">Net Profit / Margin</div>
                    <div className={`text-3xl font-bold ${isProfitable ? 'text-emerald-900' : 'text-red-900'}`}>
                      KES {profit.toLocaleString()}
                    </div>
                    <div className="text-xs text-stone-700">
                      Profit Margin: {margin.toFixed(1)}% | Return on Investment (ROI): {c13Expenses > 0 ? ((profit / c13Expenses) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 14 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Total Enterprise Cost (KES)</label>
                  <input
                    type="number"
                    value={c14TotalCost}
                    onChange={e => setC14TotalCost(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Expected Marketable Harvest (Bags / Units)</label>
                  <input
                    type="number"
                    value={c14ExpectedBags}
                    onChange={e => setC14ExpectedBags(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const breakEvenPrice = c14TotalCost / c14ExpectedBags;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Minimum Break-Even Price</div>
                    <div className="text-3xl font-bold text-emerald-900">KES {Math.ceil(breakEvenPrice).toLocaleString()} per unit</div>
                    <div className="text-xs text-stone-700">
                      You must sell at or above this price to avoid financial loss. Any sale price above KES {Math.ceil(breakEvenPrice).toLocaleString()} represents pure profit.
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 15 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Acreage</label>
                  <input
                    type="number"
                    value={c15Acres}
                    onChange={e => setC15Acres(Math.max(0.5, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cost/Acre (KES)</label>
                  <input
                    type="number"
                    value={c15CostPerAcre}
                    onChange={e => setC15CostPerAcre(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Yield/Acre (Bags)</label>
                  <input
                    type="number"
                    value={c15YieldPerAcre}
                    onChange={e => setC15YieldPerAcre(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price/Bag (KES)</label>
                  <input
                    type="number"
                    value={c15PricePerUnit}
                    onChange={e => setC15PricePerUnit(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const totalOutlay = c15Acres * c15CostPerAcre;
                const totalBags = c15Acres * c15YieldPerAcre;
                const totalRevenue = totalBags * c15PricePerUnit;
                const netIncome = totalRevenue - totalOutlay;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Seasonal Enterprise Budget Summary</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-red-700">KES {totalOutlay.toLocaleString()}</div>
                        <div className="text-xs text-stone-700">Total Investment Outlay</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-800">KES {totalRevenue.toLocaleString()}</div>
                        <div className="text-xs text-stone-700">Gross Harvest Sales ({totalBags} bags)</div>
                      </div>
                      <div className="bg-emerald-900 text-white p-3 rounded-lg">
                        <div className="text-lg font-bold">KES {netIncome.toLocaleString()}</div>
                        <div className="text-xs text-emerald-200">Net Farm Income</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 16 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cow Body Weight (kg)</label>
                  <input
                    type="number"
                    value={c16CowWeightKg}
                    onChange={e => setC16CowWeightKg(Math.max(100, parseFloat(e.target.value) || 450))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <span className="text-[10px] text-stone-700">Ayrshire ~450kg, Friesian ~550kg, Jersey ~380kg</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Daily Milk Yield (Litres)</label>
                  <input
                    type="number"
                    value={c16DailyMilkLiters}
                    onChange={e => setC16DailyMilkLiters(Math.max(0, parseFloat(e.target.value) || 15))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                // Maintenance DM: 2.5% of body weight + 0.5kg DM per 1L milk
                const dmMaintenance = c16CowWeightKg * 0.025;
                const dmMilk = c16DailyMilkLiters * 0.35;
                const totalDryMatterKg = dmMaintenance + dmMilk;
                // Fresh silage/Napier has ~25% DM -> fresh weight = DM / 0.25
                const freshFodderKg = totalDryMatterKg * 3.5;
                const dairyMealKg = Math.max(0, (c16DailyMilkLiters - 5) / 2.0);

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Daily Feed Ration Breakdown</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">{totalDryMatterKg.toFixed(1)} kg</div>
                        <div className="text-xs text-stone-700">Total Dry Matter (DM) Needed</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">{freshFodderKg.toFixed(1)} kg</div>
                        <div className="text-xs text-stone-700">Chopped Fresh Fodder/Silage</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">{dairyMealKg.toFixed(1)} kg</div>
                        <div className="text-xs text-stone-700">Commercial Dairy Meal (16% CP)</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 17 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Active Flock Size (Hens)</label>
                  <input
                    type="number"
                    value={c17BirdsCount}
                    onChange={e => setC17BirdsCount(Math.max(10, parseFloat(e.target.value) || 100))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Lay Rate % (Hen-Day)</label>
                  <input
                    type="number"
                    value={c17LayRatePct}
                    onChange={e => setC17LayRatePct(Math.min(100, Math.max(10, parseFloat(e.target.value) || 80)))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price per Tray (KES)</label>
                  <input
                    type="number"
                    value={c17PricePerTray}
                    onChange={e => setC17PricePerTray(Math.max(100, parseFloat(e.target.value) || 400))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const eggsPerDay = Math.round(c17BirdsCount * (c17LayRatePct / 100));
                const traysPerDay = eggsPerDay / 30;
                const dailyRevenue = traysPerDay * c17PricePerTray;
                const monthlyRevenue = dailyRevenue * 30;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Flock Egg Productivity</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">{eggsPerDay}</div>
                        <div className="text-xs text-stone-700">Eggs Collected Daily</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">{traysPerDay.toFixed(1)}</div>
                        <div className="text-xs text-stone-700">Trays (30 eggs/tray)</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">KES {Math.round(dailyRevenue).toLocaleString()}</div>
                        <div className="text-xs text-stone-700">Daily Revenue</div>
                      </div>
                      <div className="bg-emerald-800 text-white p-3 rounded-lg">
                        <div className="text-lg font-bold">KES {Math.round(monthlyRevenue).toLocaleString()}</div>
                        <div className="text-xs text-emerald-200">Monthly Revenue (30 days)</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 18 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Cows in Milking</label>
                  <input
                    type="number"
                    value={c18CowsMilking}
                    onChange={e => setC18CowsMilking(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Avg Litres/Cow/Day</label>
                  <input
                    type="number"
                    value={c18AvgLitersPerCow}
                    onChange={e => setC18AvgLitersPerCow(Math.max(1, parseFloat(e.target.value) || 15))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price per Litre (KES)</label>
                  <input
                    type="number"
                    value={c18PricePerLiter}
                    onChange={e => setC18PricePerLiter(Math.max(20, parseFloat(e.target.value) || 50))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const dailyLiters = c18CowsMilking * c18AvgLitersPerCow;
                const dailyKES = dailyLiters * c18PricePerLiter;
                const monthlyKES = dailyKES * 30;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Dairy Herd Cash Flow</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-xl font-bold text-emerald-900">{dailyLiters} Litres</div>
                        <div className="text-xs text-stone-700">Total Herd Daily Output</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-xl font-bold text-emerald-900">KES {dailyKES.toLocaleString()}</div>
                        <div className="text-xs text-stone-700">Daily Milk Inflow</div>
                      </div>
                      <div className="bg-emerald-800 text-white p-3 rounded-lg">
                        <div className="text-xl font-bold">KES {monthlyKES.toLocaleString()}</div>
                        <div className="text-xs text-emerald-200">Monthly Gross Turnover</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 19 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Daily Herd Milk (Litres)</label>
                  <input
                    type="number"
                    value={c19MilkDailyLiters}
                    onChange={e => setC19MilkDailyLiters(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Milk Price per Litre (KES)</label>
                  <input
                    type="number"
                    value={c19MilkPriceKES}
                    onChange={e => setC19MilkPriceKES(Math.max(10, parseFloat(e.target.value) || 50))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Daily Dairy Meal Concentrate (kg)</label>
                  <input
                    type="number"
                    value={c19DairyMealKg}
                    onChange={e => setC19DairyMealKg(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Concentrate Price/kg (KES)</label>
                  <input
                    type="number"
                    value={c19MealCostPerKg}
                    onChange={e => setC19MealCostPerKg(Math.max(10, parseFloat(e.target.value) || 65))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const milkIncomeDaily = c19MilkDailyLiters * c19MilkPriceKES;
                const feedExpenseDaily = c19DairyMealKg * c19MealCostPerKg;
                const marginDaily = milkIncomeDaily - feedExpenseDaily;
                const feedCostPct = milkIncomeDaily > 0 ? (feedExpenseDaily / milkIncomeDaily) * 100 : 0;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Income Over Feed Cost (IOFC)</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">KES {feedExpenseDaily.toLocaleString()}</div>
                        <div className="text-xs text-stone-700">Daily Feed Outlay</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">KES {marginDaily.toLocaleString()}</div>
                        <div className="text-xs text-stone-700">Daily Margin After Feed</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">{feedCostPct.toFixed(1)}%</div>
                        <div className="text-xs text-stone-700">Feed Cost Ratio (Target &lt; 40%)</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 20 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Greenhouse Setup Kit Cost (KES)</label>
                  <input
                    type="number"
                    value={c20KitCost}
                    onChange={e => setC20KitCost(Math.max(10000, parseFloat(e.target.value) || 250000))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Expected Seasonal Revenue (KES)</label>
                  <input
                    type="number"
                    value={c20SeasonalTurnover}
                    onChange={e => setC20SeasonalTurnover(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Seasonal Operating Inputs (KES)</label>
                  <input
                    type="number"
                    value={c20SeasonalOperating}
                    onChange={e => setC20SeasonalOperating(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const netSeasonalCash = c20SeasonalTurnover - c20SeasonalOperating;
                const seasonsToPayback = netSeasonalCash > 0 ? (c20KitCost / netSeasonalCash).toFixed(1) : 'N/A';

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Payback Period</div>
                    <div className="text-2xl font-bold text-emerald-900">
                      {seasonsToPayback} Crop Seasons (~{parseFloat(seasonsToPayback) ? (parseFloat(seasonsToPayback) * 6).toFixed(0) : '—'} Months)
                    </div>
                    <div className="text-xs text-stone-700">
                      Seasonal Net Operating Cashflow: KES {netSeasonalCash.toLocaleString()} per 6-month tomato or capsicum cycle.
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 21 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Loan Principal (KES)</label>
                  <input
                    type="number"
                    value={c21LoanPrincipal}
                    onChange={e => setC21LoanPrincipal(Math.max(1000, parseFloat(e.target.value) || 50000))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    value={c21AnnualInterest}
                    onChange={e => setC21AnnualInterest(Math.max(1, parseFloat(e.target.value) || 12))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Tenure (Months)</label>
                  <input
                    type="number"
                    value={c21TenureMonths}
                    onChange={e => setC21TenureMonths(Math.max(1, parseFloat(e.target.value) || 12))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const monthlyRate = c21AnnualInterest / 100 / 12;
                const monthlyPayment = (c21LoanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, c21TenureMonths)) /
                  (Math.pow(1 + monthlyRate, c21TenureMonths) - 1);
                const totalRepaid = monthlyPayment * c21TenureMonths;
                const totalInterest = totalRepaid - c21LoanPrincipal;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Loan Amortization Summary</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-emerald-900">KES {Math.round(monthlyPayment).toLocaleString()}</div>
                        <div className="text-xs text-stone-700">Monthly Installment</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-lg font-bold text-red-700">KES {Math.round(totalInterest).toLocaleString()}</div>
                        <div className="text-xs text-stone-700">Total Interest Incurred</div>
                      </div>
                      <div className="bg-emerald-800 text-white p-3 rounded-lg">
                        <div className="text-lg font-bold">KES {Math.round(totalRepaid).toLocaleString()}</div>
                        <div className="text-xs text-emerald-200">Total Amount Repaid</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 22 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Transit Distance (km)</label>
                  <input
                    type="number"
                    value={c22DistanceKm}
                    onChange={e => setC22DistanceKm(Math.max(1, parseFloat(e.target.value) || 10))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Number of Bags / Crates</label>
                  <input
                    type="number"
                    value={c22BagsCount}
                    onChange={e => setC22BagsCount(Math.max(1, parseFloat(e.target.value) || 10))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Rate per Bag/km (KES)</label>
                  <input
                    type="number"
                    value={c22RatePerBagKm}
                    onChange={e => setC22RatePerBagKm(Math.max(0.5, parseFloat(e.target.value) || 4))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const totalFreightKES = c22DistanceKm * c22BagsCount * c22RatePerBagKm;
                const costPerBag = totalFreightKES / c22BagsCount;

                return (
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Total Trucking Freight Cost</div>
                    <div className="text-3xl font-bold text-emerald-900">KES {Math.round(totalFreightKES).toLocaleString()}</div>
                    <div className="text-xs text-stone-700">Equivalent to KES {Math.round(costPerBag)} freight fee per bag transported.</div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 23 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Bags Stored</label>
                  <input
                    type="number"
                    value={c23BagsStored}
                    onChange={e => setC23BagsStored(Math.max(1, parseFloat(e.target.value) || 10))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Value per Bag (KES)</label>
                  <input
                    type="number"
                    value={c23BagValueKES}
                    onChange={e => setC23BagValueKES(Math.max(100, parseFloat(e.target.value) || 3000))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Post-Harvest Loss %</label>
                  <input
                    type="number"
                    value={c23LossRatePct}
                    onChange={e => setC23LossRatePct(Math.min(100, Math.max(0, parseFloat(e.target.value) || 10)))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const bagsLost = c23BagsStored * (c23LossRatePct / 100);
                const valueLostKES = bagsLost * c23BagValueKES;

                return (
                  <div className="bg-red-50 rounded-xl p-5 border border-red-200 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-red-900">Quantified Post-Harvest Loss</div>
                    <div className="text-3xl font-bold text-red-900">KES {Math.round(valueLostKES).toLocaleString()}</div>
                    <div className="text-xs text-stone-700">
                      Loss represents {bagsLost.toFixed(1)} destroyed bags. Switching to hermetic PICS bags (KES 300 each) costs only KES {(c23BagsStored * 300).toLocaleString()}, saving you KES {(valueLostKES - c23BagsStored * 300).toLocaleString()} net!
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 24 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Initial Stock in Store (Bags)</label>
                  <input
                    type="number"
                    value={c24InitialBags}
                    onChange={e => setC24InitialBags(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Bags Dispatched / Used (Bags)</label>
                  <input
                    type="number"
                    value={c24UsedBags}
                    onChange={e => setC24UsedBags(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {(() => {
                const remaining = c24InitialBags - c24UsedBags;
                const isLow = remaining < 10;

                return (
                  <div className={`rounded-xl p-5 border space-y-2 ${isLow ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-700">Current Stock Balance</div>
                    <div className={`text-3xl font-bold ${isLow ? 'text-amber-900' : 'text-emerald-900'}`}>
                      {remaining} Bags Remaining
                    </div>
                    <div className="text-xs text-stone-700">
                      {isLow ? 'Warning: Stock balance is low. Consider placing order with certified supplier.' : 'Inventory status optimal.'}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {selectedCalcId === 25 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Current Year 1 Crop Enterprise</label>
                <select
                  value={c25Year1Crop}
                  onChange={e => setC25Year1Crop(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                >
                  <option value="Maize (Heavy Feeder)">Maize (Heavy Feeder)</option>
                  <option value="Tomatoes (Solanaceous)">Tomatoes (Solanaceous Heavy Feeder)</option>
                  <option value="Potatoes (Root/Tuber)">Potatoes (Root/Tuber)</option>
                  <option value="Common Beans (Legume)">Common Beans (Nitrogen Fixer)</option>
                </select>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Recommended 4-Season Sustainable Rotation</div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="text-xs text-emerald-700 font-bold">Season 1 (Current)</div>
                    <div className="text-sm font-semibold text-stone-900 mt-1">{c25Year1Crop}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="text-xs text-emerald-700 font-bold">Season 2</div>
                    <div className="text-sm font-semibold text-stone-900 mt-1">Legumes (Beans/Cowpeas)</div>
                    <div className="text-[10px] text-stone-700 mt-0.5">Fixes biological nitrogen</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="text-xs text-emerald-700 font-bold">Season 3</div>
                    <div className="text-sm font-semibold text-stone-900 mt-1">Light Feeders (Onions / Carrots)</div>
                    <div className="text-[10px] text-stone-700 mt-0.5">Breaks stem borers</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="text-xs text-emerald-700 font-bold">Season 4</div>
                    <div className="text-sm font-semibold text-stone-900 mt-1">Cover Crop / Rhodes Grass</div>
                    <div className="text-[10px] text-stone-700 mt-0.5">Restores soil crumb structure</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCalcId === 26 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Target County</label>
                  <select
                    value={c26County}
                    onChange={e => setC26County(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="Trans Nzoia">Trans Nzoia</option>
                    <option value="Uasin Gishu">Uasin Gishu</option>
                    <option value="Nakuru">Nakuru</option>
                    <option value="Kiambu">Kiambu</option>
                    <option value="Kirinyaga">Kirinyaga</option>
                    <option value="Machakos">Machakos</option>
                    <option value="Kilifi">Kilifi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Crop</label>
                  <select
                    value={c26Crop}
                    onChange={e => setC26Crop(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="Maize">Hybrid Maize</option>
                    <option value="Tomatoes">Tomatoes</option>
                    <option value="Beans">Common Beans</option>
                    <option value="Potatoes">Irish Potatoes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Rainfall Season</label>
                  <select
                    value={c26Season}
                    onChange={e => setC26Season(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="Long Rains">Long Rains (March - August)</option>
                    <option value="Short Rains">Short Rains (October - January)</option>
                  </select>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">Operational Planting Timetable for {c26County} ({c26Crop})</div>
                <div className="space-y-2 text-xs text-stone-800">
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-200">
                    <span className="font-bold text-emerald-800 shrink-0">Weeks 1-2:</span>
                    <span>Deep plowing, harrowing, and dry seedbed preparation before rainfall onset. Sourcing verified certified seed.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-200">
                    <span className="font-bold text-emerald-800 shrink-0">Weeks 3-4:</span>
                    <span>Planting at onset of rains. Applying basal DAP/NPK 5cm from seed. Ensuring proper seed depth (3-5cm).</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-200">
                    <span className="font-bold text-emerald-800 shrink-0">Weeks 6-8:</span>
                    <span>First weeding, thinning, pest scouting for Fall Armyworm / Cutworms, and top-dressing with CAN when moist.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-emerald-200">
                    <span className="font-bold text-emerald-800 shrink-0">Weeks 16+:</span>
                    <span>Field drying, checking 13.5% safe storage moisture, shelling, and bagging into hermetic PICS containers.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Calculator Explanation & Disclaimers */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex items-start gap-3 text-xs text-stone-700">
            <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Agronomic Guidance Note:</strong> These calculators utilize established formulas from the Kenya Agricultural and Livestock Research Organization (KALRO) and standard East African bagging standards. Field results vary based on soil test parameters, localized weather anomalies, and certified seed purity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
