import { useRef } from "react";
import { Upload } from "lucide-react";
import { uploadDocument } from "../../services/document.service";
import toast from "react-hot-toast";

const UploadButton = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  }; 

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    console.log("Selected:", file.name);

    try {
      const res = await uploadDocument(file);
      console.log("Upload success:", res);
      toast.success("Document uploaded.");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleFileChange}
      />

      <button
        onClick={handleClick}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl py-3 flex items-center justify-center gap-2 font-medium shadow-lg shadow-blue-900/30 transition"
      >
        <Upload size={18} />
        Upload PDF
      </button>
    </>
  );
};

export default UploadButton;
