
import React, { useState } from 'react';
import { Page, User } from '../types';

interface SignupProps {
  onNavigate: (page: Page) => void;
  onSignup: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate, onSignup }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ইউনিক ৬ সংখ্যার ইউজার কোড জেনারেট করা
    const generatedUserCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser: User = {
      username,
      email,
      userCode: generatedUserCode,
      balance: 0,
      winningCash: 0,
      bonusCash: 0,
      matchesPlayed: 0,
      matchesWon: 0
    };

    onSignup(newUser);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#020617]">
      <div className="w-full max-w-sm">
        <div className="bg-[#1e293b] rounded-[3rem] p-8 shadow-2xl border border-slate-700/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">Join <span className="text-yellow-500">Royal Club</span></h2>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Become a Money Booker Member</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Username</label>
              <input
                type="text"
                placeholder="Ex: royal_gamer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Password</label>
                <input
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Confirm</label>
                <input
                  type="password"
                  placeholder="******"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Referral Code (Optional)</label>
              <input
                type="text"
                placeholder="Ex: ROYAL100"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-5 rounded-[2rem] font-black italic text-lg shadow-xl shadow-yellow-500/20 active:scale-95 transition-all mt-4"
            >
              CREATE ACCOUNT
            </button>
          </form>

          <p className="mt-8 text-center text-[11px] text-slate-500 font-bold uppercase tracking-widest">
            Already a member?{' '}
            <button 
              onClick={() => onNavigate(Page.LOGIN)}
              className="text-yellow-500 font-black hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
