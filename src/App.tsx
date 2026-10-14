import React, { useState, useEffect, useRef } from 'react';
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

const VALID_PAGES: Page[] = [
  'home',
  'explore',
  'crops',
  'crop-detail',
  'livestock',
  'soil-water',
  'pests',
  'weather',
  'farm-manager',
  'calculators',
  'markets',
  'marketplace',
  'marketplace-create',
  'social-feed',
  'community',
  'reels',
  'profile',
  'messages',
  'notifications',
  'suppliers',
  'sustainable',
  'learning',
  'expert',
  'ai-assistant',
  'opportunities',
  'farm-business',
  'admin-cms',
  'about',
  'events',
  'discover',
  'legal',
];

const parsePageFromHash = (hash: string): Page => {
  if (!hash) return 'home';
  const clean = hash.replace(/^#\/?/, '').split('?')[0].split('/')[0];
  if (clean.startsWith('reel-')) return 'reels';
  if (clean === 'reels') return 'reels';
  if (VALID_PAGES.includes(clean as Page)) {
    return clean as Page;
  }
  return 'home';
};

export default function App() {
  const scrollMapRef = useRef<Record<string, number>>({});

  const [currentPage, setCurrentPage] = useState<Page>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return parsePageFromHash(window.location.hash);
    }
    return 'home';
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState<string>('Uasin Gishu');
  const [activeCalcId, setActiveCalcId] = useState<number | undefined>(undefined);

  const navigateToTool = (page: Page, toolId?: number) => {
    if (toolId && page === 'calculators') {
      setActiveCalcId(toolId);
    }
    navigate(page);
  };

  // Navigate to target page and maintain browser history stack
  const navigate = (nextPage: Page, options?: { replace?: boolean }) => {
    // Record scroll position for current page before leaving
    if (typeof window !== 'undefined') {
      scrollMapRef.current[currentPage] = window.scrollY;
    }

    if (nextPage === currentPage) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    const newHash = '#' + nextPage;
    if (options?.replace) {
      window.history.replaceState({ page: nextPage }, '', newHash);
    } else {
      window.history.pushState({ page: nextPage }, '', newHash);
    }

    setCurrentPage(nextPage);

    // If restoring previous scroll position for target page
    const savedScrollY = scrollMapRef.current[nextPage] || 0;
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
    });
  };

  // Safe backward navigation
  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      navigate('home');
    }
  };

  // Open modal with back-dismiss capability
  const handleOpenSearchModal = () => {
    try {
      window.history.pushState({ modal: 'search', page: currentPage }, '', window.location.hash);
    } catch {}
    setSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setSearchModalOpen(false);
    if (window.history.state?.modal === 'search') {
      window.history.back();
    }
  };

  const handleOpenCreateModal = () => {
    try {
      window.history.pushState({ modal: 'create', page: currentPage }, '', window.location.hash);
    } catch {}
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    if (window.history.state?.modal === 'create') {
      window.history.back();
    }
  };

  const handleCreateSelect = (action: 'post' | 'listing' | 'ask' | 'verify') => {
    setCreateModalOpen(false);
    if (action === 'post') {
      navigate('community');
    } else if (action === 'listing') {
      navigate('marketplace');
    } else if (action === 'ask') {
      navigate('expert');
    } else if (action === 'verify') {
      navigate('profile');
    }
  };

  // Listen for browser Back/Forward (popstate)
  useEffect(() => {
    // Ensure initial history state is set with { page: currentPage }
    if (!window.history.state?.page) {
      window.history.replaceState({ page: currentPage }, '', window.location.hash || '#home');
    }

    const handlePopState = (event: PopStateEvent) => {
      // 1. If an active modal is open, dismiss it first
      if (searchModalOpen) {
        setSearchModalOpen(false);
        return;
      }
      if (createModalOpen) {
        setCreateModalOpen(false);
        return;
      }

      // 2. Otherwise route to the popped page
      const targetPage = event.state?.page || parsePageFromHash(window.location.hash);
      setCurrentPage(targetPage);

      const savedScrollY = scrollMapRef.current[targetPage] || 0;
      requestAnimationFrame(() => {
        window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchModalOpen, createModalOpen, currentPage]);

  const handleSelectSearchResult = (page: Page) => {
    setSearchModalOpen(false);
    navigate(page);
  };

  const renderCurrentContent = (isMobile = false) => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            setCurrentPage={navigate}
            openSearchModal={handleOpenSearchModal}
            selectedCounty={selectedCounty}
          />
        );
      case 'reels':
        return (
          <CommunityPage
            isMobileFrame={isMobile}
            initialMode="reels"
            onNavigateToProfile={() => navigate('profile')}
            onNavigateToPage={navigateToTool}
          />
        );
      case 'social-feed':
      case 'community':
        return (
          <CommunityPage
            isMobileFrame={isMobile}
            initialMode="feed"
            onNavigateToProfile={() => navigate('profile')}
            onNavigateToPage={navigateToTool}
          />
        );
      case 'messages':
        return <MessagesPage setCurrentPage={navigate} />;
      case 'marketplace':
        return (
          <MarketplacePage
            onSelectSellerProfile={() => navigate('profile')}
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
            <SoilWaterPage setCurrentPage={navigate} />
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
            setCurrentPage={navigate}
            openSearchModal={handleOpenSearchModal}
            selectedCounty={selectedCounty}
          />
        );
      case 'legal':
        return <LegalPage />;
      default:
        return (
          <HomePage
            setCurrentPage={navigate}
            openSearchModal={handleOpenSearchModal}
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
            {/* Main Responsive Experience */}
            <div className="flex-1 flex flex-col w-full min-w-0">
              <Navbar
                currentPage={currentPage}
                setCurrentPage={navigate}
                openSearchModal={handleOpenSearchModal}
                selectedCounty={selectedCounty}
                setSelectedCounty={setSelectedCounty}
              />

              <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-20 md:pb-12 min-w-0 overflow-x-hidden">
                {renderCurrentContent(false)}
              </main>

              <Footer setCurrentPage={navigate} />
            </div>

            {/* Native Mobile Bottom Navigation */}
            <MobileBottomNav
              currentPage={currentPage}
              setCurrentPage={navigate}
              onCreateClick={handleOpenCreateModal}
            />

            {/* Global Search Modal */}
            <GlobalSearchModal
              isOpen={searchModalOpen}
              onClose={handleCloseSearchModal}
              onSelectResult={handleSelectSearchResult}
            />

            {/* Mobile Create Action Modal */}
            <CreateActionModal
              isOpen={createModalOpen}
              onClose={handleCloseCreateModal}
              onSelectAction={handleCreateSelect}
            />
          </div>
        </FarmProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}