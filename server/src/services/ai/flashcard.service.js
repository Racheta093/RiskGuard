import { generateFromDocument } from "./ai.service.js";
import { extractJson } from "../../utils/response.js";

export const generateFlashcards = async (conversationId,userId, count = 20) => {
  const raw = await generateFromDocument(
    conversationId,
    userId,
    `You are an expert tutor.

Generate EXACTLY ${count} flashcards based only on the document below — not more, not fewer. The JSON array you return must contain exactly ${count} elements.

Requirements:

- Cover the most important concepts.
- Include definitions.
- Include algorithms if present.
- Include advantages and disadvantages if present.
- Include examples whenever possible.
- Do not repeat concepts.
- Keep answers under 3 sentences.
- Only use information from the document.

Respond with ONLY a valid JSON array — no markdown, no code fences, no commentary — in this exact shape:

[
  {
    "question": "string",
    "answer": "string"
  }
]`,
  );

  const cards = extractJson(raw)
    .filter(
      (card) =>
        card &&
        typeof card.question === "string" &&
        typeof card.answer === "string" &&
        card.question.trim().length > 0 &&
        card.answer.trim().length > 0,
    )
    .slice(0, count);

  if (cards.length === 0) {
    throw new Error("Model did not return valid flashcards.");
  }

  return cards;
};
