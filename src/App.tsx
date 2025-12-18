import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/signupPage";

// import SignUp from "./pages/signup/SignUp"; // optional

const App: React.FC = () => {
  const { authUser } = useAuthContext();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/dashboard"
          element={authUser ? <DashboardPage /> : <Navigate to="/signin" replace />}
        />
        <Route
          path="/signin"
          element={authUser ? <Navigate to="/dashboard" replace /> : <SigninPage />}
        />
        
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/dashboard" replace /> : <SignupPage />}
        /> 
       
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
