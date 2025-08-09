export const collections = [
  {
    id: '1',
    name: 'Fresh & Uplifting Scents',
    description: 'Energizing fragrances that awaken your senses and brighten your day',
    image: 'https://images.pexels.com/photos/6985046/pexels-photo-6985046.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'fresh-uplifting-scents'
  },
  {
    id: '2',
    name: 'Warm & Cozy',
    description: 'Comforting scents that create a cozy atmosphere in your home',
    image: 'https://images.pexels.com/photos/4021870/pexels-photo-4021870.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'warm-cozy'
  },
  {
    id: '3',
    name: 'Signature Collection',
    description: 'Our most beloved and exclusive candle fragrances',
    image: 'https://images.pexels.com/photos/4021876/pexels-photo-4021876.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'signature-collection'
  },
  {
    id: '4',
    name: 'Seasonal Favorites',
    description: 'Limited edition scents that capture the essence of each season',
    image: 'https://images.pexels.com/photos/4021877/pexels-photo-4021877.jpeg?auto=compress&cs=tinysrgb&w=800',
    slug: 'seasonal-favorites'
  }
];

export const products = [
  {
    id: '1',
    name: 'Basil Lemongrass',
    price: 32.00,
    originalPrice: 38.00,
    images: [
      'https://images.pexels.com/photos/6985046/pexels-photo-6985046.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4021883/pexels-photo-4021883.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4021905/pexels-photo-4021905.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Fresh and invigorating blend of basil and lemongrass that energizes your space.',
    longDescription: 'Our Basil Lemongrass candle combines the herbaceous freshness of basil with the citrusy brightness of lemongrass, creating an uplifting and energizing atmosphere. Hand-poured with premium soy wax and natural essential oils, this candle burns cleanly for up to 50 hours. Perfect for morning meditation, yoga practice, or whenever you need a natural energy boost.',
    category: 'Fresh Collection',
    collection: 'fresh-uplifting-scents',
    scent: 'Basil, Lemongrass, Mint',
    burnTime: '45-50 hours',
    size: '6 oz',
    weight: '170g',
    inStock: true,
    featured: true,
    ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
    careInstructions: {
      firstBurn: 'Burn for 2-3 hours to create an even melt pool',
      trimWick: 'Trim wick to 1/4 inch before each use',
      safety: 'Never leave candle unattended. Keep away from children and pets.'
    }
  },
  {
    id: '2',
    name: 'Ocean Breeze',
    price: 28.00,
    images: [
      'https://images.pexels.com/photos/6985046/pexels-photo-6985046.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4021871/pexels-photo-4021871.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Fresh and invigorating scent that captures the essence of a seaside morning.',
    longDescription: 'Transport yourself to a peaceful coastal morning with our Ocean Breeze candle. This refreshing blend captures the essence of sea salt air, ocean mist, and coastal winds. The clean, crisp fragrance creates a serene atmosphere that promotes relaxation and mental clarity.',
    category: 'Fresh Collection',
    collection: 'fresh-uplifting-scents',
    scent: 'Sea Salt, Eucalyptus, Mint',
    burnTime: '40-45 hours',
    size: '8 oz',
    weight: '227g',
    inStock: true,
    featured: true,
    ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
    careInstructions: {
      firstBurn: 'Burn for 2-3 hours to create an even melt pool',
      trimWick: 'Trim wick to 1/4 inch before each use',
      safety: 'Never leave candle unattended. Keep away from children and pets.'
    }
  },
  {
    id: '3',
    name: 'Vanilla Dreams',
    price: 30.00,
    images: [
      'https://images.pexels.com/photos/4021871/pexels-photo-4021871.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4021876/pexels-photo-4021876.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Rich Madagascar vanilla with warm amber notes. A comforting classic.',
    longDescription: 'Indulge in the luxurious warmth of our Vanilla Dreams candle. Made with authentic Madagascar vanilla and complemented by rich amber and cream notes, this candle creates a cozy, inviting atmosphere that feels like a warm embrace.',
    category: 'Warm Collection',
    collection: 'warm-cozy',
    scent: 'Vanilla, Amber, Cream',
    burnTime: '50-55 hours',
    size: '8 oz',
    weight: '227g',
    inStock: true,
    featured: false,
    ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
    careInstructions: {
      firstBurn: 'Burn for 2-3 hours to create an even melt pool',
      trimWick: 'Trim wick to 1/4 inch before each use',
      safety: 'Never leave candle unattended. Keep away from children and pets.'
    }
  },
  {
    id: '4',
    name: 'Forest Walk',
    price: 35.00,
    images: [
      'https://images.pexels.com/photos/4021905/pexels-photo-4021905.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4021870/pexels-photo-4021870.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Earthy blend of cedar, pine, and moss. Brings the outdoors inside.',
    longDescription: 'Experience the tranquility of a forest walk with this grounding blend of cedar, pine, and moss. This earthy candle brings the calming essence of nature indoors, perfect for creating a peaceful sanctuary in your home.',
    category: 'Nature Collection',
    collection: 'signature-collection',
    scent: 'Cedar, Pine, Moss',
    burnTime: '45-50 hours',
    size: '8 oz',
    weight: '227g',
    inStock: true,
    featured: true,
    ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
    careInstructions: {
      firstBurn: 'Burn for 2-3 hours to create an even melt pool',
      trimWick: 'Trim wick to 1/4 inch before each use',
      safety: 'Never leave candle unattended. Keep away from children and pets.'
    }
  },
  {
    id: '5',
    name: 'Citrus Sunrise',
    price: 26.00,
    images: [
      'https://images.pexels.com/photos/4021883/pexels-photo-4021883.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Energizing blend of orange, lemon, and grapefruit. Perfect for morning motivation.',
    longDescription: 'Start your day with the invigorating energy of our Citrus Sunrise candle. This vibrant blend of fresh orange, zesty lemon, and tangy grapefruit creates an uplifting atmosphere that energizes and motivates.',
    category: 'Fresh Collection',
    collection: 'fresh-uplifting-scents',
    scent: 'Orange, Lemon, Grapefruit',
    burnTime: '35-40 hours',
    size: '6 oz',
    weight: '170g',
    inStock: true,
    featured: false,
    ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
    careInstructions: {
      firstBurn: 'Burn for 2-3 hours to create an even melt pool',
      trimWick: 'Trim wick to 1/4 inch before each use',
      safety: 'Never leave candle unattended. Keep away from children and pets.'
    }
  },
  {
    id: '6',
    name: 'Cozy Cabin',
    price: 34.00,
    images: [
      'https://images.pexels.com/photos/4021870/pexels-photo-4021870.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Warm and inviting with notes of firewood, cinnamon, and apple.',
    longDescription: 'Embrace the warmth of a cozy cabin with this inviting blend of smoky firewood, spicy cinnamon, and crisp apple. Perfect for creating a comfortable, homey atmosphere during cooler months.',
    category: 'Seasonal Collection',
    collection: 'seasonal-favorites',
    scent: 'Firewood, Cinnamon, Apple',
    burnTime: '48-52 hours',
    size: '8 oz',
    weight: '227g',
    inStock: false,
    featured: false,
    ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
    careInstructions: {
      firstBurn: 'Burn for 2-3 hours to create an even melt pool',
      trimWick: 'Trim wick to 1/4 inch before each use',
      safety: 'Never leave candle unattended. Keep away from children and pets.'
    }
  },
  {
    id: '7',
    name: 'Lavender Fields',
    price: 29.00,
    images: [
      'https://images.pexels.com/photos/4021872/pexels-photo-4021872.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Calming French lavender with subtle hints of chamomile. Perfect for relaxation.',
    longDescription: 'Unwind with the soothing essence of our Lavender Fields candle. This calming blend of French lavender and gentle chamomile creates a peaceful atmosphere perfect for relaxation, meditation, or preparing for restful sleep.',
    category: 'Wellness Collection',
    collection: 'signature-collection',
    scent: 'Lavender, Chamomile, Bergamot',
    burnTime: '42-47 hours',
    size: '8 oz',
    weight: '227g',
    inStock: true,
    featured: true,
    ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
    careInstructions: {
      firstBurn: 'Burn for 2-3 hours to create an even melt pool',
      trimWick: 'Trim wick to 1/4 inch before each use',
      safety: 'Never leave candle unattended. Keep away from children and pets.'
    }
  },
  {
    id: '8',
    name: 'Spiced Pear',
    price: 31.00,
    images: [
      'https://images.pexels.com/photos/4021877/pexels-photo-4021877.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Sweet pear with warm spices of cinnamon and nutmeg. A cozy autumn favorite.',
    longDescription: 'Celebrate the warmth of autumn with our Spiced Pear candle. This delightful blend combines sweet, juicy pear with warming spices of cinnamon and nutmeg, creating a cozy atmosphere that embodies the comfort of fall.',
    category: 'Seasonal Collection',
    collection: 'seasonal-favorites',
    scent: 'Pear, Cinnamon, Nutmeg',
    burnTime: '44-49 hours',
    size: '8 oz',
    weight: '227g',
    inStock: true,
    featured: false,
    ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
    careInstructions: {
      firstBurn: 'Burn for 2-3 hours to create an even melt pool',
      trimWick: 'Trim wick to 1/4 inch before each use',
      safety: 'Never leave candle unattended. Keep away from children and pets.'
    }
  }
];