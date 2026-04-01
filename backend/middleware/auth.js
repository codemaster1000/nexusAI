const jwt = require('jsonwebtoken');

function requireAuth(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      const err = new Error('Missing or invalid Authorization header');
      err.status = 401;
      err.code = 'auth_missing';
      throw err;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      const err = new Error('JWT secret is not configured');
      err.status = 500;
      err.code = 'auth_config_error';
      throw err;
    }

    const payload = jwt.verify(token, secret);
    req.user = {
      sub: payload.sub,
      role: payload.role || 'user',
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      error.status = 401;
      error.code = 'auth_invalid_token';
    }
    next(error);
  }
}

module.exports = {
  requireAuth,
};
