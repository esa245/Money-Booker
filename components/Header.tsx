
import React from 'react';
import { User } from '../types';
import { Bell, Wallet } from 'lucide-react';

interface HeaderProps {
  user: User;
  onNotificationClick: () => void;
  onWalletClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNotificationClick, onWalletClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-4 z-40 shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
           <img src="https://picsum.photos/seed/logo/200" alt="Logo" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-medium">Welcome</span>
          <span className="text-sm font-bold text-slate-100">{user.username}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onNotificationClick}
          className="relative p-2 text-slate-300 hover:text-white transition-colors"
        >
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#1e293b]"></span>
        </button>
        
        <button 
          onClick={onWalletClick}
          className="bg-yellow-500 text-black px-3 py-1.5 rounded-lg flex items-center gap-2 font-bold text-sm hover:bg-yellow-400 transition-all active:scale-95"
        >
          <Wallet size={16} />
          <span>₹{user.balance.toFixed(0)}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
