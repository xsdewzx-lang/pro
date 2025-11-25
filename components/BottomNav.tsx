import React from 'react';
import { Home, PlusCircle, Search, User, BarChart2 } from 'lucide-react';
import { ScreenName } from '../types';

interface BottomNavProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { screen: ScreenName.HOME, icon: Home, label: 'Home' },
    { screen: ScreenName.SEARCH, icon: Search, label: 'Search' },
    { screen: ScreenName.HOME, icon: PlusCircle, label: 'Add', isSpecial: true }, // Add redirects to search for now, or opens modal
    { screen: ScreenName.HOME, icon: BarChart2, label: 'Progress' }, // Placeholder
    { screen: ScreenName.PROFILE, icon: User, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-2 flex justify-between items-center pb-6 md:pb-2">
      {navItems.map((item, index) => {
        const isActive = currentScreen === item.screen && !item.isSpecial;
        const Icon = item.icon;
        
        if (item.isSpecial) {
          return (
            <button 
              key={index}
              onClick={() => onNavigate(ScreenName.SEARCH)}
              className="relative -top-5 bg-primary text-white p-4 rounded-full shadow-xl shadow-primary/40 hover:scale-105 transition-transform"
            >
              <Icon size={28} />
            </button>
          );
        }

        return (
          <button
            key={index}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};