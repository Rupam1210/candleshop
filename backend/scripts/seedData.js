const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Collection = require('../models/Collection');
const Product = require('../models/Product');

// Load environment variables
dotenv.config();

// Sample data
const collections = [
  {
    name: 'Fresh & Uplifting Scents',
    description: 'Energizing fragrances that awaken your senses and brighten your day',
    image: {
      url: 'https://images.pexels.com/photos/6985046/pexels-photo-6985046.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Fresh candles collection'
    }
  },
  {
    name: 'Warm & Cozy',
    description: 'Comforting scents that create a cozy atmosphere in your home',
    image: {
      url: 'https://images.pexels.com/photos/4021870/pexels-photo-4021870.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Warm candles collection'
    }
  },
  {
    name: 'Signature Collection',
    description: 'Our most beloved and exclusive candle fragrances',
    image: {
      url: 'https://images.pexels.com/photos/4021876/pexels-photo-4021876.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Signature candles collection'
    }
  },
  {
    name: 'Seasonal Favorites',
    description: 'Limited edition scents that capture the essence of each season',
    image: {
      url: 'https://images.pexels.com/photos/4021877/pexels-photo-4021877.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Seasonal candles collection'
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/candle-shop');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Collection.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@candleshop.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('👤 Created admin user');

    // Create collections
    const createdCollections = await Collection.insertMany(collections);
    console.log('📦 Created collections');

    // Create sample products
    const products = [
      {
        name: 'Basil Lemongrass',
        description: 'Fresh and invigorating blend of basil and lemongrass that energizes your space.',
        longDescription: 'Our Basil Lemongrass candle combines the herbaceous freshness of basil with the citrusy brightness of lemongrass, creating an uplifting and energizing atmosphere. Hand-poured with premium soy wax and natural essential oils, this candle burns cleanly for up to 50 hours.',
        price: 32.00,
        originalPrice: 38.00,
        images: [
          {
            url: 'https://images.pexels.com/photos/6985046/pexels-photo-6985046.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Basil Lemongrass candle',
            isPrimary: true
          }
        ],
        category: 'Fresh Collection',
        collection: createdCollections[0]._id,
        scent: 'Basil, Lemongrass, Mint',
        burnTime: '45-50 hours',
        size: '6 oz',
        weight: '170g',
        ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
        careInstructions: {
          firstBurn: 'Burn for 2-3 hours to create an even melt pool',
          trimWick: 'Trim wick to 1/4 inch before each use',
          safety: 'Never leave candle unattended. Keep away from children and pets.'
        },
        featured: true,
        inStock: true,
        stockQuantity: 25
      },
      {
        name: 'Ocean Breeze',
        description: 'Fresh and invigorating scent that captures the essence of a seaside morning.',
        longDescription: 'Transport yourself to a peaceful coastal morning with our Ocean Breeze candle. This refreshing blend captures the essence of sea salt air, ocean mist, and coastal winds.',
        price: 28.00,
        images: [
          {
            url: 'https://images.pexels.com/photos/4021871/pexels-photo-4021871.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Ocean Breeze candle',
            isPrimary: true
          }
        ],
        category: 'Fresh Collection',
        collection: createdCollections[0]._id,
        scent: 'Sea Salt, Eucalyptus, Mint',
        burnTime: '40-45 hours',
        size: '8 oz',
        weight: '227g',
        ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
        careInstructions: {
          firstBurn: 'Burn for 2-3 hours to create an even melt pool',
          trimWick: 'Trim wick to 1/4 inch before each use',
          safety: 'Never leave candle unattended. Keep away from children and pets.'
        },
        featured: true,
        inStock: true,
        stockQuantity: 30
      },
      {
        name: 'Vanilla Dreams',
        description: 'Rich Madagascar vanilla with warm amber notes. A comforting classic.',
        longDescription: 'Indulge in the luxurious warmth of our Vanilla Dreams candle. Made with authentic Madagascar vanilla and complemented by rich amber and cream notes.',
        price: 30.00,
        images: [
          {
            url: 'https://images.pexels.com/photos/4021876/pexels-photo-4021876.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Vanilla Dreams candle',
            isPrimary: true
          }
        ],
        category: 'Warm Collection',
        collection: createdCollections[1]._id,
        scent: 'Vanilla, Amber, Cream',
        burnTime: '50-55 hours',
        size: '8 oz',
        weight: '227g',
        ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
        careInstructions: {
          firstBurn: 'Burn for 2-3 hours to create an even melt pool',
          trimWick: 'Trim wick to 1/4 inch before each use',
          safety: 'Never leave candle unattended. Keep away from children and pets.'
        },
        featured: false,
        inStock: true,
        stockQuantity: 20
      },
      {
        name: 'Forest Walk',
        description: 'Earthy blend of cedar, pine, and moss. Brings the outdoors inside.',
        longDescription: 'Experience the tranquility of a forest walk with this grounding blend of cedar, pine, and moss. This earthy candle brings the calming essence of nature indoors.',
        price: 35.00,
        images: [
          {
            url: 'https://images.pexels.com/photos/4021905/pexels-photo-4021905.jpeg?auto=compress&cs=tinysrgb&w=800',
            alt: 'Forest Walk candle',
            isPrimary: true
          }
        ],
        category: 'Nature Collection',
        collection: createdCollections[2]._id,
        scent: 'Cedar, Pine, Moss',
        burnTime: '45-50 hours',
        size: '8 oz',
        weight: '227g',
        ingredients: ['Soy Wax', 'Essential Oils', 'Cotton Wick', 'Natural Fragrance'],
        careInstructions: {
          firstBurn: 'Burn for 2-3 hours to create an even melt pool',
          trimWick: 'Trim wick to 1/4 inch before each use',
          safety: 'Never leave candle unattended. Keep away from children and pets.'
        },
        featured: true,
        inStock: true,
        stockQuantity: 15
      }
    ];

    await Product.insertMany(products);
    console.log('🕯️  Created sample products');

    console.log('✅ Database seeded successfully!');
    console.log('📧 Admin login: admin@candleshop.com / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();