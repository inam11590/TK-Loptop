export type LaptopSeries = "Titan AI" | "Pro Studio" | "Stealth Blade";

export type LaptopBadge = "New Release" | "Flagship" | "Best Seller" | string;

export type ProductCategory =
  | "Flagship"
  | "AI & Workstation"
  | "Gaming Blade"
  | "Ultraportable";

export type FilterSeriesOption =
  | "Titan Series (AI/Studio)"
  | "Blade Series (Gaming)"
  | "Air Series (Ultraportable)";

export type FilterDisplaySizeOption =
  | "13-inch"
  | "14-inch"
  | "16-inch"
  | "18-inch";

export type FilterMemoryOption =
  | "32GB Unified"
  | "64GB LPDDR5X"
  | "128GB Extreme";

export type FilterGpuTierOption =
  | "NVIDIA RTX 50-Series"
  | "TK Neural GPU Core"
  | "Integrated Ultra";

export type CatalogSortOption =
  | "performance-desc"
  | "price-asc"
  | "price-desc"
  | "display-desc";

export interface ProductSpec {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  display: string;
  battery: string;
  weight: string;
  ports: string[];
  // Extended engineering telemetry for side-by-side comparison & sorting
  cpuClock?: string;
  gpuVramAndCores?: string;
  memoryBandwidth?: string;
  displayPeakNits?: string;
  coolingTech?: string;
  dimensions?: string;
  rapidCharge?: string;
  displayInches?: number;
  performanceIndex?: number;
}

export type LaptopSpecs = ProductSpec;

export interface BenchmarkScore {
  name: string;
  score: string;
}

export interface ProductFilterMeta {
  seriesGroup: FilterSeriesOption;
  displaySizeGroup: FilterDisplaySizeOption;
  memoryGroup: FilterMemoryOption;
  gpuTierGroup: FilterGpuTierOption;
}

export interface LaptopProduct {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  basePrice: number;
  monthlyFinancingPrice: number;
  rating: number;
  reviewsCount: number;
  badges: string[];
  featuredImage: string;
  galleryImages: string[];
  specs: ProductSpec;
  benchmarkScore: BenchmarkScore;
  filterMeta?: ProductFilterMeta;
  inStock?: boolean;
  series?: LaptopSeries;
}
