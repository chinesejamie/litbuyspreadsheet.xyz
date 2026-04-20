"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./Logo";
import FadeIn from "./motion/FadeIn";

export default function Footer() {
  return (
    <FadeIn>
      <footer
        className="py-12 px-5 text-center bg-bg-primary"
        style={{
          borderTop: "1px solid transparent",
          borderImage:
            "linear-gradient(to right, transparent, #ffe34d, transparent) 1",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <Logo size={36} />
          </div>
          <div className="font-mono text-[11px] uppercase tracking-wide text-text-muted mb-5">
            LitBuy Spreadsheet &mdash; Rep Finds Made Easy
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { href: "/litbuy-spreadsheet", label: "Spreadsheet" },
              { href: "/outfits", label: "Outfits" },
              { href: "/tutorial", label: "Tutorial" },
            ].map((l) => (
              <motion.div
                key={l.href}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={l.href}
                  className="font-mono text-xs font-bold uppercase text-text-secondary hover:text-accent transition-colors"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </div>

          <nav
            aria-label="Sister projects"
            className="mt-8 pt-5 border-t border-white/10 flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-[11px]"
          >
            <span className="font-mono uppercase tracking-wide text-text-muted">Explore more</span>
            <a
              href="https://lit-buy-spreadsheet.com"
              rel="noopener"
              className="font-mono uppercase text-text-secondary hover:text-accent transition-colors"
            >
              LitBuy main spreadsheet
            </a>
            <a
              href="https://kakobuy-spreadsheet.com"
              rel="noopener"
              className="font-mono uppercase text-text-secondary hover:text-accent transition-colors"
            >
              KakoBuy picks
            </a>
            <a
              href="https://oopbuysheet.com"
              rel="noopener"
              className="font-mono uppercase text-text-secondary hover:text-accent transition-colors"
            >
              OOPBuy finds
            </a>
          </nav>
        </div>
      </footer>
    </FadeIn>
  );
}
