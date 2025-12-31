
import React from 'react';
import { CircleDollarSign } from 'lucide-react';

const Earnings: React.FC = () => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Earnings</h2>
      
      <div className="bg-[#1e293b] rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl border border-slate-700/50">
        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
          <CircleDollarSign size={48} className="text-yellow-500" />
        </div>
        
        <p className="text-slate-400 text-sm mb-8 px-4 leading-relaxed">
          Track your earnings from tournaments and referrals here.
        </p>

        <div className="space-y-4 w-full">
          <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl">
            <span className="text-slate-300 font-medium">Total Earned:</span>
            <span className="text-xl font-bold">₹0.00</span>
          </div>
          
          <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl">
            <span className="text-slate-300 font-medium">From Referrals:</span>
            <span className="text-xl font-bold text-green-500">₹0.00</span>
          </div>
        </div>

        <button className="mt-8 text-blue-500 font-bold hover:underline">
          View History
        </button>
      </div>
    </div>
  );
};

export default Earnings;
