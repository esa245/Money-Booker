
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Send, 
  ArrowLeft, 
  Bot, 
  User, 
  Sparkles, 
  Soup, 
  BookOpen, 
  TrendingUp,
  BrainCircuit,
  ChevronRight,
  MessageSquareText,
  Crown,
  Gem
} from 'lucide-react';

interface AIZoneProps {
  onBack: () => void;
}

type AITool = {
  id: string;
  name: string;
  desc: string;
  icon: any;
  color: string;
  instruction: string;
  placeholder: string;
};

const AIZone: React.FC<AIZoneProps> = ({ onBack }) => {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tools: AITool[] = [
    {
      id: 'chef',
      name: 'Royal Chef AI',
      desc: 'Elite culinary mastery for kings.',
      icon: Soup,
      color: 'bg-orange-500',
      instruction: "You are Royal Chef AI, a world-class culinary expert. You provide step-by-step luxury recipes, cooking tips, and meal planning. Use a refined, polite, and encouraging tone.",
      placeholder: "Ask for a royal recipe (e.g., Dum Pukht)..."
    },
    {
      id: 'academic',
      name: 'Genius Academic AI',
      desc: 'Solve complexities with intelligence.',
      icon: BookOpen,
      color: 'bg-blue-600',
      instruction: "You are Academic AI, a highly intelligent personal tutor for elite students. You explain concepts clearly, assist with complex homework, and provide academic growth tips. Be professional and highly intelligent.",
      placeholder: "Ask a complex question..."
    },
    {
      id: 'finance',
      name: 'Fortune Analyst AI',
      desc: 'Master the art of wealth growth.',
      icon: TrendingUp,
      color: 'bg-emerald-600',
      instruction: "You are Finance AI, a specialized fortune management expert for the Money Booker elite. You help users understand asset growth, saving habits, and profit logic. Focus on financial empowerment.",
      placeholder: "Ask about wealth strategies..."
    }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !selectedTool) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: selectedTool.instruction
        }
      });

      const botText = response.text || "My apologies, the system encountered a momentary interruption.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Error: Sovereignty connection lost. Check your data link." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (selectedTool) {
      setSelectedTool(null);
      setMessages([]);
    } else {
      onBack();
    }
  };

  if (!selectedTool) {
    return (
      <div className="flex flex-col h-full bg-[#020617] animate-in fade-in duration-500">
        {/* Ornate Header */}
        <div className="p-8 border-b border-yellow-500/10 flex items-center justify-between bg-gradient-to-b from-[#0f172a] to-transparent">
          <div className="flex items-center gap-5">
            <button onClick={onBack} className="p-3 bg-slate-900 rounded-2xl text-slate-400 hover:text-yellow-500 transition-all border border-white/5">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h2 className="text-2xl font-black tracking-tighter italic text-white">AI <span className="text-yellow-500">UNIVERSE</span></h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Elite Portal Active</p>
            </div>
          </div>
          <Crown size={28} className="text-yellow-500/20" />
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          <div className="relative bg-yellow-500/5 border border-yellow-500/10 p-8 rounded-[3rem] overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Sparkles size={100} className="text-yellow-500" />
             </div>
             <h3 className="text-lg font-black text-white italic mb-2">এলিট এআই অ্যাসিস্ট্যান্ট</h3>
             <p className="text-xs text-slate-400 leading-relaxed max-w-[250px]">
               মানি ব্কার-এর রয়্যাল এআই সিস্টেম আপনার জীবনকে করবে আরও সহজ এবং সম্পদশালী। আপনার প্রয়োজন অনুযায়ী একটি বিশেষজ্ঞ এআই বেছে নিন।
             </p>
          </div>

          <div className="grid gap-6">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className="group relative bg-[#0f172a] border border-white/5 p-6 rounded-[3rem] text-left transition-all hover:border-yellow-500/30 hover:shadow-2xl active:scale-[0.98] overflow-hidden"
              >
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`${tool.color} w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform`}>
                    <tool.icon size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-slate-100 italic tracking-tight">{tool.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{tool.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-white/5 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
                {/* Decorative glow */}
                <div className={`absolute -right-10 -bottom-10 w-32 h-32 ${tool.color} opacity-[0.03] rounded-full blur-3xl`}></div>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/10 p-6 rounded-[2.5rem] flex items-start gap-5">
            <div className="p-3 bg-blue-500/20 rounded-2xl shrink-0">
               <Gem size={24} className="text-blue-400" />
            </div>
            <div className="space-y-1">
              <h5 className="text-sm font-black text-blue-300 uppercase italic">Royal Knowledge Base</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">Our intelligence models are trained on elite data to provide sovereign advice and assistance 24/7.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#020617] animate-in slide-in-from-right duration-500">
      <div className="bg-[#0f172a] p-6 flex items-center justify-between border-b border-yellow-500/10 shadow-2xl sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="p-2 bg-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors border border-white/5">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className={`${selectedTool.color} w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg`}>
              <selectedTool.icon size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-black text-sm italic tracking-tight text-white">{selectedTool.name}</h2>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[8px] text-emerald-500 font-black uppercase tracking-[0.2em]">Sovereign Link Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-10 space-y-8 opacity-90 animate-in zoom-in duration-700">
            <div className={`p-10 ${selectedTool.color} rounded-full bg-opacity-5 ring-1 ring-yellow-500/20 relative shadow-[0_0_80px_rgba(234,179,8,0.1)]`}>
               <selectedTool.icon size={64} className={selectedTool.color.replace('bg-', 'text-')} />
               <div className="absolute -top-2 -right-2 bg-yellow-500 p-2 rounded-xl text-black">
                 <Crown size={16} />
               </div>
            </div>
            <div className="space-y-3">
               <h3 className="text-3xl font-black italic tracking-tighter">Welcome, Elite Member</h3>
               <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                 আমি {selectedTool.name}। আপনার রয়্যাল সার্ভিসে আমি সর্বদা প্রস্তুত। যেকোনো প্রশ্ন করুন।
               </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-[280px]">
               <div className="bg-slate-900 border border-white/5 px-4 py-2 rounded-2xl text-[10px] text-slate-400 font-black uppercase tracking-tight italic">"Suggest a royal meal"</div>
               <div className="bg-slate-900 border border-white/5 px-4 py-2 rounded-2xl text-[10px] text-slate-400 font-black uppercase tracking-tight italic">"Wealth growth tips"</div>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
            <div className={`flex gap-4 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-2xl border ${
                msg.role === 'user' ? 'bg-blue-600 border-blue-400/20' : `${selectedTool.color} border-white/10`
              }`}>
                {msg.role === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
              </div>
              <div className={`p-5 rounded-3xl text-[15px] leading-relaxed shadow-2xl font-medium tracking-tight ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-[#0f172a] text-slate-200 rounded-tl-none border border-white/5'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-4 items-center bg-[#0f172a] border border-white/5 p-5 rounded-3xl rounded-tl-none shadow-xl">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">AI is analyzing...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-[#0f172a]/95 backdrop-blur-xl border-t border-yellow-500/10 sticky bottom-0">
        <div className="flex gap-3 max-w-2xl mx-auto bg-[#020617] border border-yellow-500/20 rounded-3xl p-2 shadow-[0_0_50px_rgba(0,0,0,0.5)] focus-within:border-yellow-500/50 transition-all duration-500">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={selectedTool.placeholder}
            className="flex-1 bg-transparent px-5 py-4 outline-none text-slate-100 placeholder-slate-600 text-[15px] font-medium"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className={`p-4 rounded-2xl transition-all active:scale-90 ${
              input.trim() && !isLoading 
                ? `bg-yellow-500 text-black shadow-lg shadow-yellow-500/20` 
                : 'bg-slate-900 text-slate-700 cursor-not-allowed border border-white/5'
            }`}
          >
            <Send size={22} strokeWidth={2.5} />
          </button>
        </div>
        <p className="text-center text-[9px] text-slate-600 mt-5 font-black uppercase tracking-[0.4em]">Money Booker Elite Intelligence Engine • Sovereign Assist</p>
      </div>
    </div>
  );
};

export default AIZone;
