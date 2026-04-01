function safeParseJson(text) {
  try {
    return { ok: true, data: JSON.parse(text) };
  } catch (_error) {
    return { ok: false, data: null };
  }
}

function parseWithSingleRetry(rawPrimaryResponse, retryFn) {
  const first = safeParseJson(rawPrimaryResponse);
  if (first.ok) {
    return {
      ok: true,
      data: first.data,
      attempts: 1,
      failed_response: null,
    };
  }

  const retriedResponse = retryFn();
  const second = safeParseJson(retriedResponse);

  if (second.ok) {
    return {
      ok: true,
      data: second.data,
      attempts: 2,
      failed_response: null,
    };
  }

  return {
    ok: false,
    data: null,
    attempts: 2,
    failed_response: {
      first: rawPrimaryResponse,
      second: retriedResponse,
    },
  };
}

module.exports = {
  parseWithSingleRetry,
};
