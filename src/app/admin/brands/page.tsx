"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Trash2, Edit2, Filter } from "lucide-react";

interface AdminBrand {
  _id: string;
  name: string;
  logo: string;
  instagram: string;
  inFilter: boolean;
}

export default function AdminBrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<AdminBrand[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/brands?limit=50");
    const data = await res.json();
    setBrands(data.brands || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const deleteBrand = async (id: string) => {
    if (!confirm("Delete this brand?")) return;
    await fetch(`/api/admin/brands/${id}`, { method: "DELETE" });
    fetchBrands();
  };

  const toggleFilter = async (brand: AdminBrand) => {
    await fetch(`/api/admin/brands/${brand._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inFilter: !brand.inFilter }),
    });
    fetchBrands();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Brands</h1>
          <p className="text-gray-500 text-sm">{total} total</p>
        </div>
        <button
          onClick={() => router.push("/admin/brands/new")}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
        >
          <Plus size={16} />
          Add Brand
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center py-8">Loading...</p>
        ) : brands.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-8">No brands yet</p>
        ) : (
          brands.map((b) => (
            <div
              key={b._id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-white/5 overflow-hidden flex items-center justify-center shrink-0">
                {b.logo ? (
                  <img src={b.logo} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-gray-500">
                    {b.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{b.name}</div>
                <div className="text-xs text-gray-500 truncate">{b.instagram}</div>
              </div>
              <div className="flex gap-1 items-center">
                <button
                  onClick={() => toggleFilter(b)}
                  title={b.inFilter ? "Im Filter aktiv – klicken zum Entfernen" : "Zum Filter hinzufügen"}
                  className={`p-2 rounded-lg transition-colors ${b.inFilter ? "text-accent bg-accent/10 hover:bg-accent/20" : "text-gray-500 hover:bg-white/10 hover:text-gray-300"}`}
                >
                  <Filter size={16} />
                </button>
                <button
                  onClick={() => router.push(`/admin/brands/${b._id}`)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => deleteBrand(b._id)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
