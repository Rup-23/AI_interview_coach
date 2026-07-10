const buildInterviewPrompt = (
  resumeText,
  role,
  difficulty
) => {
  return `
You are an experienced professional interviewer.

Your task is to generate interview questions based on the candidate's resume.

Candidate Role:
${role}

Interview Difficulty:
${difficulty}

Candidate Resume:

${resumeText}

Instructions:

1. Analyze the candidate's resume carefully.

2. Generate exactly 10 interview questions.

3. Questions must be relevant to the candidate's skills, education, projects, certifications and work experience.

4. If the candidate is a fresher, focus more on fundamentals, projects and problem-solving.

5. If the candidate has work experience, include experience-based questions.

6. Questions must match the selected role.

7. The difficulty must match the selected difficulty.

8. Return ONLY valid JSON.

9. Do NOT return markdown.

10. Do NOT return explanations.

11. Do NOT return any extra text.

12. Never wrap the response in Markdown.

13. Never use code fences.

Return the following JSON format:

[
  {
    "question": "What is JWT Authentication?",
    "topic": "Authentication",
    "difficulty": "Easy"
  }
]

`;
};

export default buildInterviewPrompt;