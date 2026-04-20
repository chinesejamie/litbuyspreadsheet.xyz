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
        </div>
      </footer>
    </FadeIn>
  );
}
