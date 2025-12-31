
import React from 'react';
// Aliasing User to UserType to avoid collision with User icon
import { User as UserType } from '../types';
import { 
  ArrowLeft, 
  Copy, 
  Share2, 
  Users, 
  Trophy, 
  Gift, 
  ChevronRight,
  Crown,
  Sparkles,
  Zap,
  // Added User icon from lucide-react
  User
} from 'lucide-react';

interface ReferralProps {
  // Using UserType here
  user: UserType;
  onBack: () => void;
}

const Referral: React.FC<ReferralProps> = ({ user, onBack }) => {
  const referralLink = `${window.location.origin}/signup?ref=${user.userCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.userCode);
    alert('Referral code copied!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Money Booker - Join the Royal Club!',
          text: `Join Money Booker using my referral code: ${user.userCode} and earn royal bonuses!`,
          url: referralLink,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(referralLink);
      alert('Referral link copied to clipboard!');
    }
  };

  // Fixed collision: User icon is now correctly used as a value
  const steps = [
    { icon: User, label: "Share Your Link", desc: "আপনার বন্ধুকে রেফারেল লিংক অথবা কোড শেয়ার করুন।" },
    { icon: Zap, label: "They Sign Up", desc: "তারা আপনার কোড ব্যবহার করে একাউন্ট খুললেই ম্যাজিক শুরু হবে।" },
    { icon: Gift, label: "Earn Royal Cash", desc: "তাদের প্রথম ডিপোজিটে আপনি পাবেন ১০% ক্যাশব্যাক সরাসরি ওয়ালেটে।" }
  ];

  return (
    <div className="flex flex-col h-full bg-[#020617] animate-in fade-in duration-500">
      {/* Royal Header */}
      <div className="bg-[#0f172a] p-6 border-b border-yellow-500/20 shadow-2xl flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-3 bg-slate-900 rounded-2xl text-slate-400 hover:text-yellow-500 transition-all border border-white/5 shadow-lg active:scale-90"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-black italic tracking-tighter text-white uppercase">Royal <span className="text-yellow-500">Refer</span></h2>
            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Growth Network Active</p>
          </div>
        </div>
        <Crown size={24} className="text-yellow-500/20" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10 pb-20">
        {/* Hero Section */}
        <div className="relative bg-[#0f172a] rounded-[3.5rem] p-10 border border-yellow-500/20 overflow-hidden text-center">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={120} className="text-yellow-500" />
           </div>
           
           <div className="relative z-10 space-y-6">
              <div className="w-20 h-20 bg-yellow-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-yellow-500/20">
                 <Users size={40} className="text-black" />
              </div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black italic text-white tracking-tighter uppercase">Invite & Conquer</h3>
                 <p className="text-slate-400 text-xs font-medium max-w-[250px] mx-auto leading-relaxed">
                   আপনার বন্ধুদের ইনভাইট করুন এবং আমাদের রয়্যাল মেম্বারশিপ নেটওয়ার্ক থেকে আনলিমিটেড ইনকাম করুন।
                 </p>
              </div>
           </div>
        </div>

        {/* Code Area */}
        <div className="space-y-4">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] block px-4">Your Sovereign Code</span>
           <div className="bg-[#0f172a] border border-white/5 p-4 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
              <div className="flex flex-col pl-4">
                 <span className="text-[8px] font-black text-yellow-500 uppercase tracking-widest mb-1">Copy This</span>
                 <span className="text-3xl font-black italic text-white tracking-widest">{user.userCode}</span>
              </div>
              <button 
                onClick={copyToClipboard}
                className="w-16 h-16 bg-slate-900 rounded-[1.8rem] flex items-center justify-center text-yellow-500 border border-white/5 active:scale-90 transition-all hover:bg-slate-800"
              >
                 <Copy size={24} />
              </button>
           </div>
           
           <button 
             onClick={handleShare}
             className="w-full bg-gradient-to-r from-yellow-400 to-amber-600 p-6 rounded-[2.5rem] flex items-center justify-center gap-4 text-black font-black italic text-lg shadow-2xl shadow-yellow-500/20 active:scale-95 transition-all"
           >
              <Share2 size={24} />
              SHARE ROYAL LINK
           </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-[#0f172a] p-8 rounded-[3rem] border border-white/5 space-y-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-white/5 group-hover:text-yellow-500/5 transition-colors">
                 <Users size={60} />
              </div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Total Invites</p>
              <p className="text-3xl font-black italic text-white">0</p>
           </div>
           <div className="bg-[#0f172a] p-8 rounded-[3rem] border border-white/5 space-y-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 text-white/5 group-hover:text-emerald-500/5 transition-colors">
                 <Trophy size={60} />
              </div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Royal Earnings</p>
              <p className="text-3xl font-black italic text-emerald-500">₹0.00</p>
           </div>
        </div>

        {/* How it works */}
        <div className="space-y-6">
           <h4 className="text-xs font-black text-yellow-500 uppercase tracking-[0.5em] text-center">Protocol Overview</h4>
           <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-[#0f172a] border border-white/5 p-6 rounded-[2.5rem] flex items-center gap-6 group hover:border-yellow-500/30 transition-all">
                   <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                      <step.icon size={28} />
                   </div>
                   <div className="flex-1">
                      <h5 className="font-black italic text-white text-base">{step.label}</h5>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">{step.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
      
      {/* Footer Hint */}
      <div className="p-8 text-center bg-gradient-to-t from-[#0f172a] to-transparent">
         <p className="text-[8px] text-slate-600 font-black uppercase tracking-[0.6em]">Money Booker • Sovereign Referral Program</p>
      </div>
    </div>
  );
};

export default Referral;
