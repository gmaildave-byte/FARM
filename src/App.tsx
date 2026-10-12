import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
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
import { DiscoverPage } from './pages/DiscoverPage';
import { LegalPage } from './pages/LegalPage';
import { CreateActionModal } from './components/CreateActionModal';
import type { Page } from './types';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<string>('Uasin Gishu');

  const handleCreateSelect = (action: 'post' | 'listing' | 'ask' | 'verify') => {
    setCreateModalOpen(false);
    if (action === 'post') {
      setCurrentPage('community');
    } else if (action === 'listing') {
      setCurrentPage('marketplace');
    } else if (action === 'ask') {
      setCurrentPage('expert');
    } else if (action === 'verify') {
      setCurrentPage('profile');
    }
  };

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
      case 'discover':
        return (
          <DiscoverPage
            setCurrentPage={setCurrentPage}
            openSearchModal={() => setSearchModalOpen(true)}
            selectedCounty={selectedCounty}
          />
        );
      case 'legal':
        return <LegalPage />;
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
          <div className="min-h-screen bg-[#F4F1EA] text-stone-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950 w-full overflow-x-hidden">
            {/* Main Full-Width Responsive Website Experience */}
            <div className="flex-1 flex flex-col w-full min-w-0">
              <Navbar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                openSearchModal={() => setSearchModalOpen(true)}
                selectedCounty={selectedCounty}
                setSelectedCounty={setSelectedCounty}
              />

              <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 md:pb-12 min-w-0 overflow-x-hidden">
                {renderCurrentContent(false)}
              </main>

              <Footer setCurrentPage={setCurrentPage} />
            </div>

            {/* Native Mobile Bottom Navigation for all mobile phones (<768px) */}
            <MobileBottomNav
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onCreateClick={() => setCreateModalOpen(true)}
            />

            {/* Global Search Modal */}
            <GlobalSearchModal
              isOpen={searchModalOpen}
              onClose={() => setSearchModalOpen(false)}
              onSelectResult={handleSelectSearchResult}
            />

            {/* Mobile Create Action Modal */}
            <CreateActionModal
              isOpen={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSelectAction={handleCreateSelect}
            />
          </div>
        </FarmProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}