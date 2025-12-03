import QRCode from "react-qr-code";
import { useNavigate } from "react-router";
import { useWallet } from "../../hooks/useWallet";

const WalletQR = () => {
  const navigate = useNavigate();
  const { walletId } = useWallet();

  const regenerateId = () => {
    const newId = "WALLET-" + Math.floor(Math.random() * 999999).toString();
    alert("New QR generated: " + newId);
  };

  return (
    <section className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-3">Your Wallet QR</h1>
      <p className="text-gray-600 mb-6">Show this QR code at partnered shops to earn loyalty points.</p>

      <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
        <QRCode value={walletId || "NO-WALLET"} size={200} />

        <p className="mt-4 font-semibold text-lg">Wallet ID</p>
        <p className="text-gray-700 text-sm">{walletId}</p>

        <button onClick={regenerateId} className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          Regenerate QR (Mock)
        </button>
      </div>

      <button onClick={() => navigate("/dashboard")} className="mt-6 w-full py-3 bg-gray-800 text-white rounded-lg">
        Back to Dashboard
      </button>
    </section>
  );
};

export default WalletQR;
