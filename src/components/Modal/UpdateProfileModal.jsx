import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const imgHostingKey = import.meta.env.VITE_IMGBB_API;
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;

const UpdateProfileModal = ({ user, closeModal, onUpdate }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let imageUrl = user?.photoURL;

      // Upload image if file is selected
      const imageFile = data.photo[0];
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
          toast.error("Image upload failed.");
          return;
        }
      }

      // Save updated info to DB
      const res = await axiosSecure.patch(`/users/${user.email}`, {
        name: data.name,
        photoURL: imageUrl,
      });

      toast.success("Profile updated!");
      onUpdate({ name: data.name, photoURL: imageUrl });
      reset();
      closeModal();
    } catch (err) {
      toast.error("Update failed.");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl relative p-6">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <AiOutlineClose size={22} />
        </button>

        {/* Modal content */}
        <h2 className="text-xl font-semibold text-lime-600 mb-4">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName}
              {...register("name", { required: true })}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">Name is required</p>
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
            className="w-full bg-lime-500 text-white py-2 px-4 rounded-md hover:bg-lime-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
