export interface AgriEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  county: string;
  category: 'Workshop' | 'Exhibition' | 'Seed Swap' | 'Field Day';
  attendeesCount: number;
  description: string;
  image?: string;
}

export const eventsData: AgriEvent[] = [
  {
    id: 'evt-1',
    title: 'Spring Seedling Swap & Allotment Day',
    date: 'Saturday, 18 Oct 2026',
    time: '09:00 - 14:00',
    location: 'Community Allotment Shed & Garden',
    county: 'Nakuru / Bath Sites',
    category: 'Seed Swap',
    attendeesCount: 48,
    description: 'Bring your surplus tomato, runner bean, and herb seedlings to trade with neighboring growers! Organic compost demos on site.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-2',
    title: 'Eldoret Regional Agribusiness & Grain Expo',
    date: 'Thursday, 22 Oct 2026',
    time: '08:30 - 17:00',
    location: 'Eldoret Showground',
    county: 'Uasin Gishu',
    category: 'Exhibition',
    attendeesCount: 230,
    description: 'Meet certified seed breeders, mechanization experts, and bulk grain buyers. Live combine harvester demonstrations.',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-3',
    title: 'Drip Irrigation & Soil Health Masterclass',
    date: 'Wednesday, 28 Oct 2026',
    time: '10:00 - 13:00',
    location: 'KALRO Demonstration Farm',
    county: 'Machakos',
    category: 'Workshop',
    attendeesCount: 65,
    description: 'Hands-on training in solar-powered drip emitters, fertigation, and soil pH management for dryland horticulture.',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80'
  }
];
