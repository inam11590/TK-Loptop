'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Sparkles, Laptop, ChevronRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  let totalItems = 0;
  let openCart = () => {};
  try {
    const cart = useCart();
    totalItems = cart.totalItems;
    openCart = cart.openCart;
  } catch (e) {
    // Cart mounting fallback
  }

  const navLinks = [
    { name: 'Dell Laptops', href: '/catalog?brand=Dell', badge: 'XPS & Alienware' },
    { name: 'HP Laptops', href: '/catalog?brand=HP', badge: 'Spectre & Omen' },
    { name: 'All Hardware', href: '/catalog' },
    { name: 'TK Perfumes', href: '/#perfumes', highlight: true }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      
      {/* Top Utility Bar (Alibaba Style) */}
      <div className="bg-gray-100 border-b border-gray-200 text-[11px] text-gray-600 px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center">
        <span>Verified Supplier • Authorized Dell & HP Flagships • 100% Genuine Perfumes</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp: 0300-0000000
          </span>
          <span className="hidden sm:inline text-gray-400">|</span>
          <span className="hidden sm:inline">White-Glove Courier Dispatch</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white font-black text-xl shadow-md">
            TK
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">
                TK STORE
              </span>
              <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded">
                PRO
              </span>
            </div>
            <span className="text-[11px] font-medium text-gray-500">Laptops & Haute Parfumerie</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            if (link.highlight) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 hover:bg-amber-200 transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{link.name}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-orange-600 ${
                  isActive ? 'text-orange-600' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Open Shopping Bag"
            className="relative flex items-center gap-2 h-11 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-800 transition-all duration-200"
          >
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <span className="text-xs font-bold hidden sm:inline">Bag</span>
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[11px] font-bold text-white shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-11 w-11 items-center justify-center rounded-xl bg-gray-100 border border-gray-200 text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-5 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {link.highlight ? (
                  <Sparkles className="w-4 h-4 text-amber-600" />
                ) : (
                  <Laptop className="w-4 h-4 text-gray-600" />
                )}
                <span className="text-sm font-semibold">{link.name}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
