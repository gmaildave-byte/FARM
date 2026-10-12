import React from 'react';
import { Home, Users, ShoppingBag, Calculator, User } from 'lucide-react';
import { Page } from '../types';

interface MobileBottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const tabs = [
    {
      id: 'home' as Page,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'community' as Page,
      label: 'Community',
      icon: Users,
    },
    {
      id: 'marketplace' as Page,
      label: 'Marketplace',
      icon: ShoppingBag,
    },
    {
      id: 'calculators' as Page,
      label: 'Tools',
      icon: Calculator,
    },
    {
      id: 'profile' as Page,
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed md:hidden bottom-0 left-0 right-0 z-40 bg-[#FAF7F0] border-t border-stone-200/80 px-2 pt-1.5 pb-4 select-none shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            currentPage === tab.id ||
            (tab.id === 'home' &&
              !['community', 'marketplace', 'calculators', 'profile'].includes(currentPage));

          const IconComponent = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(tab.id)}
              className="flex flex-col items-center justify-center relative py-1 px-2 min-w-[56px] transition active:scale-95"
            >
              <div className="relative flex flex-col items-center">
                <IconComponent
                  className={`w-5 h-5 transition-colors duration-150 stroke-[1.8] ${
                    isActive ? 'text-[#183D29]' : 'text-stone-500'
                  }`}
                />

                {/* Green Indicator Underline */}
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
