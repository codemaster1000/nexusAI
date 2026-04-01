const { callOpenRouter } = require('./llmClient');
const { summarizeCost } = require('./costTracker');
const { buildRewriteSystemPrompt, buildRewriteUserPrompt } = require('./promptBuilder');

async function rewriteSection({ sectionName, originalText, jobDescription, feedback }) {
  const systemPrompt = buildRewriteSystemPrompt();
  const userPrompt = buildRewriteUserPrompt({
    sectionName,
    originalText,
    jobDescription,
    feedback,
  });

  const response = await callOpenRouter({
    model: 'deepseek/deepseek-r1',
    systemPrompt,
    userPrompt,
    temperature: 0.25,
  });

  return {
    rewritten_text: response.text.trim(),
    requested_model: response.requested_model,
    model: response.model,
    cost: summarizeCost([
      {
        model: response.model,
        inputTokens: response.usage.prompt_tokens,
        outputTokens: response.usage.completion_tokens,
        explicitCostUsd: response.usage.cost_usd,
      },
    ]),
  };
}

async function rewriteFull({ sectionsToRewrite, originalSections, jobDescription }) {
  const rewrittenSections = {};
  const progress = [];
  const calls = [];

  for (let idx = 0; idx < sectionsToRewrite.length; idx += 1) {
    const sectionName = sectionsToRewrite[idx];
    const originalText = originalSections[sectionName];

    if (!originalText) {
      continue;
    }

    const rewritten = await rewriteSection({
      sectionName,
      originalText,
      jobDescription,
      feedback: ['Improve relevance for target role while preserving facts.'],
    });

    rewrittenSections[sectionName] = rewritten.rewritten_text;
    progress.push({
      section: sectionName,
      current: idx + 1,
      total: sectionsToRewrite.length,
      message: `Rewriting ${sectionName} section... ${idx + 1}/${sectionsToRewrite.length}`,
    });

    calls.push({
      model: rewritten.model,
      inputTokens: rewritten.cost.total_input_tokens,
      outputTokens: rewritten.cost.total_output_tokens,
      explicitCostUsd: rewritten.cost.estimated_cost_usd,
    });
  }

  return {
    rewritten_sections: rewrittenSections,
    progress,
    cost: summarizeCost(calls),
  };
}

module.exports = {
  rewriteSection,
  rewriteFull,
};
