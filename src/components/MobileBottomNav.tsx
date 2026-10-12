import React from 'react';
import {
  Home,
  Compass,
  Plus,
  ShoppingBag,
  User
} from 'lucide-react';
import { Page } from '../types';

interface MobileBottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onCreateClick: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  setCurrentPage,
  onCreateClick,
}) => {
  const tabs = [
    {
      id: 'home' as Page,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'discover' as Page,
      label: 'Discover',
      icon: Compass,
    },
    {
      id: 'create' as const,
      label: 'Create',
      isAction: true,
      icon: Plus,
    },
    {
      id: 'marketplace' as Page,
      label: 'Marketplace',
      icon: ShoppingBag,
    },
    {
      id: 'profile' as Page,
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 z-40 bg-[#FAF7F0] border-t border-stone-200/90 px-3 pt-1.5 pb-4 select-none shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          if (tab.isAction) {
            return (
              <button
                key="create-action"
                onClick={onCreateClick}
                className="flex flex-col items-center justify-center relative -mt-5 transition active:scale-95 focus:outline-none"
                aria-label="Create Post or Listing"
              >
                <div className="w-12 h-12 rounded-full bg-[#183D29] hover:bg-[#122e1f] text-[#FAF7F0] shadow-lg flex items-center justify-center border-4 border-[#FAF7F0] transition-transform">
                  <Plus className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight font-bold text-[#183D29]">
                  Create
                </span>
              </button>
            );
          }

          const isActive =
            currentPage === tab.id ||
            (tab.id === 'home' &&
              !['discover', 'marketplace', 'profile', 'community'].includes(currentPage)) ||
            (tab.id === 'discover' &&
              ['crops', 'livestock', 'soil-water', 'pests', 'weather', 'calculators', 'learning', 'suppliers', 'ai-assistant', 'markets'].includes(currentPage));

          const IconComponent = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id as Page)}
              className="flex flex-col items-center justify-center relative py-1 px-2 min-w-[56px] transition active:scale-95 focus:outline-none"
            >
              <div className="relative flex flex-col items-center">
                <IconComponent
                  className={`w-5 h-5 transition-colors duration-150 stroke-[1.8] ${
                    isActive ? 'text-[#183D29]' : 'text-stone-500'
                  }`}
                />

                {/* Dark Green Active Indicator Underline */}
                {isActive && (
                  <span className="w-4 h-[2px] bg-[#183D29] rounded-full mt-0.5 animate-in fade-in" />
                )}
              </div>

              <span
                className={`text-[10px] mt-0.5 tracking-tight font-medium transition-colors ${
                  isActive ? 'text-[#183D29] font-bold' : 'text-stone-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
