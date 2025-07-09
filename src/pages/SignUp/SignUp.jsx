import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;
    try {
      let imageURL = "https://i.ibb.co/2kRrTRq/default-avatar.jpg";

      if (photo && photo[0]) {
        const formData = new FormData();
        formData.append("image", photo[0]);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API
          }`,
          formData
        );

        if (res.data.success) {
          imageURL = res.data.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      await createUser(email, password);
      await updateUserProfile(name, imageURL);
      toast.success("Sign Up Successful!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePreview = (e) => {
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signup with Google Successful");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Helmet>
        <title>Register | FitSphere</title>
      </Helmet>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white  rounded-lg shadow-md">
        <div className="px-6 py-4 bg-white">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-8"
              src="https://i.ibb.co/cMJxCWf/gym-18195367.png"
              alt="Logo"
            />
          </div>

          <h3 className="mt-3 text-xl font-semibold text-center text-lime-500">
            Create Your Account
          </h3>
          <p className="mt-1 text-center text-gray-500">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Full Name"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              type="email"
              placeholder="Email Address"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              type="password"
              placeholder="Password"
              className="block w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md border-gray-300 focus:outline-lime-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="flex justify-center items-center">
              <input
                {...register("photo")}
                type="file"
                accept="image/*"
                onChange={handlePreview}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-lime-100 file:text-lime-700 hover:file:bg-lime-200"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-12 h-12 object-cover rounded-xl border border-lime-500"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center px-6 py-2 text-sm font-medium text-white bg-lime-500 rounded-md hover:bg-lime-600 transition cursor-pointer"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-gray-300" />
            <p className="text-sm text-gray-500">OR</p>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 border border-gray-300 w-full py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            <FcGoogle size={20} />
            <span className="text-sm text-gray-600">Continue with Google</span>
          </button>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50">
          <span className="text-sm text-gray-600">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="ml-2 text-sm font-bold text-lime-500 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
