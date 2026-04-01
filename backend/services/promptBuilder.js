function buildAnalysisSystemPrompt() {
  return [
    'You are an expert resume analyst and hiring consultant.',
    'Return ONLY valid JSON with no markdown fences and no extra text.',
    'Never invent skills or experience not explicitly present in the resume.',
    'Use specific, actionable feedback and semantic reasoning over keyword counting.',
  ].join(' ');
}

function buildAnalysisUserPrompt({ resumeText, jobDescription }) {
  return `Schema:\n{\n  "overall_score": 0,\n  "sub_scores": {\n    "technical_skills": 0,\n    "experience_relevance": 0,\n    "education_fit": 0,\n    "soft_skills": 0\n  },\n  "matched_skills": [],\n  "missing_skills": [],\n  "bonus_skills": [],\n  "sections": {\n    "summary": { "status": "needs_improvement", "insight": "", "original_text": "", "feedback": [] },\n    "experience": { "status": "needs_improvement", "insight": "", "original_text": "", "feedback": [] },\n    "skills": { "status": "needs_improvement", "insight": "", "original_text": "", "feedback": [] },\n    "education": { "status": "needs_improvement", "insight": "", "original_text": "", "feedback": [] },\n    "projects": { "status": "needs_improvement", "insight": "", "original_text": "", "feedback": [] }\n  },\n  "ats_issues": [\n    { "issue": "", "severity": "warning", "suggestion": "" }\n  ],\n  "top_keywords": {\n    "present": [],\n    "missing": []\n  }\n}\n\nExtract 'original_text' exactly as it appears in the resume for that section.\n\nResume:\n${resumeText}\n\nJob Description:\n${jobDescription}`;
}

function buildRewriteSystemPrompt() {
  return [
    'You are an expert resume writer.',
    'Preserve all factual information and never invent experience or skills.',
    'Use strong action verbs and keep length close to original.',
  ].join(' ');
}

function buildRewriteUserPrompt({ sectionName, originalText, jobDescription, feedback }) {
  const feedbackText = feedback.map((item, idx) => `${idx + 1}. ${item}`).join('\n');

  return `Rewrite section for the target role.\n\nSection: ${sectionName}\n\nOriginal:\n${originalText}\n\nJob Description:\n${jobDescription}\n\nIssues to address:\n${feedbackText}\n\nReturn plain text only.`;
}

module.exports = {
  buildAnalysisSystemPrompt,
  buildAnalysisUserPrompt,
  buildRewriteSystemPrompt,
  buildRewriteUserPrompt,
};
