import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  Plus,
  Bookmark,
  Share2,
  Flag,
  MapPin,
  ShieldCheck,
  Phone,
  MessageCircle,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
  DollarSign,
  Tag,
  ArrowRight
} from 'lucide-react';
import { initialMarketplaceListings } from '../data/marketplaceListings';
import { MarketplaceListing, MarketplaceCategory, BuyerEnquiry, ReportItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { kenyanCounties } from '../components/Navbar';

interface MarketplacePageProps {
  onSelectSellerProfile?: (username: string) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onSelectSellerProfile }) => {
  const { user, isAuthenticated } = useAuth();
  const [listings, setListings] = useState<MarketplaceListing[]>(initialMarketplaceListings);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewFilter, setViewFilter] = useState<'all' | 'saved' | 'my-listings'>('all');

  // Enquiries & Reports state
  const [enquiries, setEnquiries] = useState<BuyerEnquiry[]>([]);
  const [savedListingIds, setSavedListingIds] = useState<Record<string, boolean>>({});

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeListingForDetail, setActiveListingForDetail] = useState<MarketplaceListing | null>(null);
  const [activeListingForEnquiry, setActiveListingForEnquiry] = useState<MarketplaceListing | null>(null);
  const [activeListingForReport, setActiveListingForReport] = useState<MarketplaceListing | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MarketplaceCategory>('seeds');
  const [newPrice, setNewPrice] = useState<number>(1000);
  const [newUnit, setNewUnit] = useState('per bag');
  const [newIsNegotiable, setNewIsNegotiable] = useState(true);
  const [newCounty, setNewCounty] = useState('Uasin Gishu');
  const [newSubCounty, setNewSubCounty] = useState('');
  const [newPhone, setNewPhone] = useState('+254 7');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80');
  const [newDeliveryTerms, setNewDeliveryTerms] = useState('Pick up at farm gate or local regional delivery by arrangement.');
  const [newPaymentTerms, setNewPaymentTerms] = useState('Payment upon inspection and collection (Cash or M-PESA).');
  const [newDescription, setNewDescription] = useState('');

  // Enquiry Form State
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquiryQuantity, setEnquiryQuantity] = useState('1');
  const [enquiryBuyerPhone, setEnquiryBuyerPhone] = useState('+254 7');

  // Report Form State
  const [reportReason, setReportReason] = useState<ReportItem['reason']>('misleading_claim');
  const [reportDetails, setReportDetails] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Products & Services' },
    { id: 'seeds', label: 'Seeds & Seedlings' },
    { id: 'fertilizers', label: 'Fertilizers & Soil' },
    { id: 'machinery', label: 'Farm Tools & Machinery' },
    { id: 'irrigation', label: 'Irrigation Equipment' },
    { id: 'feeds', label: 'Animal Feeds' },
    { id: 'livestock', label: 'Livestock & Breeding' },
    { id: 'produce', label: 'Fresh Harvested Produce' },
    { id: 'transport', label: 'Farm Logistics & Transport' },
    { id: 'consulting', label: 'Agronomy Consulting' },
    { id: 'veterinary', label: 'Veterinary Services' },
    { id: 'mechanization', label: 'Mechanization & Repairs' },
    { id: 'processing', label: 'Processing & Packaging' },
  ];

  const handleToggleSave = (id: string) => {
    setSavedListingIds((prev) => {
      const isSaved = !prev[id];
      setListings((items) =>
        items.map((it) =>
          it.id === id ? { ...it, savesCount: (it.savesCount ?? 0) + (isSaved ? 1 : -1) } : it
        )
      );
      showToast(isSaved ? 'Listing saved to your bookmarks' : 'Listing removed from bookmarks');
      return { ...prev, [id]: isSaved };
    });
  };

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || newPrice <= 0) {
      alert('Please provide a valid listing title and positive price.');
      return;
    }

    const created: MarketplaceListing = {
      id: `mkt-${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim() || 'Quality agricultural product listed on AgriKnowledge Hub.',
      category: newCategory,
      priceKES: Number(newPrice),
      isNegotiable: newIsNegotiable,
      unit: newUnit,
      images: [newImageUrl],
      county: newCounty,
      subCounty: newSubCounty || undefined,
      sellerId: user?.id || 'user-farmer-1',
      sellerName: user?.name || 'Registered Farmer',
      sellerUsername: user?.username || 'farmer_kenya',
      sellerPhone: newPhone || user?.phone || '+254 700 000 000',
      sellerRating: 5.0,
      verifiedSeller: true,
      status: 'active',
      deliveryTerms: newDeliveryTerms,
      paymentTerms: newPaymentTerms,
      createdAt: new Date().toISOString().split('T')[0],
      savesCount: 0,
    };

    setListings([created, ...listings]);
    setCreateModalOpen(false);
    showToast('Marketplace listing published successfully!');
    // Reset
    setNewTitle('');
    setNewDescription('');
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeListingForEnquiry) return;

    const newEnquiry: BuyerEnquiry = {
      id: `enq-${Date.now()}`,
      listingId: activeListingForEnquiry.id,
      listingTitle: activeListingForEnquiry.title,
      buyerId: user?.id || 'guest',
      buyerName: user?.name || 'Potential Buyer',
      buyerPhone: enquiryBuyerPhone,
      sellerId: activeListingForEnquiry.sellerId,
      message: enquiryMessage.trim() || `Interested in purchasing ${enquiryQuantity} ${activeListingForEnquiry.unit || 'units'}.`,
      quantity: enquiryQuantity,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    setEnquiries([newEnquiry, ...enquiries]);
    setActiveListingForEnquiry(null);
    setEnquiryMessage('');
    showToast(`Enquiry sent directly to ${activeListingForEnquiry.sellerName}!`);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeListingForReport) return;

    const report: ReportItem = {
      id: `rep-${Date.now()}`,
      targetType: 'listing',
      targetId: activeListingForReport.id,
      targetTitle: activeListingForReport.title,
      reportedBy: user?.name || 'Anonymous User',
      reason: reportReason,
      details: reportDetails.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    // Save to local storage for Admin CMS queue
    const existing = JSON.parse(localStorage.getItem('agri_moderation_reports') || '[]');
    localStorage.setItem('agri_moderation_reports', JSON.stringify([report, ...existing]));

    setActiveListingForReport(null);
    setReportDetails('');
    showToast('Report submitted. Platform moderators will review within 24 hours.');
  };

  const filteredListings = listings.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesCounty = selectedCounty === 'all' || item.county === selectedCounty;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.county.toLowerCase().includes(searchQuery.toLowerCase());

    if (viewFilter === 'saved') {
      return matchesCat && matchesCounty && matchesSearch && savedListingIds[item.id];
    }
    if (viewFilter === 'my-listings') {
      return matchesCat && matchesCounty && matchesSearch && (item.sellerId === user?.id || item.sellerUsername === user?.username);
    }
    return matchesCat && matchesCounty && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#183D29] text-[#FAF7F0] text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-emerald-700 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#183D29] text-[#FAF7F0] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#122e1f] rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <ShoppingBag className="w-3.5 h-3.5" />
            Direct Agricultural Commerce & Farm Inputs Marketplace
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif">
            Agricultural Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            Trade certified seeds, fertilizers, farm machinery, irrigation systems, livestock feeds, and fresh harvests directly with verified farmers, cooperatives, and agribusinesses in Kenya.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#183D29] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shadow-xs"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Post a Product or Service Listing</span>
            </button>
            <div className="inline-flex items-center gap-1 text-xs text-emerald-200 bg-[#122e1f] px-3 py-2 rounded-xl border border-emerald-800/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Transparent Delivery & Payment Disclosures</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Ribbon */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Keyword Search */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search listings by title, seller, crop, machinery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183D29]"
            />
          </div>

          {/* County Selector */}
          <div className="sm:col-span-3">
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#183D29]"
            >
              <option value="all">All Counties in Kenya</option>
              {kenyanCounties.filter((c) => !c.includes('National')).map((c) => (
                <option key={c} value={c}>
                  {c} County
                </option>
              ))}
            </select>
          </div>

          {/* View Filter: All / Saved / My */}
          <div className="sm:col-span-3 flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setViewFilter('all')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                viewFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setViewFilter('saved')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                viewFilter === 'saved'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Saved ({Object.values(savedListingIds).filter(Boolean).length})
            </button>
            <button
              onClick={() => setViewFilter('my-listings')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                viewFilter === 'my-listings'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              My Listings
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-stone-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-[#183D29] text-[#FAF7F0] font-semibold'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-600">
          <span>
            Showing <strong className="text-stone-900">{filteredListings.length}</strong> active agricultural listings
          </span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-[#183D29] hover:underline font-semibold"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-800 text-base">No listings found matching criteria</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Try adjusting your category, keyword search, or county filter. You can also publish the first listing in this category!
            </p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-4 py-2 bg-[#183D29] text-white rounded-xl text-xs font-bold hover:bg-[#122e1f] transition"
            >
              Create New Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((item) => {
              const isSaved = savedListingIds[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="h-48 w-full overflow-hidden relative bg-stone-100">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#183D29]/90 text-[#FAF7F0] text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize backdrop-blur-xs">
                      {item.category}
                    </div>
                    <button
                      onClick={() => handleToggleSave(item.id)}
                      className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-xs transition ${
                        isSaved
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 hover:bg-white text-stone-700'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Save Listing'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>{item.county}</span>
                          {item.subCounty && <span>· {item.subCounty}</span>}
                        </div>
                        <span className="text-[11px] text-stone-400">{item.createdAt}</span>
                      </div>

                      <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Price and Seller Badge */}
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-extrabold text-[#183D29]">
                            KES {item.priceKES.toLocaleString()}
                          </span>
                          {item.unit && (
                            <span className="text-xs text-stone-500 ml-1">/ {item.unit}</span>
                          )}
                        </div>
                        {item.isNegotiable && (
                          <span className="text-[10px] bg-stone-100 text-stone-600 font-semibold px-2 py-0.5 rounded">
                            Negotiable
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-stone-600">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-stone-800">{item.sellerName}</span>
                          {item.verifiedSeller && (
                            <span title="Verified Trader">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            </span>
                          )}
                        </div>
                        {item.sellerRating && (
                          <span className="text-[11px] text-amber-700 font-bold">★ {item.sellerRating}</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => setActiveListingForDetail(item)}
                          className="py-2 px-3 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition text-center"
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => setActiveListingForEnquiry(item)}
                          className="py-2 px-3 bg-[#183D29] text-white rounded-xl text-xs font-bold hover:bg-[#122e1f] transition flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Make Enquiry</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {activeListingForDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-stone-200 space-y-5 animate-in fade-in">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#183D29] uppercase tracking-wider">
                  {activeListingForDetail.category} · Listing #{activeListingForDetail.id}
                </span>
                <h2 className="text-xl font-bold text-stone-900 mt-1">{activeListingForDetail.title}</h2>
              </div>
              <button
                onClick={() => setActiveListingForDetail(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo */}
            <div className="h-64 rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={activeListingForDetail.images[0]}
                alt={activeListingForDetail.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Price Banner */}
            <div className="bg-[#183D29]/5 p-4 rounded-2xl border border-emerald-900/10 flex items-center justify-between">
              <div>
                <div className="text-xs text-stone-500 font-medium">Selling Price</div>
                <div className="text-2xl font-extrabold text-[#183D29]">
                  KES {activeListingForDetail.priceKES.toLocaleString()}{' '}
                  <span className="text-sm font-normal text-stone-600">
                    {activeListingForDetail.unit ? `(${activeListingForDetail.unit})` : ''}
                  </span>
                </div>
              </div>
              {activeListingForDetail.isNegotiable && (
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-full">
                  Price Negotiable
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Description & Specs</h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line bg-stone-50 p-4 rounded-2xl">
                {activeListingForDetail.description}
              </p>
            </div>

            {/* Terms Disclosures matching prompt rules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-1">
                <div className="font-bold text-stone-900">🚚 Delivery & Pickup Terms</div>
                <p className="text-stone-600">{activeListingForDetail.deliveryTerms}</p>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-1">
                <div className="font-bold text-stone-900">💳 Payment & Verification Terms</div>
                <p className="text-stone-600">{activeListingForDetail.paymentTerms}</p>
              </div>
            </div>

            {/* Seller Contact Info */}
            <div className="border-t border-stone-100 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#183D29] text-white flex items-center justify-center font-bold text-sm">
                  {activeListingForDetail.sellerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <span>{activeListingForDetail.sellerName}</span>
                    {activeListingForDetail.verifiedSeller && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <div className="text-xs text-stone-500">
                    Phone: {activeListingForDetail.sellerPhone} · {activeListingForDetail.county}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveListingForReport(activeListingForDetail);
                    setActiveListingForDetail(null);
                  }}
                  className="p-2.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                  title="Report Listing"
                >
                  <Flag className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setActiveListingForEnquiry(activeListingForDetail);
                    setActiveListingForDetail(null);
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-[#183D29] text-white rounded-xl text-xs font-bold hover:bg-[#122e1f] transition"
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      {activeListingForEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-bold text-stone-900 text-base">Send Direct Enquiry</h3>
                <p className="text-xs text-stone-500">To: {activeListingForEnquiry.sellerName}</p>
              </div>
              <button
                onClick={() => setActiveListingForEnquiry(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendEnquiry} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Listing</label>
                <div className="p-2.5 bg-stone-50 rounded-xl text-xs font-medium text-stone-800 border border-stone-200">
                  {activeListingForEnquiry.title} (KES {activeListingForEnquiry.priceKES.toLocaleString()})
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Quantity Required ({activeListingForEnquiry.unit || 'units'})
                </label>
                <input
                  type="text"
                  value={enquiryQuantity}
                  onChange={(e) => setEnquiryQuantity(e.target.value)}
                  placeholder="e.g. 5 bags or 20 crates"
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Contact Phone (for Seller Callback / WhatsApp)
                </label>
                <input
                  type="text"
                  value={enquiryBuyerPhone}
                  onChange={(e) => setEnquiryBuyerPhone(e.target.value)}
                  placeholder="+254 7..."
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Message or Offer</label>
                <textarea
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  placeholder="Ask about delivery dates, discount on bulk volume, or physical inspection..."
                  rows={3}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveListingForEnquiry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#183D29] text-white rounded-xl text-xs font-bold hover:bg-[#122e1f] transition"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {activeListingForReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-stone-900 text-base">Report Listing to Moderators</h3>
              </div>
              <button
                onClick={() => setActiveListingForReport(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendReport} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Reason for Report</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value as ReportItem['reason'])}
                  className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                >
                  <option value="misleading_claim">Misleading or false agricultural claims</option>
                  <option value="scam">Suspected fraud or fake payment request</option>
                  <option value="prohibited_goods">Prohibited or uncertified seed / chemical</option>
                  <option value="spam">Commercial spam or duplicate posting</option>
                  <option value="harassment">Harassment or inappropriate content</option>
                  <option value="unrelated">Non-agricultural product</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Additional Details</label>
                <textarea
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Explain why this listing violates AgriKnowledge Hub Marketplace Guidelines..."
                  rows={3}
                  required
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveListingForReport(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Listing Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl max-h-[92vh] overflow-y-auto p-6 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-bold text-stone-900 text-base">Post Marketplace Listing</h3>
                <p className="text-xs text-stone-500">Reach verified farmers, cooperatives, and buyers</p>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Listing Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Certified SC Duma 43 Seed Maize (10kg Bags)"
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as MarketplaceCategory)}
                    className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                  >
                    <option value="seeds">Seeds & Seedlings</option>
                    <option value="fertilizers">Fertilizers & Soil Amendments</option>
                    <option value="machinery">Farm Tools & Machinery</option>
                    <option value="irrigation">Irrigation Equipment</option>
                    <option value="feeds">Animal Feeds & Supplies</option>
                    <option value="livestock">Livestock & Breeding</option>
                    <option value="produce">Fresh Harvested Produce</option>
                    <option value="transport">Farm Logistics & Transport</option>
                    <option value="consulting">Agronomy Consulting</option>
                    <option value="veterinary">Veterinary Services</option>
                    <option value="mechanization">Mechanization & Repairs</option>
                    <option value="processing">Processing & Packaging</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">County</label>
                  <select
                    value={newCounty}
                    onChange={(e) => setNewCounty(e.target.value)}
                    className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                  >
                    {kenyanCounties.filter((c) => !c.includes('National')).map((c) => (
                      <option key={c} value={c}>
                        {c} County
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price (KES)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    min={1}
                    required
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Unit</label>
                  <input
                    type="text"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    placeholder="per bag, per acre, per kg"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Sub-County / Area</label>
                  <input
                    type="text"
                    value={newSubCounty}
                    onChange={(e) => setNewSubCounty(e.target.value)}
                    placeholder="e.g. Eldoret Central"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+254 7..."
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Detailed Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detail specifications, seed certification, machinery model, or harvest date..."
                  rows={3}
                  required
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Delivery Terms</label>
                  <input
                    type="text"
                    value={newDeliveryTerms}
                    onChange={(e) => setNewDeliveryTerms(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Payment Terms</label>
                  <input
                    type="text"
                    value={newPaymentTerms}
                    onChange={(e) => setNewPaymentTerms(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#183D29] text-white rounded-xl text-xs font-bold hover:bg-[#122e1f] transition"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
