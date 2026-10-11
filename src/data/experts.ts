import { ExpertQuestion } from '../types';

export const expertDirectory = [
  {
    id: 'exp-1',
    name: 'Dr. Beatrice Wambui, PhD',
    title: 'Senior Agronomist & Cereal Crop Specialist',
    organization: 'Former Senior Researcher, KALRO Njoro',
    qualification: 'PhD in Plant Breeding & Crop Protection (UoN), 22 years field experience',
    county: 'Nakuru',
    specialties: ['Maize Genetics', 'Wheat Rust Management', 'Soil Fertility', 'Crop Rotation'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    verified: true,
    questionsAnswered: 148
  },
  {
    id: 'exp-2',
    name: 'Dr. Julius Kipkorir, BVM, MSc',
    title: 'Veterinary Surgeon & Dairy Herd Health Specialist',
    organization: 'Livestock Health Consultants East Africa',
    qualification: 'Bachelor of Veterinary Medicine (UoN), Registered with Kenya Veterinary Board (KVB)',
    county: 'Uasin Gishu',
    specialties: ['Zero-Grazing Herd Health', 'Mastitis Control', 'Tick-Borne Diseases', 'Ration Balancing'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    verified: true,
    questionsAnswered: 215
  },
  {
    id: 'exp-3',
    name: 'Eng. Francis Mutua',
    title: 'Agricultural & Irrigation Engineer',
    organization: 'Water & Soil Conservation Advisory',
    qualification: 'BSc Agricultural & Biosystems Engineering (JKUAT), EPRA Solar Pumping Certified',
    county: 'Machakos',
    specialties: ['Drip Irrigation Design', 'Solar Pumping', 'Farm Pond Lining', 'Soil Terracing'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    verified: true,
    questionsAnswered: 96
  }
];

export const expertQuestionsData: ExpertQuestion[] = [
  {
    id: 'q-101',
    title: 'Maize leaves showing yellow V-shaped tips in Trans Nzoia — is it disease or fertilizer?',
    farmerName: 'Solomon Wafula',
    county: 'Trans Nzoia',
    topic: 'Crop Nutrition & Fertility',
    cropOrLivestock: 'Maize (H628)',
    dateSubmitted: '2026-10-09',
    description: 'My 5-acre maize field is at knee-high stage. The bottom leaves are turning bright yellow starting from the leaf tips and traveling down the central midrib. The top leaves are still pale green. Does this require spraying or fertilizer?',
    status: 'Answered',
    upvotes: 24,
    expertAnswer: {
      expertName: 'Dr. Beatrice Wambui, PhD',
      expertTitle: 'Senior Agronomist & Cereal Crop Specialist',
      qualification: 'KALRO Njoro / Plant Breeding PhD',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      answerText: 'Hello Solomon. This is a classic textbook symptom of Nitrogen (N) deficiency, not a fungal disease. Because nitrogen is a mobile nutrient inside the maize plant, the plant translocates nitrogen from older lower leaves to feed the actively growing upper shoot. The signature V-shaped yellowing down the midrib confirms severe nitrogen depletion.',
      answeredDate: '2026-10-10',
      recommendations: [
        'Do not apply fungicides; they will not solve nutrient starvation.',
        'Apply CAN (Calcium Ammonium Nitrate 26% N) at 50 to 75 kg per acre immediately while the soil is moist.',
        'Band the fertilizer 10–15 cm away from the stems and incorporate lightly with soil.',
        'The crop will green up noticeably within 5 to 7 days.'
      ]
    },
    farmerFollowUp: 'Thank you Dr. Beatrice! Applied 1 bag CAN per acre following your advice; plants are already turning deep dark green.'
  },
  {
    id: 'q-102',
    title: 'High-yielding Friesian cow developing watery milk and hard swollen left rear quarter',
    farmerName: 'Mary Wangari',
    county: 'Kiambu',
    topic: 'Veterinary Medicine & Herd Health',
    cropOrLivestock: 'Dairy Cow (Friesian)',
    dateSubmitted: '2026-10-08',
    description: 'My cow calved 3 weeks ago and was giving 28 liters/day. Yesterday her left rear quarter became hot, swollen, and rock-hard. Her milk came out watery with yellowish clots. She refuses to let the milker touch that side and has a slight fever.',
    status: 'Answered',
    upvotes: 31,
    expertAnswer: {
      expertName: 'Dr. Julius Kipkorir, BVM',
      expertTitle: 'Veterinary Surgeon',
      qualification: 'KVB Registered Veterinary Surgeon',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      answerText: 'Mary, your cow has Acute Clinical Mastitis, likely caused by environmental pathogens (such as Streptococcus uberis or coliforms). This is an urgent veterinary situation requiring prompt intervention to save the quarter from permanent tissue necrosis.',
      answeredDate: '2026-10-08',
      recommendations: [
        'Call your local registered veterinary officer immediately for systemic antibiotic and anti-inflammatory therapy (e.g. Flunixin meglumine).',
        'Milk out the affected quarter completely into a bucket every 2 to 3 hours to flush out bacterial toxins. Discard this milk; do not mix it with the bulk milk tank.',
        'Apply cold water compresses or ice packs to the swollen quarter to reduce pain and inflammation.',
        'Clean resting cubicle thoroughly and replenish with fresh dry sawdust to stop environmental reinfection.'
      ]
    }
  }
];
