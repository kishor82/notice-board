import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { NavBar } from "../Components/Navbar";
export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <>
      <NavBar></NavBar>
      {children}
    </>
  );
};

export const LoginRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  if (token) {
    const origin = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={origin} />;
  }
  return children;
};
