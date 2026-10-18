import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Globe,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShieldCheck,
  MessageSquare,
  Bell,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Briefcase,
  Info,
  FileText,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Page, UserRole } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { AuthModal } from './AuthModal';
import { AgriHubLogo } from './AgriHubLogo';

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
  const { language, setLanguage } = useLanguage();
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
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

  // Secondary & overflow items for accessible quick-jump dropdown
  const overflowNavItems: { page: Page; label: string; icon: any; desc: string }[] = [
    { page: 'farm-manager', label: 'Farm Manager', icon: Calendar, desc: 'Crop blocks, seasonal activity logs & financials' },
    { page: 'learning', label: 'Learning Centre', icon: BookOpen, desc: 'Certified agronomic masterclasses & tutorials' },
    { page: 'expert', label: 'Ask Expert', icon: GraduationCap, desc: 'Direct consults with verified agronomists & vets' },
    { page: 'opportunities', label: 'Grants & Jobs', icon: Briefcase, desc: 'Agricultural funding, tenders & vacancies' },
    ...(role === 'admin' || role === 'editor' || role === 'moderator'
      ? [{ page: 'admin-cms' as Page, label: 'Admin CMS', icon: ShieldCheck, desc: 'Adams Kipkoech Kering system administration' }]
      : []),
    { page: 'about', label: 'About AgriHub', icon: Info, desc: 'Platform mission, founder & development' },
    { page: 'legal', label: 'Terms & Privacy', icon: FileText, desc: 'Data protection & marketplace trade guidelines' },
  ];

  // Monitor window scroll to optimize sticky header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor category scroll boundaries
  const checkCategoryScroll = () => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const tolerance = 4;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance);
  };

  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    checkCategoryScroll();
    const t1 = setTimeout(checkCategoryScroll, 100);
    const t2 = setTimeout(checkCategoryScroll, 400);
    el.addEventListener('scroll', checkCategoryScroll, { passive: true });
    window.addEventListener('resize', checkCategoryScroll);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      el.removeEventListener('scroll', checkCategoryScroll);
      window.removeEventListener('resize', checkCategoryScroll);
    };
  }, [primaryNav.length]);

  // Scroll active category into view automatically whenever page changes
  useEffect(() => {
    if (!categoryScrollRef.current) return;
    const activeBtn = categoryScrollRef.current.querySelector<HTMLElement>(`[data-nav-page="${currentPage}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    // Update scroll buttons state after smooth scroll completes
    setTimeout(checkCategoryScroll, 350);
  }, [currentPage]);

  const scrollCategories = (direction: 'left' | 'right') => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const scrollAmount = Math.max(300, Math.floor(el.clientWidth * 0.75));
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkCategoryScroll, 350);
  };

  // Handle ESC key to close active dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setRoleMenuOpen(false);
        setNotificationsOpen(false);
        setMobileMenuOpen(false);
        setMoreMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setRoleMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to scroll to relevant content smoothly when navigating
  const handleNotificationClick = (n: (typeof notifications)[0]) => {
    markNotificationRead(n.id);
    setNotificationsOpen(false);

    let targetPage: Page = 'home';
    if (n.type === 'comment' || n.type === 'like' || n.type === 'follow') {
      targetPage = 'community';
    } else if (n.type === 'enquiry') {
      targetPage = 'marketplace';
    } else if (n.type === 'message') {
      targetPage = 'messages';
    } else {
      targetPage = 'home';
    }

    setCurrentPage(targetPage);

    // Auto-scroll to content area
    setTimeout(() => {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 150);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-stone-200 isolate">
      {/* 1. UPPER HORIZONTAL NAVIGATION BAR (Dark Emerald Utility Ribbon) */}
      <div className="bg-[#183D29] text-[#FAF7F0] text-xs border-b border-emerald-950/80 w-full relative z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2">
          {/* Location & International Currency Selectors */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <div className="flex items-center gap-1 shrink-0 text-emerald-300">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="text-emerald-200 hidden md:inline text-[11px] font-medium">Region:</span>
            </div>

            <label htmlFor="county-select" className="sr-only">
              Select Kenyan County
            </label>
            <select
              id="county-select"
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-[#112d1e] text-[#FAF7F0] border border-emerald-800/80 rounded-md px-1.5 py-0.5 text-[11px] sm:text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-400 max-w-[115px] sm:max-w-[160px] truncate cursor-pointer hover:bg-emerald-900/60 transition"
              title="Filter agricultural conditions by county"
            >
              {kenyanCounties.map((c) => (
                <option key={c} value={c} className="bg-[#183D29] text-white">
                  {c}
                </option>
              ))}
            </select>

            <span className="text-emerald-700 hidden lg:inline">|</span>

            {/* Currency Selector (compact on mobile) */}
            <label htmlFor="currency-select" className="sr-only">
              Select Currency
            </label>
            <select
              id="currency-select"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-[#112d1e] text-[#FAF7F0] border border-emerald-800/80 rounded-md px-1.5 py-0.5 text-[11px] sm:text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-emerald-400 hidden sm:inline cursor-pointer hover:bg-emerald-900/60 transition"
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

          {/* Right Utility Controls: Language & Role Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Bilingual English / Kiswahili Switcher */}
            <div
              className="flex items-center gap-0.5 bg-[#112d1e] rounded-md px-1.5 py-0.5 border border-emerald-800/80 text-[11px]"
              role="group"
              aria-label="Language selection"
            >
              <Globe className="w-3 h-3 text-emerald-400 shrink-0 mr-0.5" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                  language === 'en'
                    ? 'text-white bg-emerald-700 shadow-2xs'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <span className="text-emerald-700">/</span>
              <button
                type="button"
                onClick={() => setLanguage('sw')}
                aria-pressed={language === 'sw'}
                className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                  language === 'sw'
                    ? 'text-white bg-emerald-700 shadow-2xs'
                    : 'text-emerald-300 hover:text-white'
                }`}
              >
                SW
              </button>
            </div>

            {/* Role Simulator Dropdown */}
            <div className="relative" ref={roleMenuRef}>
              <button
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                aria-expanded={roleMenuOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 sm:gap-1.5 bg-[#112d1e] text-emerald-100 border border-emerald-800/80 rounded-md px-2 py-0.5 hover:bg-emerald-900 transition text-[11px] sm:text-xs font-medium focus-visible:ring-1 focus-visible:ring-emerald-400"
                title="Switch active user role"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span className="font-semibold text-white capitalize truncate max-w-[80px] sm:max-w-none">
                  {role}
                </span>
                <ChevronDown className="w-3 h-3 text-emerald-400 shrink-0" />
              </button>

              {roleMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-64 max-w-[calc(100vw-24px)] bg-white rounded-xl shadow-2xl border border-stone-200 py-1.5 z-50 text-stone-800 animate-in fade-in zoom-in-95"
                  role="menu"
                >
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[10px] font-bold uppercase tracking-wider text-stone-500 flex items-center justify-between">
                    <span>Role Simulator</span>
                    <span className="text-emerald-700 font-semibold lowercase">Adams Kering</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-stone-100">
                    {rolesList.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setRole(r.id);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-stone-50 transition flex flex-col ${
                          role === r.id ? 'bg-emerald-50/70 text-emerald-900 font-semibold' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900">{r.label}</span>
                          {role === r.id && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-stone-500 leading-tight mt-0.5">
                          {r.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. LOWER HORIZONTAL NAVIGATION BAR (White Brand & Primary Controls) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-2 sm:gap-4 w-full relative z-20">
        {/* Brand Logo & Wordmark */}
        <div
          onClick={() => setCurrentPage('home')}
          className="cursor-pointer group shrink-0 min-w-0"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setCurrentPage('home');
            }
          }}
          aria-label="AgriHub Home"
        >
          {/* Main Logo on Desktop, Compact on Small Mobile */}
          <div className="hidden sm:block">
            <AgriHubLogo size="md" showTagline={true} />
          </div>
          <div className="sm:hidden">
            <AgriHubLogo size="sm" showTagline={false} />
          </div>
        </div>

        {/* Global Search Bar (Desktop & Tablet) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            type="button"
            onClick={openSearchModal}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-stone-100/90 hover:bg-stone-100 text-stone-700 rounded-xl border border-stone-200 text-xs sm:text-sm transition text-left cursor-text focus-visible:ring-2 focus-visible:ring-[#183D29]"
            aria-label="Open global search dialog"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 text-emerald-800 shrink-0" />
              <span className="truncate">Search crops, pests, calculators, prices...</span>
            </span>
            <kbd className="hidden lg:inline-block text-[10px] bg-white border border-stone-300 rounded px-1.5 py-0.5 text-stone-600 font-mono shadow-2xs shrink-0 ml-2">
              Search
            </kbd>
          </button>
        </div>

        {/* Right Action Controls: Search (Mobile), Messages, Notifications, Profile, Hamburger */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={openSearchModal}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition focus-visible:ring-2 focus-visible:ring-[#183D29]"
            aria-label="Search AgriHub"
            title="Search AgriHub"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Farmer Chat / Direct Messaging */}
          <button
            type="button"
            onClick={() => setCurrentPage('messages')}
            className={`p-2 rounded-xl transition relative focus-visible:ring-2 focus-visible:ring-[#183D29] ${
              currentPage === 'messages'
                ? 'bg-[#183D29] text-white shadow-xs'
                : 'text-stone-700 hover:text-[#183D29] hover:bg-stone-100'
            }`}
            title="Farmer Direct Messaging & Expert Inquiries"
            aria-label="Farmer Chat and Messages"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`p-2 rounded-xl relative transition focus-visible:ring-2 focus-visible:ring-[#183D29] ${
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
                {/* Backdrop on mobile for clean dismiss */}
                <div
                  className="fixed inset-0 z-40 bg-stone-900/20 backdrop-blur-2xs sm:hidden"
                  onClick={() => setNotificationsOpen(false)}
                />

                {/* Dropdown panel */}
                <div
                  className="fixed left-3 right-3 top-28 sm:top-full sm:mt-2 sm:absolute sm:inset-auto sm:right-0 w-auto sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2.5 z-50 animate-in fade-in zoom-in-95 overflow-hidden flex flex-col max-h-[75vh]"
                  role="region"
                  aria-label="Notifications Panel"
                >
                  {/* Header */}
                  <div className="px-4 pb-2 border-b border-stone-100 flex items-center justify-between bg-stone-50/80 shrink-0">
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
                          type="button"
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
                        type="button"
                        onClick={() => setNotificationsOpen(false)}
                        className="px-2 py-1 rounded-md bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1 transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Done</span>
                      </button>
                    </div>
                  </div>

                  {/* Notification List */}
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
                          onClick={() => handleNotificationClick(n)}
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
                            type="button"
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

                  {/* Panel Footer */}
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-stone-100 bg-stone-50/70 flex items-center justify-between text-[11px] text-stone-500 shrink-0">
                      <button
                        type="button"
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
                        type="button"
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

          {/* User Profile / Account Switcher */}
          <button
            type="button"
            onClick={() => setCurrentPage('profile')}
            className={`flex items-center gap-1.5 p-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition focus-visible:ring-2 focus-visible:ring-[#183D29] ${
              currentPage === 'profile'
                ? 'bg-[#183D29] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
            title="User Profile & Settings"
            aria-label="User Profile"
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

          {/* PWA Install App (Desktop & Tablet) */}
          <div className="hidden sm:block">
            <PWAInstallButton variant="nav" />
          </div>

          {/* Mobile Drawer Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition focus-visible:ring-2 focus-visible:ring-[#183D29]"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. RESPONSIVE CATEGORY NAVIGATION RIBBON WITH SCROLL CONTROLS & MORE MENU */}
      <nav
        className="block border-t border-stone-200/90 bg-[#FAF7F0] text-xs font-medium text-stone-700 relative z-20 select-none"
        aria-label="Agricultural Categories Navigation"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative flex items-center">
          {/* Left Scroll Navigation Button (with fade gradient) */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 z-30 flex items-center bg-gradient-to-r from-[#FAF7F0] via-[#FAF7F0]/90 to-transparent pr-4 pl-1 pointer-events-none">
              <button
                type="button"
                onClick={() => scrollCategories('left')}
                className="w-7 h-7 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 hover:text-emerald-900 hover:bg-emerald-50 flex items-center justify-center transition active:scale-95 pointer-events-auto cursor-pointer"
                aria-label="Scroll categories left"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}

          {/* Horizontally Scrollable Category Items Container */}
          <div
            ref={categoryScrollRef}
            onWheel={(e) => {
              if (categoryScrollRef.current && (e.deltaY !== 0 || e.deltaX !== 0)) {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                  categoryScrollRef.current.scrollLeft += e.deltaY;
                }
              }
            }}
            className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar py-1.5 scroll-smooth overscroll-x-contain min-w-0 pr-4"
          >
            {primaryNav.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  data-nav-page={item.page}
                  type="button"
                  onClick={() => setCurrentPage(item.page)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-150 shrink-0 text-[11.5px] sm:text-xs font-semibold focus-visible:ring-2 focus-visible:ring-[#183D29] cursor-pointer ${
                    isActive
                      ? 'bg-[#183D29] text-white font-bold shadow-xs'
                      : 'text-stone-700 hover:text-[#183D29] hover:bg-stone-200/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Scroll Navigation Button & More Overflow Menu */}
          <div className="flex items-center shrink-0 pl-1 z-40 gap-1.5" ref={moreMenuRef}>
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scrollCategories('right')}
                className="h-7 px-2.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 text-[11px] font-bold flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer"
                title="Scroll horizontally to see Farm Manager, Learning Centre, Ask Expert, Grants & Jobs, and About"
                aria-label="Scroll categories right"
              >
                <span className="hidden xl:inline text-[11px]">More sections</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            )}

            {/* More ▾ Overflow Dropdown Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                aria-expanded={moreMenuOpen}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold text-[11px] sm:text-xs transition border cursor-pointer ${
                  moreMenuOpen || overflowNavItems.some((o) => o.page === currentPage)
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-white/90 text-stone-800 border-stone-200 hover:bg-white hover:text-emerald-900 shadow-2xs'
                }`}
                aria-label="More agricultural sections"
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

            {moreMenuOpen && (
              <div
                className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 overflow-hidden text-stone-800"
                role="menu"
              >
                <div className="px-3.5 py-1.5 border-b border-stone-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  <span>Additional Sections</span>
                  <span className="text-emerald-700 font-semibold lowercase">Adams Kipkoech Kering</span>
                </div>
                <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                  {overflowNavItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isItemActive = currentPage === item.page;
                    return (
                      <button
                        key={item.page}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setCurrentPage(item.page);
                          setMoreMenuOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 text-xs hover:bg-stone-50 transition flex items-start gap-2.5 cascade-item cascade-stagger-${Math.min(
                          idx + 1,
                          8
                        )} ${isItemActive ? 'bg-emerald-50 text-emerald-950 font-bold' : ''}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isItemActive
                              ? 'bg-emerald-800 text-white'
                              : 'bg-stone-100 text-stone-600 group-hover:text-emerald-800'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-stone-900 text-xs">
                              {item.label}
                            </span>
                            {isItemActive && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE STRUCTURED DRAWER MENU */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-3.5 max-h-[82vh] overflow-y-auto shadow-xl animate-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-label="Mobile Navigation Menu"
        >
          {/* Quick Sign In / Switch Account */}
          <button
            type="button"
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

          {/* PWA Install Button inside Drawer */}
          <div className="pb-1">
            <PWAInstallButton
              variant="drawer"
              onInstalledOrDismissed={() => setMobileMenuOpen(false)}
            />
          </div>

          {/* Categorized Mobile Navigation Grid */}
          <div className="space-y-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 px-1 mb-1.5">
                Core Social & Trade
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { page: 'home' as Page, label: 'Home Feed' },
                  { page: 'community' as Page, label: 'Community' },
                  { page: 'messages' as Page, label: 'Farmer Chat' },
                  { page: 'marketplace' as Page, label: 'Marketplace' },
                ].map((item) => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => {
                      setCurrentPage(item.page);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      currentPage === item.page
                        ? 'bg-[#183D29] text-white font-bold shadow-xs'
                        : 'bg-stone-50 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 px-1 mb-1.5">
                Agronomic Production Guides
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { page: 'crops' as Page, label: 'Crops Guide' },
                  { page: 'livestock' as Page, label: 'Livestock Care' },
                  { page: 'soil-water' as Page, label: 'Soil & Water' },
                  { page: 'pests' as Page, label: 'Pests & IPM' },
                  { page: 'weather' as Page, label: 'Weather & Climate' },
                ].map((item) => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => {
                      setCurrentPage(item.page);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      currentPage === item.page
                        ? 'bg-[#183D29] text-white font-bold shadow-xs'
                        : 'bg-stone-50 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 px-1 mb-1.5">
                Farm Management & Tools
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { page: 'calculators' as Page, label: '26 Farming Calculators' },
                  { page: 'markets' as Page, label: 'Price Benchmarks' },
                  { page: 'suppliers' as Page, label: 'Inputs Directory' },
                  { page: 'farm-manager' as Page, label: 'Farm Manager' },
                ].map((item) => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => {
                      setCurrentPage(item.page);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      currentPage === item.page
                        ? 'bg-[#183D29] text-white font-bold shadow-xs'
                        : 'bg-stone-50 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 px-1 mb-1.5">
                Resources & Platform
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { page: 'learning' as Page, label: 'Learning Centre' },
                  { page: 'expert' as Page, label: 'Ask Expert' },
                  { page: 'opportunities' as Page, label: 'Grants & Jobs' },
                  ...(role === 'admin' || role === 'editor' || role === 'moderator'
                    ? [{ page: 'admin-cms' as Page, label: 'Admin CMS' }]
                    : []),
                  { page: 'about' as Page, label: 'About AgriHub' },
                  { page: 'legal' as Page, label: 'Terms & Privacy' },
                ].map((item) => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => {
                      setCurrentPage(item.page);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      currentPage === item.page
                        ? 'bg-[#183D29] text-white font-bold shadow-xs'
                        : 'bg-stone-50 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal for Sign In & Account Registration */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
};
