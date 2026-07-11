import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";

import { getInterviewById } from "../../services/interview.service";

const Result = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  const interviewId = sessionStorage.getItem("interviewId");

  useEffect(() => {
    const fetchResult = async () => {
      if (!interviewId) {
        toast.error("Interview not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await getInterviewById(interviewId);

        setResult(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load interview result."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [interviewId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        Loading Result...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        No Result Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10 text-white">
        <h1 className="text-4xl font-bold">
          Interview Result
        </h1>

        {/* Overall Score */}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-semibold">
            Overall Score
          </h2>

          <p className="mt-4 text-5xl font-bold text-blue-500">
            {result.overallScore}/100
          </p>
        </div>

        {/* Strengths */}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">
            Strengths
          </h2>

          {result.strengths.length === 0 ? (
            <p className="mt-4 text-zinc-400">
              No strengths available.
            </p>
          ) : (
            <ul className="mt-4 list-disc pl-6">
              {result.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Weaknesses */}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">
            Weaknesses
          </h2>

          {result.weaknesses.length === 0 ? (
            <p className="mt-4 text-zinc-400">
              No weaknesses available.
            </p>
          ) : (
            <ul className="mt-4 list-disc pl-6">
              {result.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Recommendations */}

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">
            Recommendations
          </h2>

          {result.recommendations.length === 0 ? (
            <p className="mt-4 text-zinc-400">
              No recommendations available.
            </p>
          ) : (
            <ul className="mt-4 list-disc pl-6">
              {result.recommendations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-10">
  <h2 className="text-3xl font-bold text-white">
    Question-wise Analysis
  </h2>

  <div className="mt-8 space-y-8">

    {result.questions.map((question, index) => (

      <div
        key={question._id}
        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
      >

        <div className="flex items-center justify-between">

          <h3 className="text-xl font-semibold text-white">
            Question {index + 1}
          </h3>

          <span
            className="rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white"
          >
            {question.score}/10
          </span>

        </div>

        <div className="mt-6">

          <p className="font-semibold text-blue-400">
            Question
          </p>

          <p className="mt-2 whitespace-pre-wrap text-zinc-300">
            {question.question}
          </p>

        </div>

        <div className="mt-6">

          <p className="font-semibold text-green-400">
            Your Answer
          </p>

          <p className="mt-2 whitespace-pre-wrap text-zinc-300">

            {question.answer
              ? question.answer
              : "No answer submitted."}

          </p>

        </div>

        <div className="mt-6">

          <p className="font-semibold text-yellow-400">
            Ideal Answer
          </p>

          <p className="mt-2 whitespace-pre-wrap text-zinc-300">
            {question.idealAnswer}
          </p>

        </div>

        <div className="mt-6">

          <p className="font-semibold text-red-400">
            AI Feedback
          </p>

          <p className="mt-2 whitespace-pre-wrap text-zinc-300">
            {question.feedback}
          </p>

        </div>

      </div>

    ))}

  </div>
</div>
      </main>
    </div>
  );
};

export default Result;