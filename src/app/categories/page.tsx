"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/data";
import Footer from "@/components/Footer";
import FadeIn from "@/components/motion/FadeIn";

const CATEGORY_IMAGES: Record<string, string> = {
  Shoes: "/categories/shoes.png",
  Tshirts: "/categories/tshirts.png",
  Hoodies: "/categories/hoodies.png",
  Jackets: "/categories/jackets.png",
  Pants: "/categories/pants.png",
  Tracksuits: "/categories/tracksuits.png",
  Accessories: "/categories/accessories.png",
  Electronics: "/categories/electronics.png",
  Sports: "/categories/sports.png",
  Others: "/categories/others.png",
};

interface CategoryWithCount {
  name: string;
  count: number | null;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryWithCount[]>(
    CATEGORIES.filter((c) => c.name !== "All").map((c) => ({ name: c.name, count: null }))
  );

  const fetchCounts = useCallback(async () => {
    const nonAll = CATEGORIES.filter((c) => c.name !== "All");
    const results = await Promise.all(
      nonAll.map(async (cat) => {
        try {
          const res = await fetch(`/api/products?category=${encodeURIComponent(cat.name)}&limit=1`);
          const data = await res.json();
          return { name: cat.name, count: data.total ?? 0 };
        } catch {
          return { name: cat.name, count: 0 };
        }
      })
    );
    setCategories(results);
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-5 pb-20">
        <FadeIn>
          <div className="text-center py-12">
            <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase">
              All <span className="text-accent">Categories</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-bg-card border border-border rounded-xl p-6 text-left hover:border-accent/40 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-full h-[140px] bg-bg-elevated rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                {CATEGORY_IMAGES[cat.name] ? (
                  <img
                    src={CATEGORY_IMAGES[cat.name]}
                    alt={cat.name}
                    className="w-full h-full object-contain"
                    
                  />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-text-muted">
                    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                )}
              </div>
              <div className="relative z-10">
                <h3 className="font-mono text-base font-black uppercase mb-1">{cat.name}</h3>
                <p className="font-mono text-xs text-text-muted">
                  {cat.count === null ? (
                    <span className="inline-block w-8 h-3 shimmer rounded" />
                  ) : (
                    `${cat.count} product${cat.count !== 1 ? "s" : ""}`
                  )}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
