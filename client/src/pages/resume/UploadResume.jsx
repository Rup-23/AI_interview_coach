import { useState, useRef } from "react";
import { Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Button from "../../components/ui/Button";
import CloudFilePicker from "../../components/ui/CloudFilePicker";

import { uploadResume } from "../../services/resume.service";

const UploadResume = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    validateAndSetFile(e.target.files[0]);
  };

  // Handle files from cloud pickers (Google Drive, etc.)
  const handleCloudFileSelected = (cloudFile) => {
    validateAndSetFile(cloudFile);
    toast.success(`Selected: ${cloudFile.name}`);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await uploadResume(formData);

      toast.success(response.message);

      // Save resume ID for the next step
      sessionStorage.setItem("resumeId", response.data._id);

      navigate("/interview/generate");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">

      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-10">

        <h1 className="text-4xl font-bold text-white">
          Upload Resume
        </h1>

        <p className="mt-2 text-zinc-400">
          Upload your latest resume to generate AI interview questions.
        </p>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              fileInputRef.current?.click();
            }
          }}
          className={`mt-10 cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-200 ${
            isDragOver
              ? "border-blue-500 bg-blue-500/10"
              : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
          }`}
        >

          <Upload
            size={60}
            className={`mx-auto transition ${isDragOver ? "text-blue-400 scale-110" : "text-blue-500"}`}
          />

          <h2 className="mt-6 text-2xl font-semibold text-white">
            {isDragOver ? "Drop your file here" : "Choose your Resume"}
          </h2>

          <p className="mt-2 text-zinc-400">
            Drag & drop a PDF here, or click to browse.
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            PDF files only • Max 5MB
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload resume PDF"
          />

        </div>

        {/* Cloud Providers */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-sm text-zinc-500">Or pick from:</span>
          <CloudFilePicker
            onFileSelected={handleCloudFileSelected}
            accept=".pdf"
            disabled={loading}
          />
        </div>

        {/* Selected File Preview */}
        {file && (
          <div className="mt-6 flex items-center justify-between gap-3 rounded-xl bg-zinc-800 p-4">

            <div className="flex items-center gap-3">
              <FileText
                size={24}
                className="shrink-0 text-blue-500"
              />
              <span className="truncate text-white">
                {file.name}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="shrink-0 text-sm text-zinc-400 transition hover:text-red-400"
            >
              Remove
            </button>

          </div>
        )}

        {/* Upload Button */}
        <div className="mt-8">
          <Button
            loading={loading}
            onClick={handleUpload}
          >
            Upload Resume
          </Button>
        </div>

      </main>

    </div>
  );
};

export default UploadResume;