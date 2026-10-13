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
  CheckCircle2,
  Download
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Page, UserRole } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { AuthModal } from './AuthModal';

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
  const {
    user,
    role,
    setRole,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    dismissNotification,
    clearAllNotifications,
  } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('KES');

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
    { page: 'community', label: 'Community & Reels' },
    { page: 'messages', label: 'Farmer Chat' },
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
      <div className="bg-[#183D29] text-[#FAF7F0] text-xs py-1 px-3 sm:px-8 border-b border-emerald-950 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2">
          {/* Location & International Currency Selector */}
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-emerald-200 hidden sm:inline shrink-0">Region:</span>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-[#112d1e] text-[#FAF7F0] border border-emerald-900 rounded px-1.5 py-0.5 text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400 max-w-[125px] sm:max-w-none truncate"
            >
              {kenyanCounties.map((c) => (
                <option key={c} value={c} className="bg-[#183D29] text-white">
                  {c}
                </option>
              ))}
            </select>
            <span className="text-emerald-700 hidden md:inline">|</span>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-[#112d1e] text-[#FAF7F0] border border-emerald-900 rounded px-1.5 py-0.5 text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400 hidden sm:inline"
              title="International Currency Conversion"
            >
              <option value="KES">Currency: KES (Kenya)</option>
              <option value="UGX">Currency: UGX (Uganda)</option>
              <option value="TZS">Currency: TZS (Tanzania)</option>
              <option value="USD">Currency: USD ($ Global)</option>
              <option value="EUR">Currency: EUR (€ Europe)</option>
              <option value="GBP">Currency: GBP (£ UK)</option>
              <option value="NGN">Currency: NGN (₦ Nigeria)</option>
            </select>
          </div>

          {/* Right Utility Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group shrink-0 min-w-fit"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#183D29] to-[#0D2818] flex items-center justify-center text-white shadow-sm group-hover:from-[#122e1f] group-hover:to-[#08170e] transition shrink-0 ring-1 ring-emerald-500/20">
            <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="min-w-0">
            <div className="text-base sm:text-xl font-bold text-stone-900 tracking-tight leading-none flex items-center gap-1 font-serif">
              <span>Agri</span>
              <span className="text-emerald-700">Hub</span>
            </div>
            <div className="text-[11px] text-stone-500 font-medium hidden sm:block mt-0.5 truncate">
              Grow Knowledge • Share Progress • Build the Future
            </div>
          </div>
        </div>

        {/* Global Search Bar (Desktop/Tablet) */}
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

        {/* Right Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={openSearchModal}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition"
            aria-label="Search"
            title="Search AgriHub"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Direct Farmer Messaging / Chat Shortcut */}
          <button
            onClick={() => setCurrentPage('messages')}
            className={`p-2 rounded-xl transition relative ${
              currentPage === 'messages'
                ? 'bg-[#183D29] text-white shadow-xs'
                : 'text-stone-700 hover:text-[#183D29] hover:bg-stone-100'
            }`}
            title="Farmer Direct Messaging & Expert Inquiries"
            aria-label="Farmer Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`p-2 rounded-xl relative transition focus:outline-none focus:ring-2 focus:ring-[#183D29] ${
                notificationsOpen
                  ? 'bg-emerald-50 text-[#183D29]'
                  : 'text-stone-700 hover:text-[#183D29] hover:bg-stone-100'
              }`}
              title="Notifications"
              aria-label="View notifications"
              aria-expanded={notificationsOpen}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center pointer-events-none ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <>
                {/* Backdrop to prevent click-through and close cleanly */}
                <div
                  className="fixed inset-0 z-40 bg-stone-900/30 backdrop-blur-2xs"
                  onClick={() => setNotificationsOpen(false)}
                />

                {/* Notification Panel: fixed and perfectly centered on mobile (no left clipping!), anchored on desktop */}
                <div
                  className="fixed left-3 right-3 top-16 max-w-sm sm:max-w-none sm:w-96 mx-auto sm:mx-0 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 py-3 z-50 animate-in fade-in duration-150 overflow-hidden flex flex-col"
                  style={{ maxHeight: 'calc(80vh)' }}
                >
                  {/* Header */}
                  <div className="px-4 pb-2.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/80 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900 uppercase font-serif tracking-tight">
                        Notifications
                      </span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {unreadCount > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAllNotificationsRead();
                          }}
                          className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 hover:underline transition"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="px-2 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1 transition"
                        title="Done reading notifications"
                        aria-label="Done reading notifications"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Done</span>
                      </button>
                    </div>
                  </div>

                  {/* List */}
                  <div className="flex-1 overflow-y-auto divide-y divide-stone-100 overscroll-contain">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center space-y-2">
                        <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                          <Bell className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium text-stone-600">No notifications yet</p>
                        <p className="text-[11px] text-stone-400">
                          Field replies, market inquiries, and agro-weather advisories will appear here.
                        </p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            // Deep link to related screen
                            if (n.type === 'comment' || n.type === 'like' || n.type === 'follow') {
                              setCurrentPage('community');
                            } else if (n.type === 'enquiry') {
                              setCurrentPage('marketplace');
                            } else if (n.type === 'message') {
                              setCurrentPage('messages');
                            } else {
                              setCurrentPage('home');
                            }
                            setNotificationsOpen(false);
                          }}
                          className={`p-3 text-xs hover:bg-stone-50 transition cursor-pointer flex items-start gap-3 group ${
                            !n.read ? 'bg-emerald-50/50' : 'bg-white'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 transition ${
                              !n.read ? 'bg-emerald-600' : 'bg-transparent'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-stone-900 flex items-center justify-between gap-2">
                              <span className="truncate">{n.title}</span>
                              <span className="text-[10px] text-stone-400 whitespace-nowrap shrink-0">
                                {n.createdAt}
                              </span>
                            </div>
                            <p className="text-stone-600 text-[11px] mt-0.5 leading-relaxed line-clamp-2">
                              {n.message}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissNotification(n.id);
                            }}
                            className="text-stone-300 hover:text-stone-600 p-1 rounded transition opacity-0 group-hover:opacity-100 shrink-0"
                            title="Dismiss notification"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="px-4 py-2.5 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between text-[11px] text-stone-500 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAllNotificationsRead();
                          setNotificationsOpen(false);
                        }}
                        className="text-emerald-800 hover:text-emerald-950 font-bold transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Mark all read & Close</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearAllNotifications();
                        }}
                        className="text-rose-600 hover:text-rose-800 font-semibold transition"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* User Profile / Sign In Link */}
          <button
            onClick={() => setCurrentPage('profile')}
            className={`flex items-center gap-1.5 p-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition ${
              currentPage === 'profile'
                ? 'bg-[#183D29] text-white shadow-xs'
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

          {/* PWA Install App Button (Desktop/Tablet) */}
          <div className="hidden sm:block">
            <PWAInstallButton variant="nav" />
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition"
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
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
          {/* Quick Sign In / Switch Account Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setAuthModalOpen(true);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-800" />
              <span>Sign In / Switch Farmer Account</span>
            </div>
            <span className="text-[11px] text-emerald-800">Switch &rarr;</span>
          </button>

          {/* PWA Install Button in Drawer */}
          <div className="pb-1">
            <PWAInstallButton
              variant="drawer"
              onInstalledOrDismissed={() => setMobileMenuOpen(false)}
            />
          </div>

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

      {/* Auth Modal for Sign In & Account Registration */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
};
