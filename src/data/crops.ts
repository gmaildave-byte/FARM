import { Crop } from '../types';

export const cropsData: Crop[] = [
  {
    id: 'maize',
    name: 'Maize (Corn)',
    swahiliName: 'Mahindi',
    botanicalName: 'Zea mays L.',
    category: 'cereals',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80',
    economicImportance: 'Maize is Kenya\'s primary staple food crop, providing over 36% of daily caloric intake and cultivated by over 98% of smallholders. Nationally, over 38-44 million 90kg bags are consumed annually.',
    climaticZones: 'Grown from lowland coastal humid zones to high-altitude temperate highlands (0 to 2,400 meters above sea level).',
    altitudeRange: '0 – 2,400 m ASL depending on variety maturity group.',
    temperatureRange: '18°C – 30°C optimal for growth and pollination.',
    rainfallAnnual: '600 – 1,200 mm well-distributed throughout the 90–180 day growing cycle.',
    soilRequirements: 'Deep, well-drained fertile loams or clay loams with high organic matter. Poorly drained heavy soils lead to stunted yellowing.',
    soilPhRange: '5.5 – 7.0 (Liming recommended if pH < 5.2 to unlock phosphate).',
    varieties: [
      {
        name: 'H614D (Kenya Seed)',
        altitudeZones: 'Highland (1,500 – 2,200m) e.g., Trans Nzoia, Uasin Gishu',
        maturityDays: '160 – 190 days',
        yieldPotential: '35 – 45 bags (90kg)/acre under good agronomy',
        specialTraits: 'Excellent flint grain, good cob coverage, high milling flour recovery.'
      },
      {
        name: 'H628 / H629',
        altitudeZones: 'Highland wet zones',
        maturityDays: '160 – 180 days',
        yieldPotential: '38 – 48 bags/acre',
        specialTraits: 'Tolerant to Gray Leaf Spot (GLS) and ear rots.'
      },
      {
        name: 'SC Duma 43 (Seed Co)',
        altitudeZones: 'Medium altitude (1,200 – 1,600m) e.g., Nakuru, Machakos, Embu',
        maturityDays: '110 – 125 days',
        yieldPotential: '25 – 35 bags/acre',
        specialTraits: 'Early maturity, drought tolerant, heat resilient.'
      },
      {
        name: 'DH04 / KDV4',
        altitudeZones: 'Dryland lowland (below 1,200m) e.g., Makueni, Kitui, Kilifi',
        maturityDays: '85 – 100 days',
        yieldPotential: '14 – 22 bags/acre',
        specialTraits: 'Extreme drought escape, open pollinated or hybrid resilience.'
      }
    ],
    plantingSeasons: {
      longRains: 'Mid-March to Mid-April (onset of Long Rains)',
      shortRains: 'October to Mid-November (where short rains are reliable)'
    },
    seedRatePerAcre: '10 kg of certified hybrid seed per acre (one seed per hill).',
    spacing: {
      rowCm: 75,
      plantCm: 25,
      description: '75 cm between rows x 25 cm between plants (1 plant/hill) gives approximately 21,333 plants/acre.'
    },
    plantPopulationPerAcre: 21333,
    landPreparation: 'Deep primary plowing (20–25 cm) followed by secondary harrowing to achieve a medium-to-fine seedbed before the rains break.',
    fertilizerSchedule: [
      {
        stage: 'At Planting (Basal)',
        fertilizerType: 'DAP (18:46:0) or NPK 23:23:0',
        ratePerAcre: '50 kg (1 bag) per acre',
        notes: 'Place 5 cm away from the seed and cover with a small layer of soil to prevent direct seed burning.'
      },
      {
        stage: 'Knee-High Stage (V6, 4-6 weeks after emergence)',
        fertilizerType: 'CAN (26% N)',
        ratePerAcre: '50 – 75 kg per acre',
        notes: 'Top-dress when soil is moist, banding 10-15 cm away from the plant stem.'
      }
    ],
    waterRequirements: '500 – 800 mm total moisture. Critical peak demand occurs from tasseling through silking and grain filling.',
    weedControl: 'First weeding at 2-3 weeks after emergence; second weeding before canopy closure (knee-high). Pre-emergence herbicide like Atrazine or Lumax can be used.',
    commonPests: ['Fall Armyworm (Spodoptera frugiperda)', 'Stem Borer (Busseola fusca)', 'African Armyworm', 'Larger Grain Borer (Prostephanus truncatus) in storage'],
    commonDiseases: ['Maize Lethal Necrosis Disease (MLND)', 'Maize Streak Virus (MSV)', 'Northern Corn Leaf Blight (Exserohilum turcicum)', 'Gray Leaf Spot'],
    maturityDays: '110 – 190 days depending on elevation zone',
    harvestIndicators: 'Black layer formation at the tip of the maize kernel, husks turn dry straw-brown, grain moisture drops to 20-25% in the field.',
    yieldPerAcre: 'Highland commercial: 30–42 bags (90kg). National smallholder average: 15–22 bags.',
    postHarvestHandling: 'Shell when moisture is ~15%. Dry maize thoroughly on clean tarpaulins or mechanical dryers until grain moisture reaches exactly 13.5% or below to prevent aflatoxin contamination. Store in hermetic bags (PICS bags) or treat with registered grain dust (Actellic Super).',
    marketOpportunities: 'Direct sales to National Cereals and Produce Board (NCPB), commercial millers (Ungafarm, Pembe, Capwell), local open-air grain markets (Wakulima, Eldoret).',
    profitabilityExample: {
      costKES: 34500,
      revenueKES: 88000,
      profitKES: 53500,
      assumptions: 'Based on 28 bags/acre yield sold at KES 3,150/bag vs certified seed, fertilizer, land prep and harvesting labor.'
    },
    mistakesToAvoid: [
      'Recycling hybrid grain as seed, which reduces yield by 30-40%.',
      'Planting late after the rains start, which exposes young plants to high pest pressure.',
      'Storing grain above 14% moisture, which triggers aflatoxin and mold rots.'
    ],
    citations: [
      'KALRO Maize Production Technical Manual (2023)',
      'KEPHIS Certified Seed Varieties Catalogue Kenya',
      'Ministry of Agriculture & Livestock Development Post-Harvest Grain Standards'
    ],
    isFeatured: true
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes',
    swahiliName: 'Nyanya',
    botanicalName: 'Solanum lycopersicum L.',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80',
    economicImportance: 'High-value horticultural cash crop commanding high domestic demand in all urban centers in Kenya (Nairobi, Mombasa, Kisumu, Nakuru). Provides rapid cash turnover within 75–90 days from transplanting.',
    climaticZones: 'Warm to moderate climates; low to medium altitudes (500 – 2,000m ASL).',
    altitudeRange: '500 – 2,000 m ASL',
    temperatureRange: '20°C – 28°C daytime; night temperatures must stay above 14°C for fruit set.',
    rainfallAnnual: '600 – 1,000 mm, but drip irrigation is strongly recommended for high grade marketable yields.',
    soilRequirements: 'Rich, friable sandy-loam with high organic matter, minimum 45cm rooting depth, excellent water drainage.',
    soilPhRange: '6.0 – 6.8 (Avoid soils with history of Bacterial Wilt).',
    varieties: [
      {
        name: 'Kilele F1 (Syngenta)',
        altitudeZones: 'Open field across low to medium zones (Kirinyaga, Kajiado, Machakos)',
        maturityDays: '75 days from transplanting',
        yieldPotential: '25 – 35 tonnes/acre (400 – 550 crates of 64kg)',
        specialTraits: 'Determinate, elongated blocky fruit, TYLCV and Nematode tolerance, firm skin for distance shipping.'
      },
      {
        name: 'Anna F1 (Monsanto / Seminis)',
        altitudeZones: 'Greenhouse & protected cultivation',
        maturityDays: '75 days from transplanting',
        yieldPotential: '45 – 70 tonnes/acre over 6-9 months harvest',
        specialTraits: 'Indeterminate, deep red oval fruit, continuous harvesting, high brix sugar.'
      },
      {
        name: 'Rambo F1',
        altitudeZones: 'Open field hot humid/dry zones',
        maturityDays: '70 – 75 days',
        yieldPotential: '25 – 30 tonnes/acre',
        specialTraits: 'Excellent vigor, firm fruit, high heat tolerance.'
      }
    ],
    plantingSeasons: {
      longRains: 'Transplant in April/May; peak harvest during dry months July/August.',
      shortRains: 'Transplant October/November; peak harvest January/February (highest prices).'
    },
    seedRatePerAcre: '30 – 50 grams of hybrid seed (or 8,500 – 10,000 nursery tray seedlings) per acre.',
    spacing: {
      rowCm: 60,
      plantCm: 50,
      description: '60 cm between plants x 80-90 cm between rows for staked open field production (~8,800 plants/acre).'
    },
    plantPopulationPerAcre: 8800,
    landPreparation: 'Fine tilth bed preparation with raised beds (15–20 cm high) to avoid water pooling around roots. Incorporate 8-10 tonnes of well-rotted cattle/chicken manure.',
    fertilizerSchedule: [
      {
        stage: 'Basal Planting',
        fertilizerType: 'DAP or NPK 23:23:0',
        ratePerAcre: '50 kg/acre + 10g per planting hole mixed with soil',
        notes: 'Combine with well-decomposed manure; avoid placing fertilizer touching bare roots.'
      },
      {
        stage: '3 Weeks After Transplanting',
        fertilizerType: 'CAN (Calcium Ammonium Nitrate)',
        ratePerAcre: '50 kg/acre (10g per plant in ring band)',
        notes: 'Stimulates vegetative frame and flower cluster initiation.'
      },
      {
        stage: 'Fruit Formation & Sizing',
        fertilizerType: 'NPK 17:17:17 or High Potassium Soluble (KNO3) + Calcium Foliar',
        ratePerAcre: '50 kg/acre side-dressed + bi-weekly foliar Cal-Boron',
        notes: 'Prevents Blossom End Rot and promotes firm fruit walls.'
      }
    ],
    waterRequirements: '400 – 600 mm; drip irrigation at 3–5 liters per plant per week depending on ambient heat.',
    weedControl: 'Manual shallow hand-weeding or black plastic mulch (recommended for moisture retention and weed prevention).',
    commonPests: ['Tuta Absoluta (Tomato leafminer)', 'Whiteflies (Bemisia tabaci - vector of TYLCV)', 'Thrips', 'Red Spider Mites', 'Root Knot Nematodes'],
    commonDiseases: ['Late Blight (Phytophthora infestans)', 'Early Blight (Alternaria solani)', 'Bacterial Wilt (Ralstonia solanacearum)', 'Tomato Yellow Leaf Curl Virus (TYLCV)'],
    maturityDays: '70 – 90 days from transplanting',
    harvestIndicators: 'Breaker to pink stage for distant markets; full red ripe for immediate local retailing.',
    yieldPerAcre: 'Open field: 20 – 35 tonnes (300 – 500 wooden crates of 64kg). Greenhouse: up to 60 tonnes.',
    postHarvestHandling: 'Sort and grade by size and color. Pack in well-ventilated plastic crates (avoid overfilling deep wooden crates to prevent crush damage). Store in shaded cool shed at 12–15°C.',
    marketOpportunities: 'Direct delivery to urban wholesale markets (Wakulima Market, Kongowea, Gikomba), supermarkets (Naivas, Quickmart), hotel chains, and local retail mama mboga.',
    profitabilityExample: {
      costKES: 145000,
      revenueKES: 450000,
      profitKES: 305000,
      assumptions: 'Calculated on 350 crates sold at an average farmgate price of KES 1,280/crate in Kirinyaga/Mwea.'
    },
    mistakesToAvoid: [
      'Planting in fields with previous Bacterial Wilt history (cannot be cured by chemicals).',
      'Failing to spray preventive fungicides before heavy rains, leading to complete Late Blight wipeout within 72 hours.',
      'Over-applying nitrogen at flowering, causing flower drop and excessive foliage.'
    ],
    citations: [
      'KALRO Horticulture Research Institute (HRI) Tomato Production Guide',
      'HCDA Horticultural Crops Development Authority Guidelines',
      'KEPHIS Safe Agrochemical Use and Pre-Harvest Interval Regulations'
    ],
    isFeatured: true
  },
  {
    id: 'common-beans',
    name: 'Common Beans',
    swahiliName: 'Maharagwe',
    botanicalName: 'Phaseolus vulgaris L.',
    category: 'legumes',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=1000&q=80',
    economicImportance: 'Kenya\'s most important dietary grain legume, supplying essential protein (22%) and micronutrients (iron & zinc) across households. Acts as a key cash crop and improves soil fertility via biological nitrogen fixation.',
    climaticZones: 'Medium to high altitude areas (1,000 – 2,200m ASL) including Central, Eastern, Rift Valley, and Western Kenya.',
    altitudeRange: '1,000 – 2,200 m ASL',
    temperatureRange: '15°C – 27°C (High temperatures >30°C cause flower drop).',
    rainfallAnnual: '400 – 800 mm well distributed.',
    soilRequirements: 'Well-drained fertile loamy soils. Extremely sensitive to waterlogging.',
    soilPhRange: '6.0 – 7.0',
    varieties: [
      {
        name: 'Nyota (KALRO)',
        altitudeZones: 'Medium to semi-arid lowlands',
        maturityDays: '65 – 70 days',
        yieldPotential: '8 – 10 bags (90kg)/acre',
        specialTraits: 'Biofortified with high iron and zinc, early maturing, drought tolerant.'
      },
      {
        name: 'Rosecoco (GLP 2)',
        altitudeZones: 'Highlands & medium altitude',
        maturityDays: '80 – 90 days',
        yieldPotential: '10 – 14 bags/acre',
        specialTraits: 'High consumer preference, mottled red-purple grain, premium market price.'
      },
      {
        name: 'Mwitemania (GLP X92)',
        altitudeZones: 'Semi-arid Eastern (Machakos, Kitui, Embu)',
        maturityDays: '70 – 75 days',
        yieldPotential: '7 – 10 bags/acre',
        specialTraits: 'Drought tolerant, resilient in erratic rainfall seasons.'
      }
    ],
    plantingSeasons: {
      longRains: 'Mid-March to April',
      shortRains: 'October to Mid-November'
    },
    seedRatePerAcre: '20 – 25 kg certified seed per acre depending on seed size.',
    spacing: {
      rowCm: 50,
      plantCm: 10,
      description: '50 cm between rows x 10 cm within rows (or 40 x 15 cm).'
    },
    plantPopulationPerAcre: 80000,
    landPreparation: 'Plow and harrow to a fine seedbed. Plant 3-5 cm deep in moist soil.',
    fertilizerSchedule: [
      {
        stage: 'At Planting',
        fertilizerType: 'DAP or Sympal / NPK 23:23:0',
        ratePerAcre: '50 kg/acre (basal)',
        notes: 'Inoculation with Rhizobium bio-fertilizer (e.g., BIOFIX) reduces need for nitrogen fertilizer.'
      }
    ],
    waterRequirements: '350 – 500 mm. Adequate soil moisture is especially critical during flowering and pod development.',
    weedControl: 'Two weedings: 1st weeding 2 weeks after emergence; 2nd weeding before flowering (avoid weeding during flowering to prevent flower drop).',
    commonPests: ['Bean Fly (Ophiomyia phaseoli)', 'Aphids (Aphis fabae)', 'Bean Thrips', 'Pod Borers', 'Bean Bruchid (Acanthoscelides obtectus) in store'],
    commonDiseases: ['Bean Anthracnose (Colletotrichum lindemuthianum)', 'Angular Leaf Spot', 'Bean Common Mosaic Virus (BCMV)', 'Rust (Uromyces appendiculatus)'],
    maturityDays: '65 – 90 days depending on variety',
    harvestIndicators: 'Pods turn dry, yellow-brown and brittle. Grains harden.',
    yieldPerAcre: '6 – 12 bags (90kg) per acre under good management.',
    postHarvestHandling: 'Thresh on clean tarpaulins to avoid stones and soil dirt. Dry to below 13% moisture. Store in hermetic PICS bags without chemical dust.',
    marketOpportunities: 'High, year-round demand in all Kenyan markets, secondary schools, institutional cafeterias, and grain processors.',
    profitabilityExample: {
      costKES: 24000,
      revenueKES: 72000,
      profitKES: 48000,
      assumptions: 'Calculated on 8 bags/acre sold at KES 9,000/bag for premium Rosecoco.'
    },
    mistakesToAvoid: [
      'Weeding during peak flowering, which causes severe flower abortion.',
      'Using uncertified market grain infected with seed-borne Halo Blight and Anthracnose.',
      'Delaying harvest in wet weather, causing pod germination in the field.'
    ],
    citations: ['KALRO Katumani Legumes Manual', 'CGIAR/CIAT Common Bean Atlas for Eastern Africa'],
    isFeatured: true
  },
  {
    id: 'irish-potatoes',
    name: 'Irish Potatoes',
    swahiliName: 'Viazi Mviringo',
    botanicalName: 'Solanum tuberosum L.',
    category: 'roots-tubers',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=80',
    economicImportance: 'Kenya\'s second most important food staple after maize. Vital source of carbohydrates and income for highland farmers in Nyandarua, Nakuru, Meru, Elgeyo Marakwet, and Narok.',
    climaticZones: 'High altitude temperate zones (1,500 – 3,000m ASL).',
    altitudeRange: '1,500 – 3,000 m ASL',
    temperatureRange: '15°C – 20°C (High soil temperatures above 25°C inhibit tuber initiation).',
    rainfallAnnual: '800 – 1,400 mm well-distributed.',
    soilRequirements: 'Deep, well-aerated, loose friable sandy loam rich in organic matter. Free of stones and waterlogging.',
    soilPhRange: '5.2 – 6.5 (Higher pH > 6.8 increases Potato Scab).',
    varieties: [
      {
        name: 'Shangi',
        altitudeZones: 'Highlands across Kenya',
        maturityDays: '80 – 90 days',
        yieldPotential: '80 – 120 bags (50kg)/acre',
        specialTraits: 'Short dormancy (sprouts quickly), highly popular with consumers and fast-food chips sellers, but susceptible to late blight.'
      },
      {
        name: 'Dutch Robjin',
        altitudeZones: 'Meru, Nyandarua, Timau',
        maturityDays: '105 – 120 days',
        yieldPotential: '100 – 140 bags/acre',
        specialTraits: 'Red skin, high dry matter, preferred for potato crisps processing.'
      },
      {
        name: 'Unica (CIP / KALRO)',
        altitudeZones: 'High to medium altitudes (tolerant to heat & drought)',
        maturityDays: '90 – 100 days',
        yieldPotential: '110 – 150 bags/acre',
        specialTraits: 'Resistant to Late Blight, tolerant to heat and viruses.'
      }
    ],
    plantingSeasons: {
      longRains: 'March to April',
      shortRains: 'September to October'
    },
    seedRatePerAcre: '16 – 20 bags (50kg) of well-sprouted certified seed tubers (size II: 35-55 mm diameter) per acre.',
    spacing: {
      rowCm: 75,
      plantCm: 30,
      description: '75 cm between ridges x 30 cm between tubers within the furrow (~17,700 plants/acre).'
    },
    plantPopulationPerAcre: 17700,
    landPreparation: 'Deep plowing to 30cm depth. Form ridges 25-30 cm high at planting or during earthing up.',
    fertilizerSchedule: [
      {
        stage: 'At Planting',
        fertilizerType: 'NPK 17:17:17 or DAP',
        ratePerAcre: '100 kg (2 bags) per acre',
        notes: 'Apply fertilizer in furrow, mix lightly with soil, place sprouted tubers with sprouts facing upward.'
      },
      {
        stage: 'Earthing Up (Hilling) at 20-25 cm height',
        fertilizerType: 'CAN',
        ratePerAcre: '50 kg per acre',
        notes: 'Earth up soil around plant stems to promote stolon tuberization and prevent greening of tubers.'
      }
    ],
    waterRequirements: '500 – 700 mm. Dry periods during tuber bulking drastically reduce tuber size.',
    weedControl: 'Weeding is usually done simultaneously with earthing up at 3-4 weeks after emergence.',
    commonPests: ['Potato Tuber Moth (Phthorimaea operculella)', 'Aphids (Myzus persicae - virus vectors)', 'Cutworms', 'Root Knot Nematodes'],
    commonDiseases: ['Late Blight (Phytophthora infestans)', 'Bacterial Wilt (Ralstonia solanacearum)', 'Blackleg (Pectobacterium)', 'Common Scab (Streptomyces scabies)'],
    maturityDays: '80 – 120 days depending on variety',
    harvestIndicators: 'Vines turn yellow and naturally senesce/dry up. De-haulm (cut foliage) 10-14 days before harvest to allow tuber skins to harden (curing).',
    yieldPerAcre: '80 – 160 bags (50kg) per acre under good management.',
    postHarvestHandling: 'Harvest in dry weather with forks to avoid tuber wounds. Cure in a shaded, well-ventilated diffuse-light store for 7-10 days. Never store in direct sunlight (prevents toxic solanine greening).',
    marketOpportunities: 'Direct delivery to Nairobi Wakulima, Marikiti, fast-food chips outlets, crisps factories (Tropical Heat, Norda Industries).',
    profitabilityExample: {
      costKES: 78000,
      revenueKES: 220000,
      profitKES: 142000,
      assumptions: 'Calculated on 100 bags (50kg) sold at KES 2,200/bag vs certified seed tubers, fertilizer, ridges and harvesting.'
    },
    mistakesToAvoid: [
      'Using uncertified ware potatoes as seed, perpetuating Bacterial Wilt in soils for over 10 years.',
      'Failing to de-haulm and cure skins, causing peel friction and soft rot in transit.',
      'Harvesting in wet mud, which promotes Erwinia soft rot decay.'
    ],
    citations: ['National Potato Council of Kenya (NPCK) Potato Production Handbook', 'KALRO Tigoni Potato Research Centre Technical Bulletins'],
    isFeatured: true
  },
  {
    id: 'avocado',
    name: 'Hass Avocado',
    swahiliName: 'Parachichi (Hass)',
    botanicalName: 'Persea americana Mill.',
    category: 'fruits',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1000&q=80',
    economicImportance: 'Kenya is the largest exporter of avocados in Africa and among the top 6 globally. Hass avocado represents over 75% of Kenya\'s avocado export revenue, driving millions of dollars to smallholders in Murang\'a, Kiambu, Meru, Nyeri, Kisii, and Nakuru.',
    climaticZones: 'Subtropical to highland climates (1,200 – 2,100 m ASL).',
    altitudeRange: '1,200 – 2,100 m ASL',
    temperatureRange: '16°C – 26°C optimal.',
    rainfallAnnual: '1,000 – 1,400 mm well-distributed, with supplementary drip irrigation during dry flowering spells.',
    soilRequirements: 'Deep, well-drained volcanic soils. Tree is extraordinarily intolerant of waterlogging (causes Phytophthora root rot).',
    soilPhRange: '5.5 – 6.5',
    varieties: [
      {
        name: 'Hass (Export standard)',
        altitudeZones: '1,500 – 2,100 m ASL',
        maturityDays: '6 – 8 months from flowering',
        yieldPotential: '800 – 1,500 fruits per tree at full maturity (Year 6+)',
        specialTraits: 'Pebbly dark purple-black skin when ripe, high oil content (minimum 21% dry matter for export), long shelf life.'
      },
      {
        name: 'Fuerte',
        altitudeZones: '1,200 – 1,800 m ASL',
        maturityDays: '6 – 7 months',
        yieldPotential: '700 – 1,200 fruits per mature tree',
        specialTraits: 'Smooth green pear-shaped skin; primarily domestic and processing market.'
      }
    ],
    plantingSeasons: {
      longRains: 'March – May (best tree establishment)',
      shortRains: 'October – November with irrigation backup'
    },
    seedRatePerAcre: '100 – 150 grafted certified seedlings per acre.',
    spacing: {
      rowCm: 600,
      plantCm: 500,
      description: 'Standard: 6m x 5m (133 trees/acre) or 5m x 5m high-density (160 trees/acre).'
    },
    plantPopulationPerAcre: 133,
    landPreparation: 'Dig planting holes 60cm deep x 60cm wide. Mix topsoil with 2 buckets (20kg) of well-rotted manure, 250g TSP or DAP, and 100g lime.',
    fertilizerSchedule: [
      {
        stage: 'Year 1 - Establishment',
        fertilizerType: 'CAN + Well decomposed manure',
        ratePerAcre: '150g CAN per tree every 3 months during rains + mulching',
        notes: 'Keep mulch 10 cm away from trunk to prevent fungal collars.'
      },
      {
        stage: 'Bearing Stage (Year 3 onwards)',
        fertilizerType: 'NPK 17:17:17 + High Potassium + Boron/Zinc foliar',
        ratePerAcre: '500g – 1kg NPK per tree per year split into two rain applications',
        notes: 'Critical at flowering and fruit set to prevent fruit drop.'
      }
    ],
    waterRequirements: '1,000 – 1,300 mm/year. Drip irrigation (30-50 liters per tree per week) during dry periods dramatically increases fruit caliber.',
    weedControl: 'Keep a clean weed-free tree basin (1-2m radius) under canopy. Intercropping with beans or peas during Years 1-2.',
    commonPests: ['False Codling Moth (Thaumatotibia leucotreta - critical export quarantine pest)', 'Fruit Flies (Bactrocera dorsalis)', 'Thrips', 'Scales'],
    commonDiseases: ['Phytophthora Root Rot (Phytophthora cinnamomi)', 'Anthracnose (Colletotrichum gloeosporioides)', 'Cercospora Fruit Spot'],
    maturityDays: 'Grafted seedlings bear first harvest at Year 2.5–3; full commercial yield at Year 5–6.',
    harvestIndicators: 'Minimum 21-23% dry matter content. Stalk loses brightness and turns yellow-green. Fruit picked with clippers leaving 3mm stem stalk.',
    yieldPerAcre: 'Year 4: 3-5 tonnes/acre. Year 6+: 8-15 tonnes/acre (133 trees x 800 fruits).',
    postHarvestHandling: 'Clip with shears (do not pull or drop). Transport in plastic crates to packhouse within 4 hours. Cool to 5-7°C for sea container shipment.',
    marketOpportunities: 'Direct supply to export packhouses (Kakuzi, Olivado, Keitt, Vegpro), local fresh supermarkets, and oil extraction processors.',
    profitabilityExample: {
      costKES: 95000,
      revenueKES: 650000,
      profitKES: 555000,
      assumptions: 'Based on mature 5-year-old orchard (133 trees yielding 65,000 export-grade fruits at KES 10/fruit farmgate).'
    },
    mistakesToAvoid: [
      'Harvesting immature avocados before reaching 21% dry matter, resulting in shriveled rubbery fruit that damages Kenya\'s export brand.',
      'Planting in poorly drained clay soils where Phytophthora kills trees within 2 seasons.',
      'Allowing export quarantine pests like False Codling Moth to enter without bait traps.'
    ],
    citations: ['Avocado Society of Kenya (ASOK) Quality Protocols', 'Horticultural Crops Directorate (HCD) Export Rules', 'KEPHIS Phytosanitary Export Inspection Standard'],
    isFeatured: true
  },
  {
    id: 'kale-sukuma-wiki',
    name: 'Kale (Sukuma Wiki)',
    swahiliName: 'Sukuma Wiki',
    botanicalName: 'Brassica oleracea var. acephala',
    category: 'vegetables',
    image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=1000&q=80',
    economicImportance: 'Kenya\'s most omnipresent leafy vegetable, feeding over 85% of urban and rural households daily. The name "Sukuma Wiki" translates to "push the week", reflecting its role as an affordable, continuous daily food and cash source.',
    climaticZones: 'Widespread adaptation from 800 to 2,600m ASL.',
    altitudeRange: '800 – 2,600 m ASL',
    temperatureRange: '15°C – 24°C (high heat prompts early flowering/bolting).',
    rainfallAnnual: '600 – 1,200 mm with irrigation.',
    soilRequirements: 'Fertile loams with good water holding capacity and high organic matter.',
    soilPhRange: '6.0 – 7.5',
    varieties: [
      {
        name: 'Mfalme F1 (East African Seed)',
        altitudeZones: 'Medium to high altitude',
        maturityDays: '45 days from transplanting',
        yieldPotential: '15 – 25 tonnes/acre over 6-9 months',
        specialTraits: 'Curled dark green leaves, slow to bolt, drought tolerant, multiple pluckings.'
      },
      {
        name: 'Thousand Headed (Kenya Seed)',
        altitudeZones: 'Highlands & medium altitude',
        maturityDays: '60 days',
        yieldPotential: '12 – 18 tonnes/acre',
        specialTraits: 'Branching habit, highly hardy, continuous leaf picking over long season.'
      }
    ],
    plantingSeasons: {
      longRains: 'Transplant April',
      shortRains: 'Transplant October (also grown year-round under irrigation)'
    },
    seedRatePerAcre: '150 – 200 grams of seed per acre raised in nursery beds.',
    spacing: {
      rowCm: 60,
      plantCm: 45,
      description: '60 cm between rows x 45 cm between plants (~14,800 plants/acre).'
    },
    plantPopulationPerAcre: 14800,
    landPreparation: 'Fine tilth beds with 10 tonnes of farmyard manure incorporated.',
    fertilizerSchedule: [
      {
        stage: 'At Planting',
        fertilizerType: 'DAP or NPK 23:23:0',
        ratePerAcre: '50 kg/acre (1 small spoonful per hole)',
        notes: 'Mixed well with topsoil.'
      },
      {
        stage: 'After Every 2-3 Pluckings',
        fertilizerType: 'CAN',
        ratePerAcre: '50 kg/acre top-dressed every 4 weeks',
        notes: 'Maintains lush dark green vegetative leaf growth.'
      }
    ],
    waterRequirements: '350 – 500 mm. Regular moisture is needed to prevent bitter, tough leaves.',
    weedControl: 'Keep beds clean; hoe between rows.',
    commonPests: ['Diamondback Moth (Plutella xylostella)', 'Cabbage Aphids (Brevicoryne brassicae)', 'Cutworms', 'Whiteflies'],
    commonDiseases: ['Black Rot (Xanthomonas campestris)', 'Damping off in nursery', 'Downy Mildew'],
    maturityDays: '45 – 60 days from transplanting for first harvest, then pick weekly.',
    harvestIndicators: 'Outer mature leaves picked by snapping downward close to stem, leaving top 4-5 leaves for continued growth.',
    yieldPerAcre: '15 – 25 tonnes of fresh leaves per acre over continuous harvest cycle.',
    postHarvestHandling: 'Pick in early morning or late afternoon. Tie in 1kg bundles or 50kg sacks and keep under damp burlap hessian in shade.',
    marketOpportunities: 'Continuous daily cash sales to local markets, greengrocers, school feeding programs, and food kiosks.',
    profitabilityExample: {
      costKES: 45000,
      revenueKES: 180000,
      profitKES: 135000,
      assumptions: 'Continuous harvest over 5 months selling 150 sacks (50kg) at KES 1,200/sack.'
    },
    mistakesToAvoid: [
      'Spraying organophosphate insecticides close to harvest without observing Pre-Harvest Intervals (PHIs), exposing consumers to chemical residues.',
      'Allowing cabbage aphids to infest heart of plants before treatment.'
    ],
    citations: ['KALRO Indigenous & Exotic Vegetables Production Manual', 'Ministry of Agriculture Horticultural Field Guide'],
    isFeatured: true
  },
  {
    id: 'tea',
    name: 'Tea',
    swahiliName: 'Chai',
    botanicalName: 'Camellia sinensis (L.) Kuntze',
    category: 'cash-industrial',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    economicImportance: 'Kenya is the world\'s largest exporter of black crush-tear-curl (CTC) tea, earning over KES 140 billion annually. The smallholder sector managed under the Kenya Tea Development Agency (KTDA) supports over 650,000 small-scale growers.',
    climaticZones: 'Highland humid zones along the Great Rift Valley (Kericho, Bomet, Nandi, Kiambu, Murang\'a, Nyeri, Kisii).',
    altitudeRange: '1,500 – 2,250 m ASL',
    temperatureRange: '13°C – 25°C',
    rainfallAnnual: '1,200 – 2,000 mm well-distributed.',
    soilRequirements: 'Deep, acidic volcanic soils with high organic matter and no hardpan.',
    soilPhRange: '4.5 – 5.6 (Crucial: tea will not grow on soils with pH > 5.8).',
    varieties: [
      {
        name: 'TRFK 306/1 (Purple Tea)',
        altitudeZones: 'Highlands',
        maturityDays: 'Perennial bush',
        yieldPotential: 'Specialty high-antioxidant tea commanding premium factory price',
        specialTraits: 'Rich in anthocyanins, frost resilient, drought tolerant.'
      },
      {
        name: 'TRFK 31/8 & BB35',
        altitudeZones: 'Highland KTDA zones',
        maturityDays: 'Perennial',
        yieldPotential: '3,000 – 4,500 kg green leaf/acre/year',
        specialTraits: 'High liquor quality, heavy flush, rapid rooting.'
      }
    ],
    plantingSeasons: {
      longRains: 'April – May',
      shortRains: 'October – November'
    },
    seedRatePerAcre: '3,500 – 4,000 vegetative clonal seedlings per acre.',
    spacing: {
      rowCm: 120,
      plantCm: 75,
      description: '1.2m between rows x 0.75m between bushes along contour lines.'
    },
    plantPopulationPerAcre: 3800,
    landPreparation: 'Contour terraces with pegging. Deep planting holes 45cm deep x 30cm wide.',
    fertilizerSchedule: [
      {
        stage: 'Annual Maintenance (April / May)',
        fertilizerType: 'NPK 26:5:5 (Special Tea Fertilizer)',
        ratePerAcre: '200 – 250 kg per acre (4-5 bags)',
        notes: 'Broadcast evenly beneath the bush canopy when soil is moist.'
      }
    ],
    waterRequirements: '1,200 – 1,800 mm. Severe drought causes dormancy.',
    weedControl: 'Manual cheeling/slashing or selective herbicides; avoid damaging surface roots.',
    commonPests: ['Red Crevice Mite (Brevipalpus phoenicis)', 'Tea Weevil', 'Thrips'],
    commonDiseases: ['Armillaria Root Rot (Armillaria mellea)', 'Wood Rot (Hypoxylon)'],
    maturityDays: 'Bushes mature in 3 years and remain productive for over 50 years.',
    harvestIndicators: 'Pluck "two leaves and a bud" on a 7-10 day cycle.',
    yieldPerAcre: '2,500 – 4,500 kg green leaf per acre per year under mature management.',
    postHarvestHandling: 'Keep plucked leaf in aerated woven baskets. Do not compress green leaf. Deliver to KTDA tea buying centers within 4 hours to avoid premature leaf fermentation.',
    marketOpportunities: 'Direct delivery to KTDA factory or multinational tea estates (Finlays, Unilever/Lipton).',
    profitabilityExample: {
      costKES: 45000,
      revenueKES: 195000,
      profitKES: 150000,
      assumptions: 'Calculated on 3,500 kg green leaf delivered at average KES 25/kg initial monthly pay + KES 31/kg annual factory bonus.'
    },
    mistakesToAvoid: [
      'Applying agricultural lime to tea soils; liming raises pH and kills tea bushes.',
      'Plucking coarse third and fourth leaves, which degrades factory quality score.',
      'Compacting plucked green leaf in polybags, causing leaf heating and quality rejection.'
    ],
    citations: ['Tea Research Institute (TRI) of Kenya Technical Manual', 'KTDA Smallholder Farming Field Guidelines'],
    isFeatured: true
  },
  {
    id: 'brachiaria-fodder',
    name: 'Brachiaria Fodder Grass',
    swahiliName: 'Nyasi ya Brachiaria',
    botanicalName: 'Brachiaria brizantha / Urochloa decumbens',
    category: 'fodder',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    economicImportance: 'Revolutionary climate-smart dairy fodder grass in Kenya. Superior replacement for Napier grass due to higher crude protein (12-16% vs Napier 7-9%), drought tolerance, and resistance to Napier Smut and Stunt diseases.',
    climaticZones: 'Lowland to medium-high altitudes (0 – 2,200m ASL).',
    altitudeRange: '0 – 2,200 m ASL',
    temperatureRange: '18°C – 32°C',
    rainfallAnnual: '600 – 1,200 mm (survives dry spells with deep roots).',
    soilRequirements: 'Adapts well to low-fertility acidic soils, though fertile loams produce massive biomass.',
    soilPhRange: '5.0 – 7.5',
    varieties: [
      {
        name: 'Brachiaria cv. Basilisk',
        altitudeZones: 'Medium to semi-arid',
        maturityDays: '60 – 75 days to first cut',
        yieldPotential: '18 – 25 tonnes dry matter/acre/year',
        specialTraits: 'High palatability, excellent grazing and hay making.'
      },
      {
        name: 'Brachiaria cv. Piata',
        altitudeZones: 'High-rainfall to sub-humid',
        maturityDays: '60 days',
        yieldPotential: '20 – 30 tonnes dry matter/acre/year',
        specialTraits: 'Very high crude protein, rapid regrowth after cutting.'
      }
    ],
    plantingSeasons: {
      longRains: 'March – April',
      shortRains: 'October – November'
    },
    seedRatePerAcre: '2 – 3 kg of coated seed per acre (or 10,000 root splits).',
    spacing: {
      rowCm: 50,
      plantCm: 25,
      description: '50 cm between rows x 25 cm within rows.'
    },
    plantPopulationPerAcre: 32000,
    landPreparation: 'Fine seedbed free of perennial weeds. Sow seeds shallowly (1-2 cm deep).',
    fertilizerSchedule: [
      {
        stage: 'At Planting',
        fertilizerType: 'NPK 23:23:0 or DAP',
        ratePerAcre: '50 kg/acre',
        notes: 'Promotes rapid root anchoring.'
      },
      {
        stage: 'After Every Cut (Ratoon)',
        fertilizerType: 'CAN or Slurry / Cattle Manure',
        ratePerAcre: '50 kg CAN or 5,000 litres cattle slurry',
        notes: 'Stimulates immediate dense tillering.'
      }
    ],
    waterRequirements: '450 – 1,000 mm. Highly drought-resilient once established.',
    weedControl: 'Hand weed during the first 6 weeks until sward covers ground.',
    commonPests: ['Spittlebugs (tolerant varieties available)'],
    commonDiseases: ['Rust (rare in healthy stands)'],
    maturityDays: '60 – 75 days for 1st cut, then every 4-6 weeks during rainy periods.',
    harvestIndicators: 'Cut at 10-15 cm above ground level just before flowering when crude protein is highest.',
    yieldPerAcre: '15 – 25 tonnes of dry matter per acre per year across 5-6 cuttings.',
    postHarvestHandling: 'Chop fresh for zero-grazing feed or dry for 2 days to bale high-protein hay.',
    marketOpportunities: 'Direct feeding to dairy cows (increases milk yield by 1.5–3 liters/cow/day), or baled hay sold to pastoralists and zero-grazing dairy farmers at KES 350–500 per bale.',
    profitabilityExample: {
      costKES: 28000,
      revenueKES: 120000,
      profitKES: 92000,
      assumptions: 'Based on 280 bales of Brachiaria hay harvested across year sold at KES 430/bale.'
    },
    mistakesToAvoid: [
      'Cutting flush to the soil surface, which destroys the growing crown.',
      'Allowing the grass to fully seed and turn stemmy before cutting, which cuts crude protein in half.'
    ],
    citations: ['KALRO / CIAT Climate-Smart Brachiaria Dairy Grass Evaluation Project', 'ILRI Livestock Feed Factsheets'],
    isFeatured: false
  }
];
