export type Page =
  | 'home'
  | 'explore'
  | 'crops'
  | 'crop-detail'
  | 'livestock'
  | 'soil-water'
  | 'pests'
  | 'weather'
  | 'farm-manager'
  | 'calculators'
  | 'markets'
  | 'marketplace'
  | 'marketplace-create'
  | 'social-feed'
  | 'community'
  | 'profile'
  | 'messages'
  | 'notifications'
  | 'suppliers'
  | 'sustainable'
  | 'learning'
  | 'expert'
  | 'ai-assistant'
  | 'opportunities'
  | 'farm-business'
  | 'admin-cms'
  | 'about'
  | 'events';

export type UserRole =
  | 'guest'
  | 'farmer'
  | 'buyer'
  | 'expert'
  | 'editor'
  | 'moderator'
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  county: string;
  username?: string;
  avatar?: string;
  coverImage?: string;
  userType?: 'farmer' | 'buyer' | 'supplier' | 'expert' | 'agribusiness';
  country?: string;
  phone?: string;
  farmName?: string;
  bio?: string;
  farmingInterests?: string[];
  joinedDate?: string;
  followersCount?: number;
  followingCount?: number;
  verifiedBadge?: boolean;
  publicLinks?: {
    website?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface FounderProfile {
  name: string;
  attribution: string;
  title: string;
  bio: string;
  avatar: string;
  country: string;
  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export interface SocialPost {
  id: string;
  authorId: string;
  authorUsername: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  authorVerified?: boolean;
  publishedAt: string;
  category: 'Farming Tips' | 'Questions' | 'Crop Farming' | 'Livestock' | 'Farm Products' | 'Agricultural Services' | 'Success Stories' | 'Market Updates';
  county?: string;
  content: string;
  images?: string[];
  tags: string[];
  likesCount: number;
  likedByCurrentUser?: boolean;
  commentsCount: number;
  bookmarksCount?: number;
  bookmarkedByCurrentUser?: boolean;
  linkedListingId?: string;
  linkedListingTitle?: string;
  linkedListingPrice?: number;
  linkedListingUnit?: string;
  linkedListingImage?: string;
  comments?: PostComment[];
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorUsername: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  replies?: CommentReply[];
}

export interface CommentReply {
  id: string;
  commentId: string;
  authorId: string;
  authorUsername: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export type ListingType = 'Product' | 'Service';

export interface MarketplaceListing {
  id: string;
  sellerId: string;
  sellerUsername: string;
  sellerName: string;
  sellerAvatar: string;
  sellerVerified: boolean;
  title: string;
  type: ListingType;
  category: string;
  subcategory?: string;
  description: string;
  priceKES: number;
  pricingUnit: string;
  isNegotiable?: boolean;
  county: string;
  specificLocation?: string;
  images: string[];
  quantityAvailable?: number;
  quantityUnit?: string;
  deliveryOption: 'Pickup only' | 'Seller delivers' | 'Courier / Freight arranged' | 'On-site service';
  deliveryFeeKES?: number;
  status: 'active' | 'sold' | 'booked' | 'paused';
  createdAt: string;
  enquiriesCount?: number;
}

export interface DirectMessage {
  id: string;
  conversationId: string;
  senderUsername: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  attachedListingId?: string;
  attachedListingTitle?: string;
}

export interface Conversation {
  id: string;
  participantUsernames: string[];
  participantNames: string[];
  participantAvatars: Record<string, string>;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  linkedListingId?: string;
  linkedListingTitle?: string;
  messages: DirectMessage[];
}

export interface NotificationItem {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'message' | 'enquiry';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  targetUsername?: string;
  targetPostId?: string;
  targetListingId?: string;
}

export type CropCategory =
  | 'cereals'
  | 'legumes'
  | 'vegetables'
  | 'roots-tubers'
  | 'fruits'
  | 'cash-industrial'
  | 'fodder';

export interface CropVariety {
  name: string;
  altitudeZones: string;
  maturityDays: string;
  yieldPotential: string;
  specialTraits: string;
}

export interface Crop {
  id: string;
  name: string;
  swahiliName: string;
  botanicalName: string;
  category: CropCategory;
  image: string;
  economicImportance: string;
  climaticZones: string;
  altitudeRange: string;
  temperatureRange: string;
  rainfallAnnual: string;
  soilRequirements: string;
  soilPhRange: string;
  varieties: CropVariety[];
  plantingSeasons: {
    longRains: string;
    shortRains: string;
  };
  seedRatePerAcre: string;
  spacing: {
    rowCm: number;
    plantCm: number;
    description: string;
  };
  plantPopulationPerAcre: number;
  landPreparation: string;
  fertilizerSchedule: {
    stage: string;
    fertilizerType: string;
    ratePerAcre: string;
    notes: string;
  }[];
  waterRequirements: string;
  weedControl: string;
  commonPests: string[];
  commonDiseases: string[];
  maturityDays: string;
  harvestIndicators: string;
  yieldPerAcre: string;
  postHarvestHandling: string;
  marketOpportunities: string;
  profitabilityExample: {
    costKES: number;
    revenueKES: number;
    profitKES: number;
    assumptions: string;
  };
  mistakesToAvoid: string[];
  citations: string[];
  isFeatured?: boolean;
}

export type LivestockCategory =
  | 'dairy-cattle'
  | 'beef-cattle'
  | 'goats'
  | 'sheep'
  | 'poultry'
  | 'pigs'
  | 'rabbits'
  | 'aquaculture'
  | 'beekeeping'
  | 'camels';

export interface LivestockBreed {
  name: string;
  origin: string;
  characteristics: string;
  productionYield: string;
  suitability: string;
}

export interface LivestockGuide {
  id: string;
  species: string;
  swahiliName: string;
  scientificName: string;
  category: LivestockCategory;
  image: string;
  overview: string;
  breeds: LivestockBreed[];
  housingRequirements: string;
  spacePerAnimal: string;
  feedingNutrition: {
    roughageOrMain: string;
    concentrates: string;
    mineralsAndVitamins: string;
    waterLitersPerDay: string;
  };
  breedingReproduction: string;
  youngStockCare: string;
  vaccinationSchedule: {
    timing: string;
    disease: string;
    vaccine: string;
    route: string;
    notes: string;
  }[];
  biosecurity: string[];
  commonDiseases: {
    disease: string;
    symptoms: string;
    prevention: string;
  }[];
  productionMetrics: string;
  welfareAndWaste: string;
  economicsExample: {
    setupCostKES: number;
    monthlyOperatingKES: number;
    monthlyRevenueKES: number;
    breakEvenMonths: string;
  };
  citations: string[];
}

export interface PestOrDisease {
  id: string;
  name: string;
  swahiliName: string;
  scientificName: string;
  type: 'pest' | 'disease' | 'weed';
  affectedCropsOrAnimals: string[];
  symptoms: string[];
  conduciveConditions: string;
  similarProblems: string;
  prevention: string[];
  culturalControl: string;
  biologicalControl: string;
  chemicalControl: {
    registeredActiveIngredients: string;
    phiDays: number;
    reiHours: number;
    safetyPrecautions: string;
  };
  professionalAdviceTrigger: string;
  image: string;
  references: string;
}

export interface MarketPrice {
  id: string;
  commodity: string;
  swahiliCommodity: string;
  category: 'Cereals' | 'Legumes' | 'Vegetables' | 'Tubers' | 'Fruits' | 'Livestock & Dairy';
  unit: string;
  wholesalePriceKES: number;
  retailPriceKES: number;
  prevWeekKES: number;
  marketName: string;
  county: string;
  dateObserved: string;
  grade: string;
  trend: 'up' | 'down' | 'stable';
}

export interface ProduceListing {
  id: string;
  title: string;
  farmerName: string;
  farmerPhone: string;
  county: string;
  commodity: string;
  quantity: number;
  unit: string;
  pricePerUnitKES: number;
  harvestDate: string;
  isOrganic?: boolean;
  verifiedSeller: boolean;
  description: string;
  createdAt: string;
}

export interface BuyerRequest {
  id: string;
  title: string;
  buyerName: string;
  buyerCompany: string;
  county: string;
  commodity: string;
  quantityNeeded: string;
  targetPriceKES: number;
  unit: string;
  deadline: string;
  notes: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: 'seeds' | 'fertilizer' | 'feeds' | 'machinery' | 'irrigation' | 'soil-testing' | 'chemicals' | 'nurseries';
  countiesServed: string[];
  location: string;
  contactPhone: string;
  email?: string;
  certifiedBy: string;
  verifiedStatus: boolean;
  productsOffered: string[];
  description: string;
}

export interface CourseModule {
  id: string;
  title: string;
  durationMinutes: number;
  content: string;
  fieldChecklist: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  swahiliTitle?: string;
  swahiliName?: string;
  level: 'Beginner' | 'Intermediate' | 'Commercial';
  durationHours: number;
  modulesCount: number;
  description: string;
  image: string;
  modules: CourseModule[];
  quiz: QuizQuestion[];
  enrolled?: boolean;
  completed?: boolean;
  score?: number;
}

export interface ExpertQuestion {
  id: string;
  title: string;
  farmerName: string;
  county: string;
  topic: string;
  cropOrLivestock: string;
  dateSubmitted: string;
  description: string;
  status: 'Answered' | 'Under Review' | 'Needs Clarification';
  expertAnswer?: {
    expertName: string;
    expertTitle: string;
    qualification: string;
    avatar: string;
    answerText: string;
    answeredDate: string;
    recommendations: string[];
  };
  upvotes: number;
  farmerFollowUp?: string;
}

export interface ForumPost {
  id: string;
  authorName: string;
  authorInitials?: string;
  authorRole: string;
  location?: string;
  county: string;
  category: 'Crops' | 'Dairy & Livestock' | 'Soil & Fertilizers' | 'Markets & Prices' | 'General Farming';
  title: string;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  commentsCount?: number;
  tags: string[];
  replies: {
    id: string;
    author: string;
    authorRole: string;
    text: string;
    timestamp: string;
  }[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  organization: string;
  type: 'Grant' | 'Job' | 'Internship' | 'Training' | 'Tender';
  location: string;
  deadline: string;
  compensationOrFunding: string;
  eligibility: string;
  description: string;
  contactOrLink: string;
  verifiedDate: string;
}

// User Farm Management Models
export interface Farm {
  id: string;
  name: string;
  county: string;
  subCounty: string;
  acreage: number;
  soilType: string;
  waterSource: string;
  createdAt: string;
}

export interface FarmField {
  id: string;
  farmId: string;
  name: string;
  acreage: number;
  cropOrEnterprise: string;
  variety: string;
  plantingDate: string;
  targetHarvestDate: string;
  growthStage: 'Land Prep' | 'Vegetative' | 'Flowering' | 'Maturity / Harvest' | 'Post-Harvest';
}

export interface FarmActivity {
  id: string;
  farmId: string;
  date: string;
  activityType: 'Planting' | 'Weeding' | 'Spraying' | 'Fertilizing' | 'Irrigation' | 'Harvesting' | 'Livestock';
  details: string;
  costKES?: number;
  completed: boolean;
}

export interface FarmFinancialRecord {
  id: string;
  farmId: string;
  date: string;
  type: 'Income' | 'Expense';
  category: 'Seeds/Seedlings' | 'Fertilizers' | 'Pesticides' | 'Labor' | 'Machinery/Fuel' | 'Livestock Feed' | 'Veterinary' | 'Harvest Sales' | 'Other';
  amountKES: number;
  notes: string;
}

export interface FarmHarvestRecord {
  id: string;
  farmId: string;
  date: string;
  enterprise: string;
  quantity: number;
  unit: string;
  grade: string;
  storedOrSold: 'Stored' | 'Sold' | 'Consumed';
  revenueRealizedKES?: number;
}
