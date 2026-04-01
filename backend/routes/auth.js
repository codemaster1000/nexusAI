const express = require('express');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const router = express.Router();

const tokenRequestSchema = z.object({
  user_id: z.string().min(1).max(120),
  role: z.string().min(1).max(40).optional(),
});

router.post('/token', (req, res, next) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      const err = new Error('JWT secret is not configured');
      err.status = 500;
      err.code = 'auth_config_error';
      throw err;
    }

    const parsed = tokenRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      const err = new Error('Invalid token request payload');
      err.status = 400;
      err.code = 'invalid_payload';
      err.details = parsed.error.flatten();
      throw err;
    }

    const payload = {
      sub: parsed.data.user_id,
      role: parsed.data.role || 'user',
    };

    const token = jwt.sign(payload, secret, { expiresIn: '4h' });

    res.status(200).json({ token, expires_in: 4 * 60 * 60 });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
