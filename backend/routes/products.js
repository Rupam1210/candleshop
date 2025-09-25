const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Product = require('../models/Product');
const Collection = require('../models/Collection');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().trim(),
  query('collection').optional().isMongoId().withMessage('Invalid collection ID'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be positive'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be positive'),
  query('search').optional().trim(),
  query('sort').optional().isIn(['name', 'price', '-price', 'createdAt', '-createdAt', 'rating']).withMessage('Invalid sort option'),
  query('featured').optional().isBoolean().withMessage('Featured must be boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 16;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isActive: true };

    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Collection filter
    if (req.query.collection) {
      query.collection = req.query.collection;
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Stock filter
    if (req.query.inStock === 'true') {
      query.inStock = true;
    }

    // Featured filter
    if (req.query.featured === 'true') {
      query.featured = true;
    }

    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Sort options
    let sortOption = {};
    switch (req.query.sort) {
      case 'name':
        sortOption = { name: 1 };
        break;
      case 'price':
        sortOption = { price: 1 };
        break;
      case '-price':
        sortOption = { price: -1 };
        break;
      case 'rating':
        sortOption = { 'rating.average': -1 };
        break;
      case '-createdAt':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Execute query
    const products = await Product.find(query)
      .populate('collection', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalProducts: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single product by ID or slug
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    let product;
    
    // Check if it's a MongoDB ObjectId or slug
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(req.params.id)
        .populate('collection', 'name slug description')
        .populate('reviews');
    } else {
      product = await Product.findOne({ slug: req.params.id })
        .populate('collection', 'name slug description')
        .populate('reviews');
    }

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('collection').isMongoId().withMessage('Valid collection ID is required'),
  body('scent').trim().notEmpty().withMessage('Scent profile is required'),
  body('burnTime').trim().notEmpty().withMessage('Burn time is required'),
  body('size').trim().notEmpty().withMessage('Size is required'),
  body('weight').trim().notEmpty().withMessage('Weight is required'),
  body('ingredients').isArray({ min: 1 }).withMessage('At least one ingredient is required'),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if collection exists
    const collection = await Collection.findById(req.body.collection);
    if (!collection) {
      return res.status(400).json({
        success: false,
        message: 'Collection not found'
      });
    }

    // Process images
    const images = req.body.images.map((img, index) => ({
      url: img,
      alt: `${req.body.name} image ${index + 1}`,
      isPrimary: index === 0
    }));

    const product = await Product.create({
      ...req.body,
      images
    });

    await product.populate('collection', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // If collection is being updated, verify it exists
    if (req.body.collection) {
      const collection = await Collection.findById(req.body.collection);
      if (!collection) {
        return res.status(400).json({
          success: false,
          message: 'Collection not found'
        });
      }
    }

    // Process images if provided
    if (req.body.images) {
      req.body.images = req.body.images.map((img, index) => {
        // If img is a string, treat as url
        if (typeof img === 'string') {
          return {
            url: img,
            alt: `${req.body.name || product.name} image ${index + 1}`,
            isPrimary: index === 0
          };
        }
        // If img is an object with a nested url property
        if (img && typeof img === 'object') {
          // If img.url is an object with a url property, flatten it
          if (img.url && typeof img.url === 'object' && img.url.url) {
            return {
              url: img.url.url,
              alt: img.url.alt || img.alt || `${req.body.name || product.name} image ${index + 1}`,
              isPrimary: typeof img.isPrimary === 'boolean' ? img.isPrimary : index === 0
            };
          }
          // If img.url is a string, use it directly
          if (typeof img.url === 'string') {
            return {
              url: img.url,
              alt: img.alt || `${req.body.name || product.name} image ${index + 1}`,
              isPrimary: typeof img.isPrimary === 'boolean' ? img.isPrimary : index === 0
            };
          }
        }
        // Fallback: skip invalid image
        return null;
      }).filter(Boolean);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('collection', 'name slug');

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product: updatedProduct }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Soft delete - set isActive to false
    // product.isActive = false;
    // await product.save();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get featured products
// @route   GET /api/products/featured/list
// @access  Public
router.get('/featured/list', async (req, res) => {
  try {
    const products = await Product.find({ 
      featured: true, 
      isActive: true,
      inStock: true 
    })
    .populate('collection', 'name slug')
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;