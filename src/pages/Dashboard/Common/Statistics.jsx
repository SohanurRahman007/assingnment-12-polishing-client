import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Navigate } from "react-router-dom";

const Statistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (userInfo?.role === "admin") {
    return <Navigate to="/dashboard/balance" replace />;
  } else if (userInfo?.role === "trainer") {
    return <Navigate to="/dashboard/manage-slots" replace />;
  } else if (userInfo?.role === "member") {
    return <Navigate to="/dashboard/booked-trainer" replace />;
  }

  return <Navigate to="/" replace />;
};

export default Statistics;
