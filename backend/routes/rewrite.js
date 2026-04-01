const express = require('express');

const { requireAuth } = require('../middleware/auth');
const { rewriteSchema, rewriteFullSchema, parseOrThrow } = require('../utils/validators');
const { rewriteSection, rewriteFull } = require('../services/rewriteService');

const router = express.Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const body = parseOrThrow(rewriteSchema, req.body, 'Invalid rewrite request payload');

    const rewritten = await rewriteSection({
      sectionName: body.section_name,
      originalText: body.original_text,
      jobDescription: body.job_description,
      feedback: body.feedback,
    });

    res.status(200).json(rewritten);
  } catch (error) {
    next(error);
  }
});

router.post('/full', requireAuth, async (req, res, next) => {
  try {
    const body = parseOrThrow(rewriteFullSchema, req.body, 'Invalid full rewrite request payload');

    const rewritten = await rewriteFull({
      sectionsToRewrite: body.sections_to_rewrite,
      originalSections: body.original_sections,
      jobDescription: body.job_description,
    });

    res.status(200).json(rewritten);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
