import { useWallet } from "../../hooks/useWallet";

const WalletTransactions = () => {
  const { transactions } = useWallet();

  return (
    <section className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      {transactions.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-lg font-medium">No transactions yet</p>
          <p className="text-sm">Earn or redeem points to see them here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{tx.type === "earn" ? "Points Earned" : "Points Redeemed"}</p>
                <p className="text-sm text-gray-600">{tx.meta}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(tx.timestamp).toLocaleString()}</p>
              </div>

              <div className={`text-right font-bold ${tx.type === "earn" ? "text-green-600" : "text-red-600"}`}>
                {tx.type === "earn" ? "+" : "-"} {tx.amountPoints}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WalletTransactions;
