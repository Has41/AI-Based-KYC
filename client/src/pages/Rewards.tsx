import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import RewardsList from "../components/rewards/RewardsList";
import RewardRedeem from "../components/rewards/RewardRedeem";
import type { Reward } from "../types/RewardTypes";
import { ArrowLeft } from "lucide-react";
import type { Tab } from "../types/KycFlowTypes";

const Rewards = ({ setTab }: { setTab: React.Dispatch<React.SetStateAction<Tab>> }) => {
  const { points, redeemPoints } = useWallet();
  const [stage, setStage] = useState<"list" | "details" | "redeem">("list");
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const onSelectReward = (reward: Reward) => {
    setSelectedReward(reward);
    setStage("details");
  };

  const onConfirmRedeem = () => {
    if (!selectedReward) return;

    const success = redeemPoints(selectedReward.points, selectedReward.title);

    if (!success) {
      alert("Not enough points to redeem this reward.");
      return;
    }

    alert("Reward redeemed successfully (mock)!");
    setStage("list");
    setSelectedReward(null);
  };

  return (
    <section className="min-h-screen w-full py-4 font-poppins">
      <button onClick={() => setTab("home")} className="flex items-center gap-2 mb-4 text-gray-700 hover:text-gray-900 font-medium">
        <ArrowLeft size={20} /> Back
      </button>

      {stage === "list" && <RewardsList userPoints={points} onSelectReward={onSelectReward} />}

      {stage === "redeem" && selectedReward && (
        <RewardRedeem reward={selectedReward} onCancel={() => setTab("home")} userPoints={points} onConfirm={onConfirmRedeem} />
      )}
    </section>
  );
};

export default Rewards;
