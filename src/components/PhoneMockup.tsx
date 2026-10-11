import React from 'react';
import { Wifi, BatteryMedium, Signal, Home, Users, Calendar, User } from 'lucide-react';
import { Page } from '../types';

interface PhoneMockupProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  children: React.ReactNode;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  currentPage,
  setCurrentPage,
  children,
}) => {
  const tabs = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'community' as Page, label: 'Community', icon: Users },
    { id: 'events' as Page, label: 'Events', icon: Calendar },
    { id: 'profile' as Page, label: 'Profile', icon: User },
  ];

  return (
    <div className="flex justify-center items-center py-4 sm:py-6 px-2 select-none">
      {/* Outer iPhone Titanium Frame */}
      <div className="relative w-full max-w-[400px] h-[844px] bg-[#1a1a1a] rounded-[52px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.1),0_0_0_4px_#333333] border-[3px] border-[#2b2b2b] flex flex-col overflow-hidden">
        {/* Side button accents */}
        <div className="absolute -left-[5px] top-28 w-[3px] h-10 bg-stone-600 rounded-l-sm" />
        <div className="absolute -left-[5px] top-42 w-[3px] h-12 bg-stone-600 rounded-l-sm" />
        <div className="absolute -left-[5px] top-58 w-[3px] h-12 bg-stone-600 rounded-l-sm" />
        <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-stone-600 rounded-r-sm" />

        {/* Inner Phone Screen */}
        <div className="relative w-full h-full bg-[#FAF7F0] rounded-[42px] overflow-hidden flex flex-col border border-black/10">
          {/* iOS Top Status Bar matching screenshot */}
          <div className="h-11 pt-2.5 px-7 flex items-center justify-between text-stone-900 z-30 shrink-0 bg-[#FAF7F0]/95 backdrop-blur-xs">
            {/* Clock */}
            <span className="font-semibold text-sm tracking-tight">9:41</span>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-7 bg-black rounded-full flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-stone-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a1a2e] border border-blue-900/40" />
            </div>

            {/* Icons: Signal, Wifi, Battery */}
            <div className="flex items-center gap-1.5 text-stone-800">
              <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              <div className="w-5 h-2.5 border-[1.5px] border-stone-800 rounded-xs p-[1px] flex items-center">
                <div className="w-3 h-1.5 bg-stone-800 rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-4 pt-1 pb-20 no-scrollbar">
            {children}
          </div>

          {/* Bottom Tab Bar matching screenshot */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#FAF7F0] border-t border-stone-200/80 pt-2 pb-5 px-3">
            <div className="flex items-center justify-around">
              {tabs.map((tab) => {
                const isActive =
                  currentPage === tab.id ||
                  (tab.id === 'home' &&
                    !['community', 'events', 'profile'].includes(currentPage));

                const IconComponent = tab.icon;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentPage(tab.id)}
                    className="flex flex-col items-center justify-center py-1 px-3 min-w-[62px] transition active:scale-95"
                  >
                    <div className="relative flex flex-col items-center">
                      <IconComponent
                        className={`w-6 h-6 transition-colors duration-150 stroke-[1.8] ${
                          isActive ? 'text-[#183D29]' : 'text-stone-500'
                        }`}
                      />

                      {/* Green Horizontal Indicator Underline */}
                      {isActive && (
                        <span className="w-5 h-[2.5px] bg-[#183D29] rounded-full mt-1" />
                      )}
                    </div>

                    <span
                      className={`text-[11px] mt-0.5 tracking-tight font-medium ${
                        isActive ? 'text-[#183D29] font-bold' : 'text-stone-500'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="w-32 h-1 bg-stone-900/30 rounded-full mx-auto mt-2.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
