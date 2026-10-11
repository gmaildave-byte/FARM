import { ForumPost } from '../types';

export const forumPostsData: ForumPost[] = [
  {
    id: 'post-tomato-harvest',
    authorName: 'Sarah M.',
    authorInitials: 'SM',
    authorRole: 'Organic Horticulturist',
    location: 'Bristol Leighwoods',
    county: 'Nakuru',
    category: 'Crops',
    title: 'First tomato harvest of the season! 🍅',
    content: 'First tomato harvest of the season! 🍅',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80',
    timestamp: '2h',
    likes: 24,
    commentsCount: 6,
    tags: ['Tomatoes', 'Harvest', 'Organic', 'Horticulture'],
    replies: [
      {
        id: 'rep-tom-1',
        author: 'David K.',
        authorRole: 'Greenhouse Farmer',
        text: 'Those look absolutely perfect and ripe! What variety did you plant? Anna F1 or Money Maker?',
        timestamp: '1h ago'
      },
      {
        id: 'rep-tom-2',
        author: 'Sarah M.',
        authorRole: 'Author',
        text: 'Thank you! These are Anna F1 grown under light mulch with drip irrigation. Incredible fruit setting this year!',
        timestamp: '45m ago'
      },
      {
        id: 'rep-tom-3',
        author: 'Grace Njeri',
        authorRole: 'Smallholder Farmer',
        text: 'Did you use any calcium nitrate spray to avoid blossom end rot? Mine struggled a bit last month.',
        timestamp: '30m ago'
      },
      {
        id: 'rep-tom-4',
        author: 'Sarah M.',
        authorRole: 'Author',
        text: 'Yes! Applied foliar calcium right when the first fruit cluster started sizing up. Really made a difference.',
        timestamp: '20m ago'
      },
      {
        id: 'rep-tom-5',
        author: 'Peter Otieno',
        authorRole: 'Market Trader',
        text: 'Great quality! The Marikiti price for grade 1 crates is currently hovering around KES 4,500.',
        timestamp: '15m ago'
      },
      {
        id: 'rep-tom-6',
        author: 'Tom H.',
        authorRole: 'Community Member',
        text: 'Stunning basket! Well done Sarah.',
        timestamp: '5m ago'
      }
    ]
  },
  {
    id: 'post-runner-beans',
    authorName: 'Tom H.',
    authorInitials: 'TH',
    authorRole: 'Allotment Gardener',
    location: 'Bath Sites',
    county: 'Machakos',
    category: 'Crops',
    title: 'Anyone got spare runner bean seedlings to swap?',
    content: 'Anyone got spare runner bean seedlings to swap?',
    timestamp: '5h',
    likes: 12,
    commentsCount: 4,
    tags: ['Seedling Swap', 'Runner Beans', 'Allotment', 'Seeds'],
    replies: [
      {
        id: 'rep-bean-1',
        author: 'Mary W.',
        authorRole: 'Urban Grower',
        text: 'I have about 8 healthy Scarlet Emperor seedlings in paper pots ready! Happy to swap for some kale slips if you have any?',
        timestamp: '4h ago'
      },
      {
        id: 'rep-bean-2',
        author: 'Tom H.',
        authorRole: 'Author',
        text: 'Sounds great Mary! I have plenty of Thousand-Headed kale seedlings. Let\'s meet at the allotment shed tomorrow morning.',
        timestamp: '3h ago'
      },
      {
        id: 'rep-bean-3',
        author: 'James C.',
        authorRole: 'Farmer',
        text: 'Remember to stake with strong bamboo canes before the vines reach 20cm—wind was fierce yesterday!',
        timestamp: '2h ago'
      },
      {
        id: 'rep-bean-4',
        author: 'Tom H.',
        authorRole: 'Author',
        text: 'Will do, thanks for the reminder James!',
        timestamp: '1h ago'
      }
    ]
  },
  {
    id: 'post-maize-harvest',
    authorName: 'Erick K.',
    authorInitials: 'EK',
    authorRole: 'Commercial Maize Farmer',
    location: 'Eldoret, Uasin Gishu',
    county: 'Uasin Gishu',
    category: 'Crops',
    title: 'Drying down our SC Duma maize crop after early rains 🌽',
    content: 'In my block planted with SC Duma 43, the crop escaped the mid-season dry spell and is currently drying down nicely with tight, filled cobs. Moisture meter currently reads 15.2%!',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80',
    timestamp: '1d',
    likes: 38,
    commentsCount: 5,
    tags: ['Maize', 'Hybrid Seed', 'Climate Adaptation', 'Uasin Gishu'],
    replies: [
      {
        id: 'rep-maize-1',
        author: 'Lydia Wanjiru',
        authorRole: 'Agronomist',
        text: 'Erick, this matches research data from KALRO. Medium-duration hybrids (115–130 days) provide critical insurance compared to late-maturing varieties.',
        timestamp: '22h ago'
      },
      {
        id: 'rep-maize-2',
        author: 'Kiprono Cheruiyot',
        authorRole: 'Farmer',
        text: 'Good job Erick! Make sure moisture drops below 13.5% before bagging with hermetic bags to prevent any aflatoxin risk.',
        timestamp: '18h ago'
      }
    ]
  },
  {
    id: 'post-dairy-silage',
    authorName: 'Ann M.',
    authorInitials: 'AM',
    authorRole: 'Zero-Grazing Dairy Keeper',
    location: 'Nyeri Highlands',
    county: 'Nyeri',
    category: 'Dairy & Livestock',
    title: 'How we increased dairy milk yield from 12 to 19 litres using corn silage & Brachiaria 🐄',
    content: 'Two seasons ago we rented 1 acre to grow maize specifically for pit silage, and planted Brachiaria grass on our farm borders. The cows love the silage aroma and milk yields jumped within two weeks. Most importantly, milk production did not drop during the dry month!',
    image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1000&q=80',
    timestamp: '2d',
    likes: 54,
    commentsCount: 7,
    tags: ['Dairy Farming', 'Corn Silage', 'Brachiaria', 'Milk Yield', 'Zero-Grazing'],
    replies: [
      {
        id: 'rep-sil-1',
        author: 'Geoffrey O.',
        authorRole: 'Dairy Farmer',
        text: 'Did you use any silage inoculant when packing the pit, Ann? And what was your chopping length?',
        timestamp: '1d ago'
      },
      {
        id: 'rep-sil-2',
        author: 'Ann M.',
        authorRole: 'Author',
        text: 'We chopped at 2cm with a motorized chaff cutter and sprinkled diluted molasses (1:3 with water) across layers while compacting with tractor tires. Compacting until no air pockets remain is the secret!',
        timestamp: '1d ago'
      }
    ]
  }
];
