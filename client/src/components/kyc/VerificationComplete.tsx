import { useWallet } from "../../hooks/useWallet";
import { BadgeCheck } from "lucide-react";
// import { useNavigate } from "react-router";

const VerificationComplete = () => {
  const { walletId, points } = useWallet();
  // const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center gap-y-8 lg:p-6">
      <div className="bg-white w-full lg:max-w-md p-8 flex flex-col items-center text-center">
        <BadgeCheck size={80} className="text-green-500 mb-4" />
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Verification Complete</h2>

        <ul className="text-gray-700 mb-6 space-y-3 w-full max-w-sm mx-auto">
          <li className="flex items-center gap-3">
            <span className="text-green-500 font-bold">✔</span>
            <span>Identity Verified</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500 font-bold">✔</span>
            <span>Wallet Created</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500 font-bold">🎁</span>
            <span>Points Awarded: 11{points}</span>
          </li>
        </ul>

        <button
          // onClick={() => navigate("/wallet")}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-500 transition-all duration-200"
        >
          Go to Wallet Dashboard
        </button>
      </div>
    </section>
  );
};

export default VerificationComplete;
