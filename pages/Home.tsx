
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { 
  TrendingUp, 
  Trophy, 
  ChevronRight, 
  ArrowUpRight, 
  Crown, 
  Zap, 
  ShieldCheck, 
  Coins,
  Users,
  MessageCircle, // For WhatsApp
  Send, // For Telegram
  CreditCard // Added for UPI Payment Details
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [simulatedBalance, setSimulatedBalance] = useState(10.00);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedBalance(prev => prev + (Math.random() * 0.05));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminJump = () => {
    onNavigate(Page.ADMIN_PANEL);
  };

  const openSocial = (platform: 'whatsapp' | 'telegram') => {
    const links = {
      whatsapp: 'https://wa.me/+8801XXXXXXXXX', // আপনার নাম্বার দিন
      telegram: 'https://t.me/your_channel' // আপনার টেলিগ্রাম লিংক দিন
    };
    window.open(links[platform], '_blank');
  };

  const earningHub = [
    { 
      id: 'tournaments', 
      label: 'Grand Arena', 
      desc: 'Play & Multiply Money', 
      icon: Trophy, 
      color: 'from-yellow-400 to-amber-700', 
      action: () => onNavigate(Page.GRAND_ARENA) 
    },
    { 
      id: 'referral', 
      label: 'Royal Refer', 
      desc: 'Earn from Network', 
      icon: Users, 
      color: 'from-blue-500 to-indigo-800', 
      action: () => onNavigate(Page.REFERRAL) 
    },
    { 
      id: 'profits', 
      label: 'My Profits', 
      desc: 'Track Your Winnings', 
      icon: TrendingUp, 
      color: 'from-emerald-500 to-teal-800', 
      action: () => onNavigate(Page.EARNINGS) 
    },
    { 
      id: 'upi_details', 
      label: 'UPI Payment Details', 
      desc: 'Royal Payment Info', 
      icon: CreditCard, 
      color: 'from-purple-500 to-pink-800', 
      action: () => {} // এখানে পেমেন্ট ডিটেইলস দেখানোর লজিক যোগ করা যাবে
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-10 bg-[#020617]">
      {/* Royal Wealth Banner */}
      <div className="px-4 mt-4">
        <div className="relative h-72 w-full rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] border border-yellow-500/30">
          <img 
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1200" 
            alt="Wealth Empire" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
          <div className="absolute inset-0 p-10 flex flex-col justify-end">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-yellow-500 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                <Crown size={28} className="text-black" />
              </div>
              <span className="text-yellow-500 text-[12px] font-black tracking-[0.6em] uppercase">Money Booker Sovereign</span>
            </div>
            <h2 className="text-4xl font-black text-white leading-none tracking-tighter italic mb-4">
              ROYAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">WEALTH HUB</span>
            </h2>
            <p className="text-slate-300 text-[14px] max-w-[280px] font-bold leading-relaxed border-l-2 border-yellow-500 pl-4">
              টাকা বাড়ানোই এখন হবে সহজ। সঠিক গাইডলাইন পেতে আমাদের কমিউনিটিতে যুক্ত হোন।
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Profit Surge Tracker */}
      <div className="px-4">
        <div className="relative bg-[#0f172a] rounded-[3.5rem] p-10 border border-yellow-500/20 shadow-[0_0_60px_rgba(234,179,8,0.1)] overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-[80px]"></div>
          
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.5em] block">Active Asset Growth</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-white tracking-tighter italic">₹{simulatedBalance.toFixed(2)}</span>
                  <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                    <span className="text-[10px] font-black text-emerald-400">PROFIT SURGE</span>
                  </div>
                </div>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-yellow-500/30 animate-pulse">
                 <Zap size={40} className="text-black fill-black" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-slate-900/80 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
                 <span className="text-[10px] text-slate-500 font-black uppercase block mb-3">Investment</span>
                 <div className="flex items-center gap-2">
                    <Coins size={16} className="text-yellow-500" />
                    <span className="text-xl font-black text-slate-100 italic">₹10.00</span>
                 </div>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
                 <span className="text-[10px] text-slate-500 font-black uppercase block mb-3">Growth Index</span>
                 <div className="flex items-center gap-2">
                    <ArrowUpRight size={20} className="text-emerald-500" />
                    <span className="text-xl font-black text-emerald-400">OPTIMAL</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Support Buttons */}
      <div className="px-4 grid grid-cols-2 gap-4">
        <button 
          onClick={() => openSocial('whatsapp')}
          className="flex flex-col items-center justify-center gap-4 bg-[#075E54]/10 border border-[#075E54]/30 p-8 rounded-[3rem] hover:bg-[#075E54]/20 transition-all group active:scale-95 shadow-xl"
        >
          <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <MessageCircle size={32} className="text-white fill-white" />
          </div>
          <div className="text-center">
            <h4 className="font-black italic text-white text-sm">WhatsApp</h4>
            <p className="text-[8px] text-emerald-500 font-black uppercase tracking-widest mt-1">Live Support</p>
          </div>
        </button>

        <button 
          onClick={() => openSocial('telegram')}
          className="flex flex-col items-center justify-center gap-4 bg-[#0088cc]/10 border border-[#0088cc]/30 p-8 rounded-[3rem] hover:bg-[#0088cc]/20 transition-all group active:scale-95 shadow-xl"
        >
          <div className="w-16 h-16 bg-[#0088cc] rounded-2xl flex items-center justify-center shadow-lg group-hover:-rotate-12 transition-transform">
            <Send size={32} className="text-white fill-white" />
          </div>
          <div className="text-center">
            <h4 className="font-black italic text-white text-sm">Telegram</h4>
            <p className="text-[8px] text-blue-400 font-black uppercase tracking-widest mt-1">Join Community</p>
          </div>
        </button>
      </div>

      {/* Gateways Grid */}
      <div className="px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500/30"></div>
          <h3 className="text-xs font-black text-yellow-500 uppercase tracking-[0.5em]">Executive Gateways</h3>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500/30"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {earningHub.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="relative group bg-[#0f172a] border border-white/5 p-7 rounded-[3rem] text-left transition-all hover:border-yellow-500/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-[0.95] overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${item.color} w-16 h-16 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                <item.icon size={32} className="text-white" />
              </div>
              <h4 className="font-black text-slate-100 text-base tracking-tight mb-2 italic">{item.label}</h4>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Admin Jump Section */}
      <div className="px-8 py-6">
         <button 
           onClick={handleAdminJump}
           className="w-full flex items-center justify-center gap-3 bg-yellow-500/5 border border-yellow-500/10 p-5 rounded-[2.5rem] active:bg-yellow-500/10 transition-colors"
         >
            <ShieldCheck size={24} className="text-yellow-500" />
            <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em]">অ্যাডমিন প্যানেল এ প্রবেশ করুন</span>
         </button>
      </div>
    </div>
  );
};

export default Home;
