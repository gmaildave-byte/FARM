import React, { useState } from 'react';
import {
  Sprout,
  Search,
  Globe,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Layers,
  MapPin,
  ShieldCheck,
  Calculator,
  ShoppingBag,
  GraduationCap,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Page, UserRole } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  openSearchModal: () => void;
  selectedCounty: string;
  setSelectedCounty: (county: string) => void;
}

export const kenyanCounties = [
  'National (All Counties)',
  'Trans Nzoia',
  'Uasin Gishu',
  'Nakuru',
  'Kiambu',
  'Kirinyaga',
  'Murang\'a',
  'Nyeri',
  'Meru',
  'Embu',
  'Machakos',
  'Makueni',
  'Kilifi',
  'Mombasa',
  'Kisumu',
  'Kakamega',
  'Bungoma',
  'Kisii',
  'Narok',
  'Nandi',
  'Kericho',
  'Bomet'
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  openSearchModal,
  selectedCounty,
  setSelectedCounty,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, role, setRole, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [cropsMenuOpen, setCropsMenuOpen] = useState(false);

  const rolesList: { id: UserRole; label: string; desc: string }[] = [
    { id: 'farmer', label: 'Registered Farmer', desc: 'Manage farms, crops, finances, ask experts' },
    { id: 'guest', label: 'Guest Visitor', desc: 'Browse public guides and calculators' },
    { id: 'buyer', label: 'Buyer / Agribusiness', desc: 'Post produce procurement requests' },
    { id: 'expert', label: 'Agricultural Expert', desc: 'Respond to farmer questions' },
    { id: 'editor', label: 'Content Editor', desc: 'Draft and review agricultural guides' },
    { id: 'admin', label: 'System Administrator', desc: 'Full platform & user administration' }
  ];

  const navLinks: { page: Page; label: string; icon?: React.ReactNode }[] = [
    { page: 'home', label: t('nav.home') },
    { page: 'crops', label: t('nav.crops') },
    { page: 'livestock', label: t('nav.livestock') },
    { page: 'soil-water', label: t('nav.soilWater') },
    { page: 'pests', label: t('nav.pests') },
    { page: 'weather', label: t('nav.weather') },
    { page: 'calculators', label: t('nav.calculators') },
    { page: 'markets', label: t('nav.markets') },
    { page: 'suppliers', label: t('nav.suppliers') },
    { page: 'farm-manager', label: t('nav.farmManager') },
    { page: 'learning', label: t('nav.learning') },
    { page: 'ai-assistant', label: t('nav.aiAssistant') },
    { page: 'expert', label: t('nav.expert') },
    { page: 'community', label: t('nav.community') },
    { page: 'opportunities', label: t('nav.opportunities') },
    { page: 'farm-business', label: t('nav.farmBusiness') },
    { page: 'sustainable', label: t('nav.sustainable') },
    ...(role === 'admin' || role === 'editor' ? [{ page: 'admin-cms' as Page, label: t('nav.adminCms') }] : []),
    { page: 'about', label: t('nav.about') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-stone-200">
      {/* Top Utility Ribbon */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-8 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Location Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-300 hidden sm:inline">Location:</span>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-emerald-900/80 text-emerald-100 border border-emerald-800 rounded px-2 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              {kenyanCounties.map((c) => (
                <option key={c} value={c} className="bg-emerald-950 text-white">
                  {c}
                </option>
              ))}
            </select>
            <span className="text-emerald-500 hidden md:inline">|</span>
            <span className="text-emerald-300 hidden md:inline">Currency: KES (Kenyan Shilling)</span>
          </div>

          {/* Right utility: Language Switcher & Role Selector */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-emerald-900/60 rounded px-2 py-0.5 border border-emerald-800">
              <Globe className="w-3 h-3 text-emerald-400" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1 rounded font-medium ${language === 'en' ? 'text-white bg-emerald-700' : 'text-emerald-300 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-emerald-700">/</span>
              <button
                onClick={() => setLanguage('sw')}
                className={`px-1 rounded font-medium ${language === 'sw' ? 'text-white bg-emerald-700' : 'text-emerald-300 hover:text-white'}`}
              >
                SW (Kiswahili)
              </button>
            </div>

            {/* Quick Role Switcher for Testing */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 bg-emerald-900/90 text-emerald-100 border border-emerald-700/80 rounded px-2.5 py-0.5 hover:bg-emerald-800 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-semibold text-white capitalize">{role}</span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-stone-800">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-bold uppercase text-stone-500">
                    Switch Active User Role (RBAC)
                  </div>
                  {rolesList.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setRole(r.id);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-stone-50 transition flex flex-col ${
                        role === r.id ? 'bg-emerald-50 text-emerald-900 font-semibold' : ''
                      }`}
                    >
                      <span className="font-medium text-stone-900">{r.label}</span>
                      <span className="text-[10px] text-stone-500 leading-tight">{r.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition">
            <Sprout className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-none flex items-center gap-1.5">
              <span>AgriKnowledge</span>
              <span className="text-emerald-700">Hub</span>
            </div>
            <div className="text-[11px] text-stone-500 font-medium hidden sm:block mt-0.5">
              Knowledge for Better Farming • Technology for a Better Harvest
            </div>
          </div>
        </div>

        {/* Global Search Bar (prominent) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={openSearchModal}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-stone-100/80 hover:bg-stone-100 text-stone-700 rounded-xl border border-stone-200 text-xs sm:text-sm transition text-left cursor-text shadow-xs"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-700" />
              <span>{t('nav.searchPlaceholder')}</span>
            </span>
            <kbd className="hidden lg:inline-block text-[10px] bg-white border border-stone-300 rounded px-1.5 py-0.5 text-stone-700 font-mono">
              Search
            </kbd>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ask AI Agronomist Pill Button */}
          <button
            onClick={() => setCurrentPage('ai-assistant')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-xs ${
              currentPage === 'ai-assistant'
                ? 'bg-emerald-800 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Agronomist</span>
          </button>

          {/* Farm Manager Dashboard Button */}
          <button
            onClick={() => setCurrentPage('farm-manager')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition shadow-xs ${
              currentPage === 'farm-manager'
                ? 'bg-emerald-900 text-white'
                : 'bg-emerald-700 text-white hover:bg-emerald-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('nav.myFarm')}</span>
          </button>

          {/* Search Trigger for Mobile */}
          <button
            onClick={openSearchModal}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Primary Category Navigation Bar (Desktop) */}
      <nav className="hidden lg:block border-t border-stone-100 bg-stone-50/60 text-xs font-semibold text-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto scrollbar-none py-1.5">
          <div className="flex items-center gap-1 shrink-0">
            {navLinks.slice(0, 11).map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  currentPage === item.page
                    ? 'bg-emerald-800 text-white font-bold shadow-xs'
                    : 'hover:text-emerald-800 hover:bg-emerald-50/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 shrink-0 border-l border-stone-200 pl-2">
            {navLinks.slice(11).map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  currentPage === item.page
                    ? 'bg-emerald-800 text-white font-bold shadow-xs'
                    : 'hover:text-emerald-800 hover:bg-emerald-50/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-600 px-3 py-1">
            Navigation Menu
          </div>
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                setCurrentPage(item.page);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                currentPage === item.page
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
