import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Button from "../../components/ui/Button";

import { uploadResume } from "../../services/resume.service";

const UploadResume = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);
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

    // Resume ID save karo
    sessionStorage.setItem(
      "resumeId",
      response.data._id
    );

    // Next page par jao
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

        <div className="mt-10 rounded-3xl border-2 border-dashed border-zinc-700 bg-zinc-900 p-12 text-center">

          <Upload
            size={60}
            className="mx-auto text-blue-500"
          />

          <h2 className="mt-6 text-2xl font-semibold text-white">
            Choose your Resume
          </h2>

          <p className="mt-2 text-zinc-400">
            Only PDF files are supported.
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="mt-8 block w-full text-zinc-300
            file:mr-4
            file:rounded-lg
            file:border-0
            file:bg-blue-600
            file:px-4
            file:py-2
            file:text-white
            hover:file:bg-blue-700"
          />

          {file && (
            <div className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-zinc-800 p-4">

              <FileText
                size={24}
                className="text-blue-500"
              />

              <span className="text-white">
                {file.name}
              </span>

            </div>
          )}

          <div className="mt-10">

            <Button
              loading={loading}
              onClick={handleUpload}
            >
              Upload Resume
            </Button>

          </div>

        </div>

      </main>

    </div>
  );
};

export default UploadResume;