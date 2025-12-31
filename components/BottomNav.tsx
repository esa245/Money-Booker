
import React from 'react';
import { Page } from '../types';
import { Home, Wallet, CircleDollarSign, User } from 'lucide-react';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const tabs = [
    { id: Page.HOME, label: 'Home', icon: Home },
    { id: Page.WALLET, label: 'Wallet', icon: Wallet },
    { id: Page.EARNINGS, label: 'Earnings', icon: CircleDollarSign },
    { id: Page.PROFILE, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#1e293b] border-t border-slate-700 flex justify-around items-center px-2 z-40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentPage === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-1 flex-1 py-2 transition-all duration-200 ${
              isActive ? 'text-yellow-500' : 'text-slate-400'
            }`}
          >
            <div className={`p-1 rounded-full transition-all ${isActive ? 'bg-yellow-500/10' : ''}`}>
               <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {tab.label}
            </span>
            {isActive && <div className="w-1 h-1 bg-yellow-500 rounded-full mt-0.5"></div>}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
