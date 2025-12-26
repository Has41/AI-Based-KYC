import React, { useState } from "react";
import { Bell, Menu, QrCode, CreditCard, Gift, WalletCards, ArrowRight, ChevronRight } from "lucide-react";
import type { Tab } from "../types/KycFlowTypes";
import OffersPage from "./OffersPage";
import AllTransactionsPage from "./AllTransactionsPage";
import ViewQrModal from "../components/common/ViewQrModal";
import MockQrScanner from "../components/kyc/MockQrScanner";

type WalletProps = {
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
};

const previewOffers = [
  { id: "p1", title: "20% off at StyleMart", subtitle: "Selected Fashion", url: "#" },
  { id: "p2", title: "10% cashback at SuperShop", subtitle: "Groceries", url: "#" },
  { id: "p3", title: "Buy 1 Get 1 at ABC Mart", subtitle: "Bakery & Drinks", url: "#" }
];

const recentPreview = [
  { id: "r1", title: "Payment at StyleMart", date: "Dec 24, 2025", amount: -500 },
  { id: "r2", title: "Top-up Wallet", date: "Dec 23, 2025", amount: 2000 },
  { id: "r3", title: "Payment at Cafe Express", date: "Dec 22, 2025", amount: -1200 }
];

const Wallet = ({ setTab }: WalletProps) => {
  const [mode, setMode] = useState<"wallet" | "scan">("wallet");
  const [showQr, setShowQr] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Simple open link helper (external)
  const openOfferLink = (url: string) => {
    if (!url || url === "#") return; // placeholder behavior
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // full-screen pages
  if (showAllOffers) return <OffersPage setShowAllOffers={setShowAllOffers} />;
  if (showAllTransactions) return <AllTransactionsPage setShowAllTransactions={setShowAllTransactions} />;
  if (mode === "scan") {
    return <MockQrScanner onBack={() => setMode("wallet")} />;
  }

  return (
    <section className="min-h-screen w-full mx-auto font-poppins space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">My Wallet</h1>
        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            title="Notifications"
          >
            <Bell size={20} className="text-gray-700" />
          </button>

          <button aria-label="Menu" className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200" title="Menu">
            <Menu size={20} className="text-gray-700" />
          </button>
        </div>
      </header>
      {showQr && <ViewQrModal walletId={"XYZ"} fullName={"John Doe"} tier={"Silver"} onClose={() => setShowQr(false)} />}
      {/* Balance Card */}
      <div className="relative bg-linear-to-r from-blue-700 to-blue-600 text-white rounded-2xl p-4 shadow-md">
        <div className="flex flex-col gap-4">
          {/* Top section with balance and tier */}
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-xs opacity-90">PKR</span>
                <span className="text-2xl font-bold tracking-tight">8,000</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs bg-white/15 px-3 py-1 rounded-full text-white/90">Silver Tier</span>
                <div className="text-xs opacity-80">• 1,200 points</div>
              </div>
            </div>

            {/* Wallet icon - now at top right */}
            <WalletCards size={32} className="text-white/95 shrink-0" />
          </div>

          {/* Action buttons section */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setTab("rewards")}
              className="w-full flex items-center justify-between bg-white/12 px-4 py-3 rounded-xl hover:bg-white/20 active:bg-white/25 transition-colors"
              aria-label="View Rewards"
            >
              <span className="text-sm font-medium">View Rewards</span>
              <ChevronRight size={18} className="text-white/90" />
            </button>

            <button
              onClick={() => setShowQr(true)}
              className="w-full flex items-center justify-between bg-white/8 px-4 py-3 rounded-xl hover:bg-white/15 active:bg-white/20 transition-colors"
              aria-label="View Wallet QR"
            >
              <span className="text-sm font-medium">View Wallet & QR Code</span>
              <QrCode size={18} className="text-white/90" />
            </button>
          </div>

          {/* Helper text */}
          <p className="text-xs text-white/70 text-center mt-1">Tap any option to manage your wallet</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setMode("scan")}
          className="flex flex-col items-center gap-2 bg-white rounded-xl p-3 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="Scan QR"
        >
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <QrCode size={18} className="text-gray-700" />
          </div>
          <span className="text-xs font-medium text-gray-700">Scan</span>
        </button>

        <button
          onClick={() => setTab("rewards")}
          className="flex flex-col items-center gap-2 bg-white rounded-xl p-3 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="Top Up"
        >
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <CreditCard size={18} className="text-gray-700" />
          </div>
          <span className="text-xs font-medium text-gray-700">Top Up</span>
        </button>

        <button
          onClick={() => setTab("rewards")}
          className="flex flex-col items-center gap-2 bg-white rounded-xl p-3 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="Rewards center"
        >
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <Gift size={18} className="text-gray-700" />
          </div>
          <span className="text-xs font-medium text-gray-700">Rewards</span>
        </button>
      </div>

      {/* Offers Preview (horizontal scroll) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Offers & Promotions</h2>
          <button
            onClick={() => setShowAllOffers(true)}
            className="text-blue-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-200 rounded"
          >
            View All
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1">
          {previewOffers.map((o) => (
            <article
              key={o.id}
              onClick={() => openOfferLink(o.url)}
              className="min-w-[72%] sm:min-w-[46%] bg-linear-to-br from-indigo-600 to-violet-600 text-white rounded-2xl p-3 shadow-md hover:scale-105 transition-transform cursor-pointer mx-1"
              aria-label={o.title}
              role="button"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs uppercase opacity-90">{o.subtitle}</p>
                  <h3 className="text-base font-semibold leading-tight truncate">{o.title}</h3>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center px-2 py-1 rounded-md bg-white/20 text-xs font-semibold">
                    {/* discount */}20%
                  </span>
                </div>
              </div>
              <p className="mt-2 text-xs text-white/90">Tap to view details</p>
            </article>
          ))}
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <button
            onClick={() => setShowAllTransactions(true)}
            className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-200 rounded"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {recentPreview.map((tx) => {
            const isCredit = tx.amount > 0;
            return (
              <div
                key={tx.id}
                className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between"
                role="button"
                onClick={() => setShowAllTransactions(true)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isCredit ? "bg-green-50" : "bg-red-50"}`}>
                    {/* small initial avatar */}
                    <span className={`text-sm font-semibold ${isCredit ? "text-green-600" : "text-red-500"}`}>
                      {tx.title.split(" ").slice(1, 2)[0]?.slice(0, 1) ?? "T"}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{tx.title}</p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`text-sm font-semibold ${isCredit ? "text-green-600" : "text-red-500"}`}>
                    {isCredit ? `₨${tx.amount.toLocaleString()}` : `-₨${Math.abs(tx.amount).toLocaleString()}`}
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-2 pb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setTab("dashboard")}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-3 text-sm font-medium hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Reporting Dashboard
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => setTab("rewards")}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Browse Rewards
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Wallet;
