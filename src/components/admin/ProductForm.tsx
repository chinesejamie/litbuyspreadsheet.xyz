"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { CATEGORIES, BRANDS as STATIC_BRANDS } from "@/lib/data";
import { Link2, Loader2, Check, AlertCircle } from "lucide-react";

interface BrandOption {
  _id: string;
  name: string;
  logo: string;
}

interface ProductData {
  _id?: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  images: string[];
  link: string;
  hidden: boolean;
  featured: boolean;
  isBrandProduct: boolean;
  brandLogo: string;
}

const EMPTY: ProductData = {
  name: "",
  brand: "",
  category: "Shoes",
  subcategory: "",
  price: 0,
  images: [],
  link: "",
  hidden: false,
  featured: false,
  isBrandProduct: false,
  brandLogo: "",
};

export default function ProductForm({
  product,
}: {
  product?: ProductData;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProductData>(product || EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fetchLink, setFetchLink] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchStatus, setFetchStatus] = useState<"idle" | "success" | "error">("idle");
  const [fetchMessage, setFetchMessage] = useState("");

  const isEdit = !!product?._id;

  // Brand search/select
  const [allBrands, setAllBrands] = useState<BrandOption[]>([]);
  const [brandQuery, setBrandQuery] = useState(form.brand || "");
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/brands")
      .then((r) => r.json())
      .then((d) => setAllBrands(d.brands || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    setBrandQuery(form.brand || "");
  }, [form.brand]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setShowBrandDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Merge DB brands with static brands, deduplicate by name
  const staticBrandOptions: BrandOption[] = STATIC_BRANDS
    .filter((name) => !allBrands.some((b) => b.name.toLowerCase() === name.toLowerCase()))
    .map((name) => ({ _id: `static-${name}`, name, logo: "" }));
  const mergedBrands = [...allBrands, ...staticBrandOptions];

  const filteredBrands = mergedBrands.filter((b) =>
    b.name.toLowerCase().includes(brandQuery.toLowerCase())
  );

  const selectBrand = (brand: BrandOption) => {
    setForm((prev) => ({
      ...prev,
      brand: brand.name,
      brandLogo: brand.logo || prev.brandLogo,
      isBrandProduct: prev.isBrandProduct,
    }));
    setBrandQuery(brand.name);
    setShowBrandDropdown(false);
  };

  const handleFetchFromLink = async () => {
    if (!fetchLink.trim()) return;
    setFetching(true);
    setFetchStatus("idle");
    setFetchMessage("");
    try {
      const res = await fetch("/api/admin/fetch-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: fetchLink.trim() }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        const d = json.data;
        setForm((prev) => ({
          ...prev,
          name: d.name || prev.name,
          price: d.price || prev.price,
          images: d.images?.length ? d.images : prev.images,
          link: fetchLink.trim(),
        }));
        setFetchStatus("success");
        setFetchMessage(`Fetched from ${d.store} (ID: ${d.productId})`);
      } else {
        setFetchStatus("error");
        setFetchMessage(json.error || "Failed to fetch");
      }
    } catch {
      setFetchStatus("error");
      setFetchMessage("Connection error");
    }
    setFetching(false);
  };

  const currentCat = CATEGORIES.find((c) => c.name === form.category);
  const subcategories = currentCat?.subcategories.filter((s) => s !== "All") || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      setError("Name and price are required");
      return;
    }
    setSaving(true);
    setError("");

    const url = isEdit
      ? `/api/admin/products/${product!._id}`
      : "/api/admin/products";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/products");
      } else {
        setError("Failed to save product");
      }
    } catch {
      setError("Connection error");
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="flex flex-col gap-5">
        {/* Quick Add from Link */}
        {!isEdit && (
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Link2 size={16} className="text-accent" />
              <span className="text-sm font-semibold">Quick Add from Link</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Paste a Weidian, 1688, or Youshop10 link to auto-fill product details
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={fetchLink}
                onChange={(e) => setFetchLink(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleFetchFromLink())}
                placeholder="https://weidian.com/item.html?itemID=..."
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 outline-none focus:border-accent transition-colors"
              />
              <button
                type="button"
                onClick={handleFetchFromLink}
                disabled={fetching || !fetchLink.trim()}
                className="px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
              >
                {fetching ? <Loader2 size={14} className="animate-spin" /> : <Link2 size={14} />}
                {fetching ? "Fetching..." : "Fetch"}
              </button>
            </div>
            {fetchStatus === "success" && (
              <div className="flex items-center gap-2 mt-2 text-green-400 text-xs">
                <Check size={14} /> {fetchMessage}
              </div>
            )}
            {fetchStatus === "error" && (
              <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
                <AlertCircle size={14} /> {fetchMessage}
              </div>
            )}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-accent transition-colors"
            required
          />
        </div>

        {/* Brand - searchable combo */}
        <div ref={brandRef} className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Brand
          </label>
          <input
            type="text"
            value={brandQuery}
            onChange={(e) => {
              setBrandQuery(e.target.value);
              setForm({ ...form, brand: e.target.value });
              setShowBrandDropdown(true);
            }}
            onFocus={() => setShowBrandDropdown(true)}
            placeholder="Type to search or add new brand..."
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 outline-none focus:border-accent transition-colors"
          />
          {showBrandDropdown && filteredBrands.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 max-h-[200px] overflow-y-auto">
              {filteredBrands.map((b) => (
                <button
                  key={b._id}
                  type="button"
                  onClick={() => selectBrand(b)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded bg-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                    {b.logo ? (
                      <img src={b.logo} alt={b.name} className="w-full h-full object-contain p-0.5" />
                    ) : (
                      <span className="text-xs font-bold text-gray-400">{b.name.charAt(0)}</span>
                    )}
                  </div>
                  <span className="text-sm text-white">{b.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category + Subcategory */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Category *
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value, subcategory: "" })
              }
              className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-white outline-none focus:border-accent transition-colors"
            >
              {CATEGORIES.filter((c) => c.name !== "All").map((c) => (
                <option key={c.name} value={c.name} className="bg-zinc-900 text-white">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Subcategory
            </label>
            <select
              value={form.subcategory}
              onChange={(e) =>
                setForm({ ...form, subcategory: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-white outline-none focus:border-accent transition-colors"
            >
              <option value="" className="bg-zinc-900 text-white">None</option>
              {subcategories.map((s) => (
                <option key={s} value={s} className="bg-zinc-900 text-white">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Price (USD) *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.price || ""}
            onChange={(e) =>
              setForm({ ...form, price: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-accent transition-colors"
            required
          />
        </div>

        {/* Product Link */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            OOPBuy Link
          </label>
          <input
            type="text"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="https://www.oopbuy.com/..."
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Images
          </label>
          <ImageUpload
            images={form.images}
            onChange={(images) => setForm({ ...form, images })}
          />
        </div>

        {/* Brand Product Toggle */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={form.isBrandProduct}
              onChange={(e) => setForm({ ...form, isBrandProduct: e.target.checked })}
              className="w-4 h-4 rounded accent-accent"
            />
            <span className="text-sm font-semibold text-gray-300">Brand Product</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Brand products show the brand logo instead of a product image in outfits, with a white button style.
          </p>
          {form.isBrandProduct && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Brand Logo URL
              </label>
              <input
                type="text"
                value={form.brandLogo}
                onChange={(e) => setForm({ ...form, brandLogo: e.target.value })}
                placeholder="https://... or upload via Images above"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 outline-none focus:border-accent transition-colors"
              />
            </div>
          )}
        </div>

        {/* Hidden */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.hidden}
            onChange={(e) => setForm({ ...form, hidden: e.target.checked })}
            className="w-4 h-4 rounded accent-accent"
          />
          <span className="text-sm text-gray-300">Hidden (not shown on site)</span>
        </label>

        {/* Featured */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="w-4 h-4 rounded accent-accent"
          />
          <span className="text-sm text-gray-300">Featured (shown in Top Products on Homepage)</span>
        </label>

        {error && (
          <div className="text-red-400 text-sm">{error}</div>
        )}

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
