
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ResetPasswordModalProps {
  onClose: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('mdesaalli74@gmail.com');
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-[#1e293b] rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        <div className="p-5 border-b border-slate-700 flex items-center justify-between">
          <h3 className="font-bold text-xl">Reset Password</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-slate-400 text-sm leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          {isSent && (
            <div className="bg-green-900/20 border border-green-800/50 p-4 rounded-xl text-green-400 text-sm leading-snug">
              Password reset email sent! Please check your inbox (and spam folder).
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-700 hover:bg-slate-800 rounded-xl font-bold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all active:scale-95"
            >
              Send Reset Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
