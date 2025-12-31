
import React, { useState } from 'react';
import { Page } from '../types';

interface LoginProps {
  onLogin: (email: string, pass: string) => void;
  onNavigate: (page: Page) => void;
  onForgotPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate, onForgotPassword }) => {
  // ডিফল্ট ইমেইল এবং পাসওয়ার্ড সেট করা হয়েছে আপনার অনুরোধ অনুযায়ী
  const [email, setEmail] = useState('mdesaalli74@gmail.com');
  const [password, setPassword] = useState('1111');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      alert("সবগুলো ঘর পূরণ করুন।");
      return;
    }
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#020617]">
      <div className="w-full max-w-sm">
        <div className="bg-[#1e293b] rounded-[3rem] p-8 shadow-2xl border border-slate-700/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase">Royal <span className="text-yellow-500">Login</span></h2>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Welcome Back, Excellency</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Email or Username</label>
              <input
                type="text"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-2">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all font-medium"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-5 rounded-[2rem] font-black italic text-lg shadow-xl shadow-yellow-500/20 active:scale-95 transition-all"
            >
              SIGN IN
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
              Need an account?{' '}
              <button 
                onClick={() => onNavigate(Page.SIGNUP)}
                className="text-yellow-500 font-black hover:underline"
              >
                Sign Up
              </button>
            </p>
            <button 
              onClick={onForgotPassword}
              className="text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        
        {/* Quick Hint for User */}
        <p className="text-center text-[9px] text-slate-600 mt-6 font-black uppercase tracking-widest">
          Sovereign Access Protocol Active
        </p>
      </div>
    </div>
  );
};

export default Login;
