import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, resetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Login successful");
      navigate(from, { replace: true });
      reset();
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  const handleForgotPassword = async () => {
    const email = watch("email");
    if (!email) return toast.error("Please enter your email first");
    try {
      await resetPassword(email);
      toast.success("Password reset email sent");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (user) return <Navigate to={from} replace />;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex justify-center">
            <img
              className="w-auto h-8"
              src="https://i.ibb.co/cMJxCWf/gym-18195367.png"
              alt="logo"
            />
          </div>
          <h3 className="mt-3 text-xl font-semibold text-center text-lime-500">
            Welcome Back
          </h3>
          <p className="mt-1 text-center text-gray-500 text-sm">
            Login or create an account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
                className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-sm text-gray-600 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password + Submit */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot Password?
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition cursor-pointer"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="px-6 pt-2 pb-6 bg-gray-50">
          <button
            onClick={signInWithGoogle}
            className="flex justify-center items-center gap-3 border w-full py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-lime-500 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
