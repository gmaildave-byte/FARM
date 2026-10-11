import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  PlusCircle,
  ShoppingBag,
  Filter,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  X,
  MessageSquare
} from 'lucide-react';
import { marketPricesData, produceListingsData, buyerRequestsData } from '../data/markets';
import { ProduceListing, BuyerRequest } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const MarketsPage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'prices' | 'listings' | 'buyers'>('prices');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Produce Listing Creation Modal
  const [listingModalOpen, setListingModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCommodity, setNewCommodity] = useState('Tomatoes');
  const [newQuantity, setNewQuantity] = useState(100);
  const [newUnit, setNewUnit] = useState('crates (64kg)');
  const [newPrice, setNewPrice] = useState(1400);
  const [newCounty, setNewCounty] = useState('Kirinyaga');
  const [newPhone, setNewPhone] = useState('+254 7');
  const [newDesc, setNewDesc] = useState('');
  const [listings, setListings] = useState<ProduceListing[]>(produceListingsData);
  const [listingSuccess, setListingSuccess] = useState(false);

  // Enquiry Modal
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeListingForEnquiry, setActiveListingForEnquiry] = useState<ProduceListing | null>(null);
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [enquirySent, setEnquirySent] = useState(false);

  const filteredPrices = marketPricesData.filter((mp) => {
    const matchesCat = selectedCategory === 'all' || mp.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      mp.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mp.swahiliCommodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mp.marketName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mp.county.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ProduceListing = {
      id: `pl-${Date.now()}`,
      title: newTitle || `${newQuantity} ${newUnit} of fresh ${newCommodity}`,
      farmerName: user?.name || 'Kiprono Cheruiyot',
      farmerPhone: newPhone || '+254 712 000 000',
      county: newCounty,
      commodity: newCommodity,
      quantity: newQuantity,
      unit: newUnit,
      pricePerUnitKES: newPrice,
      harvestDate: 'Ready for harvest',
      verifiedSeller: true,
      description: newDesc || 'High quality produce harvested under good agricultural practices.',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setListings([created, ...listings]);
    setListingSuccess(true);
    setTimeout(() => {
      setListingSuccess(false);
      setListingModalOpen(false);
    }, 1500);
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
    setTimeout(() => {
      setEnquirySent(false);
      setEnquiryModalOpen(false);
      setEnquiryMessage('');
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <TrendingUp className="w-3.5 h-3.5" />
            Agricultural Markets & Produce Trading Platform
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Markets, Produce Trading & Prices
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Transparent price intelligence across Nairobi, Eldoret, Nakuru, Kisumu, and Mombasa. Connect directly with buyers, list harvest produce, and review bulk procurement orders without intermediary price distortion.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('prices')}
            className={`pb-2 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'prices'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Wholesale & Retail Market Benchmarks
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-2 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'listings'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Farmer Produce Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab('buyers')}
            className={`pb-2 px-3 text-xs sm:text-sm font-bold border-b-2 transition ${
              activeTab === 'buyers'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Buyer Procurement Orders ({buyerRequestsData.length})
          </button>
        </div>

        {activeTab === 'listings' && (
          <button
            onClick={() => setListingModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List My Produce for Sale</span>
          </button>
        )}
      </div>

      {/* Tab 1: Live Market Price Benchmarks */}
      {activeTab === 'prices' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            <div className="flex flex-wrap gap-2">
              {['all', 'Cereals', 'Legumes', 'Vegetables', 'Tubers', 'Fruits', 'Livestock & Dairy'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat === 'all' ? 'All Commodities' : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search market or commodity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Market Price Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-900 text-white text-[11px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Commodity</th>
                    <th className="p-4">Market & County</th>
                    <th className="p-4">Unit Packaging</th>
                    <th className="p-4 text-right">Wholesale (KES)</th>
                    <th className="p-4 text-right">Retail (KES)</th>
                    <th className="p-4 text-center">Trend vs Last Wk</th>
                    <th className="p-4">Grade & Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredPrices.map((row) => (
                    <tr key={row.id} className="hover:bg-stone-50 transition">
                      <td className="p-4">
                        <div className="font-bold text-stone-900">{row.commodity}</div>
                        <div className="text-xs text-stone-500 italic">{row.swahiliCommodity}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-stone-800">{row.marketName}</div>
                        <div className="text-xs text-stone-500">{row.county} County</div>
                      </td>
                      <td className="p-4 font-medium text-stone-700">{row.unit}</td>
                      <td className="p-4 text-right font-black text-emerald-950 text-base">
                        KES {row.wholesalePriceKES.toLocaleString()}
                      </td>
                      <td className="p-4 text-right font-semibold text-stone-800">
                        KES {row.retailPriceKES.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                            row.trend === 'up'
                              ? 'bg-emerald-100 text-emerald-900'
                              : row.trend === 'down'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-stone-100 text-stone-700'
                          }`}
                        >
                          {row.trend === 'up' ? '▲ Up' : row.trend === 'down' ? '▼ Down' : '● Stable'}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-stone-500">
                        <div>{row.grade}</div>
                        <div className="text-[10px] text-stone-400 mt-0.5">{row.dateObserved}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Produce Marketplace Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      {item.commodity}
                    </span>
                    {item.verifiedSeller && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Farmer
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-stone-900">{item.title}</h3>

                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Available Volume:</span>
                      <span className="font-bold text-stone-900">{item.quantity} {item.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Asking Price:</span>
                      <span className="font-black text-emerald-950 text-sm">KES {item.pricePerUnitKES.toLocaleString()} / {item.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">County Origin:</span>
                      <span className="font-medium text-stone-800">{item.county}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-stone-900">{item.farmerName}</div>
                    <div className="text-[11px] text-stone-500">{item.farmerPhone}</div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveListingForEnquiry(item);
                      setEnquiryModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send Order Enquiry</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Buyer Procurement Requests */}
      {activeTab === 'buyers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {buyerRequestsData.map((br) => (
              <div
                key={br.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Procurement Tender
                  </span>
                  <span className="text-xs font-semibold text-stone-500">Deadline: {br.deadline}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900">{br.title}</h3>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Buyer Entity:</span>
                    <span className="font-bold text-stone-900">{br.buyerCompany} ({br.buyerName})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Volume Required:</span>
                    <span className="font-bold text-emerald-900">{br.quantityNeeded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Target Purchase Price:</span>
                    <span className="font-black text-stone-900">KES {br.targetPriceKES.toLocaleString()} / {br.unit}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">{br.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Produce Listing Creation Modal */}
      {listingModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-4 relative">
            <button
              onClick={() => setListingModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-stone-900">List Your Farm Produce for Sale</h3>
              <p className="text-xs text-stone-500">Publish your harvest to verified buyers across Kenya.</p>
            </div>

            {listingSuccess ? (
              <div className="p-6 text-center text-emerald-800 font-bold text-sm bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                Produce listed successfully! Buyers can now contact you.
              </div>
            ) : (
              <form onSubmit={handleCreateListing} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Listing Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 200 crates fresh Kilele F1 Tomatoes"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Commodity</label>
                    <input
                      type="text"
                      required
                      value={newCommodity}
                      onChange={(e) => setNewCommodity(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">County</label>
                    <input
                      type="text"
                      required
                      value={newCounty}
                      onChange={(e) => setNewCounty(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      required
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Unit</label>
                    <input
                      type="text"
                      required
                      value={newUnit}
                      onChange={(e) => setNewUnit(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Price (KES)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Produce Description / Delivery Options</label>
                  <textarea
                    rows={2}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Details about quality, packaging, and pickup location..."
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition text-xs"
                >
                  Publish Listing to Marketplace
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      {enquiryModalOpen && activeListingForEnquiry && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 relative">
            <button
              onClick={() => setEnquiryModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-stone-900">Contact Farmer</h3>
              <p className="text-xs text-stone-500">Inquire about {activeListingForEnquiry.title}</p>
            </div>

            {enquirySent ? (
              <div className="p-6 text-center text-emerald-800 font-bold text-sm bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                Enquiry dispatched! The farmer will receive an SMS notification.
              </div>
            ) : (
              <form onSubmit={handleSendEnquiry} className="space-y-3 text-xs">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-stone-700">
                  <div><strong>Seller:</strong> {activeListingForEnquiry.farmerName}</div>
                  <div><strong>Phone:</strong> {activeListingForEnquiry.farmerPhone}</div>
                  <div><strong>Asking Price:</strong> KES {activeListingForEnquiry.pricePerUnitKES} / {activeListingForEnquiry.unit}</div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Message / Quantity Offer</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Hello, I am interested in purchasing 50 crates with delivery to Nairobi..."
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition"
                >
                  Send Enquiry to Farmer
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
