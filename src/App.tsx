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

  // Open the community feed first; default to the responsive website view.

  const [currentPage, setCurrentPage] = useState<Page>('community');

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

        return <CommunityPage isMobileFrame={isMobile} />;

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

        return <CommunityPage isMobileFrame={isMobile} />;

    }

  };



  return (

    <LanguageProvider>

      <AuthProvider>

        <FarmProvider>

          <div className="min-h-screen bg-[#F4F1EA] text-stone-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-950">

            {/* Top View Mode Switcher Header for Desktop */}

            <header className="sticky top-0 z-50 bg-[#183D29] text-[#FAF7F0] px-4 py-2.5 shadow-md flex items-center justify-between">

              <div className="flex items-center gap-2">

                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />

                <span className="font-bold text-sm tracking-tight font-serif hidden sm:inline">

                  AgriKnowledge Hub

                </span>

                <span className="text-xs text-emerald-200/80 hidden sm:inline">|</span>

                <span className="text-xs text-emerald-100 font-medium">

                  {viewMode === 'phone' ? 'Phone Mode (Active)' : 'Desktop Web Mode'}

                </span>

              </div>



              {/* View Switcher Controls */}

              <div className="flex items-center gap-2">

                <div className="bg-[#112d1e] p-1 rounded-xl flex items-center gap-1 border border-emerald-900/60">

                  <button

                    onClick={() => setViewMode('phone')}

                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${

                      viewMode === 'phone'

                        ? 'bg-emerald-600 text-white shadow-xs'

                        : 'text-emerald-200 hover:text-white'

                    }`}

                  >

                    <Smartphone className="w-3.5 h-3.5" />

                    <span>Phone View</span>

                  </button>



                  <button

                    onClick={() => setViewMode('desktop')}

                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${

                      viewMode === 'desktop'

                        ? 'bg-emerald-600 text-white shadow-xs'

                        : 'text-emerald-200 hover:text-white'

                    }`}

                  >

                    <Monitor className="w-3.5 h-3.5" />

                    <span>Full Desktop</span>

                  </button>

                </div>



                {viewMode === 'phone' && (

                  <div className="hidden lg:flex items-center gap-1 bg-emerald-950/80 px-2 py-1 rounded-xl border border-emerald-900/60 text-xs">

                    <span className="text-emerald-300 mr-1">Phone Tab:</span>

                    <button

                      onClick={() => setCurrentPage('community')}

                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${

                        currentPage === 'community'

                          ? 'bg-[#FAF7F0] text-[#183D29]'

                          : 'text-emerald-200 hover:text-white'

                      }`}

                    >

                      Community 🍅

                    </button>

                    <button

                      onClick={() => setCurrentPage('home')}

                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${

                        currentPage === 'home'

                          ? 'bg-[#FAF7F0] text-[#183D29]'

                          : 'text-emerald-200 hover:text-white'

                      }`}

                    >

                      Home

                    </button>

                    <button

                      onClick={() => setCurrentPage('events')}

                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${

                        currentPage === 'events'

                          ? 'bg-[#FAF7F0] text-[#183D29]'

                          : 'text-emerald-200 hover:text-white'

                      }`}

                    >

                      Events

                    </button>

                    <button

                      onClick={() => setCurrentPage('profile')}

                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${

                        currentPage === 'profile'

                          ? 'bg-[#FAF7F0] text-[#183D29]'

                          : 'text-emerald-200 hover:text-white'

                      }`}

                    >

                      Profile

                    </button>

                  </div>

                )}

              </div>

            </header>



            {/* CONDITIONAL RENDERING BASED ON VIEW MODE */}

            {viewMode === 'phone' ? (

              {/* PHONE MOCKUP VIEW: Interactive phone preview */}

              <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 bg-gradient-to-b from-[#EDE8DE] to-[#E3DDD1]">

                <div className="text-center mb-2 hidden sm:block">

                  <p className="text-xs text-stone-600 font-medium">

                    Rendered exactly as on mobile device • Interactive feed, likes, comments, and tab navigation

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

              {/* FULL DESKTOP WEB VIEW */}

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



            {/* Native Mobile Bottom Navigation (Only visible on actual physical phone screens < 768px when in desktop mode) */}

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