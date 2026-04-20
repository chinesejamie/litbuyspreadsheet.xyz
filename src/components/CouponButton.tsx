import Link from "next/link";

interface CouponButtonProps {
  href: string;
  label: string;
  subLabel?: string;
  external?: boolean;
  size?: "md" | "lg";
  className?: string;
}

/**
 * A button styled to look like a physical coupon / torn ticket:
 * yellow background, dashed inner border, perforation cutouts on the sides,
 * raised shadow, and a tag icon. Designed to sit on a dark bg-primary surface
 * — the cutouts are `bg-bg-primary` circles so the notches look "torn" out.
 */
export default function CouponButton({
  href,
  label,
  subLabel,
  external = false,
  size = "md",
  className = "",
}: CouponButtonProps) {
  const sizeClasses =
    size === "lg"
      ? "px-10 py-4 text-sm sm:text-base"
      : "px-7 py-3 text-xs sm:text-sm";

  const content = (
    <>
      {/* Perforation cutouts — side notches that look torn from a sheet */}
      <span
        className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-bg-primary rounded-full"
        aria-hidden="true"
      />
      <span
        className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-bg-primary rounded-full"
        aria-hidden="true"
      />

      {/* Dashed inner frame — classic coupon line */}
      <span
        className="absolute inset-[4px] rounded-[6px] border border-dashed border-bg-primary/40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Tag / coupon icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 relative z-10 shrink-0"
        aria-hidden="true"
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <circle cx="7" cy="7" r="1.25" fill="currentColor" />
      </svg>

      <span className="relative z-10 leading-none whitespace-nowrap">
        {label}
      </span>

      {subLabel && (
        <span className="relative z-10 ml-1 pl-2 border-l border-bg-primary/40 text-[0.75em] font-semibold leading-none">
          {subLabel}
        </span>
      )}
    </>
  );

  const baseClasses = `group relative inline-flex items-center gap-3 bg-accent text-bg-primary font-mono font-bold uppercase tracking-wider rounded-lg ${sizeClasses} hover:bg-accent-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_4px_0_0_#e6c939] hover:shadow-[0_2px_0_0_#e6c939] active:shadow-[0_1px_0_0_#e6c939] ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {content}
    </Link>
  );
}
