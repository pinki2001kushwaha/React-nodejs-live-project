const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
};

module.exports = errorHandler;