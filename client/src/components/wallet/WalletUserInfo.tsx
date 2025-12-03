import { useWallet } from "../../hooks/useWallet";
// import { useNavigate } from "react-router";

type Props = {
  fullName: string;
  tier?: string;
  setShowQr: (value: boolean) => void;
};

const WalletUserInfo = ({ fullName, tier = "Silver", setShowQr }: Props) => {
  const { points } = useWallet();
  // const navigate = useNavigate();

  return (
    <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center space-y-4">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 font-medium text-lg">Avatar</span>
      </div>

      {/* User Info */}
      <p className="font-semibold text-xl text-gray-800">{fullName}</p>
      <div className="flex items-center gap-2">
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">✔ Verified</span>
        {tier && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">{tier} Tier</span>}
      </div>

      {/* Points */}
      <p className="text-gray-700 font-medium text-lg">{points.toLocaleString()} Points</p>

      {/* QR Button */}
      <button onClick={() => setShowQr(true)} className="mt-2 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-blue-700 font-medium">
        View QR Code
      </button>
    </div>
  );
};

export default WalletUserInfo;
