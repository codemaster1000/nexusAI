const pdf = require('pdf-parse');

async function extractResumeTextFromBuffer(buffer) {
  const parsed = await pdf(buffer);
  const text = (parsed.text || '').trim();

  const confidence = text.length >= 200 ? 'high' : text.length >= 80 ? 'medium' : 'low';

  return {
    text,
    metadata: {
      pages: parsed.numpages || 0,
      extraction_confidence: confidence,
      scanned_like: text.length < 80,
    },
  };
}

module.exports = {
  extractResumeTextFromBuffer,
};
