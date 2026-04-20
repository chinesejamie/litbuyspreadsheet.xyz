"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { SORT_OPTIONS } from "@/lib/data";
import { CANONICAL_CATEGORIES } from "@/lib/categoryGroups";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import NeedHelp from "@/components/NeedHelp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Product = any;

const ITEMS_PER_PAGE = 30;
const STATIC_TABS: string[] = ["All", ...CANONICAL_CATEGORIES];

interface ProductsClientProps {
  /** Server-side counts for tab labels — rendered inline in SSR so they're
   * visible to Google without a client fetch. */
  counts: Record<string, number>;
}

/**
 * Client-side interactivity for /products: sort dropdown, search input,
 * fetching + pagination, modal open/close, and category tab highlighting.
 *
 * The static tab nav + breadcrumb live in the server page.tsx so they
 * render in the initial HTML without a Suspense fallback.
 */
export default function ProductsClient({ counts }: ProductsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlQuery = searchParams.get("q") ?? "";
  const urlCategory = searchParams.get("category") ?? "All";

  const activeCategoryIdx = useMemo(() => {
    const idx = STATIC_TABS.findIndex(
      (c) => c.toLowerCase() === urlCategory.toLowerCase()
    );
    return idx >= 0 ? idx : 0;
  }, [urlCategory]);

  const activeCategory = STATIC_TABS[activeCategoryIdx] ?? "All";

  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);

  // Local controlled state for the in-page search input — only writes back
  // to the URL on Enter / blur (to avoid a navigation on every keystroke).
  const [inputValue, setInputValue] = useState(urlQuery);
  useEffect(() => {
    setInputValue(urlQuery);
  }, [urlQuery]);

  // Reset pagination + product list whenever the URL filters change.
  useEffect(() => {
    setPage(1);
    setProducts([]);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [urlQuery, urlCategory]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (urlQuery) params.set("search", urlQuery);
    if (sort !== "default") params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", String(ITEMS_PER_PAGE));

    try {
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      if (page === 1) {
        setProducts(data.products || []);
      } else {
        setProducts((prev) => [...prev, ...(data.products || [])]);
      }
      setTotal(data.total || data.totalProducts || 0);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [activeCategory, urlQuery, sort, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const openProduct = useCallback((product: Product) => {
    setRecentlyViewed((prev) =>
      [product._id, ...prev.filter((id) => id !== product._id)].slice(0, 10)
    );
    setSelectedProduct(product);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
    document.body.style.overflow = "";
  }, []);

  const submitSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (inputValue.trim()) params.set("q", inputValue.trim());
    const qs = params.toString();
    router.push(qs ? `/litbuy-spreadsheet?${qs}` : "/litbuy-spreadsheet");
  }, [activeCategory, inputValue, router]);

  return (
    <>
      <div className="max-w-6xl mx-auto px-5 pb-20">
        <div className="flex gap-3 py-4 overflow-x-auto hide-scrollbar">
          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setProducts([]);
              setSort(e.target.value);
            }}
            className="py-3 px-4 pr-10 bg-bg-secondary border border-border rounded-lg text-accent font-mono text-[13px] font-bold uppercase tracking-wide appearance-none cursor-pointer outline-none hover:border-accent focus:border-accent transition-colors min-w-[200px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23ffe34d' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
            }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                Sort by: {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative pb-2">
          <div className="absolute left-3.5 top-[50%] -translate-y-1/2 text-text-muted">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="SEARCH ITEMS..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitSearch();
            }}
            onBlur={submitSearch}
            className="w-full py-3.5 px-4 pl-11 bg-bg-secondary border border-border rounded-lg font-mono text-[13px] uppercase text-white placeholder:text-text-muted outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,227,77,0.18)] transition-all"
          />
        </div>
        <div className="pb-4 pt-1">
          <span className="font-mono text-[11px] uppercase text-text-muted">
            {loading
              ? "Loading..."
              : `${total || counts[activeCategory] || 0} Product${
                  total !== 1 ? "s" : ""
                }${urlQuery ? ` for "${urlQuery}"` : ""}${
                  activeCategory !== "All" ? ` in ${activeCategory}` : ""
                }`}
          </span>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
          {products.map((p: Product) => (
            <motion.div
              key={p._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <ProductCard product={p} onOpen={openProduct} />
            </motion.div>
          ))}
        </motion.div>

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="aspect-square shimmer" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 shimmer rounded" />
                  <div className="h-4 w-1/2 shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16 text-text-muted font-mono text-[13px] uppercase">
            No items found
          </div>
        )}

        {!loading && products.length < total && (
          <div className="text-center py-12">
            <motion.button
              onClick={() => setPage((p) => p + 1)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-12 py-3.5 bg-transparent border border-border rounded-lg font-mono text-[13px] font-bold uppercase tracking-wider text-text-secondary hover:border-accent hover:text-accent transition-colors"
            >
              Load More
            </motion.button>
          </div>
        )}

        <NeedHelp />
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={closeModal}
        onOpen={openProduct}
        recentlyViewed={recentlyViewed}
      />
    </>
  );
}
