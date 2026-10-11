import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Building,
  PlusCircle,
  X,
  AlertCircle
} from 'lucide-react';
import { suppliersData } from '../data/suppliers';
import { Supplier } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const SuppliersPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestModalOpen, setSuggestModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'all', label: 'All Suppliers' },
    { id: 'seeds', label: 'Certified Seeds' },
    { id: 'fertilizer', label: 'Fertilizers & Nutrition' },
    { id: 'feeds', label: 'Animal Feeds' },
    { id: 'irrigation', label: 'Solar & Irrigation' },
    { id: 'machinery', label: 'Machinery & Greenhouses' }
  ];

  const filteredSuppliers = suppliersData.filter((sup) => {
    const matchesCat = selectedCat === 'all' || sup.category === selectedCat;
    const matchesQuery =
      sup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.productsOffered.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Agricultural Inputs & Equipment Directory
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Certified Suppliers & Machinery
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Protect your farm investment against counterfeit inputs. Browse verified seed producers, KEBS-certified fertilizer manufacturers, livestock feed compounders, and solar irrigation providers in Kenya.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedCat === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search supplier, product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <button
            onClick={() => setSuggestModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>Submit Supplier</span>
          </button>
        </div>
      </div>

      {/* Suppliers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((sup) => (
          <div
            key={sup.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {sup.category}
                </span>
                {sup.verifiedStatus && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Dealer
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900">{sup.name}</h3>
                <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{sup.location}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">{sup.description}</p>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Key Certified Products Offered
                </span>
                <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {sup.productsOffered.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="text-[11px] text-emerald-900 bg-emerald-50/70 p-2 rounded-lg font-medium">
                <strong>Certification:</strong> {sup.certifiedBy}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-1 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-semibold text-stone-900">{sup.contactPhone}</span>
              </div>
              {sup.email && (
                <div className="flex items-center gap-2 text-[11px]">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{sup.email}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Suggest Supplier Modal */}
      {suggestModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 relative">
            <button
              onClick={() => setSuggestModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-stone-900">Submit a Supplier for Review</h3>
              <p className="text-xs text-stone-500">All submissions are vetted against KEPHIS & KEBS registers.</p>
            </div>

            {submitted ? (
              <div className="p-6 text-center text-emerald-800 font-bold text-sm bg-emerald-50 rounded-2xl border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto mb-2" />
                Supplier submitted for administrative verification!
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  setTimeout(() => {
                    setSubmitted(false);
                    setSuggestModalOpen(false);
                  }, 1500);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Company / Agro-Dealer Name</label>
                  <input type="text" required placeholder="e.g. Kenya Seed Depot Eldoret" className="w-full px-3 py-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select className="w-full px-3 py-2 border rounded-xl bg-white">
                    <option>Certified Seeds</option>
                    <option>Fertilizers</option>
                    <option>Animal Feeds</option>
                    <option>Irrigation Equipment</option>
                    <option>Machinery & Tools</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Location & County</label>
                  <input type="text" required placeholder="Town, County" className="w-full px-3 py-2 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Contact Phone</label>
                  <input type="text" required placeholder="+254 7..." className="w-full px-3 py-2 border rounded-xl" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition"
                >
                  Submit for Administrative Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
