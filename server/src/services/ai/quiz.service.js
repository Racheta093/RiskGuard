import { generateFromDocument } from "./ai.service.js";
import { extractJson } from "../../utils/response.js";

export const generateQuiz = async (conversationId, userId, count = 10) => {
  const raw = await generateFromDocument(
    conversationId,
    userId,
    
    `You are an exam paper setter.

Generate EXACTLY ${count} multiple-choice questions based only on the document below — not more, not fewer. The JSON array you return must contain exactly ${count} elements.

Respond with ONLY a valid JSON array — no markdown, no code fences, no commentary — in this exact shape:

[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctIndex": 0
  }
]

Rules:
- "options" must always contain exactly 4 non-empty strings.
- "correctIndex" is the 0-based index of the correct option.
- Cover different topics, do not repeat questions.
- Use only the document content.`,
  );

  const questions = extractJson(raw)
    .filter(
      (q) =>
        q &&
        typeof q.question === "string" &&
        q.question.trim().length > 0 &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        q.options.every(
          (opt) => typeof opt === "string" && opt.trim().length > 0,
        ) &&
        Number.isInteger(q.correctIndex) &&
        q.correctIndex >= 0 &&
        q.correctIndex <= 3,
    )
    .slice(0, count);

  if (questions.length === 0) {
    throw new Error("Model did not return a valid quiz.");
  }

  return questions;
};
