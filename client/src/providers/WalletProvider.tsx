import { useState, type ReactNode } from "react";
import { WalletContext } from "../context/WalletContext";

type Transaction = {
  id: string;
  type: "earn" | "redeem";
  amountPoints: number;
  meta: string;
  timestamp: string;
};

const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletId, setWalletId] = useState<string>("");
  const [points, setPoints] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const randomId = (prefix: string) => prefix + Math.random().toString(36).substring(2, 10);

  const createWallet = () => {
    if (walletId !== "") return; // already created
    setWalletId("WLT-" + Math.floor(100000 + Math.random() * 900000));
  };

  const addPoints = (amount: number, meta: string) => {
    const tx: Transaction = {
      id: randomId("T-"),
      type: "earn",
      amountPoints: amount,
      meta,
      timestamp: new Date().toISOString()
    };
    setPoints((p) => p + amount);
    setTransactions((t) => [tx, ...t]);
  };

  const redeemPoints = (amount: number, meta: string) => {
    if (points < amount) return false;

    const tx: Transaction = {
      id: randomId("T-"),
      type: "redeem",
      amountPoints: amount,
      meta,
      timestamp: new Date().toISOString()
    };

    setPoints((p) => p - amount);
    setTransactions((t) => [tx, ...t]);

    return true;
  };

  return (
    <WalletContext.Provider value={{ walletId, points, transactions, createWallet, addPoints, redeemPoints }}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
