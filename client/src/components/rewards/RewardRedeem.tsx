import React from "react";
import { ArrowLeft } from "lucide-react";
import type { Reward } from "../../types/RewardTypes";

interface RewardRedeemProps {
  reward: Reward;
  userPoints: number;
  onCancel: () => void;
  onConfirm: () => void;
}

const RewardRedeem: React.FC<RewardRedeemProps> = ({ reward, userPoints, onCancel, onConfirm }) => {
  const remainingPoints = userPoints - reward.points;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-200 transition">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Redeem Reward</h1>
      </div>

      {/* Reward Card */}
      <div className="bg-white rounded-xl shadow-md p-4 border mb-6">
        <img src={reward.image} alt={reward.title} className="w-full h-40 object-cover rounded-lg mb-3" />

        <h2 className="text-lg font-semibold">{reward.title}</h2>
        <p className="text-gray-600 mb-2">{reward.points} Points Required</p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Your Points</span>
            <span>{userPoints}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Remaining After Redeem</span>
            <span className={remainingPoints < 0 ? "text-red-500" : ""}>{remainingPoints}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button className="w-full py-3 rounded-lg bg-black/80 text-white font-medium" onClick={onConfirm}>
          Confirm Redemption
        </button>

        <button className="w-full py-3 rounded-lg bg-gray-200 text-gray-800 font-medium" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RewardRedeem;
