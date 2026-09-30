'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LAPTOP_PRODUCTS } from '@/data/products';
import { LaptopProduct } from '@/types/product';
import { Search, ShoppingBag, MessageCircle, ArrowRight, Clock, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const WA_ACTUAL_NUMBER = '923159255165';
const WA_DISPLAY_NUMBER = '0300-0000000';

type BrandTab = 'All' | 'Dell' | 'HP' | 'Apple';

export default function FeaturedLaptops() {
  const [selectedBrand, setSelectedBrand] = useState<BrandTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const cart = useCart();

  // Filter items by brand and live search
  const filteredLaptops = LAPTOP_PRODUCTS.filter((laptop) => {
    const matchesBrand = selectedBrand === 'All' ? true : laptop.brand === selectedBrand;
    const matchesSearch = 
      laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laptop.specs.processor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laptop.specs.graphics.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  const handleQuickAdd = (laptop: LaptopProduct) => {
    try {
      cart.addItem({
        laptopId: laptop.id,
        name: laptop.name,
        slug: laptop.slug,
        image: laptop.images[0],
        basePrice: laptop.basePrice,
        totalPrice: laptop.basePrice,
        quantity: 1,
        configuredSpecs: {
          processor: laptop.specs.processor.split('(')[0],
          ram: laptop.specs.memory.split(' ')[0],
          storage: laptop.specs.storage.split(' ')[0],
          display: laptop.specs.display.split(' ')[0],
          warranty: 'Official Brand Warranty'
        }
      });
      setAddedId(laptop.id);
      setTimeout(() => setAddedId(null), 1800);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDirectWhatsApp = (laptop: LaptopProduct) => {
    const msg = `Hello TK Store, I want to order the *${laptop.name}* ($${laptop.basePrice}). Please confirm availability.`;
    window.open(`https://wa.me/${WA_ACTUAL_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="laptops" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Flagship Laptops Catalog
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Factory sealed original units with direct warranty and nationwide courier shipping.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search model, RTX, or CPU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-gray-300 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Brand Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-3 overflow-x-auto">
          {(['All', 'Dell', 'HP', 'Apple'] as const).map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors whitespace-nowrap ${
                selectedBrand === brand
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {brand === 'All' && `All Models (${LAPTOP_PRODUCTS.length})`}
              {brand === 'Dell' && 'Dell (10)'}
              {brand === 'HP' && 'HP (10)'}
              {brand === 'Apple' && 'Apple MacBook (Coming Soon)'}
            </button>
          ))}
        </div>

        {/* APPLE COMING SOON VIEW */}
        {selectedBrand === 'Apple' ? (
          <div className="rounded-2xl bg-white border border-gray-200 p-8 sm:p-12 text-center max-w-xl mx-auto my-6 shadow-sm">
            <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900">Apple MacBook Fleet Coming Soon</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6 leading-relaxed">
              We are finalizing authorized stock for MacBook Pro and Air models. Leave your email for instant arrival notification.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (waitlistEmail) {
                  setWaitlistSubmitted(true);
                  setTimeout(() => setWaitlistSubmitted(false), 3000);
                  setWaitlistEmail('');
                }
              }}
              className="flex gap-2 max-w-sm mx-auto mb-4"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors"
              >
                {waitlistSubmitted ? 'Subscribed!' : 'Notify Me'}
              </button>
            </form>

            <button
              onClick={() => {
                const text = encodeURIComponent('Hello TK Store, please alert me when Apple MacBooks arrive.');
                window.open(`https://wa.me/${WA_ACTUAL_NUMBER}?text=${text}`, '_blank');
              }}
              className="text-xs text-emerald-700 hover:underline font-semibold"
            >
              Or inquire on WhatsApp ({WA_DISPLAY_NUMBER})
            </button>
          </div>
        ) : (
          /* CLEAN, UNIFORM PRODUCT GRID (3 Columns) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLaptops.map((laptop) => (
              <div
                key={laptop.id}
                className="flex flex-col bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                {/* Brand & Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {laptop.brand} • {laptop.series}
                  </span>
                  {laptop.badge && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded">
                      {laptop.badge}
                    </span>
                  )}
                </div>

                {/* Clean Product Image */}
                <div className="relative h-44 w-full rounded-lg bg-gray-50 overflow-hidden mb-3 border border-gray-100">
                  <Image
                    src={laptop.images[0]}
                    alt={laptop.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-900 truncate mb-1">
                  {laptop.name}
                </h3>

                {/* Clean 1-Line Specs */}
                <p className="text-[11px] text-gray-500 truncate mb-3">
                  {laptop.specs.processor.split('(')[0]} • {laptop.specs.memory.split(' ')[0]} RAM • {laptop.specs.storage.split(' ')[0]} SSD
                </p>

                {/* Price */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Price</span>
                    <span className="text-lg font-black text-gray-900">${laptop.basePrice.toLocaleString()}</span>
                  </div>
                  <Link
                    href={`/catalog/${laptop.slug}`}
                    className="text-xs text-orange-600 hover:text-orange-700 font-bold inline-flex items-center gap-1"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Action Buttons: WhatsApp & Bag */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleDirectWhatsApp(laptop)}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-700" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleQuickAdd(laptop)}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                      addedId === laptop.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm'
                    }`}
                  >
                    {addedId === laptop.id ? (
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
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export { FeaturedLaptops };
