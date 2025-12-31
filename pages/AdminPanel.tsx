
import React, { useState, useRef, useEffect } from 'react';
import { Transaction, User as UserType, SupportMessage, Tournament } from '../types';
import { 
  ArrowLeft, 
  Menu,
  X,
  Globe, 
  ArrowDownLeft, 
  ArrowUpRight, 
  History, 
  DollarSign, 
  ShieldCheck, 
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  UserCircle,
  User,
  Hash,
  LogOut,
  MessageSquare,
  Send,
  Crown,
  PlusCircle,
  Gamepad2,
  Image as ImageIcon
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
  transactions: Transaction[];
  users: UserType[]; 
  supportMessages: SupportMessage[];
  tournaments: Tournament[];
  onAddTournament: (t: Tournament) => void;
  onSendSupportMessage: (text: string, sender: string, receiver: string) => void;
  onUpdateTransaction: (id: string, status: 'APPROVED' | 'REJECTED') => void;
}

type AdminTab = 'overview' | 'users' | 'deposits' | 'withdrawals' | 'tournaments' | 'support-chat';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onBack, 
  transactions, 
  users, 
  supportMessages, 
  tournaments,
  onAddTournament,
  onSendSupportMessage, 
  onUpdateTransaction 
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState<string | null>(null);
  const [adminReply, setAdminReply] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Tournament Form State
  const [newGame, setNewGame] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newEntry, setNewEntry] = useState('10');
  const [newPrize, setNewPrize] = useState('500');
  const [newSpots, setNewSpots] = useState('48');
  const [newTime, setNewTime] = useState('');

  const pendingDeposits = transactions.filter(t => t.type === 'DEPOSIT' && t.status === 'PENDING');
  const pendingWithdrawals = transactions.filter(t => t.type === 'WITHDRAWAL' && t.status === 'PENDING');

  const navItems = [
    { id: 'overview' as AdminTab, label: 'ওভারভিউ', icon: LayoutDashboard, badge: null },
    { id: 'tournaments' as AdminTab, label: 'টুর্নামেন্ট সেটআপ', icon: Gamepad2, badge: null },
    { id: 'users' as AdminTab, label: 'ইউজার লিস্ট', icon: Users, badge: users.length },
    { id: 'deposits' as AdminTab, label: 'ডিপোজিট লিস্ট', icon: ArrowDownLeft, badge: pendingDeposits.length },
    { id: 'withdrawals' as AdminTab, label: 'উইথড্র লিস্ট', icon: ArrowUpRight, badge: pendingWithdrawals.length },
    { id: 'support-chat' as AdminTab, label: 'সাপোর্ট চ্যাট', icon: MessageSquare, badge: supportMessages.filter(m => m.receiver === 'ADMIN').length },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [supportMessages, selectedChatUser]);

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  const handleAddMatch = () => {
    if (!newGame || !newTime) return;
    const t: Tournament = {
      id: `MATCH-${Date.now()}`,
      game: newGame,
      image: newImage || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
      type: 'Solo/Squad Battle',
      entry: parseInt(newEntry),
      prize: parseInt(newPrize),
      totalSpots: parseInt(newSpots),
      filledSpots: 0,
      startTime: newTime,
      status: 'ACTIVE'
    };
    onAddTournament(t);
    setNewGame('');
    setNewTime('');
    alert("নতুন ম্যাচ সফলভাবে যোগ করা হয়েছে!");
  };

  const handleSendReply = () => {
    if (!adminReply.trim() || !selectedChatUser) return;
    onSendSupportMessage(adminReply, 'ADMIN', selectedChatUser);
    setAdminReply('');
  };

  const chatUsers = Array.from(new Set(supportMessages.map(m => m.sender === 'ADMIN' ? m.receiver : m.sender)));

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans">
      <nav className="bg-[#0f172a] border-b border-yellow-500/20 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-[60] shadow-2xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-800 rounded-xl md:hidden text-yellow-500">
            <Menu size={24} />
          </button>
          <div className="flex flex-col">
             <span className="text-lg md:text-xl font-black italic tracking-tighter uppercase">MONEY BOOKER <span className="text-yellow-500">ADMIN</span></span>
          </div>
        </div>
        <div className="p-2 bg-yellow-500 rounded-xl text-black shadow-lg"><ShieldCheck size={20} /></div>
      </nav>

      <div className="flex flex-1 relative overflow-hidden">
        {isSidebarOpen && <div className="fixed inset-0 bg-black/80 z-[70] md:hidden" onClick={() => setIsSidebarOpen(false)} />}

        <aside className={`fixed md:relative inset-y-0 left-0 w-72 bg-[#0f172a] border-r border-white/5 p-6 flex flex-col gap-6 z-[80] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleTabChange(item.id)} className={`w-full flex items-center justify-between px-5 py-4 rounded-[1.5rem] font-black italic text-sm transition-all ${activeTab === item.id ? 'bg-yellow-500 text-black shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}>
                <div className="flex items-center gap-4"><item.icon size={20} />{item.label}</div>
                {item.badge !== null && item.badge > 0 && <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${activeTab === item.id ? 'bg-black text-yellow-500' : 'bg-red-500 text-white'}`}>{item.badge}</span>}
              </button>
            ))}
          </div>
          <button onClick={onBack} className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-[1.5rem] bg-red-500/5 text-red-500 font-black italic border border-red-500/20"><LogOut size={18} />Exit Admin</button>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 w-full">
           
           {activeTab === 'tournaments' && (
             <div className="space-y-10 animate-in slide-in-from-right-10 duration-500">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-black italic tracking-tighter uppercase">Grand Arena <span className="text-yellow-500">Management</span></h3>
                </div>

                {/* Tournament Creation Form */}
                <div className="bg-[#0f172a] border border-yellow-500/10 p-8 rounded-[3rem] shadow-2xl space-y-6">
                   <div className="flex items-center gap-3 mb-4">
                      <PlusCircle size={24} className="text-yellow-500" />
                      <h4 className="text-lg font-black italic text-white uppercase">Add New Battle</h4>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Game Name</label>
                         <input value={newGame} onChange={e => setNewGame(e.target.value)} placeholder="Ex: Free Fire Max, Ludo King..." className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-yellow-500/30" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Image URL (Optional)</label>
                         <input value={newImage} onChange={e => setNewImage(e.target.value)} placeholder="https://..." className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-yellow-500/30" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Entry Fee (TK)</label>
                         <input type="number" value={newEntry} onChange={e => setNewEntry(e.target.value)} className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-yellow-500/30" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Prize Pool (TK)</label>
                         <input type="number" value={newPrize} onChange={e => setNewPrize(e.target.value)} className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-yellow-500/30" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Total Spots</label>
                         <input type="number" value={newSpots} onChange={e => setNewSpots(e.target.value)} className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-yellow-500/30" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Start Time</label>
                         <input value={newTime} onChange={e => setNewTime(e.target.value)} placeholder="Ex: Today, 10:00 PM" className="w-full bg-[#020617] border border-white/5 rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-yellow-500/30" />
                      </div>
                   </div>

                   <button onClick={handleAddMatch} className="w-full bg-yellow-500 text-black py-5 rounded-[2rem] font-black italic text-lg shadow-xl shadow-yellow-500/20 active:scale-95 transition-all">
                      PUBLISH TO GRAND ARENA
                   </button>
                </div>

                <div className="space-y-6">
                   <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] px-2">Current Active Battles</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tournaments.map(t => (
                        <div key={t.id} className="bg-[#0f172a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                           <div className="h-32 relative">
                              <img src={t.image} className="w-full h-full object-cover opacity-60" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                              <div className="absolute bottom-4 left-4 font-black italic text-white uppercase">{t.game}</div>
                           </div>
                           <div className="p-6 flex justify-between items-center">
                              <div>
                                 <p className="text-[8px] font-black text-slate-500 uppercase">Entry: TK {t.entry}</p>
                                 <p className="text-[8px] font-black text-emerald-500 uppercase">Prize: TK {t.prize}</p>
                              </div>
                              <span className="text-[10px] font-black text-yellow-500">{t.filledSpots}/{t.totalSpots} JOINED</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'overview' && (
             <div className="space-y-10 animate-in fade-in duration-500">
               <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase">অ্যাডমিন <span className="text-yellow-500">ড্যাশবোর্ড</span></h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <OverviewCard label="Total Members" value={users.length.toString()} icon={Users} color="text-yellow-500" />
                  <OverviewCard label="Pending Deposits" value={pendingDeposits.length.toString()} icon={ArrowDownLeft} color="text-emerald-500" />
                  <OverviewCard label="Pending Payouts" value={pendingWithdrawals.length.toString()} icon={ArrowUpRight} color="text-red-500" />
               </div>
             </div>
           )}

           {activeTab === 'users' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                <h3 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase">ইউজার ম্যানেজমেন্ট</h3>
                <div className="grid gap-4">
                   {users.map(user => (
                    <div key={user.userCode} className="bg-[#0f172a] border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400"><UserCircle size={32} /></div>
                          <div>
                             <h5 className="font-black italic text-lg text-white">{user.username}</h5>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user.email}</p>
                          </div>
                       </div>
                       <span className="text-xl font-black italic text-yellow-500">₹{user.balance.toFixed(2)}</span>
                    </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'deposits' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                <h3 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase">ডিপোজিট রিকোয়েস্ট</h3>
                <div className="grid gap-4">
                   {pendingDeposits.map(dep => (
                    <div key={dep.id} className="bg-[#0f172a] border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><ArrowDownLeft size={24} /></div>
                          <div><h5 className="font-black italic text-lg text-white">{dep.user}</h5><p className="text-[9px] text-slate-500 font-bold uppercase">{dep.gateway} • {dep.trxId}</p></div>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-xl font-black italic text-white">₹{dep.amount}</span>
                          <button onClick={() => onUpdateTransaction(dep.id, 'APPROVED')} className="px-5 py-2.5 bg-emerald-500 text-black rounded-xl font-black text-[10px] uppercase">APPROVE</button>
                       </div>
                    </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'withdrawals' && (
             <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                <h3 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase">উইথড্র রিকোয়েস্ট</h3>
                <div className="grid gap-4">
                   {pendingWithdrawals.map(req => (
                    <div key={req.id} className="bg-[#0f172a] border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between shadow-2xl">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500"><ArrowUpRight size={24} /></div>
                          <div><h5 className="font-black italic text-lg text-white">{req.user}</h5><p className="text-[9px] text-slate-500 font-bold uppercase">{req.gateway} • {req.targetAccount}</p></div>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-xl font-black italic text-white">₹{req.amount}</span>
                          <button onClick={() => onUpdateTransaction(req.id, 'APPROVED')} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase">PAYOUT</button>
                       </div>
                    </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'support-chat' && (
             <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 animate-in slide-in-from-right-10 duration-500">
                <div className="w-full md:w-80 bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-6 overflow-y-auto">
                   <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Active Support Conversations</h3>
                   <div className="space-y-3">
                      {chatUsers.length === 0 ? (
                        <p className="text-[10px] text-slate-600 font-black text-center mt-10 uppercase tracking-widest">No active chats.</p>
                      ) : (
                        chatUsers.map(user => (
                          <button key={user} onClick={() => setSelectedChatUser(user)} className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all ${selectedChatUser === user ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'bg-slate-900 border border-white/5 hover:border-yellow-500/20'}`}>
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedChatUser === user ? 'bg-black/10' : 'bg-slate-800'}`}><User size={20} /></div>
                             <div className="text-left flex-1">
                                <p className="font-black italic text-sm truncate">{user}</p>
                                <p className={`text-[8px] font-bold uppercase tracking-widest ${selectedChatUser === user ? 'text-black/60' : 'text-slate-500'}`}>Message Hub Active</p>
                             </div>
                             {supportMessages.filter(m => m.sender === user && m.receiver === 'ADMIN').length > 0 && selectedChatUser !== user && (
                               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                             )}
                          </button>
                        ))
                      )}
                   </div>
                </div>

                <div className="flex-1 bg-[#0f172a] border border-white/5 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl">
                   {selectedChatUser ? (
                     <>
                        <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/5">
                           <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shadow-lg"><User size={24} /></div>
                           <div>
                              <h4 className="font-black italic text-lg">{selectedChatUser}</h4>
                              <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Connected • Live Chat</p>
                           </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                           {supportMessages.filter(m => m.sender === selectedChatUser || m.receiver === selectedChatUser).map((msg, i) => (
                             <div key={i} className={`flex ${msg.sender === 'ADMIN' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'ADMIN' ? 'flex-row-reverse' : ''}`}>
                                   <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${msg.sender === 'ADMIN' ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                                      {msg.sender === 'ADMIN' ? <Crown size={14} /> : <User size={14} />}
                                   </div>
                                   <div className="space-y-1">
                                      <div className={`p-4 rounded-2xl text-sm font-medium shadow-xl ${msg.sender === 'ADMIN' ? 'bg-yellow-500 text-black rounded-tr-none' : 'bg-[#020617] text-slate-200 rounded-tl-none border border-white/5'}`}>
                                         {msg.text}
                                      </div>
                                      <p className={`text-[8px] font-black uppercase tracking-widest text-slate-600 ${msg.sender === 'ADMIN' ? 'text-right' : 'text-left'}`}>{msg.timestamp}</p>
                                   </div>
                                </div>
                             </div>
                           ))}
                           <div ref={chatEndRef} />
                        </div>

                        <div className="p-6 bg-white/5 border-t border-white/5">
                           <div className="flex gap-3 bg-[#020617] border border-white/10 p-2 rounded-2xl">
                              <input 
                                type="text" 
                                value={adminReply} 
                                onChange={(e) => setAdminReply(e.target.value)} 
                                onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                                placeholder="Type your reply to user..." 
                                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none font-medium italic"
                              />
                              <button onClick={handleSendReply} className="p-3 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400 transition-all shadow-lg active:scale-95"><Send size={20} /></button>
                           </div>
                        </div>
                     </>
                   ) : (
                     <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6 opacity-40">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-dashed border-white/20"><MessageSquare size={48} /></div>
                        <p className="font-black italic text-lg uppercase tracking-tighter">একটি ইউজার সিলেক্ট করুন কথা বলার জন্য</p>
                     </div>
                   )}
                </div>
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

const OverviewCard = ({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) => (
  <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
     <div className={`p-4 rounded-2xl bg-white/5 ${color} mb-6 inline-block`}><Icon size={24} /></div>
     <p className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
     <h3 className="text-2xl font-black italic tracking-tighter text-white">{value}</h3>
  </div>
);

export default AdminPanel;
