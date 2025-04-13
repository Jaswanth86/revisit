const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Filter files
const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000 }, // 1MB limit
});

// Get all categories
router.get('/', protect, getCategories);

// Create a category
router.post('/', protect, admin, upload.single('image'), createCategory);

// Update a category
router.put('/:id', protect, admin, upload.single('image'), updateCategory);

// Delete a category
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;