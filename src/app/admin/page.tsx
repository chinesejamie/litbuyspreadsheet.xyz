"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Package, Shirt, Store } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, outfits: 0, brands: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/products?limit=1").then((r) => r.json()),
      fetch("/api/admin/outfits?limit=1").then((r) => r.json()),
      fetch("/api/admin/brands?limit=1").then((r) => r.json()),
    ]).then(([p, o, b]) => {
      setStats({
        products: p.total || 0,
        outfits: o.total || 0,
        brands: b.total || 0,
      });
    });
  }, []);

  const cards = [
    { label: "Products", value: stats.products, icon: Package, color: "bg-blue-500/20 text-blue-400" },
    { label: "Outfits", value: stats.outfits, icon: Shirt, color: "bg-purple-500/20 text-purple-400" },
    { label: "Brands", value: stats.brands, icon: Store, color: "bg-green-500/20 text-green-400" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">
          26Bros — Overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}
              >
                <Icon size={22} />
              </div>
              <div>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="text-gray-500 text-sm">{card.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
