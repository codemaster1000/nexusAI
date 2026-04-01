function notFoundHandler(req, res) {
  res.status(404).json({
    error: {
      code: 'not_found',
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
}

function errorHandler(err, _req, res, _next) {
  const status = Number(err.status || 500);
  const code = err.code || 'internal_error';
  const message = err.message || 'Unexpected server error';

  if (status >= 500) {
    console.error('Unhandled error:', {
      code,
      message,
      stack: err.stack,
    });
  }

  res.status(status).json({
    error: {
      code,
      message,
      details: err.details || null,
    },
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
