const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public 
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
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

    const contact = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin/Seller
router.get('/', protect, async (req, res) => {
  try {
    // Only admin, seller, and owner can view contact messages
    if (!['admin', 'seller', 'owner'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Contact.countDocuments();

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalContacts: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private/Admin/Seller
router.put('/:id', protect, [
  body('status').optional().isIn(['new', 'read', 'replied', 'closed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    if (!['admin', 'seller', 'owner'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    if (req.body.status) contact.status = req.body.status;
    contact.isRead = true;
    
    await contact.save();

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;