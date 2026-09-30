import React from 'react';
import Hero from '@/components/home/Hero';
import DealOfTheWeek from '@/components/home/DealOfTheWeek';
import FeaturedLaptops from '@/components/home/FeaturedLaptops';
import TrustPillars from '@/components/home/TrustPillars';
import PerfumeShowcase from '@/components/perfumes/PerfumeShowcase';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f5f8]">
      {/* 1. Alibaba-Style Hero Banner */}
      <Hero />

      {/* 2. Deal of the Week (Dual Dell XPS 16 + TK Royal Oud Noir Bundle) */}
      <DealOfTheWeek />

      {/* 3. Flagship Laptops Catalog (Dell, HP, MacBook Coming Soon) */}
      <FeaturedLaptops />

      {/* 4. Certified Store Assurances Matrix */}
      <TrustPillars />

      {/* 5. TK Haute Parfumerie Private Reserve Collection */}
      <PerfumeShowcase />
    </main>
  );
}
