import React, { useState } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
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
import { MessagesPage } from './pages/MessagesPage';
import { CreateActionModal } from './components/CreateActionModal';
import type { Page } from './types';
import { ArrowLeft } from 'lucide-react';

function AppContent() {
  const { currentPage, navigateTo, goBack, activeOverlay, openOverlay, closeOverlay } = useNavigation();

  const [selectedCounty, setSelectedCounty] = useState<string>('Uasin Gishu');
  const [activeCalcId, setActiveCalcId] = useState<number | undefined>(undefined);

  const navigateToTool = (page: Page, toolId?: number) => {
    if (toolId && page === 'calculators') {
      setActiveCalcId(toolId);
    }
    navigateTo(page);
  };

  const handleCreateSelect = (action: 'post' | 'listing' | 'ask' | 'verify') => {
    closeOverlay('create');
    if (action === 'post') {
      navigateTo('community');
    } else if (action === 'listing') {
      navigateTo('marketplace');
    } else if (action === 'ask') {
      navigateTo('expert');
    } else if (action === 'verify') {
      navigateTo('profile');
    }
  };

  const handleSelectSearchResult = (page: Page) => {
    closeOverlay('search');
    navigateTo(page);
  };

  const renderCurrentContent = (isMobile = false) => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={navigateTo}
            openSearchModal={() => openOverlay('search')}
            selectedCounty={selectedCounty}
          />
        );
      case 'reels':
        return (
          <CommunityPage
            isMobileFrame={isMobile}
            initialMode="reels"
            onNavigateToProfile={() => navigateTo('profile')}
            onNavigateToPage={navigateToTool}
          />
        );
      case 'social-feed':
      case 'community':
        return (
          <CommunityPage
            isMobileFrame={isMobile}
            initialMode="feed"
            onNavigateToProfile={() => navigateTo('profile')}
            onNavigateToPage={navigateToTool}
          />
        );
      case 'messages':
        return <MessagesPage setCurrentPage={navigateTo} />;
      case 'marketplace':
        return (
          <MarketplacePage
            onSelectSellerProfile={() => navigateTo('profile')}
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
                onClick={goBack}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 hover:bg-[#183D29]/20 px-3 py-1.5 rounded-full transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
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
                onClick={goBack}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 hover:bg-[#183D29]/20 px-3 py-1.5 rounded-full transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
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
                onClick={goBack}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 hover:bg-[#183D29]/20 px-3 py-1.5 rounded-full transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}
            <SoilWaterPage setCurrentPage={navigateTo} />
          </div>
        );
      case 'pests':
        return (
          <div className="space-y-4">
            {isMobile && (
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 hover:bg-[#183D29]/20 px-3 py-1.5 rounded-full transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
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
                onClick={goBack}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 hover:bg-[#183D29]/20 px-3 py-1.5 rounded-full transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
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
                onClick={goBack}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 hover:bg-[#183D29]/20 px-3 py-1.5 rounded-full transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}
            <CalculatorsPage onBack={goBack} initialCalcId={activeCalcId} />
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
            setCurrentPage={navigateTo}
            openSearchModal={() => openOverlay('search')}
            selectedCounty={selectedCounty}
          />
        );
      case 'legal':
        return <LegalPage />;
      default:
        return (
          <HomePage
            setCurrentPage={navigateTo}
            openSearchModal={() => openOverlay('search')}
            selectedCounty={selectedCounty}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-stone-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950 w-full overflow-x-hidden">
      {/* Main Responsive Experience */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        <Navbar
          currentPage={currentPage}
          setCurrentPage={navigateTo}
          openSearchModal={() => openOverlay('search')}
          selectedCounty={selectedCounty}
          setSelectedCounty={setSelectedCounty}
        />

        <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 pt-3 sm:pt-5 pb-24 md:pb-14 min-w-0 overflow-x-hidden">
          {renderCurrentContent(false)}
        </main>

        <Footer setCurrentPage={navigateTo} />
      </div>

      {/* Native Mobile Bottom Navigation */}
      <MobileBottomNav
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        onCreateClick={() => openOverlay('create')}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={activeOverlay === 'search'}
        onClose={() => closeOverlay('search')}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Mobile Create Action Modal */}
      <CreateActionModal
        isOpen={activeOverlay === 'create'}
        onClose={() => closeOverlay('create')}
        onSelectAction={handleCreateSelect}
      />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <LanguageProvider>
        <AuthProvider>
          <FarmProvider>
            <AppContent />
          </FarmProvider>
        </AuthProvider>
      </LanguageProvider>
    </NavigationProvider>
  );
}