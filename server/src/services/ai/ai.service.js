import Chunk from "../../models/Chunk.js";
import { getConversation } from "../conversation/conversation.service.js";
import { generateAnswer } from "../llm/llm.service.js";

export const generateFromDocument = async (
  conversationId,
  userId,
  promptTemplate,
) => {
  const conversation = await getConversation(conversationId, userId);

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  const chunks = await Chunk.find({
    documentId: conversation.documentId,
  })
    .sort({ chunkIndex: 1 })
    .select("content");

  const document = chunks.map((chunk) => chunk.content).join("\n\n");

  const prompt = `${promptTemplate}

Document:

${document}`;

  return await generateAnswer(prompt);
};
