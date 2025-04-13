const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name, itemCount } = req.body;
    
    // Check if category exists
    const categoryExists = await Category.findOne({ name });
    
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    
    let imageUrl = '';
    
    // Check if a file was uploaded
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      // Use provided URL if no file uploaded
      imageUrl = req.body.imageUrl;
    } else {
      return res.status(400).json({ message: 'Image is required' });
    }
    
    const category = await Category.create({
      name,
      itemCount,
      imageUrl,
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
  try {
    const { name, itemCount } = req.body;
    
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Update fields
    category.name = name || category.name;
    category.itemCount = itemCount || category.itemCount;
    
    // Check if a new file was uploaded
    if (req.file) {
      // Delete previous image if it exists and is stored locally
      if (category.imageUrl && category.imageUrl.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', category.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Update with new image URL
      category.imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl && req.body.imageUrl !== category.imageUrl) {
      // Use provided URL if no file uploaded
      category.imageUrl = req.body.imageUrl;
    }
    
    category.updatedAt = Date.now();
    
    const updatedCategory = await category.save();
    
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Delete image if stored locally
    if (category.imageUrl && category.imageUrl.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', category.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await category.remove();
    
    res.json({ message: 'Category removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};