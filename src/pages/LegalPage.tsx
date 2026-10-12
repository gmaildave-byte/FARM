import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  AlertCircle,
  Building,
  CheckCircle2,
  ExternalLink,
  Code
} from 'lucide-react';

export const LegalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'marketplace' | 'community'>('terms');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Banner */}
      <div className="bg-[#183D29] text-[#FAF7F0] rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-xs font-semibold text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal, Privacy & Regulatory Compliance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif">
            Terms, Privacy & Trust Policies
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            Governing transparent, secure agricultural information exchange and commerce in compliance with the Laws of Kenya, including the <strong>Kenya Data Protection Act (DPA 2019)</strong> and consumer protection standards.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'terms'
              ? 'bg-[#183D29] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-50'
          }`}
        >
          Terms of Service
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'bg-[#183D29] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-50'
          }`}
        >
          Privacy Policy (DPA 2019)
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'marketplace'
              ? 'bg-[#183D29] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-50'
          }`}
        >
          Marketplace & Seller Rules
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
            activeTab === 'community'
              ? 'bg-[#183D29] text-white shadow-xs'
              : 'bg-white text-stone-700 hover:bg-stone-50'
          }`}
        >
          Community Guidelines
        </button>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-2xs space-y-6 text-stone-800 text-xs sm:text-sm leading-relaxed">
        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                Terms of Service
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Last reviewed: October 2026 • AgriKnowledge Hub
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                1. Platform Ownership & Attribution
              </h3>
              <p>
                AgriKnowledge Hub was founded and developed by <strong>Adams Kipkoech Kering</strong> to provide reliable agricultural knowledge, farming community networking, and agricultural trade linkage across Kenya and the East African region.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                2. Educational Nature of Agronomic Guidance
              </h3>
              <p>
                All guides, diagnostic tools, and calculator outputs are synthesized from reputable research manuals (such as KALRO and KEPHIS) for educational and advisory reference. They do not substitute for on-site diagnostic tests or certified veterinary consultations. We make no warranty of guaranteed harvest yield or profits.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                3. Subscriptions & Fee Disclosures
              </h3>
              <p>
                Essential farming knowledge and community participation remain freely accessible to registered users. Business plans and featured listing promotions are optional services with clear upfront pricing in Kenyan Shillings (KES). Fees are non-refundable once the promotion period commences.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                Privacy Policy & Kenya Data Protection Act 2019
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Compliance with the Office of the Data Protection Commissioner (ODPC Kenya)
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                1. Data Collection & Processing
              </h3>
              <p>
                We only collect data necessary to provide agricultural services: account username, contact telephone for buyer enquiries, and optional farm enterprise details. We do not sell user data to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                2. Verification Documents Protection
              </h3>
              <p>
                Documents uploaded for farmer or agribusiness verification (e.g. National IDs or CR12 certificates) are stored in secure, access-restricted vaults solely for compliance auditing. <strong>Verification documents are never displayed publicly or shared.</strong>
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                3. Data Portability & Right to Erasure
              </h3>
              <p>
                Under the Kenya Data Protection Act 2019, users may at any time export a machine-readable JSON copy of their profile and farm records, or request account deletion through the Account Settings screen.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                Marketplace Policies & Prohibited Items
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Guidelines for agricultural sellers, buyers, and service providers
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                1. Strictly Prohibited Products
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Uncertified or fake seed varieties without KEPHIS verification labels.</li>
                <li>Banned pesticides, restricted chloronicotinoids, or unlabelled chemical decants.</li>
                <li>Diseased livestock or animals under veterinary quarantine orders.</li>
                <li>Stolen farm implements or counterfeit machinery parts.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                2. Seller Responsibilities & Safe Trading
              </h3>
              <p>
                Sellers must accurately state item weight, grade, variety, and harvest date. Buyers are advised to inspect physical goods prior to releasing final payments or to utilize traceable M-Pesa receipts.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                Community Guidelines & Safety
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Fostering an authentic, supportive agricultural social network
              </p>
            </div>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                1. Agricultural Focus
              </h3>
              <p>
                AgriKnowledge Hub is an agriculture-only community. Posts, updates, and photos should focus on crop production, animal husbandry, agro-processing, farm machinery, weather, and agricultural economics.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-bold text-stone-900 text-sm">
                2. Moderation & Reporting
              </h3>
              <p>
                Members can flag content violating these rules. Violations result in warning notices, content takedown, or permanent account suspension.
              </p>
            </section>
          </div>
        )}
      </div>

      {/* Founder Attribution Notice */}
      <div className="bg-[#FAF7F0] border border-stone-200 rounded-3xl p-6 text-xs text-stone-600 flex items-center gap-3">
        <Code className="w-5 h-5 text-emerald-800 shrink-0" />
        <div>
          <strong>Founder & Developer Notice:</strong> AgriKnowledge Hub is founded and developed by <strong>Adams Kipkoech Kering</strong>. For legal, data protection, or enterprise partnership inquiries, contact <code>legal@agriknowledge.co.ke</code>.
        </div>
      </div>
    </div>
  );
};
