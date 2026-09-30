'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, MessageCircle, Check, Sparkles } from 'lucide-react';
import { PerfumeProduct } from '@/types/product';
import { useCart } from '@/context/CartContext';

const WA_ACTUAL_NUMBER = '923159255165';

interface PerfumeCardProps {
  perfume: PerfumeProduct;
}

export default function PerfumeCard({ perfume }: PerfumeCardProps) {
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
          warranty: 'Authentic Batch Verified'
        }
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch (err) {
      console.error('Cart error:', err);
    }
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello TK Store, I would like to order the *${perfume.name}* (${perfume.volume}, $${perfume.basePrice}). Please confirm availability.`
    );
    window.open(`https://wa.me/${WA_ACTUAL_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-400 hover:shadow-sm transition-all">
      
      {/* Top Meta: Scent Family & Concentration */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded uppercase tracking-wider">
          {perfume.scentFamily}
        </span>
        <span className="text-[10px] font-semibold text-gray-500">
          {perfume.concentration}
        </span>
      </div>

      {/* Flacon Image */}
      <div className="relative h-48 w-full rounded-lg bg-gray-50 overflow-hidden mb-3 border border-gray-100">
        <Image
          src={perfume.images[0]}
          alt={perfume.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-gray-700 border border-gray-200 shadow-xs">
          {perfume.volume}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 truncate mb-1">
        {perfume.name}
      </h3>

      {/* 1-Line Notes Summary */}
      <div className="text-[11px] text-gray-500 bg-gray-50 rounded-lg p-2.5 mb-3 border border-gray-100 space-y-1">
        <p className="truncate">
          <strong className="text-gray-700">Top:</strong> {perfume.notes.top.join(', ')}
        </p>
        <p className="truncate">
          <strong className="text-gray-700">Heart:</strong> {perfume.notes.heart.join(', ')}
        </p>
        <p className="truncate">
          <strong className="text-gray-700">Base:</strong> {perfume.notes.base.join(', ')}
        </p>
      </div>

      {/* Price */}
      <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] text-gray-400 block font-medium">100ml Bottle</span>
          <span className="text-xl font-black text-gray-900">${perfume.basePrice}</span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          In Stock
        </span>
      </div>

      {/* Dual CTA: WhatsApp & Add to Bag */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleWhatsAppOrder}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-emerald-700" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleAddToCart}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${
            added
              ? 'bg-gray-900 text-white'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
            </>
          )}
        </button>
      </div>

    </div>
  );
}

export { PerfumeCard };
