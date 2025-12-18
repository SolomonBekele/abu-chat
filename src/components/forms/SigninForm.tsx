import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/Profile/userThunk";
import type { AppDispatch, RootState } from "../../store";
import { useAuthContext } from "../../context/AuthContext";
import { ChatIcon2 } from "../ui/icons/chatAppIcon";
import { SignInButton } from "../ui/Button/signinButton";

const SigninForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  // 🔥 using separated slice structure
  const { userData, login } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState<string>("example@gmail.com");
  const [password, setPassword] = useState<string>("Password123!");

  /** ---------------------------------------------------------
   *          SUCCESSFUL LOGIN
   * ---------------------------------------------------------*/
  useEffect(() => {
    if (login.isAuthenticated && userData && localStorage.getItem("user-token")) {
      toast.success(login.message || "Logged in!");
      setAuthUser(userData);
      navigate("/"); // OPTIONAL: move inside if you want redirect
    }
  }, [login.isAuthenticated, userData]);

  /** ---------------------------------------------------------
   *          LOGIN ERROR
   * ---------------------------------------------------------*/
  useEffect(() => {
    if (login.error) {
      toast.error(login.error);
    }
  }, [login.error]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <div className="form-container bg-white p-8 rounded-2xl w-[28rem] flex flex-col items-center">
      <div className="title-container mb-8 text-center">
        <div className="message-icon h-14 w-14 bg-teal-500 flex justify-center items-center rounded-full m-auto mb-4">
          <ChatIcon2 />
        </div>
        <p className="text-[oklch(.511_.096_186.391)] text-xl font-semibold">ChatApp Web</p>
        <h1 className="text-gray-700 text-lg">Sign in to continue</h1>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col w-full space-y-4 text-sm">
        <label htmlFor="email" className="mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-3 focus:ring-[oklch(.511_.096_186.391)]"
        />

        <label htmlFor="password" className="mb-2">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-3 focus:ring-[oklch(.511_.096_186.391)]"
        />

        <SignInButton />

        <div className="m-auto mb-3">
          <h1 className="text-teal-400">Forgot password?</h1>
        </div>

        <div className="m-auto">
          <p>
            Not registered yet?
            <span
              className="text-teal-800 cursor-pointer ms-1"
              onClick={handleRegisterClick}
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
