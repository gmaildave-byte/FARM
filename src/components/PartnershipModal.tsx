import React, { useState } from 'react';
import {
  X,
  Building,
  Handshake,
  CheckCircle2,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { kenyanCounties } from './Navbar';

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnershipModal: React.FC<PartnershipModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [orgName, setOrgName] = useState('');
  const [partnerType, setPartnerType] = useState('Input Supplier (Seeds/Fertilizer/Machinery)');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('+254 7');
  const [county, setCounty] = useState('Nairobi');
  const [proposalDetails, setProposalDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F0] border border-stone-200 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#183D29] text-[#FAF7F0] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight font-serif">
                Institutional & Business Partnerships
              </h3>
              <p className="text-[11px] text-emerald-200/80">
                Partner with AgriHub
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-900 flex items-center justify-center text-emerald-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="font-bold text-stone-900">
                  Collaborate for Farmer Impact
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  We partner with registered cooperatives, seed breeders (KEPHIS authorized), solar irrigation firms, micro-financiers, and agricultural NGOs. <em>Note: Editorial agronomic recommendations remain strictly independent of paid brand partnerships.</em>
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Organization / Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kenya Seed Company / Western Agritech Cooperative"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Partnership Category
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  >
                    <option>Certified Input Supplier</option>
                    <option>Agricultural Cooperative</option>
                    <option>Logistics & Cold Storage</option>
                    <option>Solar Irrigation Provider</option>
                    <option>Agricultural Training & NGO</option>
                    <option>Financial & Crop Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Headquarters County
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  >
                    {kenyanCounties.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="official@company.co.ke"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Telephone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Partnership Objectives & Scope
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your proposed collaboration (e.g. bulk distribution, sponsored demonstration plots, grower network onboarding)..."
                  value={proposalDetails}
                  onChange={(e) => setProposalDetails(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Partnership Proposal</span>
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#183D29] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 text-base">
                  Partnership Inquiry Received
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{contactName}</strong>. Our partnerships lead and founder (Adams Kipkoech Kering) will review your proposal and respond to <strong>{contactEmail}</strong> within 2 business days.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-[#183D29] text-white py-2.5 rounded-xl font-bold text-xs transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
