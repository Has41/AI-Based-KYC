import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, Search, ArrowUpCircle, ArrowDownCircle, MoreHorizontal, Download } from "lucide-react";

type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: "credit" | "debit";
  date: string; // ISO date
  description?: string;
  category?: string;
};

const sampleTransactions: Transaction[] = [
  { id: "t1", title: "Payment at StyleMart", amount: 500, type: "debit", date: "2025-12-24", category: "shopping" },
  { id: "t2", title: "Top-up Wallet", amount: 2000, type: "credit", date: "2025-12-23", category: "topup" },
  { id: "t3", title: "Payment at Cafe Express", amount: 1200, type: "debit", date: "2025-12-22", category: "food" },
  { id: "t4", title: "Payment at Bookstore", amount: 350, type: "debit", date: "2025-12-20", category: "books" },
  { id: "t5", title: "Top-up Wallet", amount: 1500, type: "credit", date: "2025-12-18", category: "topup" }
];

type AllTransactionsPageProps = {
  setShowAllTransactions: (val: boolean) => void;
};

const formatDateGroup = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((startOfDay(now).getTime() - startOfDay(d).getTime()) / (24 * 3600 * 1000));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "This Week";
  return "Earlier";
};

const startOfDay = (dt: Date) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());

const groupTransactions = (txs: Transaction[]) => {
  return txs.reduce<Record<string, Transaction[]>>((acc, tx) => {
    const bucket = formatDateGroup(tx.date);
    if (!acc[bucket]) acc[bucket] = [];
    acc[bucket].push(tx);
    return acc;
  }, {});
};

const currency = (n: number) => `₨${n.toLocaleString()}`;

const AllTransactionsPage: React.FC<AllTransactionsPageProps> = ({ setShowAllTransactions }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "amount_desc" | "amount_asc">("newest");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.title = "All Transactions";
  }, []);

  // derived list (search + filter + sort)
  const displayed = useMemo(() => {
    let list = transactions.filter((t) => {
      if (filter !== "all" && t.type !== filter) return false;
      const hay = `${t.title} ${t.category ?? ""} ${t.description ?? ""}`.toLowerCase();
      if (query.trim() && !hay.includes(query.toLowerCase())) return false;
      return true;
    });

    if (sort === "newest") list = list.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (sort === "oldest") list = list.slice().sort((a, b) => +new Date(a.date) - +new Date(b.date));
    if (sort === "amount_desc") list = list.slice().sort((a, b) => b.amount - a.amount);
    if (sort === "amount_asc") list = list.slice().sort((a, b) => a.amount - b.amount);

    return list;
  }, [transactions, query, filter, sort]);

  // grouped for UI
  const grouped = useMemo(() => groupTransactions(displayed), [displayed]);

  // mock load more
  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      // emulate adding more older transactions
      const more: Transaction[] = [
        {
          id: `t_more_${page}`,
          title: "Payment (older)",
          amount: 420 + page * 10,
          type: page % 2 === 0 ? "credit" : "debit",
          date: new Date(Date.now() - (7 + page) * 24 * 3600 * 1000).toISOString().slice(0, 10),
          category: "misc"
        }
      ];
      setTransactions((prev) => [...prev, ...more]);
      setPage((p) => p + 1);
      setLoading(false);
    }, 700);
  };

  // header totals (sample)
  const totalIn = useMemo(() => transactions.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalOut = useMemo(() => transactions.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0), [transactions]);

  return (
    <section className="min-h-screen w-full mx-auto font-poppins">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => setShowAllTransactions(false)}
          aria-label="Back to wallet"
          className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <ChevronLeft className="text-blue-600" />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-gray-900">All Transactions</h1>
          <p className="text-xs text-gray-500">
            {displayed.length} transactions • Balance: <span className="font-semibold">{currency(totalIn - totalOut)}</span>
          </p>
        </div>

        <button
          title="Export CSV"
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
          onClick={() => {
            // simplistic export: CSV of displayed
            const rows = displayed.map((d) => `${d.date},${d.title},${d.type},${d.amount}`).join("\n");
            const blob = new Blob([`date,title,type,amount\n${rows}`], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `transactions.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download size={18} />
        </button>
      </div>

      {/* Controls: Search / Filter / Sort */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions (merchant, category)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
            aria-label="Search transactions"
          />
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex gap-2 flex-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                filter === "all" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("credit")}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                filter === "credit" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              Credit
            </button>
            <button
              onClick={() => setFilter("debit")}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                filter === "debit" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              Debit
            </button>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="text-sm rounded-lg border border-gray-200 bg-white py-2 px-3"
            aria-label="Sort transactions"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="amount_desc">Amount: High → Low</option>
            <option value="amount_asc">Amount: Low → High</option>
          </select>
        </div>
      </div>

      {/* Transaction groups */}
      <div className="mt-4 space-y-4">
        {Object.keys(grouped).length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center text-gray-500 shadow-sm">No transactions found.</div>
        )}

        {Object.entries(grouped).map(([bucket, items]) => (
          <div key={bucket}>
            <h3 className="text-xs text-gray-500 mb-2">{bucket}</h3>
            <div className="space-y-3">
              {items.map((tx) => {
                const isCredit = tx.type === "credit";
                const isExpanded = expanded === tx.id;
                return (
                  <div
                    key={tx.id}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setExpanded((s) => (s === tx.id ? null : tx.id));
                    }}
                    onClick={() => setExpanded((s) => (s === tx.id ? null : tx.id))}
                    className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isCredit ? "bg-green-50" : "bg-red-50"}`}>
                        {isCredit ? <ArrowUpCircle className="text-green-500" /> : <ArrowDownCircle className="text-red-500" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 truncate">{tx.title}</span>
                              <span className="text-xs text-gray-400">{tx.category}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{new Date(tx.date).toLocaleString()}</p>
                          </div>

                          <div className="text-right">
                            <div className={`text-sm font-semibold ${isCredit ? "text-green-600" : "text-red-500"}`}>
                              {isCredit ? currency(tx.amount) : `- ${currency(tx.amount)}`}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{isCredit ? "Credit" : "Debit"}</div>
                          </div>
                        </div>

                        {/* Expanded details */}
                        <div className={`mt-3 overflow-hidden transition-[max-height] duration-300 ${isExpanded ? "max-h-60" : "max-h-0"}`}>
                          <div className="text-xs text-gray-600">{tx.description ?? "No additional details."}</div>

                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // open a detail modal or external link — placeholder
                                alert(`Opening details for ${tx.title}`);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm focus:outline-none"
                            >
                              View Details
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // placeholder for dispute/receipt
                                alert("Download receipt (mock)");
                              }}
                              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm"
                            >
                              Receipt
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // more actions
                                alert("More actions");
                              }}
                              className="p-2 rounded-md hover:bg-gray-100"
                            >
                              <MoreHorizontal size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Load more */}
        <div className="pt-2">
          <button
            onClick={loadMore}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 bg-white border border-gray-200 hover:shadow-sm focus:outline-none"
          >
            <Download size={16} />
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllTransactionsPage;
