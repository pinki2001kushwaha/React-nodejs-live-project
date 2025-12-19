require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MongoDB CRUD API',
    version: '1.0.0',
    endpoints: {
      products: {
        GET_ALL: '/api/products',
        GET_ONE: '/api/products/:id',
        CREATE: '/api/products',
        UPDATE: '/api/products/:id',
        DELETE: '/api/products/:id',
        BULK_CREATE: '/api/products/bulk'
      }
    }
  });
});

// API Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});