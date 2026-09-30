import { Hero } from "@/components/home/Hero";
import { FeaturedLaptops } from "@/components/home/FeaturedLaptops";
import { EngineeringDeepDive } from "@/components/home/EngineeringDeepDive";
import { Benchmarks } from "@/components/home/Benchmarks";
import { CustomerPraise } from "@/components/home/CustomerPraise";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <FeaturedLaptops />
      <EngineeringDeepDive />
      <Benchmarks />
      <CustomerPraise />
    </main>
  );
}

