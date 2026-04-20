"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import type { ProductLite } from "@/lib/productFetcher";

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface Props {
  product: ProductLite;
  slug: string;
}

export default function ProductDetailClient({ product, slug }: Props) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [related, setRelated] = useState<ProductLite[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<ProductLite[]>([]);

  // Save to recently viewed in localStorage
  useEffect(() => {
    const viewed: string[] = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const id = product._id;
    const updated = [id, ...viewed.filter((v) => v !== id)].slice(0, 20);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  }, [product._id]);

  // Load related products
  useEffect(() => {
    if (!product.category) return;
    fetch(`/api/products?category=${product.category}&limit=12`)
      .then((r) => r.json())
      .then((data) => {
        setRelated(
          (data.products || [])
            .filter((p: ProductLite) => p._id !== product._id)
            .slice(0, 10)
        );
      })
      .catch(() => {});
  }, [product.category, product._id]);

  // Load recently viewed
  useEffect(() => {
    const viewed: string[] = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const idsToFetch = viewed.filter((id) => id !== product._id).slice(0, 10);
    if (idsToFetch.length === 0) return;

    Promise.all(
      idsToFetch.map((id) =>
        fetch(`/api/products/${id}`)
          .then((r) => r.json())
          .then((d) => d.product)
          .catch(() => null)
      )
    ).then((products) => {
      setRecentlyViewed(products.filter(Boolean).slice(0, 8));
    });
  }, [product._id]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <FadeIn>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-text-muted mb-6">
          <Link href="/" className="text-text-secondary hover:text-accent transition-colors">Home</Link>
          <span className="text-accent font-bold">&#9654;</span>
          <Link href="/litbuy-spreadsheet" className="text-text-secondary hover:text-accent transition-colors">LitBuy Spreadsheet</Link>
          <span className="text-accent font-bold">&#9654;</span>
          <span className="text-accent font-bold truncate max-w-[200px]">{product.name}</span>
        </nav>
      </FadeIn>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Images */}
        <FadeIn>
          <div className="flex flex-col gap-3">
            <div className="aspect-square bg-bg-card rounded-xl overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={product.images?.[currentImage] || product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-200 ${
                      i === currentImage ? "border-accent scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Info */}
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-4">
            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              {product.category}
            </div>
            <h1 className="text-[clamp(22px,4vw,32px)] font-bold uppercase tracking-tight">
              {product.name}
            </h1>

            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1.5 bg-bg-elevated rounded-lg font-mono text-[11px] font-bold uppercase text-text-secondary">
                {product.category}
              </span>
            </div>

            {/* Product description — shown when available from the DB */}
            {product.description && (
              <p className="text-text-secondary text-sm leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Buy button */}
            <motion.a
              href={product.litbuyLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block py-4 px-8 bg-accent text-bg-primary font-mono text-lg font-bold uppercase tracking-wider text-center rounded-lg hover:bg-accent-hover transition-colors shadow-[0_0_30px_rgba(255,227,77,0.25)]"
            >
              ${product.price?.toFixed(2)} — Buy on LitBuy
            </motion.a>

            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1 text-text-secondary hover:text-accent font-mono text-xs uppercase tracking-wide transition-colors mt-2"
            >
              <ChevronLeft size={14} /> Back
            </button>
          </div>
        </FadeIn>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mb-16">
          <FadeIn>
            <h2 className="font-mono text-xl font-bold uppercase mb-6">
              <span className="text-accent">Related</span> Products
            </h2>
          </FadeIn>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            {related.map((r, i) => (
              <FadeIn key={r._id} delay={i * 0.03}>
                <Link href={`/litbuy-spreadsheet/${nameToSlug(r.name)}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex-shrink-0 w-[180px] sm:w-[200px] bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors group"
                  >
                    <div className="aspect-square bg-bg-secondary overflow-hidden">
                      <img
                        src={r.images?.[0]}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-mono text-xs font-bold uppercase truncate mb-1">{r.name}</h3>
                      <span className="text-text-secondary text-[11px] font-mono uppercase">{r.category}</span>
                      <div className="mt-2">
                        <span className="inline-block bg-accent text-bg-primary text-[11px] font-mono font-bold px-3 py-1.5 rounded">
                          ${r.price?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mb-16">
          <FadeIn>
            <h2 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-6">
              <span className="text-accent">Recently</span> Viewed
            </h2>
          </FadeIn>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            {recentlyViewed.map((r, i) => (
              <FadeIn key={r._id} delay={i * 0.03}>
                <Link href={`/litbuy-spreadsheet/${nameToSlug(r.name)}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex-shrink-0 w-[180px] sm:w-[200px] bg-bg-card border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-colors group"
                  >
                    <div className="aspect-square bg-bg-secondary overflow-hidden">
                      <img
                        src={r.images?.[0]}
                        alt={r.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-mono text-xs font-bold uppercase truncate mb-1">{r.name}</h3>
                      <span className="text-text-secondary text-[11px] font-mono uppercase">{r.category}</span>
                      <div className="mt-2">
                        <span className="inline-block bg-accent text-bg-primary text-[11px] font-mono font-bold px-3 py-1.5 rounded">
                          ${r.price?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
