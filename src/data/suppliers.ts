import { Supplier } from '../types';

export const suppliersData: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Kenya Seed Company (KSC)',
    category: 'seeds',
    countiesServed: ['Trans Nzoia', 'Uasin Gishu', 'Nakuru', 'Nairobi', 'Machakos', 'Kakamega', 'Meru', 'All 47 Counties'],
    location: 'Headquarters: Kitale | Depots Nationwide',
    contactPhone: '+254 722 205 144',
    email: 'info@kenyaseed.co.ke',
    certifiedBy: 'KEPHIS Seed Cert No. KSC-001',
    verifiedStatus: true,
    productsOffered: ['Certified Hybrid Maize (H614D, H628, H513)', 'Wheat Seed', 'Pasture Grasses (Boma Rhodes)', 'Sorghum Seed'],
    description: 'National certified seed producer supplying climate-tailored hybrid and open-pollinated seed varieties across East Africa.'
  },
  {
    id: 'sup-2',
    name: 'Simlaw Seeds Company',
    category: 'seeds',
    countiesServed: ['Nairobi', 'Kiambu', 'Kirinyaga', 'Nakuru', 'Machakos', 'All Counties'],
    location: 'Kijabe Street, Nairobi',
    contactPhone: '+254 722 200 545',
    email: 'simlaw@simlaw.co.ke',
    certifiedBy: 'KEPHIS Certified Seeds',
    verifiedStatus: true,
    productsOffered: ['Horticultural Seeds (Cabbage Gloria F1, Collards Mfalme, Tomatoes, Carrots, Onions, Coriander)'],
    description: 'Specialist horticultural vegetable, flower, and herb seed distributor established over 80 years in Kenya.'
  },
  {
    id: 'sup-3',
    name: 'Yara East Africa Ltd',
    category: 'fertilizer',
    countiesServed: ['Uasin Gishu', 'Nakuru', 'Kiambu', 'Murang\'a', 'Meru', 'Bungoma', 'Nandi'],
    location: 'Commercial Street, Industrial Area, Nairobi',
    contactPhone: '+254 703 052 000',
    email: 'yara.kenya@yara.com',
    certifiedBy: 'Kenya Bureau of Standards (KEBS)',
    verifiedStatus: true,
    productsOffered: ['YaraMila Power', 'YaraBela Sulfan (CAN + Sulfur)', 'YaraLiva Nitrabor (Calcium Borate)', 'Foliar Micronutrients (YaraVita)'],
    description: 'Global mineral fertilizer producer delivering crop-targeted nutrition and agronomic soil diagnostic guidance.'
  },
  {
    id: 'sup-4',
    name: 'Unga Farm Care (EA) Ltd',
    category: 'feeds',
    countiesServed: ['Nairobi', 'Kiambu', 'Nakuru', 'Eldoret', 'Kisumu', 'Mombasa', 'Nyeri'],
    location: 'Commercial Street, Nairobi',
    contactPhone: '+254 719 065 000',
    email: 'customercare@unga.com',
    certifiedBy: 'KEBS Feed Quality Standards',
    verifiedStatus: true,
    productsOffered: ['Fugo Dairy Meal (High Yield)', 'Fugo Layers Mash', 'Fugo Broiler Starter/Finisher', 'Pig Creep Pellets', 'Dog Food'],
    description: 'Kenya\'s pioneer animal feed manufacturer producing ISO-certified rations for dairy, poultry, and swine.'
  },
  {
    id: 'sup-5',
    name: 'Davis & Shirtliff Ltd',
    category: 'irrigation',
    countiesServed: ['All 47 Counties (Over 70 branches nationwide)'],
    location: 'D&S Complex, Dundori Road, Nairobi',
    contactPhone: '+254 711 079 000',
    email: 'contactus@dayliff.com',
    certifiedBy: 'Energy & Petroleum Regulatory Authority (EPRA) Solar Licensed',
    verifiedStatus: true,
    productsOffered: ['Dayliff Solar Submersible Water Pumps', 'Drip Irrigation Kits', 'Water Treatment & Filtration', 'Diesel Genset Pumps'],
    description: 'Leading provider of water and energy equipment in the region, specializing in off-grid solar-powered borehole and irrigation solutions.'
  },
  {
    id: 'sup-6',
    name: 'Amiran Kenya Ltd',
    category: 'machinery',
    countiesServed: ['Nairobi', 'Nakuru', 'Eldoret', 'Meru', 'Machakos', 'Kirinyaga'],
    location: 'Old Airport North Road, Embakasi, Nairobi',
    contactPhone: '+254 719 095 000',
    email: 'amiran@amirankenya.com',
    certifiedBy: 'Agricultural Machinery Board',
    verifiedStatus: true,
    productsOffered: ['Amiran Farmer’s Kit (AFK)', 'Greenhouse Polythene & Steel Structures', 'Knapsack & Motorized Sprayers', 'Precision Drip Lines'],
    description: 'Comprehensive agrotechnology provider introducing modern greenhouse technology, drip lines, and agrochemicals to Kenyan smallholders.'
  }
];
