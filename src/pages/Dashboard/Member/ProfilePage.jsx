import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        lastLogin: user.metadata?.lastSignInTime,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, {
        name: data.name,
        photoURL: data.photoURL,
      });
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Failed to update.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            className="input input-bordered w-full"
            {...register("name")}
          />
        </div>
        <div>
          <label>Photo URL</label>
          <input
            className="input input-bordered w-full"
            {...register("photoURL")}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className="input input-bordered w-full bg-gray-100"
            readOnly
            {...register("email")}
          />
        </div>
        <div>
          <label>Last Login</label>
          <input
            className="input input-bordered w-full bg-gray-100"
            readOnly
            {...register("lastLogin")}
          />
        </div>
        <button className="btn btn-success w-full" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
