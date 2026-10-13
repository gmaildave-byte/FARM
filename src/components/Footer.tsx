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
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-12 sm:mt-16 w-full overflow-x-hidden">
      {/* Primary Compact Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Brand & Mission & Support Email (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white ring-1 ring-emerald-500/30">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="text-lg font-bold text-white tracking-tight font-serif">
              <span>Agri</span>
              <span className="text-emerald-400">Hub</span>
            </div>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
            <strong>Grow Knowledge. Share Progress. Build the Future.</strong><br />
            Founded and developed by <strong>Adams Kipkoech Kering</strong>.
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Direct Support: </span>
            <a
              href="mailto:support@agrihub.app"
              className="text-emerald-400 hover:text-emerald-300 underline font-medium"
            >
              support@agrihub.app
            </a>
          </div>
        </div>

        {/* Essential Navigation Links (3 cols) */}
        <div className="md:col-span-3 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Quick Access</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentPage('about')} className="hover:text-emerald-400 transition text-left">
                About Founder & Vision
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('calculators')} className="hover:text-emerald-400 transition text-left">
                26 Precision Farm Calculators
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('learning')} className="hover:text-emerald-400 transition text-left">
                AgriAcademy & Certifications
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('community')} className="hover:text-emerald-400 transition text-left">
                Farmer Community & Reels
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('marketplace')} className="hover:text-emerald-400 transition text-left">
                Agricultural Marketplace
              </button>
            </li>
          </ul>
        </div>

        {/* Email Notifications & Mobile App (4 cols) */}
        <div className="md:col-span-4 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">Email Notifications & Alerts</h3>
          <p className="text-xs text-stone-400">
            Receive seasonal weather alerts, planting timetables, and market price updates directly in your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Asante! You are subscribed to agricultural notifications.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 flex-1 min-w-0"
              />
              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          <div className="pt-1">
            <PWAInstallButton variant="footer" />
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-stone-800 py-3.5 px-4 sm:px-8 text-center text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="text-[11px] sm:text-xs">
            © {new Date().getFullYear()} AgriHub • Founded & Developed by Adams Kipkoech Kering.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[11px] sm:text-xs">
            <button onClick={() => setCurrentPage('about')} className="hover:text-stone-300 transition">
              About & Editorial Policy
            </button>
            <span>•</span>
            <button onClick={() => setCurrentPage('legal')} className="hover:text-stone-300 transition">
              Privacy & Legal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
