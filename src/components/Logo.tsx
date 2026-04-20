"use client";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  const fontSize = Math.round(size * 0.48);
  return (
    <span
      className={className}
      style={{
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        fontSize: `${fontSize}px`,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        display: "inline-block",
        userSelect: "none",
        color: "white",
      }}
    >
      <span style={{ color: "var(--color-accent)" }}>lit</span>buy
    </span>
  );
}
