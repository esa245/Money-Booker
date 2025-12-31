
import React, { useState } from 'react';
import { X, AlertTriangle, ArrowUpRight, CheckCircle2, CreditCard, Wallet, ArrowLeft } from 'lucide-react';

interface WithdrawModalProps {
  onClose: () => void;
  availableCash: number;
  onWithdraw: (amount: number, gateway: string, targetAccount: string) => void;
}

type Step = 'amount' | 'gateway' | 'details';

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onClose, availableCash, onWithdraw }) => {
  const [step, setStep] = useState<Step>('amount');
  const [amount, setAmount] = useState<string>('1000');
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [targetAccount, setTargetAccount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const minWithdraw = 1000;

  const gateways = [
    { id: 'bkash', name: 'bKash', type: 'Personal', color: 'bg-[#d12053]' },
    { id: 'nagad', name: 'Nagad', type: 'Personal', color: 'bg-[#f7941d]' },
    { id: 'binance', name: 'Binance (USDT)', type: 'TRC20 Address', color: 'bg-[#f3ba2f]' },
    { id: 'bybit', name: 'Bybit (USDT)', type: 'UID / Wallet', color: 'bg-[#ff9900]' },
  ];

  const handleWithdrawRequest = () => {
    if (!targetAccount.trim() || !selectedGateway) return;
    const numAmount = parseFloat(amount);
    const gatewayName = gateways.find(g => g.id === selectedGateway)?.name || '';
    if (numAmount >= minWithdraw && numAmount <= availableCash) {
      onWithdraw(numAmount, gatewayName, targetAccount);
      setIsSuccess(true);
      setTimeout(() => onClose(), 2500);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-[#0f172a] rounded-[3.5rem] p-12 w-full max-w-sm text-center border border-blue-500/30 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
          <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={64} className="text-blue-500" />
          </div>
          <h3 className="text-3xl font-black italic tracking-tighter text-white mb-4">REQUESTED!</h3>
          <p className="text-slate-400 text-sm font-medium leading-relaxed italic">আপনার উইথড্র রিকোয়েস্টটি ২৪ ঘণ্টার মধ্যে প্রসেস করা হবে। ধন্যবাদ।</p>
        </div>
      </div>
    );
  }

  const isInsufficient = parseFloat(amount) > availableCash;
  const isTooLow = parseFloat(amount) < minWithdraw;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-[#0f172a] rounded-[3.5rem] w-full max-w-md border border-white/5 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-blue-600/10">
          <div className="flex items-center gap-3">
             {step !== 'amount' && (
               <button onClick={() => setStep(step === 'details' ? 'gateway' : 'amount')} className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all">
                  <ArrowLeft size={18} />
               </button>
             )}
             <h3 className="text-xl font-black italic tracking-tighter uppercase">ROYAL <span className="text-blue-500">WITHDRAWAL</span></h3>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800/50 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-500 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
           {step === 'amount' && (
              <div className="space-y-8 animate-in slide-in-from-right duration-300">
                 <div className="bg-[#020617] p-8 rounded-[3rem] border border-white/5 flex justify-between items-center shadow-inner">
                    <div>
                      <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Available to Payout</p>
                      <p className="text-3xl font-black text-white italic tracking-tighter">₹{availableCash.toFixed(2)}</p>
                    </div>
                    <ArrowUpRight size={32} className="text-blue-500 opacity-50" />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-2">Withdraw Amount</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-600 italic">₹</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`w-full bg-[#020617] border rounded-[2.5rem] pl-14 pr-6 py-6 text-4xl font-black italic outline-none transition-all shadow-inner ${
                          isInsufficient ? 'border-red-500 text-red-500' : 'border-white/10 text-white focus:border-blue-500/30'
                        }`}
                      />
                    </div>
                    {(isInsufficient || isTooLow) && (
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 tracking-widest px-2">
                         <AlertTriangle size={12} /> {isInsufficient ? "Insufficient Balance" : `Min payout is ₹${minWithdraw}`}
                      </div>
                    )}
                 </div>

                 <button
                    onClick={() => setStep('gateway')}
                    disabled={isInsufficient || isTooLow}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-[2.5rem] font-black italic text-lg shadow-2xl shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
                  >
                    SELECT PAYOUT GATEWAY
                  </button>
              </div>
           )}

           {step === 'gateway' && (
             <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-2 px-2">Choose Payout Method</span>
                <div className="grid grid-cols-1 gap-4">
                  {gateways.map((gw) => (
                    <button
                      key={gw.id}
                      onClick={() => setSelectedGateway(gw.id)}
                      className={`flex items-center justify-between p-6 rounded-[2.5rem] border transition-all ${
                        selectedGateway === gw.id ? 'bg-[#1e293b] border-blue-500/50 shadow-2xl' : 'bg-[#020617] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                         <div className={`${gw.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                            {gw.id === 'bkash' || gw.id === 'nagad' ? <CreditCard size={28} /> : <Wallet size={28} />}
                         </div>
                         <div className="text-left">
                            <h5 className="font-black italic text-lg text-white">{gw.name}</h5>
                            <p className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">{gw.type}</p>
                         </div>
                      </div>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${selectedGateway === gw.id ? 'border-blue-500 bg-blue-500' : 'border-slate-800'}`}>
                         {selectedGateway === gw.id && <CheckCircle2 size={16} className="text-black" />}
                      </div>
                    </button>
                  ))}
               </div>

               <button
                onClick={() => setStep('details')}
                disabled={!selectedGateway}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-[2.5rem] font-black italic text-lg shadow-2xl active:scale-95 transition-all disabled:opacity-50"
              >
                ENTER PAYOUT DETAILS
              </button>
             </div>
           )}

           {step === 'details' && (
             <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <div className="bg-[#020617] p-8 rounded-[3rem] border border-white/5 space-y-8">
                   <div className="text-center space-y-2">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Gateway Selected</span>
                      <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter">
                         {gateways.find(g => g.id === selectedGateway)?.name}
                      </h4>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-2">
                         {selectedGateway === 'bkash' || selectedGateway === 'nagad' 
                           ? "Your Account Number" 
                           : "Your USDT (TRC20) Wallet / UID"}
                      </label>
                      <input
                        type="text"
                        value={targetAccount}
                        onChange={(e) => setTargetAccount(e.target.value)}
                        placeholder={selectedGateway === 'bkash' || selectedGateway === 'nagad' ? "Ex: 01XXXXXXXXX" : "Ex: TXXXXXXXXXXXXXXXXXXXX"}
                        className="w-full bg-[#1e293b] border border-white/5 rounded-2xl px-6 py-5 text-white font-black italic outline-none focus:border-blue-500/30 transition-all placeholder:text-slate-600"
                      />
                   </div>
                </div>

                <button
                  onClick={handleWithdrawRequest}
                  disabled={!targetAccount.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-[2.5rem] font-black italic text-lg shadow-2xl shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  REQUEST PAYOUT
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
