"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Trash2, Edit2 } from "lucide-react";

interface AdminOutfit {
  _id: string;
  name: string;
  image: string;
  creator: string;
  products: { _id: string; name: string }[];
  published: boolean;
}

export default function AdminOutfitsPage() {
  const router = useRouter();
  const [outfits, setOutfits] = useState<AdminOutfit[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchOutfits = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/outfits?limit=50");
    const data = await res.json();
    setOutfits(data.outfits || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOutfits();
  }, [fetchOutfits]);

  const deleteOutfit = async (id: string) => {
    if (!confirm("Delete this outfit?")) return;
    await fetch(`/api/admin/outfits/${id}`, { method: "DELETE" });
    fetchOutfits();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Outfits</h1>
          <p className="text-gray-500 text-sm">{total} total</p>
        </div>
        <button
          onClick={() => router.push("/admin/outfits/new")}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
        >
          <Plus size={16} />
          Add Outfit
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-left">
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Creator</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">Loading...</td>
                </tr>
              ) : outfits.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">No outfits found</td>
                </tr>
              ) : (
                outfits.map((o) => (
                  <tr key={o._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-12 h-16 rounded-lg bg-white/5 overflow-hidden">
                        {o.image ? (
                          <img src={o.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No img</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{o.name}</td>
                    <td className="px-4 py-3 text-gray-400 capitalize">{o.creator}</td>
                    <td className="px-4 py-3 text-gray-400">{o.products?.length || 0} items</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${o.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                        {o.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/admin/outfits/${o._id}`)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteOutfit(o._id)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
