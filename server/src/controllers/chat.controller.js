import { chatWithDocument } from "../services/chat/chat.service.js";

export const chat = async (req, res) => {
  try {
    const { conversationId, question } = req.body;

    if (!conversationId || !question) {
      return res.status(400).json({
        success: false,

        message: "conversationId  and question are required.",
      });
    }

    const result = await chatWithDocument(
      conversationId,
      question,
      req.user._id,
    );

    return res.json({
      success: true,
      answer: result.answer,

      sources: result.sources,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
