const { z } = require('zod');

const analysisBodySchema = z.object({
  job_description: z
    .string()
    .min(100, 'Job description must be at least 100 characters')
    .max(5000, 'Job description cannot exceed 5000 characters'),
});

const rewriteSchema = z.object({
  section_name: z.string().min(1).max(120),
  original_text: z.string().min(20).max(8000),
  job_description: z.string().min(100).max(5000),
  feedback: z.array(z.string().min(2).max(500)).min(1).max(5),
});

const rewriteFullSchema = z.object({
  sections_to_rewrite: z.array(z.string().min(1).max(120)).min(1).max(10),
  original_sections: z.record(z.string().min(1).max(120), z.string().min(20).max(12000)),
  job_description: z.string().min(100).max(5000),
});

const exportSchema = z.object({
  analysis_data: z.object({
    overall_score: z.number().min(0).max(100),
    sub_scores: z.object({
      technical_skills: z.number().min(0).max(100),
      experience_relevance: z.number().min(0).max(100),
      education_fit: z.number().min(0).max(100),
      soft_skills: z.number().min(0).max(100),
    }),
  }).passthrough(),
  rewritten_sections: z.record(z.string(), z.string()).optional(),
});

function parseOrThrow(schema, input, message) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const err = new Error(message || 'Validation failed');
    err.status = 400;
    err.code = 'invalid_payload';
    err.details = parsed.error.flatten();
    throw err;
  }
  return parsed.data;
}

module.exports = {
  analysisBodySchema,
  rewriteSchema,
  rewriteFullSchema,
  exportSchema,
  parseOrThrow,
};
