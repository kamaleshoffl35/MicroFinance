const ApiError = require('../utils/ApiError');


const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || 'Server Error';
  let details;

  if (err instanceof ApiError) {

    statusCode = err.statusCode;
    message = err.message;
    details = err.details || undefined;
  } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    const field = err.path ? err.path.charAt(0).toUpperCase() + err.path.slice(1) : 'Resource';
    message = `${field} not found`;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  } else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {}).join(', ');
    message = `Duplicate value entered for field: ${field}`;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    details,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

module.exports = { notFound, errorHandler };
