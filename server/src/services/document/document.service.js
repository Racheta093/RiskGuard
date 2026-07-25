import Document from "../../models/Document.js";
import { addJobToQueue } from "../queue/producer.js";
import { setJobStatus } from "../queue/jobStatus.js";
import { DOCUMENT_STATUS } from "../../utils/constants.js";
import { uploadPDFToS3 } from "../s3/upload.service.js";

export const createDocument = async (file, userId) => {
  const { key, url } = await uploadPDFToS3(file);

  const document = await Document.create({
    userId,

    originalName: file.originalname,

    s3Key: key,

    fileUrl: url,

    fileSize: file.size,

    mimeType: file.mimetype,
  });

  const job = {
    documentId: document._id.toString(),
    s3Key: document.s3Key,
  };

  await addJobToQueue(job);

  await setJobStatus(document._id.toString(), DOCUMENT_STATUS.PENDING);

  document.jobId = document._id.toString();

  await document.save();

  return document;
};

export const updateDocumentStatus = async (documentId, status) => {
  const doc = await Document.findByIdAndUpdate(
    documentId,
    {
      status,
      processedAt: status === DOCUMENT_STATUS.COMPLETED ? new Date() : null,
    },
    {
      returnDocument: "after",
    },
  );

  return doc;
};

export const getAllDocuments = async (userId) => {
  return await Document.find({ userId })
    .sort({ createdAt: -1 })
    .select("_id originalName status createdAt");
};

export const getDocumentOwnedByUser = async (documentId, userId) => {
  return await Document.findOne({ _id: documentId, userId });
};
