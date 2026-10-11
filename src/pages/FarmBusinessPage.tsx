import React from 'react';
import {
  DollarSign,
  TrendingUp,
  FileText,
  ShieldCheck,
  Building,
  Scale,
  Users,
  CheckCircle2,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FarmBusinessPage: React.FC = () => {
  const { t } = useLanguage();

  const businessGuides = [
    {
      id: 'biz-1',
      title: 'Writing a Realistic Agribusiness Business Plan',
      desc: 'How to structure operational assumptions, conservative yield estimates, variable input budgets, cash flow seasonality, and debt service ratios for bank financing.',
      keyTakeaways: [
        'Avoid projecting ceiling yields (e.g. 40 bags/acre maize) in cash flow; budget on 65-75% conservative yield.',
        'Buffer 15% contingency for erratic rainfall spells and pest pressure.',
        'Detail clear off-taker channels (millers, export packhouses, cooperatives) before sinking capital.'
      ]
    },
    {
      id: 'biz-2',
      title: 'Agricultural Credit & Financing in Kenya',
      desc: 'Evaluating agricultural credit lines from the Agricultural Finance Corporation (AFC), commercial bank agri-desks (KCB, Equity, Co-op Bank), and SACCO crop advance loans.',
      keyTakeaways: [
        'AFC seasonal crop loans offer competitive concessionary interest rates (10–12% per annum).',
        'Match loan repayment schedules to harvest harvest dates (bullet payment vs monthly amortization).',
        'Maintain clean receipts and verifiable cooperative delivery chits as credit scoring history.'
      ]
    },
    {
      id: 'biz-3',
      title: 'Index-Based Agricultural Insurance',
      desc: 'Protecting farm investments against catastrophic drought or excessive rainfall using weather-index crop and livestock insurance (IBLI) in Kenya.',
      keyTakeaways: [
        'Weather index insurance payouts are triggered by satellite vegetation and rainfall deficits without tedious on-farm loss adjusters.',
        'Available through Kenya National Agricultural Insurance Program (KNAIP) with up to 50% government premium subsidy.',
        'Critical protection for dairy herd replacements and cereal inputs.'
      ]
    },
    {
      id: 'biz-4',
      title: 'Export Standards & Horticultural Compliance',
      desc: 'Achieving GlobalGAP, Kenya Standard KS 1758, and KEPHIS phytosanitary compliance for export avocados, French beans, and herbs to the EU and Middle East.',
      keyTakeaways: [
        'Establish chemical store with locked containment and documented pesticide inventory logs.',
        'Enforce Maximum Residue Limits (MRLs) and strictly document Pre-Harvest Intervals (PHIs).',
        'Provide clean sanitary facilities, drinking water, and first aid kits for harvest workers.'
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <DollarSign className="w-3.5 h-3.5" />
            Agribusiness Economics, Financing & Compliance
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Farm Business, Finance & Agribusiness
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Farming is a business. Master commercial budgeting, enterprise margins, seasonal cash flow management, agricultural credit from AFC, index insurance, and international export market compliance.
          </p>
        </div>
      </div>

      {/* Core Business Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {businessGuides.map((guide) => (
          <div
            key={guide.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 space-y-4 shadow-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">{guide.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed mt-1">{guide.desc}</p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-stone-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                Core Agronomic & Business Principles
              </span>
              <ul className="text-xs text-stone-700 space-y-1.5 list-disc list-inside bg-stone-50 p-4 rounded-xl border border-stone-100">
                {guide.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Cooperatives & Collective Bargaining */}
      <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-3">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-800" />
          The Power of Producer Cooperatives & SACCOs in Kenya
        </h3>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          Smallholders selling produce individually often face severe price discounting from rural middle-men (brokers). Joining a certified marketing cooperative (e.g. dairy cooperatives like Murang'a County Creameries or grain marketing groups) unlocks bulk collection, cold-chain chilling hubs, access to subsidized fertilizers, and input advances on cooperative credit.
        </p>
      </div>
    </div>
  );
};
