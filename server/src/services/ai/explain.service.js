import { generateFromDocument } from "./ai.service.js";

export const explainDocument = async (conversationId, userId, topic) => {
  return await generateFromDocument(
    conversationId,
    userId,

    `You are an expert professor.

Explain the topic:

"${topic}"

Requirements:

- Explain in simple language.
- Use Markdown.
- Use headings.
- Give examples.
- Use bullet points wherever suitable.
- Explain as if teaching a college student.
- Do not use information outside the document.`,
  );
};
