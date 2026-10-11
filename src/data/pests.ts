import { PestOrDisease } from '../types';

export const pestsData: PestOrDisease[] = [
  {
    id: 'fall-armyworm',
    name: 'Fall Armyworm',
    swahiliName: 'Kiwavi Jeshi Vamizi',
    scientificName: 'Spodoptera frugiperda (J.E. Smith)',
    type: 'pest',
    affectedCropsOrAnimals: ['Maize', 'Sorghum', 'Millet', 'Pasture grasses', 'Wheat'],
    symptoms: [
      'Window-pane transparent feeding patches on young maize leaves.',
      'Ragged, torn holes in whorl leaves resembling hail damage.',
      'Abundant moist yellowish-brown sawdust-like frass (droppings) accumulated in the plant whorl.',
      'Caterpillar has four dark spots arranged in a square on the 8th abdominal segment and an inverted white "Y" on head capsule.'
    ],
    conduciveConditions: 'Warm, humid weather (24–30°C); continuous maize planting cycles without crop rotation.',
    similarProblems: 'African Armyworm (Spodoptera exempta), African Bollworm (Helicoverpa armigera), Common Stem Borer (Busseola fusca).',
    prevention: [
      'Early planting at the onset of rains allows the crop to establish before peak moth flight.',
      'Intercropping maize with Desmodium and planting Napier grass on field borders (Push-Pull Technology).',
      'Regular scouting of 20 consecutive plants in 5 field locations starting 7 days after emergence.'
    ],
    culturalControl: 'Hand-picking and crushing egg masses and caterpillars on smallholdings. Placing sand mixed with wood ash or neem powder into the whorl.',
    biologicalControl: 'Encouraging natural parasitoid wasps (Trichogramma, Cotesia icipe) and applying biopesticides based on Bacillus thuringiensis (Bt) or Metarhizium rileyi fungus.',
    chemicalControl: {
      registeredActiveIngredients: 'Emamectin Benzoate 50g/kg (e.g. Escort / Prove) or Spinetoram (Radiant 120 SC) or Chlorantraniliprole (Coragen 20 SC).',
      phiDays: 14,
      reiHours: 24,
      safetyPrecautions: 'Wear complete PPE (respirator, goggles, nitrile gloves, waterproof boots). Spray early morning or late afternoon directing nozzle directly into the funnel whorl. Rotate chemical classes to prevent resistance.'
    },
    professionalAdviceTrigger: 'When more than 20% of plants in the vegetative stage show fresh whorl windowing and frass.',
    image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=1000&q=80',
    references: 'CABI / KALRO Fall Armyworm Identification and Integrated Pest Management Guide for Kenya'
  },
  {
    id: 'late-blight',
    name: 'Tomato & Potato Late Blight',
    swahiliName: 'Ukungu wa Baridi (Late Blight)',
    scientificName: 'Phytophthora infestans (Mont.) de Bary',
    type: 'disease',
    affectedCropsOrAnimals: ['Tomatoes', 'Irish Potatoes'],
    symptoms: [
      'Water-soaked dark green to brownish irregular lesions on leaf edges.',
      'White cottony downy fungal growth on the undersides of leaves during humid morning hours.',
      'Rapid browning, shriveling, and death of whole foliage within 48 to 72 hours under cool wet weather.',
      'Firm, brown leathery lesions on tomato fruits and potato tubers with foul odor.'
    ],
    conduciveConditions: 'Cool, wet, cloudy, foggy conditions with high relative humidity (>90%) and temperatures between 15°C and 20°C.',
    similarProblems: 'Early Blight (Alternaria solani - characterized by concentric "bullseye" rings on older leaves and drier lesions).',
    prevention: [
      'Use certified tolerant varieties (e.g. Unica, Shangi treated seed, Kilele F1).',
      'Maintain wide crop spacing to promote rapid foliage drying and airflow.',
      'Drip irrigation rather than overhead sprinkling to avoid wet leaves.'
    ],
    culturalControl: 'Stake and prune lower leaves touching soil. Remove and deep-bury heavily infected blighted plants away from fields.',
    biologicalControl: 'Trichoderma viride applications to soil and bio-fungicides during dry establishment periods.',
    chemicalControl: {
      registeredActiveIngredients: 'Preventive: Mancozeb 800g/kg (Dithane M-45) or Copper Oxychloride. Curative/Systemic: Metalaxyl-M + Mancozeb (Ridomil Gold) or Cymoxanil + Mancozeb.',
      phiDays: 7,
      reiHours: 12,
      safetyPrecautions: 'Never apply systemic curative fungicides consecutively more than twice; switch back to multisite contact protectants to avoid chemical resistance.'
    },
    professionalAdviceTrigger: 'When the first water-soaked lesion is identified in a commercial tomato or potato field during rainy weather.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80',
    references: 'KALRO Horticultural Research Institute & CIP Potato Pathology Manual'
  },
  {
    id: 'tuta-absoluta',
    name: 'Tomato Leafminer (Tuta Absoluta)',
    swahiliName: 'Kipekecha Majani cha Nyanya',
    scientificName: 'Phthorimaea absoluta (Meyrick)',
    type: 'pest',
    affectedCropsOrAnimals: ['Tomatoes', 'Eggplants', 'Irish potatoes', 'Capsicum'],
    symptoms: [
      'Whitish translucent blotch mines in leaf mesophyll (not serpentine winding lines like Liriomyza).',
      'Black frass granules visible inside the leaf blisters.',
      'Small entrance pinholes near the fruit calyx with dark frass rot.',
      'Stems bored, resulting in stunted, collapsed growing tips.'
    ],
    conduciveConditions: 'Warm, dry weather accelerates life cycle from 60 days down to 24 days, multiplying generations rapidly.',
    similarProblems: 'Serpentine Leafminer (Liriomyza spp.), Tomato Fruitworm (Helicoverpa armigera).',
    prevention: [
      'Install delta sticky pheromone traps (Tuta traps) at 4-6 traps per acre to monitor adult moth arrival.',
      'Insect-proof netting (40-50 mesh) on greenhouse nursery vents.',
      'Crop debris destruction and solarization of soil between cropping cycles.'
    ],
    culturalControl: 'Regular hand-pruning of mined leaves and burning them in enclosed bags before larvae emerge.',
    biologicalControl: 'Mirid predatory bugs (Nesidiocoris tenuis), Bacillus thuringiensis kurstaki, or Beauveria bassiana bio-insecticides.',
    chemicalControl: {
      registeredActiveIngredients: 'Chlorantraniliprole (Coragen), Spinetoram (Radiant 120 SC), Flubendiamide (Belt), or Emamectin Benzoate.',
      phiDays: 3,
      reiHours: 12,
      safetyPrecautions: 'Strictly observe Pre-Harvest Intervals (PHIs) since harvesting tomatoes is frequent (every 3-5 days).'
    },
    professionalAdviceTrigger: 'When pheromone trap catches exceed 10 moths per trap per week, indicating imminent larval infestation.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910a451?auto=format&fit=crop&w=1000&q=80',
    references: 'ICIPE Tomato Leafminer IPM Protocols Kenya'
  },
  {
    id: 'bacterial-wilt',
    name: 'Bacterial Wilt',
    swahiliName: 'Mnyauko wa Bakteria',
    scientificName: 'Ralstonia solanacearum (Smith) Yabuuchi',
    type: 'disease',
    affectedCropsOrAnimals: ['Tomatoes', 'Irish Potatoes', 'Eggplants', 'Capsicum', 'Bananas'],
    symptoms: [
      'Sudden daytime wilting of whole green plants without prior yellowing; plants temporarily recover at night initially.',
      'Rapid death while the leaves remain completely green (unlike Fusarium which causes yellowing first).',
      'Bacterial streaming test: Cut a 3cm stem base and suspend in clean water in a clear glass; white milky bacterial threads stream down within 2 minutes.',
      'Vascular ring inside stem or potato tuber shows dark brownish discoloration.'
    ],
    conduciveConditions: 'Warm soil temperatures (>25°C), high soil moisture, acidic soils, presence of root-knot nematodes creating entry wounds.',
    similarProblems: 'Fusarium Wilt, Verticillium Wilt, Root Rot (Pythium).',
    prevention: [
      'Strict 4-year crop rotation with non-solanaceous crops (e.g. Maize, Sorghum, Rhodes grass, Beans).',
      'Use certified disease-free potato seed and sterilized seedling trays/cocopeat for tomato nursery.',
      'Clean and sanitize farm implements and tractor wheels moving between fields.'
    ],
    culturalControl: 'Uproot infected plants with surrounding soil in a bucket and destroy away from fields. Apply agricultural lime to raise soil pH to ~6.8.',
    biologicalControl: 'Grafting susceptible high-yielding scions onto wild resistant rootstocks (Solanum torvum).',
    chemicalControl: {
      registeredActiveIngredients: 'No effective synthetic chemical cure exists for infected plants in the field. Do not purchase fake chemical cures.',
      phiDays: 0,
      reiHours: 0,
      safetyPrecautions: 'Preventive soil drenching with copper compounds or hydrogen peroxide-based soil sterilants only delays spread.'
    },
    professionalAdviceTrigger: 'Immediate soil quarantine when bacterial streaming is confirmed in a field.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1000&q=80',
    references: 'KEPHIS Phytosanitary Guidelines on Bacterial Wilt Quarantine'
  },
  {
    id: 'striga-weed',
    name: 'Striga Weed (Witchweed)',
    swahiliName: 'Kwekwe la Kawaida (Striga / Kayongo)',
    scientificName: 'Striga hermonthica (Delile) Benth.',
    type: 'weed',
    affectedCropsOrAnimals: ['Maize', 'Sorghum', 'Millet', 'Sugarcane'],
    symptoms: [
      'Stunted crop growth, yellow chlorotic streaks on leaves, severe wilting even in moist soil.',
      'Crop resembles drought-stricken plants because Striga roots parasitize host root xylem.',
      'Appearance of bright pink or purple small flowering plants attached directly to cereal root systems.'
    ],
    conduciveConditions: 'Depleted, low-fertility soils low in available nitrogen and phosphorus; continuous monocropping of cereals in Western and Nyanza Kenya.',
    similarProblems: 'Severe soil nitrogen or zinc deficiency.',
    prevention: [
      'Use Striga-tolerant maize hybrids (e.g., Ua Kayongo or Imazapyr-Resistant IR Maize e.g., KSTP 94).',
      'Heavy application of cattle manure and legume cover cropping to replenish soil organic matter.'
    ],
    culturalControl: 'Push-Pull technology: Intercropping maize with Silverleaf Desmodium (Desmodium uncinatum), which produces root exudates causing "suicidal germination" of Striga seeds.',
    biologicalControl: 'Fusarium oxysporum f. sp. strigae (bio-herbicide "Kichawi Kill").',
    chemicalControl: {
      registeredActiveIngredients: 'Seed coating with Imazapyr herbicide (IR-Maize technology) kills Striga as soon as its haustoria attach to root.',
      phiDays: 60,
      reiHours: 24,
      safetyPrecautions: 'Handle treated IR seed with gloves; do not consume seed grain.'
    },
    professionalAdviceTrigger: 'When more than 5 Striga shoots per square meter are observed in cereal fields.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80',
    references: 'ICIPE Push-Pull Manual & CIMMYT Striga Management in Eastern Africa'
  }
];
