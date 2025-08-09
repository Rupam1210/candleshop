const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  longDescription: {
    type: String,
    maxlength: [2000, 'Long description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  category: {
    type: String,
    
     
  },
  collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: [true, 'Product must belong to a collection']
  },
  scent: {
    type: String,
    required: [true, 'Scent profile is required']
  },
  burnTime: {
    type: String,
    required: [true, 'Burn time is required']
  },
  size: {
    type: String,
    required: [true, 'Size is required']
  },
  weight: {
    type: String,
    required: [true, 'Weight is required']
  },
  ingredients: [{
    type: String,
    required: true
  }],
  careInstructions: {
    firstBurn: String,
    trimWick: String,
    safety: String
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: [0, 'Stock quantity cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  tags: [String],
  seoTitle: String,
  seoDescription: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create slug from name before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Index for search functionality
productSchema.index({
  name: 'text',
  description: 'text',
  scent: 'text',
  category: 'text'
});

// Index for filtering and sorting
productSchema.index({ category: 1, price: 1 });
productSchema.index({ collection: 1, featured: -1 });
productSchema.index({ inStock: 1, isActive: 1 });

module.exports = mongoose.model('Product', productSchema);