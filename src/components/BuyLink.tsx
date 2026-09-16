"use client";

import type { ReactNode } from "react";
import { trackBuyNowClick, type TrackableProduct } from "@/lib/analytics";

interface BuyLinkProps {
  href: string;
  product: TrackableProduct;
  location: "card" | "modal" | "product_page" | "category_page";
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/**
 * Outbound "Buy on LitBuy" anchor with GA4 click tracking. Kept as the only
 * client boundary inside otherwise server-rendered product grids.
 */
export default function BuyLink({
  href,
  product,
  location,
  className,
  children,
  ariaLabel,
}: BuyLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      aria-label={ariaLabel}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        trackBuyNowClick(product, location);
      }}
    >
      {children}
    </a>
  );
}
