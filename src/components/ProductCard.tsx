"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Product = any;

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface ProductCardProps {
  product: Product;
  onOpen?: (product: Product) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      className="bg-bg-card rounded-xl overflow-hidden border border-border relative group"
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image - links to product page */}
      <Link href={`/litbuy-spreadsheet/${nameToSlug(product.name)}`}>
        <div className="aspect-square bg-bg-elevated overflow-hidden cursor-pointer relative">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "0 8px 40px rgba(255,77,77,0.08), 0 0 0 1px rgba(255,77,77,0.15)" }} />

      {/* Info */}
      <div className="p-4">
        <Link href={`/litbuy-spreadsheet/${nameToSlug(product.name)}`}>
          <div className="font-mono text-[13px] font-bold uppercase leading-tight mb-3 hover:text-accent transition-colors">
            {product.name}
          </div>
        </Link>
        <motion.a
          href={product.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="block w-full py-2.5 px-4 bg-accent text-bg-primary font-mono text-sm font-bold uppercase tracking-wide text-center rounded-lg hover:bg-accent-hover transition-colors"
        >
          ${product.price.toFixed(2)}
        </motion.a>
      </div>
    </motion.div>
  );
}
