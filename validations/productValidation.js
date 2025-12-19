// src/validations/productValidation.js
const { body, param, query } = require('express-validator');

const createProductValidation = [
  body('sku')
    .trim()
    .notEmpty().withMessage('SKU is required')
    .isUppercase().withMessage('SKU must be uppercase')
    .isLength({ min: 3, max: 50 }).withMessage('SKU must be between 3-50 characters'),
  
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 2, max: 200 }).withMessage('Product name must be between 2-200 characters'),
  
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  
  body('unit')
    .isIn(['piece', 'kg', 'liter', 'meter', 'box', 'pack'])
    .withMessage('Invalid unit'),
  
  body('purchasePrice')
    .isFloat({ min: 0 }).withMessage('Purchase price must be a positive number'),
  
  body('sellingPrice')
    .isFloat({ min: 0 }).withMessage('Selling price must be a positive number')
    .custom((value, { req }) => {
      if (parseFloat(value) < parseFloat(req.body.purchasePrice)) {
        throw new Error('Selling price must be greater than or equal to purchase price');
      }
      return true;
    }),
  
  body('quantity')
    .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  
  body('minStockLevel')
    .optional()
    .isInt({ min: 0 }).withMessage('Minimum stock level must be a non-negative integer'),
  
  body('maxStockLevel')
    .optional()
    .isInt({ min: 0 }).withMessage('Maximum stock level must be a non-negative integer')
    .custom((value, { req }) => {
      if (req.body.minStockLevel && parseInt(value) <= parseInt(req.body.minStockLevel)) {
        throw new Error('Maximum stock level must be greater than minimum stock level');
      }
      return true;
    })
];

const updateProductValidation = [
  param('id')
    .isMongoId().withMessage('Invalid product ID'),
  
  body('sku')
    .optional()
    .trim()
    .isUppercase().withMessage('SKU must be uppercase'),
  
  body('sellingPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Selling price must be a positive number')
    .custom((value, { req }) => {
      if (req.body.purchasePrice && parseFloat(value) < parseFloat(req.body.purchasePrice)) {
        throw new Error('Selling price must be greater than or equal to purchase price');
      }
      return true;
    })
];

const getProductsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  
  query('category')
    .optional()
    .trim(),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Minimum price must be a positive number'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 }).withMessage('Maximum price must be a positive number')
];

module.exports = {
  createProductValidation,
  updateProductValidation,
  getProductsValidation
};