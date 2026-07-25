import { retrieveRelevantChunks } from "../retrieval/retrieval.service.js";
import { buildPrompt } from "../retrieval/prompt.service.js";
import { generateAnswer } from "../llm/llm.service.js";
import { getConversation } from "../conversation/conversation.service.js";
import { getMessages, saveMessage } from "../message/message.service.js";

export const chatWithDocument = async (conversationId, question, userId) => {
  const conversation = await getConversation(conversationId, userId);

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  const documentId = conversation.documentId;

  const history = await getMessages(conversationId, 10);

  const chunks = await retrieveRelevantChunks(documentId, question, 5);

  const prompt = buildPrompt(question, chunks, history);

  const answer = await generateAnswer(prompt);

  await saveMessage(conversationId, "user", question);

  await saveMessage(conversationId, "assistant", answer);

  return {
    answer,
    sources: chunks,
  };
};
