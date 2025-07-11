import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const RoleRoute = ({ children, allowedRoles }) => {
  const [role, loading] = useRole();

  if (loading) return <LoadingSpinner />;

  // ✅ Check if user's role is in allowedRoles array
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

export default RoleRoute;
