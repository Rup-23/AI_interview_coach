import {
    getInterviewById,
    evaluateAnswer,
    completeInterview,
} from "../../services/interview.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Button from "../../components/ui/Button";



const Interview = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [interview, setInterview] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    // const [feedback, setFeedback] = useState(null);
    const [evaluations, setEvaluations] = useState({});
    const [evaluating, setEvaluating] = useState(false);
    const [completing, setCompleting] = useState(false);

    const interviewId = sessionStorage.getItem("interviewId");

    useEffect(() => {
        const fetchInterview = async () => {
            if (!interviewId) {
                toast.error("Interview not found.");
                navigate("/dashboard");
                return;
            }

            try {
                const response = await getInterviewById(interviewId);
                setInterview(response.data);
                const loadedAnswers = {};
                const loadedEvaluations = {};

                response.data.questions.forEach((question) => {
                    loadedAnswers[question._id] = question.answer || "";

                    if (question.feedback) {
                        loadedEvaluations[question._id] = {
                            score: question.score,
                            feedback: question.feedback,
                            idealAnswer: question.idealAnswer,
                        };
                    }
                });

                setAnswers(loadedAnswers);
                setEvaluations(loadedEvaluations);

            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load interview."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchInterview();
    }, [interviewId, navigate]);

    const handleEvaluate = async () => {
        const currentAnswer =
            answers[currentQuestion._id] || "";

        if (!currentAnswer.trim()) {
            toast.error("Please write your answer first.");
            return;
        }

        try {
            setEvaluating(true);

            const response = await evaluateAnswer({
                interviewId,
                questionId: currentQuestion._id,
                answer: currentAnswer,
            });
            console.log("Response:", response);
            console.log("Stored Data:", response.data.data);

            setEvaluations((prev) => ({
                ...prev,
                [currentQuestion._id]: response.data,
            }));



            toast.success(response.message);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to evaluate answer."
            );
        } finally {
            setEvaluating(false);
        }
    };
    const handleCompleteInterview = async () => {
        try {
            setCompleting(true);

            const response = await completeInterview(interviewId);

            toast.success(response.message);

            navigate("/result", {
                state: response.data,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to complete interview."
            );
        } finally {
            setCompleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                Loading Interview...
            </div>
        );
    }

    if (!interview) {
        return null;
    }

    const currentQuestion = interview.questions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion._id] || "";
    const currentEvaluation = evaluations[currentQuestion._id] || null;




    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />

            <main className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="text-4xl font-bold text-white">{interview.role}</h1>

                <p className="mt-2 text-zinc-400">Difficulty : {interview.difficulty}</p>

                <div className="mt-8">
                    <p className="mb-3 text-zinc-300">
                        Question {currentQuestionIndex + 1} {" / "}{interview.questions.length}
                    </p>

                    <div className="h-3 w-full rounded-full bg-zinc-800">
                        <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-300"
                            style={{
                                width: `${((currentQuestionIndex + 1) / interview.questions.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
                    <h2 className="text-2xl font-semibold text-white">{currentQuestion.question}</h2>
                    <textarea
                        value={currentAnswer}
                        onChange={(e) => {
                            setAnswers((prev) => ({
                                ...prev,
                                [currentQuestion._id]: e.target.value,
                            }));

                        //     setEvaluations((prev) => ({
                        //         ...prev,
                        //         [currentQuestion._id]: null,
                        //     }));
                        }}
                        placeholder="Write your answer here..."
                        className="mt-8 h-52 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none focus:border-blue-500 resize-none"
                    />
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        onClick={() => {
                            if (currentQuestionIndex > 0) {
                                setCurrentQuestionIndex(currentQuestionIndex - 1);
                                // setAnswer("");
                                // setFeedback(null);
                            }
                        }}
                    >
                        Previous
                    </Button>

                    <Button
                        loading={evaluating}
                        disabled={evaluating || currentEvaluation}
                        onClick={handleEvaluate}
                    >
                        Evaluate Answer
                    </Button>
                   
                    {currentEvaluation && (
                        <div className="mt-8 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                            <h2 className="text-2xl font-semibold text-white">
                                AI Feedback
                            </h2>

                            <div className="mt-6">

                                <p className="font-semibold text-blue-400">
                                    Score
                                </p>

                                <p className="mt-2 text-white">
                                    {currentEvaluation.score} / 10
                                </p>

                            </div>

                            <div className="mt-6">

                                <p className="font-semibold text-blue-400">
                                    Ideal Answer
                                </p>

                                <p className="mt-2 whitespace-pre-wrap wrap-break-word text-zinc-300">
                                    {currentEvaluation.idealAnswer}
                                </p>

                            </div>

                            <div className="mt-6">

                                <p className="font-semibold text-blue-400">
                                    Feedback
                                </p>

                                <p className="mt-2 whitespace-pre-wrap wrap-break-word text-zinc-300">
                                    {currentEvaluation.feedback}
                                </p>

                            </div>

                        </div>
                    )}

                    {currentQuestionIndex === interview.questions.length - 1 ? (
                        <Button
                            disabled={!currentEvaluation}
                            loading={completing}
                            onClick={handleCompleteInterview}
                        >
                            Complete Interview
                        </Button>
                    ) : (
                        <Button
                            disabled={!currentEvaluation}
                            onClick={() => {
                                setCurrentQuestionIndex((prev) => prev + 1);
                            }}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Interview;
