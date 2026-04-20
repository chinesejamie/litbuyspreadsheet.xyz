"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Search, Trash2, Edit2, Eye, EyeOff } from "lucide-react";

interface AdminProduct {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  images: string[];
  hidden: boolean;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `/api/admin/products?page=${page}&limit=20&search=${encodeURIComponent(search)}`
    );
    const data = await res.json();
    setProducts(data.products || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const toggleHidden = async (id: string, hidden: boolean) => {
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hidden: !hidden }),
    });
    fetchProducts();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500 text-sm">{total} total</p>
        </div>
        <button
          onClick={() => router.push("/admin/products/new")}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 outline-none focus:border-accent transition-colors text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-left">
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p._id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden">
                        {p.images[0] ? (
                          <img
                            src={p.images[0]}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                            No img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium max-w-[200px] truncate">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{p.category}</td>
                    <td className="px-4 py-3">${p.price}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          p.hidden
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {p.hidden ? "Hidden" : "Visible"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleHidden(p._id, p.hidden)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                          title={p.hidden ? "Show" : "Hide"}
                        >
                          {p.hidden ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/admin/products/${p._id}`)
                          }
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteProduct(p._id)}
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

      {/* Pagination */}
      {total > 20 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm disabled:opacity-30 hover:bg-white/10 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-400">
            Page {page} of {Math.ceil(total / 20)}
          </span>
          <button
            disabled={page >= Math.ceil(total / 20)}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm disabled:opacity-30 hover:bg-white/10 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
