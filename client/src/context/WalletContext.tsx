import { createContext } from "react";

type Transaction = {
  id: string;
  type: "earn" | "redeem";
  amountPoints: number;
  meta: string;
  timestamp: string;
};

type WalletContextType = {
  walletId: string | null;
  points: number;
  transactions: Transaction[];
  createWallet: () => void;
  addPoints: (amount: number, meta: string) => void;
  redeemPoints: (amount: number, meta: string) => boolean;
};

export const WalletContext = createContext<WalletContextType | null>(null);
