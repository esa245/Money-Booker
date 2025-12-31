
import React, { useState } from 'react';
import { User, Transaction } from '../types';
import { ChevronRight, PlusCircle, History, Wallet as WalletIcon, ArrowDownCircle, ArrowUpCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import DepositModal from '../components/DepositModal';
import WithdrawModal from '../components/WithdrawModal';

interface WalletProps {
  user: User;
  transactions: Transaction[];
  onAddTransaction: (txn: Omit<Transaction, 'id' | 'date' | 'status'>) => void;
}

const Wallet: React.FC<WalletProps> = ({ user, transactions, onAddTransaction }) => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      {/* Main Balance Card */}
      <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-[3.5rem] p-8 shadow-2xl border border-slate-700/50 relative overflow-hidden mb-8">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700/50">
            <WalletIcon size={16} className="text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Royal Vault</span>
          </div>
        </div>

        <div className="space-y-2 mb-10">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Available Balance</p>
          <p className="text-5xl font-black text-white italic">₹{user.balance.toFixed(2)}</p>
        </div>

        <button 
          onClick={() => setShowDeposit(true)}
          className="w-full flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black py-5 rounded-[2rem] font-black text-lg transition-all active:scale-[0.98] shadow-2xl shadow-yellow-500/20 italic"
        >
          <PlusCircle size={22} />
          ADD MONEY
        </button>
      </div>

      {/* Sub-balances Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-[#1e293b] p-6 rounded-[2.5rem] border border-slate-700/30 shadow-xl relative overflow-hidden group">
           <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <ArrowDownCircle size={20} className="text-emerald-500" />
           </div>
           <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Winning Cash</p>
           <p className="text-2xl font-black text-white italic mb-5">₹{user.winningCash.toFixed(2)}</p>
           <button 
            onClick={() => setShowWithdraw(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all active:scale-95"
           >
            WITHDRAW
           </button>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-[2.5rem] border border-slate-700/30 shadow-xl overflow-hidden">
           <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
              <ArrowUpCircle size={20} className="text-purple-500" />
           </div>
           <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Bonus Cash</p>
           <p className="text-2xl font-black text-white italic mb-5">₹{user.bonusCash.toFixed(2)}</p>
           <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
             <div className="bg-purple-500 h-full w-[40%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest italic">Vault Logs</h3>
        </div>
        
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-600 bg-[#1e293b]/20 rounded-[3rem] border border-dashed border-slate-700/50">
            <History size={48} className="opacity-10 mb-4" />
            <p className="text-xs font-black uppercase tracking-widest">No Activity Yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((txn) => (
              <div key={txn.id} className="bg-[#1e293b]/40 border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between group hover:border-yellow-500/20 transition-all">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${
                    txn.type === 'DEPOSIT' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {txn.type === 'DEPOSIT' ? <ArrowDownCircle size={24} /> : <ArrowUpCircle size={24} />}
                  </div>
                  <div>
                    <h5 className="text-sm font-black italic text-white">{txn.type === 'DEPOSIT' ? 'Deposit' : 'Withdrawal'}</h5>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{txn.gateway} • {txn.date}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                       {txn.status === 'PENDING' ? (
                         <div className="flex items-center gap-1 text-[8px] font-black text-yellow-500 uppercase px-2 py-0.5 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                            <Clock size={10} /> Pending Verification
                         </div>
                       ) : txn.status === 'APPROVED' ? (
                        <div className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                           <CheckCircle2 size={10} /> Success
                        </div>
                       ) : (
                        <div className="flex items-center gap-1 text-[8px] font-black text-red-500 uppercase px-2 py-0.5 bg-red-500/10 rounded-full border border-red-500/20">
                           <XCircle size={10} /> Rejected
                        </div>
                       )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-black italic ${txn.type === 'DEPOSIT' ? 'text-emerald-500' : 'text-blue-500'}`}>
                    {txn.type === 'DEPOSIT' ? '+' : '-'}₹{txn.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeposit && (
        <DepositModal 
          onClose={() => setShowDeposit(false)} 
          onDeposit={(amt, gateway, trxId) => onAddTransaction({ amount: amt, type: 'DEPOSIT', gateway, trxId })} 
        />
      )}

      {showWithdraw && (
        <WithdrawModal 
          onClose={() => setShowWithdraw(false)} 
          availableCash={user.winningCash}
          onWithdraw={(amt, gateway, targetAccount) => onAddTransaction({ amount: amt, type: 'WITHDRAWAL', gateway, targetAccount })}
        />
      )}
    </div>
  );
};

export default Wallet;
