"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/litbuy-spreadsheet", label: "Spreadsheet" },
  { href: "/outfits", label: "Outfits" },
  { href: "/tutorial", label: "Tutorial" },
];

interface Suggestion {
  _id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
}

function useSearchContext(_pathname: string) {
  // Always search the LitBuy product catalogue — /outfits and /brands are
  // coming-soon placeholders, so routing search there would dead-end.
  return useMemo(
    () => ({ placeholder: "SEARCH LITBUY...", basePath: "/litbuy-spreadsheet" }),
    []
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { placeholder, basePath } = useSearchContext(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced fetch suggestions
  const fetchSuggestions = useCallback((searchQuery: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/products?search=${encodeURIComponent(searchQuery.trim())}&limit=5`
        );
        const data = await res.json();
        const results: Suggestion[] = (data.products || []).slice(0, 5);
        setSuggestions(results);
        setShowDropdown(results.length > 0);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const navigateToSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`${basePath}?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push(basePath);
    }
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    setActiveIndex(-1);
    inputRef.current?.blur();
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    navigateToSearch(suggestion.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
      return;
    }

    if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        navigateToSearch(query);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 h-[60px] z-[1000] flex items-center justify-between px-6 transition-all duration-300 ${
          scrolled
            ? "bg-glass backdrop-blur-xl border-b border-glass-border shadow-[0_1px_20px_rgba(0,0,0,0.4)]"
            : "bg-bg-primary border-b border-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
            <Logo size={48} />
          </motion.div>
        </Link>

        {/* Search bar - center */}
        <div className="flex-1 max-w-[400px] mx-4 hidden sm:block relative">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              <Search size={15} />
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) setShowDropdown(true);
              }}
              className="w-full py-2 px-4 pl-9 bg-bg-secondary border border-border rounded-lg font-mono text-xs uppercase text-white placeholder:text-text-muted outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(255,227,77,0.18)] transition-all duration-300"
              autoComplete="off"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-3.5 h-3.5 border-2 border-text-muted border-t-accent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showDropdown && suggestions.length > 0 && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-1.5 bg-bg-secondary border border-border rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-[1001]"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion._id}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                      index === activeIndex
                        ? "bg-bg-elevated"
                        : "hover:bg-bg-elevated"
                    } ${
                      index < suggestions.length - 1
                        ? "border-b border-border/50"
                        : ""
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-9 h-9 rounded-md bg-bg-primary border border-border overflow-hidden shrink-0">
                      {suggestion.images?.[0] ? (
                        <img
                          src={suggestion.images[0]}
                          alt={suggestion.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="w-4 h-4"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs font-bold uppercase text-white truncate">
                        {suggestion.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[10px] uppercase text-text-secondary truncate">
                          {suggestion.brand}
                        </span>
                        <span className="font-mono text-[10px] font-bold text-accent">
                          $ {suggestion.price?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 relative">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 font-mono text-[13px] font-bold uppercase tracking-wide rounded transition-colors ${
                  isActive
                    ? "text-bg-primary"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-accent rounded"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile: search icon + menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 text-text-secondary hover:text-white transition-colors sm:hidden"
            onClick={() => {
              router.push("/litbuy-spreadsheet");
            }}
          >
            <Search size={20} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-accent text-bg-primary font-mono text-sm font-bold uppercase tracking-wider rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "CLOSE" : "MENU"}
          </motion.button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 top-[60px] bg-bg-primary/98 backdrop-blur-xl z-[999] flex flex-col p-6 gap-1 md:hidden"
          >
            {NAV_ITEMS.map((item, i) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-4 font-mono text-base font-bold uppercase tracking-wide border-b border-border transition-colors ${
                      isActive ? "text-accent" : "text-text-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
