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
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-sm text-center sm:text-left">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Sprout className="w-3.5 h-3.5" />
            Our Mission & Institutional Standards
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            About AgriKnowledge Hub
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
            AgriKnowledge Hub was built with a singular vision: to bridge the digital agricultural information gap by uniting verified scientific research, practical farm management tools, transparent market prices, and expert advice onto one reliable platform.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-700" />
          <h3 className="font-bold text-stone-900 text-sm">Rigorous Agronomic Quality</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            All crop and livestock recommendations are synthesized from published Kenyan research institutions (KALRO, KEPHIS) rather than generic web scraping.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <Building className="w-8 h-8 text-emerald-700" />
          <h3 className="font-bold text-stone-900 text-sm">Targeted Localization</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Architected specifically for Kenya as the initial launchpad, including local bimodal seasons (Long & Short Rains), 47 counties, KES budgeting, and English & Kiswahili.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
          <Lock className="w-8 h-8 text-emerald-700" />
          <h3 className="font-bold text-stone-900 text-sm">Farmer Privacy & Trust</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Designed in strict compliance with the Kenya Data Protection Act (DPA 2019). Private farm financial and yield records remain strictly confidential.
          </p>
        </div>
      </div>

      {/* Authoritative Institutional References */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-stone-900">
          Primary Kenyan Agricultural Institutional Sources
        </h3>
        <div className="space-y-3 text-xs text-stone-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Kenya Agricultural & Livestock Research Organization (KALRO): </strong>
              Cereal agronomy guidelines, disease pest thresholds, and livestock breeding manuals.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Kenya Plant Health Inspectorate Service (KEPHIS): </strong>
              Official National Crop Variety Release List, seed certification standards, and phytosanitary export requirements.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Kenya Meteorological Department (KMD): </strong>
              County agro-meteorological advisories and seasonal rainfall onset forecasts.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Pest Control Products Board (PCPB): </strong>
              Registered active ingredients, Pre-Harvest Intervals (PHIs), and re-entry toxicity classifications.
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-stone-900">Contact & Farmer Support Desk</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>Nairobi & Regional County Desks, Kenya</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-700" />
            <span>support@agriknowledge.co.ke</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>+254 700 000 000 / Toll Free 0800</span>
          </div>
        </div>
      </div>
    </div>
  );
};
