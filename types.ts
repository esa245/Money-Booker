
export enum Page {
  HOME = 'HOME',
  WALLET = 'WALLET',
  EARNINGS = 'EARNINGS',
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  SUPPORT = 'SUPPORT',
  ADMIN_PANEL = 'ADMIN_PANEL',
  REFERRAL = 'REFERRAL',
  GRAND_ARENA = 'GRAND_ARENA'
}

export interface User {
  username: string;
  email: string;
  userCode: string;
  balance: number;
  winningCash: number;
  bonusCash: number;
  matchesPlayed: number;
  matchesWon: number;
}

export interface Tournament {
  id: string;
  game: string;
  image: string;
  type: string;
  entry: number;
  prize: number;
  totalSpots: number;
  filledSpots: number;
  startTime: string;
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
}

export interface Transaction {
  id: string;
  user: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'REFERRAL' | 'WINNING';
  gateway: string;
  trxId?: string;
  targetAccount?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
}

export interface SupportMessage {
  id: string;
  sender: string; // username or 'ADMIN'
  receiver: string; // username or 'ADMIN'
  text: string;
  timestamp: string;
}
