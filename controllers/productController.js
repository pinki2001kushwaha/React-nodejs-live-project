const Product = require('../models/Product');

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, inStock, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    
    if (category) filter.category = category;
    if (inStock) filter.inStock = inStock === 'true';
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Product.countDocuments(filter);
    
    res.json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Bulk create products
// @route   POST /api/products/bulk
const bulkCreateProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(req.body);
    res.status(201).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkCreateProducts
};