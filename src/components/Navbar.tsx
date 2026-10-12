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
  HelpCircle,
  Bell,
  CheckCircle2
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
  const { user, role, setRole, notifications, markNotificationRead } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const rolesList: { id: UserRole; label: string; desc: string }[] = [
    { id: 'farmer', label: 'Registered Farmer', desc: 'Manage crops, field updates, farm manager' },
    { id: 'buyer', label: 'Buyer / Agribusiness', desc: 'Browse produce, post purchase enquiries' },
    { id: 'expert', label: 'Agricultural Expert', desc: 'Answer farmer questions, verify guides' },
    { id: 'moderator', label: 'Community Moderator', desc: 'Review reported posts and listings' },
    { id: 'admin', label: 'System Administrator', desc: 'Full administration, Adams Kipkoech Kering profile' },
    { id: 'guest', label: 'Guest Visitor', desc: 'Public browsing mode' },
  ];

  const primaryNav: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'community', label: 'Community' },
    { page: 'marketplace', label: 'Marketplace' },
    { page: 'crops', label: 'Crops' },
    { page: 'livestock', label: 'Livestock' },
    { page: 'soil-water', label: 'Soil & Water' },
    { page: 'pests', label: 'Pests & IPM' },
    { page: 'weather', label: 'Weather & Climate' },
    { page: 'calculators', label: '26 Tools' },
    { page: 'markets', label: 'Price Benchmarks' },
    { page: 'suppliers', label: 'Inputs Directory' },
    { page: 'farm-manager', label: 'Farm Manager' },
    { page: 'learning', label: 'Learning Centre' },
    { page: 'expert', label: 'Ask Expert' },
    { page: 'opportunities', label: 'Grants & Jobs' },
    ...(role === 'admin' || role === 'editor' || role === 'moderator'
      ? [{ page: 'admin-cms' as Page, label: 'Admin CMS' }]
      : []),
    { page: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-stone-200">
      {/* Top Utility Ribbon */}
      <div className="bg-[#183D29] text-[#FAF7F0] text-xs py-1 px-4 sm:px-8 border-b border-emerald-950">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Location & Currency Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-200 hidden sm:inline">Region:</span>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-[#112d1e] text-[#FAF7F0] border border-emerald-900 rounded px-2 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
            >
              {kenyanCounties.map((c) => (
                <option key={c} value={c} className="bg-[#183D29] text-white">
                  {c}
                </option>
              ))}
            </select>
            <span className="text-emerald-700 hidden md:inline">|</span>
            <span className="text-emerald-200 hidden md:inline">Currency: KES (Kenyan Shilling)</span>
          </div>

          {/* Right Utility Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#112d1e] rounded px-2 py-0.5 border border-emerald-900">
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
                SW
              </button>
            </div>

            {/* Quick Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 bg-[#112d1e] text-emerald-100 border border-emerald-900 rounded px-2.5 py-0.5 hover:bg-emerald-900 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span className="font-semibold text-white capitalize">{role}</span>
                <ChevronDown className="w-3 h-3 text-emerald-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-stone-800 animate-in fade-in">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-bold uppercase text-stone-500">
                    Active User Role Simulator
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

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#183D29] flex items-center justify-center text-white shadow-sm group-hover:bg-[#122e1f] transition">
            <Sprout className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-none flex items-center gap-1.5 font-serif">
              <span>AgriKnowledge</span>
              <span className="text-emerald-700">Hub</span>
            </div>
            <div className="text-[11px] text-stone-500 font-medium hidden sm:block mt-0.5">
              Trusted Agricultural Knowledge • Stronger Farming • Better Markets
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={openSearchModal}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-stone-100/90 hover:bg-stone-100 text-stone-700 rounded-xl border border-stone-200 text-xs sm:text-sm transition text-left cursor-text"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-800" />
              <span>Search crops, animals, pests, tools, prices...</span>
            </span>
            <kbd className="hidden lg:inline-block text-[10px] bg-white border border-stone-300 rounded px-1.5 py-0.5 text-stone-700 font-mono">
              Search
            </kbd>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-stone-600 hover:text-[#183D29] hover:bg-stone-100 rounded-xl relative transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 py-3 z-50 animate-in fade-in">
                <div className="px-4 pb-2 border-b border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 uppercase">Notifications</span>
                  <span className="text-[11px] text-stone-400">{unreadCount} unread</span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-stone-50">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 text-xs hover:bg-stone-50 transition cursor-pointer ${
                        !n.read ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <div className="font-bold text-stone-900 flex items-center justify-between">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-stone-400">{n.createdAt}</span>
                      </div>
                      <p className="text-stone-600 text-[11px] mt-0.5 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar Link */}
          <button
            onClick={() => setCurrentPage('profile')}
            className={`flex items-center gap-1.5 p-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition ${
              currentPage === 'profile'
                ? 'bg-[#183D29] text-white'
                : 'text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
            title="User Profile & Settings"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden bg-[#183D29] text-white flex items-center justify-center font-bold text-[10px]">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span>{user?.name?.slice(0, 2).toUpperCase() || 'AD'}</span>
              )}
            </div>
            <span className="hidden sm:inline">{user?.name?.split(' ')[0] || 'Profile'}</span>
          </button>

          {/* Farm Manager Dashboard Shortcut */}
          <button
            onClick={() => setCurrentPage('farm-manager')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#183D29] text-white hover:bg-[#122e1f] rounded-xl text-xs font-bold transition shadow-xs"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Farm Records</span>
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

      {/* Primary Category Desktop Ribbon */}
      <nav className="hidden lg:block border-t border-stone-100 bg-[#FAF7F0] text-xs font-medium text-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1 shrink-0">
            {primaryNav.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  currentPage === item.page
                    ? 'bg-[#183D29] text-white font-bold shadow-xs'
                    : 'hover:text-[#183D29] hover:bg-stone-200/60'
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
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 px-3 py-1">
            Complete Farming Hub
          </div>
          {primaryNav.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                setCurrentPage(item.page);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                currentPage === item.page
                  ? 'bg-[#183D29] text-white font-bold'
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
