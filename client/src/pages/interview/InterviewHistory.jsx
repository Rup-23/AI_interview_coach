import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import Button from "../../components/ui/Button";

import { getInterviewHistory } from "../../services/interview.service";

const InterviewHistory = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getInterviewHistory();

                setHistory(response.data);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch interview history."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />

            <main className="mx-auto max-w-6xl px-6 py-10">

                <h1 className="text-4xl font-bold text-white">
                    Interview History
                </h1>

                <div className="mt-8 space-y-5">

                    {history.length === 0 ? (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
                            No interviews found.
                        </div>
                    ) : (
                        history.map((item) => (
                            <div
                                key={item._id}
                                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                            >
                                <div className="flex items-center justify-between">

                                    <div>

                                        <h2 className="text-xl font-semibold text-white">
                                            {item.role}
                                        </h2>

                                        <p className="mt-2 text-zinc-400">
                                            Difficulty : {item.difficulty}
                                        </p>

                                        <p className="mt-2 text-zinc-400">
                                            Status : {item.status}
                                        </p>

                                        <p className="mt-2 text-zinc-400">
                                            Score : {item.overallScore} / 10
                                        </p>

                                    </div>

                                    {/* <Button
                    onClick={() => {
                      sessionStorage.setItem(
                        "interviewId",
                        item._id
                      );

                      navigate("/result");
                    }}
                  >
                    View Result
                  </Button> */}

                                    <Button
                                        onClick={() => {
                                            console.log("Interview ID:", item._id);

                                            sessionStorage.setItem("interviewId", item._id);

                                            console.log(
                                                "Stored:",
                                                sessionStorage.getItem("interviewId")
                                            );

                                            navigate("/result");
                                        }}
                                    >
                                        View Result
                                    </Button>

                                </div>
                            </div>
                        ))
                    )}

                </div>

            </main>
        </div>
    );
};

export default InterviewHistory;