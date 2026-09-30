import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedLaptops from '@/components/home/FeaturedLaptops';
import PerfumeShowcase from '@/components/perfumes/PerfumeShowcase';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050507]">
      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Dell & HP Flagship Laptops Showcase */}
      <FeaturedLaptops />

      {/* 3. TK Haute Parfumerie Luxury Fragrances */}
      <PerfumeShowcase />
    </main>
  );
}
