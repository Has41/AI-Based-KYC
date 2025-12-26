import React, { useEffect, useState, useMemo } from "react";
import { ChevronLeft, Search, Calendar, ExternalLink, ArrowRight, Star, Share2, ChevronDown, Filter } from "lucide-react";

type Offer = {
  id: string;
  title: string;
  url: string;
  merchant: string;
  discount: string;
  description?: string;
  expiry?: string; // ISO date or human string
  category?: "cashback" | "discount" | "bogo" | "other";
};

const sampleOffersSeed: Offer[] = [
  {
    id: "o1",
    title: "50% off at XYZ Store",
    url: "https://example.com/xyz",
    merchant: "XYZ Store",
    discount: "50% OFF",
    description: "Selected garments & accessories.",
    expiry: "2025-12-31"
  },
  {
    id: "o2",
    title: "Buy 1 Get 1 Free at ABC Mart",
    url: "https://example.com/abc",
    merchant: "ABC Mart",
    discount: "B1G1",
    description: "On all bakery & beverages.",
    expiry: "2026-01-10"
  },
  {
    id: "o3",
    title: "30% cashback at SuperShop",
    url: "https://example.com/supershop",
    merchant: "SuperShop",
    discount: "30% CASHBACK",
    description: "Up to PKR 1500 cashback on groceries.",
    expiry: "2026-01-05"
  }
];

const STORAGE_KEY_FAVS = "offers:favs_v1";

const categorize = (o: Offer): Offer["category"] => {
  const s = `${o.discount} ${o.title} ${o.description ?? ""}`.toLowerCase();
  if (s.includes("cashback")) return "cashback";
  if (s.includes("b1g1") || s.includes("buy 1 get 1") || s.includes("bogo")) return "bogo";
  if (s.match(/\b(off|%|discount|% off)\b/)) return "discount";
  return "other";
};

type OffersPageProps = {
  setShowAllOffers: (val: boolean) => void;
};

const OffersPage: React.FC<OffersPageProps> = ({ setShowAllOffers }) => {
  // Enhance sample data with categories (this can come from API)
  const [offers] = useState<Offer[]>(sampleOffersSeed.map((s) => ({ ...s, category: categorize(s) })));

  // UI state
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | Offer["category"]>("all");
  const [sort, setSort] = useState<"recommended" | "expiry_asc" | "expiry_desc">("recommended");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null); // offer id
  const [favs, setFavs] = useState<Record<string, boolean>>({});
  const [showFiltersMenu, setShowFiltersMenu] = useState(false);

  // populate favs from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_FAVS);
      if (raw) setFavs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(favs));
    } catch {
      /* ignore */
    }
  }, [favs]);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 260);
    return () => clearTimeout(t);
  }, [query]);

  // simulate loading when query/filter/sort changes
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300); // simulate network latency
    return () => clearTimeout(t);
  }, [debouncedQuery, activeFilter, sort]);

  // derived data: counts for chips
  const counts = useMemo(() => {
    const all = offers.length;
    const byCat = offers.reduce<Record<string, number>>((acc, o) => {
      acc[o.category ?? "other"] = (acc[o.category ?? "other"] || 0) + 1;
      return acc;
    }, {});
    return { all, byCat };
  }, [offers]);

  // filtered & sorted offers
  const displayed = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    let list = offers.filter((o) => {
      const hay = `${o.title} ${o.merchant} ${o.description ?? ""} ${o.discount}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (activeFilter !== "all" && o.category !== activeFilter) return false;
      return true;
    });

    if (sort === "expiry_asc") {
      list = list.slice().sort((a, b) => (a.expiry || "").localeCompare(b.expiry || ""));
    } else if (sort === "expiry_desc") {
      list = list.slice().sort((a, b) => (b.expiry || "").localeCompare(a.expiry || ""));
    }
    return list;
  }, [offers, debouncedQuery, activeFilter, sort]);

  // actions
  const openOffer = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const toggleFav = (id: string) => {
    setFavs((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      return next;
    });
  };

  const handleShare = async (o: Offer) => {
    const payload = { title: o.title, text: o.description, url: o.url };
    if (navigator.share) {
      try {
        await navigator.share(payload);
      } catch {
        /* user canceled */
      }
      return;
    }
    // fallback: copy link
    try {
      await navigator.clipboard.writeText(o.url);
      // small toast could be shown; for now, use alert fallback
      // alert("Link copied to clipboard");
    } catch {
      /* ignore */
    }
  };

  // keyboard accessible card action
  const activateCard = (o: Offer) => {
    // default action: open details (expand) if not expanded, otherwise open link
    if (expanded === o.id) openOffer(o.url);
    else setExpanded(o.id);
  };

  return (
    <section className="w-full max-w-md mx-auto min-h-screen py-6 font-poppins">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => setShowAllOffers(false)}
          aria-label="Back to wallet"
          className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <ChevronLeft className="text-blue-600" />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold text-gray-900 truncate">All Offers & Promotions</h1>
          <p className="text-xs text-gray-500 truncate">Handpicked deals for you</p>
        </div>

        {/* small filter toggle */}
        <button
          onClick={() => setShowFiltersMenu((s) => !s)}
          aria-expanded={showFiltersMenu}
          aria-label="Toggle filters"
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <Filter size={18} />
        </button>
      </div>

      {/* Search + sort row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search offers, merchants, discounts..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
            aria-label="Search offers"
          />
        </div>

        <div className="inline-flex gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="text-sm rounded-lg border border-gray-200 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Sort offers"
          >
            <option value="recommended">Recommended</option>
            <option value="expiry_asc">Expiry: Soonest</option>
            <option value="expiry_desc">Expiry: Latest</option>
          </select>
        </div>
      </div>

      {/* Filter chips (collapsible when filter menu closed) */}
      <div className="mt-3">
        <div className={`flex gap-2 overflow-auto pb-1 ${showFiltersMenu ? "max-h-44" : "max-h-10"} transition-all`}>
          <button
            onClick={() => setActiveFilter("all")}
            aria-pressed={activeFilter === "all"}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm border ${
              activeFilter === "all" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            All ({counts.all})
          </button>

          <button
            onClick={() => setActiveFilter("discount")}
            aria-pressed={activeFilter === "discount"}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm border ${
              activeFilter === "discount" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            Discounts ({counts.byCat.discount ?? 0})
          </button>

          <button
            onClick={() => setActiveFilter("cashback")}
            aria-pressed={activeFilter === "cashback"}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm border ${
              activeFilter === "cashback" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            Cashback ({counts.byCat.cashback ?? 0})
          </button>

          <button
            onClick={() => setActiveFilter("bogo")}
            aria-pressed={activeFilter === "bogo"}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm border ${
              activeFilter === "bogo" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            BOGO ({counts.byCat.bogo ?? 0})
          </button>

          <button
            onClick={() => setActiveFilter("other")}
            aria-pressed={activeFilter === "other"}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm border ${
              activeFilter === "other" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            Other ({counts.byCat.other ?? 0})
          </button>
        </div>
      </div>

      {/* Result header */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <div>{loading ? "Searching..." : `${displayed.length} offers`}</div>
        <div>{debouncedQuery ? `Search: "${debouncedQuery}"` : ""}</div>
      </div>

      {/* Offer list / skeletons */}
      <div className="mt-3 space-y-4">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl p-4 shadow-sm">
              <div className="h-12 bg-gray-100 rounded-lg mb-3" />
              <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}

        {!loading &&
          displayed.map((offer) => {
            const isFav = !!favs[offer.id];
            const isExpanded = expanded === offer.id;
            const expiryLabel = offer.expiry ? new Date(offer.expiry).toLocaleDateString() : undefined;

            return (
              <article
                key={offer.id}
                tabIndex={0}
                role="button"
                aria-pressed="false"
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activateCard(offer);
                  }
                }}
                onClick={() => activateCard(offer)}
                className="relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <div className="flex gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    {/* placeholder for merchant logo */}
                    <span className="text-sm font-semibold text-gray-600">{offer.merchant.slice(0, 2).toUpperCase()}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs uppercase text-gray-500 font-medium truncate">{offer.merchant}</p>
                        <h3 className="text-base font-semibold text-gray-900 truncate">{offer.title}</h3>
                        <p className="text-sm text-gray-600 truncate mt-1">{offer.description}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-yellow-400 text-gray-900 text-xs font-semibold whitespace-nowrap">
                          {offer.discount}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFav(offer.id);
                            }}
                            aria-pressed={isFav}
                            aria-label={isFav ? "Remove favorite" : "Save offer"}
                            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                            title={isFav ? "Saved" : "Save"}
                          >
                            <Star size={16} className={isFav ? "text-yellow-500" : "text-gray-400"} />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(offer);
                            }}
                            aria-label="Share offer"
                            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                            title="Share"
                          >
                            <Share2 size={16} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* meta row */}
                    <div className="flex flex-col items-center justify-between mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openOffer(offer.url);
                          }}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none"
                        >
                          View Offer <ArrowRight size={14} />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(offer.url, "_blank", "noopener,noreferrer");
                          }}
                          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                          aria-label="Open in new tab"
                        >
                          <ExternalLink size={14} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable details (animated height via max-h) */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 mt-3 ${isExpanded ? "max-h-64" : "max-h-0"}`}
                  aria-hidden={!isExpanded}
                >
                  <div className="pt-3 border-t border-gray-100 text-sm text-gray-600">
                    <p className="mb-2">How to redeem: Present this offer at checkout or use the code at payment.</p>
                    <p className="mb-2">T&C: Minimum purchase may apply. Cannot be combined with other promos.</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={14} /> {expiryLabel ?? "N/A"}
                      </span>
                      <span className="inline-flex items-center gap-1">• Redeem in-store or online</span>
                    </div>
                  </div>
                </div>

                {/* expand affordance */}
                <div className="absolute right-3 bottom-3">
                  <ChevronDown size={18} className={`transform transition-transform ${isExpanded ? "rotate-180" : "rotate-0"} text-gray-400`} />
                </div>
              </article>
            );
          })}
      </div>

      {/* No results */}
      {!loading && displayed.length === 0 && (
        <div className="mt-6 bg-white rounded-2xl p-6 text-center text-gray-500 shadow-sm">
          <p className="mb-2">No offers match your search.</p>
          <p className="text-xs">Try removing filters or search terms.</p>
        </div>
      )}
    </section>
  );
};

export default OffersPage;
