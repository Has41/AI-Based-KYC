// import { useNavigate } from "react-router";
import WalletUserInfo from "../components/wallet/WalletUserInfo";
import WalletTransactions from "../components/wallet/WalletTransactions";
import MockQrScanner from "../components/kyc/MockQrScanner";
import type { Tab } from "../types/KycFlowTypes";
import { useState } from "react";
import ViewQrModal from "../components/common/ViewQrModal";

const Wallet = ({ setTab }: { setTab: React.Dispatch<React.SetStateAction<Tab>> }) => {
  const [mode, setMode] = useState<"wallet" | "scan">("wallet");
  const [showQr, setShowQr] = useState(false);

  // const navigate = useNavigate();

  // Temporary — ideally full name comes from KYC context
  const fullName = "Ali Khan";
  const tier = "Silver";

  // If scanning mode, show scanner instead of wallet
  if (mode === "scan") {
    return <MockQrScanner onBack={() => setMode("wallet")} />;
  }

  return (
    <section className="bg-gray-100 p-6 space-y-6 font-poppins">
      <h1 className="text-2xl font-bold">Welcome to Oeconvi digital wallet</h1>

      <WalletUserInfo setShowQr={setShowQr} fullName={fullName} tier={tier} />

      <WalletTransactions />
      {showQr && <ViewQrModal walletId={"XYZ"} fullName={fullName} tier={tier} onClose={() => setShowQr(false)} />}

      <div className="space-y-3">
        <button onClick={() => setTab("rewards")} className="w-full py-3 bg-purple-600 text-white rounded-lg">
          Browse Rewards
        </button>
        <button onClick={() => setTab("dashboard")} className="w-full py-3 bg-purple-600 text-white rounded-lg">
          Reporting Dashboard
        </button>
        <button onClick={() => setMode("scan")} className="w-full py-3 bg-gray-800 text-white rounded-lg">
          Store Mode (Earn / Redeem)
        </button>
      </div>
    </section>
  );
};

export default Wallet;
