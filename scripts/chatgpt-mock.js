const body = $request.body || "";
let prompt = "";
try {
  const j = JSON.parse(body);
  if (j.messages && j.messages.length) {
    prompt = j.messages[j.messages.length - 1].content || "";
  }
} catch (e) {}

const reply = "[MOCK] " + prompt;

const out = {
  id: "chatcmpl-mock-" + Date.now(),
  object: "chat.completion",
  created: Math.floor(Date.now() / 1000),
  model: "gpt-4o-mock",
  choices: [{
    index: 0,
    message: { role: "assistant", content: reply },
    finish_reason: "stop"
  }],
  usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
};

$done({ body: JSON.stringify(out) });
