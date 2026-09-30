import { LaptopProduct } from '@/types/product';

export const LAPTOP_PRODUCTS: LaptopProduct[] = [
  {
    id: 'dell-xps-16-9640',
    slug: 'dell-xps-16',
    name: 'Dell XPS 16 (9640)',
    brand: 'Dell',
    series: 'XPS',
    categoryLabel: 'Creator & Studio Flagship',
    category: 'Creator & Studio Flagship',
    tagline: 'Precision-crafted CNC aluminum chassis with 4K OLED InfinityEdge touch display.',
    description: 'Precision-crafted CNC aluminum chassis with 4K OLED InfinityEdge touch display. Designed for top-tier creators, developers, and visual professionals.',
    basePrice: 2499,
    monthlyFinancingPrice: 104,
    rating: 4.95,
    reviewsCount: 184,
    badge: 'Flagship',
    badges: ['Flagship', '4K OLED', 'Intel Core Ultra 9'],
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 9 185H (16-Core, 5.1GHz)',
      graphics: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      memory: '32GB LPDDR5X 7467MHz Dual Channel',
      storage: '1TB M.2 PCIe Gen4 NVMe SSD',
      display: '16.3" 4K+ (3840 x 2400) OLED Touch 120Hz',
      battery: '99.5Wh with 130W Type-C Rapid Charge',
      weight: '2.13 kg / 4.70 lbs',
      chassis: 'CNC Milled Aluminum with Glass Palmrest',
      cpu: 'Intel Core Ultra 9 185H (16-Core, 5.1GHz)',
      gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      ram: '32GB LPDDR5X 7467MHz Dual Channel',
      ports: ['3x Thunderbolt 4 Type-C', '1x microSDXC Card Reader v6.0', '1x 3.5mm Headphone/Mic Combo'],
      cpuClock: '16-Core (6P + 8E + 2LPE) up to 5.1 GHz Turbo',
      gpuVramAndCores: '8GB GDDR6 VRAM Dedicated',
      memoryBandwidth: '7467 MT/s LPDDR5X High Speed',
      displayPeakNits: '400 nits (500 nits HDR Peak)',
      coolingTech: 'Dual Opposing Fan Vapor Chamber',
      dimensions: '358.18 x 240.05 x 18.70 mm',
      rapidCharge: 'ExpressCharge 80% in 60 min',
      displayInches: 16.3,
      performanceIndex: 98
    },
    filterMeta: {
      seriesGroup: 'Titan Series (AI/Studio)',
      displaySizeGroup: '16-inch',
      memoryGroup: '32GB Unified',
      gpuTierGroup: 'NVIDIA RTX 50-Series'
    },
    benchmarkScore: {
      name: 'Geekbench 6 Multi-Core',
      score: '14,850 pts'
    },
    keyFeatures: [
      'Capacitive Touch Function Row',
      'Seamless Glass Haptic Trackpad',
      'Quad-Speaker Spatial Audio with Waves MaxxAudio'
    ]
  },
  {
    id: 'dell-alienware-m16-r2',
    slug: 'alienware-m16-r2',
    name: 'Dell Alienware m16 R2',
    brand: 'Dell',
    series: 'Alienware',
    categoryLabel: 'Competitive High-FPS Gaming',
    category: 'Competitive High-FPS Gaming',
    tagline: 'Stealth-mode mechanical performance engineered with Cryo-tech cooling.',
    description: 'Stealth-mode mechanical performance engineered with Cryo-tech cooling and 240Hz QHD+ ultra-fast display for esports mastery.',
    basePrice: 2099,
    monthlyFinancingPrice: 88,
    rating: 4.92,
    reviewsCount: 156,
    badge: 'Best Seller',
    badges: ['Best Seller', '240Hz QHD+', 'Cryo-Tech'],
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H (16-Core, 4.8GHz)',
      graphics: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      memory: '32GB DDR5 5600MHz (Upgradable)',
      storage: '2TB PCIe Gen4 NVMe M.2 SSD',
      display: '16" QHD+ (2560 x 1600) 240Hz 3ms G-SYNC',
      battery: '90Wh with 240W GaN Adapter',
      weight: '2.61 kg / 5.75 lbs',
      chassis: 'Dark Metallic Moon Magnesium Alloy',
      cpu: 'Intel Core Ultra 7 155H (16-Core, 4.8GHz)',
      gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      ram: '32GB DDR5 5600MHz',
      ports: ['1x Thunderbolt 4', '1x USB-C 3.2 Gen 2', '2x USB-A 3.2 Gen 1', '1x HDMI 2.1', 'RJ-45 Ethernet'],
      cpuClock: '16-Core up to 4.8 GHz Max Turbo',
      gpuVramAndCores: '8GB GDDR6 140W Max TGP',
      memoryBandwidth: '5600 MT/s DDR5 Dual Slot',
      displayPeakNits: '300 nits ComfortView Plus',
      coolingTech: 'Alienware Cryo-Tech Vapor Chamber',
      dimensions: '363.9 x 249.4 x 23.5 mm',
      rapidCharge: 'ExpressCharge Boost',
      displayInches: 16.0,
      performanceIndex: 96
    },
    filterMeta: {
      seriesGroup: 'Blade Series (Gaming)',
      displaySizeGroup: '16-inch',
      memoryGroup: '32GB Unified',
      gpuTierGroup: 'NVIDIA RTX 50-Series'
    },
    benchmarkScore: {
      name: 'Time Spy Extreme Graphics',
      score: '13,200 pts'
    },
    keyFeatures: [
      'Alienware Cryo-Tech Vapor Chamber Cooling',
      'Per-Key AlienFX RGB Backlit Keyboard',
      'Dedicated Stealth Mode Hotkey'
    ]
  },
  {
    id: 'hp-spectre-x360-16',
    slug: 'hp-spectre-x360-16',
    name: 'HP Spectre x360 16 2-in-1',
    brand: 'HP',
    series: 'Spectre',
    categoryLabel: 'Executive Convertible Workstation',
    category: 'Executive Convertible Workstation',
    tagline: 'Gem-cut architectural design with IMAX Enhanced OLED flexibility.',
    description: 'Gem-cut architectural design with IMAX Enhanced OLED flexibility and AI-assisted presence detection.',
    basePrice: 2199,
    monthlyFinancingPrice: 92,
    rating: 4.94,
    reviewsCount: 128,
    badge: 'Flagship',
    badges: ['Flagship', 'IMAX 2.8K OLED', '2-in-1 Tilt Pen'],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H with Intel AI Boost',
      graphics: 'NVIDIA GeForce RTX 4050 6GB GDDR6',
      memory: '32GB LPDDR5x 6400MHz',
      storage: '1TB PCIe Gen4 NVMe TLC M.2 SSD',
      display: '16" 2.8K (2880 x 1800) OLED 120Hz Touch 500 Nits',
      battery: '83Wh (Up to 15 hours)',
      weight: '1.95 kg / 4.30 lbs',
      chassis: 'Nightfall Black CNC Aluminum with Pale Brass Accents',
      cpu: 'Intel Core Ultra 7 155H with Intel AI Boost',
      gpu: 'NVIDIA GeForce RTX 4050 6GB GDDR6',
      ram: '32GB LPDDR5x 6400MHz',
      ports: ['2x Thunderbolt 4 with USB-C 40Gbps', '1x USB-A 10Gbps', '1x HDMI 2.1', '1x Headphone/Mic'],
      cpuClock: '16-Core Intel AI Boost NPU integrated',
      gpuVramAndCores: '6GB GDDR6 Dedicated',
      memoryBandwidth: '6400 MT/s Dual Channel',
      displayPeakNits: '500 nits HDR Peak IMAX Enhanced',
      coolingTech: 'Dual Smart-Sensored Silent Cooling',
      dimensions: '356.8 x 245.5 x 19.8 mm',
      rapidCharge: 'HP Fast Charge (50% in 30 min)',
      displayInches: 16.0,
      performanceIndex: 94
    },
    filterMeta: {
      seriesGroup: 'Titan Series (AI/Studio)',
      displaySizeGroup: '16-inch',
      memoryGroup: '32GB Unified',
      gpuTierGroup: 'NVIDIA RTX 50-Series'
    },
    benchmarkScore: {
      name: 'PCMark 10 Extended',
      score: '9,480 pts'
    },
    keyFeatures: [
      '9MP AI IR Webcam with Automatic Auto-Framing',
      'Quad Audio by Poly Studio',
      'Includes HP Rechargeable MPP 2.0 Tilt Pen'
    ]
  },
  {
    id: 'hp-omen-transcend-14',
    slug: 'hp-omen-transcend-14',
    name: 'HP OMEN Transcend 14',
    brand: 'HP',
    series: 'Omen',
    categoryLabel: 'Ultraportable Studio & Gaming',
    category: 'Ultraportable Studio & Gaming',
    tagline: 'The worlds lightest 14-inch gaming laptop with edge-to-edge pudding keycaps.',
    description: 'The worlds lightest 14-inch gaming laptop with edge-to-edge pudding keycaps and high-efficiency Tempest Cooling Go.',
    basePrice: 1799,
    monthlyFinancingPrice: 75,
    rating: 4.91,
    reviewsCount: 94,
    badge: 'New',
    badges: ['New', '1.63 kg Lightweight', '2.8K OLED'],
    images: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
    ],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H (16-Core, 4.8GHz)',
      graphics: 'NVIDIA GeForce RTX 4060 8GB GDDR6',
      memory: '16GB LPDDR5X 7467MHz',
      storage: '1TB PCIe Gen4 NVMe M.2 SSD',
      display: '14" 2.8K (2880 x 1800) OLED 120Hz 0.2ms HDR 500',
      battery: '71Wh with 140W USB-C PD Fast Charge',
      weight: '1.63 kg / 3.60 lbs',
      chassis: 'Shadow Black Anodized Aluminum',
      cpu: 'Intel Core Ultra 7 155H (16-Core, 4.8GHz)',
      gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6',
      ram: '16GB LPDDR5X 7467MHz',
      ports: ['1x Thunderbolt 4 with USB-C 40Gbps', '1x USB-C 10Gbps', '2x USB-A 10Gbps', '1x HDMI 2.1', '1x Headphone/Mic'],
      cpuClock: '16-Core Intel Core Ultra up to 4.8 GHz',
      gpuVramAndCores: '8GB GDDR6 65W Max TGP',
      memoryBandwidth: '7467 MT/s Ultra High Speed',
      displayPeakNits: '500 nits HDR Peak OLED 0.2ms',
      coolingTech: 'Tempest Cooling Go Vapor Chamber',
      dimensions: '313 x 233.5 x 17.99 mm',
      rapidCharge: '140W USB-C Fast Charge (50% in 30 min)',
      displayInches: 14.0,
      performanceIndex: 91
    },
    filterMeta: {
      seriesGroup: 'Air Series (Ultraportable)',
      displaySizeGroup: '14-inch',
      memoryGroup: '64GB LPDDR5X',
      gpuTierGroup: 'NVIDIA RTX 50-Series'
    },
    benchmarkScore: {
      name: '3DMark Time Spy',
      score: '10,420 pts'
    },
    keyFeatures: [
      'Tempest Cooling Go Vapor Chamber',
      'HyperX Cloud III Wireless Low-Latency Audio Receiver Built-in',
      'Translucent Pudding Keycaps with RGB Lighting'
    ]
  }
];

export const TK_LAPTOPS = LAPTOP_PRODUCTS;

export function getAllLaptops(): LaptopProduct[] {
  return LAPTOP_PRODUCTS;
}

export function getLaptopsByBrand(brand: 'Dell' | 'HP'): LaptopProduct[] {
  return LAPTOP_PRODUCTS.filter((laptop) => laptop.brand === brand);
}

export function getLaptopBySlug(slug: string): LaptopProduct | undefined {
  return LAPTOP_PRODUCTS.find((laptop) => laptop.slug === slug);
}
