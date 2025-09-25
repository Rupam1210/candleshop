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
  
[
  {
    // "name": "Ocean Aroma Small",
    // "description": "Refreshing ocean breeze scent in a compact size.",
    // "longDescription": "Our Ocean Aroma Small Candle captures the invigorating essence of sea breeze and driftwood in a handy 30 gm size.",
    // "price": 119,
    // "originalPrice": 150,
    // "images": [
    //   {
    //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787194/voslihcd9kmbmbcw9ijg.jpg",
    //     "alt": "Ocean Aroma Small  ",
    //     "isPrimary": true
    //   }
    // ],
    // "category": "Coastal Escape Collection",
    // "collection": { "$oid": "68971063272a5f5a237cac09" },
    // "scent": "Sea salt and fresh breeze",
    // "burnTime": "15+",
    // "size": "30 gm",
    // "weight": "30 gm",
    // "ingredients": ["Soy Wax", "Fragrance Oils"],
    // "careInstructions": { "trimWick": "Avoid burning near strong drafts." },
    // "inStock": true,
    // "stockQuantity": 0,
    // "featured": false,
    // "rating": {},
    // "reviews": [],
    // "tags": [],
    // "isActive": true,
    // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "slug": "ocean-aroma-small"
  },
  {
    // "name": "Ocean Aroma Big",
    // "description": "Large candle with fresh oceanic fragrance.",
    // "longDescription": "The Ocean Aroma Big Candle is perfect for creating a refreshing coastal escape in your living room or bedroom.",
    // "price": 319,
    // "originalPrice": 350,
    // "images": [
    //   {
    //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787391/ofwuta5gmguaoowhperv.jpg",
    //     "alt": "Ocean Aroma Big image 1",
    //     "isPrimary": true
    //   }
    // ],
    // "category": "Coastal Escape Collection",
    // "collection": { "$oid": "68971063272a5f5a237cac09" },
    // "scent": "Ocean breeze and citrus notes",
    // "burnTime": "50+",
    // "size": "160 gm",
    // "weight": "160 gm",
    // "ingredients": ["Soy Wax", "Sea Salt Extract", "Cotton Wick"],
    // "careInstructions": { "trimWick": "Keep wick centered and trimmed." },
    // "inStock": true,
    // "stockQuantity": 0,
    // "featured": false,
    // "rating": {},
    // "reviews": [],
    // "tags": [],
    // "isActive": true,
    // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "slug": "ocean-aroma-big"
  },
  {
    // "name": "Heart Gel Candle",
    // "description": "Romantic gel candle shaped like a heart.",
    // "longDescription": "Our Heart Gel Candle is a translucent beauty, perfect for gifting and celebrating special moments of love.",
    // "price": 319,
    // "originalPrice": 350,
    // "images": [
    //   {
    //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787514/ughpmzunn9yhkhlc8o0w.jpg",
    //     "alt": "Heart Gel Candle image 1",
    //     "isPrimary": true
    //   }
    // ],
    // "category": "Heart & Romantic Collection",
    // "collection": { "$oid": "689483dbacead912715b338c" },
    // "scent": "Rose and vanilla blend",
    // "burnTime": "40+",
    // "size": "200 gm",
    // "weight": "200 gm",
    // "ingredients": ["Gel Wax", "Fragrance Oils"],
    // "careInstructions": { "trimWick": "Do not burn near flammable materials." },
    // "inStock": true,
    // "stockQuantity": 0,
    // "featured": false,
    // "rating": {},
    // "reviews": [],
    // "tags": [],
    // "isActive": true,
    // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "slug": "heart-gel-candle"
  },
  {
  //   "name": "Yankee Jar Heart Gel Candle",
  //   "description": "Compact jar candle with a soothing scent.",
  //   "longDescription": "Our Yankee Jar Heart Gel Candle is designed for both style and fragrance, giving a chic look and delightful aroma.",
  //   "price": 199,
  //   "originalPrice": 220,
  //  "images": [
  //     {
  //       "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787557/aqz6nntq7ip32y9lugsw.jpg",
  //       "alt": "Yankee Jar Heart Gel  ",
  //       "isPrimary": true
  //     }
  //   ],
  //   "category": "Jar & Globe Collection",
  //   "collection": { "$oid": "68d42233c16c423c23cab59c" },
  //   "scent": "Lavender and rosewood",
  //   "burnTime": "30+",
  //   "size": "90 gm",
  //   "weight": "90 gm",
  //   "ingredients": ["Soy Wax", "Essential Oils"],
  //   "careInstructions": { "trimWick": "Avoid long burns over 4 hours." },
  //   "inStock": true,
  //   "stockQuantity": 0,
  //   "featured": false,
  //   "rating": {},
  //   "reviews": [],
  //   "tags": [],
  //   "isActive": true,
  //   "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
  //   "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
  //   "slug": "yankee-jar-heart-gel-candle"
  },
  {
    // "name": "Peony Candle",
    // "description": "Floral candle with delicate peony fragrance.",
    // "longDescription": "The Peony Candle is a tribute to spring blooms, filling your space with floral freshness.",
    // "price": 99,
    // "originalPrice": 120,
    // "images": [
    //   {
    //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787608/yzfojkmvorg29iulabki.jpg",
    //     "alt": "Peony Candle image 1",
    //     "isPrimary": true
    //   }
    // ],
    // "category": "Rose & Floral Collection",
    // "collection": { "$oid": "689302b58c6d65ed2b433a43" },
    // "scent": "Fresh peony petals",
    // "burnTime": "20+",
    // "size": "70 gm",
    // "weight": "70 gm",
    // "ingredients": ["Soy Wax", "Fragrance Oils"],
    // "careInstructions": { "trimWick": "Do not leave unattended." },
    // "inStock": true,
    // "stockQuantity": 0,
    // "featured": false,
    // "rating": {},
    // "reviews": [],
    // "tags": [],
    // "isActive": true,
    // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "slug": "peony-candle"
  },
  {
    // "name": "Snow Candle",
    // "description": "Soft snowy white candle with winter scent.",
    // "longDescription": "The Snow Candle creates a cozy winter wonderland atmosphere, making it perfect for the holiday season.",
    // "price": 119,
    // "originalPrice": 140,
    // "images": [
    //   {
    //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758782764/qqh87cgyycujh5qtbgu5.jpg",
    //     "alt": "Snow Candle image 1",
    //     "isPrimary": true
    //   }
    // ],
    // "category": "Unique & Specialty Candles",
    // "collection": { "$oid": "68d421d9c16c423c23cab57c" },
    // "scent": "Mint and pine",
    // "burnTime": "25+",
    // "size": "100 gm",
    // "weight": "100 gm",
    // "ingredients": ["Soy Wax", "Pine Oil"],
    // "careInstructions": { "trimWick": "Keep away from drafts." },
    // "inStock": true,
    // "stockQuantity": 0,
    // "featured": false,
    // "rating": {},
    // "reviews": [],
    // "tags": [],
    // "isActive": true,
    // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "slug": "snow-candle"
  },
  {
  //   "name": "Daisy Candle",
  //   "description": "A small cute daisy-shaped candle, perfect for decoration and gifting.",
  //   "longDescription": "This Daisy Candle brings a touch of nature-inspired beauty to your home. Handcrafted with care, it provides a soft glow and adds charm to any corner.",
  //   "price": 80,
  //   "originalPrice": 100,
  //  "images": [
  //     {
  //       "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787330/jujuczxuhkqzsdgecfd5.jpg",
  //       "alt": "Daisy Candle image 1",
  //       "isPrimary": true
  //     }
  //   ],
  //   "category": "Floral Collection",
  //   "collection": { "$oid": "689483dbacead912715b338c" },
  //   "scent": "Mild floral fragrance",
  //   "burnTime": "10+",
  //   "size": "2.5 cm",
  //   "weight": "25 gm",
  //   "ingredients": [],
  //   "careInstructions": {},
  //   "inStock": true,
  //   "stockQuantity": 0,
  //   "featured": false,
  //   "rating": {},
  //   "reviews": [],
  //   "tags": [],
  //   "isActive": true,
  //   "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
  //   "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
  //   "slug": "daisy-candle"
  },
  {
  //   "name": "Big Bubble Candle",
  //   "description": "Trendy big bubble cube candle, modern décor favorite.",
  //   "longDescription": "The Big Bubble Candle features a playful cube design that instantly elevates your décor. Its clean burn makes it perfect for cozy evenings or minimalist spaces.",
  //   "price": 159,
  //   "originalPrice": 180,
  //  "images": [
  //     {
  //       "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787671/cavccj4pqf2xehapip75.jpg",
  //       "alt": "Big Bubble Candle image 1",
  //       "isPrimary": true
  //     }
  //   ],
  //   "category": "Trendy Collection",
  //   "collection": { "$oid": "689483dbacead912715b338c" },
  //   "scent": "Unscented minimalist style",
  //   "burnTime": "20+",
  //   "size": "6 × 6 × 6 cm",
  //   "weight": "130 gm",
  //   "ingredients": [],
  //   "careInstructions": {},
  //   "inStock": true,
  //   "stockQuantity": 0,
  //   "featured": false,
  //   "rating": {},
  //   "reviews": [],
  //   "tags": [],
  //   "isActive": true,
  //   "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
  //   "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
  //   "slug": "big-bubble-candle"
  },
  {
    "name": "Small Bubble Candle",
    "description": "A compact bubble cube candle for modern aesthetics.",
    "longDescription": "The Small Bubble Candle packs modern charm in a smaller design. Ideal for desks, shelves, or as part of a candle arrangement.",
    "price": 49,
    "originalPrice": 70,
    "images": [
      {
        "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758782587/hb7g0q3eojksvqzalwyu.jpg",
        "alt": "Pillar Candle image 1",
        "isPrimary": true
      }
    ],
    "category": "Trendy Collection",
    "collection": { "$oid": "689483dbacead912715b338c" },
    "scent": "Unscented minimalist style",
    "burnTime": "8+",
    "size": "3.5 × 3.5 × 3.5 cm",
    "weight": "36 gm",
    "ingredients": [],
    "careInstructions": {},
    "inStock": true,
    "stockQuantity": 0,
    "featured": false,
    "rating": {},
    "reviews": [],
    "tags": [],
    "isActive": true,
    "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    "slug": "small-bubble-candle"
  }
]
[
  {
    // "name": "Heart Bubble Candle",
    // "description": "Heart-shaped bubble cube, perfect for gifting.",
    // "longDescription": "This Heart Bubble Candle combines the cuteness of bubbles with a heart shape, making it an ideal gift for loved ones on special occasions.",
    // "price": 149,
    // "originalPrice": 170,
    // "images": [
    //   {
    //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787731/b3hbybqlm3y0xqwexzqj.jpg",
    //     "alt": "Heart Bubble   1",
    //     "isPrimary": true
    //   }
    // ],
    // "category": "Romantic Collection",
    // "collection": { "$oid": "689483dbacead912715b338c" },
    // "scent": "Light vanilla fragrance",
    // "burnTime": "15+",
    // "size": "5.5 × 5.5 × 5.5 cm",
    // "weight": "120 gm",
    // "ingredients": [],
    // "careInstructions": {},
    // "inStock": true,
    // "stockQuantity": 0,
    // "featured": false,
    // "rating": {},
    // "reviews": [],
    // "tags": [],
    // "isActive": true,
    // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "slug": "heart-bubble-candle"
  },
  {
    // "name": "Heart Rose Candle",
    // "description": "Heart-shaped candle with a rose finish.",
    // "longDescription": "The Heart Rose Candle is delicately crafted to resemble a rose inside a heart. Ideal for romantic dinners, anniversaries, or Valentine’s Day.",
    // "price": 59,
    // "originalPrice": 80,
    // "images": [
    //   {
    //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787811/p7qkmf391ele9hhqcdi4.jpg",
    //     "alt": "Heart Rose Candle image 1",
    //     "isPrimary": true
    //   }
    // ],
    // "category": "Romantic Collection",
    // "collection": { "$oid": "689483dbacead912715b338c" },
    // "scent": "Rose essence",
    // "burnTime": "12+",
    // "size": "6 × 4.5 × 5 cm",
    // "weight": "38 gm",
    // "ingredients": [],
    // "careInstructions": {},
    // "inStock": true,
    // "stockQuantity": 0,
    // "featured": false,
    // "rating": {},
    // "reviews": [],
    // "tags": [],
    // "isActive": true,
    // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "slug": "heart-rose-candle"
  },
  {
    // "name": "Leafy Heart Rose Candle",
    // "description": "A leafy twist on a heart-shaped rose candle.",
    // "longDescription": "Blending nature with romance, the Leafy Heart Rose Candle is a leafy-textured heart candle that adds charm to your collection.",
    // "price": 59,
    // "originalPrice": 80,
    // "images": [
    //   {
    //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758788554/rw79fd17rfscfusr9q3i.jpg",
    //     "alt": "Leafy Heart Rose 1",
    //     "isPrimary": true
    //   }
    // ],
    // "category": "Romantic Collection",
    // "collection": { "$oid": "689483dbacead912715b338c" },
    // "scent": "Fresh rose fragrance",
    // "burnTime": "12+",
    // "size": "5 × 5 × 5 cm",
    // "weight": "38 gm",
    // "ingredients": [],
    // "careInstructions": {},
    // "inStock": true,
    // "stockQuantity": 0,
    // "featured": false,
    // "rating": {},
    // "reviews": [],
    // "tags": [],
    // "isActive": true,
    // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "slug": "leafy-heart-rose-candle"
  },
  // {
  //   "name": "Lotus Bud Candle",
  //   "description": "A lotus bud-shaped candle for peaceful vibes.",
  //   "longDescription": "This Lotus Bud Candle symbolizes purity and calmness. Handcrafted to perfection, it’s an excellent choice for meditation and relaxation.",
  //   "price": 89,
  //   "originalPrice": 110,
  //   "images": [
  //     {
  //       "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758782530/qnozwey4o4pwwdvwwpbw.jpg",
  //       "alt": "Lotus Bud Candle image 1",
  //       "isPrimary": true
  //     }
  //   ],
  //   "category": "Spiritual Collection",
  //   "collection": { "$oid": "689483dbacead912715b338c" },
  //   "scent": "Lotus essence",
  //   "burnTime": "12+",
  //   "size": "6.3 × 6.3 × 10 cm",
  //   "weight": "68 gm",
  //   "ingredients": [],
  //   "careInstructions": {},
  //   "inStock": true,
  //   "stockQuantity": 0,
  //   "featured": false,
  //   "rating": {},
  //   "reviews": [],
  //   "tags": [],
  //   "isActive": true,
  //   "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
  //   "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
  //   "slug": "lotus-bud-candle"
  // },
  {
    // "name": "Pillar Candle",
    // "description": "Classic tall pillar candle, versatile for all occasions.",
    // "longDescription": "The Pillar Candle is a timeless design suitable for daily use, rituals, or as a decorative centerpiece. Its slow burn and elegant form make it a must-have for every candle lover.",
    // "price": 349,
    // "originalPrice": 400,
    // "images": [
    //   {
    //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758787877/ygcay3a0qko88sw8cauu.jpg",
    //     "alt": "Pillar Candle image 1",
    //     "isPrimary": true
    //   }
    // ],
    // "category": "Classic Collection",
    // "collection": { "$oid": "689483dbacead912715b338c" },
    // "scent": "Unscented",
    // "burnTime": "60+",
    // "size": "20 × 7 cm",
    // "weight": "500 gm",
    // "ingredients": [],
    // "careInstructions": {},
    // "inStock": true,
    // "stockQuantity": 0,
    // "featured": false,
    // "rating": {},
    // "reviews": [],
    // "tags": [],
    // "isActive": true,
    // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
    // "slug": "pillar-candle"
  }
]
{
  // "name": "Peony Bud Candle",
  // "description": "Floral candle inspired by delicate peony buds.",
  // "longDescription": "The Peony Bud Candle captures the soft fragrance and charm of budding peonies, perfect for adding a floral touch to any room.",
  // "price": 70,
  // "originalPrice": 130,
  // "images": [
  //   {
  //     "url": "https://res.cloudinary.com/dhxqbvevo/image/upload/v1758788891/a0k1xlnc7tbnljsnufmh.jpg",
  //     "alt": "Peony Bud Candle image 1",
  //     "isPrimary": true
  //   }
  // ],
  // "category": "Rose & Floral Collection",
  // "collection": { "$oid": "689302b58c6d65ed2b433a43" },
  // "scent": "Fresh peony petals",
  // "burnTime": "20+",
  // "size": "3x4.5x3 cm",
  // "weight": "40gm ",
  // "ingredients": ["Soy Wax", "Fragrance Oils"],
  // "careInstructions": { "trimWick": "Keep wick trimmed to 0.5 cm for best burn." },
  // "inStock": true,
  // "stockQuantity": 0,
  // "featured": false,
  // "rating": {},
  // "reviews": [],
  // "tags": ["floral", "peony", "decor"],
  // "isActive": true,
  // "createdAt": { "$date": "2025-09-25T12:00:00.000Z" },
  // "updatedAt": { "$date": "2025-09-25T12:00:00.000Z" },
  // "slug": "peony-bud-candle"
}

 