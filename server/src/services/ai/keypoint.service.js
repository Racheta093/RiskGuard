import { generateFromDocument } from "./ai.service.js";

export const generateKeyPoints = async (conversationId, userId) => {
  return await generateFromDocument(
    conversationId,
    userId,

    `Extract the most important concepts.

Requirements:

- Markdown
- Bullet points
- Explain each in one sentence
- Highlight keywords
- Only use the document.`,
  );
};
