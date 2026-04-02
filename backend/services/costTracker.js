const COST_PER_1M_INPUT = {
  "mistralai/mistral-7b-instruct": 0.3,
  "mistralai/mistral-7b-instruct-v0.1": 0.3,
  "mistralai/mistral-small-3.2-24b-instruct-2506": 0.1,
  "meta-llama/llama-3.3-70b-instruct": 0.4,
  "qwen/qwen3-235b-a22b": 1.0,
  "deepseek/deepseek-r1": 0.55,
  "google/gemini-2.5-flash": 0.075,
};

const COST_PER_1M_OUTPUT = {
  "mistralai/mistral-7b-instruct": 0.6,
  "mistralai/mistral-7b-instruct-v0.1": 0.6,
  "mistralai/mistral-small-3.2-24b-instruct-2506": 0.3,
  "meta-llama/llama-3.3-70b-instruct": 0.4,
  "qwen/qwen3-235b-a22b": 2.0,
  "deepseek/deepseek-r1": 2.19,
  "google/gemini-2.5-flash": 0.3,
};

function estimateCallCost({
  model,
  inputTokens = 0,
  outputTokens = 0,
  explicitCostUsd,
}) {
  if (Number.isFinite(explicitCostUsd) && explicitCostUsd >= 0) {
    return explicitCostUsd;
  }

  const inputRate = COST_PER_1M_INPUT[model] || 1;
  const outputRate = COST_PER_1M_OUTPUT[model] || 1;

  return (
    (inputTokens / 1_000_000) * inputRate +
    (outputTokens / 1_000_000) * outputRate
  );
}

function summarizeCost(calls) {
  const totalInputTokens = calls.reduce(
    (acc, call) => acc + (call.inputTokens || 0),
    0,
  );
  const totalOutputTokens = calls.reduce(
    (acc, call) => acc + (call.outputTokens || 0),
    0,
  );
  const totalCost = calls.reduce((acc, call) => {
    return acc + estimateCallCost(call);
  }, 0);

  const modelsUsed = [...new Set(calls.map((call) => call.model))];

  return {
    total_input_tokens: totalInputTokens,
    total_output_tokens: totalOutputTokens,
    estimated_cost_usd: Number(totalCost.toFixed(6)),
    models_used: modelsUsed,
  };
}

module.exports = {
  estimateCallCost,
  summarizeCost,
};
