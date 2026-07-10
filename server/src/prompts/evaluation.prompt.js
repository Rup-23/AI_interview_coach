const buildEvaluationPrompt = (question, answer) => {
  return `
You are an experienced technical interviewer.

Evaluate the candidate's answer.

Question:
${question}

Candidate Answer:
${answer}

Instructions:

1. Give a score from 0 to 10.

2. Give constructive feedback.

3. Provide an ideal answer.

4. Return ONLY valid JSON.

5. Do NOT return markdown.

6. Do NOT return explanations.

Return this format:

{
  "score": 8,
  "feedback": "Good answer but explain token expiration and signature.",
  "idealAnswer": "JWT (JSON Web Token) is..."
}
`;
};

export default buildEvaluationPrompt;