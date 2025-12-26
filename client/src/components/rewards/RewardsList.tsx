import React from "react";
import type { Reward } from "../../types/RewardTypes";
import { Lock, Zap, Gift } from "lucide-react"; // Assuming you have lucide-react installed

const mockRewards: Reward[] = [
  {
    id: "1",
    title: "Free Coffee",
    description: "Get a free medium coffee on your next visit",
    points: 200,
    image: ""
  },
  {
    id: "2",
    title: "10% Store Discount",
    description: "Get 10% off your entire in-store purchase",
    points: 500,
    image: ""
  },
  {
    id: "3",
    title: "Premium Mug",
    description: "Exclusive branded ceramic coffee mug",
    points: 900,
    image: ""
  },
  {
    id: "4",
    title: "Double Points Day",
    description: "Earn double points on all purchases for one day",
    points: 300,
    image: ""
  },
  {
    id: "5",
    title: "Free Pastry",
    description: "Complimentary pastry with any drink purchase",
    points: 350,
    image: ""
  },
  {
    id: "6",
    title: "Birthday Treat",
    description: "Special birthday reward during your birthday month",
    points: 0,
    image: ""
  }
];

interface RewardsListProps {
  userPoints: number;
  onSelectReward: (reward: Reward) => void;
}

const RewardsList: React.FC<RewardsListProps> = ({ userPoints, onSelectReward }) => {
  // Sort rewards: available first, then locked, free at the end
  const sortedRewards = [...mockRewards].sort((a, b) => {
    const aCanRedeem = userPoints >= a.points;
    const bCanRedeem = userPoints >= b.points;
    if (a.points === 0 && b.points === 0) return 0;
    if (a.points === 0) return 1; // Free rewards at end
    if (b.points === 0) return -1;
    if (aCanRedeem && !bCanRedeem) return -1;
    if (!aCanRedeem && bCanRedeem) return 1;
    return a.points - b.points;
  });

  return (
    <div className="px-1">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-900">Rewards</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
            <Zap size={16} className="text-blue-600" />
            <span className="font-semibold text-blue-700">{userPoints}</span>
            <span className="text-sm text-blue-600">points</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">Redeem your loyalty points for exclusive rewards</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium whitespace-nowrap">All Rewards</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
          Available
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">Popular</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-200">
          Food & Drink
        </button>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedRewards.map((reward) => {
          const canRedeem = userPoints >= reward.points;
          const isFree = reward.points === 0;

          return (
            <div
              key={reward.id}
              className={`rounded-2xl overflow-hidden border border-gray-200 bg-white flex flex-col transition-all duration-200 ${
                canRedeem ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer active:scale-[0.98] active:shadow-md" : "opacity-80"
              }`}
              onClick={() => canRedeem && onSelectReward(reward)}
            >
              {/* Image Section */}
              <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                {reward.image ? (
                  <img src={reward.image} alt={reward.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Gift size={48} className="text-gray-400 mb-2" />
                    <span className="text-gray-500 text-sm">Reward Preview</span>
                  </div>
                )}

                {/* Points Badge */}
                <div className="absolute top-3 right-3">
                  {isFree ? (
                    <div className="px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold shadow-sm">FREE</div>
                  ) : (
                    <div
                      className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                        canRedeem ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white" : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {reward.points} pts
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-bold text-gray-900 text-lg mb-1">{reward.title}</h2>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{reward.description}</p>

                {/* Status & Action Button */}
                <div className="mt-auto">
                  {canRedeem ? (
                    <button
                      className={`w-full py-3 rounded-xl font-medium text-white transition-all ${
                        isFree
                          ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                      } active:scale-[0.98]`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectReward(reward);
                      }}
                    >
                      {isFree ? "Claim Now" : "Redeem Now"}
                    </button>
                  ) : (
                    <div className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium flex items-center justify-center gap-2">
                      <Lock size={16} />
                      <span>Need {reward.points - userPoints} more pts</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State (for when no rewards) */}
      {sortedRewards.length === 0 && (
        <div className="text-center py-12">
          <Gift size={64} className="text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No rewards available</h3>
          <p className="text-gray-500 text-sm">Check back later for new rewards!</p>
        </div>
      )}

      {/* Bottom Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap size={20} className="text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">How to earn points</h4>
            <p className="text-gray-600 text-sm">
              Make purchases, refer friends, or participate in promotions to earn more points. Points reset at the end of each year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsList;
