const { callOpenRouter } = require("./llmClient");

async function extractResumeTextFromBuffer(buffer) {
  const base64Pdf = buffer.toString("base64");
  const dataUrl = `data:application/pdf;base64,${base64Pdf}`;

  const response = await callOpenRouter({
    model: "google/gemini-2.5-flash",
    systemPrompt:
      "You are an advanced OCR document parser. Your sole task is to extract all the text from the provided resume PDF accurately, maintaining the logical reading order as much as possible. Do not hallucinate, do not add commentary, and do not summarize. Just return the extracted text.",
    userPrompt: [
      {
        type: "text",
        text: "Please comprehensively extract all the text from this resume document.",
      },
      {
        type: "image_url",
        image_url: {
          url: dataUrl,
        },
      },
    ],
    temperature: 0.1,
  });

  const text = (response.text || "").trim();
  const confidence =
    text.length >= 200 ? "high" : text.length >= 80 ? "medium" : "low";

  return {
    text,
    metadata: {
      pages: 1, // Number of pages might not be known via LLM
      extraction_model: response.model || "google/gemini-2.5-flash",
      extraction_confidence: confidence,
      scanned_like: text.length < 80,
    },
    routing: {
      requested_model: response.requested_model,
      selected_model: response.model,
    },
    cost: {
      model: response.model,
      inputTokens: response.usage.prompt_tokens,
      outputTokens: response.usage.completion_tokens,
      explicitCostUsd: response.usage.cost_usd,
    },
  };
}

module.exports = {
  extractResumeTextFromBuffer,
};
