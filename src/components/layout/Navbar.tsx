'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Sparkles, Laptop, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Safely retrieve cart context
  let totalItems = 0;
  let openCart = () => {};
  try {
    const cart = useCart();
    totalItems = cart.totalItems;
    openCart = cart.openCart;
  } catch (e) {
    // Graceful fallback if cart context is mounting
  }

  const navLinks = [
    { name: 'Dell Laptops', href: '/catalog?brand=Dell', badge: 'XPS & Alienware' },
    { name: 'HP Laptops', href: '/catalog?brand=HP', badge: 'Spectre & Omen' },
    { name: 'All Laptops', href: '/catalog' },
    { name: 'TK Perfumes', href: '/#perfumes', highlight: true }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#050507]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Monogram & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 via-blue-600/10 to-transparent border border-cyan-400/40 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_-3px_rgba(0,240,255,0.4)] transition-all duration-300">
            <span className="font-mono text-base font-extrabold tracking-tighter text-cyan-400">TK</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors">
              TK <span className="text-xs font-mono font-normal tracking-widest text-cyan-400/80">PREMIUM</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 uppercase">Hardware & Perfumes</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            if (link.highlight) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-500/20 transition-all duration-200 shadow-[0_0_15px_-4px_rgba(245,158,11,0.3)]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{link.name}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  isActive ? 'text-cyan-400' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions & Cart Drawer Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            aria-label="Open Shopping Bag"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-400/50 hover:bg-cyan-950/20 text-slate-200 hover:text-cyan-300 transition-all duration-200"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-[11px] font-bold text-black shadow-[0_0_10px_rgba(0,240,255,0.6)] animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#090a10]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-200 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  {link.highlight ? (
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Laptop className="w-4 h-4 text-cyan-400" />
                  )}
                  <span className="text-sm font-semibold">{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold text-sm shadow-[0_0_20px_-3px_rgba(0,240,255,0.4)]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Shopping Bag ({totalItems})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export { Navbar };
