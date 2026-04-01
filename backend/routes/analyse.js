const express = require('express');
const multer = require('multer');

const { requireAuth } = require('../middleware/auth');
const { analysisBodySchema, parseOrThrow } = require('../utils/validators');
const { extractResumeTextFromBuffer } = require('../services/pdfExtractor');
const { runAnalysis } = require('../services/analysisService');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post('/', requireAuth, upload.single('resume'), async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error('Resume PDF file is required');
      err.status = 400;
      err.code = 'resume_missing';
      throw err;
    }

    if (req.file.mimetype !== 'application/pdf') {
      const err = new Error('Resume must be a PDF file');
      err.status = 400;
      err.code = 'resume_invalid_format';
      throw err;
    }

    const body = parseOrThrow(analysisBodySchema, req.body, 'Invalid analysis request payload');

    let extraction;
    try {
      extraction = await extractResumeTextFromBuffer(req.file.buffer);
    } catch (_error) {
      const err = new Error(
        'Resume text extraction failed. Please upload a standard text-based PDF (not scanned or corrupted).'
      );
      err.status = 422;
      err.code = 'resume_extraction_failed';
      throw err;
    }

    if (!extraction.text) {
      const err = new Error('No extractable text found in PDF. The file may be scanned/image-based.');
      err.status = 422;
      err.code = 'resume_extraction_empty';
      throw err;
    }

    const result = await runAnalysis({
      resumeText: extraction.text,
      jobDescription: body.job_description,
    });

    // Reduce retention of personal data in process memory.
    req.file.buffer.fill(0);

    res.status(200).json({
      extraction: extraction.metadata,
      analysis: result.analysis,
      model_routing: result.routing,
      cost_summary: result.cost,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
