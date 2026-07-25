import { summarizeDocument } from "../services/ai/summary.service.js";
import { explainDocument } from "../services/ai/explain.service.js";
import { generateQuiz } from "../services/ai/quiz.service.js";
import { generateFlashcards } from "../services/ai/flashcard.service.js";
import { generateVivaQuestions } from "../services/ai/viva.service.js";
import { generateKeyPoints } from "../services/ai/keypoint.service.js";

export const summary = async (req, res) => {
  try {
    const { conversationId, length } = req.body;

    const result = await summarizeDocument(
      conversationId,
      req.user._id,
      length,
    );

    res.status(200).json({
      success: true,
      summary: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const explain = async (req, res) => {
  try {
    const { conversationId, topic } = req.body;

    const result = await explainDocument(conversationId, req.user._id, topic);

    res.status(200).json({
      success: true,
      explanation: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const quiz = async (req, res) => {
  try {
    const { conversationId, count } = req.body;

    const result = await generateQuiz(conversationId, req.user._id, count);

    res.status(200).json({
      success: true,
      quiz: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const flashcards = async (req, res) => {
  try {
    const { conversationId, count } = req.body;

    const result = await generateFlashcards(
      conversationId,
      req.user._id,
      count,
    );

    res.status(200).json({
      success: true,
      flashcards: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const viva = async (req, res) => {
  try {
    const { conversationId, count } = req.body;

    const result = await generateVivaQuestions(
      conversationId,
      req.user._id,
      count,
    );

    res.status(200).json({
      success: true,
      viva: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const keypoints = async (req, res) => {
  try {
    const { conversationId } = req.body;

    const result = await generateKeyPoints(conversationId, req.user._id);

    res.status(200).json({
      success: true,
      keypoints: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
