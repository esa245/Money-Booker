
import React, { useState, useEffect } from 'react';
import { Page, User, Transaction, SupportMessage, Tournament } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import Earnings from './pages/Earnings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SupportZone from './pages/SupportZone';
import AdminPanel from './pages/AdminPanel';
import Referral from './pages/Referral';
import GrandArena from './pages/GrandArena';
import NotificationModal from './components/NotificationModal';
import ResetPasswordModal from './components/ResetPasswordModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  
  const [allUsers, setAllUsers] = useState<User[]>([
    {
      username: 'mdesaalli74',
      email: 'mdesaalli74@gmail.com',
      userCode: '882931',
      balance: 100,
      winningCash: 500,
      bonusCash: 20,
      matchesPlayed: 12,
      matchesWon: 5
    }
  ]);

  const [currentUser, setCurrentUser] = useState<User>(allUsers[0]);

  const [tournaments, setTournaments] = useState<Tournament[]>([
    {
      id: 'FF-001',
      game: 'Free Fire MAX',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
      type: 'Squad Battle',
      entry: 10,
      prize: 500,
      totalSpots: 48,
      filledSpots: 12,
      startTime: 'Today, 09:30 PM',
      status: 'ACTIVE'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      user: 'mdesaalli74',
      amount: 500,
      type: 'DEPOSIT',
      gateway: 'bKash',
      trxId: '8XJ9K2L',
      status: 'APPROVED',
      date: '2023-12-01 10:30 AM'
    }
  ]);

  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);

  const handleLogin = (email: string, pass: string) => {
    if (pass !== '1111') {
      alert("ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।");
      return;
    }

    const user = allUsers.find(u => u.email === email || u.username === email);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentPage(Page.HOME);
    } else {
      alert("ইউজার পাওয়া যায়নি! দয়া করে সঠিক তথ্য দিন অথবা সাইন আপ করুন।");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage(Page.LOGIN);
  };

  const handleSignup = (newUser: User) => {
    setAllUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setCurrentPage(Page.HOME);
  };

  const sendSupportMessage = (text: string, sender: string, receiver: string) => {
    const newMessage: SupportMessage = {
      id: `MSG-${Date.now()}`,
      sender,
      receiver,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSupportMessages(prev => [...prev, newMessage]);
  };

  const addTransaction = (txn: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    const newTxn: Transaction = {
      ...txn,
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString(),
      status: 'PENDING',
      user: currentUser.username
    };
    setTransactions(prev => [newTxn, ...prev]);
  };

  const updateTransactionStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        if (status === 'APPROVED') {
          if (t.type === 'DEPOSIT') {
            const updatedUsers = allUsers.map(u => 
              u.username === t.user ? { ...u, balance: u.balance + t.amount } : u
            );
            setAllUsers(updatedUsers);
            if (currentUser.username === t.user) {
              setCurrentUser(prev => ({ ...prev, balance: prev.balance + t.amount }));
            }
          } else if (t.type === 'WITHDRAWAL') {
            const updatedUsers = allUsers.map(u => 
              u.username === t.user ? { ...u, winningCash: u.winningCash - t.amount } : u
            );
            setAllUsers(updatedUsers);
            if (currentUser.username === t.user) {
              setCurrentUser(prev => ({ ...prev, winningCash: prev.winningCash - t.amount }));
            }
          }
        }
        return { ...t, status };
      }
      return t;
    }));
  };

  const handleJoinTournament = (tournamentId: string) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (!tournament) return;

    if (currentUser.balance < tournament.entry) {
      alert("আপনার পর্যাপ্ত ব্যালেন্স নেই! দয়া করে ওয়ালেটে টাকা যোগ করুন।");
      setCurrentPage(Page.WALLET);
      return;
    }

    if (tournament.filledSpots >= tournament.totalSpots) {
      alert("এই টুর্নামেন্টটি ফুল হয়ে গেছে!");
      return;
    }

    // Deduct balance and join
    setCurrentUser(prev => ({ ...prev, balance: prev.balance - tournament.entry }));
    setTournaments(prev => prev.map(t => 
      t.id === tournamentId ? { ...t, filledSpots: t.filledSpots + 1 } : t
    ));
    alert(`${tournament.game} টুর্নামেন্টে আপনি সফলভাবে জয়েন করেছেন!`);
  };

  const addTournament = (t: Tournament) => {
    setTournaments(prev => [t, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.LOGIN:
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} onForgotPassword={() => setShowResetPassword(true)} />;
      case Page.SIGNUP:
        return <Signup onSignup={handleSignup} onNavigate={setCurrentPage} />;
      case Page.HOME:
        return <Home onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case Page.WALLET:
        return <Wallet 
          user={currentUser} 
          transactions={transactions.filter(t => t.user === currentUser.username)} 
          onAddTransaction={addTransaction} 
        />;
      case Page.EARNINGS:
        return <Earnings />;
      case Page.PROFILE:
        return <Profile user={currentUser} onLogout={handleLogout} onNavigate={setCurrentPage} />;
      case Page.SUPPORT:
        return <SupportZone 
          user={currentUser}
          messages={supportMessages.filter(m => m.sender === currentUser.username || m.receiver === currentUser.username)}
          onSendMessage={(text) => sendSupportMessage(text, currentUser.username, 'ADMIN')}
          onBack={() => setCurrentPage(Page.HOME)} 
        />;
      case Page.ADMIN_PANEL:
        return <AdminPanel 
          onBack={() => setCurrentPage(Page.HOME)} 
          transactions={transactions} 
          users={allUsers}
          supportMessages={supportMessages}
          tournaments={tournaments}
          onAddTournament={addTournament}
          onSendSupportMessage={sendSupportMessage}
          onUpdateTransaction={updateTransactionStatus}
        />;
      case Page.REFERRAL:
        return <Referral user={currentUser} onBack={() => setCurrentPage(Page.HOME)} />;
      case Page.GRAND_ARENA:
        return <GrandArena tournaments={tournaments} onJoin={handleJoinTournament} onBack={() => setCurrentPage(Page.HOME)} />;
      default:
        return <Home onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white">
      {isLoggedIn && currentPage !== Page.ADMIN_PANEL && (
        <Header 
          user={currentUser} 
          onNotificationClick={() => setShowNotifications(true)} 
          onWalletClick={() => setCurrentPage(Page.WALLET)}
        />
      )}
      
      <main className={`flex-1 overflow-y-auto ${isLoggedIn && currentPage !== Page.ADMIN_PANEL ? 'pb-20 pt-16' : ''}`}>
        {renderPage()}
      </main>

      {isLoggedIn && currentPage !== Page.ADMIN_PANEL && <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />}

      {showNotifications && <NotificationModal onClose={() => setShowNotifications(false)} />}
      {showResetPassword && <ResetPasswordModal onClose={() => setShowResetPassword(false)} />}
    </div>
  );
};

export default App;
