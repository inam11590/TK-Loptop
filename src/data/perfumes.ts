import { PerfumeProduct } from '@/types/product';

export const PERFUME_PRODUCTS: PerfumeProduct[] = [
  {
    id: 'tk-royal-oud-noir',
    slug: 'tk-royal-oud-noir',
    name: 'TK Royal Oud Noir',
    collection: 'TK Royal Oud',
    tagline: 'A majestic fusion of Cambodian aged agarwood, smoky amber, and crushed black cardamom.',
    volume: '100ml / 3.4 fl. oz.',
    basePrice: 280,
    badge: 'Flagship' as any,
    concentration: 'Parfum Extrait',
    scentFamily: 'Smoky Woody Oriental',
    notes: {
      top: ['Black Cardamom', 'Bergamot Zest', 'Pink Pepper'],
      heart: ['Taif Rose', 'Smoked Leather', 'Incense Resin'],
      base: ['Rare Cambodian Oud', 'Bourbon Vanilla', 'Atlas Cedarwood']
    },
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    description: 'Mastercrafted for black-tie galas and executive presence. Extrait concentration ensures a commanding sillage lasting over 18 hours.'
  },
  {
    id: 'tk-amber-imperiale',
    slug: 'tk-amber-imperiale',
    name: 'TK Amber Impériale',
    collection: 'TK Fresh Amber',
    tagline: 'Warm golden amber crystalline resin infused with French lavender and tonka bean.',
    volume: '100ml / 3.4 fl. oz.',
    basePrice: 240,
    badge: 'Best Seller',
    concentration: 'Eau de Parfum',
    scentFamily: 'Golden Oriental Amber',
    notes: {
      top: ['Calabrian Bergamot', 'French Lavender', 'Coriander'],
      heart: ['Amber Resin', 'Vanilla Orchid', 'Roasted Tonka Bean'],
      base: ['Sandalwood', 'Benzoin Siam', 'White Musk']
    },
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    description: 'An intoxicating, sensual veil of warmth. Radiates an aura of quiet luxury, confidence, and effortless charm.'
  },
  {
    id: 'tk-platinum-vetiver',
    slug: 'tk-platinum-vetiver',
    name: 'TK Platinum Vétiver',
    collection: 'TK Signature',
    tagline: 'Earthy Haitian vetiver sharpened with iced grapefruit and pink peppercorn.',
    volume: '100ml / 3.4 fl. oz.',
    basePrice: 220,
    badge: 'New Release',
    concentration: 'Eau de Parfum',
    scentFamily: 'Crisp Aromatic Woody',
    notes: {
      top: ['Iced Grapefruit', 'Bitter Orange', 'Cardamom'],
      heart: ['Pink Peppercorn', 'Geranium', 'Clary Sage'],
      base: ['Haitian Vetiver', 'Oakmoss', 'Grey Amber']
    },
    images: [
      'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    description: 'The defining scent for day-to-evening transitions. Razor-sharp clean aromatics grounded in rich roots and mineral accords.'
  }
];

export function getAllPerfumes(): PerfumeProduct[] {
  return PERFUME_PRODUCTS;
}

export function getPerfumeBySlug(slug: string): PerfumeProduct | undefined {
  return PERFUME_PRODUCTS.find((perfume) => perfume.slug === slug);
}
