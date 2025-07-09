import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add JWT token to headers
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("fitshpere-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        console.log("❌ Axios Secure Error:", error.response?.status);

        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
