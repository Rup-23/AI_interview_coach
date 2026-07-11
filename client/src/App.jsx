import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import UploadResume from "./pages/resume/UploadResume";
import GenerateInterview from "./pages/interview/GenerateInterview";
import Interview from "./pages/interview/Interview";
import Result from "./pages/interview/Result";
import InterviewHistory from "./pages/interview/InterviewHistory";



function App() {
  return (

    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Route for Upload Resume */}
        <Route
          path="/resume/upload"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/generate"
          element={
            <ProtectedRoute>
              <GenerateInterview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
<Route
  path="/history"
  element={
    <ProtectedRoute>
      <InterviewHistory />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;