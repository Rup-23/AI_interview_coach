import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Resume from "../models/Resume.model.js";
import groq from "../utils/groq.js";
import env from "../config/env.js";
import buildInterviewPrompt from "../prompts/interview.prompt.js";
import Interview from "../models/Interview.model.js";
import buildEvaluationPrompt from "../prompts/evaluation.prompt.js";
import buildCompletionPrompt from "../prompts/completion.prompt.js";


export const generateInterview = asyncHandler(async (req, res) => {
    const { resumeId, role, difficulty } = req.body;

    // Validation
    if (!resumeId || !role || !difficulty) {
        throw new ApiError(400, "All fields are required");
    }

    // Find Resume

    //   const resume = await Resume.findById(resumeId);
    const resume = await Resume.findOne({
        _id: resumeId,
        user: req.user._id,
    });

    if (!resume) {
        throw new ApiError(404, "Resume not found");
    }

    // Build AI Prompt
    const prompt = buildInterviewPrompt(
        resume.extractedText,
        role,
        difficulty
    );

    // Call Groq
    const response = await groq.chat.completions.create({
        model: env.GROQ_MODEL,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.7,
    });

    // AI Response
    const aiResponse = response.choices[0].message.content;

    // Parse AI Response
    let questions;

    try {
        questions = JSON.parse(aiResponse);
    } catch (error) {
        throw new ApiError(500, "Failed to parse AI response.");
    }

    // Save Interview
    const interview = await Interview.create({
        user: req.user._id,
        resume: resume._id,
        role,
        difficulty,
        questions,
    });

    return apiResponse(
        res,
        201,
        true,
        "Interview created successfully.",
        interview
    );
});

export const evaluateAnswer = asyncHandler(async (req, res) => {

    const { interviewId, questionId, answer } = req.body;

    if (!interviewId || !questionId || !answer) {
        throw new ApiError(400, "All fields are required");
    }

    // const interview = await Interview.findById(interviewId);

    const interview = await Interview.findOne({
        _id: interviewId,
        user: req.user._id,
    });

    if (!interview) {
        throw new ApiError(404, "Interview not found");
    }

    const question = interview.questions.id(questionId);

    if (!question) {
        throw new ApiError(404, "Question not found");
    }

    if (question.answer) {
    throw new ApiError(
        400,
        "This question has already been evaluated."
    );
}

    const prompt = buildEvaluationPrompt(
        question.question,
        answer
    );

    const response = await groq.chat.completions.create({
        model: env.GROQ_MODEL,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.3,
    });

    const aiResponse = response.choices[0].message.content;

    let evaluation;

    try {
        evaluation = JSON.parse(aiResponse);
    } catch (error) {
        throw new ApiError(500, "Failed to parse AI response.");
    }

    question.answer = answer;
    question.score = evaluation.score;
    question.feedback = evaluation.feedback;
    question.idealAnswer = evaluation.idealAnswer;

    await interview.save();

    return apiResponse(
        res,
        200,
        true,
        "Answer evaluated successfully.",
        question
    );

});

export const completeInterview = asyncHandler(async (req, res) => {

    const { interviewId } = req.body;

    if (!interviewId) {
        throw new ApiError(400, "Interview ID is required");
    }

    const interview = await Interview.findOne({
        _id: interviewId,
        user: req.user._id,
    });

    if (!interview) {
        throw new ApiError(404, "Interview not found");
    }

    if (interview.status === "Completed") {
        throw new ApiError(
            400,
            "Interview already completed."
        );
    }

    const prompt = buildCompletionPrompt(
        interview.questions,
        interview.role
    );

    const response = await groq.chat.completions.create({
        model: env.GROQ_MODEL,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.3,
    });

    const aiResponse = response.choices[0].message.content;

    let report;

    try {
        report = JSON.parse(aiResponse);
    } catch (error) {
        throw new ApiError(500, "Failed to parse AI response.");
    }

    interview.overallScore = report.overallScore;
    interview.strengths = report.strengths;
    interview.weaknesses = report.weaknesses;
    interview.recommendations = report.recommendations;

    interview.status = "Completed";

    interview.completedAt = new Date();

    await interview.save();

    return apiResponse(
        res,
        200,
        true,
        "Interview completed successfully.",
        interview
    );

});
// Get Interview By Id

export const getInterviewById = asyncHandler(async (req, res) => {

    const { interviewId } = req.params;

    const interview = await Interview.findOne({
        _id: interviewId,
        user: req.user._id,
    });

    if (!interview) {
        throw new ApiError(404, "Interview not found.");
    }

    return apiResponse(
        res,
        200,
        true,
        "Interview fetched successfully.",
        interview
    );
});

export const getInterviewHistory = asyncHandler(async (req, res) => {

    const interviews = await Interview.find({
        user: req.user._id,
    })
        .select(
            "role difficulty overallScore status createdAt"
        )
        .sort({
            createdAt: -1,
        });

    return apiResponse(
        res,
        200,
        true,
        "Interview history fetched successfully.",
        interviews
    );

});