import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const RoleRoute = ({ children, allowedRole }) => {
  const [role, loading] = useRole();

  if (loading) return <LoadingSpinner />;
  if (role !== allowedRole) return <Navigate to="/" replace />;
  return children;
};

export default RoleRoute;
