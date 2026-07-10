// const buildCompletionPrompt = (questions) => {
//   return `
// You are an experienced technical interviewer.

// The following interview has been completed.

// Questions and Candidate Answers:

// ${JSON.stringify(questions, null, 2)}

// Analyze the entire interview and return ONLY valid JSON.

// Instructions:

// 1. Calculate an overall score from 0 to 100.

// 2. Identify the candidate's strengths.

// 3. Identify the candidate's weaknesses.

// 4. Give practical recommendations for improvement.

// 5. Do NOT return markdown.

// 6. Do NOT return explanations.

// Return exactly this JSON:

// {
//   "overallScore": 85,
//   "strengths": [
//     "Node.js",
//     "MongoDB"
//   ],
//   "weaknesses": [
//     "Docker",
//     "System Design"
//   ],
//   "recommendations": [
//     "Practice Docker",
//     "Improve SQL skills"
//   ]
// }
// `;
// };

// export default buildCompletionPrompt;



const buildCompletionPrompt = (role, difficulty, questions) => {
  return `
You are an experienced professional interviewer.

The candidate has completed an interview for the following role.

Role:
${role}

Difficulty:
${difficulty}

Interview Questions, Candidate Answers and Individual Evaluations:

${JSON.stringify(questions, null, 2)}

Analyze the overall interview performance.

Instructions:

1. Calculate an overall score from 0 to 100.

2. Identify the candidate's strengths.

3. Identify the candidate's weaknesses.

4. Give practical recommendations.

5. Adapt your evaluation based on the candidate's profession and role.

6. Do not assume the interview is technical unless the role requires technical knowledge.

7. Return ONLY valid JSON.

8. Do NOT return markdown.

9. Do NOT return explanations.

Return exactly this format:

{
  "overallScore": 85,
  "strengths": [
    "..."
  ],
  "weaknesses": [
    "..."
  ],
  "recommendations": [
    "..."
  ]
}
`;
};

export default buildCompletionPrompt;