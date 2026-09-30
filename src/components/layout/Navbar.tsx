"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  Cpu,
  Sparkles,
  Shield,
  Sliders,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export interface NavItem {
  label: string;
  shortLabel?: string;
  href: string;
  badge?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const NAV_LINKS: NavItem[] = [
  {
    label: "Titan Series (AI & Workstation)",
    href: "/catalog?series=Titan",
    badge: "GEN 3",
    description: "Up to 64-Core Neural Compute & 128GB Unified Memory",
    icon: Cpu,
  },
  {
    label: "Blade Series (Gaming)",
    href: "/catalog?series=Blade",
    badge: "240HZ",
    description: "Cryo-Chamber Vapor Thermal Architecture & RTX Flagship",
    icon: Sparkles,
  },
  {
    label: "Air Series (Ultraportable)",
    href: "/catalog?series=Air",
    description: "1.38 kg Forged Carbon & 24-Hour Battery Efficiency",
    icon: Compass,
  },
  {
    label: "Custom Configurator",
    href: "/catalog",
    description: "Bespoke silicon, memory, thermal, and chassis tailoring",
    icon: Sliders,
  },
  {
    label: "Support",
    href: "/#support",
    description: "TK Care+ Enterprise Fleet & Concierge Engineering Support",
    icon: Shield,
  },
];

export interface NavbarProps {
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

export function Navbar({
  cartItemCount,
  onCartClick,
  onSearchClick,
}: NavbarProps) {
  const router = useRouter();
  const { totalItems, toggleCart } = useCart();
  const displayCartCount = cartItemCount ?? totalItems;
  const handleCartButtonClick = onCartClick ?? toggleCart;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchTrigger = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      setSearchOpen((prev) => !prev);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    setSearchOpen(false);
    if (trimmed) {
      router.push(`/catalog?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 w-full backdrop-blur-xl bg-[#050507]/80 border-b border-white/[0.08] z-50 transition-all duration-300",
        scrolled &&
          "bg-[#050507]/92 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.85)]"
      )}
    >
      {/* Top Telemetry Hairline Accent */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand Logo: "TK" Geometric Monogram + "TK LAPTOP" Typography */}
        <Link
          href="/"
          className="group flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] rounded-xl shrink-0"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d0e15] border border-[#00f0ff]/40 shadow-[0_0_20px_-4px_rgba(0,240,255,0.35)] group-hover:border-[#00f0ff] group-hover:shadow-[0_0_28px_-2px_rgba(0,240,255,0.55)] transition-all duration-300">
            {/* Inner Geometric Corner Accents */}
            <span className="absolute top-1 left-1 h-1.5 w-1.5 border-t border-l border-[#00f0ff]/70" />
            <span className="absolute bottom-1 right-1 h-1.5 w-1.5 border-b border-r border-[#00f0ff]/70" />
            <span className="font-mono text-sm font-black tracking-tighter text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
              TK
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-[0.18em] text-[#f8fafc] group-hover:text-[#00f0ff] transition-colors">
              TK LAPTOP
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] text-[#94a3b8] uppercase">
              APEX HARDWARE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-1 rounded-full bg-[#0d0e15]/80 border border-white/[0.07] px-2 py-1.5 backdrop-blur-md"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/[0.05] transition-all duration-200 whitespace-nowrap"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-1.5 py-0.2 font-mono text-[9px] font-semibold text-[#00f0ff]">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Action Icons & Explore Catalog Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={handleSearchTrigger}
            aria-label="Search hardware catalog"
            aria-expanded={searchOpen}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0d0e15] border border-[#1f2232] text-[#94a3b8] hover:text-[#00f0ff] hover:border-[#00f0ff]/40 hover:shadow-[0_0_18px_-4px_rgba(0,240,255,0.3)] transition-all duration-200 cursor-pointer"
          >
            <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
          </button>

          {/* Cart Button with Dynamic Item Badge Counter */}
          <button
            type="button"
            onClick={handleCartButtonClick}
            aria-label={`Shopping bag with ${displayCartCount} items`}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0d0e15] border border-[#1f2232] text-[#f8fafc] hover:text-[#00f0ff] hover:border-[#00f0ff]/40 hover:shadow-[0_0_18px_-4px_rgba(0,240,255,0.3)] transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span
              aria-live="polite"
              className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#00f0ff] px-1 font-mono text-[10px] font-bold text-[#050507] shadow-[0_0_12px_rgba(0,240,255,0.7)]"
            >
              {displayCartCount}
            </span>
          </button>

          {/* "Explore Catalog" Pill Button */}
          <Link
            href="/catalog"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00f0ff]/15 via-[#00f0ff]/10 to-[#3b82f6]/15 border border-[#00f0ff]/40 px-4 py-2 text-xs font-semibold tracking-wide text-[#f8fafc] shadow-[0_0_22px_-6px_rgba(0,240,255,0.35)] hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:text-[#050507] hover:shadow-[0_0_28px_-4px_rgba(0,240,255,0.6)] transition-all duration-200"
          >
            <span>Explore Catalog</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="flex xl:hidden h-10 w-10 items-center justify-center rounded-full bg-[#0d0e15] border border-[#1f2232] text-[#f8fafc] hover:border-[#00f0ff]/40 hover:text-[#00f0ff] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Quick Search Drawer */}
      {searchOpen && (
        <div className="border-t border-white/[0.08] bg-[#050507]/95 backdrop-blur-2xl px-4 py-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSearchSubmit}
            className="mx-auto flex max-w-3xl items-center gap-3 rounded-xl bg-[#0d0e15] border border-[#00f0ff]/40 px-4 py-2.5 shadow-[0_0_25px_-5px_rgba(0,240,255,0.2)]"
          >
            <Search className="h-4 w-4 text-[#00f0ff] shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Titan-X16, Stealth Blade, 128GB Unified Memory, RTX 5090..."
              aria-label="Search TK Laptop models and specifications"
              autoFocus
              className="w-full bg-transparent text-sm text-[#f8fafc] placeholder-[#94a3b8]/60 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#00f0ff]/15 border border-[#00f0ff]/40 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#00f0ff] hover:bg-[#00f0ff] hover:text-[#050507] transition-colors cursor-pointer"
            >
              SEARCH
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] text-[#94a3b8] hover:text-[#f8fafc]"
            >
              ESC
            </button>
          </form>
        </div>
      )}

      {/* Responsive Mobile Glass Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="xl:hidden border-t border-white/[0.08] bg-[#050507]/95 backdrop-blur-2xl px-4 pt-4 pb-6 sm:px-6 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <nav className="mx-auto max-w-lg space-y-2">
            {NAV_LINKS.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-start gap-3.5 rounded-xl bg-[#0d0e15]/90 border border-[#1f2232] p-3.5 hover:border-[#00f0ff]/40 transition-all"
                >
                  {IconComponent && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/25 text-[#00f0ff]">
                      <IconComponent className="h-4 w-4" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#f8fafc] group-hover:text-[#00f0ff] transition-colors">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 px-2 py-0.5 font-mono text-[10px] text-[#00f0ff]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-0.5 text-xs text-[#94a3b8] line-clamp-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#94a3b8] group-hover:text-[#00f0ff] shrink-0 mt-1" />
                </Link>
              );
            })}

            <div className="pt-3">
              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00f0ff] px-5 py-3 text-sm font-semibold text-[#050507] glow-cyan hover:bg-[#33f3ff] transition-all"
              >
                <span>Explore Catalog</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
