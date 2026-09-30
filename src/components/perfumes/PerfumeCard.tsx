'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';
import { PerfumeProduct } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface PerfumeCardProps {
  perfume: PerfumeProduct;
}

export function PerfumeCard({ perfume }: PerfumeCardProps) {
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
          display: '100ml Flacon',
          warranty: 'Batch Authenticity Verified'
        }
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Cart error:', err);
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white p-5 border border-amber-200/80 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Scent Family & Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold tracking-wider uppercase text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
          {perfume.scentFamily}
        </span>
        {perfume.badge && (
          <span className="text-[10px] font-extrabold tracking-wider text-white bg-amber-600 px-2.5 py-0.5 rounded uppercase">
            {perfume.badge}
          </span>
        )}
      </div>

      {/* Flacon Visual */}
      <div className="relative h-60 w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100 mb-4">
        <Image
          src={perfume.images[0]}
          alt={perfume.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-gray-800 font-semibold bg-white/90 backdrop-blur-md px-3 py-1 rounded-md border border-gray-200 shadow-sm">
          <span>{perfume.concentration}</span>
          <span className="text-amber-700">{perfume.volume}</span>
        </div>
      </div>

      {/* Titles */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
          {perfume.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {perfume.tagline}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-1.5 mr-4 transition-colors ${
            activeTab === 'overview'
              ? 'text-amber-700 border-b-2 border-amber-600'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-1.5 transition-colors ${
            activeTab === 'notes'
              ? 'text-amber-700 border-b-2 border-amber-600'
              : 'text-gray-400 hover:text-gray-700'
          }`}
        >
          Olfactive Notes
        </button>
      </div>

      {/* Tab Body */}
      <div className="min-h-[76px] mb-4 text-xs leading-relaxed">
        {activeTab === 'overview' ? (
          <p className="text-gray-600 italic">
            "{perfume.description}"
          </p>
        ) : (
          <div className="space-y-1 text-[11px]">
            <div>
              <span className="text-amber-800 font-bold">TOP:</span>{' '}
              <span className="text-gray-600">{perfume.notes.top.join(' • ')}</span>
            </div>
            <div>
              <span className="text-amber-800 font-bold">HEART:</span>{' '}
              <span className="text-gray-600">{perfume.notes.heart.join(' • ')}</span>
            </div>
            <div>
              <span className="text-amber-800 font-bold">BASE:</span>{' '}
              <span className="text-gray-600">{perfume.notes.base.join(' • ')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Price & Add to Bag */}
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Single Flacon</span>
          <span className="text-2xl font-black text-gray-900">${perfume.basePrice}</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm hover:shadow'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Flacon</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default PerfumeCard;
