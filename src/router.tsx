import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage"; 
import SigninPage from "./pages/SigninPage";
import { useAuthContext } from "./context/AuthContext";



export const useRouter = () => {
  const { authUser } = useAuthContext();

  return createBrowserRouter([
    {
      path: "/",
      element: authUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />,
    },
    {
      path: "/dashboard",
      element: authUser ? <DashboardPage /> : <Navigate to="/signin" replace />,
    },
    {
      path: "/signin",
      element: authUser ? <Navigate to="/dashboard" replace /> : <SigninPage />,
    },
    // {
    //   path: "/signup",
    //   element: authUser ? <Navigate to="/dashboard" replace /> : <SignupPage />,
    // },
  ]);
};