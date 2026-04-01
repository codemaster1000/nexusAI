const express = require('express');

const { requireAuth } = require('../middleware/auth');
const { exportSchema, parseOrThrow } = require('../utils/validators');

const router = express.Router();

router.post('/', requireAuth, (req, res, next) => {
  try {
    const body = parseOrThrow(exportSchema, req.body, 'Invalid export payload');

    // Placeholder response for phase 1. Real PDF generation is planned in a later phase.
    res.status(200).json({
      status: 'accepted',
      message: 'Export endpoint validated payload. PDF generation will be added in Phase 2.',
      preview: {
        overall_score: body.analysis_data.overall_score,
        rewritten_sections: body.rewritten_sections || {},
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
