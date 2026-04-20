"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { Search, X } from "lucide-react";

interface ProductRef {
  _id: string;
  name: string;
  price: number;
  images: string[];
  brand: string;
  isBrandProduct?: boolean;
  brandLogo?: string;
}

interface OutfitData {
  _id?: string;
  name: string;
  image: string;
  creator: "timmy" | "miki";
  products: ProductRef[] | string[];
  published: boolean;
}

const OUTFIT_SLOTS = [
  "Headwear",
  "Top",
  "Pants",
  "Accessory 2",
  "Accessory 1",
  "Shoes",
];

const EMPTY: OutfitData = {
  name: "",
  image: "",
  creator: "timmy",
  products: [],
  published: true,
};

export default function OutfitForm({ outfit }: { outfit?: OutfitData }) {
  const router = useRouter();
  const [form, setForm] = useState<OutfitData>(outfit || EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // slots[i] = product for that slot, or null
  const [slots, setSlots] = useState<(ProductRef | null)[]>(() => {
    const existing = (outfit?.products as ProductRef[]) || [];
    const arr: (ProductRef | null)[] = Array(OUTFIT_SLOTS.length).fill(null);
    existing.forEach((p, i) => { if (i < OUTFIT_SLOTS.length) arr[i] = p; });
    return arr;
  });

  // Per-slot search state
  const [slotQuery, setSlotQuery] = useState<string[]>(Array(OUTFIT_SLOTS.length).fill(""));
  const [slotResults, setSlotResults] = useState<ProductRef[][]>(Array(OUTFIT_SLOTS.length).fill([]));
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const isEdit = !!outfit?._id;

  // Search for products for a specific slot
  useEffect(() => {
    if (activeSlot === null) return;
    const q = slotQuery[activeSlot];
    if (!q) {
      setSlotResults((prev) => {
        const next = [...prev];
        next[activeSlot] = [];
        return next;
      });
      return;
    }
    const timeout = setTimeout(async () => {
      const res = await fetch(
        `/api/admin/products?limit=8&search=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      const usedIds = slots.filter(Boolean).map((p) => p!._id);
      setSlotResults((prev) => {
        const next = [...prev];
        next[activeSlot!] = (data.products || []).filter(
          (p: ProductRef) => !usedIds.includes(p._id)
        );
        return next;
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [slotQuery, activeSlot, slots]);

  const setSlotProduct = (slotIdx: number, product: ProductRef) => {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIdx] = product;
      return next;
    });
    setSlotQuery((prev) => { const next = [...prev]; next[slotIdx] = ""; return next; });
    setSlotResults((prev) => { const next = [...prev]; next[slotIdx] = []; return next; });
    setActiveSlot(null);
  };

  const clearSlot = (slotIdx: number) => {
    setSlots((prev) => { const next = [...prev]; next[slotIdx] = null; return next; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      image: form.image,
      products: slots.filter(Boolean).map((p) => p!._id),
    };

    const url = isEdit ? `/api/admin/outfits/${outfit!._id}` : "/api/admin/outfits";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/admin/outfits");
      } else {
        setError("Failed to save outfit");
      }
    } catch {
      setError("Connection error");
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="flex flex-col gap-5">
        {/* Name (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Name <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-accent transition-colors"
            placeholder="Optional outfit name..."
          />
        </div>

        {/* Creator */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Creator *</label>
          <select
            value={form.creator}
            onChange={(e) => setForm({ ...form, creator: e.target.value as "timmy" | "miki" })}
            className="w-full px-4 py-2.5 bg-zinc-900 border border-white/10 rounded-lg text-white outline-none focus:border-accent transition-colors"
          >
            <option value="timmy" className="bg-zinc-900 text-white">Timmy</option>
            <option value="miki" className="bg-zinc-900 text-white">Miki</option>
          </select>
        </div>

        {/* Outfit Image */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Outfit Photo</label>
          <ImageUpload
            images={form.image ? [form.image] : []}
            onChange={(imgs) => setForm({ ...form, image: imgs[0] || "" })}
            multiple={false}
          />
        </div>

        {/* Position Slots */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Items <span className="text-gray-500">(by position)</span>
          </label>
          <div className="flex flex-col gap-3">
            {OUTFIT_SLOTS.map((slotLabel, i) => (
              <div key={slotLabel} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold uppercase text-gray-400">
                    {i + 1}. {slotLabel}
                  </span>
                  {slots[i] && (
                    <button type="button" onClick={() => clearSlot(i)} className="text-gray-500 hover:text-red-400 transition-colors">
                      <X size={14} />
                    </button>
                  )}
                </div>

                {slots[i] ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-white/5 overflow-hidden shrink-0">
                      {slots[i]!.images?.[0] && (
                        <img src={slots[i]!.images[0]} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{slots[i]!.name}</div>
                      <div className="text-xs text-gray-500">${slots[i]!.price} · {slots[i]!.brand}</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder={`Search ${slotLabel.toLowerCase()}...`}
                      value={slotQuery[i]}
                      onChange={(e) => {
                        setActiveSlot(i);
                        setSlotQuery((prev) => { const next = [...prev]; next[i] = e.target.value; return next; });
                      }}
                      onFocus={() => setActiveSlot(i)}
                      className="w-full pl-8 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-600 outline-none focus:border-accent transition-colors"
                    />
                    {activeSlot === i && slotResults[i]?.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-lg max-h-48 overflow-y-auto z-10">
                        {slotResults[i].map((p) => (
                          <button
                            key={p._id}
                            type="button"
                            onClick={() => setSlotProduct(i, p)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-colors text-left"
                          >
                            <div className="w-8 h-8 rounded bg-white/5 overflow-hidden shrink-0">
                              {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm truncate">{p.name}</div>
                              <div className="text-xs text-gray-500">${p.price} · {p.brand}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Published */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 rounded accent-accent"
          />
          <span className="text-sm text-gray-300">Published</span>
        </label>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update Outfit" : "Create Outfit"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/outfits")}
            className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
