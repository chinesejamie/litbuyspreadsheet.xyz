"use client";

import { X } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Product = any;

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpen: (product: Product) => void;
  recentlyViewed: (string | number)[];
}

export default function ProductModal({
  product,
  onClose,
  onOpen,
  recentlyViewed,
}: ProductModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [related, setRelated] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  const soldCount = useMemo(() => Math.floor(Math.random() * 171) + 30, [product]);
  const hoursAgo = useMemo(() => Math.floor(Math.random() * 12) + 1, [product]);

  useEffect(() => {
    setCurrentImage(0);
    if (product?.category) {
      fetch(`/api/products?category=${product.category}&limit=7`)
        .then((r) => r.json())
        .then((data) => {
          setRelated(
            (data.products || []).filter(
              (p: Product) => (p._id || p.id) !== (product._id || product.id)
            ).slice(0, 6)
          );
        })
        .catch(() => {});
    }
  }, [product]);

  useEffect(() => {
    if (recentlyViewed.length > 0 && product) {
      const idsToFetch = recentlyViewed.filter(
        (id) => String(id) !== String(product._id || product.id)
      );
      if (idsToFetch.length > 0) {
        const idsParam = idsToFetch.join(",");
        fetch(`/api/products?ids=${idsParam}`)
          .then((r) => r.json())
          .then((data) => {
            setRecentProducts(
              (data.products || []).filter(
                (p: Product) => String(p._id || p.id) !== String(product._id || product.id)
              ).slice(0, 6)
            );
          })
          .catch(() => setRecentProducts([]));
      } else {
        setRecentProducts([]);
      }
    } else {
      setRecentProducts([]);
    }
  }, [recentlyViewed, product]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2000] flex items-center justify-center p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="bg-bg-secondary border border-border rounded-xl w-full max-w-[900px] max-h-[90vh] overflow-y-auto relative"
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-bg-elevated rounded-lg hover:bg-accent transition-colors z-10"
            >
              <X size={18} />
            </motion.button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 flex flex-col gap-3">
                <div className="aspect-square bg-bg-card rounded-lg overflow-hidden">
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
                  <div className="flex gap-2">
                    {product.images.map((img: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImage(i)}
                        className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          i === currentImage ? "border-accent scale-105" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col gap-3">
                <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                  {product.brand}
                </div>
                <div className="text-[22px] font-bold uppercase tracking-tight">
                  {product.name}
                </div>
                <div className="text-[12px] text-orange-400 font-semibold">
                  🔥 {soldCount} sold in last {hoursAgo} {hoursAgo === 1 ? "hour" : "hours"}
                </div>
                <div className="font-mono text-[22px] font-bold">
                  ${product.price?.toFixed(2)}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1.5 bg-bg-elevated rounded-lg font-mono text-[11px] font-bold uppercase text-text-secondary">
                    {product.category}
                  </span>
                  {product.subcategory && (
                    <span className="px-3 py-1.5 bg-bg-elevated rounded-lg font-mono text-[11px] font-bold uppercase text-text-secondary">
                      {product.subcategory}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2.5 mt-3">
                  <motion.a
                    href={product.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block py-3.5 px-8 bg-accent text-bg-primary font-mono text-sm font-bold uppercase tracking-wider text-center rounded-lg hover:bg-accent-hover transition-colors"
                  >
                    Buy on LitBuy
                  </motion.a>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <div className="px-6 py-5 border-t border-border">
                <h2 className="uppercase mb-3.5" style={{ fontSize: "clamp(28px,6vw,42px)", fontWeight: 900, fontFamily: "var(--font-sans)" }}>
                  <span className="text-accent">Related</span> Products
                </h2>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                  {related.map((r: Product, i: number) => (
                    <motion.div
                      key={r._id || r.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="shrink-0 w-[120px] cursor-pointer"
                      onClick={() => onOpen(r)}
                    >
                      <motion.div
                        whileHover={{ y: -3 }}
                        className="w-[120px] h-[120px] bg-bg-card rounded-lg overflow-hidden mb-1.5"
                      >
                        <img src={r.images?.[0]} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
                      </motion.div>
                      <div className="font-mono text-[10px] font-bold uppercase truncate">{r.name}</div>
                      <div className="font-mono text-[11px] font-bold text-text-secondary">${r.price?.toFixed(2)}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {recentProducts.length > 0 && (
              <div className="px-6 py-5 border-t border-border">
                <h2 className="uppercase mb-3.5" style={{ fontSize: "clamp(28px,6vw,42px)", fontWeight: 900, fontFamily: "var(--font-sans)" }}>
                  <span className="text-accent">Recently</span> Viewed
                </h2>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                  {recentProducts.map((r: Product, i: number) => (
                    <motion.div
                      key={r._id || r.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="shrink-0 w-[120px] cursor-pointer"
                      onClick={() => onOpen(r)}
                    >
                      <motion.div
                        whileHover={{ y: -3 }}
                        className="w-[120px] h-[120px] bg-bg-card rounded-lg overflow-hidden mb-1.5"
                      >
                        <img src={r.images?.[0]} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
                      </motion.div>
                      <div className="font-mono text-[10px] font-bold uppercase truncate">{r.name}</div>
                      <div className="font-mono text-[11px] font-bold text-text-secondary">${r.price?.toFixed(2)}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
