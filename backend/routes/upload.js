const express = require('express');
const multer = require('multer');
const { admin } = require('../middleware/auth');

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private/Admin
router.post('/image', admin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // In a real application, you would upload to a cloud service like Cloudinary
    // For now, we'll return a placeholder URL
    const imageUrl = `https://via.placeholder.com/800x600/f0f0f0/333333?text=${encodeURIComponent(req.file.originalname)}`;

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: imageUrl,
        filename: req.file.originalname,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during image upload'
    });
  }
});

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private/Admin
router.post('/images', admin, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided'
      });
    }

    // In a real application, you would upload to a cloud service
    const uploadedImages = req.files.map((file, index) => ({
      url: `https://via.placeholder.com/800x600/f0f0f0/333333?text=${encodeURIComponent(file.originalname)}`,
      filename: file.originalname,
      size: file.size
    }));

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      data: { images: uploadedImages }
    });
  } catch (error) {
    console.error('Upload images error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during image upload'
    });
  }
});

module.exports = router;