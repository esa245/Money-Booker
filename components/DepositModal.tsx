
import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ChevronRight, Copy, Wallet, CreditCard, ArrowLeft } from 'lucide-react';

interface DepositModalProps {
  onClose: () => void;
  onDeposit: (amount: number, gateway: string, trxId: string) => void;
}

type Step = 'amount' | 'gateway' | 'payment';

const DepositModal: React.FC<DepositModalProps> = ({ onClose, onDeposit }) => {
  const [step, setStep] = useState<Step>('amount');
  const [amount, setAmount] = useState<string>('100');
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [trxId, setTrxId] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const minDeposit = 100;

  const gateways = [
    { id: 'bkash', name: 'bKash', type: 'Local', color: 'bg-[#d12053]', detail: '01XXXXXXXXX' },
    { id: 'nagad', name: 'Nagad', type: 'Local', color: 'bg-[#f7941d]', detail: '01XXXXXXXXX' },
    { id: 'binance', name: 'Binance', type: 'Crypto (USDT)', color: 'bg-[#f3ba2f]', detail: 'TRX_ADDRESS_HERE' },
    { id: 'bybit', name: 'Bybit', type: 'Crypto (USDT)', color: 'bg-[#ff9900]', detail: 'BYBIT_UID_HERE' },
  ];

  const handleNextStep = () => {
    if (step === 'amount') setStep('gateway');
    else if (step === 'gateway' && selectedGateway) setStep('payment');
  };

  const handleDepositSubmit = () => {
    if (!trxId.trim() || !selectedGateway) return;
    const numAmount = parseFloat(amount);
    const gatewayName = gateways.find(g => g.id === selectedGateway)?.name || '';
    onDeposit(numAmount, gatewayName, trxId);
    setIsSuccess(true);
    setTimeout(() => onClose(), 2500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] flex items-center justify-center p-6 animate-in fade-in duration-500">
        <div className="bg-[#0f172a] rounded-[3.5rem] p-12 w-full max-w-sm text-center border border-emerald-500/30 shadow-[0_0_100px_rgba(16,185,129,0.1)]">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={64} className="text-emerald-500" />
          </div>
          <h3 className="text-3xl font-black italic tracking-tighter text-white mb-4">REQUEST SENT!</h3>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">অ্যাডমিন আপনার TRX ID ভেরিফাই করে ৫-১৫ মিনিটের মধ্যে ব্যালেন্স যোগ করে দিবে।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-[#0f172a] rounded-[3.5rem] w-full max-w-md border border-white/5 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#1e293b]/30">
          <div className="flex items-center gap-3">
             {step !== 'amount' && (
               <button onClick={() => setStep(step === 'payment' ? 'gateway' : 'amount')} className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all">
                  <ArrowLeft size={18} />
               </button>
             )}
             <h3 className="text-xl font-black italic tracking-tighter">ADD <span className="text-yellow-500">ROYAL CASH</span></h3>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800/50 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-500 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {step === 'amount' && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Select Deposit Amount</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-600 italic">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-[#020617] border border-white/10 rounded-3xl pl-14 pr-6 py-6 text-4xl font-black text-white italic outline-none focus:border-yellow-500/30 transition-all shadow-inner"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-yellow-500/50 tracking-widest px-2">
                   <AlertCircle size={12} /> Minimum deposit is ₹100
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {['100', '200', '500', '1000'].map(val => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-4 rounded-2xl text-sm font-black italic transition-all border ${
                      amount === val ? 'bg-yellow-500 text-black border-yellow-500 shadow-lg shadow-yellow-500/20' : 'bg-[#020617] border-white/5 text-slate-400 hover:border-white/10'
                    }`}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextStep}
                disabled={parseFloat(amount) < minDeposit}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-5 rounded-[2rem] font-black italic text-lg shadow-2xl shadow-yellow-500/10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                SELECT GATEWAY
              </button>
            </div>
          )}

          {step === 'gateway' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-2 px-2">Preferred Gateway</span>
               <div className="grid grid-cols-1 gap-4">
                  {gateways.map((gw) => (
                    <button
                      key={gw.id}
                      onClick={() => setSelectedGateway(gw.id)}
                      className={`flex items-center justify-between p-6 rounded-[2.5rem] border transition-all ${
                        selectedGateway === gw.id ? 'bg-[#1e293b] border-yellow-500/50 shadow-2xl' : 'bg-[#020617] border-white/5 hover:border-white/10'
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
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${selectedGateway === gw.id ? 'border-yellow-500 bg-yellow-500' : 'border-slate-800'}`}>
                         {selectedGateway === gw.id && <CheckCircle2 size={16} className="text-black" />}
                      </div>
                    </button>
                  ))}
               </div>

               <button
                onClick={handleNextStep}
                disabled={!selectedGateway}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-5 rounded-[2rem] font-black italic text-lg shadow-2xl active:scale-95 transition-all disabled:opacity-50"
              >
                PROCEED TO PAYMENT
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              {gateways.find(g => g.id === selectedGateway) && (
                <div className="space-y-8">
                   <div className="bg-[#020617] p-8 rounded-[3rem] border border-white/5 space-y-6">
                      <div className="text-center space-y-2">
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">SEND EXACTLY</span>
                         <h4 className="text-4xl font-black italic text-yellow-500">₹{amount}</h4>
                      </div>
                      
                      <div className="space-y-3">
                         <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Payment Address/Number</label>
                         <div className="flex items-center gap-3 bg-[#1e293b] p-4 rounded-2xl border border-white/5 group">
                            <span className="text-sm font-black text-white italic flex-1 overflow-hidden truncate">
                               {gateways.find(g => g.id === selectedGateway)?.detail}
                            </span>
                            <button 
                              onClick={() => copyToClipboard(gateways.find(g => g.id === selectedGateway)?.detail || '')}
                              className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-yellow-500 transition-all"
                            >
                               <Copy size={16} />
                            </button>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Enter Transaction ID (TRX ID)</label>
                         <input
                           type="text"
                           value={trxId}
                           onChange={(e) => setTrxId(e.target.value)}
                           placeholder="Ex: 8XJ9K2L..."
                           className="w-full bg-[#1e293b] border border-white/5 rounded-2xl px-6 py-4 text-white font-black italic outline-none focus:border-yellow-500/30 transition-all uppercase placeholder:normal-case placeholder:text-slate-600"
                         />
                      </div>
                   </div>

                   <button
                    onClick={handleDepositSubmit}
                    disabled={!trxId.trim()}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-5 rounded-[2.5rem] font-black italic text-lg shadow-2xl shadow-emerald-500/10 active:scale-95 transition-all disabled:opacity-50"
                  >
                    CONFIRM DEPOSIT
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
