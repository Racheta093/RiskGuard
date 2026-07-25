import {
  createDocument,
  getAllDocuments,
} from "../services/document/document.service.js";

export const getDocuments = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated. Please log in again.",
      });
    }

    const documents = await getAllDocuments(req.user._id);

    res.status(200).json({
      success: true,
      documents,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const uploadDocument = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated. Please log in again.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,

        message: "No PDF uploaded",
      });
    }

    const document = await createDocument(req.file, req.user._id);

    return res.status(202).json({
      success: true,

      message: "Uploaded successfully. Processing started.",

      data: {
        documentId: document._id,

        jobId: document.jobId,

        status: document.status,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};
