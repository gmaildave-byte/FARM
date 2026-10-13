import React from 'react';
import {
  Sprout,
  ShieldCheck,
  Building,
  Lock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ExternalLink,
  User,
  Award,
  Globe,
  Code
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-[#183D29] text-[#FAF7F0] rounded-3xl p-6 sm:p-10 shadow-sm text-center sm:text-left">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#122e1f] rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Sprout className="w-3.5 h-3.5" />
            <span>Mission & Technology Vision</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif">
            About AgriHub
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            <strong>Grow Knowledge. Share Progress. Build the Future.</strong><br />
            AgriHub is a premium, global agricultural social network, educational platform, and marketplace built to equip smallholder farmers, commercial growers, cooperatives, and agribusinesses worldwide with verified agronomic science, short-form reels, field stories, direct messaging, 26 precision farm tools, and direct commerce.
          </p>
        </div>
      </div>

      {/* Founder & Developer Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183D29]">
          <Code className="w-4 h-4 text-emerald-700" />
          <span>Founder & Developer Attribution</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-1">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#183D29] to-[#0D2818] text-[#FAF7F0] flex items-center justify-center font-bold text-2xl shadow-sm shrink-0 ring-1 ring-emerald-500/20">
            AK
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-stone-900 leading-tight">
              Adams Kipkoech Kering
            </h2>
            <div className="text-xs text-stone-600 font-medium">
              Founder & Lead Software Engineer, AgriHub
            </div>
            <p className="text-xs text-stone-700 leading-relaxed pt-1">
              Founded and architected by <strong>Adams Kipkoech Kering</strong> to solve critical bottlenecks in agricultural advisory, peer knowledge exchange, social media for farming, input sourcing, and post-harvest market linkage worldwide. Conceived as a resilient digital platform grounded in real-world agronomic science with an extensible architecture for regional and continental scale.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <ShieldCheck className="w-7 h-7 text-[#183D29]" />
          <h3 className="font-bold text-stone-900 text-sm">Rigorous Agronomic Quality</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            All crop and livestock recommendations are synthesized from published Kenyan research institutions (KALRO, KEPHIS) rather than generic unverified web scraping.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <Building className="w-7 h-7 text-[#183D29]" />
          <h3 className="font-bold text-stone-900 text-sm">Targeted Localization</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Architected specifically for Kenya as the launchpad: 47 counties, bimodal rainfall seasons (Long & Short Rains), KES pricing, and English & Kiswahili language support.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <Lock className="w-7 h-7 text-[#183D29]" />
          <h3 className="font-bold text-stone-900 text-sm">Farmer Privacy & Trust</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Designed with security-first principles in alignment with the Kenya Data Protection Act (DPA 2019). Farm yields, financial records, and personal details remain confidential.
          </p>
        </div>
      </div>

      {/* Authoritative Institutional References */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-stone-900">
          Primary Kenyan Agricultural Institutional Benchmarks
        </h3>
        <div className="space-y-3 text-xs text-stone-700">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Kenya Agricultural & Livestock Research Organization (KALRO): </strong>
              Cereal agronomy guidelines, pest economic injury thresholds, and livestock breeding manuals.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Kenya Plant Health Inspectorate Service (KEPHIS): </strong>
              Official National Crop Variety Release List, seed certification standards, and phytosanitary guidelines.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Kenya Meteorological Department (KMD): </strong>
              County agro-meteorological advisories and bimodal seasonal rainfall onset forecasts.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Pest Control Products Board (PCPB): </strong>
              Registered active ingredients, Pre-Harvest Intervals (PHIs), and re-entry toxicity classifications.
            </div>
          </div>
        </div>
      </div>

      {/* Advisory & Regulatory Disclaimers (Consolidated from footer) */}
      <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Agricultural & Veterinary Advisory Standards</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          The crop guides, calculators, pest protocols, and AI responses on AgriHub are intended for educational and agronomic decision-support purposes. Grounded in peer-reviewed KALRO manuals and KEPHIS variety releases, they do not replace on-site physical soil or tissue diagnostics by a certified agronomist. Always verify chemical registrations directly with the Pest Control Products Board (PCPB) and consult a registered veterinary officer for acute livestock ailments.
        </p>
      </div>

      {/* International Expansion Roadmap */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183D29]">
          <Globe className="w-4 h-4 text-emerald-700" />
          <span>Worldwide Agricultural Expansion Roadmap</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          While AgriHub has launched with deep Kenyan localization (47 counties, bimodal rainfall, KES benchmarks), its software architecture is engineered for international agricultural scale. Multi-currency support (KES, UGX, TZS, NGN, USD, EUR, GBP), multi-language frameworks, and modular climatic zones enable rapid rollout to East Africa (Uganda, Tanzania, Rwanda), West Africa, and global tropical/subtropical farming communities.
        </p>
      </div>

      {/* Contact & Support */}
      <div className="bg-[#183D29] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-emerald-200">Contact & Farmer Support Desk</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Nairobi & Eldoret Desks, Kenya</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>support@agrihub.app</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>+254 712 345 678</span>
          </div>
        </div>
      </div>
    </div>
  );
};
