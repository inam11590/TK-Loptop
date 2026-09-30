'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';
import { PerfumeProduct } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface PerfumeCardProps {
  perfume: PerfumeProduct;
}

export default function PerfumeCard({ perfume }: PerfumeCardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'notes'>('overview');
  const [added, setAdded] = useState(false);
  const cart = useCart();

  const handleAddToCart = () => {
    try {
      cart.addItem({
        laptopId: perfume.id,
        name: perfume.name,
        slug: perfume.slug,
        image: perfume.images[0],
        basePrice: perfume.basePrice,
        totalPrice: perfume.basePrice,
        quantity: 1,
        configuredSpecs: {
          processor: perfume.concentration,
          ram: perfume.volume,
          storage: perfume.scentFamily,
          display: '100ml Glass Flacon',
          warranty: 'Authentic Batch Guarantee'
        }
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Cart error:', err);
    }
  };

  return (
    <div className="group relative flex flex-col rounded-3xl bg-gradient-to-b from-[#111219]/90 to-[#08090e]/95 p-6 border border-amber-500/15 hover:border-amber-400/40 transition-all duration-500 hover:shadow-[0_0_35px_-8px_rgba(245,158,11,0.25)]">
      
      {/* Scent Family & Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400/80 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          {perfume.scentFamily}
        </span>
        {perfume.badge && (
          <span className="text-[10px] font-semibold tracking-wider text-black bg-gradient-to-r from-amber-300 to-amber-500 px-2.5 py-0.5 rounded-full uppercase shadow-sm">
            {perfume.badge}
          </span>
        )}
      </div>

      {/* Flacon Visual */}
      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-[#05060a] border border-white/[0.04] mb-5 group-hover:scale-[1.01] transition-transform duration-500">
        <Image
          src={perfume.images[0]}
          alt={perfume.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090e] via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-mono bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          <span>{perfume.concentration}</span>
          <span className="text-amber-400 font-medium">{perfume.volume}</span>
        </div>
      </div>

      {/* Titles */}
      <div className="mb-3">
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
          {perfume.name}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {perfume.tagline}
        </p>
      </div>

      {/* Tab Switcher: Overview vs Olfactive Notes */}
      <div className="flex border-b border-white/[0.08] mb-4 text-xs font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2 mr-4 transition-colors ${
            activeTab === 'overview'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-2 transition-colors ${
            activeTab === 'notes'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          Olfactive Notes
        </button>
      </div>

      {/* Tab Body */}
      <div className="min-h-[88px] mb-6 text-xs leading-relaxed text-slate-300">
        {activeTab === 'overview' ? (
          <p className="text-slate-400 italic">
            "{perfume.description}"
          </p>
        ) : (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div>
              <span className="text-amber-400/90 font-semibold">TOP:</span>{' '}
              <span className="text-slate-300">{perfume.notes.top.join(' • ')}</span>
            </div>
            <div>
              <span className="text-amber-400/90 font-semibold">HEART:</span>{' '}
              <span className="text-slate-300">{perfume.notes.heart.join(' • ')}</span>
            </div>
            <div>
              <span className="text-amber-400/90 font-semibold">BASE:</span>{' '}
              <span className="text-slate-300">{perfume.notes.base.join(' • ')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Price & Purchase Action */}
      <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Single Flacon</span>
          <span className="text-2xl font-extrabold text-white">${perfume.basePrice}</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs transition-all duration-300 ${
            added
              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.5)] hover:scale-[1.02]'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Order Flacon</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
