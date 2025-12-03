import { useState } from "react";
import { useNavigate } from "react-router";

const WalletDashboard = () => {
  const navigate = useNavigate();
  const [points] = useState(2450);

  const recentActivity = [
    { id: 1, amount: +250, desc: "Coffee Shop Purchase", date: "2025-12-02" },
    { id: 2, amount: +120, desc: "Grocery Store Purchase", date: "2025-12-01" },
    { id: 3, amount: -300, desc: "Redeemed: Discount Voucher", date: "2025-11-30" }
  ];

  const offers = ["Get 10% off using 300 points at XYZ Mart!", "Double points this weekend!", "Redeem 500 points for free delivery"];

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Welcome, Has 👋</h1>
      <p className="text-gray-600 mb-6">
        Tier: <span className="font-semibold">Silver Member</span>
      </p>

      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h2 className="text-lg font-semibold mb-2">Your Points</h2>

        <p className="text-4xl font-bold mb-1">{points}</p>
        <p className="text-gray-500">≈ PKR {points}</p>

        <div className="mt-4 flex space-x-4">
          <button className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm">View History</button>
          <button className="px-3 py-2 bg-gray-200 rounded-lg text-sm">How it works?</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={() => navigate("/scan-qr")} className="bg-white p-4 rounded-xl shadow text-center">
          <span className="text-lg font-semibold block mb-1">Scan QR</span>
          <span className="text-sm text-gray-500">Earn Points</span>
        </button>

        <button onClick={() => navigate("/redeem")} className="bg-white p-4 rounded-xl shadow text-center">
          <span className="text-lg font-semibold block mb-1">Redeem Points</span>
          <span className="text-sm text-gray-500">Use points</span>
        </button>

        <button onClick={() => navigate("/history")} className="bg-white p-4 rounded-xl shadow text-center">
          <span className="text-lg font-semibold block mb-1">Transactions</span>
          <span className="text-sm text-gray-500">All activity</span>
        </button>

        <button onClick={() => navigate("/profile")} className="bg-white p-4 rounded-xl shadow text-center">
          <span className="text-lg font-semibold block mb-1">My Profile</span>
          <span className="text-sm text-gray-500">Settings</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

        {recentActivity.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b last:border-none">
            <div>
              <p className="font-medium">{item.desc}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>

            <span className={`font-semibold ${item.amount > 0 ? "text-green-600" : "text-red-600"}`}>
              {item.amount > 0 ? `+${item.amount}` : item.amount}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold mb-4">Offers</h2>

        <div className="space-y-3">
          {offers.map((o, i) => (
            <div key={i} className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm">
              {o}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalletDashboard;
