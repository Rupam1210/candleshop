const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Collection name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Collection name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Collection description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    url: {
      type: String,
      required: [true, 'Collection image is required']
    },
    alt: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  seoTitle: String,
  seoDescription: String
}, {
  timestamps: true
});

// Create slug from name before saving
collectionSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Virtual for product count
collectionSchema.virtual('productCount', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'collection',
  count: true
});

collectionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Collection', collectionSchema);