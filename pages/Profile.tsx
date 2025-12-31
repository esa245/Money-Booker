
import React, { useState } from 'react';
import { User, Page } from '../types';
import { 
  Edit, 
  Bell, 
  Sun, 
  Trophy, 
  Users, 
  History, 
  BarChart3, 
  Headphones,
  CreditCard,
  ShieldCheck,
  FileText,
  Undo2,
  CheckCircle2,
  ChevronRight,
  LogOut,
  Settings,
  Hash,
  Crown,
  Globe
} from 'lucide-react';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onNavigate }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const accountLinks = [
    { icon: Trophy, label: 'Leaderboard', action: () => {} },
    { icon: Users, label: 'Refer & Earn', action: () => onNavigate(Page.REFERRAL) },
    { icon: History, label: 'Match History', action: () => {} },
    { icon: BarChart3, label: 'My Profits', action: () => onNavigate(Page.EARNINGS) },
  ];

  const supportLinks = [
    { icon: Globe, label: 'Official Website', action: () => window.open('https://your-website.com', '_blank') },
    { icon: CreditCard, label: 'UPI Payment Details', action: () => {} },
  ];

  const SectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-2 px-4 mb-3 mt-6">
      <Icon size={16} className="text-yellow-500" />
      <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</h3>
    </div>
  );

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8 pt-4">
        <div className="relative mb-6">
          <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 via-amber-600 to-amber-900 rounded-full flex items-center justify-center text-4xl font-black border-4 border-[#0f172a] shadow-[0_0_40px_rgba(234,179,8,0.3)] ring-4 ring-yellow-500/10">
            {user.username.substring(0, 2).toUpperCase()}
          </div>
          <div className="absolute -bottom-2 right-0 bg-yellow-500 text-black p-2 rounded-xl shadow-lg border-2 border-[#0f172a]">
             <Crown size={16} />
          </div>
        </div>
        
        <div className="text-center space-y-2">
           <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">{user.username}</h2>
           <p className="text-slate-500 text-xs font-medium">{user.email}</p>
           
           {/* User Code Badge */}
           <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-2xl mt-4">
              <Hash size={14} className="text-yellow-500" />
              <span className="text-sm font-black text-yellow-500 tracking-widest italic">{user.userCode}</span>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest ml-1 border-l border-slate-800 pl-2">User Code</span>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Played', val: user.matchesPlayed },
          { label: 'Won', val: user.matchesWon },
          { label: 'Winnings', val: `₹${user.winningCash}` }
        ].map((stat, i) => (
          <div key={i} className="bg-[#1e293b] p-4 rounded-[2rem] flex flex-col items-center shadow-lg border border-slate-700/30">
            <span className="text-xl font-black text-white italic">{stat.val}</span>
            <span className="text-[8px] text-slate-500 uppercase font-black tracking-[0.2em] mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#1e293b] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-700/30">
        {/* Account Section */}
        <SectionTitle title="Executive Hub" icon={Trophy} />
        <div className="px-2">
          {accountLinks.map((link, idx) => (
            <button key={idx} onClick={link.action} className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all">
                  <link.icon size={20} className="text-slate-300 group-hover:text-inherit" />
                </div>
                <span className="font-black italic text-slate-200 tracking-tight">{link.label}</span>
              </div>
              <ChevronRight size={18} className="text-slate-700 group-hover:text-yellow-500 transition-colors" />
            </button>
          ))}
        </div>

        {/* Support Section */}
        <SectionTitle title="Royal Support" icon={Headphones} />
        <div className="px-2">
          {supportLinks.map((link, idx) => (
            <button key={idx} onClick={link.action} className="w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all">
                  <link.icon size={20} className="text-slate-300 group-hover:text-inherit" />
                </div>
                <span className="font-black italic text-slate-200 tracking-tight">{link.label}</span>
              </div>
              <ChevronRight size={18} className="text-slate-700 group-hover:text-yellow-500 transition-colors" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="p-6 mt-4 bg-red-500/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-[2rem] border border-red-500/20 transition-all font-black italic active:scale-[0.98] uppercase text-sm tracking-widest shadow-xl"
          >
            <LogOut size={20} />
            Logout Sovereign
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
