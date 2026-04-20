"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Shirt,
  Store,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/outfits", label: "Outfits", icon: Shirt },
  { href: "/admin/brands", label: "Brands", icon: Store },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/products?limit=1")
      .then((r) => {
        if (!r.ok) throw new Error();
        setLoading(false);
      })
      .catch(() => router.push("/admin/login"));
  }, [router]);

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-text-secondary font-mono text-sm uppercase">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#0d0d0d] border-r border-white/10 flex flex-col transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <img src="/branding/26broz-logo.webp" alt="26Bros" className="w-8 h-8 rounded object-cover" />
            <span className="font-mono text-lg font-bold text-accent">
              ADMIN
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {NAV.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-accent/20 text-accent"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile header + overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a]">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} className="text-gray-400" />
          </button>
          <span className="font-mono text-sm font-bold text-accent">
            ADMIN
          </span>
          <div className="w-6" />
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
