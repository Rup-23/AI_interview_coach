
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Button from "../../components/ui/Button";

import { generateInterview } from "../../services/interview.service";

const GenerateInterview = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const [difficulty, setDifficulty] = useState("Medium");

  const [loading, setLoading] = useState(false);

  const resumeId = sessionStorage.getItem("resumeId");

  const handleGenerate = async () => {
    if (!resumeId) {
      toast.error("Please upload a resume first.");

      navigate("/resume/upload");

      return;
    }

    if (!role.trim()) {
      toast.error("Please enter a job role.");

      return;
    }

    try {
      setLoading(true);

      const response = await generateInterview({
        resumeId,
        role,
        difficulty,
      });

      toast.success(response.message);

      sessionStorage.setItem(
        "interviewId",
        response.data._id
      );

      navigate("/interview");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Interview generation failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">

      <Navbar />

      <main className="mx-auto max-w-3xl px-6 py-10">

        <h1 className="text-4xl font-bold text-white">
          Generate Interview
        </h1>

        <p className="mt-2 text-zinc-400">
          Select your target role and interview difficulty.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

          <div>

            <label className="mb-2 block text-zinc-300">
              Target Role
            </label>

            <input
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              placeholder="e.g. MERN Stack Developer"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          <div className="mt-6">

            <label className="mb-2 block text-zinc-300">
              Difficulty
            </label>

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

          </div>

          <div className="mt-8">

            <Button
              loading={loading}
              onClick={handleGenerate}
            >
              Generate Interview
            </Button>

          </div>

        </div>

      </main>

    </div>
  );
};

export default GenerateInterview;