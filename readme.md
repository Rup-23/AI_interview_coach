# 🤖 AI Interview Coach

An AI-powered interview preparation platform that helps candidates practice realistic interviews, receive instant AI feedback, identify knowledge gaps, and improve interview performance through personalized evaluations.

---

## 📌 Overview

AI Interview Coach is a full-stack MERN application designed to simulate real technical interviews.

Users can upload their resume, choose their target role and interview difficulty, and receive AI-generated interview questions tailored to their profile.

Each answer is evaluated individually using AI, providing:

- Detailed feedback
- Ideal answers
- Question-wise score

After completing the interview, the platform generates a complete performance report with strengths, weaknesses, recommendations, and stores the interview history for future review.

---

## ✨ Features

### 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Refresh Token Authentication
- Protected Routes
- Secure Cookie-based Authentication
- Logout

---

### 📄 Resume Upload

- Upload Resume (PDF)
- Resume stored securely on Cloudinary
- Resume text extracted automatically
- Resume linked to authenticated user

---

### 🎯 AI Interview Generation

Users can:

- Select Target Role
- Choose Interview Difficulty
  - Easy
  - Medium
  - Hard

AI analyzes the uploaded resume and generates **10 personalized interview questions** relevant to the selected role.

---

### 💬 AI Answer Evaluation

Each interview question can be evaluated individually.

The AI provides:

- Question Score (0–10)
- Ideal Answer
- Personalized Feedback

Users receive immediate feedback after every answer, allowing them to improve before continuing.

---

### 📊 Interview Completion

Once all questions are evaluated, users can complete the interview.

The AI generates:

- Overall Score
- Strengths
- Weaknesses
- Personalized Recommendations

---

### 📖 Question-wise Analysis

After completing the interview, users can review every question.

For each question the application displays:

- Original Question
- User's Answer
- AI Ideal Answer
- AI Feedback
- Score

This allows candidates to identify mistakes and understand how to improve.

---

### 📚 Interview History

Every completed interview is saved.

Users can:

- View Previous Interviews
- Open Previous Results
- Review AI Feedback
- Track Previous Performance

---

### 👤 User Profile

Profile includes:

- Full Name
- Email
- Member Since
- Total Completed Interviews

---

## 🚀 Application Flow

```text
Register/Login
        │
        ▼
Upload Resume
        │
        ▼
Select Role & Difficulty
        │
        ▼
Generate AI Interview
        │
        ▼
Answer Questions
        │
        ▼
AI Evaluation
        │
        ▼
Complete Interview
        │
        ▼
AI Performance Report
        │
        ▼
Interview History
        │
        ▼
Review Previous Interviews
```

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Multer
- PDF Parser

---

## AI

- Groq API
- Prompt Engineering

---

## Cloud

- Cloudinary

---

## Database

MongoDB stores:

- Users
- Uploaded Resumes
- Interviews
- Questions
- Answers
- AI Evaluations
- Final Results

---

# 📂 Project Structure

```text
client/

src/
 ├── components/
 ├── pages/
 ├── context/
 ├── routes/
 ├── services/
 ├── api/

server/

src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── utils/
 ├── prompts/
 ├── config/
```

---

# 🔒 Authentication Flow

```text
Login

↓

Access Token

↓

Protected API

↓

Access Token Expired

↓

Refresh Token

↓

New Access Token

↓

Continue Without Logging In Again
```

---

# 🤖 AI Workflow

```text
Resume Upload

↓

Extract Resume Text

↓

Select Role

↓

Generate Prompt

↓

AI Generates Questions

↓

User Answers

↓

AI Evaluates

↓

Ideal Answer

↓

Feedback

↓

Overall Analysis
```


# Future Improvements

- Resume & Role Validation
- AI Role Suggestions
- Performance Analytics Dashboard
- Performance Charts
- Download Interview Report (PDF)
- Voice-based Interviews
- Multi-language Support
- Email Interview Reports

---

# Why This Project?

Preparing for interviews often requires personalized practice and meaningful feedback.

AI Interview Coach helps candidates by providing:

- Personalized interview questions
- Instant AI evaluation
- Detailed improvement suggestions
- Interview history
- Progress tracking

The platform aims to simulate a realistic interview experience while helping users continuously improve.

---

# Author

**Rupesh Kumar Meher**

Computer Science Engineering 

MERN Stack Developer

Learning AI • LangChain • Machine Learning

---

