const express = require('express');
const { body, validationResult } = require('express-validator');
const Collection = require('../models/Collection');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all collections
// @route   GET /api/collections
// @access  Public
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    // Get product count for each collection
    const collectionsWithCount = await Promise.all(
      collections.map(async (collection) => {
        const productCount = await Product.countDocuments({
          collection: collection._id,
          isActive: true
        });
        return {
          ...collection,
          productCount
        };
      })
    );

    res.json({
      success: true,
      data: { collections: collectionsWithCount }
    });
  } catch (error) {
    console.error('Get collections error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single collection by ID or slug
// @route   GET /api/collections/:id
// @access  Public 
router.get('/:id', async (req, res) => { 
  try {
    let collection;
    
    // Check if it's a MongoDB ObjectId or slug
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      collection = await Collection.findById(req.params.id);
    } else {
      collection = await Collection.findOne({ slug: req.params.id });
    }

    if (!collection || !collection.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    // Get products in this collection
    const products = await Product.find({
      collection: collection._id,
      isActive: true
    })
    .sort({ featured: -1, createdAt: -1 })
    .lean();

    res.json({
      success: true,
      data: {
        collection: {
          ...collection.toObject(),
          productCount: products.length
        },
        products
      }
    });
  } catch (error) {
    console.error('Get collection error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create new collection
// @route   POST /api/collections
// @access  Private/Admin
router.post('/', protect, admin, [ 
  body('name').trim().notEmpty().withMessage('Collection name is required'),
  body('description').trim().notEmpty().withMessage('Description is required')
  // body('image.url').isURL().withMessage('Valid image URL is required')
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

    // Check if collection with same name exists 
    const existingCollection = await Collection.findOne({ 
      name: req.body.name,
      isActive: true 
    });
    
    if (existingCollection) {
      return res.status(400).json({
        success: false,
        message: 'Collection with this name already exists'
      });
    }

    const collection = await Collection.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Collection created successfully',
      data: { collection }
    });
  } catch (error) {
    console.error('Create collection error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update collection
// @route   PUT /api/collections/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    // Check if another collection with same name exists
    if (req.body.name && req.body.name !== collection.name) {
      const existingCollection = await Collection.findOne({ 
        name: req.body.name,
        isActive: true,
        _id: { $ne: req.params.id }
      });
      
      if (existingCollection) {
        return res.status(400).json({
          success: false,
          message: 'Collection with this name already exists'
        });
      }
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: 'Collection updated successfully',
      data: { collection: updatedCollection }
    });
  } catch (error) {
    console.error('Update collection error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Delete collection
// @route   DELETE /api/collections/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found'
      });
    }

    // Check if collection has products
    const productCount = await Product.countDocuments({
      collection: req.params.id,
      isActive: true
    });

    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete collection. It contains ${productCount} active products.`
      });
    }

    // Soft delete - set isActive to false
    collection.isActive = false;
    await collection.save();

    res.json({
      success: true,
      message: 'Collection deleted successfully'
    });
  } catch (error) {
    console.error('Delete collection error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;