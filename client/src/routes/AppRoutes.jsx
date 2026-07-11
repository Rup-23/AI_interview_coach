import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import UploadResume from "../pages/resume/UploadResume";
import ResumeHistory from "../pages/resume/ResumeHistory";
import Interview from "../pages/interview/Interview";
import Result from "../pages/interview/Result";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/upload-resume" element={<UploadResume />} />

      <Route path="/resume-history" element={<ResumeHistory />} />

      <Route path="/interview/:id" element={<Interview />} />

      <Route path="/result/:id" element={<Result />} />
    </Routes>
  );
};

export default AppRoutes;