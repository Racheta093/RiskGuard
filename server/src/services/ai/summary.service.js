import { generateFromDocument } from "./ai.service.js";

export const summarizeDocument = async (
  conversationId,
  userId,
  length = "short",
) => {
  return await generateFromDocument(
    conversationId,
    userId,
    `You are an expert tutor.

Summarize the following document.

Requirements:
- Summary length: ${length}
- Use Markdown formatting.
- Start with a 2-3 sentence overview.
- Then create bullet points for the major topics.
- Highlight important terms in **bold**.
- Keep the summary concise.
- Do not include information not present in the document.`,
  );
};
