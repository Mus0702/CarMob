import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
const RequiredAdminRole = () => {
  const { isLoggedIn } = useAuth();
  const role = localStorage.getItem("role");
  return isLoggedIn && role === "ROLE_ADMIN" ? (
    <Outlet />
  ) : !isLoggedIn ? (
    <Navigate to="/login" />
  ) : (
    <Navigate to="/restricted" />
  );
};

export default RequiredAdminRole;
