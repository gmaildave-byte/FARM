import { LivestockGuide } from '../types';

export const livestockData: LivestockGuide[] = [
  {
    id: 'dairy-cattle',
    species: 'Dairy Cattle',
    swahiliName: 'Ng\'ombe wa Maziwa',
    scientificName: 'Bos taurus',
    category: 'dairy-cattle',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80',
    overview: 'Dairy farming in Kenya is the cornerstone of the agricultural economy, contributing ~4% to national GDP. Smallholder zero-grazing systems dominate in Central, Rift Valley, and Western Kenya, with over 1.8 million smallholders keeping dairy cows.',
    breeds: [
      {
        name: 'Friesian (Holstein-Friesian)',
        origin: 'Netherlands / Europe',
        characteristics: 'Large black-and-white frame, high feed intake, susceptible to heat stress and tick-borne diseases.',
        productionYield: '25 – 40+ litres/day under intensive zero-grazing and high concentrate feeding. Butterfat: 3.2 – 3.5%.',
        suitability: 'Highland cool zones (Nyandarua, Kiambu, Uasin Gishu, Nyeri) with plentiful fodder.'
      },
      {
        name: 'Ayrshire',
        origin: 'Scotland',
        characteristics: 'Brown/red and white coat, hardy, excellent foragers, superior resistance to mastitis and leg soundness.',
        productionYield: '18 – 28 litres/day. Butterfat: 3.8 – 4.0%.',
        suitability: 'Extremely popular across medium to high elevation zones.'
      },
      {
        name: 'Jersey',
        origin: 'Channel Islands (UK)',
        characteristics: 'Small fawn-colored body, docile, lowest feed maintenance requirement, high heat tolerance.',
        productionYield: '14 – 22 litres/day. Highest butterfat (4.8 – 5.4%), ideal for butter/cheese making and high farmgate milk price.',
        suitability: 'Medium to semi-arid climates and farms with limited acreage for fodder.'
      }
    ],
    housingRequirements: 'Zero-grazing unit must have: 1) Concrete floor with 1:60 gentle slope for drainage, 2) Individual resting cubicles (2.1m x 1.2m) with soft dry bedding (sawdust/rubber mats), 3) Feed trough (60cm wide) with head rails, 4) Continuous clean water trough, 5) Roofed walking and loafing area.',
    spacePerAnimal: '50 – 70 square feet (approx. 5 – 6.5 sq meters) per mature cow under zero-grazing.',
    feedingNutrition: {
      roughageOrMain: 'Corn silage (15-20kg/day), chopped Napier grass or Brachiaria (25-30kg/day), high protein legume hay (Lucerne/Desmodium 3-5kg/day). Dry Matter must equal 3% of body weight.',
      concentrates: 'Standard Dairy Meal (16-18% CP): Feed 1 kg of commercial dairy meal for every 1.5 – 2.0 litres of milk produced above 5 litres base yield.',
      mineralsAndVitamins: '100 – 150g of balanced dairy mineral lick (Maclik Super / Dry Cow mineral) daily to prevent Milk Fever and ensure timely rebreeding.',
      waterLitersPerDay: '60 – 100 litres of fresh clean water accessible 24 hours a day.'
    },
    breedingReproduction: 'Gestation: 283 days (~9 months). Estrus cycle: 21 days. Artificial Insemination (AI) should be done using the AM-PM rule (seen on standing heat in morning -> inseminate in evening). Aim for 1 calf every 12 to 13 months (365-day calving interval).',
    youngStockCare: 'Calf must receive 3-4 litres of warm colostrum within the first 2 hours of birth for passive immune transfer. Feed whole milk/milk replacer up to 8-10 weeks; introduce calf starter pellets and dry soft sweet hay from week 2.',
    vaccinationSchedule: [
      {
        timing: 'At 1 – 3 months',
        disease: 'East Coast Fever (ECF)',
        vaccine: 'Muguga Cocktail (ITM)',
        route: 'Subcutaneous injection by certified vet',
        notes: 'Gives lifetime immunity against tick-borne theileriosis.'
      },
      {
        timing: 'At 6 months & annually',
        disease: 'Foot and Mouth Disease (FMD)',
        vaccine: 'Quadrivalent FMD Vaccine',
        route: 'Intramuscular',
        notes: 'Essential before any inter-county cattle movement.'
      },
      {
        timing: 'Annually before rains',
        disease: 'Anthrax & Blackquarter (BQ)',
        vaccine: 'Blanthrax / Anthrax Spore Vaccine',
        route: 'Subcutaneous',
        notes: 'Critical in endemic grazing regions.'
      },
      {
        timing: 'Heifers at 3 – 8 months once',
        disease: 'Brucellosis',
        vaccine: 'S19 Vaccine',
        route: 'Subcutaneous',
        notes: 'Prevents contagious abortion and protects human milk handlers.'
      }
    ],
    biosecurity: [
      'Maintain vehicle and footbaths at farm gate with 2% Virkon or formalin solution.',
      'Quarantine newly purchased cows for 21 days before joining the milking herd.',
      'Control ticks strictly by weekly acaricide plunge dipping or hand spraying with knapsack (ensure ears, tail switch, and udder are drenched).'
    ],
    commonDiseases: [
      {
        disease: 'East Coast Fever (ECF)',
        symptoms: 'Swollen parotid and prescapular lymph nodes, high fever (>40°C), labored breathing, frothy nasal discharge.',
        prevention: 'Weekly tick spraying with registered acaricides; Muguga cocktail immunization.'
      },
      {
        disease: 'Mastitis (Clinical & Sub-clinical)',
        symptoms: 'Swollen, hot, painful quarters; clots or watery yellowish milk; fever.',
        prevention: 'Daily California Mastitis Test (CMT), post-milking teat dipping in 0.5% iodine, dry cow therapy at drying off.'
      },
      {
        disease: 'Milk Fever (Hypocalcemia)',
        symptoms: 'Occurs within 48 hours of calving; cow sits with head turned into flank ("S-curve"), cold ears, unable to rise.',
        prevention: 'Feed low-calcium, anionic diet during late dry period; administer calcium borogluconate IV immediately if signs appear.'
      }
    ],
    productionMetrics: 'Top benchmark: 5,500 – 7,500 litres per lactation (305 days), Calving interval < 390 days, Age at first calving: 24–26 months.',
    welfareAndWaste: 'Install biogas digester to convert cattle dung and urine into clean cooking gas and rich organic bio-slurry fertilizer. Keep cubicles dry to eliminate claw rot.',
    economicsExample: {
      setupCostKES: 380000,
      monthlyOperatingKES: 36000,
      monthlyRevenueKES: 78000,
      breakEvenMonths: '14 – 18 months',
    },
    citations: ['Kenya National Dairy Development Board (NDDB) Manual', 'KALRO Naivasha Dairy Research Centre Guidelines', 'Kenya Veterinary Association Clinical Practice Standards']
  },
  {
    id: 'poultry-farming',
    species: 'Poultry (Broilers, Layers & Improved Kienyeji)',
    swahiliName: 'Kuku (Nyama, Mayai na Kienyeji)',
    scientificName: 'Gallus gallus domesticus',
    category: 'poultry',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80',
    overview: 'Poultry is the fastest-growing livestock sector in Kenya due to minimal land requirements, fast cash turnover, and high urban demand for chicken meat and eggs.',
    breeds: [
      {
        name: 'KALRO Improved Kienyeji',
        origin: 'Kenya (KALRO Naivasha)',
        characteristics: 'Spotted multi-colored plumage, resilient against harsh rural conditions, scavenges well in semi-free range.',
        productionYield: '220 – 260 eggs/year; table birds reach 1.8 – 2.2kg in 4.5 months.',
        suitability: 'All counties in Kenya; high premium market demand for traditional meat taste.'
      },
      {
        name: 'Isa Brown / Lohmann Brown (Layers)',
        origin: 'Commercial Hybrid',
        characteristics: 'Brown feathers, high feed conversion into eggs, calm temperament.',
        productionYield: '300 – 320 eggs/bird over 72-80 weeks of lay (peak 92-96%).',
        suitability: 'Battery cages or intensive deep litter commercial units.'
      },
      {
        name: 'Cobb 500 / Ross 308 (Broilers)',
        origin: 'Commercial Hybrid',
        characteristics: 'Fast growth rate, heavy breast meat conformation, white plumage.',
        productionYield: 'Reaches 1.8 – 2.1 kg live weight within 35 – 40 days on 3.2 – 3.6kg total feed intake.',
        suitability: 'Intensive commercial housing with strict biosecurity.'
      }
    ],
    housingRequirements: 'Coop must provide: 1) East-West orientation to prevent direct solar glare, 2) Well-ventilated open-wire-mesh upper walls with curtains, 3) Concrete floor with 8-10 cm dry wood shavings litter, 4) Predator-proof perimeter, 5) Clean brooding area with heat source (infrared lamp/charcoal jiko with chimney).',
    spacePerAnimal: 'Broilers: 1 sq. foot per bird. Layers: 1.5 – 2 sq. feet per bird on deep litter. Kienyeji: 2 sq. feet indoor + run area.',
    feedingNutrition: {
      roughageOrMain: 'Commercial feeds: Starter mash/crumbles (Week 1-3, 20-22% CP), Grower mash (Week 4-8), Layers mash (Week 18+, 16-18% CP + 3.8% Calcium).',
      concentrates: 'Broiler finisher pellets (Week 4-6) formulated with high metabolisable energy for rapid muscle deposition.',
      mineralsAndVitamins: 'Soluble multi-vitamins (e.g. Aliseryl / Vitalyte) in drinking water during vaccination, heat stress, or transit.',
      waterLitersPerDay: 'Rule of thumb: Birds drink twice as much water as they eat feed (approx. 200–300 ml per adult layer per day).'
    },
    breedingReproduction: 'Commercial hybrids are sourced from certified parent-stock hatcheries (Kenchic, Muguku, Uzima Chicken). Improved Kienyeji can be bred on-farm using incubator or broody hens.',
    youngStockCare: 'Brooding temperature must be 32°C – 35°C on Day 1, gradually reduced by 3°C each week until week 4. Provide glucose/stress pack in first water upon arrival.',
    vaccinationSchedule: [
      {
        timing: 'Day 1 (Hatchery)',
        disease: 'Marek\'s Disease',
        vaccine: 'HVT Vaccine',
        route: 'Subcutaneous injection at neck',
        notes: 'Administered at hatchery prior to dispatch.'
      },
      {
        timing: 'Day 7',
        disease: 'Gumboro (IBD - Infectious Bursal Disease)',
        vaccine: 'Gumboro Intermediate Strain',
        route: 'Drinking water (mix with skimmed milk to neutralize chlorine)',
        notes: 'Withdraw drinking water 1-2 hours before to ensure swift drinking.'
      },
      {
        timing: 'Day 14',
        disease: 'Newcastle Disease (ND) + IB',
        vaccine: 'ND Lasota / Clon 30 + IB',
        route: 'Eye drop or drinking water',
        notes: 'Critical protection against fatal Newcastle outbreaks.'
      },
      {
        timing: 'Day 21',
        disease: 'Gumboro 2nd Booster',
        vaccine: 'Gumboro Intermediate Plus',
        route: 'Drinking water',
        notes: 'Essential booster for deep litter systems.'
      },
      {
        timing: 'Day 28',
        disease: 'Newcastle 2nd Booster',
        vaccine: 'ND Lasota',
        route: 'Drinking water',
        notes: 'Maintains antibody titers.'
      },
      {
        timing: 'Week 6 – 8',
        disease: 'Fowl Pox',
        vaccine: 'Fowl Pox Vaccine',
        route: 'Wing-web puncture with double-pronged needle',
        notes: 'Check for "take" scab 7 days post-vaccination.'
      }
    ],
    biosecurity: [
      'Maintain an "All-in, All-out" production flock management cycle.',
      'Disinfect hands and footwear at the door before entering the poultry house.',
      'Promptly burn or bury dead birds in an enclosed pit; never toss carcasses near coops.'
    ],
    commonDiseases: [
      {
        disease: 'Newcastle Disease',
        symptoms: 'Twisted necks (torticollis), greenish watery diarrhea, gasping, sudden high mortality up to 90%.',
        prevention: 'Strict vaccination schedule (Day 14, Day 28, every 3 months for adult stock).'
      },
      {
        disease: 'Coccidiosis',
        symptoms: 'Bloody diarrhea, ruffled feathers, huddling near heat sources, pale combs.',
        prevention: 'Keep litter bone-dry; use coccidiostat in feed or treat water with Amprolium.'
      },
      {
        disease: 'Fowl Typhoid / Cholera',
        symptoms: 'Yellow-green diarrhea, dark purple combs, swollen joints, sudden death.',
        prevention: 'Vaccinate at 8 weeks; maintain clean water lines.'
      }
    ],
    productionMetrics: 'Broiler FCR (Feed Conversion Ratio): 1.6 – 1.8. Layer Hen-Day Production: >85% for 30 consecutive weeks.',
    welfareAndWaste: 'Dry poultry manure is a valuable high-nitrogen fertilizer (NPK ~3:2:2). Store under roof to compost before applying to coffee, maize, or vegetable fields.',
    economicsExample: {
      setupCostKES: 120000,
      monthlyOperatingKES: 45000,
      monthlyRevenueKES: 72000,
      breakEvenMonths: '8 – 10 months',
    },
    citations: ['KALRO Poultry Technical Guide Series', 'Kenya Ministry of Agriculture Poultry Handbooks', 'Directorate of Veterinary Services Kenya']
  },
  {
    id: 'dairy-goats',
    species: 'Dairy & Meat Goats',
    swahiliName: 'Mbuzi wa Maziwa na Nyama',
    scientificName: 'Capra hircus',
    category: 'goats',
    image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=1000&q=80',
    overview: 'Goat farming has high economic returns on limited land. Dairy goats produce hypoallergenic milk commanding KES 100–160/litre (3x cow milk price), while meat breeds like Boer and Galla have rapid weight gain in pastoral areas.',
    breeds: [
      {
        name: 'Toggenburg (Dairy)',
        origin: 'Switzerland',
        characteristics: 'Brown with white facial stripes and lower legs; docile, hardy dairy breed.',
        productionYield: '2.5 – 4.5 litres of milk/day under good nutrition. Butterfat: 3.5 – 4.0%.',
        suitability: 'Highlands (Central Kenya, Meru, Embu) under zero-grazing.'
      },
      {
        name: 'Saanen (Dairy)',
        origin: 'Switzerland',
        characteristics: 'All white or cream coat; highest milk volume producer among goat breeds.',
        productionYield: '3.0 – 5.5 litres/day under cool conditions.',
        suitability: 'Temperate highland areas with shade.'
      },
      {
        name: 'Boer (Meat)',
        origin: 'South Africa',
        characteristics: 'White body with reddish-brown head; heavy muscle conformation.',
        productionYield: 'Mature bucks reach 90 – 120kg; high dressing percentage (55-60%).',
        suitability: 'Commercial meat production, cross-breeding with indigenous East African goats.'
      },
      {
        name: 'Galla Goat (Desert Meat)',
        origin: 'Northern Kenya',
        characteristics: 'Pure white short hair; remarkable drought and heat endurance.',
        productionYield: 'Does weigh 45 – 55kg, bucks 60 – 70kg; excellent milk yield for arid zones.',
        suitability: 'ASAL counties (Garissa, Isiolo, Wajir, Turkana, Kilifi).'
      }
    ],
    housingRequirements: 'Raised wooden slatted floor (1 meter off ground with 1.5 cm gaps between slats) allowing droppings and urine to fall through, keeping hooves clean and dry.',
    spacePerAnimal: '1.5 – 2.0 square meters per adult doe with feeding rack.',
    feedingNutrition: {
      roughageOrMain: 'Calliandra calothyrsus, Leucaena, Desmodium, Lucerne, sweet potato vines, and dry Rhodes grass hay.',
      concentrates: 'Dairy goat meal (16% CP) fed at 300 – 500g per lactating doe per day.',
      mineralsAndVitamins: 'Commercial goat mineral block with copper (goats require more copper than sheep).',
      waterLitersPerDay: '5 – 10 litres per adult goat daily.'
    },
    breedingReproduction: 'Estrus every 21 days; gestation is 150 days (~5 months). Twinning is very common (1.7 kids/kidding average in well-fed does).',
    youngStockCare: 'Colostrum within first hour. Keep kids in a separate dry nursery box during first 3 weeks.',
    vaccinationSchedule: [
      {
        timing: 'Annually before rains',
        disease: 'Contagious Caprine Pleuropneumonia (CCPP)',
        vaccine: 'Caprivax (KEVEVAPI)',
        route: 'Subcutaneous injection',
        notes: 'Mandatory preventive vaccination in Kenya.'
      },
      {
        timing: 'Annually',
        disease: 'Peste des Petits Ruminants (PPR)',
        vaccine: 'PPR Homologous Vaccine',
        route: 'Subcutaneous',
        notes: 'Provides lasting herd immunity.'
      },
      {
        timing: 'Every 3 – 4 months',
        disease: 'Internal Parasites (Worms)',
        vaccine: 'Dewormer (Albendazole / Levamisole)',
        route: 'Oral drench',
        notes: 'Rotate chemical classes to prevent anthelmintic resistance.'
      }
    ],
    biosecurity: [
      'Trim hooves every 2 months to prevent foot rot.',
      'Do not allow outside bucks into the herd without health screening for Brucellosis and Caseous Lymphadenitis (CLA).'
    ],
    commonDiseases: [
      {
        disease: 'CCPP (Pleuropneumonia)',
        symptoms: 'Severe coughing, mouth breathing, frothy nasal discharge, high fever, rapid mortality.',
        prevention: 'Annual Caprivax vaccination; avoid damp, dusty housing.'
      },
      {
        disease: 'Pulpy Kidney (Enterotoxaemia)',
        symptoms: 'Sudden death in best-fed fast-growing kids, convulsions.',
        prevention: 'Vaccinate does 4 weeks before kidding; avoid sudden grain overfeeding.'
      }
    ],
    productionMetrics: 'Kidding interval: 8 months; Kid survival rate to weaning: >90%.',
    welfareAndWaste: 'Goat droppings are dry pellets, making collection easy. Highly priced for greenhouse vegetable potting and flower beds.',
    economicsExample: {
      setupCostKES: 95000,
      monthlyOperatingKES: 8500,
      monthlyRevenueKES: 24000,
      breakEvenMonths: '9 – 12 months',
    },
    citations: ['Dairy Goat Association of Kenya (DGAK) Breeding Records', 'KEVEVAPI Vaccine Manual', 'KALRO Katumani Small Ruminant Guidelines']
  },
  {
    id: 'aquaculture',
    species: 'Fish Farming (Tilapia & African Catfish)',
    swahiliName: 'Ufugaji wa Samaki (Ngege na Mumi)',
    scientificName: 'Oreochromis niloticus / Clarias gariepinus',
    category: 'aquaculture',
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=1000&q=80',
    overview: 'Commercial fish farming in earthen ponds, liners, or recirculating aquaculture systems (RAS) addresses Kenya\'s annual fish deficit of over 400,000 metric tonnes.',
    breeds: [
      {
        name: 'Nile Tilapia (Oreochromis niloticus)',
        origin: 'Lake Victoria / Rift Valley Lakes',
        characteristics: 'Herbivorous/omnivorous, fast growth, mild white flesh with high market acceptance.',
        productionYield: 'Harvest size 400 – 600g in 6 – 8 months on floating pellets.',
        suitability: 'Earthen ponds, dam cages, and greenhouse heated liners.'
      },
      {
        name: 'African Catfish (Clarias gariepinus)',
        origin: 'Indigenous freshwater lakes & rivers',
        characteristics: 'Air-breathing accessory organ, highly hardy, survives low oxygen, carnivore/predator.',
        productionYield: 'Harvest size 800g – 1.5kg in 6 months.',
        suitability: 'High-density commercial tanks and earthen ponds; often polycultured with tilapia to control tilapia overbreeding.'
      }
    ],
    housingRequirements: 'Standard 300m² earthen pond (10m x 30m) with 1.0m shallow end to 1.5m deep end, monk drainage system, predator bird netting over surface, and inlet filter screen.',
    spacePerAnimal: 'Extensive earthen pond: 3 – 5 fingerlings/m². Intensive aerated tanks: 20 – 50 fingerlings/m³.',
    feedingNutrition: {
      roughageOrMain: 'Extruded floating pellets: Starter crumbles (40% CP for fry), Grower pellets (32-35% CP for 50-200g fish), Finisher pellets (28-30% CP).',
      concentrates: 'Feed twice daily at 3-5% of total pond biomass during warm hours (10:00 AM and 3:00 PM).',
      mineralsAndVitamins: 'Formulated premix incorporated in extruded commercial fish feeds.',
      waterLitersPerDay: 'Requires constant pond water replenishment (5-10% weekly water exchange).'
    },
    breedingReproduction: 'Source all-male sex-reversed Tilapia fingerlings from certified Kenya Fisheries hatcheries (Sagana Aquaculture Centre or certified private hatcheries) to prevent stunted in-pond reproduction.',
    youngStockCare: 'Acclimatize fingerling bags in pond water for 20 minutes to equalize temperatures before release.',
    vaccinationSchedule: [
      {
        timing: 'Pre-stocking',
        disease: 'Parasitic flukes & fungal rots',
        vaccine: 'Potassium Permanganate / Salt Dip',
        route: 'Short immersion dip bath (1-2 minutes)',
        notes: 'Disinfect fingerlings before stocking into nursery ponds.'
      }
    ],
    biosecurity: [
      'Maintain perimeter fences to prevent otter and monitor lizard intrusion.',
      'Erect overhead monofilament lines or bird netting to block pied kingfishers and cormorants.',
      'Check dissolved oxygen (DO > 4.0 mg/L) and pH (6.5 - 8.5) weekly.'
    ],
    commonDiseases: [
      {
        disease: 'Columnaris & Fin Rot',
        symptoms: 'White lesions around mouth, eroded fin margins, lethargy.',
        prevention: 'Avoid overstocking; handle fish gently during sampling.'
      }
    ],
    productionMetrics: 'FCR target: 1.3 – 1.5 kg feed per 1.0 kg fish gained; survival rate: >85%.',
    welfareAndWaste: 'Nutrient-rich pond drainage water is premier organic irrigation water for vegetable horticulture.',
    economicsExample: {
      setupCostKES: 140000,
      monthlyOperatingKES: 22000,
      monthlyRevenueKES: 195000,
      breakEvenMonths: '7 – 8 months (per harvest cycle)',
    },
    citations: ['Kenya Marine and Fisheries Research Institute (KMFRI)', 'State Department for Fisheries & Blue Economy Sagana Guidelines']
  },
  {
    id: 'beekeeping',
    species: 'Beekeeping (Apiculture)',
    swahiliName: 'Ufugaji wa Nyuki',
    scientificName: 'Apis mellifera scutellata',
    category: 'beekeeping',
    image: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=1000&q=80',
    overview: 'Beekeeping in Kenya requires minimal capital and zero arable land, yielding pure honey (KES 800–1,200/kg), beeswax, propolis, and royal jelly, while providing vital pollination services for fruit and vegetable crops.',
    breeds: [
      {
        name: 'African Honey Bee (Apis mellifera scutellata)',
        origin: 'Indigenous to Sub-Saharan Africa',
        characteristics: 'Vigorous honey collector, defensive, high swarming and absconding tendency when disturbed or food is scarce.',
        productionYield: 'Langstroth hive: 15 – 25 kg raw comb honey per harvest (2-3 harvests/year in good flora).',
        suitability: 'All agro-ecological zones with nectar forage.'
      }
    ],
    housingRequirements: 'Langstroth modern hives with supers and queen excluders or Kenya Top Bar Hives (KTBH). Mount on greased suspended wires (1.2m above ground) to prevent ants and honey badgers from climbing.',
    spacePerAnimal: 'Apiary of 20-50 hives requires a secluded quiet plot away from livestock, human footpaths, and noisy roads.',
    feedingNutrition: {
      roughageOrMain: 'Flowering flora (Acacia, Eucalyptus, Sunflower, Coffee, Macadamia, Calliandra).',
      concentrates: 'Provide sugar syrup (1:1 sugar:water) or sugar candy only during extreme dearth dry seasons to prevent colony absconding.',
      mineralsAndVitamins: 'Fresh water source with floating wooden twigs for landing within 50 meters of apiary.',
      waterLitersPerDay: 'Bees need clean water to regulate hive temperature and dilute honey for brood feed.'
    },
    breedingReproduction: 'Queen lays up to 1,500 eggs per day during peak nectar flow.',
    youngStockCare: 'Colonies divide naturally by swarming or beekeeper creates splits with artificial queen cells.',
    vaccinationSchedule: [
      {
        timing: 'Routine monitoring',
        disease: 'Varroa Mite & Wax Moth',
        vaccine: 'Thymol strips / Formic acid pad',
        route: 'Vaporizer / Hive pad',
        notes: 'Applied only after honey harvest to avoid honey contamination.'
      }
    ],
    biosecurity: [
      'Paint hive exteriors with non-toxic light-colored paint to reflect heat.',
      'Grease suspension wires with used engine oil or grease to stop safari ants.'
    ],
    commonDiseases: [
      {
        disease: 'Wax Moth (Galleria mellonella)',
        symptoms: 'Silken tunnels in wax combs, cocoon webbing, destroyed comb foundation.',
        prevention: 'Keep colonies strong and queenright; freeze stored combs before reuse.'
      }
    ],
    productionMetrics: 'Average annual yield per modern Langstroth hive: 20 – 35 kg raw honey.',
    welfareAndWaste: 'Harvest only capped surplus honey combs from supers; never harvest brood nest combs. Always use cool white smoke from dried cow dung or wood shavings.',
    economicsExample: {
      setupCostKES: 75000,
      monthlyOperatingKES: 3000,
      monthlyRevenueKES: 45000,
      breakEvenMonths: '6 – 9 months',
    },
    citations: ['National Beekeeping Institute (NBI) Lenana Manual', 'KALRO Apiculture Research Section']
  }
];
