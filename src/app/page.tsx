import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedLaptops from '@/components/home/FeaturedLaptops';
import TrustPillars from '@/components/home/TrustPillars';
import PerfumeShowcase from '@/components/perfumes/PerfumeShowcase';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050507]">
      <Hero />
      <FeaturedLaptops />
      <TrustPillars />
      <PerfumeShowcase />
    </main>
  );
}
