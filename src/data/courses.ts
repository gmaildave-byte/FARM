import { Course } from '../types';

export const coursesData: Course[] = [
  {
    id: 'course-maize-mastery',
    title: 'Commercial Maize Production & Post-Harvest Mastery',
    swahiliName: 'Uzalishaji wa Mahindi Kibiashara na Uhifadhi Bora',
    level: 'Beginner',
    durationHours: 3.5,
    modulesCount: 4,
    description: 'Learn modern agronomic practices for commercial maize farming in Kenya from seed selection, planting geometry, targeted fertilizer regimes, to hermetic storage and aflatoxin prevention.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Seed Variety Selection by Agro-Ecological Zone',
        durationMinutes: 45,
        content: 'Understand why highland varieties (H614, H628) fail in lowlands, how to verify genuine KEPHIS seed tags via SMS 1393, and the economic difference between certified hybrid seed and recycled grain.',
        fieldChecklist: [
          'Verify altitude and expected rainfall of your specific county before buying seed.',
          'Never purchase unsealed or discounted seed packets without scratch verification codes.',
          'Calculate 10 kg hybrid seed requirement per acre for 75 x 25 cm spacing.'
        ]
      },
      {
        id: 'm2',
        title: 'Module 2: Soil Preparation, Planting & Balanced Fertilization',
        durationMinutes: 55,
        content: 'Land preparation rules, basal fertilization with DAP/NPK 23:23:0, avoiding direct seed-fertilizer contact, and timing the critical knee-high top-dressing window with CAN.',
        fieldChecklist: [
          'Calibrate planter or hand hoes for 5 cm distance between seed and fertilizer.',
          'Apply 50 kg DAP at planting and 50–75 kg CAN at knee-high when soil is moist.',
          'Weed thoroughly before applying top-dress fertilizer to avoid feeding weeds.'
        ]
      },
      {
        id: 'm3',
        title: 'Module 3: Integrated Pest Management for Fall Armyworm & Stalk Borers',
        durationMinutes: 50,
        content: 'Scouting methodologies, cultural Push-Pull systems using Desmodium and Napier grass, bio-pesticide options, and safe chemical rotation to avoid insecticide resistance.',
        fieldChecklist: [
          'Scout 20 consecutive plants in 5 field spots weekly.',
          'Apply neem or registered insecticides directly into funnel whorls early morning.',
          'Wear full Personal Protective Equipment (PPE) whenever spraying.'
        ]
      },
      {
        id: 'm4',
        title: 'Module 4: Harvesting, Grain Drying & Hermetic Aflatoxin Defense',
        durationMinutes: 60,
        content: 'Determining physiological maturity (black layer formation), harvesting without soil contact, sun drying on clean tarpaulins to exactly 13.5% moisture, and utilizing PICS hermetic bags.',
        fieldChecklist: [
          'Check grain moisture with a calibrated moisture meter before shelling and bagging.',
          'Ensure storage moisture is 13.5% or lower to prevent toxic Aspergillus flavus mold.',
          'Seal PICS hermetic bags tightly layer by layer to suffocate storage weevils.'
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the maximum safe grain moisture content for storing maize long-term in Kenya to prevent aflatoxin contamination?',
        options: ['13.5% or lower', '18.0%', '22.5%', '15.5%'],
        correctIndex: 0,
        explanation: 'According to Kenyan and East African grain standards, maize must be dried to 13.5% or lower to prevent the proliferation of Aspergillus flavus mold that produces dangerous aflatoxins.'
      },
      {
        question: 'At which growth stage should the primary nitrogen top-dressing (CAN) be applied to a maize crop?',
        options: ['At seedling emergence (Day 4)', 'At knee-high stage (V6, 4-6 weeks after emergence)', 'During grain drying', 'At harvesting'],
        correctIndex: 1,
        explanation: 'Maize develops its rapid vegetative framework and tassel initiation at knee-high (V6 stage), making this the period of peak nitrogen uptake efficiency.'
      },
      {
        question: 'How can a farmer verify that a packet of hybrid maize seed is genuine in Kenya?',
        options: ['By smelling the seed dust', 'By checking the bag color only', 'By scratching the KEPHIS sticker and sending the unique code via SMS to 1393', 'By soaking a seed in water'],
        correctIndex: 2,
        explanation: 'KEPHIS operates an official SMS verification system where farmers scratch the authenticity seal and text the code to 1393 for free instant verification.'
      }
    ]
  },
  {
    id: 'course-dairy-zero-grazing',
    title: 'Profitable Dairy Farming & Zero-Grazing Management',
    swahiliName: 'Ufugaji wa Ng\'ombe wa Maziwa wa Zero-Grazing kwa Faida',
    level: 'Intermediate',
    durationHours: 4.0,
    modulesCount: 4,
    description: 'Master intensive zero-grazing dairy farming: shed construction architecture, silage making and fodder planning, estrus detection, and strict mastitis control protocols.',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80',
    modules: [
      {
        id: 'dm1',
        title: 'Module 1: Zero-Grazing Unit Architecture & Cow Comfort',
        durationMinutes: 60,
        content: 'Design dimensions for resting cubicles (2.1m x 1.2m), walking floor slopes, feeding trough rails, and dry bedding to prevent lameness and claw damage.',
        fieldChecklist: [
          'Ensure 1:60 floor slope towards the manure collection trough.',
          'Provide clean dry wood shavings or rubber mats in every cubicle.',
          'Check that cows can stand up and lie down naturally without lunging restrictions.'
        ]
      },
      {
        id: 'dm2',
        title: 'Module 2: Fodder Planning, Corn Silage & Total Mixed Ration (TMR)',
        durationMinutes: 70,
        content: 'Calculating 3% body weight dry matter (DM) intake, preserving high-energy corn silage in pit silos, growing protein legumes (Lucerne/Calliandra), and balanced dairy meal supplementation.',
        fieldChecklist: [
          'Chop Napier and fodder to 2-3 cm lengths to minimize feed refusal.',
          'Compact corn silage firmly to exclude all oxygen and seal with 1000-gauge UV polythene.',
          'Provide 60–100 litres of fresh water 24 hours a day.'
        ]
      },
      {
        id: 'dm3',
        title: 'Module 3: Estrus Detection, Timely AI & Calving Interval Management',
        durationMinutes: 50,
        content: 'Recognizing standing heat signs (mucus discharge, mounting other cows, restlessness) and executing the AM-PM rule for Artificial Insemination to maintain a 365-day calving interval.',
        fieldChecklist: [
          'Observe cows for standing heat for 20 minutes early morning and late evening.',
          'Call licensed AI inseminator: morning heat -> breed evening; evening heat -> breed next morning.',
          'Record breeding dates meticulously in your herd management book.'
        ]
      },
      {
        id: 'dm4',
        title: 'Module 4: Milk Hygiene, Teat Dipping & Mastitis Prevention',
        durationMinutes: 60,
        content: 'Pre-milking teat cleaning, the California Mastitis Test (CMT), post-milking iodine teat dip, dry cow therapy, and cold chain handling to preserve raw milk quality.',
        fieldChecklist: [
          'Always use a strip cup to inspect the first 3 squirts of milk from each quarter.',
          'Dip teats in 0.5% chlorhexidine or iodine solution immediately after milking.',
          'Wash milking cans with food-grade dairy detergent and hot water.'
        ]
      }
    ],
    quiz: [
      {
        question: 'According to the AM-PM breeding rule, when should a dairy cow observed on standing heat in the morning be inseminated?',
        options: ['Immediately within 10 minutes', 'The same day in the evening', 'Two days later', 'At the next monthly heat'],
        correctIndex: 1,
        explanation: 'Ovulation occurs approximately 10–14 hours after the end of standing heat. If a cow is first seen in standing heat in the morning, insemination in the evening coincides with optimal egg fertilization.'
      },
      {
        question: 'What is the primary purpose of post-milking teat dipping in a zero-grazing dairy herd?',
        options: ['To cool the cow down', 'To disinfect the open teat sphincter canal and seal it against environmental mastitis bacteria', 'To increase butterfat content', 'To stimulate let-down for the next milking'],
        correctIndex: 1,
        explanation: 'After milking, the teat sphincter muscle remains dilated for 30–45 minutes. A post-milking antiseptic dip coats the teat orifice, creating a barrier against environmental bacteria that cause mastitis.'
      }
    ]
  },
  {
    id: 'course-tomato-horticulture',
    title: 'High-Value Commercial Tomato Production',
    swahiliName: 'Kilimo cha Kisasa cha Nyanya kwa Faida Kubwa',
    level: 'Commercial',
    durationHours: 3.0,
    modulesCount: 3,
    description: 'A comprehensive operational guide to field and greenhouse tomato farming: seedling nursing in plug trays, drip irrigation scheduling, disease prevention, and post-harvest grading.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80',
    modules: [
      {
        id: 'tm1',
        title: 'Module 1: Nursery Management in Seedling Trays',
        durationMinutes: 50,
        content: 'Using sterilized cocopeat in 206-cell seedling trays, nursery hygiene, moisture control against Damping Off, and hardening off seedlings before field transplanting.',
        fieldChecklist: [
          'Use certified hybrid seed (Kilele F1 or Anna F1).',
          'Sow 1 seed per cell in moist cocopeat; protect under 40-mesh insect screen.',
          'Reduce watering and expose to full sun 5 days before field transplanting.'
        ]
      },
      {
        id: 'tm2',
        title: 'Module 2: Field Trellising, Pruning & Drip Fertigation',
        durationMinutes: 65,
        content: 'Staking indeterminate and determinate varieties with sisal twine, single-stem vs double-stem pruning, and delivering soluble fertilizers directly through drip lines.',
        fieldChecklist: [
          'Install strong wooden posts and wire trellises within 2 weeks of transplanting.',
          'Prune side shoots (suckers) when they are under 5 cm long.',
          'Incorporate calcium nitrate into fertigation to eliminate Blossom End Rot.'
        ]
      },
      {
        id: 'tm3',
        title: 'Module 3: Integrated Control of Tuta Absoluta & Late Blight',
        durationMinutes: 65,
        content: 'Pheromone delta traps, monitoring pest thresholds, alternating chemical active ingredients, and observing strict Pre-Harvest Intervals (PHIs).',
        fieldChecklist: [
          'Inspect foliage twice weekly for translucent leaf mines and water-soaked blight lesions.',
          'Spray preventive Mancozeb prior to rains; reserve curative systemic fungicides for outbreaks.',
          'Never pick tomatoes until the full Pre-Harvest Interval (PHI) has expired.'
        ]
      }
    ],
    quiz: [
      {
        question: 'What nutrient deficiency is the primary cause of Blossom End Rot (black sunken leathery rot at the base of tomato fruits)?',
        options: ['Nitrogen deficiency', 'Calcium deficiency (often triggered by erratic soil moisture)', 'Iron deficiency', 'Zinc deficiency'],
        correctIndex: 1,
        explanation: 'Blossom End Rot is caused by insufficient calcium transport to the rapidly expanding blossom end of the fruit, commonly aggravated by fluctuating irrigation moisture.'
      }
    ]
  },
  {
    id: 'course-avocado-export',
    title: 'Commercial Hass Avocado Production & GlobalGAP Export Standards',
    swahiliName: 'Uzalishaji wa Parachichi za Hass na Viwango vya Mauzo ya Nje',
    level: 'Intermediate',
    durationHours: 4.0,
    modulesCount: 3,
    description: 'Master commercial Hass avocado cultivation in Kenya from rootstock selection, canopy pruning, moisture stress management, to GlobalGAP compliance, dry matter testing, and export packing.',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=1000&q=80',
    modules: [
      {
        id: 'av1',
        title: 'Module 1: Orchard Layout, Planting Basins & Soil Drainage',
        durationMinutes: 60,
        content: 'Avocado trees are sensitive to Phytophthora root rot in waterlogged soils. Learn how to plant on raised mounds (5x5m or 7x7m spacing), incorporate compost, and maintain soil pH between 5.5 and 6.5.',
        fieldChecklist: [
          'Dig planting holes 60x60x60 cm and blend topsoil with 20 kg cured farmyard manure.',
          'Plant grafted seedlings leaving the graft union at least 15 cm above ground level.',
          'Mulch heavily around the drip line avoiding contact with the main stem bark.'
        ]
      },
      {
        id: 'av2',
        title: 'Module 2: Flowering, Fruit Set & Irrigation Management',
        durationMinutes: 70,
        content: 'Understanding Type A flowering behavior, ensuring beehives (2 hives per acre for cross-pollination), preventing fruit drop during dry spells, and foliar Boron and Zinc sprays.',
        fieldChecklist: [
          'Introduce bee colonies during 10% flower opening stage to maximize pollination.',
          'Maintain consistent soil moisture via drip irrigation during fruit set to prevent premature fruit drop.',
          'Apply micro-nutrient foliar sprays (Zinc and Boron) prior to full bloom.'
        ]
      },
      {
        id: 'av3',
        title: 'Module 3: Harvest Maturity, Dry Matter Testing & GlobalGAP Traceability',
        durationMinutes: 80,
        content: 'Determining picking maturity using the oven dry matter test (minimum 23% dry matter required by EU standards), clipping stems cleanly without damaging skin, and field traceability records.',
        fieldChecklist: [
          'Sample fruits for laboratory dry matter testing to ensure oil content is above 23%.',
          'Clip stalks cleanly leaving a 2mm pedicel; never twist or pull fruits from branches.',
          'Maintain complete pesticide spray logs and field chemical store locks for GlobalGAP inspection.'
        ]
      }
    ],
    quiz: [
      {
        question: 'What is the minimum dry matter percentage required for export-grade Hass avocados destined for European markets?',
        options: ['15%', '18%', '23%', '35%'],
        correctIndex: 2,
        explanation: 'European and international import standards require a minimum of 23% dry matter to guarantee uniform ripening and characteristic rich buttery flavor.'
      }
    ]
  },
  {
    id: 'course-drip-irrigation',
    title: 'Precision Drip Irrigation & Solar Pumping Engineering',
    swahiliName: 'Umwagiliaji wa Matone na Pampu za Jua',
    level: 'Commercial',
    durationHours: 3.5,
    modulesCount: 3,
    description: 'Design and operate gravity and solar-powered drip irrigation systems for horticulture, including filtration sizing, manifold hydraulics, emitter discharge calibration, and fertigation.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80',
    modules: [
      {
        id: 'dp1',
        title: 'Module 1: Hydraulic Sizing, Flow Rate & Pressure Head',
        durationMinutes: 55,
        content: 'Calculating total daily crop water requirement (evapotranspiration ETc in mm/day), sizing mainline PVC and sub-main HDPE pipes to maintain 1.0 to 1.5 bar operating pressure throughout lateral lines.',
        fieldChecklist: [
          'Calculate peak daily water demand: Crop area (m²) x ETc (mm/day) = Liters needed.',
          'Verify elevation drop or pump head to guarantee minimum 1.0 bar at furthest emitter.',
          'Install pressure relief and air release valves at the highest and lowest manifold positions.'
        ]
      },
      {
        id: 'dp2',
        title: 'Module 2: Water Filtration & Disc/Screen Maintenance',
        durationMinutes: 60,
        content: 'Selecting between 120-mesh disc filters and media sand filters based on water source (borehole vs river), preventing algal clogging, and executing automated or manual backwashing.',
        fieldChecklist: [
          'Never run drip lines without a functioning 120-mesh (130-micron) primary filter.',
          'Flush drip sub-main ends weekly by opening flush valves for 60 seconds.',
          'Conduct periodic acid or hydrogen peroxide flushes to dissolve calcium carbonate scaling.'
        ]
      },
      {
        id: 'dp3',
        title: 'Module 3: Venturi Injectors & Uniform Fertigation',
        durationMinutes: 65,
        content: 'Installing a Venturi bypass injector to apply fully water-soluble fertilizers directly into root zones, timing application during the middle third of irrigation cycles.',
        fieldChecklist: [
          'Only inject 100% water-soluble fertilizers (e.g. Calcium Nitrate, Potassium Nitrate).',
          'Irrigate with pure water first, inject fertilizer, and flush lines with clean water to prevent fungal buildup.',
          'Check Electrical Conductivity (EC) of emitter discharge using a portable EC pen.'
        ]
      }
    ],
    quiz: [
      {
        question: 'When during an irrigation cycle should fertigation (injecting soluble fertilizers through drip lines) take place?',
        options: [
          'At the very beginning of the cycle only',
          'During the middle third of the irrigation cycle, followed by clean water flushing',
          'At the very end of the cycle right before turning off water',
          'Only when pipes are dry'
        ],
        correctIndex: 1,
        explanation: 'Fertigation should occur during the middle third of the cycle so root zones are already pre-moistened for optimal nutrient uptake, and the subsequent clean water flush clears all fertilizer residue from lines and emitters.'
      }
    ]
  }
];

