import React from "react";
import type { Reward } from "../../types/RewardTypes";

const mockRewards: Reward[] = [
  {
    id: "1",
    title: "Free Coffee",
    description: "Get 10% off on your next in-store purchase.",
    points: 200,
    image: ""
  },
  {
    id: "2",
    title: "10% Store Discount",
    description: "Get 10% off on your next in-store purchase.",
    points: 500,
    image: ""
  },
  {
    id: "3",
    title: "Premium Mug",
    description: "Get 10% off on your next in-store purchase.",
    points: 900,
    image: ""
  }
];

interface RewardsListProps {
  userPoints: number;
  onSelectReward: (reward: Reward) => void;
}

const RewardsList: React.FC<RewardsListProps> = ({ userPoints, onSelectReward }) => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Rewards</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRewards.map((reward) => {
          const canRedeem = userPoints >= reward.points;

          return (
            <div
              key={reward.id}
              className={`rounded-xl p-4 shadow-md border bg-white flex flex-col transition ${
                canRedeem ? "hover:shadow-lg cursor-pointer" : "opacity-70"
              }`}
              onClick={() => canRedeem && onSelectReward(reward)}
            >
              {reward.image ? (
                <img src={reward.image} alt={reward.title} className="w-full h-36 object-cover rounded-lg mb-3" />
              ) : (
                <div className="w-full h-36 rounded-lg bg-gray-200 flex items-center justify-center mb-3 text-gray-500">Sample</div>
              )}

              <h2 className="font-semibold text-lg">{reward.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{reward.points} Points</p>

              <div className="mt-auto">
                {/*       {canRedeem ? (  */}
                <button className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium">Redeem</button>
                {/*   ) : (*/}
                {/* <div className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-200 text-gray-600 font-medium">
                  <Lock size={16} /> Need {reward.points - userPoints} more pts
                </div>
                 )}*/}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RewardsList;
