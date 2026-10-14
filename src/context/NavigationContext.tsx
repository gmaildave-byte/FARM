import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Page } from '../types';

export interface NavigationContextType {
  currentPage: Page;
  currentParams: Record<string, string>;
  navigateTo: (page: Page, params?: Record<string, string>, replace?: boolean) => void;
  goBack: () => void;
  activeOverlay: string | null;
  openOverlay: (overlayId: string) => void;
  closeOverlay: (overlayId?: string) => void;
  getParam: (key: string, fallback?: string) => string;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const VALID_PAGES: Page[] = [
  'home',
  'crops',
  'livestock',
  'soil-water',
  'pests',
  'weather',
  'calculators',
  'markets',
  'marketplace',
  'suppliers',
  'farm-manager',
  'learning',
  'ai-assistant',
  'expert',
  'community',
  'opportunities',
  'farm-business',
  'sustainable',
  'admin-cms',
  'about',
  'events',
  'profile',
  'discover',
  'legal',
  'messages',
];

export const parseHashRoute = (): { page: Page; params: Record<string, string> } => {
  if (typeof window === 'undefined') return { page: 'home', params: {} };
  const rawHash = window.location.hash.replace(/^#\/?/, '');
  if (!rawHash) return { page: 'home', params: {} };

  const [pagePart, queryPart] = rawHash.split('?');
  const page = VALID_PAGES.includes(pagePart as Page) ? (pagePart as Page) : 'home';
  const params: Record<string, string> = {};

  if (queryPart) {
    const searchParams = new URLSearchParams(queryPart);
    searchParams.forEach((val, key) => {
      params[key] = val;
    });
  }

  return { page, params };
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = parseHashRoute();
  const [currentPage, setCurrentPage] = useState<Page>(initial.page);
  const [currentParams, setCurrentParams] = useState<Record<string, string>>(initial.params);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  const scrollPositions = useRef<Record<string, number>>({});
  const activeOverlayRef = useRef<string | null>(null);
  activeOverlayRef.current = activeOverlay;

  // Track and restore scroll positions per page
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && !activeOverlayRef.current) {
        scrollPositions.current[currentPage] = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Synchronize with browser history and popstate (handles Back and Forward buttons & Android Back)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // 1. If an overlay was open, close the overlay first
      if (activeOverlayRef.current) {
        setActiveOverlay(null);
        return;
      }

      // 2. Otherwise navigate to the popped page
      const state = e.state;
      let targetPage: Page = 'home';
      let targetParams: Record<string, string> = {};

      if (state && state.page && VALID_PAGES.includes(state.page)) {
        targetPage = state.page;
        targetParams = state.params || {};
      } else {
        const parsed = parseHashRoute();
        targetPage = parsed.page;
        targetParams = parsed.params;
      }

      setCurrentPage(targetPage);
      setCurrentParams(targetParams);

      // Restore scroll position
      requestAnimationFrame(() => {
        const savedY = scrollPositions.current[targetPage] || 0;
        window.scrollTo({ top: savedY, behavior: 'instant' });
      });
    };

    window.addEventListener('popstate', handlePopState);

    // Initial state setup if empty
    if (!window.history.state) {
      let hashStr = `#${initial.page}`;
      if (Object.keys(initial.params).length > 0) {
        hashStr += `?${new URLSearchParams(initial.params).toString()}`;
      }
      window.history.replaceState({ page: initial.page, params: initial.params, overlay: null }, '', hashStr);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: Page, params?: Record<string, string>, replace = false) => {
    // If any overlay is open, dismiss it
    if (activeOverlayRef.current) {
      setActiveOverlay(null);
    }

    // Save current scroll position before leaving
    scrollPositions.current[currentPage] = window.scrollY;

    const newParams = params || {};
    let hashStr = `#${page}`;
    if (Object.keys(newParams).length > 0) {
      hashStr += `?${new URLSearchParams(newParams).toString()}`;
    }

    const stateObj = { page, params: newParams, overlay: null };

    if (replace) {
      window.history.replaceState(stateObj, '', hashStr);
    } else {
      // Avoid duplicate history pushes for exact same page & params
      const isSame =
        currentPage === page &&
        JSON.stringify(currentParams) === JSON.stringify(newParams);

      if (!isSame) {
        window.history.pushState(stateObj, '', hashStr);
      }
    }

    setCurrentPage(page);
    setCurrentParams(newParams);

    // Scroll to top or restore position
    requestAnimationFrame(() => {
      const savedY = scrollPositions.current[page] || 0;
      window.scrollTo({ top: savedY, behavior: 'instant' });
    });
  };

  const openOverlay = (overlayId: string) => {
    setActiveOverlay(overlayId);
    // Push an overlay history entry so pressing Back closes the overlay!
    window.history.pushState(
      { page: currentPage, params: currentParams, overlay: overlayId },
      ''
    );
  };

  const closeOverlay = (overlayId?: string) => {
    if (activeOverlay) {
      setActiveOverlay(null);
      // If the top state in history was this overlay, step back to clean history
      if (window.history.state?.overlay) {
        window.history.back();
      }
    }
  };

  const goBack = () => {
    if (activeOverlayRef.current) {
      closeOverlay();
      return;
    }
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo('home', {}, true);
    }
  };

  const getParam = (key: string, fallback = '') => {
    return currentParams[key] ?? fallback;
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        currentParams,
        navigateTo,
        goBack,
        activeOverlay,
        openOverlay,
        closeOverlay,
        getParam,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
