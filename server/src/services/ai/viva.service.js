import { generateFromDocument } from "./ai.service.js";

export const generateVivaQuestions = async (
  conversationId,
  userId,
  count = 15,
) => {
  return await generateFromDocument(
    conversationId,
    userId,

    `You are an interviewer.

Generate ${count} viva questions.

Requirements:

- Mix easy, medium and hard.
- Give concise model answers.
- Use Markdown.
- Only use the document.`,
  );
};
