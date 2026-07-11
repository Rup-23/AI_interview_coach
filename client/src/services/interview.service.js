import api from "../api/axios";

export const generateInterview = async (data) => {
  const response = await api.post(
    "/interview/generate",
    data
  );

  return response.data;
};

export const getInterviewById = async (interviewId) => {
  const response = await api.get(
    `/interview/${interviewId}`
  );

  return response.data;
};

export const evaluateAnswer = async (data) => {
  const response = await api.post(
    "/interview/evaluate-answer",
    data
  );

  return response.data;
};

export const completeInterview = async (interviewId) => {
  const response = await api.post(
    "/interview/complete",
    {
      interviewId,
    }
  );

  return response.data;
};

export const getInterviewHistory = async () => {
  const response = await api.get("/interview/history");
  return response.data;
};