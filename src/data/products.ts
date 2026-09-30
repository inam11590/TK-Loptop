import { LaptopProduct } from '@/types/product';

interface RawLaptopItem {
  id: string;
  slug: string;
  name: string;
  brand: 'Dell' | 'HP' | 'Apple';
  series: string;
  categoryLabel: string;
  tagline: string;
  basePrice: number;
  badge?: 'Flagship' | 'New' | 'Best Seller' | 'Top Tier';
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
  };
  keyFeatures: string[];
}

const RAW_LAPTOPS: RawLaptopItem[] = [
  // ==================== 10 DELL LAPTOPS ====================
  {
    id: 'dell-xps-16-9640',
    slug: 'dell-xps-16',
    name: 'Dell XPS 16 (9640)',
    brand: 'Dell',
    series: 'XPS',
    categoryLabel: 'Creator Studio Flagship',
    tagline: 'CNC aluminum chassis with 4K OLED InfinityEdge touch display.',
    basePrice: 2499,
    badge: 'Flagship',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 9 185H (16-Core)',
      graphics: 'NVIDIA RTX 4070 8GB GDDR6',
      memory: '32GB LPDDR5X 7467MHz',
      storage: '1TB PCIe Gen4 NVMe SSD',
      display: '16.3" 4K+ OLED Touch 120Hz',
      battery: '99.5Wh Rapid Charge',
      weight: '2.13 kg',
      chassis: 'CNC Milled Aluminum'
    },
    keyFeatures: ['Capacitive Touch Row', 'Seamless Glass Haptic Trackpad']
  },
  {
    id: 'dell-xps-14-9440',
    slug: 'dell-xps-14',
    name: 'Dell XPS 14 (9440)',
    brand: 'Dell',
    series: 'XPS',
    categoryLabel: 'Ultraportable Studio',
    tagline: 'Balance of power and portability with 3.2K OLED 120Hz display.',
    basePrice: 1999,
    badge: 'Best Seller',
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H (16-Core)',
      graphics: 'NVIDIA RTX 4050 6GB GDDR6',
      memory: '32GB LPDDR5X 7467MHz',
      storage: '1TB PCIe Gen4 SSD',
      display: '14.5" 3.2K OLED Touch 120Hz',
      battery: '69.5Wh Type-C Fast Charge',
      weight: '1.68 kg',
      chassis: 'Platinum Silver Aluminum'
    },
    keyFeatures: ['Zero-Lattice Keyboard', 'Studio Sound Quad Speakers']
  },
  {
    id: 'dell-xps-13-9340',
    slug: 'dell-xps-13',
    name: 'Dell XPS 13 (9340)',
    brand: 'Dell',
    series: 'XPS',
    categoryLabel: 'Executive Ultralight',
    tagline: 'Sub-1.2kg minimalist travel laptop with QHD+ 120Hz screen.',
    basePrice: 1399,
    badge: 'New',
    images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H (16-Core)',
      graphics: 'Intel Arc Graphics',
      memory: '16GB LPDDR5X 7467MHz',
      storage: '512GB PCIe Gen4 SSD',
      display: '13.4" QHD+ (2560x1600) 120Hz 500 Nits',
      battery: '55Wh All-Day Battery',
      weight: '1.19 kg',
      chassis: 'Machined Aluminum'
    },
    keyFeatures: ['Gorilla Glass 3 Palmrest', 'Fingerprint & IR Face Unlock']
  },
  {
    id: 'dell-alienware-m16-r2',
    slug: 'alienware-m16-r2',
    name: 'Dell Alienware m16 R2',
    brand: 'Dell',
    series: 'Alienware',
    categoryLabel: 'Competitive High-FPS Gaming',
    tagline: 'Stealth-mode mechanical gaming beast with Cryo-tech cooling.',
    basePrice: 2099,
    badge: 'Flagship',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      graphics: 'NVIDIA RTX 4070 8GB GDDR6',
      memory: '32GB DDR5 5600MHz',
      storage: '2TB PCIe Gen4 NVMe SSD',
      display: '16" QHD+ 240Hz 3ms G-SYNC',
      battery: '90Wh with 240W GaN Adapter',
      weight: '2.61 kg',
      chassis: 'Dark Metallic Moon Magnesium'
    },
    keyFeatures: ['Dedicated Stealth Mode Key', 'Per-Key AlienFX RGB']
  },
  {
    id: 'dell-alienware-m18-r2',
    slug: 'alienware-m18-r2',
    name: 'Dell Alienware m18 R2',
    brand: 'Dell',
    series: 'Alienware',
    categoryLabel: 'Desktop Replacement Beast',
    tagline: 'Massive 18-inch display with unthrottled RTX 4090 power.',
    basePrice: 3499,
    badge: 'Top Tier',
    images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core i9-14900HX (24-Core, 5.8GHz)',
      graphics: 'NVIDIA RTX 4090 16GB GDDR6 (175W TGP)',
      memory: '64GB DDR5 5600MHz',
      storage: '4TB (2x 2TB RAID 0) Gen4 SSD',
      display: '18" QHD+ 165Hz 100% DCI-P3 ComfortView',
      battery: '97Wh Dual Adapter Ready',
      weight: '4.04 kg',
      chassis: 'Anodized Aluminum & Magnesium'
    },
    keyFeatures: ['Element 31 Gallium-Silicone Thermals', 'CherryMX Mechanical Keyboard']
  },
  {
    id: 'dell-alienware-x16-r2',
    slug: 'alienware-x16-r2',
    name: 'Dell Alienware x16 R2',
    brand: 'Dell',
    series: 'Alienware',
    categoryLabel: 'Ultra-Slim Luxury Gaming',
    tagline: 'Alienwares slimmest 16-inch chassis with micro-LED rear stadium lighting.',
    basePrice: 2799,
    badge: 'Flagship',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 9 185H',
      graphics: 'NVIDIA RTX 4080 12GB GDDR6',
      memory: '32GB LPDDR5X 7467MHz',
      storage: '2TB PCIe Gen4 SSD',
      display: '16" QHD+ 240Hz 100% DCI-P3',
      battery: '90Wh High-Density Cell',
      weight: '2.72 kg',
      chassis: 'Lunar Silver Aluminum Body'
    },
    keyFeatures: ['100-Micro-LED Stadium Lighting', 'Vapor Chamber Architecture']
  },
  {
    id: 'dell-g16-7630',
    slug: 'dell-g16-7630',
    name: 'Dell G16 Gaming (7630)',
    brand: 'Dell',
    series: 'G-Series',
    categoryLabel: 'Mid-Tier Performance Gaming',
    tagline: 'Heavyweight gaming specs at an accessible commercial price point.',
    basePrice: 1299,
    badge: 'Best Seller',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core i7-13650HX (14-Core)',
      graphics: 'NVIDIA RTX 4060 8GB GDDR6',
      memory: '16GB DDR5 4800MHz',
      storage: '1TB M.2 PCIe NVMe SSD',
      display: '16" QHD+ 165Hz 100% sRGB',
      battery: '86Wh ExpressCharge',
      weight: '2.87 kg',
      chassis: 'Metallic Nightshade with Coral Accents'
    },
    keyFeatures: ['Game Shift Turbo Boost Button', 'Alienware-Inspired Thermals']
  },
  {
    id: 'dell-inspiron-16-plus',
    slug: 'dell-inspiron-16-plus',
    name: 'Dell Inspiron 16 Plus (7640)',
    brand: 'Dell',
    series: 'Inspiron',
    categoryLabel: 'Productivity & Content Creation',
    tagline: 'Expansive 16:10 2.5K display built for multi-app business workflows.',
    basePrice: 1149,
    badge: 'New',
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      graphics: 'NVIDIA RTX 4050 6GB GDDR6',
      memory: '16GB LPDDR5X',
      storage: '1TB PCIe Gen4 SSD',
      display: '16" 2.5K (2560x1600) 120Hz Anti-Glare',
      battery: '90Wh Extended Life',
      weight: '2.20 kg',
      chassis: 'Ice Blue Aluminum'
    },
    keyFeatures: ['Dolby Vision & Dolby Atmos', 'FHD Webcam with Hardware Privacy Shutter']
  },
  {
    id: 'dell-latitude-7450',
    slug: 'dell-latitude-7450',
    name: 'Dell Latitude 7450 Ultralight',
    brand: 'Dell',
    series: 'Latitude',
    categoryLabel: 'Corporate Enterprise Secure',
    tagline: 'Ultralight magnesium alloy designed for enterprise mobility and security.',
    basePrice: 1699,
    badge: 'Top Tier',
    images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 165U vPro',
      graphics: 'Intel Graphics',
      memory: '32GB LPDDR5X 6400MHz',
      storage: '512GB Self-Encrypting NVMe SSD',
      display: '14" FHD+ IPS 400 Nits Low Blue Light',
      battery: '57Wh ExpressCharge',
      weight: '1.05 kg',
      chassis: 'Ultralight River Magnesium'
    },
    keyFeatures: ['Hardware TPM 2.0 & SmartCard', 'Intel vPro Enterprise Management']
  },
  {
    id: 'dell-precision-5690',
    slug: 'dell-precision-5690',
    name: 'Dell Precision 5690 Workstation',
    brand: 'Dell',
    series: 'Precision',
    categoryLabel: 'ISV-Certified Mobile Workstation',
    tagline: 'Workstation powerhouse for CAD, 3D rendering, and local AI training.',
    basePrice: 3899,
    badge: 'Flagship',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 9 185H vPro',
      graphics: 'NVIDIA RTX 5000 Ada Generation 16GB',
      memory: '64GB LPDDR5X 7467MHz',
      storage: '2TB PCIe Gen4 NVMe SSD',
      display: '16" 4K OLED Touch 500 Nits 100% DCI-P3',
      battery: '99.5Wh with 165W Type-C GaN',
      weight: '2.17 kg',
      chassis: 'Titan Gray Precision CNC'
    },
    keyFeatures: ['AutoCAD & Blender ISV Certified', 'Dual Opposing Output Fan Cooling']
  },

  // ==================== 10 HP LAPTOPS ====================
  {
    id: 'hp-spectre-x360-16',
    slug: 'hp-spectre-x360-16',
    name: 'HP Spectre x360 16 2-in-1',
    brand: 'HP',
    series: 'Spectre',
    categoryLabel: 'Executive Convertible Workstation',
    tagline: 'Gem-cut architectural design with IMAX Enhanced OLED flexibility.',
    basePrice: 2199,
    badge: 'Flagship',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      graphics: 'NVIDIA RTX 4050 6GB GDDR6',
      memory: '32GB LPDDR5x 6400MHz',
      storage: '1TB PCIe Gen4 NVMe SSD',
      display: '16" 2.8K OLED 120Hz Touch 500 Nits',
      battery: '83Wh (Up to 15 hours)',
      weight: '1.95 kg',
      chassis: 'Nightfall Black CNC Aluminum'
    },
    keyFeatures: ['9MP AI Auto-Framing Webcam', 'Poly Studio Quad Spatial Audio']
  },
  {
    id: 'hp-spectre-x360-14',
    slug: 'hp-spectre-x360-14',
    name: 'HP Spectre x360 14 2-in-1',
    brand: 'HP',
    series: 'Spectre',
    categoryLabel: 'Flagship Ultra-Convertible',
    tagline: 'Ultra-refined 14-inch convertible with 2.8K variable 120Hz OLED.',
    basePrice: 1699,
    badge: 'Best Seller',
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      graphics: 'Intel Arc Graphics',
      memory: '32GB LPDDR5X 7467MHz',
      storage: '1TB PCIe Gen4 SSD',
      display: '14" 2.8K (2880x1800) OLED 120Hz Touch',
      battery: '68Wh Rapid Fast Charge',
      weight: '1.44 kg',
      chassis: 'Slate Blue CNC Aluminum'
    },
    keyFeatures: ['Includes Rechargeable Tilt Pen', 'Haptic Touchpad with Gesture Control']
  },
  {
    id: 'hp-omen-transcend-14',
    slug: 'hp-omen-transcend-14',
    name: 'HP OMEN Transcend 14',
    brand: 'HP',
    series: 'Omen',
    categoryLabel: 'Lightest 14-inch Studio Gaming',
    tagline: 'The worlds lightest 14-inch gaming rig with borderless pudding keycaps.',
    basePrice: 1799,
    badge: 'New',
    images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      graphics: 'NVIDIA RTX 4060 8GB GDDR6',
      memory: '16GB LPDDR5X 7467MHz',
      storage: '1TB PCIe Gen4 SSD',
      display: '14" 2.8K OLED 120Hz 0.2ms HDR 500',
      battery: '71Wh with 140W Type-C GaN',
      weight: '1.63 kg',
      chassis: 'Shadow Black Anodized Aluminum'
    },
    keyFeatures: ['Tempest Cooling Go Vapor Chamber', 'Translucent RGB Pudding Keycaps']
  },
  {
    id: 'hp-omen-transcend-16',
    slug: 'hp-omen-transcend-16',
    name: 'HP OMEN Transcend 16',
    brand: 'HP',
    series: 'Omen',
    categoryLabel: 'Enthusiast Creator Gaming',
    tagline: 'Mini-LED 240Hz 1180 nits screen engineered for competitive titles.',
    basePrice: 2399,
    badge: 'Flagship',
    images: ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core i9-14900HX (24-Core)',
      graphics: 'NVIDIA RTX 4080 12GB GDDR6',
      memory: '32GB DDR5 5600MHz',
      storage: '2TB PCIe Gen4 SSD',
      display: '16" 2.5K Mini-LED 240Hz 1180 Nits HDR',
      battery: '97Wh with 280W Smart Adapter',
      weight: '2.17 kg',
      chassis: 'Ceramic White Magnesium-Aluminum'
    },
    keyFeatures: ['Mini-LED Local Dimming Zones', 'Omen Gaming Hub Undervolting']
  },
  {
    id: 'hp-omen-17-flagship',
    slug: 'hp-omen-17',
    name: 'HP OMEN 17 Flagship Gaming',
    brand: 'HP',
    series: 'Omen',
    categoryLabel: 'Extreme Desktop Replacement',
    tagline: 'Maximum TGP graphics with optical-mechanical per-key RGB switches.',
    basePrice: 2899,
    badge: 'Top Tier',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core i9-14900HX',
      graphics: 'NVIDIA RTX 4090 16GB GDDR6 (175W)',
      memory: '32GB DDR5 5600MHz (Up to 64GB)',
      storage: '2TB PCIe Gen4 NVMe SSD',
      display: '17.3" QHD 240Hz 3ms IPS G-SYNC',
      battery: '83Wh High Performance',
      weight: '2.78 kg',
      chassis: 'Shadow Black Anodized Body'
    },
    keyFeatures: ['Optical Mechanical Keyboard', 'OMEN Tempest 3-Sided Vented Cooling']
  },
  {
    id: 'hp-victus-16-gaming',
    slug: 'hp-victus-16',
    name: 'HP Victus 16 Gaming',
    brand: 'HP',
    series: 'Victus',
    categoryLabel: 'High-Value Commercial Gaming',
    tagline: 'Reliable thermal architecture for esports and daily university workflows.',
    basePrice: 1049,
    badge: 'Best Seller',
    images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'AMD Ryzen 7 8845HS (8-Core 5.1GHz)',
      graphics: 'NVIDIA RTX 4060 8GB GDDR6',
      memory: '16GB DDR5 5600MHz',
      storage: '1TB M.2 NVMe SSD',
      display: '16.1" FHD 144Hz IPS 100% sRGB',
      battery: '70Wh Fast Charge',
      weight: '2.31 kg',
      chassis: 'Mica Silver Polymer'
    },
    keyFeatures: ['OMEN Dynamic Power Scaling', 'Dual Array Noise-Cancelling Mics']
  },
  {
    id: 'hp-envy-x360-16',
    slug: 'hp-envy-x360-16',
    name: 'HP Envy x360 16 2-in-1',
    brand: 'HP',
    series: 'Envy',
    categoryLabel: 'Creative Multi-Mode Studio',
    tagline: 'Versatile 2-in-1 touchscreen with dedicated NPU coprocessor keys.',
    basePrice: 1299,
    badge: 'New',
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155U',
      graphics: 'Intel Graphics',
      memory: '16GB LPDDR5X',
      storage: '1TB PCIe Gen4 SSD',
      display: '16" 2K (1920x1200) Touch IPS 400 Nits',
      battery: '68Wh (Up to 14.5 hours)',
      weight: '1.91 kg',
      chassis: 'Glacier Silver Recycled Aluminum'
    },
    keyFeatures: ['Manual Camera Privacy Switch', '5MP IR Auto-Tracking Camera']
  },
  {
    id: 'hp-envy-17-studio',
    slug: 'hp-envy-17',
    name: 'HP Envy 17 Studio Rig',
    brand: 'HP',
    series: 'Envy',
    categoryLabel: 'Large-Format Desktop Alternative',
    tagline: 'Expansive 17.3-inch 4K calibrated canvas for video editors and architects.',
    basePrice: 1549,
    badge: 'Top Tier',
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 155H',
      graphics: 'NVIDIA RTX 4050 6GB GDDR6',
      memory: '32GB DDR5 5600MHz',
      storage: '1TB PCIe Gen4 SSD',
      display: '17.3" 4K UHD IPS 100% DCI-P3 400 Nits',
      battery: '83Wh High Capacity',
      weight: '2.52 kg',
      chassis: 'Natural Silver Aluminum'
    },
    keyFeatures: ['Full-Size Numeric Keypad', 'HP QuickDrop Wireless Transfer']
  },
  {
    id: 'hp-elitebook-1040-g11',
    slug: 'hp-elitebook-1040-g11',
    name: 'HP EliteBook 1040 G11 Enterprise',
    brand: 'HP',
    series: 'EliteBook',
    categoryLabel: 'Executive Enterprise Ultrabook',
    tagline: 'Military-grade ruggedness paired with HP Sure Start self-healing BIOS.',
    basePrice: 1999,
    badge: 'Flagship',
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core Ultra 7 165H vPro',
      graphics: 'Intel Arc Graphics',
      memory: '32GB LPDDR5X 7500MHz',
      storage: '1TB Opal2 Self-Encrypting SSD',
      display: '14" 2.8K OLED 120Hz 500 Nits Low Blue Light',
      battery: '68Wh Fast Charge 50% in 30min',
      weight: '1.18 kg',
      chassis: 'CNC Magnesium Alloy Chassis'
    },
    keyFeatures: ['HP Wolf Pro Security Suite', 'HP Sure View Reflect Privacy Display']
  },
  {
    id: 'hp-zbook-studio-g10',
    slug: 'hp-zbook-studio-g10',
    name: 'HP ZBook Studio G10 Workstation',
    brand: 'HP',
    series: 'ZBook',
    categoryLabel: 'ISV Professional Rig',
    tagline: 'Certified workstation designed for real-time 3D simulation and DaVinci resolve.',
    basePrice: 3599,
    badge: 'Top Tier',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80'],
    inStock: true,
    specs: {
      processor: 'Intel Core i9-13900H (14-Core 5.4GHz)',
      graphics: 'NVIDIA RTX 4000 Ada Generation 12GB',
      memory: '64GB DDR5 5600MHz',
      storage: '2TB Z Turbo NVMe PCIe SSD',
      display: '16" HP DreamColor 4K OLED 120Hz 500 Nits',
      battery: '86Wh Long Life Battery',
      weight: '1.73 kg',
      chassis: 'Vapor-Honed Space Silver Aluminum'
    },
    keyFeatures: ['HP DreamColor 100% DCI-P3 Factory Calibrated', 'Z VaporForce Thermal Management']
  }
];

export const LAPTOP_PRODUCTS: LaptopProduct[] = RAW_LAPTOPS.map((laptop) => ({
  ...laptop,
  category: laptop.categoryLabel,
  description: laptop.tagline,
  featuredImage: laptop.images[0],
  galleryImages: [
    laptop.images[0],
    laptop.images[0],
    laptop.images[0],
    laptop.images[0]
  ],
  monthlyFinancingPrice: Math.round(laptop.basePrice / 24),
  rating: 4.9,
  reviewsCount: 128,
  badges: laptop.badge ? [laptop.badge] : ['Flagship'],
  benchmarkScore: {
    name: 'Geekbench 6 Multi-Core',
    score: '17,800'
  },
  filterMeta: {
    seriesGroup: laptop.series,
    displaySizeGroup: laptop.specs.display.includes('14') ? '14-inch' : '16-inch',
    memoryGroup: laptop.specs.memory.includes('64') ? '64GB' : '32GB Unified',
    gpuTierGroup: laptop.specs.graphics.includes('4090') || laptop.specs.graphics.includes('4080')
      ? 'NVIDIA RTX 50-Series'
      : 'NVIDIA RTX'
  },
  specs: {
    ...laptop.specs,
    cpu: laptop.specs.processor,
    gpu: laptop.specs.graphics,
    ram: laptop.specs.memory,
    ports: ['Thunderbolt 4 / USB4 Type-C', 'USB-C DisplayPort', 'HDMI 2.1', '3.5mm Headphone Jack'],
    cpuClock: 'Up to 5.4 GHz Turbo',
    memoryBandwidth: '7467 MT/s High-Speed',
    displayPeakNits: '500 Nits HDR',
    coolingTech: 'Vapor Chamber Dual Opposing Fans',
    dimensions: '358 x 240 x 18 mm',
    rapidCharge: 'Fast Charge 80% in 60 min',
    displayInches: laptop.specs.display.includes('14') ? 14 : laptop.specs.display.includes('17') || laptop.specs.display.includes('18') ? 17 : 16,
    performanceIndex: 96
  }
}));

export const TK_LAPTOPS = LAPTOP_PRODUCTS;

export function getAllLaptops(): LaptopProduct[] {
  return LAPTOP_PRODUCTS;
}

export function getLaptopsByBrand(brand: 'Dell' | 'HP' | 'Apple'): LaptopProduct[] {
  return LAPTOP_PRODUCTS.filter((laptop) => laptop.brand === brand);
}

export function getLaptopBySlug(slug: string): LaptopProduct | undefined {
  return LAPTOP_PRODUCTS.find((laptop) => laptop.slug === slug);
}
