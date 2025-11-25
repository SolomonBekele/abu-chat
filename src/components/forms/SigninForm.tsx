import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
// import { loginUser, logout, User } from "../../user/userSlice"; // adjust path
// import type { RootState, AppDispatch } from "../redux/store";
import { loginUser } from '../../store/Profile/userThunk';
import type { AppDispatch,RootState } from '../../store';
import { useAuthContext } from '../../context/AuthContext';



const SigninForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
 const { setAuthUser } = useAuthContext();

  const { user, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Navigate and show toast on successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success("Logged in successfully!");
      
      setAuthUser(user);
    }
  }, [isAuthenticated, user, navigate]);

  // Show error toast if login fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="form-container bg-white p-8 rounded-2xl w-[28rem] flex flex-col items-center">
      <div className="title-container mb-8 text-center">
        <div className="message-icon h-14 w-14 bg-teal-500 flex justify-center items-center rounded-full m-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-circle w-8 h-8 text-white"
            aria-hidden="true"
          >
            <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
          </svg>
        </div>
        <p className="text-[oklch(.511_.096_186.391)] text-xl font-semibold">ChatApp Web</p>
        <h1 className="text-gray-700 text-lg">Sign in to continue</h1>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col w-full space-y-4">
        <label htmlFor="email" className="text-sm mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-3 focus:ring-[oklch(.511_.096_186.391)]"
        />

        <label htmlFor="password" className="text-sm mb-2">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-3 focus:ring-[oklch(.511_.096_186.391)]"
        />

        <button
          type="submit"
          className="bg-[oklch(.704_.14_182.503)] text-white font-semibold py-2 rounded-md hover:opacity-90 transition"
        >
         {loading ? "Logging in..." : "signIn"}
        </button>
      </form>
    </div>
  )
}

export default SigninForm
