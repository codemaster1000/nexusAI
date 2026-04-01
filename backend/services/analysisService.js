const { callOpenRouter } = require('./llmClient');
const { parseWithSingleRetry } = require('./jsonParser');
const { summarizeCost } = require('./costTracker');
const { buildAnalysisSystemPrompt, buildAnalysisUserPrompt } = require('./promptBuilder');

function enforceWeightedScore(subScores) {
  const weighted =
    subScores.technical_skills * 0.4 +
    subScores.experience_relevance * 0.3 +
    subScores.education_fit * 0.2 +
    subScores.soft_skills * 0.1;

  return Math.max(0, Math.min(100, Math.round(weighted)));
}

function normalizeAnalysisShape(raw) {
  const fallbackSubScores = {
    technical_skills: 0,
    experience_relevance: 0,
    education_fit: 0,
    soft_skills: 0,
  };

  const sub_scores = {
    ...fallbackSubScores,
    ...(raw.sub_scores || {}),
  };

  return {
    overall_score: enforceWeightedScore(sub_scores),
    sub_scores,
    matched_skills: Array.isArray(raw.matched_skills) ? raw.matched_skills : [],
    missing_skills: Array.isArray(raw.missing_skills) ? raw.missing_skills : [],
    bonus_skills: Array.isArray(raw.bonus_skills) ? raw.bonus_skills : [],
    sections: raw.sections || {},
    ats_issues: Array.isArray(raw.ats_issues) ? raw.ats_issues : [],
    top_keywords: raw.top_keywords || { present: [], missing: [] },
  };
}

async function runAnalysis({ resumeText, jobDescription }) {
  const systemPrompt = buildAnalysisSystemPrompt();
  const userPrompt = buildAnalysisUserPrompt({
    resumeText,
    jobDescription,
  });

  const primary = await callOpenRouter({
    model: 'meta-llama/llama-3.3-70b-instruct',
    systemPrompt,
    userPrompt,
    temperature: 0.15,
  });

  const parse = parseWithSingleRetry(primary.text, () => primary.text);
  if (!parse.ok) {
    const err = new Error('Model output could not be parsed as JSON');
    err.status = 502;
    err.code = 'analysis_parse_failed';
    err.details = {
      attempts: parse.attempts,
      raw_response: parse.failed_response,
    };
    throw err;
  }

  const analysis = normalizeAnalysisShape(parse.data);

  const cost = summarizeCost([
    {
      model: primary.model,
      inputTokens: primary.usage.prompt_tokens,
      outputTokens: primary.usage.completion_tokens,
      explicitCostUsd: primary.usage.cost_usd,
    },
  ]);

  return {
    analysis,
    routing: {
      requested_model: primary.requested_model,
      selected_model: primary.model,
    },
    cost,
  };
}

module.exports = {
  runAnalysis,
};
