const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be at least 0']
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Other']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);