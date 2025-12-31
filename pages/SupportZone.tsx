
import React, { useState, useRef, useEffect } from 'react';
import { User as UserType, SupportMessage } from '../types';
import { 
  Send, 
  ArrowLeft, 
  User, 
  Headphones,
  Crown,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface SupportZoneProps {
  user: UserType;
  messages: SupportMessage[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

const SupportZone: React.FC<SupportZoneProps> = ({ user, messages, onSendMessage, onBack }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

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
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              <Headphones size={24} className="text-black" />
            </div>
            <div>
              <h2 className="text-lg font-black italic tracking-tighter text-white uppercase">Royal <span className="text-yellow-500">Support</span></h2>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Always Online</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end opacity-20">
           <Crown size={24} className="text-yellow-500" />
           <span className="text-[7px] font-black uppercase tracking-tighter text-yellow-500">Official Helpdesk</span>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-10 space-y-10">
            <div className="relative">
              <div className="w-32 h-32 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20 animate-pulse">
                <MessageCircle size={56} className="text-yellow-500 opacity-50" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 text-yellow-500 animate-bounce" size={24} />
            </div>
            <div className="space-y-4">
               <h3 className="text-2xl font-black italic text-white tracking-tighter">সম্মানিত গ্রাহক, স্বাগতম!</h3>
               <p className="text-sm text-slate-500 font-medium max-w-[280px] mx-auto leading-relaxed">
                 আপনার যেকোনো সমস্যা বা জিজ্ঞাসার জন্য এখানে মেসেজ দিন। আমাদের অ্যাডমিন টিম আপনাকে দ্রুত সাহায্য করবে।
               </p>
            </div>
            <div className="px-6 py-3 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl flex items-center gap-3">
               <ShieldCheck size={18} className="text-yellow-500" />
               <span className="text-[10px] font-black uppercase text-yellow-500 tracking-widest">Sovereign Encryption Active</span>
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === user.username ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
              <div className={`flex gap-4 max-w-[85%] ${msg.sender === user.username ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-2xl border-2 ${
                  msg.sender === user.username 
                  ? 'bg-blue-600 border-blue-400/20' 
                  : 'bg-yellow-500 border-black/10'
                }`}>
                  {msg.sender === user.username ? <User size={18} className="text-white" /> : <Crown size={18} className="text-black" />}
                </div>
                <div className="space-y-1.5">
                  <div className={`p-5 rounded-[2.5rem] text-[15px] leading-relaxed shadow-2xl font-medium tracking-tight ${
                    msg.sender === user.username 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-tr-none' 
                      : 'bg-[#0f172a] text-slate-100 rounded-tl-none border border-yellow-500/10'
                  }`}>
                    {msg.text}
                  </div>
                  <p className={`text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 ${msg.sender === user.username ? 'text-right mr-2' : 'text-left ml-2'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Section */}
      <div className="p-6 bg-[#0f172a]/95 backdrop-blur-xl border-t border-yellow-500/10 sticky bottom-0 z-30">
        <div className="flex gap-4 max-w-3xl mx-auto bg-[#020617] border border-yellow-500/20 rounded-[3rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus-within:border-yellow-500/50 transition-all duration-500 group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="আপনার সমস্যাটি এখানে গুছিয়ে লিখুন..."
            className="flex-1 bg-transparent px-6 py-4 outline-none text-slate-100 placeholder-slate-600 text-[16px] font-medium italic"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`w-14 h-14 rounded-[1.8rem] flex items-center justify-center transition-all active:scale-90 ${
              input.trim() 
                ? `bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)]` 
                : 'bg-slate-900 text-slate-700 cursor-not-allowed border border-white/5'
            }`}
          >
            <Send size={24} />
          </button>
        </div>
        <p className="text-center text-[8px] text-slate-600 mt-5 font-black uppercase tracking-[0.5em]">24/7 Premium Royal Support • Secured Connection</p>
      </div>
    </div>
  );
};

export default SupportZone;
