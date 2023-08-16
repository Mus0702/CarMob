import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
const RequiredAuth = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default RequiredAuth;
