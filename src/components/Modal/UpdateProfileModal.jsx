import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { updateProfile } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const imgHostingKey = import.meta.env.VITE_IMGBB_API;
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const UpdateProfileModal = ({ user, profile, closeModal, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("idle"); // idle | saving | saved

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      name: profile?.name || "",
    });
  }, [profile, reset]);

  const onSubmit = async (data) => {
    setStatus("saving");

    try {
      let imageUrl = profile?.photoURL;

      const imageFile = data.photo?.[0];
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgRes = await fetch(imgUploadUrl, {
          method: "POST",
          body: formData,
        });

        const imgData = await imgRes.json();
        if (imgData.success) {
          imageUrl = imgData.data.display_url;
        } else {
          toast.error("Image upload failed");
          setStatus("idle");
          return;
        }
      }

      // Update Firebase
      await updateProfile(user, { displayName: data.name, photoURL: imageUrl });

      // Update MongoDB
      await axiosSecure.patch(`/users/${user.email}`, {
        name: data.name,
        photoURL: imageUrl,
      });

      toast.success("Profile updated successfully");
      onUpdate({ name: data.name, photoURL: imageUrl });
      setStatus("saved");

      setTimeout(() => {
        setStatus("idle");
        closeModal();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
      setStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-md bg-white rounded-lg shadow-xl relative p-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <AiOutlineClose size={22} />
          </button>

          <h2 className="text-xl font-semibold text-lime-600 mb-4">
            Update Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">Name is required</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="mt-1 block w-full text-sm text-gray-600"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "saving"}
              className={`w-full py-2 cursor-pointer px-4 rounded-md text-white transition ${
                status === "saved"
                  ? "bg-lime-800"
                  : status === "saving"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-lime-500 hover:bg-lime-600"
              }`}
            >
              {status === "saving"
                ? "Saving..."
                : status === "saved"
                ? "Saved ✅"
                : "Save Changes"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateProfileModal;
