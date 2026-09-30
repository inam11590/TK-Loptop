export type LaptopBrand = 'Dell' | 'HP';

export type FilterSeriesOption = string;
export type FilterDisplaySizeOption = string;
export type FilterMemoryOption = string;
export type FilterGpuTierOption = string;
export type CatalogSortOption = 'performance-desc' | 'price-asc' | 'price-desc' | 'display-desc';
export type ProductCategory = string;
export type LaptopSeries = string;
export type LaptopBadge = string;

export interface BenchmarkScore {
  name: string;
  score: string;
}

export interface ProductSpec {
  processor: string;
  graphics: string;
  memory: string;
  storage: string;
  display: string;
  battery: string;
  weight: string;
  chassis: string;
  cpu?: string;
  gpu?: string;
  ram?: string;
  ports?: string[];
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

export interface ProductFilterMeta {
  seriesGroup?: FilterSeriesOption;
  displaySizeGroup?: FilterDisplaySizeOption;
  memoryGroup?: FilterMemoryOption;
  gpuTierGroup?: FilterGpuTierOption;
}

export interface LaptopProduct {
  id: string;
  slug: string;
  name: string;
  brand: LaptopBrand;
  series: 'XPS' | 'Spectre' | 'Alienware' | 'Omen' | 'Latitude' | 'Envy' | string;
  categoryLabel: string;
  tagline: string;
  basePrice: number;
  badge?: 'Flagship' | 'New' | 'Best Seller' | 'Top Tier' | string;
  images: string[];
  inStock: boolean;
  specs: {
    processor: string;
    graphics: string;
    memory: string;
    storage: string;
    display: string;
    battery: string;
    weight: string;
    chassis: string;
    cpu: string;
    gpu: string;
    ram: string;
    ports: string[];
    cpuClock?: string;
    gpuVramAndCores?: string;
    memoryBandwidth?: string;
    displayPeakNits?: string;
    coolingTech?: string;
    dimensions?: string;
    rapidCharge?: string;
    displayInches?: number;
    performanceIndex?: number;
  };
  keyFeatures: string[];
  category: string;
  description: string;
  monthlyFinancingPrice: number;
  rating: number;
  reviewsCount: number;
  badges: string[];
  featuredImage: string;
  galleryImages: string[];
  benchmarkScore: BenchmarkScore;
  filterMeta: ProductFilterMeta;
}

export type PerfumeConcentration = 'Eau de Parfum' | 'Parfum Extrait';

export interface PerfumeProduct {
  id: string;
  slug: string;
  name: string;
  collection: 'TK Signature' | 'TK Royal Oud' | 'TK Noir' | 'TK Fresh Amber';
  tagline: string;
  volume: string; // e.g. "100ml / 3.4 fl. oz."
  basePrice: number;
  badge?: 'Best Seller' | 'Limited Edition' | 'New Release';
  concentration: PerfumeConcentration;
  scentFamily: string; // e.g. "Woody Oriental", "Smoky Amber", "Aromatic Citrus"
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  images: string[];
  inStock: boolean;
  description: string;
}

export type StoreProduct = 
  | ({ productType: 'laptop' } & LaptopProduct)
  | ({ productType: 'perfume' } & PerfumeProduct);
