import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { opportunitiesData } from '../data/opportunities';
import { JobOpportunity } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const OpportunitiesPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['all', 'Grant', 'Job', 'Internship', 'Training'];

  const filtered = opportunitiesData.filter(opp => {
    const matchesType = selectedType === 'all' || opp.type.toLowerCase() === selectedType.toLowerCase();
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Briefcase className="w-3.5 h-3.5" />
            Verified Agricultural Opportunities Portal
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Agricultural Grants, Jobs & Training
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Discover verified funding opportunities, youth & women agribusiness grants, commercial farm employment, professional internships, and practical field training workshops across Kenya.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-stone-200 pb-4">
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedType.toLowerCase() === type.toLowerCase()
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {type === 'all' ? 'All Opportunities' : `${type}s`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search grants, jobs, internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Opportunities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((opp) => (
          <div
            key={opp.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 space-y-4 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-white ${
                    opp.type === 'Grant'
                      ? 'bg-emerald-800'
                      : opp.type === 'Job'
                      ? 'bg-stone-900'
                      : opp.type === 'Internship'
                      ? 'bg-blue-800'
                      : 'bg-amber-800'
                  }`}
                >
                  {opp.type}
                </span>

                <div className="flex items-center gap-1 text-xs text-stone-500 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Deadline: {opp.deadline}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-stone-900 leading-snug">{opp.title}</h3>
                <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                  <Building className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="font-semibold text-stone-700">{opp.organization}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{opp.location}</span>
                </div>
              </div>

              {opp.compensationOrFunding && (
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                  <span className="text-stone-600 font-medium">Grant Value / Compensation:</span>
                  <span className="font-bold text-emerald-950">{opp.compensationOrFunding}</span>
                </div>
              )}

              <p className="text-xs text-stone-600 leading-relaxed">{opp.description}</p>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700">
                <strong>Eligibility: </strong> {opp.eligibility}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified: {opp.verifiedDate}
              </span>

              <a
                href={opp.contactOrLink.startsWith('http') ? opp.contactOrLink : `mailto:${opp.contactOrLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <span>Apply / Official Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
