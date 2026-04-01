const axios = require('axios');

function parseAllowedModels(rawValue) {
  if (!rawValue) {
    return [];
  }

  return rawValue
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

async function callOpenRouter({ model, systemPrompt, userPrompt, temperature = 0.2 }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    const err = new Error('OPENROUTER_API_KEY is not configured');
    err.status = 500;
    err.code = 'openrouter_missing_api_key';
    throw err;
  }

  const baseUrl = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
  const timeout = Number(process.env.OPENROUTER_TIMEOUT_MS || 30000);
  const requestedModel = model || process.env.OPENROUTER_MODEL || 'openrouter/auto';
  const allowedModels = parseAllowedModels(process.env.OPENROUTER_ALLOWED_MODELS);
  const payload = {
    model: requestedModel,
    temperature,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  };

  if (requestedModel === 'openrouter/auto' && allowedModels.length > 0) {
    payload.plugins = [
      {
        id: 'auto-router',
        allowed_models: allowedModels,
      },
    ];
  }

  const response = await axios.post(
    `${baseUrl}/chat/completions`,
    payload,
    {
      timeout,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const choice = response?.data?.choices?.[0]?.message?.content;
  const usage = response?.data?.usage || {};
  const selectedModel = response?.data?.model || requestedModel;

  if (!choice) {
    const err = new Error('OpenRouter response did not contain model output');
    err.status = 502;
    err.code = 'openrouter_empty_response';
    throw err;
  }

  return {
    text: choice,
    requested_model: requestedModel,
    model: selectedModel,
    usage: {
      prompt_tokens: usage.prompt_tokens || 0,
      completion_tokens: usage.completion_tokens || 0,
      total_tokens: usage.total_tokens || 0,
      cost_usd: Number(usage.cost || 0),
    },
  };
}

module.exports = {
  callOpenRouter,
};
