const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkCreateProducts
} = require('../controllers/productController');

// CRUD Routes
router.route('/')
  .post(createProduct)
  .get(getProducts);

router.route('/bulk')
  .post(bulkCreateProducts);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;