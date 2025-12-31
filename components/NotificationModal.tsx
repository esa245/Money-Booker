
import React from 'react';
import { X, BellOff } from 'lucide-react';

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellOff size={20} className="text-slate-400" />
            <h3 className="font-bold text-lg">Notifications</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
          <p className="text-slate-400 font-medium">You have no new notifications.</p>
        </div>

        <div className="p-4 bg-slate-900/50 flex justify-end">
           <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-bold transition-all"
           >
            Mark All as Read
           </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
