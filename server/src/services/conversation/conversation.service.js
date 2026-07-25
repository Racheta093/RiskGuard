import Conversation from "../../models/Conversation.js";
import Message from "../../models/Message.js";

export const createConversation = async (
  documentId,
  userId,
  title = "New Chat",
) => {
  return await Conversation.create({
    documentId,
    userId,
    title,
  });
};

export const getConversation = async (conversationId, userId) => {
  return await Conversation.findOne({ _id: conversationId, userId });
};

export const findConversationByDocument = async (documentId, userId) => {
  return await Conversation.findOne({ documentId, userId });
};

export const getConversationsByDocument = async (documentId, userId) => {
  return await Conversation.find({ documentId, userId }).sort({
    updatedAt: -1,
  });
};

export const updateConversationTitle = async (
  conversationId,
  userId,
  title,
) => {
  return await Conversation.findOneAndUpdate(
    { _id: conversationId, userId },
    { title },
    { new: true },
  );
};

export const deleteConversation = async (conversationId, userId) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId,
  });

  if (!conversation) return null;

  await Message.deleteMany({ conversationId });

  return await Conversation.findByIdAndDelete(conversationId);
};
