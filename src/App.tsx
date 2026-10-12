import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PhoneMockup } from './components/PhoneMockup';
import { MobileBottomNav } from './components/MobileBottomNav';

// Pages
import { HomePage } from './pages/HomePage';
import { CropsPage } from './pages/CropsPage';
import { LivestockPage } from './pages/LivestockPage';
import { SoilWaterPage } from './pages/SoilWaterPage';
import { PestsPage } from './pages/PestsPage';
import { WeatherPage } from './pages/WeatherPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { MarketsPage } from './pages/MarketsPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { SuppliersPage } from './pages/SuppliersPage';
import { FarmDashboardPage } from './pages/FarmDashboardPage';
import { LearningPage } from './pages/LearningPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { ExpertPage } from './pages/ExpertPage';
import { CommunityPage } from './pages/CommunityPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { FarmBusinessPage } from './pages/FarmBusinessPage';
import { SustainablePage } from './pages/SustainablePage';
import { AdminCmsPage } from './pages/AdminCmsPage';
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './pages/EventsPage';
import { ProfilePage } from './pages/ProfilePage';
import type { Page } from './types';
import { Smartphone, Monitor, ArrowLeft } from 'lucide-react';

export default function App() {
  // Production site opens on responsive Home view by default; not inside an artificial phone mockup
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<string>('Uasin Gishu');
  const [viewMode, setViewMode] = useState<'phone' | 'desktop'>('desktop');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleSelectSearchResult = (page: Page) => {
    setCurrentPage(page);
  };

  const renderCurrentContent = (isMobile = false) => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            openSearchModal={() => setSearchModalOpen(true)}
            selectedCounty={selectedCounty}
          />
        );
      case 'community':
        return (
          <CommunityPage
            isMobileFrame={isMobile}
            onNavigateToProfile={() => setCurrentPage('profile')}
          />
        );
      case 'marketplace':
        return (
          <MarketplacePage
            onSelectSellerProfile={() => setCurrentPage('profile')}
          />
        );
      case 'events':
        return <EventsPage isMobileFrame={isMobile} />;
      case 'profile':
        return <ProfilePage isMobileFrame={isMobile} />;
      case 'crops':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <CropsPage />
          </div>
        );
      case 'livestock':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <LivestockPage />
          </div>
        );
      case 'soil-water':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <SoilWaterPage setCurrentPage={setCurrentPage} />
          </div>
        );
      case 'pests':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <PestsPage />
          </div>
        );
      case 'weather':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <WeatherPage
              selectedCounty={selectedCounty}
              setSelectedCounty={setSelectedCounty}
            />
          </div>
        );
      case 'calculators':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 px-3 py-1.5 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            )}
            <CalculatorsPage />
          </div>
        );
      case 'markets':
        return <MarketsPage />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'farm-manager':
        return <FarmDashboardPage />;
      case 'learning':
        return <LearningPage />;
      case 'ai-assistant':
        return <AiAssistantPage selectedCounty={selectedCounty} />;
      case 'expert':
        return <ExpertPage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'farm-business':
        return <FarmBusinessPage />;
      case 'sustainable':
        return <SustainablePage />;
      case 'admin-cms':
        return <AdminCmsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            openSearchModal={() => setSearchModalOpen(true)}
            selectedCounty={selectedCounty}
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <FarmProvider>
          <div className="min-h-screen bg-[#F4F1EA] text-stone-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
            {/* Top View Mode Switcher Header for Desktop Preview */}
            <header className="sticky top-0 z-50 bg-[#183D29] text-[#FAF7F0] px-4 py-2 shadow-md flex items-center justify-between border-b border-emerald-950">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-xs sm:text-sm tracking-tight font-serif hidden sm:inline">
                  AgriKnowledge Hub
                </span>
                <span className="text-xs text-emerald-300/80 hidden sm:inline">|</span>
                <span className="text-[11px] sm:text-xs text-emerald-100 font-medium">
                  {viewMode === 'phone' ? 'Mobile Viewport Simulator' : 'Production Responsive Web'}
                </span>
              </div>

              {/* View Switcher Controls */}
              <div className="flex items-center gap-2">
                <div className="bg-[#112d1e] p-1 rounded-xl flex items-center gap-1 border border-emerald-900/60">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      viewMode === 'desktop'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-200 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Responsive Web</span>
                  </button>

                  <button
                    onClick={() => setViewMode('phone')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                      viewMode === 'phone'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-200 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Phone Preview</span>
                  </button>
                </div>

                {viewMode === 'phone' && (
                  <div className="hidden lg:flex items-center gap-1 bg-emerald-950/80 px-2 py-1 rounded-xl border border-emerald-900/60 text-xs">
                    <span className="text-emerald-300 mr-1">Phone Tab:</span>
                    <button
                      onClick={() => setCurrentPage('home')}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                        currentPage === 'home' ? 'bg-[#FAF7F0] text-[#183D29]' : 'text-emerald-200 hover:text-white'
                      }`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => setCurrentPage('community')}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                        currentPage === 'community' ? 'bg-[#FAF7F0] text-[#183D29]' : 'text-emerald-200 hover:text-white'
                      }`}
                    >
                      Community 🍅
                    </button>
                    <button
                      onClick={() => setCurrentPage('marketplace')}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                        currentPage === 'marketplace' ? 'bg-[#FAF7F0] text-[#183D29]' : 'text-emerald-200 hover:text-white'
                      }`}
                    >
                      Marketplace
                    </button>
                    <button
                      onClick={() => setCurrentPage('calculators')}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                        currentPage === 'calculators' ? 'bg-[#FAF7F0] text-[#183D29]' : 'text-emerald-200 hover:text-white'
                      }`}
                    >
                      Tools
                    </button>
                    <button
                      onClick={() => setCurrentPage('profile')}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                        currentPage === 'profile' ? 'bg-[#FAF7F0] text-[#183D29]' : 'text-emerald-200 hover:text-white'
                      }`}
                    >
                      Profile
                    </button>
                  </div>
                )}
              </div>
            </header>

            {/* Content Display: Full Responsive Web by default, or Phone Mockup Preview */}
            {viewMode === 'phone' ? (
              <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 bg-gradient-to-b from-[#EDE8DE] to-[#E3DDD1]">
                <div className="text-center mb-2 hidden sm:block">
                  <p className="text-xs text-stone-600 font-medium">
                    Phone Viewport Simulator • Exact iOS native layout with dynamic island and bottom tabs
                  </p>
                </div>
                <PhoneMockup
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                >
                  {renderCurrentContent(true)}
                </PhoneMockup>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <Navbar
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  openSearchModal={() => setSearchModalOpen(true)}
                  selectedCounty={selectedCounty}
                  setSelectedCounty={setSelectedCounty}
                />

                <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 pt-6 sm:pt-8 pb-16">
                  {renderCurrentContent(false)}
                </main>

                <Footer setCurrentPage={setCurrentPage} />
              </div>
            )}

            {/* Native Mobile Bottom Navigation for actual mobile devices */}
            {viewMode === 'desktop' && (
              <MobileBottomNav
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}

            {/* Global Search Modal */}
            <GlobalSearchModal
              isOpen={searchModalOpen}
              onClose={() => setSearchModalOpen(false)}
              onSelectResult={handleSelectSearchResult}
            />
          </div>
        </FarmProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}