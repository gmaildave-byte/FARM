import React, { useState } from 'react';
import { Sprout, Mail, ShieldAlert, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Page } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const { t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-12 sm:mt-20 w-full overflow-x-hidden">
      {/* Top Banner: Authoritative Agricultural References */}
      <div className="border-b border-stone-800 bg-stone-950 py-3 sm:py-4 px-3.5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-200">Grounded in Authoritative Kenyan Agricultural Guidance:</span>
            <span>KALRO • KEPHIS • MoALD • Kenya Meteorological Department (KMD) • ICIPE • CIMMYT</span>
          </div>
          <div className="text-emerald-400 font-medium">
            Kenya National Agronomy Standard
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-8 py-10 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Mission (Col 1 & 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">AgriKnowledge</span>
              <span className="text-lg font-bold text-emerald-500">Hub</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed pr-4">
            <strong>Trusted Agricultural Knowledge. Stronger Farming. Better Markets.</strong><br />
            An integrated digital agricultural platform founded and developed by <strong>Adams Kipkoech Kering</strong>, dedicated to empowering smallholders, commercial growers, livestock keepers, and agribusinesses in Kenya with verified agricultural knowledge, 26 practical farming tools, and direct marketplace trade.
          </p>

          {/* Newsletter Box */}
          <div className="pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
              Receive Seasonal Agro-Weather & Planting Advisories
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Asante! You are subscribed to weekly Kenyan farm updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 flex-1"
                />
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* PWA App Install Button */}
          <div className="pt-2">
            <PWAInstallButton variant="footer" />
          </div>
        </div>

        {/* Column 3: Agricultural Knowledge */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Knowledge Library</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentPage('crops')} className="hover:text-emerald-400 transition">
                Cereal & Legume Farming
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('crops')} className="hover:text-emerald-400 transition">
                Vegetable & Tuber Guides
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('livestock')} className="hover:text-emerald-400 transition">
                Dairy & Beef Cattle Management
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('livestock')} className="hover:text-emerald-400 transition">
                Poultry (Broiler, Layer, Kienyeji)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('soil-water')} className="hover:text-emerald-400 transition">
                Soil Testing & Nutrient Management
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('pests')} className="hover:text-emerald-400 transition">
                Pest & Disease Diagnosis Database
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('weather')} className="hover:text-emerald-400 transition">
                County Weather & Planting Calendars
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Practical Farm Tools */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Farming Tools</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentPage('calculators')} className="hover:text-emerald-400 transition">
                26 Agricultural Calculators
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('farm-manager')} className="hover:text-emerald-400 transition">
                Farm Management Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('markets')} className="hover:text-emerald-400 transition">
                Kenyan Wholesale Market Prices
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('markets')} className="hover:text-emerald-400 transition">
                Produce Trading Marketplace
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('suppliers')} className="hover:text-emerald-400 transition">
                Certified Seed & Equipment Directory
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('farm-business')} className="hover:text-emerald-400 transition">
                Agribusiness Budgeting & Finance
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('sustainable')} className="hover:text-emerald-400 transition">
                Sustainable & Modern Farming
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: Support & Advisory */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Advisory & Learning</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentPage('ai-assistant')} className="hover:text-emerald-400 transition">
                AI Farming Assistant (Gemini 3.8)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('expert')} className="hover:text-emerald-400 transition">
                Ask an Agricultural Expert
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('learning')} className="hover:text-emerald-400 transition">
                AgriAcademy Certified Courses
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('community')} className="hover:text-emerald-400 transition">
                Farmer Discussion Forum
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('opportunities')} className="hover:text-emerald-400 transition">
                Agri-Grants, Jobs & Training
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('about')} className="hover:text-emerald-400 transition">
                About AgriKnowledge Hub
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mandatory Agricultural & Veterinary Legal Disclaimer */}
      <div className="bg-stone-950/90 border-t border-stone-800 py-5 sm:py-6 px-3.5 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-start gap-2.5 sm:gap-3 text-xs text-stone-400 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-stone-300">Agricultural & Veterinary Advisory Disclaimer: </span>
            The guidance, dosage estimates, calculators, and AI responses on AgriKnowledge Hub are designed for educational and farm planning purposes grounded in published research manuals. They do not constitute guaranteed on-site diagnoses. Always confirm chemical registrations with the Pest Control Products Board (PCPB), verify seed tags with KEPHIS, and consult a registered veterinary surgeon or sub-county agricultural extension officer for critical crop or livestock health emergencies.
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-stone-800 py-4 px-3.5 sm:px-8 text-center text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-[11px] sm:text-xs">
            © {new Date().getFullYear()} AgriKnowledge Hub (Kenya) • Founded & Developed by Adams Kipkoech Kering.
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <button onClick={() => setCurrentPage('about')} className="hover:text-stone-300">
              Editorial Policy
            </button>
            <span>•</span>
            <button onClick={() => setCurrentPage('legal')} className="hover:text-stone-300">
              Data Protection (Kenya DPA 2019)
            </button>
            <span>•</span>
            <button onClick={() => setCurrentPage('legal')} className="hover:text-stone-300">
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
