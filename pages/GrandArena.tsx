
import React, { useState } from 'react';
import { Tournament } from '../types';
import { 
  ArrowLeft, 
  Trophy, 
  Users, 
  Clock, 
  Zap, 
  ChevronRight, 
  Swords,
  Gamepad2,
  Crown,
  Search,
  Filter,
  Sparkles
} from 'lucide-react';

interface GrandArenaProps {
  onBack: () => void;
  tournaments: Tournament[];
  onJoin: (id: string) => void;
}

const GrandArena: React.FC<GrandArenaProps> = ({ onBack, tournaments, onJoin }) => {
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'JOINED' | 'RESULTS'>('ACTIVE');

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] animate-in fade-in duration-500">
      {/* Premium Sticky Header */}
      <div className="bg-[#0f172a] p-6 border-b border-yellow-500/20 shadow-2xl flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-3 bg-slate-900 rounded-2xl text-slate-400 hover:text-yellow-500 transition-all border border-white/5 shadow-lg active:scale-90"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">Grand <span className="text-yellow-500">Arena</span></h2>
            <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.4em] mt-1">Sovereign Tournament Hub</p>
          </div>
        </div>
        <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
           <Swords size={24} className="text-yellow-500" />
        </div>
      </div>

      <div className="p-4 space-y-8">
        {/* Banner Hero */}
        <div className="relative h-48 rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
          <img 
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" 
            alt="Arena Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/40 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-2">
                <Crown size={16} className="text-yellow-500" />
                <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Sovereign Battles</span>
             </div>
             <h3 className="text-3xl font-black italic text-white tracking-tighter uppercase leading-none">PLAY & <br/><span className="text-yellow-500">MULTIPLY CASH</span></h3>
             <p className="text-slate-400 text-[10px] font-bold mt-2 uppercase tracking-widest">Elite Gaming Experience</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-slate-900 rounded-[2rem] border border-white/5 shadow-inner">
           {['ACTIVE', 'JOINED', 'RESULTS'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-slate-500 hover:text-white'
               }`}
             >
               {tab === 'ACTIVE' ? 'Active Battles' : tab === 'JOINED' ? 'My Contests' : 'Winners Hall'}
             </button>
           ))}
        </div>

        {/* Tournament List */}
        <div className="space-y-6 pb-24">
           {tournaments.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-slate-700 border border-dashed border-slate-800">
                   <Clock size={32} />
                </div>
                <p className="text-xs font-black text-slate-600 uppercase tracking-widest">No Battles Available Right Now</p>
             </div>
           ) : (
             tournaments.map((t) => (
               <div key={t.id} className="relative bg-[#0f172a] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl group transition-all hover:border-yellow-500/20">
                  {/* Game Banner */}
                  <div className="h-40 relative">
                     <img src={t.image} alt={t.game} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                     <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                        <Sparkles size={10} className="text-yellow-500" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">{t.type}</span>
                     </div>
                     <div className="absolute bottom-4 left-4">
                        <h4 className="text-xl font-black italic text-white tracking-tighter uppercase">{t.game}</h4>
                     </div>
                  </div>

                  {/* Details Area */}
                  <div className="p-6 space-y-6">
                     <div className="flex justify-between items-center">
                        <div className="space-y-1">
                           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Grand Prize</p>
                           <p className="text-2xl font-black text-emerald-400 italic">TK {t.prize}</p>
                        </div>
                        <div className="text-right space-y-1">
                           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Entry Fee</p>
                           <p className="text-2xl font-black text-yellow-500 italic">TK {t.entry}</p>
                        </div>
                     </div>

                     {/* Progress Bar */}
                     <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <Users size={12} className="text-yellow-500" />
                              {t.filledSpots} / {t.totalSpots} Players
                           </span>
                           <span className="text-[9px] font-black text-yellow-500 uppercase">
                              {t.totalSpots - t.filledSpots} Slots Left
                           </span>
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                           <div 
                             className="h-full bg-gradient-to-r from-yellow-400 to-amber-600 shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-1000" 
                             style={{ width: `${(t.filledSpots / t.totalSpots) * 100}%` }}
                           ></div>
                        </div>
                     </div>

                     {/* Footer Action */}
                     <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-slate-400">
                           <Clock size={14} className="text-blue-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest">{t.startTime}</span>
                        </div>
                        <button 
                          onClick={() => onJoin(t.id)}
                          className="bg-white text-black px-6 py-3 rounded-2xl font-black italic text-xs shadow-xl active:scale-95 transition-all hover:bg-yellow-500"
                        >
                           JOIN BATTLE
                        </button>
                     </div>
                  </div>
               </div>
             ))
           )}
        </div>
      </div>
    </div>
  );
};

export default GrandArena;
