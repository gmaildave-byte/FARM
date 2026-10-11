export interface SoilTypeGuide {
  id: string;
  name: string;
  swahiliName: string;
  characteristics: string;
  drainageRate: string;
  organicMatterContent: string;
  dominantCounties: string[];
  bestCrops: string[];
  managementTips: string[];
}

export const soilTypesData: SoilTypeGuide[] = [
  {
    id: 'red-volcanic-loam',
    name: 'Red Volcanic Loam (Nitisols / Andosols)',
    swahiliName: 'Udongo Mwekundu wa Volkano',
    characteristics: 'Deep, crumbly, permeable, well-structured soil with moderate to high fertility. Naturally formed from volcanic rocks in the highlands.',
    drainageRate: 'Good to Excellent (rarely waterlogs)',
    organicMatterContent: 'Moderate to High (3.0 – 5.5%)',
    dominantCounties: ['Kiambu', 'Nyeri', 'Murang\'a', 'Meru', 'Embu', 'Nakuru'],
    bestCrops: ['Tea', 'Coffee', 'Hass Avocado', 'Irish Potatoes', 'Maize', 'Vegetables'],
    managementTips: [
      'Often moderately acidic (pH 4.8 – 5.8) due to high rainfall leaching bases. Apply agricultural lime (1–2 tonnes/acre) based on soil test.',
      'Fixes phosphorus strongly; use phosphate fertilizers (DAP/TSP) placed in bands rather than broadcast.',
      'Incorporate organic manure annually to sustain moisture retention.'
    ]
  },
  {
    id: 'black-cotton-soil',
    name: 'Black Cotton Soil (Vertisols)',
    swahiliName: 'Udongo Mweusi wa Mfinyanzi (Vertisols)',
    characteristics: 'Heavy clay soil with high shrink-swell capacity. Expands and becomes sticky/waterlogged when wet, and develops deep open cracks when dry.',
    drainageRate: 'Poor to Very Poor (prone to seasonal waterlogging)',
    organicMatterContent: 'Moderate, high cation exchange capacity (rich in calcium and magnesium)',
    dominantCounties: ['Kajiado', 'Machakos', 'Athi River', 'Kano Plains (Kisumu)', 'Narok', 'Busia'],
    bestCrops: ['Rice (under irrigation)', 'Cotton', 'Sugarcane', 'Chickpeas', 'Sorghum', 'Sunflower'],
    managementTips: [
      'Construct broad beds and furrows (BBF) or raised ridges to avoid root suffocation during rains.',
      'Timing of tillage is critical; plow only when soil is at the "friable moisture sweet spot", not soaked wet or bone dry.',
      'Incorporate gypsum (calcium sulfate) or massive compost to loosen compacted clay structure.'
    ]
  },
  {
    id: 'sandy-loam',
    name: 'Sandy Loam & Alluvial Soils (Arenosols / Fluvisols)',
    swahiliName: 'Udongo wa Mchanga na Tifutifu',
    characteristics: 'Coarse texture, light, easy to cultivate, rapid infiltration but poor moisture holding capacity and fast nutrient leaching.',
    drainageRate: 'Excessive / Very Rapid',
    organicMatterContent: 'Low (< 1.5%)',
    dominantCounties: ['Kitui', 'Makueni', 'Kilifi', 'Kwale', 'Garissa', 'Turkana'],
    bestCrops: ['Watermelons', 'Cowpeas', 'Green grams (Ndengu)', 'Cassava', 'Pigeon peas', 'Mangoes'],
    managementTips: [
      'Apply fertilizer in multiple split doses rather than single heavy applications to prevent leaching losses.',
      'Heavy mulching with grass or crop residues reduces surface evaporation by up to 60%.',
      'Integrate Zai pits or half-moon contour bunds to capture seasonal runoff.'
    ]
  }
];

export const soilTestingLabs = [
  {
    name: 'KALRO National Agricultural Research Laboratories (NARL)',
    location: 'Waiyaki Way, Nairobi',
    contact: '+254 722 206 986 / narl@kalro.org',
    services: 'Complete pH, EC, N-P-K, Micronutrients, Soil Texture, Heavy Metals',
    standardPriceKES: 1500,
  },
  {
    name: 'Crop Nutrition Laboratory Services (Cropnuts)',
    location: 'Limuru Road, Nairobi & Regional Drop Centers (Eldoret, Nanyuki)',
    contact: '+254 711 094 444 / support@cropnuts.com',
    services: 'Precision Ag Soil Health, Nematode Assays, Plant Leaf Tissue, Water Quality',
    standardPriceKES: 2500,
  },
  {
    name: 'MEA Fertilizers & Testing Service',
    location: 'Nakuru Town / Eldoret',
    contact: '+254 722 205 338',
    services: 'Soil pH, Lime Requirement, NPK Recommendations',
    standardPriceKES: 1800,
  }
];

export const irrigationMethods = [
  {
    id: 'drip',
    name: 'Drip Irrigation',
    swahiliName: 'Umwagiliaji wa Matone',
    efficiencyPct: '90 – 95%',
    costPerAcreKES: '75,000 – 120,000',
    waterSaving: 'Saves 50-70% water compared to furrow or sprinkler.',
    idealCrops: ['Tomatoes', 'Capsicum', 'Onions', 'Hass Avocado', 'Watermelons', 'Greenhouses'],
    pros: 'Direct water to root zone, minimal weed growth between rows, compatible with fertigation, operates under low gravity pressure.',
    cons: 'Higher initial kit investment, risk of emitter clogging from dirty water (requires mesh/disc filters).'
  },
  {
    id: 'overhead-sprinkler',
    name: 'Overhead Sprinkler & Rain Guns',
    swahiliName: 'Umwagiliaji wa Manyunyu',
    efficiencyPct: '65 – 75%',
    costPerAcreKES: '45,000 – 80,000',
    waterSaving: 'Moderate; higher evaporation loss under wind and sun.',
    idealCrops: ['Cabbage', 'Carrots', 'Pasture/Fodder grass (Rhodes, Brachiaria)', 'Potatoes'],
    pros: 'Covers large areas quickly, cools foliage during extreme heat waves.',
    cons: 'Wet foliage promotes fungal spores (Late Blight in tomatoes), wind drift distorts water uniformity.'
  },
  {
    id: 'farm-pond-harvesting',
    name: 'Rainwater Harvesting (Pans & Lined Ponds)',
    swahiliName: 'Mabwawa ya Kuvuna Maji ya Mvua',
    efficiencyPct: '85% (with shade net covers)',
    costPerAcreKES: '90,000 – 160,000 (1,000m³ lined dam)',
    waterSaving: 'Transforms erratic storm runoff into 3-4 months of dry-season irrigation reserve.',
    idealCrops: ['Horticulture, Zero-grazing dairy fodder, Kitchen gardens'],
    pros: 'Zero reliance on erratic rivers or utility bills, reliable dry-season bridging.',
    cons: 'Requires 0.8mm HDPE dam liner to prevent seepage, needs fencing for child & animal safety.'
  }
];
